# Contributing

Thank you for your interest in contributing to the plugin! 🙏

## Contribute code

### Set up the plugin

This project uses GitHub Pull Requests to manage contributions. If this is your first time contributing to a project on GitHub, you should first learn how to [fork a project and make a pull request](https://guides.github.com/activities/forking/).

To build and run the plugin locally, you first need to:

- [Install Node.js](https://nodejs.org/en/download/)
- [Fork the project](https://guides.github.com/activities/forking/#fork)

Then enter the following in your terminal:

```bash
cd path/to/your/clone
yarn install
yarn build
```

If the commands ran successfully without errors, then you're ready to go! 🚀

> **Note:** Instead of `yarn build` you can also run `yarn watch`, which rebuilds the plugin whenever the source code changes.

### Set up Grafana for plugin development

Grafana loads plugins from any directory under the Grafana plugin directory.

By default, Grafana doesn't load unsigned plugins. To load the development build of the plugin, you need to configure Grafana to allow it by adding the following to your Grafana configuration file:

```ini
[plugins]
allow_loading_unsigned_plugins = marcusolsson-json-datasource
```

You can also configure this using environment variables:

```bash
export GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=marcusolsson-json-datasource
```

#### Local installation

If you're running Grafana locally, then you can either move or symlink the project directory to the Grafana plugin directory.

```bash
# Linux and macOS
ln -s /path/to/your/clone /var/lib/grafana/plugins
```

#### Docker

If you have Docker installed, then you can instead mount the plugin into the container:

```bash
docker run --rm \
    -v /path/to/your/clone:/var/lib/grafana/plugins \
    -e GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS=marcusolsson-json-datasource \
    -p 3000:3000 \
    grafana/grafana:8.0.0-beta2
```

## Contribute documentation

This plugin uses [Docusaurus](https://docusaurus.io/) to build the [documentation](https://marcus.se.net/grafana-json-datasource).

For more information about writing documentation using Docusaurus, refer to the [Docusaurus documentation](https://docusaurus.io/docs/).

The individual documentation pages are written in Markdown. You can find them under [website/docs](website/docs).

To preview the documentation site on your local machine, run the following in your terminal:

```bash
cd website/docs
yarn start
```
