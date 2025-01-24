# LTRIM

Removes leading characters from a string.

## Syntax

```scopeql
LTRIM( <expr> [, <chars> ] )
```

## Arguments

### `<expr>`

The string expression to be trimmed.

### `<chars>` (named) (optional)

One or more characters to remove from the left side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

### Examples

Remove leading `0` and `#` characters from a string:

```scopeql
SELECT LTRIM('#000000123', '0#');
```

```
+---------------------------+
| LTRIM('#000000123', '0#') |
|---------------------------|
| 123                       |
+---------------------------+
```
