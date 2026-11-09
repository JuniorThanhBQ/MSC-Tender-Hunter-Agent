# ADR-003 — Development and CI Configuration

**Status:** Accepted
**Date:** 2026-11-09
**Deciders:** TenderHunter development team

## Context

TenderHunter contains a Python agent, a Laravel application, and a React web application. Each component has its own dependency and build requirements. The project needs repeatable dependency management, local quality checks, and automated verification across these components.

The team also needs a consistent way to maintain dependencies, inspect code quality, and configure local services without committing credentials.

## Decision

I adopt the following development and verification setup.

- **Python dependencies:** Manage the agent as a uv workspace with the project configuration and lockfile at the repository root. Keep the agent’s dependency declarations in `engine/pyproject.toml`.
- **Dependency updates:** Use Dependabot for the root uv workspace, Laravel Composer dependencies, npm dependencies in Laravel and web, and GitHub Actions.
- **Local checks:** Use Prek for repository hygiene checks and language-specific checks through Ruff, Laravel Pint, and ESLint.
- **Task automation:** Use a root Taskfile, with the Task CLI installed as a web development dependency. Provide commands for local secret generation and SonarQube operations.
- **Code quality:** Provide a local SonarQube Compose configuration and project scanner configuration covering `engine`, `laravel`, and `web`.
- **CI verification:** Use GitLab CI to validate repository configuration, scan Git history with Gitleaks, run Semgrep SAST, lint Python, build Laravel assets, test Laravel, and lint and build the web application. Keep CI shell scripts under `scripts/ci/`.
- **Test configuration:** Provide test defaults in the root `.env.example`. The Laravel CI script uses a root `.env.test` when present and otherwise uses the example to prepare Laravel’s testing environment.
- **Contribution workflow:** Use GitHub issue forms, contribution guidance, code ownership, and a pull request template to standardize project collaboration.

## Consequences

The repository has a consistent set of local checks and CI jobs, and lockfiles make dependency installation more repeatable. Developers need the relevant language runtimes and project dependencies to run all local checks. SonarQube requires its local services and configuration.

The current pipeline performs static security and secret scans. Dynamic application scanning and an agent build or test job require separate implementation when those checks are ready. CI runner isolation and protection of variables remain deployment configuration responsibilities.

## References

- [GitLab CI configuration](../../.gitlab-ci.yml)
- [Dependabot configuration](../../.github/dependabot.yml)
- [Prek configuration](../../prek.toml)
- [Taskfile](../../Taskfile.yml)
- [SonarQube project configuration](../../sonar-project.properties)
