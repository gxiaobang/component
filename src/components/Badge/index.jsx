/**
 * 徽标数
 * @example
 *   <Badge count={10}>
 *     <Button>评论</Button>
 *   </Badge>
 */

import React from 'react';
import './style';

class Badge extends React.Component {
  render() {
    let { children, count } = this.props;

    if (count > 99) {
      count = '99+';
    }

    return (
      <div className="badge">
        {children}
        <sup>{count}</sup>
      </div>
    );
  }
}


/*import testComponent from '@/utils/testComponent';
import { Button } from '@/components';
testComponent(
 <Badge count={100}>
   <Button>评论</Button>
 </Badge>
);*/

export default Badge;