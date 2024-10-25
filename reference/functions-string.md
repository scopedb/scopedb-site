---
sidebar_label: String
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# String functions

## CONCAT

Concatenates two strings.

### Syntax

```scopeql
CONCAT( <expr> , <expr> )
```

### Arguments

#### `<expr>`

The input expressions must all be strings.

### Returns

The data type of the returned value is STRING. If any input value is NULL, returns NULL.

### Examples

```scopeql
SELECT CONCAT('George Washington ', 'Carver');
```

```
+----------------------------------------+
| CONCAT('George Washington ', 'Carver') |
+----------------------------------------+
| George Washington Carver               |
+----------------------------------------+
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

## LTRIM

Removes leading characters from a string.

### Syntax

```scopeql
LTRIM( <expr> [, <chars> ] )
```

### Arguments

#### `<expr>`

The string expression to be trimmed.

#### `<chars>` (named) (optional)

One or more characters to remove from the left side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

#### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

#### Examples

Remove leading `0` and `#` characters from a string:

```scopeql
SELECT LTRIM('#000000123', '0#');
```

```
+---------------------------+
| LTRIM('#000000123', '0#') |
|---------------------------|
| 123                       |
+---------------------------+
```

## RTRIM

Removes trailing characters from a string.

### Syntax

```scopeql
RTRIM( <expr> [, <chars> ] )
```

### Arguments

#### `<expr>`

The string expression to be trimmed.

#### `<chars>` (named) (optional)

One or more characters to remove from the right side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

#### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

#### Examples

Remove trailing `0` and `.` characters from a string:

```scopeql
SELECT RTRIM('$125.00', '0.');
```

```
+------------------------+
| RTRIM('$125.00', '0.') |
+------------------------+
| $125                   |
+------------------------+
```

## TRIM

Removes leading and trailing characters from a string.

### Syntax

```scopeql
TRIM( <expr> [, <chars> ] )
```

### Arguments

#### `<expr>`

The string expression to be trimmed.

#### `<chars>` (named) (optional)

One or more characters to remove from the left and right side of `<expr>`.

The default value is `" \t\n\r"` (common whitespace characters).

#### Returns

This function returns a value of STRING data type or NULL. If either argument is NULL, returns NULL.

#### Examples

Remove leading and trailing * and - characters from a string:

```scopeql
SELECT
    '*-*ABC-*-' AS original,
    TRIM('*-*ABC-*-', '*-') AS trimmed;
```

```
+-----------+---------+
| original  | trimmed |
+-----------+---------+
| *-*ABC-*- | ABC     |
+-----------+---------+
```

## LOWER

Returns the input string with all characters converted to lowercase.

### Syntax

```scopeql
LOWER( <expr> )
```

## UPPER

Returns the input string with all characters converted to uppercase.

### Syntax

```scopeql
UPPER( <expr> )
```

## REVERSE

Reverses the order of characters in a string.

The returned value is the same length as the input, but with the characters in reverse order. If subject is NULL, the result is also NULL.

### Syntax

```scopeql
REVERSE(<subject>)
```

### Examples

This example reverses a string:

```scopeql
SELECT REVERSE('Hello, world!');
```

```
+--------------------------+
| REVERSE('Hello, world!') |
+--------------------------+
| !dlrow ,olleH            |
+--------------------------+
```

## REPLACE

Removes all occurrences of a specified substring, and replaces them with another substring.

### Syntax

```scopeql
REPLACE( <subject> , <pattern> , <replacement> )
```

### Arguments

#### `<subject>`

The subject is the string in which to do the replacements. Typically, this is a column, but it can be a literal.

#### `<pattern>`

This is the substring that you want to replace. Typically, this is a literal, but it can be a column or expression.

If this is an empty string, then the `REPLACE` function simply return the original `<subject>` value.

#### `<replacement>`

This is the value used as a replacement for the `<pattern>`.

If this is an empty string, then the `REPLACE` function simply deletes all occurrences of the `<pattern>`.

### Returns

The returned value is the string after all replacements have been done.

If any of the arguments is a NULL, the result is also a NULL.

### Examples

Replace the string "down" with the string "up":

```scopeql
SELECT REPLACE('down', 'down', 'up');
```

```
+-------------------------------+
| REPLACE('down', 'down', 'up') |
+-------------------------------+
| up                            |
+-------------------------------+
```

Replace the substring "Athens" in the string "Vacation in Athens" with the substring "Rome":

```scopeql
SELECT REPLACE('Vacation in Athens', 'Athens', 'Rome');
```

```
+-------------------------------------------------+
| REPLACE('Vacation in Athens', 'Athens', 'Rome') |
+-------------------------------------------------+
| Vacation in Rome                                |
+-------------------------------------------------+
```

Delete the substring "bc" in the string "abcd":

```scopeql
SELECT REPLACE('abcd', 'bc', '');
```

```
+---------------------------+
| REPLACE('abcd', 'bc', '') |
+---------------------------+
| ad                        |
+---------------------------+
```

## SPLIT

Splits a given string with a given separator and returns the result in an array of strings.

Contiguous split strings in the source string, or the presence of a split string at the beginning or end of the source string, results in an empty string in the output. An empty separator string results in an array containing only the source string. If either parameter is a NULL, a NULL is returned.

### Syntax

```scopeql
SPLIT(<string>, <separator>)
```

### Arguments

#### `<string>`

Text to be split into parts.

#### `<separator>` (named)

Text to split string by.

### Returns

The data type of the returned value is ARRAY.

### Examples

Split the localhost IP address "127.0.0.1" into an array consisting of each of the four parts:

```scopeql
SELECT SPLIT('127.0.0.1', '.');
```

```
+------------------------------+
| SPLIT('127.0.0.1', '.')      |
+------------------------------+
| ['127','0','0','1']::variant |
+------------------------------+
```

Split a string that contains vertical lines as separators (note that the output will contain empty strings):

```scopeql
SELECT SPLIT('|a||', '|');
```

```
+-------------------------+
| SPLIT('|a||', '|')      |
+-------------------------+
| ['','a','','']::variant |
+-------------------------+
```

## CONTAINS

Returns true if `<expr1>` contains `<expr2>`. Both expressions must be strings.

### Syntax

```scopeql
CONTAINS( <expr1> , <expr2> )
```

### Arguments

#### `<expr1>`

The string to search in.

#### `<expr2>`

The string to search for.

### Returns

Returns a BOOLEAN or NULL:

* Returns TRUE if `<expr2>` is found inside `<expr1>`.
* Returns FALSE if `<expr2>` is not found inside `<expr1>`.
* Returns NULL if either input expression is NULL.

### Examples

Determine whether column values contain a string:

```scopeql
VALUES
  ('coffee'),
  ('ice tea'),
  ('latte'),
  ('tea'),
  (NULL)
WHERE CONTAINS($0, 'te');
```

```
+---------+
| $0      |
+---------+
| ice tea |
| latte   |
| tea     |
+---------+
```

## STARTS_WITH

Returns true if `<expr1>` starts with `<expr2>`. Both expressions must be strings.

### Syntax

```scopeql
STARTS_WITH( <expr1> , <expr2> )
```

### Returns

Returns a BOOLEAN. The value is TRUE if `<expr1>` starts with `<expr2>`. Returns NULL if either input expression is NULL. Otherwise, returns FALSE.

## ENDS_WITH

Returns true if `<expr1>` ends with `<expr2>`. Both expressions must be strings.

### Syntax

```scopeql
ENDS_WITH( <expr1> , <expr2> )
```

### Returns

Returns a BOOLEAN. The value is TRUE if `<expr1>` ends with `<expr2>`. Returns NULL if either input expression is NULL. Otherwise, returns FALSE.

## REGEXP_LIKE

Performs a comparison to determine whether a string matches a specified pattern. Both inputs must be strings.

### Syntax

```scopeql
REGEXP_LIKE( <subject> , <regex> )
```

### Arguments

#### `<subject>`

The string to search for matches.

#### `<regex>`

The regular expression pattern to match.

### Returns

Returns a BOOLEAN or NULL. The value is TRUE if there is a match. Otherwise, returns FALSE. Returns NULL if any argument is NULL.

### Examples

```scopeql
VALUES
  ('Sacramento'),
  ('San Francisco'),
  ('San Jose'),
  (NULL)
WHERE REGEXP_LIKE($0, 'San.*');
```

```
+---------------+
| $0            |
+---------------+
| San Francisco |
| San Jose      |
+---------------+
```

