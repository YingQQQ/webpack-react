import router from './api';
import reactRender from './reactRender';

export default async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    return await router.routes()(ctx, next);
  }
  console.log('into router');
  await reactRender(ctx, next);
};
