import React from 'react';
import ReactDOM from 'react-dom';

class Input extends React.Component {
  render() {
    return (
        <input className="" type="text" {...this.props} />
      );
  }
}