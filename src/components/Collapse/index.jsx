/**
 * 折叠面板
 */

import React from 'react';

class Panel extends React.Component {
  render() {
    return (
      <div className="rc-smart-panel"></div>
    );
  }
}

class Collapse extends React.Component {
  
  static Panel = Panel;

  render() {
    return (
      <div className="rc-smart-collapse"></div>
    );
  }
}

export default Collapse;