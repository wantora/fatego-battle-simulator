export default class PermanentStorage {
  constructor(key, domStorage) {
    this.key = key;
    this.domStorage = domStorage;
  }
  load(defaultData = {}) {
    let data = {};
    
    try {
      const src = this.domStorage.getItem(this.key);
      if (src !== null) {
        data = JSON.parse(src);
        data = this._migrate(data);
      }
    } catch (e) {
      // skip
    }
    
    return Object.assign({}, defaultData, data);
  }
  save(data) {
    const src = JSON.stringify(data);
    
    try {
      this.domStorage.setItem(this.key, src);
    } catch (e) {
      // skip
    }
  }
  _migrate(data) {
    let newData = data;
    
    // version 1 to 2
    if (newData.version === undefined) {
      const newValues = {};
      
      Object.keys(newData.values).forEach((key) => {
        newValues[key] = {
          value: newData.values[key],
        };
      });
      
      newData = Object.assign({}, newData, {
        version: 2,
        values: newValues,
      });
    }
    
    // version 2 to 3
    if (newData.version === 2) {
      newData = Object.assign({}, newData, {
        version: 3,
        values: Object.assign({}, newData.values, {
          atk: undefined,
          servantATK: newData.values.atk,
          fouATK: {value: 0},
          craftEssenceATK: {value: 0},
        }),
      });
    }
    
    return newData;
  }
}
