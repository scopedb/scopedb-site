---
sidebar_label: Conversion
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Conversion functions

This family of functions can be used to convert an expression of any ScopeDB data type to another data type.

## CAST, `::`

Converts a value of one data type into another data type. If the cast is not possible, an error is raised.

### Syntax

```scopeql
CAST( <source_expr> AS <target_data_type> )
```

or

```scopeql
<source_expr> :: <target_data_type>
```

### Arguments

#### `<source_expr>`

Expression of any supported data type to be converted into a different data type.

#### `<target_data_type>`

The data type to which to convert the expression.

### Examples

Convert a string to a timestamp:

```scopeql
SELECT CAST('1900-10-16T19:00:00Z' AS timestamp);
SELECT '2024-10-16T19:00:00Z'::timestamp;
```

Convert a string to an interval:

```scopeql
SELECT CAST('PT24h' AS interval);
SELECT 'PT60s'::interval;
```
