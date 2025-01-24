# ARRAY_CONTAINS

Returns TRUE if the specified value is found in the specified array.

## Syntax

```scopeql
ARRAY_CONTAINS( <array> , <value_expr> )
```

## Arguments

### `<array>`

The array to search.

### `<value_expr>`

Value to find in `<array>`. The value is of VARIANT type.

## Returns

This function returns a value of BOOLEAN type or NULL:

* The function returns TRUE if `<value_expr>` is present in `<array>`.
* The function returns FALSE if `<value_expr>` is not present in `<array>`.
* The function returns NULL if either `<value_expr>` or `<array>` is NULL.
* The function returns NULL if `<array>` is not an ARRAY.

## Examples

The following queries use the ARRAY_CONTAINS function in a SELECT list:

```scopeql
SELECT
    ARRAY_CONTAINS(ARRAY_CONSTRUCT('hello', 'hi'), 'hello'::VARIANT) AS r1,
    ARRAY_CONTAINS(ARRAY_CONSTRUCT('hola', 'bonjour'), 'hello'::VARIANT) AS r2,
    ARRAY_CONTAINS(ARRAY_CONSTRUCT('hola', 'bonjour'), NULL) AS r3,
    ARRAY_CONTAINS(ARRAY_CONSTRUCT('hola', NULL), NULL) AS r4,
    ARRAY_CONTAINS(NULL, 'hello'::VARIANT) AS r5,
    ARRAY_CONTAINS({"key": "value"}, 'hello'::VARIANT) AS r6;
```

```
+------+-------+------+------+------+------+
| r1   | r2    | r3   | r4   | r5   | r6   |
+------+-------+------+------+------+------+
| true | false | NULL | NULL | NULL | NULL |
+------+-------+------+------+------+------+
```
