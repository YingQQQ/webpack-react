import Koa from 'koa';
import middlewareRegister from './middlewareRegister';

const port = process.env.PORT || 3000;
const app = new Koa();

middlewareRegister(app);


app.listen(port, () => {
  console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
