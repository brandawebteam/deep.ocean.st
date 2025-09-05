import { type BlocksContent } from '@strapi/blocks-react-renderer';
import BlocksClient from '@/components/blocks-client';
import { fetchApiData } from "@/components/api-fetcher"

export interface Terms {
    id: number
    title: string
    content: any
}


export default async function TermsPage() {
    const data: Terms = await fetchApiData("term-and-condition");
    return (
        <div className="container mx-auto px-4 py-12 prose">
            <h1>{data?.title ?? 'Terms and Conditions'}</h1>
            <BlocksClient content={data.content} />
        </div>
    );
}