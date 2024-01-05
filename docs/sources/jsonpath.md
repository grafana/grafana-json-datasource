---
title: JSONPath
menuTitle: JSONPath
description: This document explains the jsonpath usage in JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 420
---

[JSONPath](https://goessner.net/articles/JsonPath/) is a query language for JSON structures.

For example, to query the titles of all the books in a store:

```js
$.store.book[*].title
```

- `$` selects the root element
- `.` selects a child of the current element
- `*` selects all elements within an object or array

> **Note:** The JSON API data source uses the [JSONPath Plus](https://www.npmjs.com/package/jsonpath-plus) package to evaluate JSONPath expressions. JSONPath Plus extends the original specification with additional features. For more information on the supported syntax, refer to the [project page](https://github.com/JSONPath-Plus/JSONPath).

## Filters

> **Note:** From version 1.3.4 filters are not supported anymore.

If your dashboards currently rely on JSONPath queries containing subexpressions, there are a few potential migration paths:

1. For simple queries that use subexpressions for indexing/slicing, it may be possible to rewrite the query without a subexpressions for instance `[(@.length-1)]` can also be represented as `[:-1]`.
2. For more complex queries, we suggest switching to the [`jsonata` language](http://docs.jsonata.org/simple), which the plugin also supports. This language has similar features to JSONPath, including support for filter expressions (called “predicates” in the documentation).
3. If changing your existing queries isn’t feasible, the community plugin [“Infinity”](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) supports JSONPath expressions, including filters and subexpressions if used with the `backend` parser option. Please note that Infinity is community supported plugin.

Filters let you query elements based on a logical expression.

For example, to query the titles of the books that cost more than 10:

```js
$.store.book[?(@.price > 10)].title
```

- `?()` defines a filter expression
- `@` selects the element that's currently being processed

Filter expressions support a set of boolean and logical operations:

- Boolean operations: `!`, `&&`, `||`
- Comparison: `>`, `<`, `>=`, `<=`
- Equality: `==`, `!=`

```js
$.store.book[?(@.price < 10)]            // Books that are cheaper than 10
$.store.book[?(@.category == 'fiction')] // Books that have the fiction category
$.store.book[?(@.isbn)]                  // Books that have a ISBN number

$.store.book[?(@.price < 10 && @.category == 'fiction')] // Cheap fiction books
```
