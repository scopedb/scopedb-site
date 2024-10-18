---
sidebar_label: Date and time
---

# Date and time data types

ScopeDB supports data types for managing timestamps.

## Data types

ScopeDB supports TIMESTAMP and INTERVAL for manipulating times.

### TIMESTAMP

TIMESTAMP internally stores UNIX epoch in nanoseconds in 64-bit integer. Thus, the minimum and maximum value of TIMESTAMP are:

```scopeql
SELECT
    (-9223372036854775808)::timestamp AS MIN_TS,
    (9223372036854775807)::timestamp AS MAX_TS;
```

```
+--------------------------------+--------------------------------+
| MIN_TS                         | MAX_TS                         |
+--------------------------------+--------------------------------+
| 1677-09-21T00:12:43.145224192Z | 2262-04-11T23:47:16.854775807Z |
+--------------------------------+--------------------------------+
```

You can also create timestamps with string literal that follows [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339) or [RFC 9557](https://www.rfc-editor.org/rfc/rfc9557.html):

```scopeql
SELECT
    '1985-04-12T23:20:50.52Z'::timestamp AS t1_3339,
    '1937-01-01T12:00:27.87+00:20'::timestamp AS t2_3339,
    '2022-07-08T00:14:07+08:45[+08:45]'::timestamp AS t1_9557,
    '2022-07-08T00:14:07+01:00[Europe/Paris]'::timestamp AS t2_9557;
```

```
+-------------------------+-------------------------+----------------------+----------------------+
| t1_3339                 | t2_3339                 | t1_9557              | t2_9557              |
+-------------------------+-------------------------+----------------------+----------------------+
| 1985-04-12T23:20:50.52Z | 1937-01-01T11:40:27.87Z | 2022-07-07T15:29:07Z | 2022-07-07T23:14:07Z |
+-------------------------+-------------------------+----------------------+----------------------+
```

### INTERVAL

INTERVAL internally stores nanoseconds in 64-bit integer. Thus, the minimum and maximum value of INTERVAL are:

```scopeql
SELECT
    (-9223372036854775808)::interval AS MIN_INTERVAL,
    (9223372036854775807)::interval AS MAX_INTERVAL;
```

```
+-----------------------------+----------------------------+
| MIN_INTERVAL                | MAX_INTERVAL               |
+-----------------------------+----------------------------+
| -PT2562047h47m16.854775808s | PT2562047h47m16.854775807s |
+-----------------------------+----------------------------+
```

You can also create interval with string literal that follows the "Durations" syntax in [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339#appendix-A):

```scopeql
SELECT
    'PT1s'::interval AS i1,
    'PT59.7788s'::interval AS i2,
    'PT25h'::interval AS i3,
    'PT25h60s'::interval AS i4,
    '-PT26h59.7788s'::interval AS i5;
```

```
+------+------------+-------+---------+----------------+
| i1   | i2         | i3    | i4      | i5             |
+------+------------+-------+---------+----------------+
| PT1s | PT59.7788s | PT25h | PT25h1m | -PT26h59.7788s |
+------+------------+-------+---------+----------------+
```

:::warning[Interval's unit]

INTERVAL is always accurate in nanoseconds. Thus, you cannot specify a string containing parts with days or greater (weeks, months, years, etc.), even though RFC 3339 allows them.

:::

## Related content

See also [date and time functions](functions-datetime.md).
