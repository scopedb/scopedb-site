# ARRAY_CONSTRUCT

Returns an array constructed from zero, one, or more inputs.

## Syntax

```scopeql
ARRAY_CONSTRUCT( [ <expr1> ] [ , <expr2> [ , ... ] ] )
```

## Arguments

The arguments are values (or expressions that evaluate to values). The argument values can be different data types.

## Returns

The data type of the returned value is ARRAY.

## Examples

Construct a basic array consisting of numeric data types:

```scopeql
SELECT ARRAY_CONSTRUCT(10, 20, 30);
```

```
+-----------------------------+
| array_construct(10, 20, 30) |
+-----------------------------+
| [10,20,30]                  |
+-----------------------------+
```

Construct a basic array consisting of different data types:

```scopeql
SELECT ARRAY_CONSTRUCT(NULL, 'hello', 3::DOUBLE, 4, 5);
```

```
+------------------------------------------------+
| array_construct(NULL, 'hello', 3::float, 4, 5) |
+------------------------------------------------+
| [null,'hello',3.0,4,5]                         |
+------------------------------------------------+
```

Construct an empty array:

```scopeql
SELECT ARRAY_CONSTRUCT();
```

```
+-------------------+
| array_construct() |
+-------------------+
| []                |
+-------------------+
```
