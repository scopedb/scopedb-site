---
sidebar_label: String
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# String functions

## SEARCH

Searches character data (text) in specified columns.

### Syntax

```scopeql
SEARCH( <search_data>, <query> )
```

### Arguments

#### `<search_data>`

The data you want to search.

#### `<query>` (named)

A string that contains one or more search terms. This argument must be a literal string; column names are not supported. Specify one pair of single quotes around the entire string.

### Returns

Returns a BOOLEAN.

* The value is TRUE if any `<query>` tokens are found in `<search_data>`.
* Returns NULL if either of these arguments is NULL.
* Otherwise, returns FALSE.

### Examples

```scopeql
VALUES ('foo bar'), ('foobar'), ('bar baz'), ('') SELECT *, search($0, query => 'foo');
```

```
+---------+----------------------------+
| $0      | search($0, query => 'foo') |
+---------+----------------------------+
| foo bar | true                       |
| foobar  | false                      |
| bar baz | false                      |
|         | false                      |
+---------+----------------------------+
```

## LENGTH

Returns the length of an input string value. The length is the number of characters, and UTF-8 characters are counted as a single character.

### Syntax

```scopeql
LENGTH( <expression> )
```

### Arguments

#### `<expression>`

The input expression must be a string value.

### Returns

The returned data type is INTEGER.

### Examples

```scopeql
VALUES
    (''), ('Joyeux Noël'), ('Merry Christmas'), ('Veselé Vianoce'),
    ('Wesołych Świąt'), ('圣诞节快乐'), (NULL),
SELECT $0, LENGTH($0);
```

```
+-----------------+------------+
| $0              | LENGTH($0) |
+-----------------+------------+
|                 | 0          |
| Joyeux Noël     | 11         |
| Merry Christmas | 15         |
| Veselé Vianoce  | 14         |
| Wesołych Świąt  | 14         |
| 圣诞节快乐        | 5          |
| NULL            | NULL       |
+-----------------+------------+
```
