export function once(cb: (...args: any[]) => any, delay = 2000) {
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
export function throttle(callback: (...params: any[]) => any, delay = 20) {
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
