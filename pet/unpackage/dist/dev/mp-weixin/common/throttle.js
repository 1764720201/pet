"use strict";
const throttle = (fn, delay = 100) => {
  let valid = true;
  return function(...args) {
    if (!valid) {
      return;
    }
    valid = false;
    fn.apply(this, args);
    setTimeout(() => {
      valid = true;
    }, delay);
  };
};
exports.throttle = throttle;
