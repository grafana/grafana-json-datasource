---
id: troubleshooting
title: Troubleshooting
---

This page lists frequently asked questions and their answers.

## Why do I get "Unable to graph data" when I try to graph the query results?

The Graph and Time series panels can only display _time series_. To create a query that returns time series, make sure that it contains at least two fields:

- A **Time** field that contains the timestamps for the X-axis
- A **Number** field that contains the values for the Y-axis

## Why do I only get the value from the last query?

The JSON API doesn't store historical data from previous queries. It can only visualize the data from the last query that was run. If you want to store metrics over time, you're likely be better of switching to a proper time series database, such as [Prometheus](https://prometheus.org).

## `Minified React error`

Grafana displays this cryptic error whenever a plugin uses features that aren't available in the currently installed version of Grafana. Make sure that the plugin supports the version you're running.
