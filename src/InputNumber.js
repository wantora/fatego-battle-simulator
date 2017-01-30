import React from "react";
import TextField from "material-ui/TextField";
import {DispatchableComponent} from "./flux";

export default class InputNumber extends DispatchableComponent {
  static get propTypes() {
    return {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool,
      value: React.PropTypes.number.isRequired,
    };
  }
  
  constructor(props) {
    super(props);
    
    this.state = {
      value: this.props.value,
      isError: false,
    };
    
    this.timeoutID = null;
    this.handleChange = (event, newValue) => {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.update(newValue);
      }, 100);
    };
  }
  update(newValue) {
    const value = this.strictParseNumber(newValue);
    
    if (isNaN(value)) {
      this.setState({isError: true});
    } else {
      this.setState({value, isError: false});
      
      this.dispatch("update", {
        name: this.props.name,
        value,
      });
    }
  }
  render() {
    return <TextField
      key={this.props.name}
      floatingLabelText={this.props.label}
      floatingLabelFixed
      fullWidth
      errorText={this.state.isError ? "数値を入力して下さい。" : null}
      disabled={this.props.disabled}
      defaultValue={this.state.value.toString()}
      onChange={this.handleChange}
    />;
  }
  strictParseNumber(value) {
    if (value === "" || value === "-" || value === "+") {
      return 0;
    } else if (/^[-+]?[0-9]+(\.[0-9]*)?$/.test(value)) {
      return parseFloat(value);
    }
    return NaN;
  }
}
