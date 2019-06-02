const Koa = require('koa');
const { router } = require('./router');

const app = new Koa();
// 启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, (err) => {
  if (err) throw err;
  console.log('runing...');
});
