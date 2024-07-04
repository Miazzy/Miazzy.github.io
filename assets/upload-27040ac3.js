import{bF as o,a0 as a}from"./index.js";const s=e=>{const r=a().getToken;return`${e}?token=${r}`},O=(e,n="donwload")=>JSON.parse(o.IMAGE_TYPES).filter(t=>e.indexOf(t)>0).length===0&&n==="preview"?`${o.FILE_DOMAIN}:${o.FILE_PORT}`+s(e):`${o.DOWNLOAD_DOMAIN}:${o.DOWNLOAD_PORT}`+s(e);export{O as g};
//# sourceMappingURL=upload-27040ac3.js.map
