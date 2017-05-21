/**
 * main
 */

import React from 'react';
import './style';

class Main extends React.Component {
  render() {
    return (
      <section className="main">{this.props.children}</section>
    );
  }
}

export default Main;