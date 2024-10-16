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
| null             | null::variant      |
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
| {"a":2,"b":1}::variant      |
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
| null          | "null"                   |
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
SELECT OBJECT_KEYS({
    "level_1_A": {"level_2": 'two'},
    "level_1_B": 'one',
});
```

```
+--------------------------------------------------------------------+
| OBJECT_KEYS({"level_1_A": {"level_2": 'two'}, "level_1_B": 'one'}) |
+--------------------------------------------------------------------+
| ["level_1_A","level_1_B"]::variant                                 |
+--------------------------------------------------------------------+
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
| ["a","b","c"]::variant                |
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
CREATE TABLE vartab (n INT, v VARIANT) WITH (...);
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
+---+---------------------------------------+------------+
| n | v                                     | TYPEOF(v)  |
+---+---------------------------------------+------------+
| 1 | null::variant                         | null_value |
| 2 | null                                  | null       |
| 3 | true::variant                         | bool       |
| 4 | -17::variant                          | int        |
| 5 | 123.12::variant                       | float      |
| 6 | 191.2::variant                        | float      |
| 7 | "Om ara pa ca na dhih"::variant       | string     |
| 8 | [-1,12,289,2188,false]::variant       | array      |
| 9 | {"x":"abc","y":false,"z":10}::variant | object     |
+---+---------------------------------------+------------+
```

## ARRAY

Returns an array constructed from zero, one, or more inputs.

### Syntax

```scopeql
ARRAY( [ <expr1> ] [ , <expr2> [ , ... ] ] )
```

### Arguments

The arguments are values (or expressions that evaluate to values). The arguments do not all need to be of the same data type.

### Returns

The data type of the returned value is VARIANT.

### Examples

Construct a basic array consisting of numeric data types:

```scopeql
SELECT ARRAY([10, 20, 30]);
```

```
+-----------------------+
| ARRAY([10, 20, 30])   |
+-----------------------+
| [[10,20,30]]::variant |
+-----------------------+
```

Construct a basic array consisting of different data types:

```scopeql
SELECT ARRAY(null, 'hello', 3.0, 4, 5);
```

```
+---------------------------------+
| ARRAY(NULL, 'hello', 3, 4, 5)   |
+---------------------------------+
| [null,"hello",3.0,4,5]::variant |
+---------------------------------+
```

Construct an empty array:

```scopeql
SELECT ARRAY();
```

```
+-------------+
| ARRAY()     |
+-------------+
| []::variant |
+-------------+
```

## OBJECT

Returns an object variant constructed from the arguments.

### Syntax

```scopeql
OBJECT( [<key>, <value> [, <key>, <value> , ...]] )
```

### Arguments

#### `<key>`

The key in a key-value pair. Each key is a VARCHAR value.

#### `<value>`

The value that is associated with the key. The value can be any data type.

### Returns

Returns a value of type OBJECT.

### Examples

This example shows how to construct a simple object:

```scopeql
SELECT OBJECT('a', 1, 'b', 'BBBB', 'c', NULL);
```

```
+----------------------------------------+
| OBJECT('a', 1, 'b', 'BBBB', 'c', NULL) |
+----------------------------------------+
| {"a":1,"b":"BBBB"}::variant            |
+----------------------------------------+
```
