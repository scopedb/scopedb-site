import React, {useEffect, useState} from "react";
import clsx from "clsx";
import styles from './index.module.css';
import Layout from "@theme/Layout";

let scopeTitles = [
  'Massive Write',
  'Any Scale Read',
  'Flexible Schema'
]

function HomepageBanner() {
  const [scopeTitleIndex, setScopeTitleIndex] = useState(0);
  const [scopeTitleStyle, setScopeTitleStyle] = useState(styles.fadingTextIn);

  useEffect(() => {
    // text animation
    const interval = setInterval(() => {
      setScopeTitleStyle(styles.fadingTextOut);
      setTimeout(() => {
        setScopeTitleIndex((prevIndex) => (prevIndex + 1) % scopeTitles.length);
        setScopeTitleStyle(styles.fadingTextIn);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.scopeBanner}>
      <div className={styles.scopeBannerContent}>
        <h1 className={styles.scopeBannerText}>
          <div>Manage Data in Petabytes</div>
          <div className={styles.scopeTitle}>
            with{' '}
            <span className={clsx(styles.scopeTitleWith, scopeTitleStyle)}>{scopeTitles[scopeTitleIndex]}</span>
          </div>
        </h1>
        <div className={styles.scopeBtns}>
          <a href="/contact" className={styles.scopeBtn}>Contact Us</a>
          <a href="/blog" className={styles.scopeBtn}>Blog</a>
        </div>
      </div>
      <img src="/brand-kit/homepage-programmer.png" className={styles.scopeBannerImg} alt="Programmer"/>
    </div>
  );
}

function HomepageIntro() {
  return (
    <div className={styles.scopeIntros}>
      <div className={styles.scopeIntro}>
        <div className={styles.scopeIntroTitle}>Date and time data types</div>
        <div className={styles.scopeIntroDesc}>ScopeDB supports data types for managing timestamps.</div>
      </div>
      <div className={styles.scopeIntro}>
        <div className={styles.scopeIntroTitle}>Variant data type</div>
        <div className={styles.scopeIntroDesc}>The variant data type can contain a value of any other data type.</div>
      </div>
      <div className={styles.scopeIntro}>
        <div className={styles.scopeIntroTitle}>Data type conversion</div>
        <div className={styles.scopeIntroDesc}>In many cases, a value of one data type can be converted to another data
          type. For example, an INTEGER
          value can be converted to a floating-point data type value. Converting a data type is called casting.
        </div>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      description="ScopeDB is a database built directly on top of S3 and unleashes the power of cloud elasticity and workload isolation.">
      <HomepageBanner/>
      <HomepageIntro/>
    </Layout>
  );
}
