export default ({ env }: any) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('S3_ACCESS_KEY_ID'),
            secretAccessKey: env('S3_ACCESS_SECRET'),
          },
          endpoint: env('S3_ENDPOINT'),
          region: env('S3_REGION', 'auto'),
          forcePathStyle: true,
        },
        params: {
          Bucket: env('S3_BUCKET'),
        },
        baseUrl: env('S3_BASE_URL', null),
        rootPath: env('S3_ROOT_PATH', ''),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});