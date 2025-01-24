# CEIL

Returns values from `<input_expr>` rounded to the nearest equal or larger integer.

## Syntax

```scopeql
CEIL( <input_expr> )
```

## Returns

The return type is FLOAT.

## Arguments

### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

## Examples

```scopeql
SELECT CEIL(135.135), CEIL(-975.975), CEIL(2.5), CEIL(-2.5);
```

```
+---------------+-----------------+-----------+-------------+
| CEIL(135.135) | CEIL(- 975.975) | CEIL(2.5) | CEIL(- 2.5) |
+---------------+-----------------+-----------+-------------+
| 136.0         | -975.0          | 3.0       | -2.0        |
+---------------+-----------------+-----------+-------------+
```
