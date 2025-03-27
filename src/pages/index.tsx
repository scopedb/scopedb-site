import React from "react";
import styles from './index.module.css';
import Layout from "@theme/Layout";
import clsx from "clsx";

function HomepageBanner(): React.JSX.Element {
  return (
    <div className={styles.scopeBanner}>
      <div className={styles.scopeBannerContent}>
        <div className={styles.scopeBannerFeature}>10x Performance, 0.1x Cost, 100x More Elastic</div>
        <h1 className={styles.scopeBannerTitle}>
          <span className={styles.scopeBannerBrand}>The Future</span> of Cloud Data Management
        </h1>
        <div className={styles.scopeBannerIntro}>
          ScopeDB is a database that runs directly on top of any commodity object storage,
          unleashing the power of cloud elasticity and workload isolation.
          It is designed explicitly for data workloads with massive writes, any-scale reads,
          and flexible schema.
        </div>
        <div className={styles.scopeBtns}>
          <a href="/contact" className={clsx(styles.scopeBtn, styles.scopeBtnPrimary)}>Book a Demo</a>
          <a href="/blog/manage-observability-data-in-petabytes" className={styles.scopeBtn}>Read More</a>
        </div>
      </div>
      <div className={styles.scopeBannerImgView}>
        <img src="/homepage/homepage-hero.png" className={styles.scopeBannerImg} alt="hero" />
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database built directly on top of S3 and unleashes the power of cloud elasticity and workload isolation.">
      <HomepageBanner />
    </Layout>
  );
}
