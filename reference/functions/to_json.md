# TO_JSON

Converts a VARIANT value to a string containing the JSON representation of the value.

## Syntax

```scopeql
TO_JSON( <expr> )
```

## Arguments

### `<expr>`

An expression of type VARIANT that holds valid JSON information.

## Returns

Returns a value of type VARCHAR.

If the input is NULL, the function returns NULL.

## Examples

Handling NULL values with TO_JSON:

```scopeql
SELECT TO_JSON(NULL), TO_JSON('null'::VARIANT);
```

```
+---------------+--------------------------+
| TO_JSON(NULL) | TO_JSON('null'::VARIANT) |
+---------------+--------------------------+
| NULL          | "null"                   |
+---------------+--------------------------+
```

Comparing PARSE_JSON and TO_JSON:

```scopeql
SELECT TO_JSON(PARSE_JSON('{"b":1,"a":2}')),
       TO_JSON(PARSE_JSON('{"b":1,"a":2}')) = '{"b":1,"a":2}',
       TO_JSON(PARSE_JSON('{"b":1,"a":2}')) = '{"a":2,"b":1}';
```

```
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
| TO_JSON(PARSE_JSON('{"b":1,"a":2}')) | TO_JSON(PARSE_JSON('{"b":1,"a":2}')) = '{"b":1,"a":2}' | TO_JSON(PARSE_JSON('{"b":1,"a":2}')) = '{"a":2,"b":1}' |
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
| {"a":2,"b":1}                        | false                                                  | true                                                   |
+--------------------------------------+--------------------------------------------------------+--------------------------------------------------------+
```
