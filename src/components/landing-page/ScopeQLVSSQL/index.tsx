import { useState } from 'react';
import ShikiHighlighter from "react-shiki";

const categories = [{
    title: "Basic",
    scopeql: `FROM teachers
WHERE hire_date >= '2010-01-01 00:00:00+00:00'::timestamp
ORDER BY school, salary
LIMIT 100
SELECT last_name, school, salary`,
    sql: `SELECT
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
  100`
}, {
    title: "Consistency",
    scopeql: `SELECT * FROM users`,
    sql: `SELECT * FROM users`
}, {
    title: "Grouping",
    scopeql: `SELECT * FROM users`,
    sql: `SELECT * FROM users`
}, {
    title: "Windows",
    scopeql: `SELECT * FROM users`,
    sql: `SELECT * FROM users`
}, {
    title: "Aggregate on Windows",
    scopeql: `SELECT * FROM users`,
    sql: `SELECT * FROM users`
}, {
    title: "Joins",
    scopeql: `SELECT * FROM users`,
    sql: `SELECT * FROM users`
}]

export default function ScopeQLVSSQL() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-[#F9F9F9] rounded-[24px] py-[20px] px-[16px] flex flex-col h-[800px]">
            {/* Tab Navigation */}
            <div className="flex flex-nowrap gap-[24px] overflow-x-auto px-[8px] text-[var(--color-secondary)]">
                {categories.map((category, index) => (
                    <button
                        key={category.title}
                        onClick={() => setActiveTab(index)}
                        className={`whitespace-nowrap ${activeTab === index ? 'text-[var(--color-primary)] font-semibold' : ''}`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            <div className="mt-[16px] flex flex-col flex-1">
                {/* SQL Section */}
                <div className="flex-1 bg-[#FFFFFF] rounded-[16px] p-[20px] mb-[12px]"
                    style={{
                        boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.05);"
                    }}>
                    <div className="pb-[14px]">
                        <h3 className="text-[var(--color-secondary)] text-[12px]">SQL</h3>
                    </div>
                    <div className="font-[15px] overflow-x-auto max-w-[766px]">
                        <ShikiHighlighter
                            theme="min-light"
                            language="sql"
                            showLanguage={false}
                        >
                            {categories[activeTab].sql.trim()}
                        </ShikiHighlighter>
                    </div>
                </div>

                {/* ScopeQL Section */}
                <div className="flex-1 bg-[#FFFFFF] rounded-[16px] p-[20px]"
                    style={{
                        boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.05);"
                    }}>
                    <div className="pb-[14px]">
                        <h3 className="text-[var(--text-secondary)] text-[12px]">ScopeQL</h3>
                    </div>
                    <div className="font-[15px] overflow-x-auto">
                        <ShikiHighlighter
                            theme="min-light"
                            language="sql"
                            showLanguage={false}
                        >
                            {categories[activeTab].scopeql.trim()}
                        </ShikiHighlighter>
                    </div>
                </div>

            </div>
        </div>
    );
}
