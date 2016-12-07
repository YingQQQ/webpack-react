import serve from 'koa-static';
import views from 'koa-views';
import router from './routes';
import bodyParser from 'koa-bodyparser';
import PATHS from '../../config/path-help';

export default (app) => {
  // mongoose.connect('mongodb://localhost/blogData');
  // let db = mongoose.connection;
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function (callback) {
  //   console.log('mongodb is working')
  // });
  app.use(bodyParser());
  app.use(serve(PATHS.build));
  app.use(views(PATHS.views, {
    extension: 'ejs'
  }));
  app.use(router);
};