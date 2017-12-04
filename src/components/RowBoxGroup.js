import PropTypes from "prop-types";
import React from "react";
import Paper from "material-ui/Paper";
import _ from "lodash";

export default class RowBoxGroup extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node,
      style: PropTypes.object,
    };
  }
  render() {
    return <Paper
      style={_.merge({
        margin: 16,
        paddingRight: 16,
        paddingBottom: 16,
      }, this.props.style || {})}
    >
      {this.props.children}
    </Paper>;
  }
}
