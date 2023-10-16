"use strict";(self.webpackChunkgrafana_json_datasource_docs=self.webpackChunkgrafana_json_datasource_docs||[]).push([[4],{3905:(e,t,r)=>{r.d(t,{Zo:()=>l,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},d="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(r),p=a,m=d["".concat(u,".").concat(p)]||d[p]||f[p]||o;return r?n.createElement(m,i(i({ref:t},l),{},{components:r})):n.createElement(m,i({ref:t},l))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c[d]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},9733:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>f,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={id:"configuration",title:"Configuration"},i=void 0,c={unversionedId:"configuration",id:"configuration",title:"Configuration",description:"Add a JSON data source",source:"@site/docs/configuration.md",sourceDirName:".",slug:"/configuration",permalink:"/grafana-json-datasource/configuration",draft:!1,editUrl:"https://github.com/grafana/grafana-json-datasource/edit/main/website/docs/configuration.md",tags:[],version:"current",frontMatter:{id:"configuration",title:"Configuration"},sidebar:"someSidebar",previous:{title:"Installation",permalink:"/grafana-json-datasource/installation"},next:{title:"Query editor",permalink:"/grafana-json-datasource/query-editor"}},u={},s=[{value:"Add a JSON data source",id:"add-a-json-data-source",level:2}],l={toc:s},d="wrapper";function f(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"add-a-json-data-source"},"Add a JSON data source"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"In the side menu, click the ",(0,a.kt)("strong",{parentName:"li"},"Configuration")," tab (cog icon)"),(0,a.kt)("li",{parentName:"ol"},"Click ",(0,a.kt)("strong",{parentName:"li"},"Add data source")," in the top-right corner of the ",(0,a.kt)("strong",{parentName:"li"},"Data Sources")," tab"),(0,a.kt)("li",{parentName:"ol"},'Enter "JSON" in the search box to find the JSON API data source'),(0,a.kt)("li",{parentName:"ol"},'Click the search result that says "JSON API"')),(0,a.kt)("p",null,"The data source has been added, but it needs some more configuration before you can use it."))}f.isMDXComponent=!0}}]);