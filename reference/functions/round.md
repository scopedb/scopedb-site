# ROUND

Returns rounded values for `<input_expr>`. If the fractional part is exactly 0.5, the result is rounded away from zero.

## Syntax

```scopeql
ROUND( <input_expr> )
```

## Returns

The return type is FLOAT.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

## Examples

```scopeql
SELECT ROUND(135.135), ROUND(-975.975), ROUND(2.5), ROUND(-2.5);
```

```
+----------------+------------------+------------+--------------+
| ROUND(135.135) | ROUND(- 975.975) | ROUND(2.5) | ROUND(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -976.0           | 3.0        | -3.0         |
+----------------+------------------+------------+--------------+
```
