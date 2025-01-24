# TYPEOF

Returns the type of value stored in a VARIANT column. The type is returned as a string.

## Syntax

```scopeql
TYPEOF( <expr> )
```

## Arguments

### `<expr>`

The argument can be a column name or a general expression of type VARIANT. If necessary, you can cast the expr to a VARIANT.

## Returns

Returns a STRING that contains the data type of the input expression, such as BOOLEAN, DECIMAL, ARRAY, OBJECT, etc.

## Examples

Create and populate a table. Note that the INSERT statement uses the PARSE_JSON function.

```scopeql
CREATE TABLE vartab (n INT, v VARIANT);
VALUES
    (1, 'null'),
    (2, null),
    (3, 'true'),
    (4, '-17'),
    (5, '123.12'),
    (6, '1.912e2'),
    (7, '"Om ara pa ca na dhih"  '),
    (8, '[-1, 12, 289, 2188, false]'),
    (9, '{ "x" : "abc", "y" : false, "z": 10} ')
SELECT $0 AS n, PARSE_JSON($1) AS v
INSERT INTO vartab;
```

Query the data:

```scopeql
FROM vartab
SELECT n, v, TYPEOF(v)
ORDER BY n;
```

```
+---+------------------------------+-----------+
| n | v                            | TYPEOF(v) |
+---+------------------------------+-----------+
| 1 | null                         | null      |
| 2 | NULL                         | NULL      |
| 3 | true                         | bool      |
| 4 | -17                          | int       |
| 5 | 123.12                       | float     |
| 6 | 191.2                        | float     |
| 7 | 'Om ara pa ca na dhih'       | string    |
| 8 | [-1,12,289,2188,false]       | array     |
| 9 | {"x":'abc',"y":false,"z":10} | object    |
+---+------------------------------+-----------+
```
