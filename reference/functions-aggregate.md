---
sidebar_label: Aggregate
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Aggregate functions

Aggregate functions operate on values across rows to perform mathematical calculations such as sum, average, counting, minimum/maximum values, standard deviation, and estimation, as well as some non-mathematical operations.

An aggregate function takes multiple rows (actually, zero, one, or more rows) as input and produces a single output. In contrast, scalar functions take one row as input and produce one row (one value) as output.

An aggregate function always returns exactly one row, **even when the input contains zero rows**. Typically, if the input contains zero rows, the output is NULL. However, an aggregate function could return 0, an empty string, or some other value when passed zero rows.

## APPROX_QUANTILE

Returns the approximate boundaries for `<expr>`. If all records inside a group are NULL, the function returns NULL.

### Syntax

```scopeql
APPROX_QUANTILE( <expr>, <quantile> )
```

### Arguments

#### `<expr>`

A column that contains float values.

#### `<quantile>` (named)

A float literal that represents the quantile to calculate.

### Returns

A float value that identifies the approximate quantile.

### Examples

```scopeql
VALUES (1.0), (1.0), (1.0), (4.0), (5.0), (6.0), (7.0), (8.0), (9.0), (10.0)
AGGREGATE
    APPROX_QUANTILE($0, quantile => 0.1) as p10,
    APPROX_QUANTILE($0, quantile => 0.5) as p50,
    APPROX_QUANTILE($0, quantile => 0.9) as p90,
    APPROX_QUANTILE($0, quantile => 0.95) as p90,
    APPROX_QUANTILE($0, quantile => 0.99) as p99;
```

```
+-----+-----+-----+------+------+
| p10 | p50 | p90 | p90  | p99  |
+-----+-----+-----+------+------+
| 1.0 | 5.5 | 9.1 | 9.55 | 9.91 |
+-----+-----+-----+------+------+
```

## AVG

Returns the average of non-NULL records. If all records inside a group are NULL, the function returns NULL.

### Syntax

```scopeql
AVG( <expr> )
```

### Arguments

#### `<expr>`

This is an expression that evaluates to a numeric data type.

## COUNT

Returns either the number of non-NULL records for the specified columns.

### Syntax

```scope
COUNT( <expr> )
```

### Arguments

#### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

### Returns

Returns a value of type UINT.

## MAX

Returns the maximum value for the records within `<expr>`. NULL values are ignored unless all the records are NULL, in which case a NULL value is returned.

If `<n>` is specified, MAX returns the N maximum values from a column, which is the same results as the regular query `FROM ... ORDER BY ... DESC LIMIT n` but as a variant list.

### Syntax

```scopeql
MAX( <expr> )
MAX( <expr>, <n> )
```

### Returns

The data type of the returned value is the same as the data type of the input values.

### Arguments

**Required:**

#### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

**Optional:**

#### `<n>` (named)

The number of maximum values to return.

### Returns

* If `<n>` is not specified, MIN returns the same as the data type of the input values.
* If `<n>` is specified, MIN returns an ARRAY that contains all the `<n>` minimum values.

### Examples

Get the maximum value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MAX($0);
```

```
+---------+
| MAX($0) |
+---------+
| 10      |
+---------+
```

Get the maximum N value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MAX($0, 5);
```

```
+--------------+
| MAX($0, 5)   |
+--------------+
| [10,9,8,7,6] |
+--------------+
```

Alternatively, use the named argument syntax:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MAX($0, n => 5);
```

```
+-----------------+
| MAX($0, n => 5) |
+-----------------+
| [10,9,8,7,6]    |
+-----------------+
```

## MAX_BY

Finds the row(s) containing the maximum value for a column and returns the value of another column in that row.

For example, if a table contains the columns `employee_id` and `salary`, `MAX_BY(employee_id, salary)` returns the value of the `employee_id` column for the row that has the highest value in the `salary` column.

If multiple rows contain the specified maximum value, the function is non-deterministic.

### Syntax

```scopeql
MAX_BY( <col_to_return>, <col_containing_maximum> )
```

### Arguments

#### `<col_to_return>`

Column containing the value to return.

#### `<col_containing_maximum>`

Column containing the maximum value.

### Returns

The function returns a value of the same type as `col_to_return`.

### Example

The following examples demonstrate how to use the MAX_BY function.

To run these examples, execute the following statements to set up the table and data for the examples:

```scopeql
CREATE TABLE employees(employee_id int, department_id int, salary int);
VALUES
  (1001, 10, 10000),
  (1020, 10, 9000),
  (1030, 10, 8000),
  (900, 20, 15000),
  (2000, 20, NULL),
  (2010, 20, 15000),
  (2020, 20, 8000),
INSERT INTO employees;
```

The following example returns the ID of the employee with the highest salary:

```scopeql
FROM employees aggregate MAX_BY(employee_id, salary);
```

```
+-----------------------------+
| MAX_BY(employee_id, salary) |
+-----------------------------+
| 2010                        |
+-----------------------------+
```

Note the following:

* Because more than one row contains the maximum value for the `salary` column, the function is non-deterministic and might return the employee ID for a different row in subsequent executions.
* The function ignores the NULL value in the salary column when determining the rows with the maximum values.

## FILTER_NULLS_MAX_BY

Filters out the row(s) where a column is NULL, finds the row(s) containing the maximum value for another column, and returns the value of the former column in that row.

For example, if a table contains the columns `error` and `ts`, `FILTER_NULLS_MAX_BY(error, ts)` first filters out all the rows where `error` is NULL, and then returns the value of the `error` column for the row that has the highest value in the `ts` column.

If multiple rows contain the specified maximum value, the function is non-deterministic.

### Syntax

```scopeql
FILTER_NULLS_MAX_BY( <col_to_return>, <col_containing_maximum> )
```

### Arguments

#### `<col_to_return>`

Column containing the value to return.

#### `<col_containing_maximum>`

Column containing the maximum value.

### Returns

The function returns a value of the same type as `col_to_return`.

### Example

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

## MIN

Returns the minimum value for the records within `<expr>`. NULL values are ignored unless all the records are NULL, in which case a NULL value is returned.

If `<n>` is specified, MIN returns the N minimum values from a column, which is the same results as the regular query `FROM ... ORDER BY ... LIMIT n` but as a variant list.

### Syntax

```scopeql
MIN( <expr> )
MIN( <expr>, <n> )
```

### Arguments

**Required:**

#### `<expr>`

A column name, which can be a qualified name (for example, database.schema.table.column_name).

**Optional:**

#### `<n>` (named)

The number of minimum values to return.

### Returns

* If `<n>` is not specified, MIN returns the same as the data type of the input values.
* If `<n>` is specified, MIN returns an ARRAY that contains all the `<n>` minimum values.

### Examples

Get the minimum value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MIN($0);
```

```
+---------+
| MIN($0) |
+---------+
| 1       |
+---------+
```

Get the minimum N value:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MIN($0, 5);
```

```
+-------------+
| MIN($0, 5)  |
+-------------+
| [1,1,1,4,5] |
+-------------+
```

Alternatively, use the named argument syntax:

```scopeql
VALUES (1), (1), (1), (4), (5), (6), (7), (8), (9), (10)
AGGREGATE MIN($0, n => 5);
```

```
+-----------------+
| MIN($0, n => 5) |
+-----------------+
| [1,1,1,4,5]     |
+-----------------+
```

## MIN_BY

Finds the row(s) containing the minimum value for a column and returns the value of another column in that row.

For example, if a table contains the columns `employee_id` and `salary`, `MIN_BY(employee_id, salary)` returns the value of the `employee_id` column for the row that has the lowest value in the `salary` column.

If multiple rows contain the specified minimum value, the function is non-deterministic.

### Syntax

```scopeql
MIN_BY( <col_to_return>, <col_containing_mininum> )
```

### Arguments

#### `<col_to_return>`

Column containing the value to return.

#### `<col_containing_mininum>`

Column containing the minimum value.

### Returns

The function returns a value of the same type as `col_to_return`.

### Example

The following examples demonstrate how to use the MIN_BY function.

To run these examples, execute the following statements to set up the table and data for the examples:

```scopeql
CREATE TABLE employees(employee_id int, department_id int, salary int);
VALUES
  (1001, 10, 10000),
  (1020, 10, 9000),
  (1030, 10, 8000),
  (900, 20, 15000),
  (2000, 20, NULL),
  (2010, 20, 15000),
  (2020, 20, 8000),
INSERT INTO employees;
```

The following example returns the ID of the employee with the lowest salary:

```scopeql
FROM employees aggregate MIN_BY(employee_id, salary);
```

```
+-----------------------------+
| MIN_BY(employee_id, salary) |
+-----------------------------+
| 2020                        |
+-----------------------------+
```

Note the following:

* Because more than one row contains the minimum value for the `salary` column, the function is non-deterministic and might return the employee ID for a different row in subsequent executions.
* The function ignores the NULL value in the salary column when determining the rows with the minimum values.

## FILTER_NULLS_MIN_BY

Filters out the row(s) where a column is NULL, finds the row(s) containing the minimum value for another column, and returns the value of the former column in that row.

For example, if a table contains the columns `error` and `ts`, `FILTER_NULLS_MIN_BY(error, ts)` first filters out all the rows where `error` is NULL, and then returns the value of the `error` column for the row that has the lowest value in the `ts` column.

If multiple rows contain the specified minimum value, the function is non-deterministic.

### Syntax

```scopeql
FILTER_NULLS_MIN_BY( <col_to_return>, <col_containing_minimum> )
```

### Arguments

#### `<col_to_return>`

Column containing the value to return.

#### `<col_containing_minimum>`

Column containing the minimum value.

### Returns

The function returns a value of the same type as `col_to_return`.

### Example

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

## MODE

Returns the most frequent value for the values within `<expr>`. NULL values are ignored. If all the values are NULL, or there are 0 rows, then the function returns NULL.

### Syntax

```scopeql
MODE( <expr1> )
```

### Arguments

#### `<expr>`

This expression produces the values that are searched to find the most frequent value. The expression can be of the following data types:

* INT
* UINT
* FLOAT
* STRING

### Returns

The data type of the returned value is identical to the data type of the input expression.

## STDDEV_POP

Returns the population standard deviation (square root of variance) of non-NULL values.

See also [STDDEV_SAMP](#stddev_samp), which returns the sample standard deviation (square root of variance).

### Syntax

```scopeql
STDDEV_POP( <expr>)
```

### Arguments

#### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the standard deviation is calculated.

### Returns

The data type of the returned value is FLOAT.

If all records inside a group are NULL, this function returns NULL.

## STDDEV_SAMP

Returns the sample standard deviation (square root of sample variance) of non-NULL values.

See also [STDDEV_POP](#stddev_pop), which returns the population standard deviation (square root of variance).

### Syntax

```scopeql
STDDEV_SAMP ( <expr> )
```

### Arguments

#### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the standard deviation is calculated.

### Returns

The data type of the returned value is FLOAT.

If all records inside a group are NULL, this function returns NULL.

## SUM

Returns the sum of non-NULL records for `<expr>`. If all records inside a group are NULL, the function returns NULL.

### Syntax

```scopeql
SUM( [ DISTINCT ] <expr1> )
```

### Arguments

#### `<expr>`

This is an expression that evaluates to a numeric data type.

## VARIANCE_POP

Returns the population variance of non-NULL records in a group. If all records inside a group are NULL, a NULL is returned.

### Syntax

```scopeql
VARIANCE_POP( <expr>)
```

### Arguments

#### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the variance is calculated.

### Returns

The data type of the returned value is FLOAT.

If all records inside a group are NULL, this function returns NULL.

## VARIANCE_SAMP

Returns the sample variance of non-NULL records in a group. If all records inside a group are NULL, a NULL is returned.

### Syntax

```scopeql
VARIANCE_SAMP ( <expr> )
```

### Arguments

#### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the variance is calculated.

### Returns

The data type of the returned value is FLOAT.

If all records inside a group are NULL, this function returns NULL.

## OBJECT_SCHEMA

Returns the aggregated schema of values of the input object column as a VARIANT. The schema is a VARIANT that contains the keys and their types.

### Syntax

```scopeql
OBJECT_SCHEMA( <object> )
```

### Arguments

#### `<object>`

The VARIANT column for which you want the aggregated schema. The input rows that is _not_ an object will be ignored.

### Returns

An OBJECT that contains the outermost keys and their types.

### Examples

```scopeql
VALUES {
  (1, {}),
  (2, {"a": 1, "b": ['hello', 'world']}),
  (3, {"a": {"b": 1}}),
}
AGGREGATE object_schema($1);
```

```
+------------------------------------------------------------------------------------------------------+
| object_schema($1)                                                                                    |
+------------------------------------------------------------------------------------------------------+
| [{"key":'a',"type":'int'},{"key":'a',"type":'object'},{"items":['string'],"key":'b',"type":'array'}] |
+------------------------------------------------------------------------------------------------------+
```
