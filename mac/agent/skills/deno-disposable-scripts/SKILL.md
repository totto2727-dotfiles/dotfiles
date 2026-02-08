---
name: deno-disposable-scripts
description: Denoの使い捨てスクリプト作成時のコーディングルール。URLインポートを避け、npm:やjsr:プレフィックスを使用し、外部パッケージへのアクセスを最小化する。使い捨てスクリプトや一時的なDenoスクリプトを作成する際に適用。
---

# Deno Disposable Scripts

## 実行方法

```bash
# 適切な許可を割り当てること
sfw deno run --allow-net {{ファイル名}}
```

## Quick Start

使い捨てスクリプト作成時の3つの原則：

1. URLインポートは避ける
2. `npm:` / `jsr:` プレフィックスを活用
3. 外部パッケージへのアクセスを最小化

## Import Rules

### 使用する形式

```typescript
// npm パッケージ
import { z } from "npm:zod@3.22.4"

// jsr パッケージ
import { Hono } from "jsr:@hono/hono@4.0.0"
import { HttpException } from "jsr:@hono/hono@4.0.0/http-exception"

// Deno標準ライブラリ（jsr経由）
import { join } from "jsr:@std/path@1.0.0"
import { parse } from "jsr:@std/yaml@1.0.0"
```

### 避ける形式

```typescript
// NG: URLインポート
import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts"
```

## Best Practices

### Deno組み込みAPIを優先

外部パッケージを使う前に、Deno組み込みAPIで実現できないか確認：

```typescript
// ファイル操作
const content = await Deno.readTextFile("./data.json")
await Deno.writeTextFile("./output.txt", result)

// ディレクトリ操作
await Deno.mkdir("./output", { recursive: true })
for await (const entry of Deno.readDir("./src")) {
  console.log(entry.name)
}

// 環境変数
const apiKey = Deno.env.get("API_KEY")

// コマンド実行
const command = new Deno.Command("git", {
  args: ["status"],
  stdout: "piped",
})
const { stdout } = await command.output()
```

### 最小限の依存関係

必要な機能のみインポート：

```typescript
// OK: 必要な関数のみ
import { parse } from "jsr:@std/yaml@1.0.0"

// NG: パッケージ全体
import * as yaml from "jsr:@std/yaml@1.0.0"
```

## Examples

### 良い例

```typescript
import { parse } from "jsr:@std/yaml@1.0.0"

const config = parse(await Deno.readTextFile("./config.yaml"))
console.log(config)
```

### 悪い例

```typescript
// NG: URLインポート
import { parse } from "https://deno.land/std@0.208.0/yaml/mod.ts"

// NG: 不要な外部パッケージ
import * as fs from "npm:fs-extra"
```

## Additional Resources

- [Deno.* API一覧](https://docs.deno.com/api/deno/all_symbols) - Deno組み込みAPIのリファレンス
