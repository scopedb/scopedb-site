import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  reference: [
    'overview',
    {
      type: 'category',
      label: 'Data types',
      collapsed: true,
      collapsible: true,
      link: { type: 'doc', id: 'datatypes-overview' },
      items: [
        'datatypes-datetime',
        'datatypes-variant',
        'datatypes-conversion',
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
      link: { type: 'doc', id: 'functions-overview' },
      items: [
        'functions-aggregate',
        'functions-conditional',
        'functions-conversion',
        'functions-datetime',
        'functions-numeric',
        'functions-string',
        'functions-variant',
      ],
    },
  ]
};

export default sidebars;
