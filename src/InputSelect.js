import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import {DispatchableComponent} from "./flux";

export default class InputSelect extends DispatchableComponent {
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
      this.dispatch("update", {
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
