import React from "react";
import valueTypes from "./valueTypes";
import RowBox from "./RowBox";
import RowBoxGroup from "./RowBoxGroup";

export default class InputForm extends React.Component {
  static get propTypes() {
    return {
      values: React.PropTypes.object.isRequired,
    };
  }
  
  render() {
    return <RowBoxGroup style={{paddingTop: 2}}>
      <RowBox>
        {valueTypes.atk.getInputComponent(this.props.values)}
        {valueTypes.classType.getInputComponent(this.props.values)}
        {valueTypes.classAffinity.getInputComponent(this.props.values)}
        {valueTypes.attriAffinity.getInputComponent(this.props.values)}
        {valueTypes.attackType.getInputComponent(this.props.values)}
      </RowBox>
      <RowBox>
        {valueTypes.noblePhantasmValue.getInputComponent(this.props.values)}
        {valueTypes.noblePhantasmSPFlag.getInputComponent(this.props.values)}
        {valueTypes.noblePhantasmSPValue.getInputComponent(this.props.values)}
        {valueTypes.card.getInputComponent(this.props.values)}
        {valueTypes.cardOrder.getInputComponent(this.props.values)}
        {valueTypes.busterFirst.getInputComponent(this.props.values)}
        {valueTypes.busterChain.getInputComponent(this.props.values)}
        {valueTypes.colorBraveChain.getInputComponent(this.props.values)}
        {valueTypes.critical.getInputComponent(this.props.values)}
      </RowBox>
      <RowBox>
        {valueTypes.cardEffect.getInputComponent(this.props.values)}
        {valueTypes.attackEffect.getInputComponent(this.props.values)}
        {valueTypes.defenseEffect.getInputComponent(this.props.values)}
        {valueTypes.spEffect.getInputComponent(this.props.values)}
        {valueTypes.criticalEffect.getInputComponent(this.props.values)}
        {valueTypes.noblePhantasmEffect.getInputComponent(this.props.values)}
        {valueTypes.damagePlusEffect.getInputComponent(this.props.values)}
      </RowBox>
    </RowBoxGroup>;
  }
}