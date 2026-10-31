import base64
import json
import os
import re
import subprocess
import sys
import time
from urllib.error import HTTPError
from urllib.parse import quote, urlencode, urlsplit
from urllib.request import Request, urlopen


class GitLabAPIError(RuntimeError):
    pass


def required(name):
    value = os.environ.get(name, "").strip()
    if not value:
        raise ValueError(f"Configure {name} in GitHub Actions settings")
    return value


def main():
    token = required("GITLAB_TOKEN")
    project = required("GITLAB_PROJECT_ID")
    repository = required("GITLAB_PROJECT_URL")
    base = os.environ.get("GITLAB_URL", "https://gitlab.com").rstrip("/")
    for value in (base, repository):
        parsed = urlsplit(value)
        if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
            raise ValueError("GitLab URLs must use HTTPS without embedded credentials")
    if urlsplit(repository).netloc != urlsplit(base).netloc:
        raise ValueError("GITLAB_PROJECT_URL must belong to GITLAB_URL")
    sha = required("GITHUB_SHA")
    if not re.fullmatch(r"[0-9a-f]{40}", sha):
        raise ValueError("Invalid GitHub commit SHA")
    branch = f"github-ci/{required('GITHUB_RUN_ID')}-{required('GITHUB_RUN_ATTEMPT')}"
    api = f"{base}/api/v4/projects/{quote(project, safe='')}"

    def request(method, path, data=None):
        body = urlencode(data).encode() if data is not None else None
        headers = {"PRIVATE-TOKEN": token}
        if body is not None:
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        req = Request(api + path, data=body, headers=headers, method=method)
        try:
            with urlopen(req, timeout=30) as response:
                content = response.read()
                return json.loads(content) if content else None
        except HTTPError as error:
            detail = error.read(16384).decode("utf-8", errors="replace").strip()
            for secret in (credentials, quote(token, safe=""), token):
                detail = detail.replace(secret, "[REDACTED]")
            raise GitLabAPIError(
                f"GitLab API {method} {path} failed with HTTP {error.code}:\n"
                f"{detail or error.reason}"
            ) from None

    credentials = base64.b64encode(f"oauth2:{token}".encode()).decode()
    environment = os.environ.copy()
    environment.update({
        "GIT_TERMINAL_PROMPT": "0",
        "GIT_CONFIG_COUNT": "1",
        "GIT_CONFIG_KEY_0": f"http.{base}/.extraHeader",
        "GIT_CONFIG_VALUE_0": f"Authorization: Basic {credentials}",
    })
    pushed = subprocess.run(
        ["git", "push", repository, f"{sha}:refs/heads/{branch}"],
        env=environment, capture_output=True, text=True,
    )
    if pushed.returncode:
        detail = pushed.stderr.strip() or pushed.stdout.strip() or "Git returned no error details"
        for secret in (credentials, quote(token, safe=""), token):
            detail = detail.replace(secret, "[REDACTED]")
        raise RuntimeError(f"GitLab push failed (exit {pushed.returncode}):\n{detail}")
    pipeline = None
    terminal = False
    status = "not started"
    try:
        pipeline = request("POST", "/pipeline", {"ref": branch})
        if pipeline["sha"] != sha:
            raise RuntimeError("GitLab pipeline commit does not match the GitHub commit")
        print(f"GitLab pipeline: {pipeline['web_url']}", flush=True)
        deadline = time.monotonic() + 2100
        while time.monotonic() < deadline:
            result = request("GET", f"/pipelines/{pipeline['id']}")
            status = result["status"]
            print(f"GitLab status: {status}", flush=True)
            if status in {"success", "failed", "canceled", "skipped", "manual"}:
                terminal = status != "manual"
                break
            time.sleep(15)
        else:
            status = "timed out"
        if status != "success":
            raise RuntimeError(f"GitLab pipeline {status}: {pipeline['web_url']}")
    finally:
        if pipeline is not None:
            summary = os.environ.get("GITHUB_STEP_SUMMARY")
            if summary:
                with open(summary, "a", encoding="utf-8") as stream:
                    stream.write(f"GitLab pipeline: {pipeline['web_url']}\n\nResult: **{status}**\n\nCommit: `{sha}`\n")
            if not terminal:
                try:
                    request("POST", f"/pipelines/{pipeline['id']}/cancel")
                except (GitLabAPIError, OSError) as error:
                    print(f"Could not cancel GitLab pipeline: {error}", file=sys.stderr)
        try:
            request("DELETE", f"/repository/branches/{quote(branch, safe='')}")
        except (GitLabAPIError, OSError) as error:
            print(f"Could not remove temporary GitLab branch {branch}: {error}", file=sys.stderr)


if __name__ == "__main__":
    try:
        main()
    except (ValueError, RuntimeError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
