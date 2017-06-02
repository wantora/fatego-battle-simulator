export default class Storage {
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
    
    return newData;
  }
}
