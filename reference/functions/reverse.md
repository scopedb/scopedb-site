# REVERSE

Reverses the order of characters in a string.

The returned value is the same length as the input, but with the characters in reverse order. If subject is NULL, the result is also NULL.

## Syntax

```scopeql
REVERSE(<subject>)
```

## Examples

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
