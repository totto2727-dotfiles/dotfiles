---
name: chai-sinon
description: ChaiとSinonの使い方ガイド。strictEqualとdeepStrictEqualの使い分け、isTrue/isFalseなどの簡略化関数、SinonのcalledOnce/calledTwice/calledWithを活用したスタブ検証方法を提供。テストコード作成時やアサーション記述時に適用。
---

# Chai + Sinon の使い方

## 値の比較 - strictEqual と deepStrictEqual

値の一致検証には `strictEqual` または `deepStrictEqual` を使う。

- **プリミティブ**（文字列・数値・boolean）: `strictEqual`
- **オブジェクト・配列**: `deepStrictEqual`

### NG: オブジェクトを strictEqual で比較

参照比較になるため、内容が同じでも fail する。

```javascript
var result = { id: 1, name: 'test' };
assert.strictEqual(result, { id: 1, name: 'test' });
// AssertionError: expected { id: 1, name: 'test' } to equal { id: 1, name: 'test' }
```

### OK: オブジェクトは deepStrictEqual で比較

```javascript
var result = { id: 1, name: 'test' };
assert.deepStrictEqual(result, { id: 1, name: 'test' });
```

## オブジェクト・配列の検証

純粋なオブジェクトや配列は `deepStrictEqual` で全体をチェックする。

### 配列

```javascript
var result = getItems();
assert.deepStrictEqual(result, ['item1', 'item2']);
```

### オブジェクト

```javascript
var result = getConfig();
assert.deepStrictEqual(result, {
    name: 'test',
    value: 123
});
```

## 簡略化関数の活用

boolean・null・undefined・空判定には専用のアサーションを使う。

### isTrue / isFalse

```javascript
// NG
assert.strictEqual(result, true);
assert.strictEqual(stub.calledOnce, true);

// OK
assert.isTrue(result);
assert.isTrue(stub.calledOnce);
assert.isFalse(hasError);
```

### isNull / isNotNull

```javascript
assert.isNull(result);
assert.isNotNull(user);
```

### isUndefined / isDefined

```javascript
assert.isUndefined(optional);
assert.isDefined(required);
```

### isEmpty / isNotEmpty

```javascript
assert.isEmpty([]);
assert.isEmpty('');
assert.isNotEmpty(items);
```

## Sinon スタブの検証

`calledOnce`、`calledTwice`、`calledWith` を使い、isTrue/isFalse で検証する。

### NG: 呼び出し回数を数値で比較

```javascript
assert.strictEqual(stub.callCount, 1);
assert.strictEqual(stub.callCount, 2);
assert.strictEqual(stub.callCount, 0);
```

### OK: calledOnce / calledTwice / calledWith を使う

```javascript
assert.isTrue(stub.calledOnce);
assert.isTrue(stub.calledTwice);
assert.isTrue(stub.calledWith(expectedArg1, expectedArg2));
```

### 呼び出されないことの確認

2回以上呼ばれている可能性があるため、`calledOnce` ではなく `called` で判定する。

```javascript
// NG: calledOnce は「1回だけ」の意味。0回と2回以上を区別できない
assert.isFalse(stub.calledOnce);

// OK: called で「1回も呼ばれていない」を検証
assert.isFalse(stub.called);
```
