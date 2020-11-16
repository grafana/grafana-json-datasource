# JSON API data source for Grafana

[![License](https://img.shields.io/github/license/marcusolsson/grafana-jsonapi-datasource)](LICENSE)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contribute)

A data source plugin for loading JSON APIs into [Grafana](https://grafana.com).

![Screenshot](https://github.com/marcusolsson/grafana-jsonapi-datasource/raw/master/src/img/screenshot.png)

Extract one or more values from a JSON API using [JSON Path](https://goessner.net/articles/JsonPath/). Each path results in a field in the query result. All fields need to be of the same length.

The field name defaults to the name of the property referenced by the JSON Path but can be set to an **Alias**. **This is going away in a future release, since Grafana now lets you rename any field.**

The **Cache Time** determines the time in seconds to save the API response.

**Custom query parameters** lets you override the query parameters configured by the data source.

## Public data sets

Here are a few publicly available JSON data sets that you can try out.

### Reddit

Get information about any subreddit by adding `.json` at the end of the URL.

#### Configuration

- **URL:** [`https://www.reddit.com/r/grafana.json`](https://www.reddit.com/r/grafana.json)

#### Sample queries

- `$.data.children[*].data.title`
- `$.data.children[*].data.created_utc`
- `$.data.children[*].data.ups`

### TVmaze

List episodes from your favorite TV series.

#### Configuration

- **URL:** [http://api.tvmaze.com/singlesearch/shows](http://api.tvmaze.com/singlesearch/shows)
- **Custom query parameters:** `q=rick-&-morty&embed=episodes`

#### Sample queries

- `$._embedded.episodes[*].name`
- `$._embedded.episodes[*].airstamp`
- `$._embedded.episodes[*].season`
- `$._embedded.episodes[*].number`
