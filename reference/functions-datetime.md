---
sidebar_label: Date and time
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Date and time functions

This family of functions can be used to construct, convert, or modify timestamp data.

## NOW

Returns the current timestamp for the system in the local time zone.

### Syntax

```scopeql
NOW()
```

### Returns

Returns the current system time. The data type of the returned value is TIMESTAMP.

### Examples

Return the current timestamp:

```scopeql
SELECT NOW();
```

```
+-----------------------------+
| NOW()                       |
+-----------------------------+
| 2024-10-16T11:36:51.730042Z |
+-----------------------------+
```
