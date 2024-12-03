---
sidebar_label: Numeric
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Numeric functions

Numeric functions operate on numeric values and perform operations such as rounding and truncation.

## CEIL

Returns values from `<input_expr>` rounded to the nearest equal or larger integer.

### Syntax

```scopeql
CEIL( <input_expr> )
```

### Returns

The return type is FLOAT.

### Arguments

#### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

### Examples

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

## FLOOR

Returns values from `<input_expr>` rounded to the nearest equal or smaller integer.

### Syntax

```scopeql
FLOOR( <input_expr> )
```

### Returns

The return type is FLOAT.

### Arguments

#### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

### Examples

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

## ROUND

Returns rounded values for `<input_expr>`. If the fractional part is exactly 0.5, the result is rounded away from zero.

### Syntax

```scopeql
ROUND( <input_expr> )
```

### Returns

The return type is FLOAT.

### Arguments

#### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

### Examples

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

## TRUNC

Rounds the input expression down to the nearest (or equal) integer closer to zero.

### Syntax

```scopeql
TRUNC( <input_expr> )
```

### Returns

The return type is FLOAT.

### Arguments

#### `<input_expr>`

The value or expression to operate on. The data type should be FLOAT.

### Examples

```scopeql
SELECT TRUNC(135.135), TRUNC(-975.975), TRUNC(2.5), TRUNC(-2.5);
```

```
+----------------+------------------+------------+--------------+
| TRUNC(135.135) | TRUNC(- 975.975) | TRUNC(2.5) | TRUNC(- 2.5) |
+----------------+------------------+------------+--------------+
| 135.0          | -975.0           | 2.0        | -2.0         |
+----------------+------------------+------------+--------------+
```
