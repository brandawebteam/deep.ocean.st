import { type BlocksContent } from '@strapi/blocks-react-renderer';
import BlocksClient from '@/components/blocks-client';
import { fetchApiData } from "@/components/api-fetcher"

export interface PrivacyPolicy {
    id: number
    title: string
    content: any
}


export default async function PrivacyPolicyPage() {
  const data: PrivacyPolicy = await fetchApiData('privacy-policy');

  return (
    <div className="container mx-auto px-4 py-12 prose">
      <h1>{data?.title ?? 'Privacy Policy'}</h1>
      <BlocksClient content={data.content} />
    </div>
  );
}