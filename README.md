## Config files and utils for your JS/TS projects.

```bash
bun install -D es-proj
```

### tsconfig.json
```json
{
  "extends": "es-proj/tsconfig/react"
}
```

Available extends:

- `es-proj/tsconfig/dom`
- `es-proj/tsconfig/node`
- `es-proj/tsconfig/react`
- `es-proj/tsconfig/rn`
- `es-proj/tsconfig/taro`

### biome.json
```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["es-proj/biome"]
}
```

### Utils
```ts
import { run, git } from 'es-proj/js/bun'
import { measure } from 'es-proj/js/es'
```