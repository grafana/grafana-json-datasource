# Changelog

## v1.3.8 - 2023-10-19

- ⚙️ **Chore**: Update dependencies

## v1.3.7 - 2023-10-18

- ⚙️ **Chore**: Migrate to create-plugin
- ⚙️ **Chore**: Add feature tracking

## v1.3.6 - 2023-05-30

- ⚙️ **Chore**: Docs update

## v1.3.5 - 2023-04-05

- 🛡️ **Security**: Recently, A third party researcher (Alessio Della Libera of **Snyk Research Team**) discovered and privately disclosed to us a stored XSS vulnerability in the Grafana-maintained `marcusolsson-json-datasource` plugin also known as “JSON API plugin” .

Users with the editor role could perform a stored XSS attack against other viewers, editors, and administrators by including a specially crafted javascript statement in the `field` extractor in queries to the marcusolsson-json-datasource plugin. This resulted in XSS against anyone viewing a panel configured to query the datasource with a malicious query.

This vulnerability worked because the `marcusolsson-json-datasource` plugin uses the `jsonpath-plus` library to evaluate editor-supplied jsonpath expressions. In its default configuration (which we used), this library is an XSS vector, as the JSONPath spec allows for embedded subexpressions, which `jsonpath-plus` implements as arbitrary javascript expressions.

In order to mitigate this vulnerability, we now supply a configuration parameter to `jsonpath-plus` which forbids the evaluation of subexpressions; it is important to note that this change may **break** existing JSONPath queries that rely on filter or eval expressions.

If your dashboards currently rely on JSONPath queries containing subexpressions, there are a few potential migration paths:

1. For simple queries that use subexpressions for indexing/slicing, it may be possible to rewrite the query without a subexpressions for instance `[(@.length-1)]` can also be represented as `[:-1]`.
2. For more complex queries, we suggest switching to the [`jsonata` language](http://docs.jsonata.org/simple), which the plugin also supports. This language has similar features to JSONPath, including support for filter expressions (called “predicates” in the documentation).
3. If changing your existing queries isn’t feasible, the community plugin [“Infinity”](https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/) supports JSONPath expressions, including filters and subexpressions if used with the `backend` parser option. Please note that Infinity is community supported plugin.

## v1.3.4 - 2023-04-04

- ⚙️ **Chore**: docs update

## v1.3.3 - 2023-03-20

- ⚙️ **Chore**: dependencies update
- ⚙️ **Chore**: spellcheck added

## v1.3.2 - 2022-10-14

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.3.1...v1.3.2)

- Fixed the broken docs and links

## v1.3.1 - 2022-01-24

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.3.0...v1.3.1)

### Enhancements

- Append suffix to param key to uniquify duplicate param keys [#232](https://github.com/grafana/grafana-json-datasource/pull/232) (thanks [@rejohnst](https://github.com/rejohnst)!)
- Added grafana global variables when doing a query using jsonata [#223](https://github.com/grafana/grafana-json-datasource/pull/223) (thanks [@amng](https://github.com/amng)!)

### Bug fixes

- Certain strings incorrectly identified as dates [#202](https://github.com/grafana/grafana-json-datasource/issues/202)

## v1.3.0 - 2021-09-03

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.2.1...v1.3.0)

### Enhancements

- Add support for JSONata ([#114](https://github.com/grafana/grafana-json-datasource/issues/114)), a query language similar to JSONPath with support for transformations.

### Bug fixes

- Cannot read property 'filter' of undefined ([#156](https://github.com/grafana/grafana-json-datasource/issues/156))

## v1.2.1 - 2021-06-18

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.2.0...v1.2.1)

### Enhancements

- Update dependencies, docs, and metadata

## v1.2.0 - 2021-05-18

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.1.1...v1.2.0)

### Enhancements

- Adding $**isoFrom() and $**isoTo() macros ([#115](https://github.com/grafana/grafana-json-datasource/pull/115)) (thanks [@jirkafajfr](https://github.com/jirkafajfr)!)
- Using JSON.stringify instead of toString for object types in parseValue ([#111](https://github.com/grafana/grafana-json-datasource/pull/111)) (thanks [@Totalus](https://github.com/Totalus)!)

### Bug fixes

- 🐛 **Fix**: Fix for macros not running in variable queries ([#100](https://github.com/grafana/grafana-json-datasource/pull/100)) (thanks [@KensingtonTech](https://github.com/KensingtonTech)!)

## v1.1.1 - 2021-04-17

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.1.0...v1.1.1)

### Enhancements

- Improve editor styling

### Bug fixes

- 🐛 **Fix**: Fix issue where wrong fields were used when grouping
- Add variable support for aliases

## v1.1.0 - 2021-04-15

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.0.1...v1.1.0)

This release introduces an Experimental tab to the query editor. This will be used to let users try out features while they're being developed. Each feature has a link the the GitHub issue where you can share you feedback, before the feature is considered stable.

### Enhancements

- Extend variables support to options
- Don't detect time fields from Unix epoch ([#82](https://github.com/grafana/grafana-json-datasource/issues/82))
- Add params to cache key ([#85](https://github.com/grafana/grafana-json-datasource/issues/85))
- Add support for field aliases
- Add Experimental section to query editor to test features under development
- Experimental: Group query results by field ([#36](https://github.com/grafana/grafana-json-datasource/issues/36))
- Experimental: Set display name for metric fields ([#36](https://github.com/grafana/grafana-json-datasource/issues/36))
- Experimental: Set optional label for variables ([#79](https://github.com/grafana/grafana-json-datasource/issues/79))

### Bug fixes

- Ignore hidden queries ([#83](https://github.com/grafana/grafana-json-datasource/issues/83))
- New queries don't use default values

## v1.0.1 - 2021-03-05

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v1.0.0...v1.0.1)

### Enhancements

- Add annotation support

### Bug fixes

- Can't connect to API when URL contains encoded slash ([#59](https://github.com/grafana/grafana-json-datasource/issues/59))

## v1.0.0 - 2021-03-04

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.10.1...v1.0.0)

No noteworthy features or bug fixes in this release. Mostly metadata updates.

## v0.10.1 - 2021-02-27

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.10.0...v0.10.1)

### Bug fixes

- Undefined cache duration isn't handled
- Query editor tries to update read only property

## v0.10.0 - 2021-02-19

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.9.2...v0.10.0)

### Enhancements

- Add auto-completion to JSON Path queries

## v0.9.2 - 2021-02-03

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.9.1...v0.9.2)

### Bug fixes

- Variable queries fail with error ([#48](https://github.com/grafana/grafana-json-datasource/issues/48))

## v0.9.1 - 2021-02-01

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.9.0...v0.9.1)

### Bug fixes

- Cannot read property 'toString' of null ([#46](https://github.com/grafana/grafana-json-datasource/issues/46))

## v0.9.0 - 2021-02-01

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.8.0...v0.9.0)

**BREAKING CHANGE:** Query parameters set by the query editor no longer overrides the data source config, to match how headers are handled in the Grafana proxy. This establishes the convention that any configuration made by an administrator should have higher priority.

**IMPORTANT:** This release contains many new changes that touches several aspects of the plugin. **Make sure that you back up your dashboards before updating your plugin.**

This release introduces a new query editor that gives more control of the request.

- Support for both GET and POST methods
- Support for request bodies (when using POST)
- Support for headers

It introduces a new key value editor for query parameters and headers, as well as a Monaco-based editor for editing the request body with syntax highlighting.

This release deprecates the `queryString` property in the query model, in favor of the new `params`. The query string config _should_ be backwards-compatible (and forward-compatible) with previous versions, but make sure to back up your dashboard before upgrading.

## v0.8.0 - 2021-01-08

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.7.1...v0.8.0)

### Enhancements

- Use the refId as the series name
- Add type configuration for queries ([#37](https://github.com/grafana/grafana-json-datasource/issues/37))

### Bug fixes

- Grafana Explore gets stuck when adding a second query ([#31](https://github.com/grafana/grafana-json-datasource/issues/31))
- Multiple data source queries overwrite each other

## v0.7.1 - 2020-12-07

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.7.0...v0.7.1)

### Bug fixes

- Falsy values are returned as NaN ([#25](https://github.com/grafana/grafana-json-datasource/issues/25))

## v0.7.0 - 2020-12-04

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.6.4...v0.7.0)

### Enhancements

- Add support for custom paths ([#24](https://github.com/grafana/grafana-json-datasource/pull/24))
- Add epoch time macros ([#22](https://github.com/grafana/grafana-json-datasource/pull/22))
- Migrate to new form components. This bumps the minimum required Grafana version to 7.3.0

### Bug fixes

- Template variable chaining is not working ([#23](https://github.com/grafana/grafana-json-datasource/issues/23))
- Cannot read property 'length' of null ([#21](https://github.com/grafana/grafana-json-datasource/issues/21))

## v0.6.4 - 2020-11-30

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.6.3...v0.6.4)

### Bug fixes

- Fixes an issue where custom query parameters defined in the data source are flipped.

## v0.6.3 - 2020-11-27

[Full changelog](https://github.com/grafana/grafana-json-datasource/compare/v0.6.2...v0.6.3)

### Enhancements

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`
- Improved release process using the new [GitHub workflows](https://github.com/grafana/plugin-workflows) for Grafana plugins
