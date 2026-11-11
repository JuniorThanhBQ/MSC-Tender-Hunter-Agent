# Package License and MPL-2.0 Compliance Audit

- Date: 2026-11-10
- Project License: **Mozilla Public License Version 2.0 (MPL-2.0)**
- Audit Scope: Locked dependencies in `uv.lock`, `web/package-lock.json`, `laravel/package-lock.json`, and `laravel/composer.lock`

## 1. Compliance Framework: Mozilla Public License 2.0

The project source code is licensed under the **Mozilla Public License Version 2.0 (MPL-2.0)** as set forth in [`LICENSE`](./MPL-V2.md).

### Key MPL-2.0 Rules for External Packages
1. **File-Level Copyleft**: MPL-2.0 applies strictly at the file boundary (Sections 1.4 and 3.1). Any modification to an MPL-covered file must remain under MPL-2.0.
2. **Larger Works (Section 3.3)**: MPL-covered files may be freely combined with separate files governed by different open-source or proprietary licenses to create a "Larger Work", provided the MPL terms continue to be fulfilled for the MPL-covered files.
3. **Compatibility**:
   - **Permissive Licenses** (MIT, Apache 2.0, BSD-2/3-Clause, PSFL, PostgreSQL License): Fully compatible. They impose no copyleft restrictions on surrounding files.
   - **Service and API Boundaries**: Software consumed across network boundaries (e.g., Supabase PostgreSQL, Upstash Redis, independent REST/SSE microservices) does not combine source code into a single derivative work.
   - **Strong Copyleft** (GPLv2/v3, AGPLv3): Requires legal review if statically or dynamically linked into the same binary or module.

## 2. Locked Package Inventory

This inventory covers direct, development, optional, and transitive packages recorded in the committed lockfiles. License values are transcribed from the lockfile where available; Python package license metadata was retrieved from the matching release on PyPI on 2026-11-10. “Not stated” means the available metadata did not identify a license and requires upstream verification. Counts are package records, not unique package names across ecosystems.

### Python (`uv.lock`) — 138 packages

Includes the root project and `engine` workspace, including development dependency groups.

| Package | Locked version | Declared license |
|---|---:|---|
| `agent-detector` | `2.0.0` | MIT License |
| `aiofile` | `3.12.3` | Apache Software License |
| `annotated-doc` | `0.0.5` | Not stated in PyPI metadata; verify upstream |
| `annotated-types` | `0.8.0` | MIT License |
| `anthropic` | `2.4.0` | Apache-2.0 |
| `anyio` | `4.16.0` | Not stated in PyPI metadata; verify upstream |
| `argcomplete` | `3.7.2` | Apache Software License |
| `ast-serialize` | `0.13.1` | Not stated in PyPI metadata; verify upstream |
| `attrs` | `26.1.0` | Not stated in PyPI metadata; verify upstream |
| `authlib` | `1.9.3` | BSD-3-Clause |
| `beartype` | `0.23.1` | MIT License |
| `cachetools` | `7.2.8` | Not stated in PyPI metadata; verify upstream |
| `caio` | `0.12.10` | Not stated in PyPI metadata; verify upstream |
| `certifi` | `2026.10.23` | MPL-2.0 |
| `cffi` | `2.1.1` | Not stated in PyPI metadata; verify upstream |
| `charset-normalizer` | `3.5.2` | MIT |
| `click` | `8.5.0` | Not stated in PyPI metadata; verify upstream |
| `colorama` | `0.4.6` | BSD License |
| `cryptography` | `50.0.2` | Not stated in PyPI metadata; verify upstream |
| `curl-cffi` | `0.17.0` | Not stated in PyPI metadata; verify upstream |
| `cyclopts` | `5.3.3` | Apache Software License |
| `detect-installer` | `0.2.1` | Not stated in PyPI metadata; verify upstream |
| `distro` | `1.9.0` | Apache License, Version 2.0 |
| `dnspython` | `2.9.1` | Not stated in PyPI metadata; verify upstream |
| `docstring-parser` | `0.18.0` | MIT |
| `email-validator` | `2.3.0` | Unlicense |
| `engine` | `0.1.0` | Local workspace package; license is project MPL-2.0 |
| `exceptiongroup` | `1.3.1` | MIT License |
| `executing` | `2.3.0` | MIT |
| `fastapi` | `0.162.0` | Not stated in PyPI metadata; verify upstream |
| `fastapi-cli` | `0.0.32` | Not stated in PyPI metadata; verify upstream |
| `fastapi-cloud-cli` | `0.26.0` | MIT |
| `fastar` | `0.12.0` | MIT License |
| `fastmcp` | `4.1.6` | Apache Software License |
| `fastmcp-slim` | `4.1.6` | Apache Software License |
| `genai-prices` | `0.2.1` | MIT License |
| `google-auth` | `2.62.1` | Apache 2.0 |
| `google-genai` | `2.34.0` | Not stated in PyPI metadata; verify upstream |
| `googleapis-common-protos` | `1.76.0` | Not stated in PyPI metadata; verify upstream |
| `griffelib` | `2.4.1` | Not stated in PyPI metadata; verify upstream |
| `h11` | `0.16.0` | MIT |
| `httpcore` | `1.0.9` | BSD License |
| `httpcore2` | `2.16.0` | BSD License |
| `httptools` | `0.9.0` | Not stated in PyPI metadata; verify upstream |
| `httpx` | `0.28.1` | BSD-3-Clause |
| `httpx2` | `2.16.0` | BSD License |
| `httpx2-jsfetch` | `1.0` | BSD License |
| `idna` | `3.20` | Not stated in PyPI metadata; verify upstream |
| `iniconfig` | `2.3.1` | Not stated in PyPI metadata; verify upstream |
| `jinja2` | `3.1.6` | BSD License |
| `jiter` | `0.18.0` | Not stated in PyPI metadata; verify upstream |
| `joserfc` | `1.8.0` | BSD-3-Clause |
| `jsonref` | `1.1.0` | MIT |
| `jsonschema` | `4.26.0` | Not stated in PyPI metadata; verify upstream |
| `jsonschema-path` | `0.5.0` | Apache-2.0 |
| `jsonschema-specifications` | `2025.9.1` | Not stated in PyPI metadata; verify upstream |
| `librt` | `0.16.0` | Not stated in PyPI metadata; verify upstream |
| `logfire` | `5.4.0` | Not stated in PyPI metadata; verify upstream |
| `logfire-api` | `5.4.0` | Not stated in PyPI metadata; verify upstream |
| `logfire-sdk` | `5.4.0` | Not stated in PyPI metadata; verify upstream |
| `markdown-it-py` | `4.2.0` | MIT License |
| `markupsafe` | `3.0.4` | Not stated in PyPI metadata; verify upstream |
| `mbs-agent-tender-hunter` | `0.1.0` | Local workspace package; license is project MPL-2.0 |
| `mcp` | `2.3.0` | MIT |
| `mcp-types` | `2.3.0` | MIT |
| `mdurl` | `0.1.2` | MIT License |
| `mypy` | `2.4.1` | Not stated in PyPI metadata; verify upstream |
| `mypy-extensions` | `1.1.0` | Not stated in PyPI metadata; verify upstream |
| `openai` | `3.42.1` | Apache Software License |
| `openapi-pydantic` | `0.6.0` | MIT |
| `opentelemetry-api` | `1.45.2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-exporter-http-transport` | `0.66b2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-exporter-otlp-common` | `0.66b2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-exporter-otlp-proto-common` | `1.45.2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-exporter-otlp-proto-http` | `1.45.2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-instrumentation` | `0.66b2` | Apache Software License |
| `opentelemetry-instrumentation-httpx` | `0.66b2` | Apache Software License |
| `opentelemetry-proto` | `1.45.2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-sdk` | `1.45.2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-semantic-conventions` | `0.66b2` | Not stated in PyPI metadata; verify upstream |
| `opentelemetry-util-http` | `0.66b2` | Apache Software License |
| `packaging` | `26.3` | Not stated in PyPI metadata; verify upstream |
| `pathable` | `0.6.0` | Apache-2.0 |
| `pathspec` | `1.1.1` | Mozilla Public License 2.0 (MPL 2.0) |
| `platformdirs` | `4.14.3` | Not stated in PyPI metadata; verify upstream |
| `pluggy` | `1.7.0` | MIT |
| `prek` | `0.5.10` | Not stated in PyPI metadata; verify upstream |
| `prompt-toolkit` | `3.0.53` | BSD License |
| `protobuf` | `7.36.2` | 3-Clause BSD License |
| `py-key-value-aio` | `0.4.6` | Not stated in PyPI metadata; verify upstream |
| `pyasn1` | `0.6.5` | BSD-2-Clause |
| `pyasn1-modules` | `0.4.2` | BSD |
| `pycparser` | `3.12` | Not stated in PyPI metadata; verify upstream |
| `pydantic` | `2.14.2` | Not stated in PyPI metadata; verify upstream |
| `pydantic-ai` | `2.65.0` | Not stated in PyPI metadata; verify upstream |
| `pydantic-ai-slim` | `2.65.0` | MIT License |
| `pydantic-core` | `2.50.2` | Not stated in PyPI metadata; verify upstream |
| `pydantic-evals` | `2.65.0` | MIT License |
| `pydantic-extra-types` | `2.11.1` | MIT License |
| `pydantic-graph` | `2.65.0` | MIT License |
| `pydantic-settings` | `2.16.2` | MIT License |
| `pygments` | `2.21.0` | Not stated in PyPI metadata; verify upstream |
| `pyjwt` | `2.15.1` | Not stated in PyPI metadata; verify upstream |
| `pyperclip` | `1.11.0` | BSD |
| `pytest` | `9.2.0` | Not stated in PyPI metadata; verify upstream |
| `python-dotenv` | `1.2.4` | BSD-3-Clause |
| `python-multipart` | `0.0.33` | Apache Software License |
| `pywin32` | `312` | PSF |
| `pyyaml` | `6.0.3` | MIT |
| `redis` | `8.1.0` | MIT License |
| `referencing` | `0.37.0` | Not stated in PyPI metadata; verify upstream |
| `regex` | `2026.9.29` | Not stated in PyPI metadata; verify upstream |
| `requests` | `2.34.2` | Apache-2.0 |
| `rich` | `15.0.0` | MIT |
| `rich-rst` | `2.2.0` | Not stated in PyPI metadata; verify upstream |
| `rich-toolkit` | `0.20.6` | MIT License |
| `rignore` | `0.8.1` | MIT |
| `rpds-py` | `2026.9.1` | Not stated in PyPI metadata; verify upstream |
| `ruff` | `0.17.3` | Not stated in PyPI metadata; verify upstream |
| `sentry-sdk` | `2.73.0` | Not stated in PyPI metadata; verify upstream |
| `shellingham` | `1.5.4` | ISC License |
| `sniffio` | `1.3.1` | MIT OR Apache-2.0 |
| `sse-starlette` | `3.6.0` | Not stated in PyPI metadata; verify upstream |
| `starlette` | `1.10.0` | Not stated in PyPI metadata; verify upstream |
| `tenacity` | `9.1.4` | Apache 2.0 |
| `tiktoken` | `0.14.0` | MIT License

        Copyright (c) 2022 OpenAI, Shantanu Jain

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE. |
| `truststore` | `0.10.5` | Not stated in PyPI metadata; verify upstream |
| `typer` | `0.27.3` | Not stated in PyPI metadata; verify upstream |
| `typing-extensions` | `4.16.0` | Not stated in PyPI metadata; verify upstream |
| `typing-inspection` | `0.4.4` | Not stated in PyPI metadata; verify upstream |
| `uncalled-for` | `0.4.1` | MIT License |
| `urllib3` | `2.8.0` | Not stated in PyPI metadata; verify upstream |
| `uvicorn` | `0.54.0` | Not stated in PyPI metadata; verify upstream |
| `uvloop` | `0.23.0` | MIT License |
| `watchfiles` | `1.3.0` | MIT |
| `wcwidth` | `0.9.4` | MIT License |
| `websockets` | `17.4` | Not stated in PyPI metadata; verify upstream |
| `wrapt` | `2.5.2` | Not stated in PyPI metadata; verify upstream |

### Web npm (`web/package-lock.json`) — 284 packages

Includes production and development dependency trees.

| Package | Locked version | Declared license |
|---|---:|---|
| `@babel/code-frame` | `8.0.6` | MIT |
| `@babel/code-frame/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/compat-data` | `8.0.5` | MIT |
| `@babel/core` | `8.1.0` | MIT |
| `@babel/core/node_modules/@babel/helper-string-parser` | `8.0.8` | MIT |
| `@babel/core/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/core/node_modules/@babel/parser` | `8.1.0` | MIT |
| `@babel/core/node_modules/@babel/types` | `8.1.0` | MIT |
| `@babel/generator` | `8.1.0` | MIT |
| `@babel/generator/node_modules/@babel/helper-string-parser` | `8.0.8` | MIT |
| `@babel/generator/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/generator/node_modules/@babel/parser` | `8.1.0` | MIT |
| `@babel/generator/node_modules/@babel/types` | `8.1.0` | MIT |
| `@babel/helper-compilation-targets` | `8.0.7` | MIT |
| `@babel/helper-globals` | `8.0.6` | MIT |
| `@babel/helper-module-imports` | `7.29.7` | MIT |
| `@babel/helper-module-imports/node_modules/@babel/code-frame` | `7.29.7` | MIT |
| `@babel/helper-module-imports/node_modules/@babel/generator` | `7.29.12` | MIT |
| `@babel/helper-module-imports/node_modules/@babel/helper-globals` | `7.29.7` | MIT |
| `@babel/helper-module-imports/node_modules/@babel/template` | `7.29.7` | MIT |
| `@babel/helper-module-imports/node_modules/@babel/traverse` | `7.29.12` | MIT |
| `@babel/helper-module-imports/node_modules/@jridgewell/gen-mapping` | `0.3.13` | MIT |
| `@babel/helper-module-imports/node_modules/js-tokens` | `4.0.0` | MIT |
| `@babel/helper-string-parser` | `7.29.11` | MIT |
| `@babel/helper-validator-identifier` | `7.29.7` | MIT |
| `@babel/helper-validator-option` | `8.0.0` | MIT |
| `@babel/helpers` | `8.1.0` | MIT |
| `@babel/helpers/node_modules/@babel/helper-string-parser` | `8.0.8` | MIT |
| `@babel/helpers/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/helpers/node_modules/@babel/types` | `8.1.0` | MIT |
| `@babel/parser` | `7.29.12` | MIT |
| `@babel/template` | `8.0.0` | MIT |
| `@babel/template/node_modules/@babel/helper-string-parser` | `8.0.8` | MIT |
| `@babel/template/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/template/node_modules/@babel/parser` | `8.1.0` | MIT |
| `@babel/template/node_modules/@babel/types` | `8.1.0` | MIT |
| `@babel/traverse` | `8.1.0` | MIT |
| `@babel/traverse/node_modules/@babel/helper-string-parser` | `8.0.8` | MIT |
| `@babel/traverse/node_modules/@babel/helper-validator-identifier` | `8.0.6` | MIT |
| `@babel/traverse/node_modules/@babel/parser` | `8.1.0` | MIT |
| `@babel/traverse/node_modules/@babel/types` | `8.1.0` | MIT |
| `@babel/types` | `7.29.11` | MIT |
| `@cacheable/memory` | `2.2.0` | MIT |
| `@cacheable/utils` | `2.5.0` | MIT |
| `@eslint-community/eslint-utils` | `4.10.1` | MIT |
| `@eslint-community/eslint-utils/node_modules/eslint-visitor-keys` | `3.4.3` | Apache-2.0 |
| `@eslint-community/regexpp` | `4.12.2` | MIT |
| `@eslint/config-array` | `0.23.5` | Apache-2.0 |
| `@eslint/config-helpers` | `0.7.0` | Apache-2.0 |
| `@eslint/core` | `1.2.1` | Apache-2.0 |
| `@eslint/js` | `10.0.1` | MIT |
| `@eslint/object-schema` | `3.0.5` | Apache-2.0 |
| `@eslint/plugin-kit` | `0.7.3` | Apache-2.0 |
| `@go-task/cli` | `3.54.0` | MIT |
| `@humanfs/core` | `0.19.2` | Apache-2.0 |
| `@humanfs/node` | `0.16.8` | Apache-2.0 |
| `@humanfs/types` | `0.15.0` | Apache-2.0 |
| `@humanwhocodes/module-importer` | `1.0.1` | Apache-2.0 |
| `@humanwhocodes/retry` | `0.4.3` | Apache-2.0 |
| `@isaacs/fs-minipass` | `4.0.1` | ISC |
| `@isaacs/nonrecursive-glob-match` | `1.1.0` | BlueOak-1.0.0 |
| `@jridgewell/gen-mapping` | `0.4.0-beta.0` | MIT |
| `@jridgewell/remapping` | `2.3.5` | MIT |
| `@jridgewell/remapping/node_modules/@jridgewell/gen-mapping` | `0.3.13` | MIT |
| `@jridgewell/resolve-uri` | `3.1.2` | MIT |
| `@jridgewell/sourcemap-codec` | `1.6.0` | MIT |
| `@jridgewell/trace-mapping` | `0.3.31` | MIT |
| `@keyv/bigmap` | `1.3.1` | MIT |
| `@keyv/serialize` | `1.1.1` | MIT |
| `@oxc-project/types` | `0.156.0` | MIT |
| `@rolldown/binding-android-arm-eabi` | `1.2.16` | MIT |
| `@rolldown/binding-android-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-darwin-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-darwin-x64` | `1.2.16` | MIT |
| `@rolldown/binding-freebsd-x64` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm-gnueabihf` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm64-musl` | `1.2.16` | MIT |
| `@rolldown/binding-linux-ppc64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-s390x-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-x64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-x64-musl` | `1.2.16` | MIT |
| `@rolldown/binding-openharmony-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-win32-arm64-msvc` | `1.2.16` | MIT |
| `@rolldown/binding-win32-x64-msvc` | `1.2.16` | MIT |
| `@rolldown/plugin-babel` | `0.3.0` | MIT |
| `@rolldown/pluginutils` | `1.0.1` | MIT |
| `@types/babel__core` | `7.20.5` | MIT |
| `@types/babel__generator` | `7.27.0` | MIT |
| `@types/babel__template` | `7.4.4` | MIT |
| `@types/babel__traverse` | `7.28.0` | MIT |
| `@types/esrecurse` | `4.3.1` | MIT |
| `@types/estree` | `1.0.10` | MIT |
| `@types/gensync` | `1.0.5` | MIT |
| `@types/jsesc` | `2.5.1` | MIT |
| `@types/json-schema` | `7.0.15` | MIT |
| `@types/node` | `26.6.6` | MIT |
| `@types/react` | `19.3.0` | MIT |
| `@types/react-dom` | `19.3.0` | MIT |
| `@typescript-eslint/eslint-plugin` | `8.72.1` | MIT |
| `@typescript-eslint/eslint-plugin/node_modules/ignore` | `7.0.14` | MIT |
| `@typescript-eslint/parser` | `8.72.1` | MIT |
| `@typescript-eslint/project-service` | `8.72.1` | MIT |
| `@typescript-eslint/scope-manager` | `8.72.1` | MIT |
| `@typescript-eslint/tsconfig-utils` | `8.72.1` | MIT |
| `@typescript-eslint/type-utils` | `8.72.1` | MIT |
| `@typescript-eslint/types` | `8.72.1` | MIT |
| `@typescript-eslint/typescript-estree` | `8.72.1` | MIT |
| `@typescript-eslint/typescript-estree/node_modules/semver` | `7.8.6` | ISC |
| `@typescript-eslint/utils` | `8.72.1` | MIT |
| `@typescript-eslint/visitor-keys` | `8.72.1` | MIT |
| `@vitejs/plugin-react` | `6.2.1` | MIT |
| `acorn` | `8.19.0` | MIT |
| `acorn-jsx` | `5.3.2` | MIT |
| `agent-base` | `9.0.0` | MIT |
| `ajv` | `6.15.0` | MIT |
| `artichokie` | `0.4.5` | MIT |
| `ast-types` | `0.13.4` | MIT |
| `babel-plugin-react-compiler` | `1.0.0` | MIT |
| `balanced-match` | `4.0.4` | MIT |
| `baseline-browser-mapping` | `2.11.34` | Apache-2.0 |
| `basic-ftp` | `6.2.6` | MIT |
| `brace-expansion` | `5.0.12` | MIT |
| `browserslist` | `4.29.5` | MIT |
| `cacheable` | `2.5.0` | MIT |
| `caniuse-lite` | `1.0.30001820` | CC-BY-4.0 |
| `chownr` | `3.0.0` | BlueOak-1.0.0 |
| `convert-source-map` | `2.0.0` | MIT |
| `core-util-is` | `1.0.3` | MIT |
| `cross-spawn` | `7.0.6` | MIT |
| `csstype` | `3.2.3` | MIT |
| `data-uri-to-buffer` | `8.0.0` | MIT |
| `debug` | `4.4.3` | MIT |
| `deep-is` | `0.1.4` | MIT |
| `degenerator` | `7.0.1` | MIT |
| `detect-libc` | `2.1.2` | Apache-2.0 |
| `electron-to-chromium` | `1.5.472` | ISC |
| `empathic` | `2.1.0` | MIT |
| `escalade` | `3.2.0` | MIT |
| `escape-string-regexp` | `4.0.0` | MIT |
| `escodegen` | `2.1.0` | BSD-2-Clause |
| `eslint` | `10.14.0` | MIT |
| `eslint-plugin-react-hooks` | `7.1.1` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/code-frame` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/compat-data` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/core` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/generator` | `7.29.12` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/helper-compilation-targets` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/helper-globals` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/helper-module-transforms` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/helper-validator-option` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/helpers` | `7.29.10` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/template` | `7.29.7` | MIT |
| `eslint-plugin-react-hooks/node_modules/@babel/traverse` | `7.29.12` | MIT |
| `eslint-plugin-react-hooks/node_modules/@jridgewell/gen-mapping` | `0.3.13` | MIT |
| `eslint-plugin-react-hooks/node_modules/js-tokens` | `4.0.0` | MIT |
| `eslint-plugin-react-refresh` | `0.5.7` | MIT |
| `eslint-scope` | `9.1.2` | BSD-2-Clause |
| `eslint-visitor-keys` | `5.0.1` | Apache-2.0 |
| `espree` | `11.2.0` | BSD-2-Clause |
| `esprima` | `4.0.1` | BSD-2-Clause |
| `esquery` | `1.7.0` | BSD-3-Clause |
| `esrecurse` | `4.3.0` | BSD-2-Clause |
| `estraverse` | `5.3.0` | BSD-2-Clause |
| `esutils` | `2.0.3` | BSD-2-Clause |
| `fast-deep-equal` | `3.1.3` | MIT |
| `fast-json-stable-stringify` | `2.1.0` | MIT |
| `fast-levenshtein` | `2.0.6` | MIT |
| `fdir` | `6.5.0` | MIT |
| `file-entry-cache` | `11.1.5` | MIT |
| `find-up` | `5.0.0` | MIT |
| `flat-cache` | `6.1.23` | MIT |
| `flatted` | `3.4.4` | ISC |
| `flru` | `1.0.2` | MIT |
| `fsevents` | `2.3.3` | MIT |
| `gensync` | `1.0.0-beta.2` | MIT |
| `get-uri` | `8.0.1` | MIT |
| `glob-parent` | `6.0.2` | ISC |
| `globals` | `17.14.0` | MIT |
| `hashery` | `1.5.1` | MIT |
| `hermes-estree` | `0.25.1` | MIT |
| `hermes-parser` | `0.25.1` | MIT |
| `hookified` | `1.15.1` | MIT |
| `http-proxy-agent` | `9.1.0` | MIT |
| `https-proxy-agent` | `9.1.0` | MIT |
| `ignore` | `5.3.2` | MIT |
| `immediate` | `3.0.6` | MIT |
| `import-meta-resolve` | `4.2.0` | MIT |
| `imurmurhash` | `0.1.4` | MIT |
| `inherits` | `2.0.4` | ISC |
| `ip-address` | `10.7.6` | MIT |
| `is-extglob` | `2.1.1` | MIT |
| `is-glob` | `4.0.3` | MIT |
| `isarray` | `1.0.0` | MIT |
| `isexe` | `2.0.0` | ISC |
| `js-tokens` | `10.0.0` | MIT |
| `jsesc` | `3.1.0` | MIT |
| `json-schema-traverse` | `0.4.1` | MIT |
| `json-stable-stringify-without-jsonify` | `1.0.1` | MIT |
| `json5` | `2.2.3` | MIT |
| `jszip` | `3.10.2` | (MIT OR GPL-3.0-or-later) |
| `keyv` | `5.6.0` | MIT |
| `levn` | `0.4.1` | MIT |
| `lie` | `3.3.0` | MIT |
| `lightningcss` | `1.33.0` | MPL-2.0 |
| `lightningcss-android-arm64` | `1.33.0` | MPL-2.0 |
| `lightningcss-darwin-arm64` | `1.33.0` | MPL-2.0 |
| `lightningcss-darwin-x64` | `1.33.0` | MPL-2.0 |
| `lightningcss-freebsd-x64` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm-gnueabihf` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm64-gnu` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm64-musl` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-x64-gnu` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-x64-musl` | `1.33.0` | MPL-2.0 |
| `lightningcss-win32-arm64-msvc` | `1.33.0` | MPL-2.0 |
| `lightningcss-win32-x64-msvc` | `1.33.0` | MPL-2.0 |
| `locate-path` | `6.0.0` | MIT |
| `lru-cache` | `5.1.1` | ISC |
| `minimatch` | `11.0.5` | BlueOak-1.0.0 |
| `minipass` | `7.1.3` | BlueOak-1.0.0 |
| `minizlib` | `3.1.0` | MIT |
| `ms` | `2.1.3` | MIT |
| `nanoid` | `3.3.20` | MIT |
| `natural-compare` | `1.4.0` | MIT |
| `netmask` | `2.1.1` | MIT |
| `node-releases` | `2.0.63` | MIT |
| `obug` | `3.0.0` | MIT |
| `optionator` | `0.9.4` | MIT |
| `p-limit` | `3.1.0` | MIT |
| `p-locate` | `5.0.0` | MIT |
| `pac-proxy-agent` | `9.1.0` | MIT |
| `pac-resolver` | `9.0.1` | MIT |
| `pako` | `1.0.11` | (MIT AND Zlib) |
| `path-exists` | `4.0.0` | MIT |
| `path-key` | `3.1.1` | MIT |
| `picocolors` | `1.1.1` | ISC |
| `picomatch` | `4.0.7` | MIT |
| `postcss` | `8.5.32` | MIT |
| `prelude-ls` | `1.2.1` | MIT |
| `process-nextick-args` | `2.0.1` | MIT |
| `proxy-agent` | `8.0.2` | MIT |
| `proxy-agent-negotiate` | `1.1.0` | MIT |
| `proxy-agent/node_modules/lru-cache` | `7.18.3` | ISC |
| `proxy-from-env` | `2.1.0` | MIT |
| `punycode` | `2.3.1` | MIT |
| `qified` | `0.10.1` | MIT |
| `qified/node_modules/hookified` | `2.2.0` | MIT |
| `quickjs-wasi` | `2.2.0` | MIT |
| `react` | `19.3.1` | MIT |
| `react-dom` | `19.3.1` | MIT |
| `readable-stream` | `2.3.8` | MIT |
| `rolldown` | `1.2.16` | MIT |
| `safe-buffer` | `5.1.2` | MIT |
| `scheduler` | `0.28.0` | MIT |
| `semver` | `6.3.1` | ISC |
| `setimmediate` | `1.0.5` | MIT |
| `shebang-command` | `2.0.0` | MIT |
| `shebang-regex` | `3.0.0` | MIT |
| `smart-buffer` | `4.2.0` | MIT |
| `socks` | `2.8.10` | MIT |
| `socks-proxy-agent` | `10.1.0` | MIT |
| `source-map` | `0.6.1` | BSD-3-Clause |
| `source-map-js` | `1.2.2` | BSD-3-Clause |
| `string_decoder` | `1.1.1` | MIT |
| `tar` | `7.5.22` | BlueOak-1.0.0 |
| `tar/node_modules/yallist` | `5.0.0` | BlueOak-1.0.0 |
| `tinyglobby` | `0.2.17` | MIT |
| `ts-api-utils` | `2.5.0` | MIT |
| `tslib` | `2.9.1` | 0BSD |
| `type-check` | `0.4.0` | MIT |
| `typescript` | `5.9.3` | Apache-2.0 |
| `typescript-eslint` | `8.72.1` | MIT |
| `undici-types` | `8.9.0` | MIT |
| `update-browserslist-db` | `1.3.4` | MIT |
| `uri-js` | `4.4.1` | BSD-2-Clause |
| `util-deprecate` | `1.0.2` | MIT |
| `verkit` | `0.5.0` | MIT |
| `vite` | `8.3.5` | MIT |
| `which` | `2.0.2` | ISC |
| `word-wrap` | `1.2.5` | MIT |
| `yallist` | `3.1.1` | ISC |
| `yocto-queue` | `0.1.0` | MIT |
| `zod` | `4.6.7` | MIT |
| `zod-validation-error` | `4.0.2` | MIT |

### Laravel frontend npm (`laravel/package-lock.json`) — 137 packages

Includes production, development, and optional dependency trees.

| Package | Locked version | Declared license |
|---|---:|---|
| `@alcalzone/ansi-tokenize` | `0.3.1` | MIT |
| `@alcalzone/ansi-tokenize/node_modules/ansi-styles` | `6.2.3` | MIT |
| `@jridgewell/gen-mapping` | `0.3.13` | MIT |
| `@jridgewell/remapping` | `2.3.5` | MIT |
| `@jridgewell/resolve-uri` | `3.1.2` | MIT |
| `@jridgewell/sourcemap-codec` | `1.6.0` | MIT |
| `@jridgewell/trace-mapping` | `0.3.31` | MIT |
| `@laravel/multiplex` | `0.4.5` | MIT |
| `@oxc-project/types` | `0.156.0` | MIT |
| `@rolldown/binding-android-arm-eabi` | `1.2.16` | MIT |
| `@rolldown/binding-android-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-darwin-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-darwin-x64` | `1.2.16` | MIT |
| `@rolldown/binding-freebsd-x64` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm-gnueabihf` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-arm64-musl` | `1.2.16` | MIT |
| `@rolldown/binding-linux-ppc64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-s390x-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-x64-gnu` | `1.2.16` | MIT |
| `@rolldown/binding-linux-x64-musl` | `1.2.16` | MIT |
| `@rolldown/binding-openharmony-arm64` | `1.2.16` | MIT |
| `@rolldown/binding-win32-arm64-msvc` | `1.2.16` | MIT |
| `@rolldown/binding-win32-x64-msvc` | `1.2.16` | MIT |
| `@rolldown/pluginutils` | `1.1.0` | MIT |
| `@tailwindcss/node` | `4.3.5` | MIT |
| `@tailwindcss/oxide` | `4.3.5` | MIT |
| `@tailwindcss/oxide-android-arm64` | `4.3.5` | MIT |
| `@tailwindcss/oxide-darwin-arm64` | `4.3.5` | MIT |
| `@tailwindcss/oxide-darwin-x64` | `4.3.5` | MIT |
| `@tailwindcss/oxide-freebsd-x64` | `4.3.5` | MIT |
| `@tailwindcss/oxide-linux-arm-gnueabihf` | `4.3.5` | MIT |
| `@tailwindcss/oxide-linux-arm64-gnu` | `4.3.5` | MIT |
| `@tailwindcss/oxide-linux-arm64-musl` | `4.3.5` | MIT |
| `@tailwindcss/oxide-linux-x64-gnu` | `4.3.5` | MIT |
| `@tailwindcss/oxide-linux-x64-musl` | `4.3.5` | MIT |
| `@tailwindcss/oxide-wasm32-wasi` | `4.3.5` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/core` | `1.11.3` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/runtime` | `1.11.3` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/@emnapi/wasi-threads` | `1.2.3` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/@napi-rs/wasm-runtime` | `1.2.2` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/@tybys/wasm-util` | `0.10.3` | MIT |
| `@tailwindcss/oxide-wasm32-wasi/node_modules/tslib` | `2.8.1` | 0BSD |
| `@tailwindcss/oxide-win32-arm64-msvc` | `4.3.5` | MIT |
| `@tailwindcss/oxide-win32-x64-msvc` | `4.3.5` | MIT |
| `@tailwindcss/vite` | `4.3.5` | MIT |
| `ansi-escapes` | `7.3.0` | MIT |
| `ansi-regex` | `6.6.0` | MIT |
| `ansi-styles` | `7.0.0` | MIT |
| `auto-bind` | `5.0.1` | MIT |
| `chalk` | `5.6.2` | MIT |
| `cli-boxes` | `4.0.1` | MIT |
| `cli-cursor` | `4.0.0` | MIT |
| `cli-truncate` | `6.2.0` | MIT |
| `cli-truncate/node_modules/slice-ansi` | `10.0.1` | MIT |
| `cliui` | `9.0.1` | ISC |
| `cliui/node_modules/ansi-styles` | `6.2.3` | MIT |
| `cliui/node_modules/string-width` | `7.2.0` | MIT |
| `cliui/node_modules/wrap-ansi` | `9.0.2` | MIT |
| `code-excerpt` | `4.0.0` | MIT |
| `commander` | `15.1.0` | MIT |
| `concurrently` | `10.0.7` | MIT |
| `convert-to-spaces` | `2.0.1` | MIT |
| `detect-libc` | `2.1.2` | Apache-2.0 |
| `emoji-regex` | `10.6.0` | MIT |
| `enhanced-resolve` | `5.26.1` | MIT |
| `environment` | `1.1.0` | MIT |
| `es-toolkit` | `1.53.2` | MIT |
| `escalade` | `3.2.0` | MIT |
| `escape-string-regexp` | `2.0.0` | MIT |
| `fdir` | `6.5.0` | MIT |
| `fsevents` | `2.3.3` | MIT |
| `get-caller-file` | `2.0.5` | ISC |
| `get-east-asian-width` | `1.7.0` | MIT |
| `graceful-fs` | `4.2.11` | ISC |
| `indent-string` | `5.0.0` | MIT |
| `ink` | `7.1.1` | MIT |
| `ink/node_modules/ansi-styles` | `6.2.3` | MIT |
| `is-fullwidth-code-point` | `5.1.0` | MIT |
| `is-in-ci` | `2.0.0` | MIT |
| `jiti` | `2.7.0` | MIT |
| `laravel-vite-plugin` | `3.2.1` | MIT |
| `lightningcss` | `1.33.0` | MPL-2.0 |
| `lightningcss-android-arm64` | `1.33.0` | MPL-2.0 |
| `lightningcss-darwin-arm64` | `1.33.0` | MPL-2.0 |
| `lightningcss-darwin-x64` | `1.33.0` | MPL-2.0 |
| `lightningcss-freebsd-x64` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm-gnueabihf` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm64-gnu` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-arm64-musl` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-x64-gnu` | `1.33.0` | MPL-2.0 |
| `lightningcss-linux-x64-musl` | `1.33.0` | MPL-2.0 |
| `lightningcss-win32-arm64-msvc` | `1.33.0` | MPL-2.0 |
| `lightningcss-win32-x64-msvc` | `1.33.0` | MPL-2.0 |
| `magic-string` | `1.4.5` | MIT |
| `mimic-fn` | `2.1.0` | MIT |
| `nanoid` | `3.3.20` | MIT |
| `onetime` | `5.1.2` | MIT |
| `patch-console` | `2.0.0` | MIT |
| `picocolors` | `1.1.1` | ISC |
| `picomatch` | `4.0.7` | MIT |
| `postcss` | `8.5.32` | MIT |
| `react` | `19.3.1` | MIT |
| `react-reconciler` | `0.33.0` | MIT |
| `restore-cursor` | `4.0.0` | MIT |
| `rolldown` | `1.2.16` | MIT |
| `rxjs` | `7.8.2` | Apache-2.0 |
| `scheduler` | `0.27.0` | MIT |
| `shell-quote` | `1.12.0` | MIT |
| `signal-exit` | `3.0.7` | ISC |
| `slice-ansi` | `9.0.1` | MIT |
| `slice-ansi/node_modules/ansi-styles` | `6.2.3` | MIT |
| `source-map-js` | `1.2.2` | BSD-3-Clause |
| `stack-utils` | `2.0.6` | MIT |
| `string-width` | `8.3.0` | MIT |
| `strip-ansi` | `7.2.0` | MIT |
| `supports-color` | `10.2.2` | MIT |
| `tagged-tag` | `1.0.0` | MIT |
| `tailwindcss` | `4.3.5` | MIT |
| `tapable` | `2.3.3` | MIT |
| `terminal-size` | `4.0.1` | MIT |
| `tinyglobby` | `0.2.17` | MIT |
| `tree-kill` | `1.2.2` | MIT |
| `tslib` | `2.9.1` | 0BSD |
| `type-fest` | `5.10.0` | (MIT OR CC0-1.0) |
| `vite` | `8.3.6` | MIT |
| `vite-plugin-full-reload` | `1.2.0` | MIT |
| `vite-plugin-full-reload/node_modules/picomatch` | `2.3.2` | MIT |
| `widest-line` | `6.0.0` | MIT |
| `wrap-ansi` | `10.0.2` | MIT |
| `wrap-ansi/node_modules/ansi-styles` | `6.2.3` | MIT |
| `ws` | `8.22.2` | MIT |
| `y18n` | `5.0.8` | ISC |
| `yargs` | `18.0.0` | MIT |
| `yargs-parser` | `22.0.0` | ISC |
| `yargs/node_modules/string-width` | `7.2.0` | MIT |
| `yoga-layout` | `3.2.1` | MIT |

### Laravel Composer (`laravel/composer.lock`) — 112 packages

Includes production and development packages.

| Package | Locked version | Declared license |
|---|---:|---|
| `brick/math` | `1.0.0` | MIT |
| `carbonphp/carbon-doctrine-types` | `3.2.1` | MIT |
| `dflydev/dot-access-data` | `v3.0.3` | MIT |
| `doctrine/inflector` | `2.1.1` | MIT |
| `doctrine/lexer` | `3.0.3` | MIT |
| `dragonmantank/cron-expression` | `v3.6.1` | MIT |
| `egulias/email-validator` | `4.0.4` | MIT |
| `fakerphp/faker` | `v1.24.1` | MIT |
| `filp/whoops` | `2.19.1` | MIT |
| `fruitcake/php-cors` | `v1.4.0` | MIT |
| `graham-campbell/result-type` | `v1.2.0` | MIT |
| `guzzlehttp/guzzle` | `8.3.1` | MIT |
| `guzzlehttp/promises` | `3.1.0` | MIT |
| `guzzlehttp/psr7` | `3.2.0` | MIT |
| `guzzlehttp/uri-template` | `v2.0.1` | MIT |
| `hamcrest/hamcrest-php` | `v3.0.0` | BSD-3-Clause |
| `laravel/agent-detector` | `v2.0.5` | MIT |
| `laravel/framework` | `v13.39.0` | MIT |
| `laravel/pail` | `v1.2.7` | MIT |
| `laravel/pao` | `v1.1.5` | MIT |
| `laravel/pint` | `v1.32.1` | MIT |
| `laravel/prompts` | `v0.3.26` | MIT |
| `laravel/sanctum` | `v4.3.3` | MIT |
| `laravel/serializable-closure` | `v2.1.0` | MIT |
| `laravel/tinker` | `v3.0.2` | MIT |
| `league/commonmark` | `2.10.7` | BSD-3-Clause |
| `league/config` | `v1.2.0` | BSD-3-Clause |
| `league/flysystem` | `3.36.0` | MIT |
| `league/flysystem-local` | `3.35.3` | MIT |
| `league/mime-type-detection` | `1.17.0` | MIT |
| `league/uri` | `7.9.1` | MIT |
| `league/uri-interfaces` | `7.9.1` | MIT |
| `mockery/mockery` | `1.6.15` | BSD-3-Clause |
| `monolog/monolog` | `3.12.1` | MIT |
| `myclabs/deep-copy` | `1.14.0` | MIT |
| `nesbot/carbon` | `3.15.1` | MIT |
| `nette/schema` | `v1.4.0` | BSD-3-Clause OR GPL-2.0-only OR GPL-3.0-only |
| `nette/utils` | `v4.1.6` | BSD-3-Clause OR GPL-2.0-only OR GPL-3.0-only |
| `nikic/php-parser` | `v5.9.0` | BSD-3-Clause |
| `nunomaduro/collision` | `v8.9.5` | MIT |
| `nunomaduro/termwind` | `v2.4.0` | MIT |
| `phar-io/manifest` | `2.0.4` | BSD-3-Clause |
| `phar-io/version` | `3.2.1` | BSD-3-Clause |
| `phpoption/phpoption` | `1.10.0` | Apache-2.0 |
| `phpunit/php-code-coverage` | `14.5.2` | BSD-3-Clause |
| `phpunit/php-file-iterator` | `7.0.2` | BSD-3-Clause |
| `phpunit/php-invoker` | `7.0.0` | BSD-3-Clause |
| `phpunit/php-text-template` | `6.0.1` | BSD-3-Clause |
| `phpunit/php-timer` | `9.0.0` | BSD-3-Clause |
| `phpunit/phpunit` | `13.4.6` | BSD-3-Clause |
| `psr/clock` | `1.0.0` | MIT |
| `psr/container` | `2.0.2` | MIT |
| `psr/event-dispatcher` | `1.0.0` | MIT |
| `psr/http-client` | `1.0.3` | MIT |
| `psr/http-factory` | `1.1.0` | MIT |
| `psr/http-message` | `2.0` | MIT |
| `psr/log` | `3.0.2` | MIT |
| `psr/simple-cache` | `3.0.0` | MIT |
| `psy/psysh` | `v0.12.24` | MIT |
| `ramsey/collection` | `2.1.1` | MIT |
| `ramsey/uuid` | `4.9.4` | MIT |
| `sebastian/cli-parser` | `5.0.1` | BSD-3-Clause |
| `sebastian/comparator` | `8.4.0` | BSD-3-Clause |
| `sebastian/complexity` | `6.0.0` | BSD-3-Clause |
| `sebastian/diff` | `9.0.1` | BSD-3-Clause |
| `sebastian/environment` | `9.3.3` | BSD-3-Clause |
| `sebastian/exporter` | `8.2.1` | BSD-3-Clause |
| `sebastian/file-filter` | `1.0.0` | BSD-3-Clause |
| `sebastian/git-state` | `1.1.0` | BSD-3-Clause |
| `sebastian/global-state` | `9.0.1` | BSD-3-Clause |
| `sebastian/lines-of-code` | `5.0.2` | BSD-3-Clause |
| `sebastian/object-enumerator` | `8.1.0` | BSD-3-Clause |
| `sebastian/object-reflector` | `6.1.0` | BSD-3-Clause |
| `sebastian/recursion-context` | `8.0.1` | BSD-3-Clause |
| `sebastian/type` | `7.0.2` | BSD-3-Clause |
| `sebastian/version` | `7.1.0` | BSD-3-Clause |
| `staabm/side-effects-detector` | `1.0.5` | MIT |
| `symfony/clock` | `v8.1.9` | MIT |
| `symfony/console` | `v8.1.10` | MIT |
| `symfony/css-selector` | `v8.1.10` | MIT |
| `symfony/deprecation-contracts` | `v3.7.1` | MIT |
| `symfony/error-handler` | `v8.1.10` | MIT |
| `symfony/event-dispatcher` | `v8.1.5` | MIT |
| `symfony/event-dispatcher-contracts` | `v3.7.1` | MIT |
| `symfony/finder` | `v8.1.10` | MIT |
| `symfony/http-foundation` | `v8.1.10` | MIT |
| `symfony/http-kernel` | `v8.1.10` | MIT |
| `symfony/mailer` | `v8.1.10` | MIT |
| `symfony/mime` | `v8.1.10` | MIT |
| `symfony/polyfill-ctype` | `v1.37.0` | MIT |
| `symfony/polyfill-intl-grapheme` | `v1.43.3` | MIT |
| `symfony/polyfill-intl-idn` | `v1.43.0` | MIT |
| `symfony/polyfill-intl-normalizer` | `v1.43.0` | MIT |
| `symfony/polyfill-mbstring` | `v1.43.3` | MIT |
| `symfony/polyfill-php80` | `v1.43.0` | MIT |
| `symfony/polyfill-php82` | `v1.43.0` | MIT |
| `symfony/polyfill-php84` | `v1.43.0` | MIT |
| `symfony/polyfill-php85` | `v1.43.0` | MIT |
| `symfony/polyfill-php86` | `v1.43.0` | MIT |
| `symfony/polyfill-time` | `v1.42.0` | MIT |
| `symfony/polyfill-uuid` | `v1.43.0` | MIT |
| `symfony/process` | `v8.1.10` | MIT |
| `symfony/routing` | `v8.1.10` | MIT |
| `symfony/service-contracts` | `v3.7.3` | MIT |
| `symfony/string` | `v8.1.10` | MIT |
| `symfony/translation` | `v8.1.10` | MIT |
| `symfony/translation-contracts` | `v3.7.1` | MIT |
| `symfony/uid` | `v8.1.9` | MIT |
| `symfony/var-dumper` | `v8.1.10` | MIT |
| `tijsverkoyen/css-to-inline-styles` | `v2.4.0` | BSD-3-Clause |
| `vlucas/phpdotenv` | `v5.8.0` | BSD-3-Clause |
| `voku/portable-ascii` | `2.1.1` | MIT |

## 3. License Review Notes

- This inventory is a package metadata record, not a legal opinion or a determination that every license is compatible with every distribution model.
- Permissive licenses such as MIT, BSD, ISC, PSF, and Apache-2.0 generally allow use in a larger MPL-2.0 work subject to their notice and attribution terms. Preserve applicable notices when redistributing packages or binaries.
- Copyleft, source-available, custom, dual-licensed, missing, and otherwise ambiguous entries should be checked against the exact release license text and intended distribution model before release. Review applies to the package and its use; a license label alone is not a compatibility ruling.
- Python metadata can be absent or incomplete. Rows marked “Not stated” or “Could not retrieve” need manual verification from that package release’s authoritative source before distribution.
- The former architecture-only entries (such as PostgreSQL, Redis server, A2A, and frameworks named only in ADRs) are not counted as installed packages unless present in the lockfiles. Runtime services and protocols should be evaluated separately when they become concrete deployment dependencies.


## 4. Compliance Checklist for Project Developers

1. **Preserve Copyright and License Notices**: Always retain existing copyright notices in all third-party dependencies and Python wheels.
2. **MPL Source Header Requirement**: Any new Python source files or modifications to MPL-covered files in this repository should retain the notice in Exhibit A:
   ```
   This Source Code Form is subject to the terms of the Mozilla Public
   License, v. 2.0. If a copy of the MPL was not distributed with this
   file, You can obtain one at https://mozilla.org/MPL/2.0/.
   ```
3. **Larger Work Boundary**: The separation of the frontend (Vercel), Laravel backend, and FastAPI agent service into independent services and directories cleanly satisfies the "Larger Work" boundary under Section 3.3 of the MPL-2.0.
