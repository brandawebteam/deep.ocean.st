export default ({ env }: any) => ({
  url: env('PUBLIC_URL'),
  port: env.int('PORT', 1337),
  proxy: true,
  app: { keys: env.array('APP_KEYS', ['k1','k2','k3','k4']) },
});
