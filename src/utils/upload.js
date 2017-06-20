/**
 * 文件上传
 */

import http from '@/utils/http';

let widget;

// 获取文件上传控件
const createWidget = (name) => {
  let input = document.createElement('input');
  input.type = 'file';
  return {
    content: input,
    upload: (fn) => {
      input.onchange = () => {
        fn(input.files);
        input.value = '';
      };
      input.click();
    }
  };
}

const upload = ({ url, name }) => {
  if (!widget) widget = createWidget();
  // widget.content
  widget.upload((files) => {
    let fd = new FormData;
    fd.append(name, files[0]);
    http({
      url,
      method: 'post',
      data: fd,
      onSuccess: (data) => {
        console.log(data);
      } 
    });
  });
}

export default upload;