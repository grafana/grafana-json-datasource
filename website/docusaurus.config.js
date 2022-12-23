module.exports = {
  title: 'JSON API for Grafana',
  url: 'https://grafana.github.io',
  baseUrl: '/grafana-json-datasource/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.svg',
  organizationName: 'grafana', // Usually your GitHub org/user name.
  projectName: 'grafana-json-datasource', // Usually your repo name.
  scripts: [],
  themeConfig: {
    navbar: {
      title: 'JSON API Data Source for Grafana',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/grafana/grafana-json-datasource',
          label: 'GitHub',
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
              href: 'https://github.com/grafana/grafana-json-datasource/discussions',
            },
            {
              label: 'Support',
              href: 'https://github.com/grafana/grafana-json-datasource/discussions/categories/q-a',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grafana Labs`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/grafana/grafana-json-datasource/edit/main/website/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
