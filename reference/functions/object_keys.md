# OBJECT_KEYS

Returns an array containing the list of keys in the top-most level of the input object.

## Syntax

```scopeql
OBJECT_KEYS( <object> )
```

## Arguments

### `<object>`

The value for which you want the keys. The input value must be A VARIANT that contains a value of type OBJECT.

## Returns

The function returns an ARRAY containing the keys.

## Examples

Retrieve the keys from a VARIANT:

```scopeql
SELECT OBJECT_KEYS({"a": 1, "b": 2, "c": 3}) as keys;
```

```
+---------------+
| keys          |
+---------------+
| ['a','b','c'] |
+---------------+
```

Only the top-most level keys are returned:

```scopeql
SELECT OBJECT_KEYS (PARSE_JSON ('{"level_1_A": {"level_2": "two"},"level_1_B": "one"}')) AS keys;
```

```
+---------------------------+
| keys                      |
+---------------------------+
| ['level_1_A','level_1_B'] |
+---------------------------+
```
