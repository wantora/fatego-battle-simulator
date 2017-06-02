import React from "react";
import _ from "lodash";

import InputToggle from "./InputToggle";
import InputNumber from "./InputNumber";
import InputSelect from "./InputSelect";

class ValueType {
  constructor(data) {
    this.name = data.name;
    this.defaultValue = data.defaultValue;
    this.label = data.label;
    this.resultLabel = data.resultLabel || data.label;
    this.valueNames = data.valueNames;
    this.enableFilter = data.enableFilter;
    
    this.valueNameHash = this.valueNames && _.fromPairs(this.valueNames.map((o) => [o.name, o]));
  }
  resolveValue(value) {
    if (this.valueNameHash) {
      return this.valueNameHash[value].value;
    } else {
      return value;
    }
  }
  isEnable(values) {
    if (this.enableFilter) {
      return this.enableFilter(values);
    } else {
      return true;
    }
  }
  getInputComponent(values) {
    const valueType = typeof this.defaultValue;
    
    if (valueType === "boolean") {
      return <InputToggle name={this.name} label={this.label} value={values[this.name]}
        disabled={!this.isEnable(values)}
      />;
    } else if (valueType === "number") {
      return <InputNumber name={this.name} label={this.label} value={values[this.name]}
        disabled={!this.isEnable(values)}
      />;
    } else if (valueType === "string") {
      return <InputSelect name={this.name} label={this.label} value={values[this.name]}
        items={this.valueNames}
        disabled={!this.isEnable(values)}
      />;
    } else {
      return null;
    }
  }
}

const types = [
  new ValueType({
    name: "atk",
    defaultValue: 0,
    label: "ATK",
    resultLabel: "基礎ダメージ",
  }),
  new ValueType({
    name: "classType",
    defaultValue: "saber",
    label: "クラス",
    resultLabel: "クラス補正",
    valueNames: [
      {name: "saber", label: "セイバー", value: 100},
      {name: "archer", label: "アーチャー", value: 95},
      {name: "lancer", label: "ランサー", value: 105},
      {name: "rider", label: "ライダー", value: 100},
      {name: "caster", label: "キャスター", value: 90},
      {name: "assassin", label: "アサシン", value: 90},
      {name: "berserker", label: "バーサーカー", value: 110},
      {name: "shielder", label: "シールダー", value: 100},
      {name: "ruler", label: "ルーラー", value: 110},
      {name: "avenger", label: "アヴェンジャー", value: 110},
      {name: "mooncancer", label: "ムーンキャンサー", value: 100},
      {name: "alterego", label: "アルターエゴ", value: 100},
    ],
  }),
  new ValueType({
    name: "classAffinity",
    defaultValue: "normal",
    label: "クラス相性",
    valueNames: [
      {name: "normal", label: "等倍", value: 100},
      {name: "weak", label: "有利", value: 200},
      {name: "resist", label: "不利", value: 50},
      {name: "berserker", label: "1.5倍", value: 150},
    ],
  }),
  new ValueType({
    name: "attriAffinity",
    defaultValue: "normal",
    label: "天地人相性",
    valueNames: [
      {name: "normal", label: "等倍", value: 100},
      {name: "weak", label: "有利", value: 110},
      {name: "resist", label: "不利", value: 90},
    ],
  }),
  new ValueType({
    name: "attackType",
    defaultValue: "noblePhantasm",
    label: "攻撃種別",
    valueNames: [
      {name: "noblePhantasm", label: "宝具", value: "noblePhantasm"},
      {name: "normal", label: "通常", value: "normal"},
      {name: "extra", label: "Extra", value: "extra"},
    ],
  }),
  new ValueType({
    name: "noblePhantasmValue",
    defaultValue: 0,
    label: "宝具倍率",
    enableFilter: (v) => v.attackType === "noblePhantasm",
  }),
  new ValueType({
    name: "noblePhantasmSPFlag",
    defaultValue: false,
    label: "特攻宝具",
    enableFilter: (v) => v.attackType === "noblePhantasm",
  }),
  new ValueType({
    name: "noblePhantasmSPValue",
    defaultValue: 0,
    label: "宝具特攻倍率",
    enableFilter: (v) => v.attackType === "noblePhantasm" && v.noblePhantasmSPFlag,
  }),
  new ValueType({
    name: "card",
    defaultValue: "arts",
    label: "カード種別",
    resultLabel: "カード種別補正",
    valueNames: [
      {name: "arts", label: "Arts", value: 100},
      {name: "buster", label: "Buster", value: 150},
      {name: "quick", label: "Quick", value: 80},
    ],
    enableFilter: (v) => v.attackType === "noblePhantasm" || v.attackType === "normal",
  }),
  new ValueType({
    name: "cardOrder",
    defaultValue: "1",
    label: "カード順序",
    resultLabel: "カード順序補正",
    valueNames: [
      {name: "1", label: "1st", value: 100},
      {name: "2", label: "2nd", value: 120},
      {name: "3", label: "3rd", value: 140},
    ],
    enableFilter: (v) => v.attackType === "normal",
  }),
  new ValueType({
    name: "busterFirst",
    defaultValue: false,
    label: "Busterが1stカード",
    resultLabel: "Buster 1stボーナス",
    valueNames: [
      {name: true, label: "有り", value: 50},
      {name: false, label: "無し", value: 0},
    ],
    enableFilter: (v) => {
      return (v.attackType === "normal" || v.attackType === "extra") &&
        !(v.card !== "buster" && v.cardOrder === "1");
    },
  }),
  new ValueType({
    name: "busterChain",
    defaultValue: false,
    label: "Busterチェイン",
    resultLabel: "Busterチェインボーナス",
    valueNames: [
      {name: true, label: "有り", value: 20},
      {name: false, label: "無し", value: 0},
    ],
    enableFilter: (v) => v.attackType === "normal" && v.card === "buster",
  }),
  new ValueType({
    name: "colorBraveChain",
    defaultValue: false,
    label: "同色ブレイブチェイン",
    resultLabel: "Extraボーナス",
    valueNames: [
      {name: true, label: "有り", value: 350},
      {name: false, label: "無し", value: 200},
    ],
    enableFilter: (v) => v.attackType === "extra",
  }),
  new ValueType({
    name: "critical",
    defaultValue: false,
    label: "クリティカル",
    resultLabel: "クリティカル補正",
    valueNames: [
      {name: true, label: "有り", value: 200},
      {name: false, label: "無し", value: 100},
    ],
    enableFilter: (v) => v.attackType === "normal",
  }),
  new ValueType({
    name: "cardEffect",
    defaultValue: 0,
    label: "カード性能状態変化",
    enableFilter: (v) => v.attackType === "noblePhantasm" || v.attackType === "normal",
  }),
  new ValueType({
    name: "attackEffect",
    defaultValue: 0,
    label: "攻撃力状態変化",
  }),
  new ValueType({
    name: "defenseEffect",
    defaultValue: 0,
    label: "敵防御力状態変化",
  }),
  new ValueType({
    name: "spEffect",
    defaultValue: 0,
    label: "特攻状態変化",
  }),
  new ValueType({
    name: "criticalEffect",
    defaultValue: 0,
    label: "クリティカル威力状態変化",
    enableFilter: (v) => v.attackType === "normal" && v.critical === true,
  }),
  new ValueType({
    name: "noblePhantasmEffect",
    defaultValue: 0,
    label: "宝具威力状態変化",
    enableFilter: (v) => v.attackType === "noblePhantasm",
  }),
  new ValueType({
    name: "damagePlusEffect",
    defaultValue: 0,
    label: "固定ダメージ状態変化",
  }),
];

const valueTypes = {};

types.forEach((type) => {
  valueTypes[type.name] = type;
});

export default valueTypes;
