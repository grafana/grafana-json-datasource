# Changelog

## 0.7.1 (2020-12-07)

[Full changelog](https://github.com/marcusolsson/grafana-json-datasource/compare/v0.7.0...v0.7.1)

### Bug fixes

- Falsy values are returned as NaN ([#25](https://github.com/marcusolsson/grafana-json-datasource/issues/25))

## 0.7.0 (2020-12-04)

[Full changelog](https://github.com/marcusolsson/grafana-json-datasource/compare/v0.6.4...v0.7.0)

### Enhancements

- Add support for custom paths ([#24](https://github.com/marcusolsson/grafana-json-datasource/pull/24))
- Add epoch time macros ([#22](https://github.com/marcusolsson/grafana-json-datasource/pull/22))
- Migrate to new form components. This bumps the minimum required Grafana version to 7.3.0

### Bug fixes

- Template variable chaining is not working ([#23](https://github.com/marcusolsson/grafana-json-datasource/issues/23))
- Cannot read property 'length' of null ([#21](https://github.com/marcusolsson/grafana-json-datasource/issues/21))

## 0.6.4 (2020-11-30)

[Full changelog](https://github.com/marcusolsson/grafana-json-datasource/compare/v0.6.3...v0.6.4)

### Bug fixes

- Fixes an issue where custom query parameters defined in the data source are flipped.

## 0.6.3 (2020-11-27)

[Full changelog](https://github.com/marcusolsson/grafana-json-datasource/compare/v0.6.2...v0.6.3)

### Enhancements

- Updated `@grafana` dependencies from `^7.0.0` to `^7.3.0`
- Improved release process using the new [GitHub workflows](https://github.com/grafana/plugin-workflows) for Grafana plugins
