(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[501],{6735:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/management/[management]",function(){return n(6909)}])},7143:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var r=n(5893),s=n(7294),a=n(9008),i=n.n(a),o=n(1664),l=n.n(o),c=n(5605),u=n.n(c);class h extends s.Component{render(){let{children:e,noHomeLink:t}=this.props;return(0,r.jsxs)("header",{className:u().Header,children:[(0,r.jsx)(i(),{children:(0,r.jsx)("title",{children:e})}),(0,r.jsxs)("h1",{children:[e," ",!t&&(0,r.jsx)(l(),{href:"/",children:(0,r.jsx)("a",{children:"Home"})})]})]})}}},4076:function(e,t,n){"use strict";n.d(t,{gs:function(){return _},iI:function(){return h},ko:function(){return f},s3:function(){return p},u9:function(){return x}});var r=n(5893),s=n(1664),a=n.n(s),i=n(7294),o=n(6586),l=n(5472),c=n(5174),u=n.n(c);class h extends i.Component{render(){let{category:e}=this.props;return(0,r.jsx)(a(),{href:"/category/".concat(e),children:(0,r.jsxs)("a",{className:u()["Enum_"+e+"_7"],children:["Category ",e]})})}}let d=[o.PU.West,o.PU.SouthWest,o.PU.SouthEast,o.PU.South,o.PU.East,o.PU.North,o.PU.Center];class f extends i.Component{render(){let{region:e}=this.props;return(0,r.jsx)(a(),{href:"/region/".concat(e),children:(0,r.jsx)("a",{className:u()["Enum_"+(d.indexOf(e)+1)+"_7"],children:(0,o.zJ)(e)})})}}class x extends i.Component{render(){let{state:e}=this.props;return(0,r.jsx)(a(),{href:"/state/".concat(e),children:(0,r.jsx)("a",{children:(0,o.zW)(e)})})}}class _ extends i.Component{render(){let{management:e}=this.props;return e?(0,r.jsx)(a(),{href:"/management/".concat((0,l.v8)(e)),children:(0,r.jsx)("a",{children:e})}):null}}class p extends i.Component{render(){let{authority:e}=this.props;return e?(0,r.jsx)(a(),{href:"/authority/".concat((0,l.v8)(e)),children:(0,r.jsx)("a",{children:e})}):null}}},3894:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var r=n(5893),s=n(7294),a=n(1664),i=n.n(a),o=n(4076),l=n(6586);let c=e=>e.toLowerCase();var u=n(7566);class h extends s.Component{static getDerivedStateFromProps(e,t){let{stations:n}=e,{filter:r}=t;return{filter:r,stations:n.filter(e=>(function(e,t){if(""===t)return 1;let n=[()=>e.Station,()=>e.DS100Office,()=>e.ID.toString(),()=>(0,l.zJ)(e.RegionalArea),()=>(0,l.zW)(e.State),()=>e.StationManagement,()=>e.TransportAuthority];for(let e=0;e<n.length;e++)if(function(e,t,n){e=n?n(e):e,t=n?n(t):t;let r=t.length-e.length;if(r<0)return!1;if(0==r&&e===t)return!0;e:for(let n=0;n<e.length;n++){let r=e[n];for(let e=0;e<t.length;e++){let n=t[e];if(r==n){t=t.substring(e+1);continue e}}return!1}return!0}(t,n[e](),c))return 1;return -1})(e,r)>0)}}render(){let{stations:e,filter:t}=this.state;return(0,r.jsxs)("table",{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Name"}),(0,r.jsx)("th",{}),(0,r.jsx)("th",{children:"DS 100"}),(0,r.jsx)("th",{children:"ID"}),(0,r.jsx)("th",{children:"Category"}),(0,r.jsx)("th",{children:"Regional Area (RB)"}),(0,r.jsx)("th",{children:"State"}),(0,r.jsx)("th",{children:"Management"}),(0,r.jsx)("th",{children:"Transport Authority"}),(0,r.jsx)("th",{})]})}),(0,r.jsx)("tbody",{children:(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:8,children:(0,r.jsx)("input",{value:t,onChange:this.updateFilter})})})}),(0,r.jsx)("tbody",{children:e.map(e=>(0,r.jsx)(d,{station:e},e.ID))})]})}constructor(...e){super(...e),this.state={stations:[],filter:""},this.updateFilter=e=>{e.preventDefault();let t=e.target.value;this.setState(e=>{let{stations:n}=e;return h.getDerivedStateFromProps(this.props,{stations:n,filter:t})})}}}class d extends s.Component{render(){let{station:e}=this.props;return(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)(i(),{href:"/station/".concat(e.ID),children:(0,r.jsx)("a",{children:e.Station})})}),(0,r.jsx)("td",{children:(0,r.jsxs)("small",{children:[(0,r.jsx)("a",{href:(0,u.v)({bhf:e.DS100Office,typ:"an",lang:"de",SecLang:"en"}),target:"_blank",rel:"noopener noreferer",children:"An"}),"\xa0",(0,r.jsx)("a",{href:(0,u.v)({bhf:e.DS100Office,typ:"ab",lang:"de",SecLang:"en"}),target:"_blank",rel:"noopener noreferer",children:"Ab"})]})}),(0,r.jsx)("td",{children:(0,r.jsx)("pre",{children:e.DS100Office})}),(0,r.jsx)("td",{children:e.ID}),(0,r.jsx)("td",{children:(0,r.jsx)(o.iI,{category:e.Category})}),(0,r.jsx)("td",{children:(0,r.jsx)(o.ko,{region:e.RegionalArea})}),(0,r.jsx)("td",{children:(0,r.jsx)(o.u9,{state:e.State})}),(0,r.jsx)("td",{children:(0,r.jsx)(o.gs,{management:e.StationManagement})}),(0,r.jsx)("td",{children:(0,r.jsx)(o.s3,{authority:e.TransportAuthority})})]})}}},7566:function(e,t,n){"use strict";function r(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[n,r]=e,s=function e(t){return Array.isArray(t)?t.map(e).join(","):"boolean"==typeof t?t?"1":"0":"number"==typeof t?t.toString(10):"string"==typeof t?t:void 0}(r);s&&t.set(n,s)}),"".concat("https://iris.noncd.db.de/wbt/js/index.html","?").concat(t)}n.d(t,{v:function(){return r}})},6586:function(e,t,n){"use strict";var r,s,a,i,o,l,c,u;n.d(t,{PU:function(){return s},wG:function(){return i},zJ:function(){return d},zW:function(){return x}}),(o=r||(r={}))[o.Class1=1]="Class1",o[o.Class2=2]="Class2",o[o.Class3=3]="Class3",o[o.Class4=4]="Class4",o[o.Class5=5]="Class5",o[o.Class6=6]="Class6",o[o.Class7=7]="Class7",(l=s||(s={})).West="west",l.SouthWest="southwest",l.SouthEast="southeast",l.South="south",l.East="east",l.North="north",l.Center="center";let h={"RB Mitte":"center","RB Nord":"north","RB Ost":"east","RB S\xfcd":"south","RB S\xfcdost":"southeast","RB S\xfcdwest":"southwest","RB West":"west"};function d(e){let[t,n]=Object.entries(h).find(t=>t[1]==e)||["","west"];if(""==t)throw Error("Unknown RegionalArea: "+e);return t}(c=a||(a={})).LongDistance="Fernverkehr",c.Regional="Regionalverkehr",c.PrivateRegional="Regionalverkehr (Privates Unternehmen)",(u=i||(i={})).BadenWuerttemberg="BW",u.Bavaria="BY",u.Berlin="BE",u.Brandenburg="BB",u.Bremen="HB",u.Hamburg="HH",u.Hesse="HE",u.LowerSaxony="NI",u.MecklenburgVorpommern="MV",u.NorthRhineWestphalia="NW",u.RhinelandPalatinate="RP",u.Saarland="SL",u.Saxony="SN",u.SaxonyAnhalt="ST",u.SchleswigHolstein="SH",u.Thuringia="TH";let f={"Baden-W\xfcrttemberg":"BW",Bayern:"BY",Berlin:"BE",Brandenburg:"BB",Bremen:"HB",Hamburg:"HH",Hessen:"HE",Niedersachsen:"NI","Mecklenburg-Vorpommern":"MV","Nordrhein-Westfalen":"NW","Rheinland-Pfalz":"RP",Saarland:"SL",Sachsen:"SN","Sachsen-Anhalt":"ST","Schleswig-Holstein":"SH",Thüringen:"TH"};function x(e){let[t,n]=Object.entries(f).find(t=>t[1]==e)||["","BE"];if(""==t)throw Error("Unknown FederalState: "+e);return t}},5472:function(e,t,n){"use strict";n.d(t,{BA:function(){return a},v8:function(){return s}});var r=n(1876).Buffer;function s(e){var t;return t="function"==typeof btoa?btoa(e):r.from(e).toString("base64"),Object.entries({"+":"-","/":"_","=":"@"}).reduce((e,t)=>{let[n,r]=t;return"function"==typeof String.prototype.replaceAll?e.replaceAll(n,r):e.split(n).join(r)},t)}function a(e){return e.replace(/[^a-zA-Z-]/g,"").replace(/\s+/," ").trim()}},6909:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return o},default:function(){return l}});var r=n(5893),s=n(7294),a=n(7143),i=n(3894),o=!0;class l extends s.Component{render(){let{stations:e,management:t}=this.props;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(a.Z,{children:['Stations managed by "',t,'"']}),(0,r.jsx)(i.Z,{stations:e})]})}}},5605:function(e){e.exports={Header:"PageTitle_Header__lRojx"}},5174:function(e){e.exports={Enum_1_7:"StationData_Enum_1_7__eVkay",Enum_2_7:"StationData_Enum_2_7__ZISd4",Enum_3_7:"StationData_Enum_3_7__539g1",Enum_4_7:"StationData_Enum_4_7__JAOSp",Enum_5_7:"StationData_Enum_5_7__4DiBw",Enum_6_7:"StationData_Enum_6_7__yPB4f",Enum_7_7:"StationData_Enum_7_7__ZeNLL"}}},function(e){e.O(0,[938,774,888,179],function(){return e(e.s=6735)}),_N_E=e.O()}]);