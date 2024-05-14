---
title: JSON API data source for Grafana
menuTitle: JSON API data source
description: This document introduces the JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 100
---

{{< admonition type="warning" >}}
This plugin is now in maintenance mode, no new features will be added. We recommend using the [Infinity data source plugin](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) instead
{{< /admonition >}}

JSON API is an open source data source plugin for Grafana that lets you visualize data from any URL that returns JSON, such as REST APIs or static file servers.

## Known Limitations

* Since the plugin doesn't keep a record of previous queries, each query needs to contain the complete data set you want to visualize. If you'd like to visualize how the data changes over time, you're probably better off storing the data in a database.

* This plugin doesn't support backend operations such as alerting, recorded queries, public dashboards, enterprise query caching, etc. If you prefer to use one of those options, use the [Grafana Infinity Datasource plugin](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) instead.

* This plugins doesn't support authentication methods such as OAuth2, digest authentication, jwt authentication. If you prefer to use one of those options, use the [Grafana Infinity Datasource plugin](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) instead.
