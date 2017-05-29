import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {dispatch} from "./flux";

export default class InputSelect extends React.Component {
  static get propTypes() {
    return {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool,
      value: React.PropTypes.string.isRequired,
      items: React.PropTypes.array.isRequired,
    };
  }
  
  constructor(props) {
    super(props);
    
    this.handleChange = (event, key, payload) => {
      dispatch({
        type: "update",
        name: this.props.name,
        value: payload,
      });
    };
  }
  render() {
    const menuItems = this.props.items.map(({name, label, value}) => {
      return <MenuItem key={name} value={name} primaryText={label} />;
    });
    
    return <SelectField
      autoWidth
      floatingLabelText={this.props.label}
      floatingLabelFixed
      fullWidth
      disabled={this.props.disabled}
      value={this.props.value}
      onChange={this.handleChange}
    >
      {menuItems}
    </SelectField>;
  }
}
