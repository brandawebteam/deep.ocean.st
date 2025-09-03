import { fetchApiData } from "@/components/api-fetcher"

export interface PrivacyPolicy {
    id: number
    title: string
    content: string
}


export default async function PrivacyPolicyPage() {
    const data: PrivacyPolicy = await fetchApiData("privacy-policy");
    return (
        <div className="container mx-auto px-4 py-12 prose">
            <h1>{data?.title ?? "Privacy Policy"}</h1>
            {data?.content && (
                <article
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}
        </div>
    )
}