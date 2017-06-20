import _ from 'lodash';
import { evt, dom } from '@/utils';

export default (target, callback) => {
  let unbind = evt.add(document, 'click', (e) => {
    e = evt.fix(e);
    if (!dom.contains(target, e.target)) {
      unbind();
      callback();
    }
  });

  return unbind;
}