# TRIM

Removes leading and trailing characters from a string.

## Syntax

```scopeql
TRIM( <expr> [, <chars> ] )
```

## Arguments

### `<expr>`

The string expression to be trimmed.

### `<chars>` (named) (optional)

One or more characters to remove from the left and right side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

### Examples

Remove leading and trailing * and - characters from a string:

```scopeql
SELECT
    '*-*ABC-*-' AS original,
    TRIM('*-*ABC-*-', '*-') AS trimmed;
```

```
+-----------+---------+
| original  | trimmed |
+-----------+---------+
| *-*ABC-*- | ABC     |
+-----------+---------+
```
