---
title: JSONata
menuTitle: JSONata
description: This document explains the jsonata usage in JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 430
---

[JSONata](https://docs.jsonata.org/) is a query and transformation language for JSON data.

If you're new to JSONata, start by looking at some [simple queries](https://docs.jsonata.org/simple).

[Dashboard variables](https://grafana.com/docs/grafana/latest/variables/) are available as JSONata variables, e.g. `$instanceName`. Since dashboard variables can have multiple values, the JSONata variable is always an array. If your variable contains a single value, you can use `$instanceName[0]` to index the first value in the array.
