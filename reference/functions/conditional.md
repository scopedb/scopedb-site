---
sidebar_label: Conditional expression
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Conditional expression functions

Conditional expression functions return values based on logical operations using each expression passed to the function.

## IS_DISTINCT_FROM, IS_NOT_DISTINCT_FROM

Compares whether two expressions are equal (or not equal). The function is NULL-safe, meaning it treats NULLs as known values for comparing equality. Note that this is different from the EQUAL comparison operator (=), which treats NULLs as unknown values.

### Syntax

```scopeql
IS_DISTINCT_FROM(<expr1>, <expr2>)
IS_NOT_DISTINCT_FROM(<expr1>, <expr2>)
```

### Returns

The value returned depends on whether any of the inputs are NULL values:

* Returns TRUE, if:
  * `IS_NOT_DISTINCT_FROM(<null>, <null>)`
  * `IS_DISTINCT_FROM(<null>, <non-null>)`
  * `IS_DISTINCT_FROM(<non-null>, <null>)`
* Returns FALSE, if:
  * `IS_DISTINCT_FROM(<null>, <null>)`
  * `IS_NOT_DISTINCT_FROM(<null>, <non-null>)`
  * `IS_NOT_DISTINCT_FROM(<non-null>, <null>)`
* Otherwise,
  * `IS_DISTINCT_FROM(<expr1>, <expr2>)` is equivalent to `<expr1> != <expr2>`
  * `IS_NOT_DISTINCT_FROM(<expr1>, <expr2>)` is equivalent to `<expr1> = <expr2>`

## IS [ NOT ] NULL

Determines whether an expression is NULL or is not NULL.

### Syntax

```scopeql
<expr> IS [ NOT ] NULL
```

### Returns

Returns a BOOLEAN.

* When IS NULL is specified, the value is TRUE if the expression is NULL. Otherwise, returns FALSE.
* When IS NOT NULL is specified, the value is TRUE if the expression is not NULL. Otherwise, returns FALSE.

