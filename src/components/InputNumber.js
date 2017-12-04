import PropTypes from "prop-types";
import React from "react";
import TextField from "material-ui/TextField";
import {dispatch} from "../flux";

export default class InputNumber extends React.Component {
  static get propTypes() {
    return {
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      value: PropTypes.number.isRequired,
      raw: PropTypes.string.isRequired,
    };
  }
  constructor(props) {
    super(props);
    
    this.state = {
      errorText: null,
    };
    
    this.handleChange = (ev, newValue) => {
      const num = this.strictParseNumber(newValue);
      
      this.setState({
        errorText: ev.target.checkValidity() ? null : ev.target.validationMessage,
      });
      
      dispatch({
        type: "update",
        name: this.props.name,
        value: {
          value: isNaN(num) ? 0 : num,
          raw: newValue,
        },
      });
    };
  }
  render() {
    const raw = this.props.raw === "" ? String(this.props.value) : this.props.raw;
    
    return <TextField
      key={this.props.name}
      type="number"
      step="0.1"
      floatingLabelText={this.props.label}
      floatingLabelFixed
      fullWidth
      errorText={this.state.errorText}
      disabled={this.props.disabled}
      value={raw}
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
