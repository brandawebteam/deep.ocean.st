import { fetchApiData } from "@/components/api-fetcher"

export interface CookiesPolicy {
    id: number
    title: string
    content: string
}


export default async function CookiesPolicyPage() {
    const data: CookiesPolicy = await fetchApiData("cookies-policy");
    return (
        <div className="container mx-auto px-4 py-12 prose">
            <h1>{data?.title ?? "Cookies Policy"}</h1>
            {data?.content && (
                <article
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}
        </div>
    )
}