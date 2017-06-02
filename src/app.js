import PropTypes from "prop-types";
import React from "react";
import InputForm from "./InputForm";
import Result from "./Result";

export default class App extends React.Component {
  static get propTypes() {
    return {
      values: PropTypes.object.isRequired,
    };
  }
  
  render() {
    return <div>
      <InputForm values={this.props.values} />
      <Result values={this.props.values} />
    </div>;
  }
}
