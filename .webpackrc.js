export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      //"target": " https://www.easy-mock.com/mock/5b0e5c11f1a1c65c2fff98b0/umi-demo/",
      "target": " https://api.douban.com/v2/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
}