import React from "react";
import clsx from "clsx";
import styles from './index.module.css';
import Layout from "@theme/Layout";

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Manage Data in Petabytes</h1>
        <h1 className="hero__title">with Massive Write</h1>
        <h1 className="hero__title">with Any Scale Read</h1>
        <h1 className="hero__title">with Flexible Schema</h1>
      </div>
    </header>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database built directly on top of S3 and unleashes the power of cloud elasticity and workload isolation.">
      <HomepageHeader/>
      <main/>
    </Layout>
  );
}
