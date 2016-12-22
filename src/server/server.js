import Koa from 'koa';
import middlewareRegister from './middlewareRegister';

const app = new Koa();
middlewareRegister(app);

app.listen(3000, () => {
  console.log('working at 3000');
});
