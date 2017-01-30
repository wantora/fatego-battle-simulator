import React from "react";
import {EventEmitter} from "events";
import _ from "lodash";
import valueTypes from "./valueTypes";
import {Provider} from "./flux";
import InputForm from "./InputForm";
import Result from "./Result";

export default class App extends Provider {
  constructor(props) {
    super(props);
    
    const values = {};
    
    Object.keys(valueTypes).forEach((name) => {
      values[name] = valueTypes[name].defaultValue;
    });
    
    this.state = {
      values: values,
    };
    
    this.emitter = new EventEmitter();
    this.handleUpdate = (...args) => this.update(...args);
  }
  update({name, value}) {
    this.setState((prevState, props) => {
      const values = _.clone(prevState.values);
      values[name] = value;
      
      return {values};
    });
  }
  componentDidMount() {
    this.emitter.on("update", this.handleUpdate);
  }
  componentWillUnmount() {
    this.emitter.removeListener("update", this.handleUpdate);
  }
  getChildContext() {
    return {
      emitter: this.emitter,
    };
  }
  render() {
    return <div>
      <InputForm values={this.state.values} />
      <Result values={this.state.values} />
    </div>;
  }
}
