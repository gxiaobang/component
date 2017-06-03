/**
 * 请求代理
 */

const express = require('express');
const proxy = require('http-proxy-middleware');
const opn = require('opn');

const app = express();
const path = require('path');

const { version, port, distPath } = require('./config/base.config');
const api = require('./config/api.config');

const sitePath = path.resolve(distPath, version);

// 接口代理
for (let key in api.dev) {
  if (api.dev[ key ]) {
    app.use(`/proxy/${key}`, proxy({
      target: api.dev[ key ], // 代理服务的地址,
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': ''
      }
    }));
  } 
}

// 静态文件
app.use(express.static(sitePath));

// 重定向到主页
app.get('*', (req, res) => {
  // console.log(req.query)
  let { lang = 'zh-cn' } = req.query;
  res.sendFile(`${sitePath}/index_${lang}.html`);
});


// 监听port端口
app.listen(port, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`Listening at http://localhost:${port}`);
  opn(`http://localhost:${port}`);
});