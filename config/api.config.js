
module.exports = {
  // 本地环境
  "local": {
    "basedata": "http://127.0.0.1:8080/",
    "room": "http://127.0.0.1:8080/",
    "arm": "http://127.0.0.1:8080/"
  },

  // 开发环境
  "dev": {
    "basedata": "http://10.0.31.72:8080",
    "room": "http://10.0.31.72:8080",
    "arm": ""
  },

  // 测试环境
  "test": {
    "basedata": "http://10.0.31.75:8080",
    "room": "",
    "arm": ""
  },

  // 生产环境
  "prod": {
    "basedata": "",
    "room": "",
    "arm": ""
  }
}