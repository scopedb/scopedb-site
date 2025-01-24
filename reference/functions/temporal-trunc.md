# TRUNC

Truncates a TIMESTAMP value to the specified precision. For example, truncating a timestamp down to the hour returns the timestamp corresponding to start of the hour of the original timestamp's hour.

## Syntax

```
TRUNC( <timestamp_expr>, <unit> )
```

## Arguments

### `<timestamp_expr>`

This argument must evaluate to a timestamp.

### `<unit>` (named)

This argument must be one of the strings listed below:

* `hour`
* `minute`
* `second`
* `millisecond`
* `microsecond`
* `nanosecond`

## Returns

The returned value is of TIMESTAMP type.

## Examples

Truncate a timestamp down to the minute:

```scopeql
SELECT NOW(), TRUNC(NOW(), 'minute');
```

```
+-----------------------------+------------------------+
| now()                       | trunc(now(), 'minute') |
+-----------------------------+------------------------+
| 2025-01-24T08:13:39.192704Z | 2025-01-24T08:13:00Z   |
+-----------------------------+------------------------+
```
