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

## SUBSTR

Returns the portion of the string value from `<base_expr>`, starting from the character specified by `<start_expr>`, with optionally limited length.

### Syntax

```scopeql
SUBSTR( <base_expr>, <start_expr> [ , <length_expr> ] )
```

### Arguments

#### `<base_expr>`

An expression that evaluates to a STRING value.

#### `<start_expr>`

An expression that evaluates to an integer. It specifies the offset from which the substring starts. The offset is measured in the number of UTF-8 characters.

The start position is 0-based.

#### `<length_expr>`

An expression that evaluates to an integer. It specifies the number of UTF-8 characters to return.

Specify a length that is greater than or equal to zero. If the length is a negative number, the function throws an error.

### Returns

The data type of the returned value is STRING. If any of the inputs are NULL, NULL is returned.

### Examples

The following example uses the SUBSTR function to return the portion of the string that starts at the ninth character and limits the length of the returned value to three characters:

```scopeql
SELECT SUBSTR('testing 1 2 3', 8, 3);
```

```
+-------------------------------+
| SUBSTR('testing 1 2 3', 8, 3) |
+-------------------------------+
| 1 2                           |
+-------------------------------+
```

The following example shows the substrings returned for the same `<base_expr>` when different values are specified for `<start_expr>` and `<length_expr>`:

```scopeql
VALUES
  ('mystring', -1, 3),
  ('mystring', -3, 3),
  ('mystring', -3, 7),
  ('mystring', -5, 3),
  ('mystring', -7, 3),
  ('mystring', 0, 3),
  ('mystring', 0, 7),
  ('mystring', 1, 3),
  ('mystring', 1, 7),
  ('mystring', 3, 3),
  ('mystring', 3, 7),
  ('mystring', 5, 3),
  ('mystring', 5, 7),
  ('mystring', 7, 3),
  ('mystring', NULL, 3),
  ('mystring', 3, NULL)
SELECT
  $0 as base_value,
  $1 as start_value,
  $2 as length_value,
  SUBSTR($0, $1, $2) as substring;
```

```
+------------+-------------+--------------+-----------+
| base_value | start_value | length_value | substring |
+------------+-------------+--------------+-----------+
| mystring   | -1          | 3            | g         |
| mystring   | -3          | 3            | ing       |
| mystring   | -3          | 7            | ing       |
| mystring   | -5          | 3            | tri       |
| mystring   | -7          | 3            | yst       |
| mystring   | 0           | 3            | mys       |
| mystring   | 0           | 7            | mystrin   |
| mystring   | 1           | 3            | yst       |
| mystring   | 1           | 7            | ystring   |
| mystring   | 3           | 3            | tri       |
| mystring   | 3           | 7            | tring     |
| mystring   | 5           | 3            | ing       |
| mystring   | 5           | 7            | ing       |
| mystring   | 7           | 3            | g         |
| mystring   | NULL        | 3            | NULL      |
| mystring   | 3           | NULL         | NULL      |
+------------+-------------+--------------+-----------+
```
