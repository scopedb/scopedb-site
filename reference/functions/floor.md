# FLOOR

Returns values from `<input_expr>` rounded to the nearest equal or smaller integer.

## Syntax

```scopeql
FLOOR( <input_expr> )
```

## Returns

The return type is FLOAT.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

## Examples

```scopeql
SELECT FLOOR(135.135), FLOOR(-975.975), FLOOR(2.5), FLOOR(-2.5);
```

```
+----------------+------------------+------------+--------------+
| FLOOR(135.135) | FLOOR(- 975.975) | FLOOR(2.5) | FLOOR(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -976.0           | 2.0        | -3.0         |
+----------------+------------------+------------+--------------+
```
