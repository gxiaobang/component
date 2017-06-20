/**
 * 图片上传
 * @example
 *   <ImgUpload data={['', '']} />
 */

import React from 'react';
import { Button } from '@/components';
import upload from '@/utils/upload';
import './style';

class ImgUpload extends React.Component {

  state = {
    data: this.props.data
  };

  renderList() {
    const { data = [] } = this.state;

    return data.map((src, index) => {
      return (
        <li key={index}>
          <img src={src} alt="pic" />
        </li>
      );
    });
  }

  handleUpload() {
    upload({
      url: 'upload',
      name: 'upload'
    });
  }

  render() {
    return (
      <div className="img-upload">
        <div className="img-upload-header">
          <Button type="default" onClick={
            () => this.handleUpload()
          }>上传</Button>
          <span className="img-upload-text">图片文件不超过 100kb</span>
        </div>
        <ul className="img-upload-list">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

export default ImgUpload;