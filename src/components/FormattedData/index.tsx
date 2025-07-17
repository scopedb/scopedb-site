export default function FormattedDate({ date }: { date: Date }) {
    return <time dateTime={date.toISOString()}>
        {
            date.toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        }
    </time>
}
