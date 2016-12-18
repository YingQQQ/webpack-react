import serve from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import PATHS from '../../webpack/path-help';

export default (app) => {
  app.use(bodyParser());
  app.use(serve(PATHS.build));
  app.use(views(PATHS.views, {
    extension: 'ejs'
  }));
  app.use(router);
};
