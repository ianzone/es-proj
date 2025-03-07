## Config files for your JS/TS projects.

```bash
bun install -D @es-proj/configs
```

### tsconfig.json
```json
{
  "extends": "@es-proj/configs/tsconfig.react"
}
```

Available extends:

- `@es-proj/configs/tsconfig.dom`
- `@es-proj/configs/tsconfig.node`
- `@es-proj/configs/tsconfig.react`
- `@es-proj/configs/tsconfig.rn`
- `@es-proj/configs/tsconfig.taro`

### biome.json
```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@es-proj/configs/biome"]
}
```
