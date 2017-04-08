const objectmap = () => {
  var map = [];
  for (var key in obj) {
    map.push(
        fn && fn(key, obj[key], obj)
      );
  }
  return map;
}

export default objectmap;