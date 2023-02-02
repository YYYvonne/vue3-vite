function deepObj(obj:any, key:any) {
    const keys = Object.keys(obj);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
      const k = keys[i];
      const v = obj[k];
      if (k === key) {
        return v;
      } else if (
        Object.prototype.toString.call(v).slice(8, -1) === 'Object'
      ) {
        const res:any = deepObj(v, key);
        if (res !== undefined) {
          return res;
        }
      } else if (
        Object.prototype.toString.call(v).slice(8, -1) === 'Array'
      ) {
        const res = v.map((item:any) => {
          const result = deepObj(item, key);
          if (result !== undefined) {
            return result;
          }
        });
        if (!res.some((item:any) => item === undefined)) {
          return res;
        }
      }
    }
}
  export default deepObj