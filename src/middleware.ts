import { type MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (ctx, next) => {
  ctx.locals.features = getDefaultFeatures();

  return next();
};
