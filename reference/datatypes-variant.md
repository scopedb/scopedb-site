---
sidebar_label: Variant
---

# Variant data type

The VARIANT data type can contain a value of any other data type.

## Inserting VARIANT data

To insert VARIANT data directly, use `SELECT ... INSERT INTO ...`. The following example shows how to insert JSON-formatted data into a VARIANT value:

```scopeql
CREATE TABLE variant_insert (v VARIANT);
SELECT PARSE_JSON('{"key1": "value1", "key2": "value2"}') INSERT INTO variant_insert;
FROM variant_insert;
```

```
+-----------------------------------+
| v                                 |
+-----------------------------------+
| {"key1":'value1',"key2":'value2'} |
+-----------------------------------+
```

Alternatively, you can use the variant literal syntax:

```scopeql
DELETE FROM variant_insert;
SELECT {"key3": 'value3', "key4": 'value4'} INSERT INTO variant_insert;
FROM variant_insert;
```

```
+-----------------------------------+
| v                                 |
+-----------------------------------+
| {"key3":'value3',"key4":'value4'} |
+-----------------------------------+
```

:::info[Syntax of variant literal]

The syntax or variant literal extends [the JSON format](https://datatracker.ietf.org/doc/html/rfc8259), with additions:

* Values are extended for `timestamp` and `interval` types. For example, `{ "ts": '2024-10-25T10:25:17Z'::timestamp }`. These values will be formatted as string when calling `TO_JSON`.

:::

## Using VARIANT values

To convert a value to or from the VARIANT data type, you can explicitly cast using the CAST function or the `::` operator (e.g. `<expr>::VARIANT`).

In some situations, a value can be implicitly cast to a VARIANT value. For details, see [data type conversion](datatypes-conversion.md).

To understand the VARIANT data, consider the following example:

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

Query the data with their value type:

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

VARIANT data has a total ordering, which means you can use the `ORDER BY` clause to sort the data.

```scopeql
FROM vartab WHERE v IS NOT NULL ORDER BY v DESC;
```

```
+---+------------------------------+
| n | v                            |
+---+------------------------------+
| 9 | {"x":'abc',"y":false,"z":10} |
| 8 | [-1,12,289,2188,false]       |
| 3 | true                         |
| 6 | 191.2                        |
| 5 | 123.12                       |
| 4 | -17                          |
| 7 | 'Om ara pa ca na dhih'       |
| 1 | null                         |
+---+------------------------------+
```

Between different variant types, the order is as follows:

```
Object > Array > Timestamp > Interval > Boolean > Number > String > Null
```

## Related content

See also [variant data functions](functions-variant.md).
