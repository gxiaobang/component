/**
 * 折叠面板
 * @example
 *   <Collapse>
 *     <Panel header="面板标题" key="1">
 *       我是内容
 *     </Panel>
 *   </Collapse>
 */

import React from 'react';

class Panel extends React.Component {
  render() {
    return (
      <div className="rc-smart-panel">
        <div className="rc-smart-panel-header">
          {this.props.header}
        </div>
        <div className="rc-smart-panel-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

class Collapse extends React.Component {
  
  static Panel = Panel;

  render() {
    return (
      <div className="rc-smart-collapse">
        {this.props.children}
      </div>
    );
  }
}

export default Collapse;