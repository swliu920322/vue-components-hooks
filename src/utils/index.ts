export function once(cb: (...args: any[]) => any, delay = 2000): (...args: any[]) => any {
  let deal = true;
  return function (...arg: any[]) {
    if (deal) {
      cb.call(null, arg);
      deal = false;
      setTimeout(() => {
        deal = true;
      }, delay);
    }
  };
}
export function throttle(callback: (...params: any[]) => any, delay = 20): (...args: any[]) => any {
  let timer = 0;
  return function tt(...args: any[]) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      callback.apply(null, [...args]);
      clearTimeout(timer);
      timer = 0;
    }, delay);
  };
}

export function deepClone(target: Record<string | number, any>): Record<string | number, any> {
  const newObj: Record<string | number, any> = Array.isArray(target) ? [] : {};
  for (const attr in target) {
    if (Object.prototype.hasOwnProperty.call(target, attr)) {
      const temp = target[attr];
      if (typeof temp === "object") {
        newObj[attr] = deepClone(temp);
      } else {
        newObj[attr] = temp;
      }
    }
  }
  return newObj;
}
