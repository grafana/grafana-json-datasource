---
id: annotations
title: Annotations
---

![Annotations](../static/img/annotations.png)

[Annotations](https://grafana.com/docs/grafana/latest/dashboards/annotations) let you extract data from a data source and use it to annotate a dashboard.

To use the JSON API data source for annotations, follow the instructions on [Querying other data sources](https://grafana.com/docs/grafana/latest/dashboards/annotations/#querying-other-data-sources). Make sure to select the JSON API from the list of data sources.

Configure a query with _at least_ two fields:

- A **String** field for the annotation text
- A **Time** field for the annotation time

If you want to add titles or tags to the annotations, you can add additional **Fields** with the appropriate types.

For more information on how to configure a query, refer to [Query editor](query-editor.md).
