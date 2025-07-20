export default function FormattedDate({ date }: { date: number | string | Date }) {
    const parsedData = new Date(date)
    return <time dateTime={parsedData.toISOString()}>
        {
            parsedData.toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        }
    </time>
}
