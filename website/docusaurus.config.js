module.exports = {
  title: 'JSON API for Grafana',
  url: 'https://marcusolsson.github.io',
  baseUrl: '/grafana-json-datasource/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
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
      style: 'dark',
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
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/marcusolsson/grafana-json-datasource',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/marcusolsson',
            },
            {
              label: 'Support',
              href: 'https://github.com/marcusolsson/grafana-json-datasource/discussions/categories/q-a',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/marcusolsson/grafana-json-datasource',
            },
            {
              label: 'Marketplace',
              href: 'https://grafana.com/plugins/marcusolsson-json-datasource',
            },
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
          editUrl: 'https://github.com/marcusolsson/grafana-json-datasource/edit/main/docs/',
          routeBasePath: '/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
