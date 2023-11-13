"use strict";(self.webpackChunkgrafana_json_datasource_docs=self.webpackChunkgrafana_json_datasource_docs||[]).push([[6],{5192:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var t=n(5893),o=n(1151);const r={id:"jsonpath",title:"JSONPath"},i=void 0,a={id:"jsonpath",title:"JSONPath",description:"JSONPath is a query language for JSON structures.",source:"@site/docs/jsonpath.md",sourceDirName:".",slug:"/jsonpath",permalink:"/grafana-json-datasource/jsonpath",draft:!1,unlisted:!1,editUrl:"https://github.com/grafana/grafana-json-datasource/edit/main/website/docs/jsonpath.md",tags:[],version:"current",frontMatter:{id:"jsonpath",title:"JSONPath"},sidebar:"someSidebar",previous:{title:"Macros",permalink:"/grafana-json-datasource/macros"},next:{title:"JSONata",permalink:"/grafana-json-datasource/jsonata"}},l={},c=[{value:"Filters",id:"filters",level:2}];function h(e){const s=Object.assign({p:"p",a:"a",pre:"pre",code:"code",ul:"ul",li:"li",admonition:"admonition",h2:"h2",ol:"ol"},(0,o.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"https://goessner.net/articles/JsonPath/",children:"JSONPath"})," is a query language for JSON structures."]}),"\n",(0,t.jsx)(s.p,{children:"For example, to query the titles of all the books in a store:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-js",children:"$.store.book[*].title\n"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"$"})," selects the root element"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"."})," selects a child of the current element"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"*"})," selects all elements within an object or array"]}),"\n"]}),"\n",(0,t.jsxs)(s.admonition,{title:"JSONPath Plus",type:"note",children:[(0,t.jsxs)(s.p,{children:["The JSON API data source uses the ",(0,t.jsx)(s.a,{href:"https://www.npmjs.com/package/jsonpath-plus",children:"JSONPath Plus"})," package to evaluate JSONPath expressions. JSONPath Plus extends the original specification with additional features."]}),(0,t.jsxs)(s.p,{children:["For more information on the supported syntax, refer to the ",(0,t.jsx)(s.a,{href:"https://github.com/JSONPath-Plus/JSONPath",children:"project page"}),"."]})]}),"\n",(0,t.jsx)(s.h2,{id:"filters",children:"Filters"}),"\n",(0,t.jsxs)(s.admonition,{title:"From version 1.3.4 filters are not supported anymore.",type:"note",children:[(0,t.jsx)(s.p,{children:"If your dashboards currently rely on JSONPath queries containing subexpressions, there are a few potential migration paths:"}),(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsxs)(s.li,{children:["For simple queries that use subexpressions for indexing/slicing, it may be possible to rewrite the query without a subexpressions for instance ",(0,t.jsx)(s.code,{children:"[(@.length-1)]"})," can also be represented as ",(0,t.jsx)(s.code,{children:"[:-1]"}),"."]}),"\n",(0,t.jsxs)(s.li,{children:["For more complex queries, we suggest switching to the ",(0,t.jsxs)(s.a,{href:"http://docs.jsonata.org/simple",children:[(0,t.jsx)(s.code,{children:"jsonata"})," language"]}),", which the plugin also supports. This language has similar features to JSONPath, including support for filter expressions (called \u201cpredicates\u201d in the documentation)."]}),"\n",(0,t.jsxs)(s.li,{children:["If changing your existing queries isn\u2019t feasible, the community plugin ",(0,t.jsx)(s.a,{href:"https://grafana.com/grafana/plugins/yesoreyeram-infinity-datasource/",children:"\u201cInfinity\u201d"})," supports JSONPath expressions, including filters and subexpressions if used with the ",(0,t.jsx)(s.code,{children:"backend"})," parser option. Please note that Infinity is community supported plugin."]}),"\n"]})]}),"\n",(0,t.jsx)(s.p,{children:"Filters let you query elements based on a logical expression."}),"\n",(0,t.jsx)(s.p,{children:"For example, to query the titles of the books that cost more than 10:"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-js",children:"$.store.book[?(@.price > 10)].title\n"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"?()"})," defines a filter expression"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.code,{children:"@"})," selects the element that's currently being processed"]}),"\n"]}),"\n",(0,t.jsx)(s.p,{children:"Filter expressions support a set of boolean and logical operations:"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["Boolean operations: ",(0,t.jsx)(s.code,{children:"!"}),", ",(0,t.jsx)(s.code,{children:"&&"}),", ",(0,t.jsx)(s.code,{children:"||"})]}),"\n",(0,t.jsxs)(s.li,{children:["Comparison: ",(0,t.jsx)(s.code,{children:">"}),", ",(0,t.jsx)(s.code,{children:"<"}),", ",(0,t.jsx)(s.code,{children:">="}),", ",(0,t.jsx)(s.code,{children:"<="})]}),"\n",(0,t.jsxs)(s.li,{children:["Equality: ",(0,t.jsx)(s.code,{children:"=="}),", ",(0,t.jsx)(s.code,{children:"!="})]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-js",children:"$.store.book[?(@.price < 10)]            // Books that are cheaper than 10\n$.store.book[?(@.category == 'fiction')] // Books that have the fiction category\n$.store.book[?(@.isbn)]                  // Books that have a ISBN number\n\n$.store.book[?(@.price < 10 && @.category == 'fiction')] // Cheap fiction books\n"})})]})}const d=function(e={}){const{wrapper:s}=Object.assign({},(0,o.ah)(),e.components);return s?(0,t.jsx)(s,Object.assign({},e,{children:(0,t.jsx)(h,e)})):h(e)}},1151:(e,s,n)=>{n.d(s,{Zo:()=>a,ah:()=>r});var t=n(7294);const o=t.createContext({});function r(e){const s=t.useContext(o);return t.useMemo((()=>"function"==typeof e?e(s):{...s,...e}),[s,e])}const i={};function a({components:e,children:s,disableParentContext:n}){let a;return a=n?"function"==typeof e?e({}):e||i:r(e),t.createElement(o.Provider,{value:a},s)}}}]);