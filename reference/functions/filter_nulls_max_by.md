# FILTER_NULLS_MAX_BY

Filters out the row(s) where a column is NULL, finds the row(s) containing the maximum value for another column, and returns the value of the former column in that row.

For example, if a table contains the columns `error` and `ts`, `FILTER_NULLS_MAX_BY(error, ts)` first filters out all the rows where `error` is NULL, and then returns the value of the `error` column for the row that has the highest value in the `ts` column.

If multiple rows contain the specified maximum value, the function is non-deterministic.

## Syntax

```scopeql
FILTER_NULLS_MAX_BY( <col_to_return>, <col_containing_maximum> )
```

## Arguments

### `<col_to_return>`

Column containing the value to return.

### `<col_containing_maximum>`

Column containing the maximum value.

## Returns

The function returns a value of the same type as `col_to_return`.

## Example

The following examples demonstrate how to use the FILTER_NULLS_MAX_BY function.

To run these examples, execute the following statements to set up the table and data for the examples:

```scopeql
CREATE TABLE errors(ts timestamp, error string);
VALUES
  ('2024-10-20T07:38:59.6519Z'::timestamp, 'divided by zero'),
  ('2024-10-20T08:21:23.7652Z'::timestamp, 'connection reset by peer'),
  ('2024-10-21T09:00:00.0000Z'::timestamp, NULL),
INSERT INTO errors;
```

Find the latest error that is not NULL:

```scopeql
FROM errors aggregate FILTER_NULLS_MAX_BY(error, ts);
```

```
+--------------------------------+
| FILTER_NULLS_MAX_BY(error, ts) |
+--------------------------------+
| connection reset by peer       |
+--------------------------------+
```

Note that `MAX_BY` would return the NULL value:

```scopeql
FROM errors aggregate MAX_BY(error, ts);
```

```
+-------------------+
| MAX_BY(error, ts) |
+-------------------+
| NULL              |
+-------------------+
```
