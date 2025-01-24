# Aggregate functions

Aggregate functions operate on values across rows to perform mathematical calculations such as sum, average, counting, minimum/maximum values, standard deviation, and estimation, as well as some non-mathematical operations.

An aggregate function takes multiple rows (actually, zero, one, or more rows) as input and produces a single output. In contrast, scalar functions take one row as input and produce one row (one value) as output.

An aggregate function always returns exactly one row, **even when the input contains zero rows**. Typically, if the input contains zero rows, the output is NULL. However, an aggregate function could return 0, an empty string, or some other value when passed zero rows.

## List of functions

* [APPROX_QUANTILE](functions/approx_quantile.md)
* [AVG](functions/avg.md)
* [COUNT](functions/count.md)
* [FILTER_NULLS_MAX_BY](functions/filter_nulls_max_by.md)
* [FILTER_NULLS_MIN_BY](functions/filter_nulls_min_by.md)
* [MAX](functions/max.md)
* [MAX_BY](functions/max_by.md)
* [MIN](functions/min.md)
* [MIN_BY](functions/min_by.md)
* [MODE](functions/mode.md)
* [STDDEV_POP](functions/stddev_pop.md)
* [STDDEV_SAMP](functions/stddev_samp.md)
* [SUM](functions/sum.md)
* [VARIANCE_POP](functions/variance_pop.md)
* [VARIANCE_SAMP](functions/variance_samp.md)
