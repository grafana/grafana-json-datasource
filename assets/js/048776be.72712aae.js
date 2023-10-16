"use strict";(self.webpackChunkgrafana_json_datasource_docs=self.webpackChunkgrafana_json_datasource_docs||[]).push([[687],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var r=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)a=i[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=r.createContext({}),p=function(e){var t=r.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(a),c=n,m=u["".concat(l,".").concat(c)]||u[c]||h[c]||i;return a?r.createElement(m,o(o({ref:t},d),{},{components:a})):r.createElement(m,o({ref:t},d))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=c;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:n,o[1]=s;for(var p=2;p<i;p++)o[p]=a[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,a)}c.displayName="MDXCreateElement"},7606:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=a(7462),n=(a(7294),a(3905));const i={id:"query-editor",title:"Query editor"},o=void 0,s={unversionedId:"query-editor",id:"query-editor",title:"Query editor",description:"This page explains the what each part of the query editor does, and how you can configure it.",source:"@site/docs/query-editor.md",sourceDirName:".",slug:"/query-editor",permalink:"/grafana-json-datasource/query-editor",draft:!1,editUrl:"https://github.com/grafana/grafana-json-datasource/edit/main/website/docs/query-editor.md",tags:[],version:"current",frontMatter:{id:"query-editor",title:"Query editor"},sidebar:"someSidebar",previous:{title:"Configuration",permalink:"/grafana-json-datasource/configuration"},next:{title:"Variables",permalink:"/grafana-json-datasource/variables"}},l={},p=[{value:"Fields",id:"fields",level:3},{value:"<code>Fields have different lengths</code>",id:"fields-have-different-lengths",level:4},{value:"Path",id:"path",level:3},{value:"Params",id:"params",level:3},{value:"Headers",id:"headers",level:3},{value:"Body",id:"body",level:3},{value:"Experimental",id:"experimental",level:3},{value:"Cache time",id:"cache-time",level:3}],d={toc:p},u="wrapper";function h(e){let{components:t,...i}=e;return(0,n.kt)(u,(0,r.Z)({},d,i,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"This page explains the what each part of the query editor does, and how you can configure it."),(0,n.kt)("p",null,"The query editor for the JSON API data source consists of a number of tabs. Each tab configures a part of the query."),(0,n.kt)("h3",{id:"fields"},"Fields"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Fields",src:a(357).Z,width:"1622",height:"376"})),(0,n.kt)("p",null,"The ",(0,n.kt)("strong",{parentName:"p"},"Fields")," tab is where you select the data to extract from the JSON document returned by the URL configured in the data source configuration."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},"Field")," lets you define a query expression that determines the data to extract from the JSON document. There are two supported query languages: ",(0,n.kt)("a",{parentName:"p",href:"/grafana-json-datasource/jsonpath"},"JSONPath")," and ",(0,n.kt)("a",{parentName:"p",href:"/grafana-json-datasource/jsonata"},"JSONata"),".")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},"Type")," defines the JSON type of the elements returned by the ",(0,n.kt)("strong",{parentName:"p"},"Field")," expression. By default, Grafana uses the types in the JSON document. If ",(0,n.kt)("strong",{parentName:"p"},"Type")," is set to a different type than the original property type, Grafana tries to parse the value.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},(0,n.kt)("strong",{parentName:"p"},"Alias")," overrides the default name of the field."),(0,n.kt)("p",{parentName:"li"},"This can be useful in cases where the API returns quoted numbers, e.g. ",(0,n.kt)("inlineCode",{parentName:"p"},'"price": "3.49"'),"."))),(0,n.kt)("h4",{id:"fields-have-different-lengths"},(0,n.kt)("inlineCode",{parentName:"h4"},"Fields have different lengths")),(0,n.kt)("p",null,"All fields must return the same number of values. If you get this error it means that one or more of the objects are missing the queried element."),(0,n.kt)("p",null,"In the following example, the ",(0,n.kt)("inlineCode",{parentName:"p"},"name")," property is present in both objects, but ",(0,n.kt)("inlineCode",{parentName:"p"},"version")," isn't."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "services": [\n    {\n      "name": "order-api",\n      "version": "1"\n    },\n    {\n      "name": "billing-api"\n    }\n  ]\n}\n')),(0,n.kt)("p",null,"In the example below, you can see a couple of expressions and their results for the JSON structure in the previous example. Since JSONPath expressions are evaluated individually, Grafana can't tell which version that was missing."),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Expression"),(0,n.kt)("th",{parentName:"tr",align:null},"Result"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"$.services[*].name")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},'["order-api", "billing-api"]'))),(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},"$.services[*].version")),(0,n.kt)("td",{parentName:"tr",align:null},(0,n.kt)("inlineCode",{parentName:"td"},'["1"]'))))),(0,n.kt)("p",null,"Depending on your use case, you can use a filter expression to only return items that contain a version:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-json"},"$.services[?(@.version)].name\n")),(0,n.kt)("h3",{id:"path"},"Path"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Path",src:a(1001).Z,width:"1578",height:"236"})),(0,n.kt)("p",null,"The drop-down box to the left lets you configure the ",(0,n.kt)("strong",{parentName:"p"},"HTTP method")," of the request sent to the URL and can be set to ",(0,n.kt)("strong",{parentName:"p"},"GET")," and ",(0,n.kt)("strong",{parentName:"p"},"POST"),"."),(0,n.kt)("p",null,"The text box lets you append a path to the URL in the data source configuration. This can be used to dynamically change the request URL using ",(0,n.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/variables/"},"variables"),"."),(0,n.kt)("p",null,"For example, by setting the path to ",(0,n.kt)("inlineCode",{parentName:"p"},"/movies/${movie}/summary")," you can query the summary for any movie without having to change the query itself."),(0,n.kt)("h3",{id:"params"},"Params"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Params",src:a(9468).Z,width:"1576",height:"304"})),(0,n.kt)("p",null,"Add any parameters you'd like to send as part of the query string. For example, the parameters in the screenshot gets encoded as ",(0,n.kt)("inlineCode",{parentName:"p"},"?category=movies"),"."),(0,n.kt)("p",null,"Both the ",(0,n.kt)("strong",{parentName:"p"},"Key")," and ",(0,n.kt)("strong",{parentName:"p"},"Value")," fields support ",(0,n.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/variables/"},"variables"),"."),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"Any query parameters that have been set by the administrator in the data source configuration has higher priority and overrides the parameters set by the query.")),(0,n.kt)("h3",{id:"headers"},"Headers"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Headers",src:a(8604).Z,width:"1578",height:"306"})),(0,n.kt)("p",null,"Add any parameters you'd like to send as HTTP headers."),(0,n.kt)("p",null,"Both the ",(0,n.kt)("strong",{parentName:"p"},"Key")," and ",(0,n.kt)("strong",{parentName:"p"},"Value")," fields support ",(0,n.kt)("a",{parentName:"p",href:"https://grafana.com/docs/grafana/latest/variables/"},"variables"),"."),(0,n.kt)("h3",{id:"body"},"Body"),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Body",src:a(9233).Z,width:"1580",height:"646"})),(0,n.kt)("p",null,"Sets the text to send as a request body."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Syntax highlighting")," sets the active syntax for the editor. This is only for visual purposes and doesn't change the actual request.")),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"Due to limitations in modern browsers, Grafana ignores the request body if the HTTP method is set to GET.")),(0,n.kt)("h3",{id:"experimental"},"Experimental"),(0,n.kt)("p",null,"Try out features that are currently in development. Each feature has a link in its tooltip that takes you to the feature request on GitHub where you can share your feedback."),(0,n.kt)("admonition",{type:"danger"},(0,n.kt)("p",{parentName:"admonition"},"Experimental features might be unstable and can be removed without notice.")),(0,n.kt)("h3",{id:"cache-time"},"Cache time"),(0,n.kt)("p",null,"By default, Grafana caches the JSON document returned by the last request to avoid hitting rate limits while configuring your query. Once you're happy with your query, consider setting the cache time to ",(0,n.kt)("strong",{parentName:"p"},"0s")," to disable caching."))}h.isMDXComponent=!0},9233:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/editor-body-3b4f4a55580d473704685955da506fc2.png"},357:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/editor-fields-593c842e07e2097ea37a8f15b105109e.png"},8604:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/editor-headers-8d8359a08d2355ce5da23ca442d2b8f9.png"},9468:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/editor-params-b1743157ee2a7cea6b619f3e38fbfcf4.png"},1001:(e,t,a)=>{a.d(t,{Z:()=>r});const r=a.p+"assets/images/editor-path-b638361fbeda160ae17dc8cc33cb0f4c.png"}}]);