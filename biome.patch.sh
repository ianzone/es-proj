#!/usr/bin/env bash
set -Eeuo pipefail

# 遍历当前目录的所有 biome.json 文件
for file in biome*.json; do
  echo "Processing file: $file"
  # 检查文件是否包含 "$schema" 字段并且值以 "./node_modules" 开头
  if grep -q '"\$schema": *"./node_modules' "$file"; then

    # 使用 sed 修改内容
    sed -i 's#"\$schema": *"./node_modules#"$schema": "..#' "$file"

    echo "$file updated"
  fi
done
