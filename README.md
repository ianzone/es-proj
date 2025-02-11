## Config files for your JS/TS projects.

```bash
bun install -D es-proj
```

### tsconfig.json
Available extends:

- `es-proj/tsconfig.dom.json`
- `es-proj/tsconfig.node.json`
- `es-proj/tsconfig.react.json`
- `es-proj/tsconfig.rn.json`

```json
{
  "extends": "es-proj/tsconfig.react.json",
  "compilerOptions": {}
}
```

### biome.json
```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["es-proj/biome"]
}
```