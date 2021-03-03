---
id: installation
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can install the plugin using [grafana-cli](https://grafana.com/docs/grafana/latest/administration/cli/), or by downloading the plugin manually.

## Install using grafana-cli

To install the latest version of the plugin, run the following command on the Grafana server:

<Tabs
  groupId="operating-systems"
  defaultValue="linux"
  values={[
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
  <TabItem value="linux">

```
grafana-cli plugins install marcusolsson-json-datasource
```

  </TabItem>
  <TabItem value="macos">

```
grafana-cli plugins install marcusolsson-json-datasource
```

  </TabItem>
  <TabItem value="windows">

```
grafana-cli.exe plugins install marcusolsson-json-datasource
```

  </TabItem>
</Tabs>

## Install manually

1. Go to [Releases](https://github.com/marcusolsson/grafana-json-datasource/releases) on the GitHub project page
1. Find the release you want to install
1. Download the release by clicking the release asset called `marcusolsson-json-datasource-<version>.zip`. You may need to uncollapse the **Assets** section to see it.
1. Unarchive the plugin into the Grafana plugins directory

   <Tabs
     groupId="operating-systems"
     defaultValue="linux"
     values={[
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
       {label: 'Windows', value: 'windows'},
     ]}>
     <TabItem value="linux">

     ```
     unzip marcusolsson-json-datasource-<version>.zip
     mv marcusolsson-json-datasource /var/lib/grafana/plugins
     ```

     </TabItem>
     <TabItem value="macos">

     ```
     unzip marcusolsson-json-datasource-<version>.zip
     mv marcusolsson-json-datasource /usr/local/var/lib/grafana/plugins
     ```

     </TabItem>
     <TabItem value="windows">

     ```
     Expand-Archive -Path marcusolsson-json-datasource-<version>.zip -DestinationPath C:\grafana\data\plugins
     ```

     </TabItem>
   </Tabs>

1. Restart the Grafana server to load the plugin
