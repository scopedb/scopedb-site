import clsx from 'clsx';
import Layout from '@theme/Layout';

import styles from './index.module.css';
import {JSX} from 'react';
import Link from '@docusaurus/Link';

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">ScopeDB</h1>
        <h2 className="hero__subtitle">Observability Data @ Scale</h2>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database for observability data at any scale.">
      <HomepageHeader/>
      <main>
        <div
          className={clsx('hero hero--primary', styles.heroBanner)}
        >
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <span className="block text-5xl font-semibold">10x</span>
                <span className="block text-sm">Performance</span>
              </div>
              <div className="col col--4">
                <span className="block text-5xl font-semibold">0.1x</span>
                <span className="block text-sm">Cost</span>
              </div>
              <div className="col col--4">
                <span className="block text-5xl font-semibold">100x</span>
                <span className="block text-sm">Elasticity</span>
              </div>
            </div>
          </div>
        </div>

        <br/>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/contact"
          >
            Request a Demo
          </Link>
        </div>
      </main>
    </Layout>
  );
}
