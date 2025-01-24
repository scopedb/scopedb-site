# PARSE_JSON

Interprets an input string as a JSON document, producing a VARIANT value.

You can use the PARSE_JSON function when you have input data in JSON format. This function can convert data from JSON format to ARRAY or OBJECT data and store that data directly in a VARIANT value. You can then analyze or manipulate the data.

## Syntax

```scopeql
PARSE_JSON(<expr>)
```

## Arguments

### `<expr>`

An expression of string type that holds valid JSON information.

## Returns

Returns a value of type VARIANT that contains a JSON document.

If the input is NULL, the function returns NULL.

## Examples

Handling NULL values with PARSE_JSON:

```scopeql
SELECT PARSE_JSON(NULL), PARSE_JSON('null');
```

```
+------------------+--------------------+
| PARSE_JSON(NULL) | PARSE_JSON('null') |
+------------------+--------------------+
| NULL             | null               |
+------------------+--------------------+
```

Other regular calls:

```scopeql
SELECT PARSE_JSON('{"b":1,"a":2}');
```

```
+-----------------------------+
| PARSE_JSON('{"b":1,"a":2}') |
+-----------------------------+
| {"a":2,"b":1}               |
+-----------------------------+
```
