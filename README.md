# JSON API data source for Grafana

[![Build](https://github.com/grafana/grafana-json-datasource/workflows/CI/badge.svg)](https://github.com/grafana/grafana-json-datasource/actions?query=workflow%3A%22CI%22)
[![Release](https://github.com/grafana/grafana-json-datasource/workflows/Release/badge.svg)](https://github.com/grafana/grafana-json-datasource/actions?query=workflow%3ARelease)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-json-datasource%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-json-datasource)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22marcusolsson-json-datasource%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/marcusolsson-json-datasource)
[![License](https://img.shields.io/github/license/grafana/grafana-json-datasource)](LICENSE)

The Grafana JSON Datasource plugin empowers you to seamlessly integrate JSON data into Grafana. JSON is a versatile and widely used data format, and with this plugin, you can easily transform your JSON data into meaningful visualizations within Grafana dashboards.

## Documentation

For comprehensive instructions on setting up and configuring the Grafana JSON API Datasource, please consult our official [documentation](https://grafana.github.io/grafana-json-datasource).

## Contributing

We welcome and appreciate contributions from the open-source community to make this project better. Whether you want to report a bug, request a new feature, or submit code changes, please follow the guidelines below:

#### Reporting issues

If you encounter a bug or have a suggestion for improvement, please check our [issues](https://github.com/grafana/grafana-json-datasource/issues) to see if a similar issue has already been reported. If not, feel free to open a new issue. When creating an issue, please provide as much detail as possible, including the version of the datasource you are using, your version of grafana and steps to reproduce the issue.

#### Requesting features

If you have an idea for a new feature or enhancement, we encourage you to create an [issue](https://github.com/grafana/grafana-json-datasource/issues). This can help gather feedback and refine the proposal.

#### Pull requests

If you'd like to contribute code to this project, please follow these steps:

1. Fork the repository to your GitHub account.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them with a clear, descriptive message.
4. Push your branch to your fork: `git push origin feature-name`.
5. Create a pull request (PR) to the `main` branch of this repository. Please provide a detailed description of your changes in the PR.
6. Be prepared to address any feedback or requested changes during the review process.
7. Once your PR is approved, it will be merged, and your contribution will be part of the datasource.
