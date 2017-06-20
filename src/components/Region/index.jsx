/**
 * 地区
 * @example
 * <Region />
 */

import React from 'react';
import { Select } from '@/components';
import http from '@/utils/http';
import './style';

const { Option } = Select;

class Region extends React.Component {
  
  state = {
    cityOptions: [],
    areaOptions: []
  };

  url = '/basedata/area/areaList';

  componentDidMount() {
    const { defaultValue = [] } = this.props;
    if (defaultValue[1]) {
      this.request('city', defaultValue[0]);
    }
    /*if (defaultValue[2]) {
      this.request('area', defaultValue[1]);
    }*/
  }

  // 数据请求
  request(type, value) {
    http({
      url: this.url,
      params: {
        parentId: value,
        lv: type
      },
      onSuccess: (data) => {
        switch (type) {
          case 'city':
            this.setState({
              cityOptions: data.data,
              areaOptions: []
            });

            if (this.refs.city) {
              setTimeout(() => {
                this.request('area', this.refs.city.getVal()); 
              });
            }
            break;
          case 'area':
            this.setState({
              areaOptions: data.data
            });
            break;
        }
      }
    });
  }

  handleChange(type, e) {
    let value = e.target.value;
    if (value) {
      this.request(type, value);
    }
    else {
      this.setState({
        cityOptions: [],
        areaOptions: []
      });
    }
  }

  render() {
    const { defaultValue = [], readOnly } = this.props;
    return (
      <div className="region">
        <Select ref="province" readOnly={readOnly} name="province" http={{
          url: this.url,
          params: {
            parentId: 1,
            lv: 'province'
          }
        }} keys={['id', 'name']} onChange={(e) => this.handleChange('city', e)} defaultValue={defaultValue[0]}>
          <Option value="">请选择</Option>
        </Select>

        {
          this.state.cityOptions.length > 0 &&
            <Select ref="city" readOnly={readOnly} name="city" options={this.state.cityOptions} onChange={(e) => this.handleChange('area', e)} keys={['id', 'name']} defaultValue={defaultValue[1]}>
            </Select>
        }

        {
          this.state.areaOptions.length > 0 &&
            <Select ref="area" readOnly={readOnly} name="district" options={this.state.areaOptions} keys={['id', 'name']} defaultValue={defaultValue[2]}>
            </Select>
        }
      </div>
    );
  }
}

// Tooltip.show

export default Region;