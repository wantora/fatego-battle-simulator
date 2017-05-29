import React from "react";
import Toggle from "material-ui/Toggle";
import {dispatch} from "./flux";

export default class InputToggle extends React.Component {
  static get propTypes() {
    return {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool,
      value: React.PropTypes.bool.isRequired,
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
