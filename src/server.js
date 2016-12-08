import Koa from 'koa';
import middlewareRegister from './server/middlewareRegister';

const app = new Koa();
middlewareRegister(app);

app.listen(3000, () => {
  console.log('working');
});
