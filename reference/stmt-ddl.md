---
sidebar_label: General DDL
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Data Definition Language (DDL) statements

DDL commands are used to create, manipulate, and modify objects in ScopeDB, such as databases, schemas, and tables.

## CREATE DATABASE

Creates a new database in the system.

### Syntax

```scopeql
CREATE DATABASE [ IF NOT EXISTS ] <name>
```

## DROP DATABASE

Removes a database from the system.

### Syntax

```scopeql
DROP DATABASE [ IF EXISTS ] <name>
```

## CREATE SCHEMA

Creates a new schema in the current database

### Syntax

```scopeql
CREATE SCHEMA [ IF NOT EXISTS ] <name>
```

## DROP SCHEMA

Removes a schema from the current database.

### Syntax

```scopeql
DROP SCHEMA [ IF EXISTS ] <name>
```

## CREATE TABLE

Creates a new table in the current schema.

### Syntax

```scopeql
CREATE TABLE [ IF NOT EXISTS ] <table_name> (
    [
        <col_name> <col_type>
        [ NULL | NOT NULL ]
        [ COMMENT '<string_literal>' ]
    ],*
)
[ COMMENT = '<string_literal>' ]
WITH (
    ['string_literal' = <literal>],*
)
```

### Examples

```scopeql
CREATE TABLE t1 (a INT)
with (
    'storage.type' = 's3',
    'storage.endpoint' = 'http://127.0.0.1:9000/',
    'storage.bucket' = 'test-bucket',
    'storage.region' = 'us-east-1',
    'storage.access_key_id' = 'minioadmin',
    'storage.secret_access_key' = 'minioadmin'
);
```

## DROP TABLE

Removes a table from the current schema.

### Syntax

```scopeql
DROP TABLE [ IF EXISTS ] <name>
```

## SHOW TABLES

Lists the tables for which you have access privileges.

### Syntax

```scopeql
SHOW TABLES
```

## DESCRIBE TABLE

Describes the columns in a table.

### Syntax

```scopeql
DESCRIBE TABLE <name>
```

## CREATE NODEGROUP

Creates a new nodegroup.

### Syntax

```scopeql
CREATE NODEGROUP <name>
```

## DROP NODEGROUP

Removes a nodegroup.

### Syntax

```scopeql
DROP NODEGROUP <name>
```

## CREATE TASK

Creates a new task.

### Syntax

```scopeql
CREATE TASK <name>
SCHEDULE = '<cronexpr>'
NODEGROUP = '<comma-separated-nodegroups>'
AS
  <statement>
```

### Examples

```scopeql
CREATE TASK archive_table_t
SCHEDULE = '4 2 * * * Asia/Shanghai'
NODEGROUP = 'background'
AS DELETE FROM t;
```

## DROP TASK

Removes a task.

### Syntax

```scopeql
DROP TASK <name>
```

## SHOW TASKS

Lists the tasks for which you have access privileges.

### Syntax

```scopeql
SHOW TASKS
```

## OPTIMIZE TABLE

Optimizing a table. Do compaction or purge historical data to save storage space and enhance query performance.

### Syntax

```scopeql
OPTIMIZE TABLE <name>
```
