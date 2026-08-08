import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'intro',
          label: 'Introduction',
          customProps: {icon: 'BookOpen'},
        },
        {
          type: 'doc',
          id: 'getting-started/quickstart',
          label: 'Quickstart',
          customProps: {icon: 'PlayCircle'},
        },
        {
          type: 'doc',
          id: 'getting-started/authentication',
          label: 'Authentication',
          customProps: {icon: 'Key'},
        },
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'concepts/collections',
          label: 'Collections',
          customProps: {icon: 'Layers'},
        },
        {
          type: 'doc',
          id: 'concepts/fetchers',
          label: 'Fetchers',
          customProps: {icon: 'Settings2'},
        },
        {
          type: 'doc',
          id: 'concepts/webhooks',
          label: 'Webhooks',
          customProps: {icon: 'Webhook'},
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'api/rest',
          label: 'REST API',
          customProps: {icon: 'Code2'},
        },
        {
          type: 'doc',
          id: 'api/sdks',
          label: 'SDKs & Libraries',
          customProps: {icon: 'FileCode2'},
        },
      ],
    },
    {
      type: 'category',
      label: 'Support',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'doc',
          id: 'support/faq',
          label: 'FAQ',
          customProps: {icon: 'HelpCircle'},
        },
      ],
    },
  ],
};

export default sidebars;
