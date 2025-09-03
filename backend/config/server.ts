export default ({ env }: any) => ({
  url: env('PUBLIC_URL'),
  proxy: true,
  app: { keys: env.array('APP_KEYS', ['k1','k2','k3','k4']) },
});
