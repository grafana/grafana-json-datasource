# Contributing

Thank you for your interest in contributing to the plugin! 🙏 This document explains the ways you can contribute the project!

- How do I ...
  - [Contribute code](#contribute-code)
  - [Contribute documentation](#contribute-documentation)
  - [Set up the project](#set-up-the-project)

If you get stuck along the way, feel free to [ask for help](https://github.com/grafana/grafana-json-datasource/discussions/new?category=q-a).

## Contribute code

To contribute code:

1. Check if there's an already existing issue that describes the reason or motivation behind your pull request.
2. If there are no issues describing what you want to do, go ahead and [create one](https://github.com/grafana/grafana-json-datasource/issues/new). By creating an issue before you start working on a fix, you can increase the chance of your pull request getting accepted! 💪
3. Include any [documentation](contribute-documentation) that your changes might need.
4. Write or update tests to verify that your changes work as expected.
5. Now you're ready to [open a pull request](https://github.com/grafana/grafana-json-datasource/compare)!
6. In the description for your pull request, add a line that says `Fixes #123`, where `123` is the number of the issue the pull request fixes.

After you've created the pull request:

- If the maintainer asks for any changes, edit your changes, push, and ask for another review.
- If the maintainer decides to pass on your pull request, they will thank you for the contribution and explain why they won't be accepting the changes.
- If your pull request gets accepted, it'll be merged into the main branch soon after. Your contribution will be available in the next release! 🎉

## Contribute documentation

The individual documentation pages are written in Markdown. You can find them under [docs/sources](./docs/sources/). Once documentation is updated, they will automatically published in [grafana.com/docs/plugins](https://grafana.com/docs/plugins/marcusolsson-json-datasource/latest/) website.

## Set up the project

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
    grafana/grafana:latest
```
