import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  reference: [
    'overview',
    {
      type: 'category',
      label: 'Data types',
      collapsed: true,
      collapsible: true,
      items: [
        'datatypes/overview',
      ],
    },
    {
      type: 'category',
      label: 'Operators',
      collapsed: true,
      collapsible: true,
      items: [
        'operators/arithmetic',
        'operators/comparison',
        'operators/logical',
      ],
    },
    {
      type: 'category',
      label: 'Functions',
      collapsed: true,
      collapsible: true,
      items: [
        'functions/aggregate',
        'functions/conditional',
        'functions/conversion',
        'functions/datetime',
        'functions/variant',
      ],
    },
  ]
};

export default sidebars;
