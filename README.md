# JSON API data source for Grafana

[![License](https://img.shields.io/github/license/marcusolsson/grafana-jsonapi-datasource)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contribute)

A data source plugin for loading JSON APIs into [Grafana](https://grafana.com).

![Screenshot](https://github.com/marcusolsson/grafana-jsonapi-datasource/raw/master/src/img/screenshot.png)

Extract one or more values from a JSON API using [JSON Path](https://goessner.net/articles/JsonPath/). Each path results in a field in the query result. All fields need to be of the same length.

The field name defaults to the name of the property referenced by the JSON Path but can be set to an **Alias**. **This is going away in a future release, since Grafana now lets you rename any field.**

The **Cache Time** determines the time in seconds to save the API response.

**Custom query parameters** lets you override the query parameters configured by the data source.
