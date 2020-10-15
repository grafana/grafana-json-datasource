# JSON API data source for Grafana

[![License](https://img.shields.io/github/license/marcusolsson/grafana-jsonapi-datasource)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contribute)

A data source plugin for loading JSON APIs into [Grafana](https://grafana.com).

**Important:** This plugin is **not** production-ready yet. In the meantime, try it out and [submit an issue](https://github.com/marcusolsson/grafana-jsonapi-datasource/issues/new) for bug reports and feature requests.

![Screenshot](https://github.com/marcusolsson/grafana-jsonapi-datasource/raw/master/src/img/screenshot.png)

Extract one or more values from a JSON API using [JSON Path](https://goessner.net/articles/JsonPath/). Each path results in a field in the query result. All fields need to be of the same length.

The field name defaults to the name of the property referenced by the JSON Path but can be set to an **Alias**.

The **Cache Time** determines the time in seconds to save the API response.
