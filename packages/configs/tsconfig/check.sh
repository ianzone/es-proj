#!/usr/bin/env bash
set -Eeuo pipefail

find . -name 'tsconfig*.json' -exec tsc --showConfig -p {} \;