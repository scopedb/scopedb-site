import React from "react";
import clsx from "clsx";
import styles from './index.module.css';
import Layout from "@theme/Layout";

function HomepageHeader() {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={clsx(styles.heroContainer)}>
        <img className={clsx(styles.heroBannerImg)} src="/brand-kit/homepage-programmer.webp"
             alt="Programmer"/>
        <div className={clsx(styles.heroTitleBanner)}>
          <h1 className="hero__title">
            <div>Manage Data in Petabytes</div>
            <div className={clsx(styles.heroTitleRounds)}>
              with{' '}
              <span className={clsx(styles.heroTitleRound)}>Massive Write</span>
              <span className={clsx(styles.heroTitleRound)}>Any Scale Read</span>
              <span className={clsx(styles.heroTitleRound)}>Flexible Schema</span>
            </div>
          </h1>
          <div className={clsx(styles.heroBtns)}>
            <a href="/contact" className={clsx(styles.heroBtn)}>Contact Us</a>
            <a href="/blog" className={clsx(styles.heroBtn)}>Blog</a>
          </div>
        </div>
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
