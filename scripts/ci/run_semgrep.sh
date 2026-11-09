#!/usr/bin/env bash
# SPDX-License-Identifier: MPL-2.0

set -euo pipefail

export SEMGREP_SRC_DIRECTORY="$CI_PROJECT_DIR"
mkdir -p reports
semgrep scan --metrics=off --strict --error --severity=ERROR \
    --config p/owasp-top-ten --config p/php --config p/python --config p/typescript \
    --sarif-output reports/semgrep.sarif
