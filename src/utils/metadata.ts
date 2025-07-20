import { Metadata } from "next"

export function makeMetadata(title: string, description: string, image?: string): Metadata {
    const images = image ? [image] : ["/ogbanner.png"]
    return {
        title,
        description,
        metadataBase: new URL("https://www.scopedb.io"),
        openGraph: {
            title,
            description,
            images,
        },
        twitter: {
            title,
            description,
            images,
            card: "summary_large_image",
        },
    }
}
