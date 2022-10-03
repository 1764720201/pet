"use strict";const i=(e,r=100)=>{let t=!0;return function(...u){!t||(t=!1,e.apply(this,u),setTimeout(()=>{t=!0},r))}};exports.throttle=i;
