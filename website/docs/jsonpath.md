---
id: jsonpath
title: JSONPath
---

[JSONPath](https://goessner.net/articles/JsonPath/) is a query language for JSON structures.

For example, to query the titles of all the books in a store:

```js
$.store.book[*].title
```

- `$` selects the root element
- `.` selects a child of the current element
- `*` selects all elements within an object or array

:::note JSONPath Plus
The JSON API data source uses the [JSONPath Plus](https://www.npmjs.com/package/jsonpath-plus) package to evaluate JSONPath expressions. JSONPath Plus extends the original specification with additional features.

For more information on the supported syntax, refer to the [project page](https://github.com/JSONPath-Plus/JSONPath).
:::

## Filters

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
