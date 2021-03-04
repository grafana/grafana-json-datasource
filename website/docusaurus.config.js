module.exports = {
  title: 'JSON API for Grafana',
  url: 'https://marcusolsson.github.io',
  baseUrl: '/grafana-json-datasource/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'marcusolsson', // Usually your GitHub org/user name.
  projectName: 'grafana-json-datasource', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'JSON API Data Source for Grafana',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/marcusolsson/grafana-json-datasource',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://grafana.com/plugins/marcusolsson-json-datasource',
          label: 'Marketplace',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Installation',
              to: '/',
            },
            {
              label: 'Configuration',
              to: 'configuration/',
            },
            {
              label: 'Query editor',
              to: 'query-editor/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/marcusolsson/grafana-json-datasource/discussions',
            },
            {
              label: 'Support',
              href: 'https://github.com/marcusolsson/grafana-json-datasource/discussions/categories/q-a',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/marcusolsson',
            },
          ],
        },
        {
          title: 'Data sources',
          items: [
            { label: 'CSV', href: 'https://github.com/marcusolsson/grafana-csv-datasource' },
            { label: 'JSON API', href: 'https://github.com/marcusolsson/grafana-json-datasource' },
            { label: 'Static', href: 'https://github.com/marcusolsson/grafana-static-datasource' },
          ],
        },
        {
          title: 'Panels',
          items: [
            { label: 'Calendar', href: 'https://github.com/marcusolsson/grafana-calendar-panel' },
            { label: 'Dynamic text', href: 'https://github.com/marcusolsson/grafana-dynamictext-panel' },
            { label: 'Gantt', href: 'https://github.com/marcusolsson/grafana-gantt-panel' },
            { label: 'Hexmap', href: 'https://github.com/marcusolsson/grafana-hexmap-panel' },
            { label: 'Hourly heatmap', href: 'https://github.com/marcusolsson/grafana-hourly-heatmap-panel' },
            { label: 'Treemap', href: 'https://github.com/marcusolsson/grafana-treemap-panel' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Marcus Olsson`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/marcusolsson/grafana-json-datasource/edit/main/website/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
