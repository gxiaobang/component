/**
 * http 请求
 * @example
 * <Fetch options={}>
 *   {
 *     (data) => (
 *       
 *     )
 *   }
 * </Fetch>
 */

import React from 'react';
import _ from 'lodash';
import http from '@/utils/http';

class Fetch extends React.Component {
  
  state = {
    data: null
  };

  componentDidMount() {
    const { options } = this.props;

    if (options) {
      http({
        ...options,
        onSuccess: (data) => {
          this.setState({ data });
        }
      })
    }
  }

  render() {
    const { data } = this.state;
    if (data) {
      return this.props.children(data);
    }
    else {
      return '加载中';
    }
  }
}

export default Fetch;