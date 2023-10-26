"use strict";(self.webpackChunkgrafana_json_datasource_docs=self.webpackChunkgrafana_json_datasource_docs||[]).push([[687],{2232:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>l,frontMatter:()=>a,metadata:()=>d,toc:()=>h});var n=s(5893),r=s(1151);const a={id:"query-editor",title:"Query editor"},i=void 0,d={id:"query-editor",title:"Query editor",description:"This page explains the what each part of the query editor does, and how you can configure it.",source:"@site/docs/query-editor.md",sourceDirName:".",slug:"/query-editor",permalink:"/grafana-json-datasource/query-editor",draft:!1,unlisted:!1,editUrl:"https://github.com/grafana/grafana-json-datasource/edit/main/website/docs/query-editor.md",tags:[],version:"current",frontMatter:{id:"query-editor",title:"Query editor"},sidebar:"someSidebar",previous:{title:"Configuration",permalink:"/grafana-json-datasource/configuration"},next:{title:"Variables",permalink:"/grafana-json-datasource/variables"}},o={},h=[{value:"Fields",id:"fields",level:3},{value:"<code>Fields have different lengths</code>",id:"fields-have-different-lengths",level:4},{value:"Path",id:"path",level:3},{value:"Params",id:"params",level:3},{value:"Headers",id:"headers",level:3},{value:"Body",id:"body",level:3},{value:"Experimental",id:"experimental",level:3},{value:"Cache time",id:"cache-time",level:3}];function c(e){const t=Object.assign({p:"p",h3:"h3",img:"img",strong:"strong",ul:"ul",li:"li",a:"a",code:"code",h4:"h4",pre:"pre",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",admonition:"admonition"},(0,r.ah)(),e.components);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"This page explains the what each part of the query editor does, and how you can configure it."}),"\n",(0,n.jsx)(t.p,{children:"The query editor for the JSON API data source consists of a number of tabs. Each tab configures a part of the query."}),"\n",(0,n.jsx)(t.h3,{id:"fields",children:"Fields"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Fields",src:s(357).Z+"",width:"1622",height:"376"})}),"\n",(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.strong,{children:"Fields"})," tab is where you select the data to extract from the JSON document returned by the URL configured in the data source configuration."]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Field"})," lets you define a query expression that determines the data to extract from the JSON document. There are two supported query languages: ",(0,n.jsx)(t.a,{href:"/grafana-json-datasource/jsonpath",children:"JSONPath"})," and ",(0,n.jsx)(t.a,{href:"/grafana-json-datasource/jsonata",children:"JSONata"}),"."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Type"})," defines the JSON type of the elements returned by the ",(0,n.jsx)(t.strong,{children:"Field"})," expression. By default, Grafana uses the types in the JSON document. If ",(0,n.jsx)(t.strong,{children:"Type"})," is set to a different type than the original property type, Grafana tries to parse the value."]}),"\n"]}),"\n",(0,n.jsxs)(t.li,{children:["\n",(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.strong,{children:"Alias"})," overrides the default name of the field."]}),"\n",(0,n.jsxs)(t.p,{children:["This can be useful in cases where the API returns quoted numbers, e.g. ",(0,n.jsx)(t.code,{children:'"price": "3.49"'}),"."]}),"\n"]}),"\n"]}),"\n",(0,n.jsx)(t.h4,{id:"fields-have-different-lengths",children:(0,n.jsx)(t.code,{children:"Fields have different lengths"})}),"\n",(0,n.jsx)(t.p,{children:"All fields must return the same number of values. If you get this error it means that one or more of the objects are missing the queried element."}),"\n",(0,n.jsxs)(t.p,{children:["In the following example, the ",(0,n.jsx)(t.code,{children:"name"})," property is present in both objects, but ",(0,n.jsx)(t.code,{children:"version"})," isn't."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",children:'{\n  "services": [\n    {\n      "name": "order-api",\n      "version": "1"\n    },\n    {\n      "name": "billing-api"\n    }\n  ]\n}\n'})}),"\n",(0,n.jsx)(t.p,{children:"In the example below, you can see a couple of expressions and their results for the JSON structure in the previous example. Since JSONPath expressions are evaluated individually, Grafana can't tell which version that was missing."}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{children:"Expression"}),(0,n.jsx)(t.th,{children:"Result"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"$.services[*].name"})}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:'["order-api", "billing-api"]'})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"$.services[*].version"})}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:'["1"]'})})]})]})]}),"\n",(0,n.jsx)(t.p,{children:"Depending on your use case, you can use a filter expression to only return items that contain a version:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-json",children:"$.services[?(@.version)].name\n"})}),"\n",(0,n.jsx)(t.h3,{id:"path",children:"Path"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Path",src:s(1001).Z+"",width:"1578",height:"236"})}),"\n",(0,n.jsxs)(t.p,{children:["The drop-down box to the left lets you configure the ",(0,n.jsx)(t.strong,{children:"HTTP method"})," of the request sent to the URL and can be set to ",(0,n.jsx)(t.strong,{children:"GET"})," and ",(0,n.jsx)(t.strong,{children:"POST"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["The text box lets you append a path to the URL in the data source configuration. This can be used to dynamically change the request URL using ",(0,n.jsx)(t.a,{href:"https://grafana.com/docs/grafana/latest/variables/",children:"variables"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["For example, by setting the path to ",(0,n.jsx)(t.code,{children:"/movies/${movie}/summary"})," you can query the summary for any movie without having to change the query itself."]}),"\n",(0,n.jsx)(t.h3,{id:"params",children:"Params"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Params",src:s(9468).Z+"",width:"1576",height:"304"})}),"\n",(0,n.jsxs)(t.p,{children:["Add any parameters you'd like to send as part of the query string. For example, the parameters in the screenshot gets encoded as ",(0,n.jsx)(t.code,{children:"?category=movies"}),"."]}),"\n",(0,n.jsxs)(t.p,{children:["Both the ",(0,n.jsx)(t.strong,{children:"Key"})," and ",(0,n.jsx)(t.strong,{children:"Value"})," fields support ",(0,n.jsx)(t.a,{href:"https://grafana.com/docs/grafana/latest/variables/",children:"variables"}),"."]}),"\n",(0,n.jsx)(t.admonition,{type:"caution",children:(0,n.jsx)(t.p,{children:"Any query parameters that have been set by the administrator in the data source configuration has higher priority and overrides the parameters set by the query."})}),"\n",(0,n.jsx)(t.h3,{id:"headers",children:"Headers"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Headers",src:s(8604).Z+"",width:"1578",height:"306"})}),"\n",(0,n.jsx)(t.p,{children:"Add any parameters you'd like to send as HTTP headers."}),"\n",(0,n.jsxs)(t.p,{children:["Both the ",(0,n.jsx)(t.strong,{children:"Key"})," and ",(0,n.jsx)(t.strong,{children:"Value"})," fields support ",(0,n.jsx)(t.a,{href:"https://grafana.com/docs/grafana/latest/variables/",children:"variables"}),"."]}),"\n",(0,n.jsx)(t.h3,{id:"body",children:"Body"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.img,{alt:"Body",src:s(9233).Z+"",width:"1580",height:"646"})}),"\n",(0,n.jsx)(t.p,{children:"Sets the text to send as a request body."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.strong,{children:"Syntax highlighting"})," sets the active syntax for the editor. This is only for visual purposes and doesn't change the actual request."]}),"\n"]}),"\n",(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsx)(t.p,{children:"Due to limitations in modern browsers, Grafana ignores the request body if the HTTP method is set to GET."})}),"\n",(0,n.jsx)(t.h3,{id:"experimental",children:"Experimental"}),"\n",(0,n.jsx)(t.p,{children:"Try out features that are currently in development. Each feature has a link in its tooltip that takes you to the feature request on GitHub where you can share your feedback."}),"\n",(0,n.jsx)(t.admonition,{type:"danger",children:(0,n.jsx)(t.p,{children:"Experimental features might be unstable and can be removed without notice."})}),"\n",(0,n.jsx)(t.h3,{id:"cache-time",children:"Cache time"}),"\n",(0,n.jsxs)(t.p,{children:["By default, Grafana caches the JSON document returned by the last request to avoid hitting rate limits while configuring your query. Once you're happy with your query, consider setting the cache time to ",(0,n.jsx)(t.strong,{children:"0s"})," to disable caching."]})]})}const l=function(e={}){const{wrapper:t}=Object.assign({},(0,r.ah)(),e.components);return t?(0,n.jsx)(t,Object.assign({},e,{children:(0,n.jsx)(c,e)})):c(e)}},9233:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"assets/images/editor-body-3b4f4a55580d473704685955da506fc2.png"},357:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"assets/images/editor-fields-593c842e07e2097ea37a8f15b105109e.png"},8604:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"assets/images/editor-headers-8d8359a08d2355ce5da23ca442d2b8f9.png"},9468:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"assets/images/editor-params-b1743157ee2a7cea6b619f3e38fbfcf4.png"},1001:(e,t,s)=>{s.d(t,{Z:()=>n});const n=s.p+"assets/images/editor-path-b638361fbeda160ae17dc8cc33cb0f4c.png"},1151:(e,t,s)=>{s.d(t,{Zo:()=>d,ah:()=>a});var n=s(7294);const r=n.createContext({});function a(e){const t=n.useContext(r);return n.useMemo((()=>"function"==typeof e?e(t):{...t,...e}),[t,e])}const i={};function d({components:e,children:t,disableParentContext:s}){let d;return d=s?"function"==typeof e?e({}):e||i:a(e),n.createElement(r.Provider,{value:d},t)}}}]);