import React from "react";

const SharedTypes = {
  emitter: React.PropTypes.any,
};

export class Provider extends React.Component {
  static get childContextTypes() {
    return SharedTypes;
  }
}

export class DispatchableComponent extends React.Component {
  static get contextTypes() {
    return SharedTypes;
  }
  
  dispatch(...args) {
    return this.context.emitter.emit(...args);
  }
}
