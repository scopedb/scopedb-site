import React from "react";
import styles from './index.module.css';
import Layout from "@theme/Layout";
import clsx from "clsx";

function HomepageBanner(): React.JSX.Element {
  return (
    <div className={styles.scopeBanner}>
      <div className={styles.scopeBannerContent}>
        <div className={styles.scopeBannerFeature}>10x Performance, 0.1x Cost,100x More Elastic</div>
        <h1 className={styles.scopeBannerTitle}>
          <span className={styles.scopeBannerBrand}>The Future </span>of Cloud Data
        </h1>
        <div className={styles.scopeBannerIntro}>
          ScopoDB is a cloud-native database engineered to handle semi-structured data like logs and web data, with the
          capability to manage diverse workloads under massive data volumes.
        </div>
        <div className={styles.scopeBtns}>
          <a href="/reference/overview" className={clsx(styles.scopeBtn, styles.scopeBtnPrimary)}>Book a Demo</a>
          <a href="/reference/overview" className={styles.scopeBtn}>Document</a>
        </div>
        <div className={styles.scopePartner}>
          <div className={styles.scopePartnerText}>Providing more flexible cloud data services for startups</div>
        </div>
      </div>
      <div className={styles.scopeBannerImgView}>
        <img src="/homepage/homepage-hero.png" className={styles.scopeBannerImg} alt="hero"/>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database built directly on top of S3 and unleashes the power of cloud elasticity and workload isolation.">
      <HomepageBanner/>
    </Layout>
  );
}
