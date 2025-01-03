---
sidebar_label: Variant data
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Variant data functions

These functions are used with semi-structured data (VARIANT).

## PARSE_JSON

Interprets an input string as a JSON document, producing a VARIANT value.

You can use the PARSE_JSON function when you have input data in JSON format. This function can convert data from JSON format to ARRAY or OBJECT data and store that data directly in a VARIANT value. You can then analyze or manipulate the data.

### Syntax

```scopeql
PARSE_JSON(<expr>)
```

### Arguments

#### `<expr>`

An expression of string type that holds valid JSON information.

### Returns

Returns a value of type VARIANT that contains a JSON document.

If the input is NULL, the function returns NULL.

### Examples

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

## TO_JSON

Converts a VARIANT value to a string containing the JSON representation of the value.

### Syntax

```scopeql
TO_JSON( <expr> )
```

### Arguments

#### `<expr>`

An expression of type VARIANT that holds valid JSON information.

### Returns

Returns a value of type VARCHAR.

If the input is NULL, the function returns NULL.

### Examples

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

## GET

Extracts a value from a VARIANT that contains an ARRAY or OBJECT.

The function returns NULL if either of the arguments is NULL.

### Syntax

```scopeql
GET( <variant> , <index> )
GET( <variant> , <field_name> )
```

### Arguments

#### `<variant>`

An expression that evaluates to a VARIANT that contains either an ARRAY or an OBJECT.

#### `<index>`

An expression that evaluates to an INTEGER. This specifies the position of the element to retrieve from the ARRAY. The position is 0-based, not 1-based.

If the index points outside the array boundaries, this function returns NULL.

#### `<field_name>`

An expression that evaluates to a STRING. This specifies the key in a key-value pair for which you want to retrieve the value.

`<field_name>` must not be an empty string.

If object does not contain the specified key, the function returns NULL.

### Returns

This function returns a VARIANT.

### Examples

Extract the first element of an ARRAY:

```scopeql
CREATE TABLE vartab (a VARIANT, o VARIANT, v VARIANT);

VALUES
([2.71, 3.14], {"France": 'Paris', "Germany": 'Berlin'}, {"sensorType": 'indoor', "temperature": 31.5, "timestamp": '2022-03-07T14:00:00.000-0800', "weatherStationID": 42})
INSERT INTO vartab;
```

```scopedb
FROM vartab;
```

```
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
| a           | o                                     | v                                                                                                           |
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
| [2.71,3.14] | {"France":'Paris',"Germany":'Berlin'} | {"sensorType":'indoor',"temperature":31.5,"timestamp":'2022-03-07T14:00:00.000-0800',"weatherStationID":42} |
+-------------+---------------------------------------+-------------------------------------------------------------------------------------------------------------+
```

Extract the first element of an ARRAY:

```scopedb
FROM vartab SELECT GET(a, 0);
```

```
+-----------+
| GET(a, 0) |
+-----------+
| 2.71      |
+-----------+
```

Given the name of a country, extract the name of the capital city of that country from an OBJECT containing country names and capital cities:

```scopedb
FROM vartab SELECT GET(o, 'Germany');
```

```
+-------------------+
| GET(o, 'Germany') |
+-------------------+
| 'Berlin'          |
+-------------------+
```

Extract the temperature from a VARIANT that contains an OBJECT:

```scopedb
FROM vartab SELECT GET(v, 'temperature');
```

```
+-----------------------+
| GET(v, 'temperature') |
+-----------------------+
| 31.5                  |
+-----------------------+
```

## OBJECT_KEYS

Returns an array containing the list of keys in the top-most level of the input object.

### Syntax

```scopeql
OBJECT_KEYS( <object> )
```

### Arguments

#### `<object>`

The value for which you want the keys. The input value must be A VARIANT that contains a value of type OBJECT.

### Returns

The function returns an ARRAY containing the keys.

### Examples

Retrieve the keys from a VARIANT:

```scopeql
SELECT OBJECT_KEYS({"a": 1, "b": 2, "c": 3});
```

```
+---------------------------------------+
| OBJECT_KEYS({"a": 1, "b": 2, "c": 3}) |
+---------------------------------------+
| ['a','b','c']                         |
+---------------------------------------+
```

## TYPEOF

Returns the type of value stored in a VARIANT column. The type is returned as a string.

### Syntax

```scopeql
TYPEOF( <expr> )
```

### Arguments

#### `<expr>`

The argument can be a column name or a general expression of type VARIANT. If necessary, you can cast the expr to a VARIANT.

### Returns

Returns a STRING that contains the data type of the input expression, such as BOOLEAN, DECIMAL, ARRAY, OBJECT, etc.

### Examples

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
