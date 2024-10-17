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
        'datatypes-overview',
        'datatypes-datetime',
        'datatypes-variant',
      ],
    },
    {
      type: 'category',
      label: 'Statements',
      collapsed: true,
      collapsible: true,
      items: [
        'stmt-query',
        'stmt-ddl',
        'stmt-dml',
      ],
    },
    {
      type: 'category',
      label: 'Operators',
      collapsed: true,
      collapsible: true,
      items: [
        'operators-arithmetic',
        'operators-comparison',
        'operators-logical',
        'operators-set',
      ],
    },
    {
      type: 'category',
      label: 'Functions',
      collapsed: true,
      collapsible: true,
      items: [
        'functions-aggregate',
        'functions-conditional',
        'functions-conversion',
        'functions-datetime',
        'functions-variant',
      ],
    },
  ]
};

export default sidebars;
