# OBJECT_CONSTRUCT

Returns an OBJECT constructed from the arguments.

## Syntax

```scopeql
OBJECT_CONSTRUCT( [<key>, <value> [, <key>, <value> , ...]] )
```

## Arguments

### `<key>`

The key in a key-value pair. Each key is a STRING value.

### `<value>`

The value that is associated with the key. The value can be any data type.

## Returns

Returns a value of type OBJECT.

## Examples

This example shows how to construct a simple object:

```scopeql
SELECT OBJECT_CONSTRUCT('a', 1, 'b', 'BBBB', 'c', NULL);
```

```
+--------------------------------------------------+
| object_construct('a', 1, 'b', 'BBBB', 'c', NULL) |
+--------------------------------------------------+
| {"a":1,"b":'BBBB'}                               |
+--------------------------------------------------+
```
