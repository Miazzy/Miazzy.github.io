import{ax as n}from"./index.js";const o=(t,e)=>{if(sessionStorage.getItem("screen-date-set")){const s=JSON.parse(sessionStorage.getItem("screen-date-set"));Object.keys(e).length&&Object.assign(s,e),n(t,"",s)}else console.info("no screen-data-set and can not turn into new page.")};export{o as h};
//# sourceMappingURL=utils-5bbca5df.js.map
