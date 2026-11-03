# SPDX-License-Identifier: MPL-2.0
import ast
from pathlib import Path

import yaml


def main():
    root = Path(__file__).resolve().parents[2]
    for name in ("README.md", "LICENSE", ".gitlab-ci.yml"):
        path = root / name
        if not path.is_file() or not path.stat().st_size:
            raise ValueError(f"Required file missing or empty: {name}")
    paths = [root / ".gitlab-ci.yml", *sorted((root / ".github").rglob("*.yml"))]
    for path in paths:
        if not path.read_text(encoding="utf-8").strip() and path.parent.name != "workflows":
            continue
        with path.open(encoding="utf-8") as stream:
            if not isinstance(yaml.safe_load(stream), dict):
                raise ValueError(f"Expected a YAML mapping: {path}")
        print(f"Valid YAML: {path.relative_to(root)}")
    for path in sorted((root / "scripts").rglob("*.py")):
        ast.parse(path.read_text(encoding="utf-8"), filename=str(path))
        print(f"Valid Python: {path.relative_to(root)}")
    print("Repository validation passed")


if __name__ == "__main__":
    main()
