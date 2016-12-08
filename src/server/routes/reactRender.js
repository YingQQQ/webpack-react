import {
  match
} from 'react-router';
import routers from '../../client/routes';
import serverRender from '../controllers/serverRender';


const _match = (location) => {
  return new Promise((resolve, reject) => {
    match(location, (error, redirectLocation, renderProps) => {
      if (error) return reject(error);
      resolve({
        redirectLocation,
        renderProps
      });
    });
  });
};


export default async (ctx, next) => {
  console.log('reactRender is working');
  try {
    const {
      redirectLocation,
      renderProps
    } = await _match({
      routes: routers,
      location: ctx.url
    });
    if (redirectLocation) {
      ctx.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.log('renderProps is working');
      await serverRender(ctx, next, renderProps);
    } else {
      await next();
    }
  } catch (e) {
    console.error('Server-Render Error Occurs: %s', e.stack);
    await ctx.render('500');
  }
};
