import PropTypes from "prop-types";
import React from "react";

export default class RowBoxWide extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
    };
  }
  render() {
    return <div
      style={{
        display: "inline-block",
        verticalAlign: "top",
        paddingLeft: 16,
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {this.props.children}
    </div>;
  }
}
