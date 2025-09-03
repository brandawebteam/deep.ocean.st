import { fetchApiData } from "@/components/api-fetcher"

export interface Terms {
    id: number
    title: string
    content: string
}


export default async function TermsPage() {
    const data: Terms = await fetchApiData("term-and-condition");
    return (
        <div className="container mx-auto px-4 py-12 prose">
            <h1>{data?.title ?? "Terms and conditions"}</h1>
            {data?.content && (
                <article
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            )}
        </div>
    )
}