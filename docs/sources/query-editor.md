---
title: Query Editor
menuTitle: Query Editor
description: This document explains the Query Editor of JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 400
---

This page explains the what each part of the query editor does, and how you can configure it.

The query editor for the JSON API data source consists of a number of tabs. Each tab configures a part of the query.

### Fields

![Fields](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/editor-fields.png)

The **Fields** tab is where you select the data to extract from the JSON document returned by the URL configured in the data source configuration.

- **Field** lets you define a query expression that determines the data to extract from the JSON document. There are two supported query languages: [JSONPath](./jsonpath.md) and [JSONata](./jsonata.md).
- **Type** defines the JSON type of the elements returned by the **Field** expression. By default, Grafana uses the types in the JSON document. If **Type** is set to a different type than the original property type, Grafana tries to parse the value.
- **Alias** overrides the default name of the field.

  This can be useful in cases where the API returns quoted numbers, e.g. `"price": "3.49"`.

#### Fields have different lengths

All fields must return the same number of values. If you get this error it means that one or more of the objects are missing the queried element.

In the following example, the `name` property is present in both objects, but `version` isn't.

```json
{
  "services": [
    {
      "name": "order-api",
      "version": "1"
    },
    {
      "name": "billing-api"
    }
  ]
}
```

In the example below, you can see a couple of expressions and their results for the JSON structure in the previous example. Since JSONPath expressions are evaluated individually, Grafana can't tell which version that was missing.

| Expression              | Result                         |
| ----------------------- | ------------------------------ |
| `$.services[*].name`    | `["order-api", "billing-api"]` |
| `$.services[*].version` | `["1"]`                        |

### Path

![Path](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/editor-path.png)

The drop-down box to the left lets you configure the **HTTP method** of the request sent to the URL and can be set to **GET** and **POST**.

The text box lets you append a path to the URL in the data source configuration. This can be used to dynamically change the request URL using [variables](https://grafana.com/docs/grafana/latest/variables/).

For example, by setting the path to `/movies/${movie}/summary` you can query the summary for any movie without having to change the query itself.

### Params

![Params](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/editor-params.png)

Add any parameters you'd like to send as part of the query string. For example, the parameters in the screenshot gets encoded as `?category=movies`.

Both the **Key** and **Value** fields support [variables](https://grafana.com/docs/grafana/latest/variables/).

> **Caution:** Any query parameters that have been set by the administrator in the data source configuration has higher priority and overrides the parameters set by the query.

### Headers

![Headers](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/editor-headers.png)

Add any parameters you'd like to send as HTTP headers.

Both the **Key** and **Value** fields support [variables](https://grafana.com/docs/grafana/latest/variables/).

### Body

![Body](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/editor-body.png)

Sets the text to send as a request body.

- **Syntax highlighting** sets the active syntax for the editor. This is only for visual purposes and doesn't change the actual request.

> **Info:** Due to limitations in modern browsers, Grafana ignores the request body if the HTTP method is set to GET.

### Experimental

Try out features that are currently in development. Each feature has a link in its tooltip that takes you to the feature request on GitHub where you can share your feedback.

> **Warning:** Experimental features might be unstable and can be removed without notice.

### Cache time

By default, Grafana caches the JSON document returned by the last request to avoid hitting rate limits while configuring your query. Once you're happy with your query, consider setting the cache time to **0s** to disable caching.
