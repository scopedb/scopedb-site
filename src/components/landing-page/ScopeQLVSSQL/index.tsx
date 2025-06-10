import {useState} from 'react';
import ShikiHighlighter from "react-shiki";
import scopeql from "@/shiki-scopeql-grammar.json";
import type {LanguageRegistration} from "@shikijs/types";

const categories = [{
    title: "Basic",
    scopeql: `FROM teachers
WHERE hire_date >= '2010-01-01 00:00:00+00:00'::timestamp
ORDER BY school, salary
LIMIT 100
SELECT last_name, school, salary`,
    sql: `SELECT last_name,
                 school,
                 salary
          FROM teachers
          WHERE hire_date >= '2010-01-01 00:00:00+00:00'::TIMESTAMPTZ
          ORDER BY
              school,
              salary
              LIMIT
              100`
}, {
    title: "Consistency",
    scopeql: `SELECT *
              FROM users`,
    sql: `SELECT *
          FROM users`
}, {
    title: "Grouping",
    scopeql: `SELECT *
              FROM users`,
    sql: `SELECT *
          FROM users`
}, {
    title: "Windows",
    scopeql: `SELECT *
              FROM users`,
    sql: `SELECT *
          FROM users`
}]

export default function ScopeQLVSSQL() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-[#F9F9F9] rounded-[16px] p-[16px] flex flex-col w-full max-w-[720px] xl:max-w-[720px]">
            {/* Tab Navigation */}
            <div
                className="flex text-[14px] flex-nowrap gap-[16px] md:gap-[24px] overflow-x-auto text-[var(--color-secondary)]">
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
                {/* SQL Section */}
                <div className="flex-1 bg-[#FFFFFF] rounded-[12px] p-[16px] mb-[12px]"
                     style={{
                         boxShadow: "0px 0px 8px 8px rgba(0, 0, 0, 0.02);"
                     }}>
                    <div className="pb-[14px]">
                        <h3 className="text-[rgba(0,0,0,0.40)] text-[13px]">SQL</h3>
                    </div>
                    <div className="font-[14px] overflow-x-auto w-full">
                        <ShikiHighlighter
                            theme="min-light"
                            language="sql"
                            showLanguage={false}
                            className='text-[14px] whitespace-pre-wrap p-0'

                        >
                            {categories[activeTab].sql.trim()}
                        </ShikiHighlighter>
                    </div>
                </div>

                {/* ScopeQL Section */}
                <div className="flex-1 bg-[#FFFFFF] rounded-[16px] p-[20px]"
                     style={{
                         boxShadow: "0px 0px 8px 8px rgba(0, 0, 0, 0.02);"
                     }}>
                    <div className="pb-[14px]">
                        <h3 className="text-[rgba(0,0,0,0.40)] text-[13px]">ScopeQL</h3>
                    </div>
                    <div className="font-[14px] overflow-x-auto w-full">
                        <ShikiHighlighter
                            theme="min-light"
                            language={scopeql as LanguageRegistration}
                            showLanguage={false}
                            className='p-0 text-[14px] whitespace-pre-wrap'
            >
                            {categories[activeTab].scopeql.trim()}
                        </ShikiHighlighter>
                    </div>
                </div>

            </div>
        </div>
    );
}

