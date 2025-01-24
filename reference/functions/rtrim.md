# RTRIM

Removes trailing characters from a string.

## Syntax

```scopeql
RTRIM( <expr> [, <chars> ] )
```

## Arguments

### `<expr>`

The string expression to be trimmed.

### `<chars>` (named) (optional)

One or more characters to remove from the right side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

### Examples

Remove trailing `0` and `.` characters from a string:

```scopeql
SELECT RTRIM('$125.00', '0.');
```

```
+------------------------+
| RTRIM('$125.00', '0.') |
+------------------------+
| $125                   |
+------------------------+
```
