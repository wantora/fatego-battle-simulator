import PropTypes from "prop-types";
import React from "react";
import TextField from "material-ui/TextField";
import {dispatch} from "./flux";

export default class InputNumber extends React.Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      value: PropTypes.number.isRequired,
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
      
      dispatch({
        type: "update",
        name: this.props.name,
        value,
      });
    }
  }
  render() {
    return <TextField
      key={this.props.name}
      type="number"
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
