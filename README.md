# JSON API data source for Grafana

[![Build](https://github.com/marcusolsson/grafana-json-datasource/workflows/CI/badge.svg)](https://github.com/marcusolsson/grafana-json-datasource/actions?query=workflow%3A%22CI%22)
[![Release](https://github.com/marcusolsson/grafana-json-datasource/workflows/Release/badge.svg)](https://github.com/marcusolsson/grafana-json-datasource/actions?query=workflow%3ARelease)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-json-datasource%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-json-datasource)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-json-datasource%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-json-datasource)
[![License](https://img.shields.io/github/license/marcusolsson/grafana-json-datasource)](LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/marcusolsson?color=%231DA1F2&label=twitter&style=plastic)](https://twitter.com/marcusolsson)

A data source plugin for loading JSON APIs into [Grafana](https://grafana.com).

![Screenshot](https://github.com/marcusolsson/grafana-json-datasource/raw/main/src/img/screenshot.png)

Extract one or more values from a JSON API using [JSON Path](https://goessner.net/articles/JsonPath/). Each path results in a field in the query result. All fields need to be of the same length.

## Configuration

This section lists the available configuration options for the JSON API data source.

### Query editor

| Configuration | Description |
|---------------|-------------|
| **Path** | Appends a URL path to the URL configured by the data source. |
| **Query string** | Overrides the custom query parameters configured by the data source. |
| **Cache Time** | Determines the time in seconds to save the API response. |
| **Query** | Defines the [JSON Path](https://goessner.net/articles/JsonPath/) used to extract the field. |
| **Type** | Defines the type of the values returned by the JSON Path query. |

### Variables

[Variables](https://grafana.com/docs/grafana/latest/variables) are supported for all text configuration options.

### Macros

Use macros in your query string and JSON Path queries to add dashboard context to your queries. Macros are available for the **Query string** and (JSON Path) **Query** options.
| Macro | Description |
|-------|-------------|
| `$__unixEpochFrom()` | Start of the dashboard time interval as a Unix timestamp, i.e. 1494410783 |
| `$__unixEpochTo()` | End of the dashboard time interval as a Unix timestamp, i.e. 1494410783 |

## Public data sets

Here are a few publicly available JSON data sets that you can try out.

### Reddit

Get information about any subreddit by adding `.json` at the end of the URL.

#### Configuration

- **URL:** `https://www.reddit.com/r/grafana.json`

#### Sample queries

- `$.data.children[*].data.title`
- `$.data.children[*].data.created_utc`
- `$.data.children[*].data.ups`

### TVmaze

List episodes from your favorite TV series.

#### Configuration

- **URL:** `http://api.tvmaze.com/singlesearch/shows`
- **Query string:** `q=archer&embed=episodes`

#### Sample queries

- `$._embedded.episodes[*].name`
- `$._embedded.episodes[*].airstamp`
- `$._embedded.episodes[*].season`
- `$._embedded.episodes[*].number`
