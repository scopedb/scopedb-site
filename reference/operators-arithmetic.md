---
sidebar_label: Arithmetic
---

# Arithmetic operators

Arithmetic operators are used to generate numeric output from one or more input expressions.

The input expressions must be numeric (integer or floating point), except in the following cases:

* The binary operator `+` and `-` can be applied for datetime calculations:
    * `<timestamp>+<interval>` returns a `<timestamp>`
    * `<timestamp>-<interval>` returns a `<timestamp>`
    * `<timestamp>-<timestamp>` returns a `<interval>`

## List of arithmetic operators

| Operator    | Syntax  | Description                                                                            |
|-------------|---------|----------------------------------------------------------------------------------------|
| `+`         | `a + b` | Adds two numeric expressions (`a` and `b`).                                            |
| `-` (unary) | `-a`    | Negates the input numeric expression.                                                  |
| `*`         | `-a`    | Multiplies two numeric expressions (`a` and `b`).                                      |
| `/`         | `a / b` | Divides one numeric expression (`a`) by another (`b`). Divide by `0` returns infinity. |
