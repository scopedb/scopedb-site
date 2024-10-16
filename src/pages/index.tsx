import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import {JSX} from 'react';
import Link from '@docusaurus/Link';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">
          The Most Flexible Database for Developing Applications
        </h1>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database for observability data at any scale.">
      <HomepageHeader/>
      <main/>
    </Layout>
  );
}
