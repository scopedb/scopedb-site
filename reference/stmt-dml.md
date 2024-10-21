---
sidebar_label: General DML
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Data Manipulation Language (DML) statements

## INSERT

Updates a table by inserting one or more rows into the table. The values inserted into each column in the table can be explicitly-specified or the results of a query.

### Examples

Inserts with constants:

```scopeql
CREATE TABLE t (a INT) WITH (...);
VALUES (1), (2), (3) INSERT INTO t;
```

Inserts from the results of a query:

```scopeql
CREATE TABLE t1 (a INT) WITH (...);
CREATE TABLE t2 (a INT) WITH (...);

VALUES (1), (2), (3) INSERT INTO t1;
FROM t1 WHERE a > 1 SELECT a + 1 AS b INSERT INTO t2;
```

## DELETE

Remove rows from a table. You can use a WHERE clause to specify which rows should be removed.

### Examples

Deletes with conditions:

```scopeql
DELETE FROM t WHERE a > 1;
```

Deletes all the data:

```scopeql
DELETE FROM t;
```

## UPDATE

Updates specified rows in the target table with new values.

### Examples

```scopeql
UPDATE t SET a = 2 WHERE a = 1;
```

## MERGE

Inserts, updates, and deletes values in a table based on values in a second table or a subquery. This can be useful if the second table is a change log that contains new rows (to be inserted), modified rows (to be updated), and/or marked rows (to be deleted) in the target table.

The command supports semantics for handling the following cases:

* Values that match (for updates and deletes).
* Values that do not match (for inserts).

### Syntax

```scopeql
FROM <source_table>
MERGE INTO <target_table> ON <match_condition>
<match_action> [...]
```

Where:

```
match_action:
    WHEN MATCHED [AND <extra_condition>] THEN { 
        UPDATE ALL 
        | UPDATE SET <set_clause> [, <set_clause>]* 
        | DELETE
    }
    | WHEN NOT MATCHED [AND <extra_condition>] THEN INSERT ALL

set_clause:
    <column_name> = <expression>
```

### Parameters

#### `<target_table>`

Specifies the table to merge.

#### `<source_table>`

Specifies the table or subquery to join with the target table.

#### `<match_condition>`

Specifies row matching conditions.

### Examples

Straightforward example:
```scopeql
CREATE TABLE target (id INT, message VARIANT, update_time INT) WITH (...);
CREATE TABLE source (id INT, message VARIANT, update_time INT) WITH (...);

FROM source
MERGE INTO target ON target.id = source.id
WHEN MATCHED AND source.update_time > target.update_time THEN UPDATE ALL
WHEN NOT MATCHED THEN INSERT ALL;
```

`MERGE INTO` with multiple `WHEN MATCHED` clauses:
```scopeql
CREATE TABLE target (id INT, message VARIANT, update_time INT) WITH (...);
CREATE TABLE source (id INT, message VARIANT, update_time INT) WITH (...);

FROM source
MERGE INTO target ON target.id = source.id
WHEN MATCHED AND source.update_time > target.update_time THEN UPDATE ALL 
WHEN MATCHED AND source.update_time < target.update_time THEN UPDATE SET update_time = now() # This action will be executed if previous condition is not met
WHEN NOT MATCHED THEN INSERT ALL;
```

### Usage notes

When multiple rows in `<source_table>` matches one row in `<target_table>`, the merge result is non-deterministic.

For example,

```scopeql
CREATE TABLE target (id INT, value INT) WITH (...);
VALUES(1, 1) INSERT INTO target;

CREATE TABLE source (id INT, value INT) WITH (...);
VALUES(1, 2), (1, 3) INSERT INTO source;

FROM source
MERGE INTO target ON target.id = source.id
WHEN MATCHED THEN UPDATE ALL;
```

`(1, 1)` in `target` MAY BE replaced by either `(1, 2)` or `(1, 3)`.
