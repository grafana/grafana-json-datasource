---
title: Variables
menuTitle: Variables
description: This document explains the process of setting up variables using JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 500
---

![Variables](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/variable.png)

[Query variables](https://grafana.com/docs/grafana/latest/variables/variable-types/add-query-variable) let you extract data from a data source and use it to populate a dashboard variable.

To query the JSON API data source for variables, follow the instructions on how to [Add a query variable](https://grafana.com/docs/grafana/latest/variables/variable-types/add-query-variable). Make sure to select the JSON API from the list of data sources.

You can edit the query for the variable in the same way as the default query editor except that you can only define one field.

For more information on how to configure a query, refer to [Query editor](./query-editor.md).
