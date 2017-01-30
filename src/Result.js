import React from "react";
import Divider from "material-ui/Divider";
import valueTypes from "./valueTypes";
import RowBox from "./RowBox";
import RowBoxGroup from "./RowBoxGroup";

export default class Result extends React.Component {
  static get propTypes() {
    return {
      values: React.PropTypes.object.isRequired,
    };
  }
  
  render() {
    const resolvedValues = this.resolveValues(this.props.values);
    const [damageMin, damageAve, damageMax] = this.simulateDamage(resolvedValues);
    
    const rows = [];
    
    [
      {name: "atk", type: "atk", label: "基礎ダメージ"},
      {name: "classType", type: "percent", label: "クラス補正"},
      {name: "classAffinity", type: "percent"},
      {name: "attriAffinity", type: "percent"},
      {name: "noblePhantasmValue", type: "percent"},
      {name: "noblePhantasmSPValue", type: "percent"},
      {name: "card", type: "percent", label: "カード種別補正"},
      {name: "cardOrder", type: "percent", label: "カード順序補正"},
      {name: "busterFirst", type: "percent"},
      {name: "busterChain", type: "atkPercent", label: "Busterチェインボーナス"},
      {name: "colorBraveChain", type: "percent", label: "Extraアタックボーナス"},
      {name: "critical", type: "percent", label: "クリティカル補正"},
      {name: "cardEffect", type: "percent"},
      {name: "attackEffect", type: "percent"},
      {name: "defenseEffect", type: "percent"},
      {name: "spEffect", type: "percent"},
      {name: "criticalEffect", type: "percent"},
      {name: "noblePhantasmEffect", type: "percent"},
      {name: "damagePlusEffect", type: "number"},
    ].forEach((o) => {
      if (valueTypes[o.name].isEnable(this.props.values)) {
        const value = resolvedValues[o.name];
        let valueStr;
        
        if (o.type === "number") {
          valueStr = `${value}`;
        } else if (o.type === "percent") {
          valueStr = `${value}%`;
        } else if (o.type === "atk") {
          valueStr = `${(value * 0.23).toFixed(1)}`;
        } else if (o.type === "atkPercent") {
          valueStr = `${(resolvedValues.atk * value / 100).toFixed(1)}`;
        }
        
        rows.push(
          <tr>
            <th>{o.label || valueTypes[o.name].label}</th>
            <td>{valueStr}</td>
          </tr>
        );
      }
    });
    
    return <RowBoxGroup>
      <RowBox>
        <h2 className="result-header">ダメージ</h2>
        <Divider />
        <table className="result-table">
          <tr>
            <th>ダメージ (最小)</th>
            <td>{damageMin}</td>
          </tr>
          <tr>
            <th>ダメージ (平均)</th>
            <td>{damageAve}</td>
          </tr>
          <tr>
            <th>ダメージ (最大)</th>
            <td>{damageMax}</td>
          </tr>
        </table>
      </RowBox>
      <RowBox>
        <h2 className="result-header">詳細情報</h2>
        <Divider />
        <table className="result-table">
          {rows}
        </table>
      </RowBox>
    </RowBoxGroup>;
  }
  simulateDamage(v) {
    const a = this.simulateDamageA(v);
    const b = this.simulateDamageB(v);
    const c = this.simulateDamageC(v);
    const d = this.simulateDamageD(v);
    const e = this.simulateDamageE(v);
    
    const damageMin = Math.floor((a * 0.9 * b * c * d) + e);
    const damageAve = Math.floor((a * b * c * d) + e);
    const damageMax = Math.floor((a * 1.099 * b * c * d) + e);
    
    return [damageMin, damageAve, damageMax];
  }
  
  simulateDamageA(v) {
    let damage = v.atk;
    
    if (valueTypes.noblePhantasmValue.isEnable(this.props.values)) {
      damage *= v.noblePhantasmValue / 100;
    }
    
    let card = 1;
    if (valueTypes.card.isEnable(this.props.values)) {
      card *= v.card / 100;
    }
    if (valueTypes.cardOrder.isEnable(this.props.values)) {
      card *= v.cardOrder / 100;
    }
    if (valueTypes.cardEffect.isEnable(this.props.values)) {
      card *= this.limit(1 + (v.cardEffect / 100), 0.001, 5.0);
    }
    if (valueTypes.busterFirst.isEnable(this.props.values)) {
      card += v.busterFirst / 100;
    }
    damage *= card;
    
    damage *= v.classType / 100;
    damage *= v.classAffinity / 100;
    damage *= v.attriAffinity / 100;
    damage *= 0.23;
    
    return damage;
  }
  simulateDamageB(v) {
    let damage = 1;
    
    let atdf = 1;
    if (valueTypes.attackEffect.isEnable(this.props.values)) {
      atdf += v.attackEffect / 100;
    }
    if (valueTypes.defenseEffect.isEnable(this.props.values)) {
      atdf -= v.defenseEffect / 100;
    }
    damage *= this.limit(atdf, 0.001, 5.0);
    
    if (valueTypes.critical.isEnable(this.props.values)) {
      damage *= v.critical / 100;
    }
    if (valueTypes.colorBraveChain.isEnable(this.props.values)) {
      damage *= v.colorBraveChain / 100;
    }
    
    return damage;
  }
  simulateDamageC(v) {
    let damage = 1;
    
    if (valueTypes.spEffect.isEnable(this.props.values)) {
      damage += this.limit(v.spEffect / 100, -0.999, 10.0);
    }
    if (valueTypes.criticalEffect.isEnable(this.props.values)) {
      damage += this.limit(v.criticalEffect / 100, -0.999, 5.0);
    }
    if (valueTypes.noblePhantasmEffect.isEnable(this.props.values)) {
      damage += this.limit(v.noblePhantasmEffect / 100, -0.999, 5.0);
    }
    
    return damage;
  }
  simulateDamageD(v) {
    let damage = 1;
    
    if (valueTypes.noblePhantasmSPValue.isEnable(this.props.values)) {
      damage *= (v.noblePhantasmSPValue / 100);
    }
    
    return damage;
  }
  simulateDamageE(v) {
    let damage = 0;
    
    if (valueTypes.damagePlusEffect.isEnable(this.props.values)) {
      damage += v.damagePlusEffect;
    }
    if (valueTypes.busterChain.isEnable(this.props.values)) {
      damage += v.atk * v.busterChain / 100;
    }
    
    return damage;
  }
  limit(num, min, max) {
    if (num < min) {
      return min;
    } else if (num > max) {
      return max;
    } else {
      return num;
    }
  }
  resolveValues(values) {
    const resolvedValues = {};
    
    Object.keys(valueTypes).forEach((name) => {
      const value = values[name];
      
      resolvedValues[name] = valueTypes[name].resolveValue(value);
    });
    
    return resolvedValues;
  }
}
