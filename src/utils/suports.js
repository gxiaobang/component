// 检测浏览器支持
const suports = {
  _cache: {},
  is(prop) {
    return true;
  },
  // 获取支持属性
  get(prop) {
    if (this._cache[prop]) return this._cache[prop];
    return prop;  
  }
};

export default suports;