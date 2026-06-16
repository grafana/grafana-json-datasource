---
title: Macros
menuTitle: Macros
description: This document explains the macros provided by JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 410
---

Use macros to add dashboard context to your queries. Macros are available in HTTP params and JSONPath expressions.

| Macro                | Description                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `$__unixEpochFrom()` | Start of the dashboard time interval as a Unix timestamp, i.e. 1494410783                  |
| `$__unixEpochTo()`   | End of the dashboard time interval as a Unix timestamp, i.e. 1494410783                    |
| `$__isoFrom()`       | Start of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z |
| `$__isoTo()`         | End of the dashboard time interval as a ISO8601 timestamp, i.e. 2021-05-17T20:48:09.000Z   |
