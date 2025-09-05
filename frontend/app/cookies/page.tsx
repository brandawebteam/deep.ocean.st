import { type BlocksContent } from '@strapi/blocks-react-renderer';
import BlocksClient from '@/components/blocks-client';
import { fetchApiData } from '@/components/api-fetcher';

export interface CookiesPolicy {
  id: number;
  title: string;
  content: BlocksContent;
}

export default async function CookiesPolicyPage() {

  const data: CookiesPolicy = await fetchApiData('cookies-policy');

  return (
    <div className="container mx-auto px-4 py-12 prose">
      <h1>{data?.title ?? 'Cookies Policy'}</h1>
      <BlocksClient content={data.content} />
    </div>
  );
}