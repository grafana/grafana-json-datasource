---
title: Installation
menuTitle: Installation
description: This document explains the installation process of JSON API data source
aliases:
keywords:
  - data source
  - json api
labels:
  products:
    - oss
    - grafana cloud
weight: 200
---

You can install the plugin using [grafana-cli](https://grafana.com/docs/grafana/latest/administration/cli/), or by downloading the plugin manually.

## Install using grafana-cli

To install the latest version of the plugin, run the following command on the Grafana server:

In linux/macos, you can install the plugin using the following command

```bash
grafana-cli plugins install marcusolsson-json-datasource
```

whereas in windows machine, use the following command

```bash
grafana-cli.exe plugins install marcusolsson-json-datasource
```

## Install manually

1. Go to [Releases](https://github.com/grafana/grafana-json-datasource/releases) on the GitHub project page
2. Find the release you want to install
3. Download the release by clicking the release asset called `marcusolsson-json-datasource-<version>.zip`. You may need to un-collapse the **Assets** section to see it.
4. Unarchive the plugin into the Grafana plugins directory.

   In linux/macos, you can use the following command to extract the plugin

   ```bash
   unzip marcusolsson-json-datasource-<version>.zip
   mv marcusolsson-json-datasource /var/lib/grafana/plugins
   ```

   In windows, you can use the following command to extract the plugin

   ```powershell
   Expand-Archive -Path marcusolsson-json-datasource-<version>.zip -DestinationPath C:\grafana\data\plugins
   ```

5. Restart the Grafana server to load the plugin
