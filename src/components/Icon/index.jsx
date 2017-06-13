/**
 * 图标
 */

import React from 'react';
import classnames from 'classnames';
import fileURL from 'file-loader?name=[hash:5].[ext]!./symbols/lib/svg-symbols.svg';
// import symbols from 'raw-loader!./symbols/lib/svg-symbols.svg';
import './style';

/*const renderSymbols = () => {
  var d = document.createElement('div');
  d.innerHTML = symbols;
  document.body.appendChild(d);
}

renderSymbols();*/


class Icon extends React.Component {
  render() {
    const { type, className, size = 32, color, style, spin } = this.props;
    // return <i className={classnames('icon', `icon-${type}`, className)}></i>

    return (
      <svg role={type} className={classnames(spin && 'animated infinite spin', className)} style={{
        width: size,
        height: size,
        fill: color
      }}>
        <use xlinkHref={`${fileURL}#${type}`}></use>
      </svg>
    );
  }
}

export default Icon;