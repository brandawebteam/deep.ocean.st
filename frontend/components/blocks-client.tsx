'use client';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

type Props = {
  content: BlocksContent;
  strapiUrl?: string;
};

export default function BlocksClient({ content, strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL }: Props) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p>{children}</p>,
        heading: ({ level, children }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          return <Tag>{children}</Tag>;
        },
        list: ({ format, children }) => (format === 'ordered' ? <ol>{children}</ol> : <ul>{children}</ul>),
        'list-item': ({ children }) => <li>{children}</li>,
        link: ({ url, children }) => (
          <a href={url} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        image: ({ image }) => {
          const src = image?.url?.startsWith('http')
            ? image.url
            : `${strapiUrl ?? ''}${image?.url ?? ''}`;
          const alt = image?.alternativeText ?? '';
          return <img src={src} alt={alt} />;
        },
      }}
    />
  );
}