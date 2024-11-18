---
sidebar_label: Variant
---

# Variant data type

The VARIANT data type can contain a value of any other data type.

## Inserting VARIANT data

To insert VARIANT data directly, use `SELECT ... INSERT INTO ...`. The following example shows how to insert JSON-formatted data into a VARIANT value:

```scopeql
CREATE TABLE variant_insert (v VARIANT);

SELECT PARSE_JSON('{"key1": "value1", "key2": "value2"}') INSERT INTO variant_insert;
FROM variant_insert;
```

```
+-----------------------------------+
| v                                 |
+-----------------------------------+
| {"key1":'value1',"key2":'value2'} |
+-----------------------------------+
```

Alternatively, you can use the variant literal syntax:

```scopeql
DELETE FROM variant_insert;
SELECT {"key3": 'value3', "key4": 'value4'} INSERT INTO variant_insert;
FROM variant_insert;
```

```
+-----------------------------------+
| v                                 |
+-----------------------------------+
| {"key3":'value3',"key4":'value4'} |
+-----------------------------------+
```

:::info[Syntax of variant literal]

It is almost [the JSON format](https://datatracker.ietf.org/doc/html/rfc8259), expect:

* Field names are identifiers. Thus, it can be `"field_name"` or `field_name` without quotes, but `'field_name'` is illegal.
* String values are literal strings. Thus, it must be `'string_value'`. No quote or double-quoted are both illegal.
* Values are extended for `timestamp` and `interval` types. For example, `{ "ts": '2024-10-25T10:25:17Z'::timestamp }`. These values will be formatted as string when calling `TO_JSON`.

:::

## Using VARIANT values

To convert a value to or from the VARIANT data type, you can explicitly cast using the CAST function or the `::` operator (e.g. `<expr>::VARIANT`).

## Related content

See also [variant data functions](functions-variant.md).
