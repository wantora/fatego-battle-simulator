import React from "react";

export default class RowBox extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.node,
    };
  }
  
  render() {
    return <div
      style={{
        display: "inline-block",
        verticalAlign: "top",
        paddingLeft: 16,
        boxSizing: "border-box",
        maxWidth: 250,
        width: "100%",
      }}
    >
      {this.props.children}
    </div>;
  }
}
