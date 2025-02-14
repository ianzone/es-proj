## Config files utils for your JS/TS projects.

```bash
bun install -D es-proj
```

### tsconfig.json
Available extends:

- `es-proj/tsconfig/dom`
- `es-proj/tsconfig/node`
- `es-proj/tsconfig/react`
- `es-proj/tsconfig/rn`

```json
{
  "extends": "es-proj/tsconfig/react"
}
```

### biome.json
```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["es-proj/biome"]
}
```

### Bun
```ts
import { run } from 'es-proj/bun'
```