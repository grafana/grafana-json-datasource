---
id: introduction
title: Introduction
slug: /
hide_title: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

export const Logo= ({ children }) =>(
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "72px 0",
    }}>
    <img alt="Logo" src={useBaseUrl('img/logo.svg')} width="64px" height="64px" />
    <h1
      style={{
        fontSize: "3rem",
        margin: 0,
        marginLeft: "1rem",
      }}>
      JSON API
    </h1>
  </div>
)

<Logo />

JSON API is an open source data source plugin for Grafana that lets you visualize data from any URL that returns JSON, such as REST APIs or static file servers.

Since the plugin doesn't keep a record of previous queries, each query needs to contain the complete data set you want to visualize. If you'd like to visualize how the data changes over time, you're probably better off storing the data in a database.

