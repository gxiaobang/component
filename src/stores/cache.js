/**
 * 缓存数据
 */

const cache = {};

// 设置缓存
const setCache = (key, val) => {
  cache[ key ] = val;
};

// 读取缓存
const getCache = (key) => {
  return cache[ key ];
};

export { setCache, getCache };