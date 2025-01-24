# ARRAY_CONCAT

Returns a concatenation of two arrays.

## Syntax

```scopeql
ARRAY_CONCAT( <array1> , <array2> )
```

## Arguments

### `<array1>`

The source array.

### `<array2>`

The array to be appended to `<array1>`.

## Returns

An ARRAY containing the elements from `<array2>` appended after the elements of `<array1>`.

## Examples

This example shows how to use `ARRAY_CONCAT`:

```scopeql
VALUES ([1, 2], [3, 4])
SELECT ARRAY_CONCAT([1, 2], [3, 4]);
```

```
+------------------------------+
| array_concat([1, 2], [3, 4]) |
+------------------------------+
| [1,2,3,4]                    |
+------------------------------+
```
