import { getCloudflareContext } from "@opennextjs/cloudflare"
import { Metadata } from "next"
import Image from 'next/image'
import imgHeroBanner from '@/assets/hero-banner.svg'
import imgBgMosaic from '@/assets/bg-mosaic.png'
import imgBgFlexibleDataSchema from '@/assets/bg-flexible-data-schema.png'
import imgBgFollowTagline from '@/assets/bg-follow-tagline.png'
import imgFeatureAdaptiveIndexes from '@/assets/feature-adaptive-indexes.png'
import imgFeatureAnyScaleAnalysis from '@/assets/feature-any-scale-analysis.png'
import imgFeatureFlexibleDataSchema from '@/assets/feature-flexible-data-schema.png'
import imgFeatureOnDemandResourceGroups from '@/assets/feature-on-demand-resource-groups.png'
import imgFeatureOptimalStorageFormat from '@/assets/feature-optimal-storage-format.png'
import imgFeatureRealtimeIngestion from '@/assets/feature-realtime-ingestion.png'
import imgFeatureVariousExplorationMethods from '@/assets/feature-various-exploration-methods.png'
import imgScenarioCloudApplicationObservability from '@/assets/scenario-cloud-application-observability.png'
import imgScenarioRealTimeBehaviorAnalysisLeft from '@/assets/scenario-real-time-behavior-analysis-left.png'
import imgScenarioRealTimeBehaviorAnalysisRight from '@/assets/scenario-real-time-behavior-analysis-right.png'
import imgScenarioUnderstandYourAIAgentWorkflow from '@/assets/scenario-understand-your-ai-agent-workflow.png'
import FeaturedScopeQL from "@/components/FeaturedScopeQL"
import FAQItem from "@/components/FAQItem"
import ExploreMore from "@/components/ExploreMore"
import { MdCheckCircle } from "react-icons/md"
import { makeMetadata } from "@/utils/metadata"

export async function generateMetadata(): Promise<Metadata> {
  const title = "ScopeDB"
  const description = "ScopeDB is a database that runs directly on top of any commodity object storage. It is designed explicitly for data workloads with massive writes, any-scale analysis, and flexible schema."
  return makeMetadata(title, description)
}

function FeatureRow({ children }: {
  children?: React.ReactNode;
}) {
  return <div className="flex min-h-[32px] border-b border-solid border-[#F0F0F0]">
    <div className="w-[10px] md:w-[45px]"></div>
    <div className="flex-1 border-x border-solid border-[#F0F0F0]">
      {children}
    </div>
    <div className="w-[10px] md:w-[45px]"></div>
  </div>
}

export default async function Home() {
  const ctx = await getCloudflareContext({ async: true })
  const calLink = ctx.env.PUBLIC_CALCOM_LINK
  const introductoryLink = "/blog/manage-observability-data-in-petabytes"

  return <div className="max-w-[1440px] mx-auto px-[12px] md:px-[24px] xl-[32px] pb-[100px] relative">
    <section className="max-w-[536px] xl:max-w-[620px] 2xl:max-w-[736px] pt-[100px] pb-[16px] md:pt-[260px] md:pb-[520px] xl:pr-0">
      <Image
        priority
        src={imgHeroBanner}
        alt="ScopeDB Banner"
        className="absolute top-[-80px] right-[-87px] hidden lg:block xl:block max-w-[836px] z-0"
      />
      <h2 className="text-[40px] md:text-[56px] text-[var(--text-brand)] leading-[1.2] font-semibold z-10 relative">
        Insight In No Time
      </h2>
      <blockquote className="text-[40px] text-[var(--text-primary)] md:text-[56px] leading-[1.2] font-semibold z-10 relative">
        Schema On The Fly
      </blockquote>
      <p className="text-[var(--text-secondary)] font-normal text-[16px] md:text-[20px] leading-[1.4] mt-[30px]">
        ScopeDB is a database that runs directly on top of any commodity object
        storage. It is designed explicitly for data workloads with massive writes,
        any-scale analysis, and flexible schema.
      </p>

      <div className="mt-[40px] flex gap-[9px]">
        <button
          data-cal-link={calLink}
          className="text-[14px] bg-[var(--button-primary-bg)] border-[var(--button-primary-border)] hover:bg-[var(--button-primary-bg-hover)] text-[var(--button-primary-text)] px-[14px] py-[8px] rounded-[12px] border transition-colors duration-300 ease-in-out"
        >
          Book a Demo
        </button>
        <a href={introductoryLink}>
          <button className="text-[14px] px-[14px] py-[8px] bg-[var(--button-secondary-bg)] rounded-[12px] border border-[var(--button-secondary-border)] hover:bg-[var(--button-secondary-bg-hover)] text-[var(--button-secondary-text)] transition-colors duration-300 ease-in-out">
            Read More
          </button>
        </a>
      </div>
    </section>

    <section className="relative mt-[140px] px-0 md:px-4">
      <div className="flex items-center justify-center absolute top-[-78px] left-0 w-full">
        <Image
          priority
          src={imgBgMosaic}
          alt="Background Mosaic"
          width={456}
          height={76}
        />
      </div>
      <div className="max-w-[1200px] p-[12px] mx-auto flex flex-col items-center pt-[80px] pb-[40px] md:pb-[160px] bg-[#F7F7F7] rounded-[16px]">
        <h2
          className="text-[18px] font-normal text-[var(--text-primary)] text-center]"
        >
          WHY SCOPEDB
        </h2>
        <blockquote
          className="text-[var(--text-primary)] max-w-[640px] mt-[40px] text-[32px] md:text-[40px] font-medium leading-[normal] text-center"
        >
          "The data flow of insights should be equal to transactions."
        </blockquote>
        <div className="max-w-[600px] mt-[70px] px-[6px] md:px-0">
          <p className="text-[16px] font-normal leading-[1.6] text-[var(--text-secondary)]">
            Compared with the existing cloud data stack, which has a complex
            pipeline consisting of data movement, stream processing, and a data
            warehouse, ScopeDB supports real-time ingestion directly from user
            applications, eliminating any intermediate steps. Users can query the
            data immediately after ingestion, without the need for hours or even
            T+1 latency.
          </p>

          <p className="text-[16px] font-normal leading-[1.6] text-[var(--text-secondary)] mt-[50px]">
            ScopeDB employs a stateless design. It enables effortless scaling
            without manual data reconciliation or replication, fully leverages
            cloud elasticity. For example, a cluster can dynamically scale out for
            peak workload in no time, where performance gets unlimitedly improved
            as you add more resources, and scale in when the peak has passed,
            delivering thoroughly elasticity tailored to your needs.
          </p>

          <p className="text-[16px] leading-[1.6] text-[var(--text-tertiary)] mt-[80px]">
            Read <a className="underline text-[var(--text-primary)]" href={introductoryLink}>
              our introductory blog
            </a> for more details.
          </p>
        </div>
      </div>
      <Image
        priority
        src={imgBgFollowTagline}
        alt="Background Follows Tagline"
        className="absolute bottom-[-212px] left-[300px] transform -translate-x-1/2 z-0"
        width={139}
        height={213}
      />
    </section>

    <section className="mt-[210px]">
      <div className="flex items-end gap-[16px] pl-[16px] md:pl-[55px] mb-[40px]">
        <h2 className="text-[32px] md:text-[40px] font-medium text-[var(--text-primary)]">
          Key Features
        </h2>
        <div className="flex gap-[2px] items-end mb-[14px]">
          <div className="w-[16px] h-[6px] bg-[#4D4A4A] rounded-[2px] animate-pulse" />
          <div className="w-[16px] h-[6px] bg-[#8C8C8C] rounded-[2px] animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>

      <div className="flex flex-col">
        <FeatureRow />
        <FeatureRow>
          <div className="flex flex-col lg:flex-row">
            <div className="px-[24px] md:p-[50px] lg:w-1/2 flex flex-col justify-center min-h-[300px] md:min-h-[500px]">
              <h3 className="text-[24px] md:text-[28px] text-[var(--text-primary)] font-medium">
                Real-time Ingestion
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                ScopeDB handles massive ingestion requests with arbitrary nodes
                independently, without sharding or partition leaders. The cluster
                of nodes can dynamically scale to manage peak traffic efficiently.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center py-[24px] lg:w-1/2">
              <Image
                priority
                src={imgFeatureRealtimeIngestion}
                alt="Feature Real-time Ingestion"
                height={620}
                width={680}
              />
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="flex flex-col lg:flex-row">
            <div className="p-[24px] md:p-[50px] lg:w-1/2 min-h-[280px] flex flex-col justify-center">
              <h3 className="text-[24px] md:text-[32px] text-[var(--text-primary)] font-medium">
                Any-scale Analysis & Exploration
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                ScopeDB fully leverages cloud resources to ensure that businesses
                can obtain optimal performance support without increasing
                additional hardware investment, achieving more efficient business
                operations.
              </p>
            </div>
            <div className="flex-1 min-h-[230px] flex bg-[#FCFCFC] items-center justify-center lg:border-l border-[#F0F0F0] md:pr-0 pb-[10px] md:pt-[28px] md:pb-[70px] lg:w-1/2">
              <Image
                priority
                src={imgFeatureAnyScaleAnalysis}
                alt="Feature Any-scale Analysis"
                width={680}
                height={200}
                className="mb-[2px] md:mb-[64px] absolute right-[40px] md:right-[100px]"
              />
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="flex flex-col lg:flex-row">
            <div className="p-[24px] md:p-[50px] pb-[50px] lg:w-1/2 min-h-[300px] md:min-h-[580px] relative">
              <h3 className="text-[20px] md:text-[24px] text-[var(--text-primary)] font-normal">
                Optimal Storage Format
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                Unleash the benefits of the compact columnar data format, and
                dedicated compression algorithms depending on data types.
              </p>
              <div className="mt-[-100px]">
                <Image
                  priority
                  className="mx-auto"
                  src={imgFeatureOptimalStorageFormat}
                  alt="Feature Optimal Storage Format"
                  width={420}
                  height={202}
                />
              </div>
            </div>
            <div
              className="flex-1 lg:border-l border-[#f0f0f0] p-[24px] md:p-[50px] lg:w-1/2 min-h-[300px] md:min-h-[580px]"
            >
              <h3 className="text-[20px] md:text-[24px] text-[var(--text-primary)] font-normal">
                Various Exploration Methods
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                Get insights from the data via searching, aggregations, time-series analytics, etc.
              </p>
              <div className="pt-[100px]">
                <Image
                  priority
                  className="mx-auto"
                  src={imgFeatureVariousExplorationMethods}
                  alt="Feature Various Exploration Methods"
                  width={500}
                  height={367}
                />
              </div>
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="flex flex-col lg:flex-row">
            <div className="p-[24px] md:p-[50px] lg:w-1/2 flex flex-col min-h-[300px] md:min-h-[580px]">
              <h3 className="text-[20px] md:text-[24px] text-[var(--text-primary)] font-normal">
                Adaptive Indexes
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                Accelerate queries with equality indexes, range indexes, search
                indexes, object indexes, materialized indexes, and more.
              </p>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  priority
                  src={imgFeatureAdaptiveIndexes}
                  alt="Feature Adaptive Indexes"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="flex-1 lg:border-l border-[#f0f0f0] p-[24px] md:p-[50px] lg:w-1/2 min-h-[300px] md:min-h-[580px]">
              <h3 className="text-[20px] md:text-[24px] text-[var(--text-primary)] font-normal">
                On-demand Resource Groups
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] mt-[12px]">
                Each group has its dedicated compute resources. All groups share the same
                object storage as the primary data backend.
              </p>
              <div className="py-[20px] flex items-center justify-center">
                <Image
                  priority
                  src={imgFeatureOnDemandResourceGroups}
                  alt=""
                  width={388}
                  height={213}
                />
              </div>
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="flex flex-col lg:flex-row">
            <div className="pl-[24px] md:pl-[50px] pr-[30px] lg:w-1/2 flex flex-col justify-center min-h-[300px] md:min-h-[580px]">
              <h3 className="text-[24px] md:text-[32px] font-medium text-[var(--text-primary)]">
                Flexible Data Schema
              </h3>
              <p className="text-[16px] font-normal text-[var(--text-secondary)] max-w-[504px] mt-[12px]">
                ScopeDB supports flexible data schema, enabling users to partially
                qualify schemas while storing additional data in an ANY column,
                allowing for efficient handling and analysis of semi-structured
                data.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center pt-[50px] pb-[50px] lg:w-1/2 relative">
              <Image
                priority
                src={imgFeatureFlexibleDataSchema}
                alt="Feature Flexible Data Schema"
                width={427}
                height={502}
              />
              <Image
                priority
                src={imgBgFlexibleDataSchema}
                alt="Background Flexible Data Schema"
                className="absolute bottom-[-162px] right-[200px] z-0"
                width={100}
                height={200}
              />
            </div>
          </div>
        </FeatureRow>

        <div className="min-h-[32px] flex">
          <div className="w-[10px] md:w-[45px]" />
          <div className="flex-1 border-x border-solid border-[#F0F0F0]" />
          <div className="w-[10px] md:w-[45px]" />
        </div>

        <blockquote className="text-[32px] md:text-[40px] text-[var(--text-primary)] font-medium max-w-[800px] text-center mx-auto mt-[120px] mb-[40px] md:mt-[140px] md:mb-[140px]">
          Maximize the effectiveness of ScopeDB in various scenarios
        </blockquote>
        <FeatureRow />
        <FeatureRow>
          <div className="p-[24px] md:p-[36px]">
            <h3 className="text-[24px] md:text-[32px] text-[var(--text-primary)] font-medium">
              Cloud Application Observability
            </h3>
            <p className="text-[16px] font-normal text-[var(--text-secondary)] xl:max-w-[600px] mt-[12px]">
              Analyze application logs for complete visibility and accelerated troubleshooting.
              Unify scattered logs for processing and analysis to gain greater insights.
            </p>
            <div className="flex items-center justify-center my-[60px]">
              <Image
                priority
                src={imgScenarioCloudApplicationObservability}
                alt="Cloud Application Observability"
              />
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="p-[24px] md:p-[36px]">
            <h3 className="text-[24px] md:text-[32px] text-[var(--text-primary)] font-medium">
              Real-time Behavior Analysis
            </h3>
            <p className="text-[16px] font-normal text-[var(--text-secondary)] xl:max-w-[700px] mt-[12px]">
              Process millions of daily user interactions to power personalized
              recommendations and dynamic pricing for e-commerce platforms, or
              detect market manipulation and fraud patterns for social media.
            </p>
            <div className="flex flex-col md:flex-row my-[60px] gap-[30px] justify-center">
              <div className="flex items-center justify-center my-[60px]">
                <Image
                  priority
                  src={imgScenarioRealTimeBehaviorAnalysisLeft}
                  alt="Real-time Behavior Analysis Left"
                  width={628}
                  height={307}
                />
              </div>
              <div className="flex items-center justify-center">
                <Image
                  priority
                  src={imgScenarioRealTimeBehaviorAnalysisRight}
                  alt="Real-time Behavior Analysis Right"
                  width={593}
                  height={634}
                />
              </div>
            </div>
          </div>
        </FeatureRow>
        <FeatureRow>
          <div className="p-[24px] md:p-[36px]">
            <h3 className="text-[24px] md:text-[32px] text-[var(--text-primary)] font-medium">
              Understand Your AI Agent Workflow
            </h3>
            <p className="text-[16px] font-normal text-[var(--text-secondary)] xl:max-w-[700px] mt-[12px]">
              Capture the entire chat session with end-to-end visibility. See what
              your agent is doing step by step, and then improve latency and
              response quality with real-time insights.
            </p>
            <div className="flex items-center justify-center my-[60px]">
              <Image
                priority
                src={imgScenarioUnderstandYourAIAgentWorkflow}
                alt="Understand Your AI Agent Workflow"
              />
            </div>
          </div>
        </FeatureRow>

        <div className="min-h-[32px] flex">
          <div className="w-[10px] md:w-[45px]" />
          <div className="flex-1 border-x border-solid border-[#F0F0F0]" />
          <div className="w-[10px] md:w-[45px]" />
        </div>
      </div>
    </section>

    <section className="mt-[80px] md:mt-[140px] wx-[10px] md:wx-[45px]">
      <h2 className="text-[32px] md:text-[40px] font-medium text-[var(--text-primary)] mx-auto text-center">
        ScopeQL Showcases
      </h2>
      <div className="flex flex-col md:flex-row mt-[40px] md:mt-[114px] justify-between items-start md:gap-[40px]">
        <div className="w-full md:w-1/2 p-[10px] md:p-8">
          <p className="text-[20px] max-w-[500px] md:text-[24px] font-medium text-[var(--text-primary)] leading-[1.4]">
            ScopeQL Is Not SQL 2.0
          </p>
          <p className="text-[16px] font-normal text-[var(--text-secondary)] pt-[12px] max-w-[400px]">
            We reinvent the query language from relational algebra foundations
            with three radical simplifications:
          </p>
          <br />
          <ul>
            <li>
              <div className="flex items-center gap-[8px] pb-[8px pt-[12px]">
                <MdCheckCircle width={20} height={20} />
                <h4 className="text-[16px] text-[var(--text-primary)] font-medium">
                  Execution Flow
                </h4>
              </div>
              <p className="text-[16px] text-[var(--text-secondary)] pb-[28px] max-w-[400px] pt-[6px]">
                SQL's inside-out execution becomes ScopeQL's linear top-down
                pipeline.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-[8px] pb-[8px] max-w-[500px]">
                <MdCheckCircle width={20} height={20} />
                <h4 className="text-[16px] text-[var(--text-primary)] font-medium">
                  Syntax Integrity
                </h4>
              </div>
              <p className="text-[16px] text-[var(--text-secondary)] pb-[28px] max-w-[400px] pt-[6px]">
                SQL's fragmented keywords become ScopeQL's orthogonal composability.
              </p>
            </li>
            <li>
              <div className="flex items-center gap-[8px] pb-[8px]">
                <MdCheckCircle width={20} height={20} />
                <h4 className="text-[16px] text-[var(--text-primary)] font-medium">
                  Compressible Expressions
                </h4>
              </div>
              <p className="text-[16px] text-[var(--text-secondary)] pb-[28px] max-w-[400px] pt-[6px]">
                SQL's subquery labyrinths become ScopeQL's native expressions
                reuse.
              </p>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 md:p-[24px] flex items-start justify-center">
          <FeaturedScopeQL />
        </div>
      </div>
    </section>

    <section className="mt-[80px] md:mt-[140px]">
      <h2 className="text-[32px] md:text-[40px] text-[var(--text-primary)] font-medium mx-auto text-center">
        Frequently asked questions
      </h2>

      <ul className="flex flex-col gap-4 items-center justify-center mt-[80px]">
        <FAQItem
          question="In which cloud platforms does ScopeDB work?"
          answer="ScopeDB works on all major cloud platforms, including AWS, Azure, GCP, and more."
        />
      </ul>
    </section>

    <section className="mt-[80px] md:mt-[140px]">
      <h2 className="mt-[100px] md:mt-[200px] text-[24px] md:text-[32px] font-medium text-[var(--text-primary)]">
        Explore More About <br /><span className="text-[32px] md:text-[40px]">ScopeDB</span>
      </h2>
      <ExploreMore showBlog={true} />
    </section>
  </div >
}
