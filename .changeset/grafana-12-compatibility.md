---
'grafana-json-datasource': patch
---

Implement Grafana 12.x compatibility and UI fixes

- Replace deprecated InfoBox with Alert in ExperimentalEditor
- FieldEditor: use aria-labels for add/remove buttons
- KeyValueEditor: GrafanaTheme2, useStyles2, theme.shape.radius.default
- TabbedQueryEditor: remove AutoSizer, fix CodeEditor usage for Grafana 12.x
- plugin.json: grafanaDependency >=12.0.0, grafanaVersion 12.x
