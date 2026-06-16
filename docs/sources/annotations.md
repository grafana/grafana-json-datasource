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
weight: 600
---

![Annotations](https://raw.githubusercontent.com/grafana/grafana-json-datasource/main/docs/images/annotation.png)

[Annotations](https://grafana.com/docs/grafana/latest/dashboards/annotations) let you extract data from a data source and use it to annotate a dashboard.

> **Info:** Annotations support was added in **v1.0.1**. If you can't select the JSON API data source from the list of data sources, try updating to a more recent version.

To use the JSON API data source for annotations, follow the instructions on [Querying other data sources](https://grafana.com/docs/grafana/latest/dashboards/annotations/#querying-other-data-sources). Make sure to select the JSON API from the list of data sources.

Configure a query with _at least_ two fields:

- A **String** field for the annotation text
- A **Time** field for the annotation time

If you want to add titles or tags to the annotations, you can add additional **Fields** with the appropriate types.

For more information on how to configure a query, refer to [Query editor](query-editor.md).
