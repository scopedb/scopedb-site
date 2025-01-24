# REGEXP_LIKE

Performs a comparison to determine whether a string matches a specified pattern. Both inputs must be strings.

## Syntax

```scopeql
REGEXP_LIKE( <subject> , <regex> )
```

## Arguments

### `<subject>`

The string to search for matches.

### `<regex>` (named)

The regular expression pattern to match.

## Returns

Returns a BOOLEAN or NULL. The value is TRUE if there is a match. Otherwise, returns FALSE. Returns NULL if any argument is NULL.

## Examples

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
