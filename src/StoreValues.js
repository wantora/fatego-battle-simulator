import valueTypes from "./valueTypes";

export default class StoreValues {
  constructor(values) {
    this._values = values;
  }
  getValue(key) {
    return this._values[key].value;
  }
  getRaw(key) {
    const raw = this._values[key].raw;
    
    if (raw === undefined) {
      return "";
    } else {
      return raw;
    }
  }
}

export const initialValues = {};

Object.keys(valueTypes).forEach((name) => {
  initialValues[name] = {
    value: valueTypes[name].defaultValue,
  };
});
