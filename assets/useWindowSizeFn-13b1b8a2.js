import{q as a,aG as d,aH as u}from"./index.js";function w(i,o={}){const{wait:s=150,immediate:r}=o;let e=()=>{i()};e=a(e,s);const n=()=>{r&&e(),window.addEventListener("resize",e)},t=()=>{window.removeEventListener("resize",e)};return d(()=>{n()}),u(()=>{t()}),{start:n,stop:t}}export{w as u};
//# sourceMappingURL=useWindowSizeFn-13b1b8a2.js.map
