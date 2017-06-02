import PropTypes from "prop-types";
import React from "react";
import Toggle from "material-ui/Toggle";
import {dispatch} from "../flux";

export default class InputToggle extends React.Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      value: PropTypes.bool.isRequired,
    };
  }
  
  constructor(props) {
    super(props);
    
    this.handleToggle = (event, isInputChecked) => {
      dispatch({
        type: "update",
        name: this.props.name,
        value: isInputChecked,
      });
    };
  }
  render() {
    return <Toggle
      label={this.props.label}
      disabled={this.props.disabled}
      toggled={this.props.value}
      style={{marginTop: 14}}
      onToggle={this.handleToggle}
    />;
  }
}
