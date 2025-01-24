# GET

Extracts a value from a VARIANT that contains an ARRAY or OBJECT.

The function returns NULL if either of the arguments is NULL.

## Syntax

```scopeql
GET( <variant> , <index> )
GET( <variant> , <field_name> )
```

## Arguments

### `<variant>`

An expression that evaluates to a VARIANT that contains either an ARRAY or an OBJECT.

### `<index>`

An expression that evaluates to an INTEGER. This specifies the position of the element to retrieve from the ARRAY. The position is 0-based, not 1-based.

If the index points outside the array boundaries, this function returns NULL.

### `<field_name>`

An expression that evaluates to a STRING. This specifies the key in a key-value pair for which you want to retrieve the value.

`<field_name>` must not be an empty string.

If object does not contain the specified key, the function returns NULL.

## Returns

This function returns a VARIANT.

## Examples

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
