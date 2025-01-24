# ARRAY_LENGTH

Returns the length of the input array.

A variation of ARRAY_LENGTH takes a VARIANT value as input. If the VARIANT value contains an array, the length of the array is returned; otherwise, NULL is returned if the value is not an array.

## Syntax

```scopeql
ARRAY_LENGTH( <array> )
```

## Returns

The data type of the returned value is INTEGER.

## Examples

Here is a simple example:

```scopeql
SELECT ARRAY_LENGTH([1, 2, 3]);
```

```
+-------------------------+
| array_length([1, 2, 3]) |
+-------------------------+
| 3                       |
+-------------------------+
```

Here is a slightly more complex example, this time using VARIANT data type:

```scopeql
CREATE TABLE colors (v VARIANT);

VALUES
     ('[{"r":255,"g":12,"b":0},{"r":0,"g":255,"b":0},{"r":0,"g":0,"b":255}]'),
     ('[{"r":255,"g":128,"b":0},{"r":128,"g":255,"b":0},{"r":0,"g":255,"b":128},{"r":0,"g":128,"b":255},{"r":128,"g":0,"b":255},{"r":255,"g":0,"b":128}]')
SELECT parse_json($0)
INSERT INTO colors;
```

Retrieve the length for each array in the VARIANT column:

```scopeql
FROM colors SELECT ARRAY_LENGTH(v);
```

```
+-----------------+
| array_length(v) |
+-----------------+
| 3               |
| 6               |
+-----------------+
```

Retrieve the last element of each array in the VARIANT column:

```scopeql
FROM colors SELECT GET(v, ARRAY_LENGTH(v)-1);
```

```
+-----------------------------+
| get(v, array_length(v) - 1) |
+-----------------------------+
| {"b":255,"g":0,"r":0}       |
| {"b":128,"g":0,"r":255}     |
+-----------------------------+
```
