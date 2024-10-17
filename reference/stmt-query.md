---
sidebar_label: Query syntax
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Query syntax

Snowflake supports querying using a pipelined relational query language in the following basic syntax:

```
[ FROM ... [ SAMPLE ... ] | VALUES ... ]
SELECT ...
[ WHERE ... ]
[ [ GOURP BY ... ] AGGREGATE ... ]
[ ORDER BY ... ]
[ LIMIT ... ]
```

## SELECT

SELECT defines the set of columns returned by a query, corresponding to a **projection** in relational algebra.

### Examples

#### Setting up the data for the examples

```scopeql
CREATE TABLE employee_table (
    employee_ID INT,
    last_name STRING,
    first_name STRING,
    department_ID INT,
) WITH (...);

VALUES
    (101, 'Montgomery', 'Pat', 1),
    (102, 'Levine', 'Terry', 2),
    (103, 'Comstock', 'Dana', 2)
INSERT INTO employee_table;
```

#### Selecting all columns in the table

```scopeql
FROM employee_table SELECT *;
```

```
+-------------+------------+------------+---------------+
| employee_ID | last_name  | first_name | department_ID |
+-------------+------------+------------+---------------+
| 101         | Montgomery | Pat        | 1             |
| 102         | Levine     | Terry      | 2             |
| 103         | Comstock   | Dana       | 2             |
+-------------+------------+------------+---------------+
```

#### Selecting a single column by name

```scopeql
FROM employee_table SELECT last_name;
```

```
+------------+
| last_name  |
+------------+
| Montgomery |
| Levine     |
| Comstock   |
+------------+
```

#### Selecting a column by position

```scopeql
FROM employee_table SELECT $2;
```

```
+-------+
| $2    |
+-------+
| Pat   |
| Terry |
| Dana  |
+-------+
```

#### Extending a column to all columns in the output

```scopeql
FROM employee_table SELECT employee_ID + 1000 as new_employee_ID, *;
```

```
+-----------------+-------------+------------+------------+---------------+
| new_employee_ID | employee_ID | last_name  | first_name | department_ID |
+-----------------+-------------+------------+------------+---------------+
| 1101            | 101         | Montgomery | Pat        | 1             |
| 1102            | 102         | Levine     | Terry      | 2             |
| 1103            | 103         | Comstock   | Dana       | 2             |
+-----------------+-------------+------------+------------+---------------+
```

## FROM

FROM reads all the data from a table.

### Examples

Create a table and load data into it:

```scopeql
CREATE TABLE ftable1 (retail_price FLOAT, wholesale_cost FLOAT, description STRING) WITH (...);
VALUES (14.00, 6.00, 'bling') INSERT INTO ftable1;
```

Here is a basic example of using the FROM clause:

```scopeql
FROM ftable1;
```

```
+--------------+----------------+-------------+
| retail_price | wholesale_cost | description |
+--------------+----------------+-------------+
| 14.0         | 6.0            | bling       |
+--------------+----------------+-------------+
```

This example is identical to the previous example, but specifies the table name qualified by the schema for the table:

```scopeql
FROM public.ftable1;
```

```
+--------------+----------------+-------------+
| retail_price | wholesale_cost | description |
+--------------+----------------+-------------+
| 14.0         | 6.0            | bling       |
+--------------+----------------+-------------+
```

This example is identical to the previous example, but specifies an alias to the table name:

```scopeql
FROM public.ftable1 AS t1 SELECT t1.wholesale_cost;
```

```
+-------------------+
| t1.wholesale_cost |
+-------------------+
| 6.0               |
+-------------------+
```

This example queries a sample of 10% of the data in the table:

```scopeql
FROM sales SAMPLE 10 PERCENT;
```

## VALUES

VALUES allows the specification of a set of constants to be used to form a finite set of rows.

### Examples

The VALUES clause is useful for generating a fixed, known set of rows:

```scopeql
VALUES (1, 'one'), (2, 'two'), (3, 'three');
```

```
+----+-------+
| $0 | $1    |
+----+-------+
| 1  | one   |
| 2  | two   |
| 3  | three |
+----+-------+
```

```scopeql
VALUES (1, 'one'), (2, 'two'), (3, 'three') SELECT $0 AS col0, $1;
```

```
+------+-------+
| col0 | $1    |
+------+-------+
| 1    | one   |
| 2    | two   |
| 3    | three |
+------+-------+
```

## SAMPLE

Returns a subset of rows sampled randomly from the specified table. The following sampling methods are supported:

* Sample a fraction of a table, with a specified probability for including a given row. The number of rows returned depends on the size of the table and the requested probability. A seed can be specified to make the sampling deterministic.

### Syntax

```scopeql
FROM ... SAMPLE <probability> PERCENT SEED <seed>
```

### Parameters

#### `<probability> PERCENT`

Specifies the percentage probability to use for selecting the sample. Can be any number between 0 (no rows selected) and 100 (all rows selected) inclusive.

#### `SEED <seed>`

Specifies a seed value to make the sampling deterministic.

## WHERE

The WHERE clause specifies a condition that acts as a filter. You can use the WHERE clause to:

* Filter the result of a FROM clause or a SELECT statement.
* Specify which rows to operate on in an UPDATE or DELETE.

### Syntax

```scopeql
...
WHERE <predicate>
[ ... ]
```

### Parameters

#### `<predicate>`

A boolean expression. The expression can include [logical operators](operators-logical.md), such as `AND`, `OR`, and `NOT`.

## ORDER BY

Specifies an ordering of the rows of the result table.

### Syntax

```scopeql
FROM ...
[ ... ]
ORDER BY orderItem [ , orderItem , ... ]
[ ... ]
```

Where:

```scopeql
orderItem ::= { <column_alias> | <position> | <expr> } [ { ASC | DESC } ] [ NULLS { FIRST | LAST } ]
```

### Parameters

#### `<column_alias>`

Column alias appearing in the SELECT list.

#### `<position>`

Position of an expression in the SELECT list.

#### `<expr>`

Any expression on tables in the current scope.

#### `{ ASC | DESC }`

Optionally returns the values of the sort key in ascending (lowest to highest) or descending (highest to lowest) order.

Default: `ASC`

#### `NULLS { FIRST | LAST }`

Optionally specifies whether NULL values are returned before/after non-NULL values, based on the sort order (`ASC` or `DESC`).

Default: Depends on the sort order (`ASC` or `DESC`); see the usage notes below for details

### Usage notes

* Unless specified otherwise, NULL values are considered to be higher than any non-NULL values. As a result, the ordering for NULLS depends on the sort order:
  * If the sort order is `ASC`, NULLS are returned last; to force NULLS to be first, use `NULLS FIRST`.
  * If the sort order is `DESC`, NULLS are returned first; to force NULLS to be last, use `NULLS LAST`.

## LIMIT

Constrains the maximum number of rows returned by a statement or subquery.

### Syntax

```scopeql
FROM ...
[ ... ]
[ ORDER BY ... ]
LIMIT <count> [ OFFSET <start> ]
[ ... ]
```

### Parameters

#### `<count>`

The number of rows returned. Must be a non-negative integer constant.

#### `OFFSET <start>`

The row number after which the limited/fetched rows are returned. Must be a non-negative integer constant.

If OFFSET is omitted, the output starts from the first row in the result set.

## AGGREGATE

Returns one or more columns that indicates aggregation results.

### Syntax

```scopeql
FROM ...
[ GROUP BY ... ] AGGREGATE <function_calls>
```

### Examples

Setting up the data for the examples:

```scopeql
CREATE TABLE sales (
  product_ID INT,
  retail_price FLOAT,
  quantity INT,
  city STRING,
  state STRING,
) WITH (...);

VALUES
  (1, 2.00,  1, 'SF', 'CA'),
  (1, 2.00,  2, 'SJ', 'CA'),
  (2, 5.00,  4, 'SF', 'CA'),
  (2, 5.00,  8, 'SJ', 'CA'),
  (2, 5.00, 16, 'Miami', 'FL'),
  (2, 5.00, 32, 'Orlando', 'FL'),
  (2, 5.00, 64, 'SJ', 'PR')
INSERT INTO sales;
```

Group by one column:

```scopeql
FROM sales
GROUP BY product_ID AGGREGATE SUM(retail_price * quantity) AS gross_revenue;
```

```
+------------+---------------+
| product_ID | gross_revenue |
+------------+---------------+
| 1          | 6.0           |
| 2          | 620.0         |
+------------+---------------+
```

Group by multiple columns:

```sccopeql
FROM sales
GROUP BY state, city AGGREGATE SUM(retail_price * quantity) AS gross_revenue;
```

```
+-------+---------+---------------+
| state | city    | gross_revenue |
+-------+---------+---------------+
| CA    | SF      | 22.0          |
| CA    | SJ      | 44.0          |
| FL    | Miami   | 80.0          |
| FL    | Orlando | 160.0         |
| PR    | SJ      | 320.0         |
+-------+---------+---------------+
```

No group by qualifier:

```scopeql
FROM sales
AGGREGATE SUM(retail_price * quantity) AS gross_revenue;
```

```
+---------------+
| gross_revenue |
+---------------+
| 626.0         |
+---------------+
```
