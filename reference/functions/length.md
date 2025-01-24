# LENGTH

Returns the length of an input string value. The length is the number of characters, and UTF-8 characters are counted as a single character.

## Syntax

```scopeql
LENGTH( <expression> )
```

## Arguments

### `<expression>`

The input expression must be a string value.

## Returns

The returned data type is INTEGER.

## Examples

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
