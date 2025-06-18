import {useState} from 'react';
import ShikiHighlighter from "react-shiki";
import scopeql from "@/shiki-scopeql-grammar.json";
import type {LanguageRegistration} from "@shikijs/types";
import dedent from "dedent";

const categories = [{
    title: "Basic",
    scopeql: dedent`
        FROM teachers
        WHERE hire_date >= '2010-01-01 00:00:00+00:00'::timestamp
        ORDER BY school, salary
        LIMIT 100
        SELECT last_name, school, salary
    `,
    sql: dedent`
        SELECT
            last_name,
            school,
            salary
        FROM
            teachers
        WHERE
            hire_date >= '2010-01-01 00:00:00+00:00'::TIMESTAMPTZ
        ORDER BY
            school,
            salary
        LIMIT
            100
  `
}, {
    title: "Consistency",
    scopeql: dedent`
        FROM employees
        -- \`where\` for filtering before aggregations
        WHERE start_date > '2021-01-01 00:00:00+00:00'::timestamp
        -- also \`where\` for filtering after aggregations
        GROUP BY country AGGREGATE max(salary) AS max_salary
        WHERE max_salary > 100000
    `,
    sql: dedent`
        SELECT
            country,
            MAX(salary) AS max_salary
        FROM
            employees
        WHERE
            start_date > '2010-01-01 00:00:00+00:00'::TIMESTAMPTZ
        GROUP BY
            country
        HAVING
            MAX (salary) > 100000
    `
}, {
    title: "Grouping",
    scopeql: dedent`
        FROM sales
        -- grouped expression will be in the final result
        GROUP BY (first_name || last_name) as full_name
          AGGREGATE SUM(payment) AS total_payment
        ORDER BY total_payment
    `,
    sql: dedent`
        SELECT
            (first_name || last_name) AS full_name,
            SUM(payment) AS total_payment
        FROM
            sales
        GROUP BY
            (first_name || last_name)
        ORDER BY
            SUM(payment)
    `,
}, {
    title: "Windows",
    scopeql: dedent`
        FROM orders
        GROUP BY category
          WITHIN GROUP ORDER BY unit_sales
          WINDOW ROW_NUMBER() AS rn
    `,
    sql: dedent`
        SELECT
            category,
            ROW_NUMBER() OVER (
                PARTITION BY category
                ORDER BY unit_sales DESC
            ) AS rn
        FROM orders
    `
}, {
    title: "Aggregate & Windows",
    scopeql: dedent`
        FROM orders
        GROUP BY category
          WITHIN GROUP ORDER BY unit_sales
          WINDOW ROW_NUMBER() AS rn
        GROUP BY category AGGREGATE MAX(rn)
    `,
    sql: dedent`
        SELECT category, max(rn)
        FROM (
            SELECT
                category,
                ROW_NUMBER() OVER (
                    PARTITION BY category
                    ORDER BY unit_sales DESC
                ) AS rn
            FROM orders
        ) as tmp
        GROUP BY category
    `
}, {
    title: "Joins",
    scopeql: dedent`
        FROM r JOIN s ON r.a = s.b
        WHERE r.c < 15
        GROUP BY r.d AGGREGATE SUM(r.e) AS sum
        WHERE sum > 3
        ORDER BY r.d WINDOW ROW_NUMBER() AS rank
        SELECT r.d AS d, sum, rank
        ORDER BY d
    `,
    sql: dedent`
        SELECT
            r.d,
            SUM(r.e) AS sum,
            ROW_NUMBER() OVER (ORDER BY r.d) as rank
        FROM r, s
        WHERE r.a = s.b
          AND r.c < 15
        GROUP BY r.d
        HAVING SUM(r.e) > 3
        ORDER BY r.d
    `
}]

function ScopeQLSection({activeTab}: { activeTab: number }) {
    return <div className="flex-1 bg-[#FFFFFF]  rounded-[12px] p-[16px] mb-[12px]"
         style={{
             boxShadow: "0px 0px 8px 8px rgba(0, 0, 0, 0.02);"
         }}>
        <div className="pb-[14px]">
            <h3 className="text-[var(--text-tertiary)] text-[13px]">ScopeQL</h3>
        </div>
        <div className="font-[14px] overflow-x-auto w-full">
            <ShikiHighlighter
                theme="min-light"
                language={scopeql as LanguageRegistration}
                showLanguage={false}
                addDefaultStyles={false}
                className='p-0 text-[14px]'
            >
                {categories[activeTab].scopeql.trim()}
            </ShikiHighlighter>
        </div>
    </div>
}

function SQLSection({activeTab}: { activeTab: number }) {
    return <div className="flex-1 bg-[#FFFFFF] rounded-[16px] p-[20px]"
         style={{
             boxShadow: "0px 0px 8px 8px rgba(0, 0, 0, 0.02);"
         }}>
        <div className="pb-[14px]">
            <h3 className="text-[var(--text-tertiary)] text-[13px]">SQL</h3>
        </div>
        <div className="font-[14px] overflow-x-auto w-full">
            <ShikiHighlighter
                theme="min-light"
                language="sql"
                showLanguage={false}
                addDefaultStyles={false}
                className='p-0 text-[14px]'
            >
                {categories[activeTab].sql.trim()}
            </ShikiHighlighter>
        </div>
    </div>
}

export default function FeaturedScopeQL() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-[#F9F9F9] rounded-[16px] p-[16px] flex flex-col w-full max-w-[720px] xl:max-w-[720px]">
            <div
                className="flex text-[var(--text-primary)] text-[14px] flex-nowrap gap-[16px] md:gap-[24px] overflow-x-auto">
                {categories.map((category, index) => (
                    <button
                        key={category.title}
                        onClick={() => setActiveTab(index)}
                        className={`whitespace-nowrap ${activeTab === index ? 'text-[var(--color-primary)] font-medium' : ''}`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            <div className="mt-[16px] flex flex-col flex-1">
                <ScopeQLSection activeTab={activeTab}/>
                <SQLSection activeTab={activeTab}/>
            </div>
        </div>
    );
}

