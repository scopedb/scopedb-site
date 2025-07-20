import type { MDXComponents } from 'mdx/types'
import { Tab, Tabs } from './components/Tabs';
import Callout from './components/Callout'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        Callout,
        Tabs,
        Tab,
        ...components,
    }
}
