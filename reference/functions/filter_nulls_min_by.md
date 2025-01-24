# FILTER_NULLS_MIN_BY

Filters out the row(s) where a column is NULL, finds the row(s) containing the minimum value for another column, and returns the value of the former column in that row.

For example, if a table contains the columns `error` and `ts`, `FILTER_NULLS_MIN_BY(error, ts)` first filters out all the rows where `error` is NULL, and then returns the value of the `error` column for the row that has the lowest value in the `ts` column.

If multiple rows contain the specified minimum value, the function is non-deterministic.

## Syntax

```scopeql
FILTER_NULLS_MIN_BY( <col_to_return>, <col_containing_minimum> )
```

## Arguments

### `<col_to_return>`

Column containing the value to return.

### `<col_containing_minimum>`

Column containing the minimum value.

## Returns

The function returns a value of the same type as `col_to_return`.

## Examples

The following examples demonstrate how to use the FILTER_NULLS_MIN_BY function.

To run these examples, execute the following statements to set up the table and data for the examples:

```scopeql
CREATE TABLE errors(ts timestamp, error string);
VALUES
  ('2024-10-20T08:21:23.7652Z'::timestamp, 'connection reset by peer'),
  ('2024-10-20T07:38:59.6519Z'::timestamp, 'divided by zero'),
  ('2024-10-20T07:37:52.2391Z'::timestamp, NULL::string),
INSERT INTO errors;
```

Find the first error that is not NULL:

```scopeql
FROM errors aggregate FILTER_NULLS_MIN_BY(error, ts);
```

```
+--------------------------------+
| FILTER_NULLS_MIN_BY(error, ts) |
+--------------------------------+
| divided by zero                |
+--------------------------------+
```

Note that `MIN_BY` would return the NULL value:

```scopeql
FROM errors aggregate MIN_BY(error, ts);
```

```
+-------------------+
| MIN_BY(error, ts) |
+-------------------+
| NULL              |
+-------------------+
```
