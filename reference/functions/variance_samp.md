# VARIANCE_SAMP

Returns the sample variance of non-NULL records in a group. If all records inside a group are NULL, a NULL is returned.

## Syntax

```scopeql
VARIANCE_SAMP ( <expr> )
```

## Arguments

### `<expr>`

An expression that evaluates to a numeric value. This is the expression on which the variance is calculated.

## Returns

The data type of the returned value is FLOAT.

If all records inside a group are NULL, this function returns NULL.
