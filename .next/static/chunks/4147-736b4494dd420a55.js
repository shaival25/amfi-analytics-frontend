(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4147],{4259:function(e,t,r){Promise.resolve().then(r.bind(r,4354))},4354:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return j}});var a=r(7437),s=r(2265),o=r(2670),n=r(1270),i=r(248),l=r(4590),d=r(6795),c=r(8033),u=r(8994),f=r(8009),m=r(4353);r(8792);var p=r(6295),b=r(7948),h=r(1515),x=r(3107),v=r(7907),g=r(146),y=r(4273);let w=i.z.object({email:i.z.string().email({message:"Your email is invalid."}),password:i.z.string().min(4)});var N=()=>{let e=(0,v.useRouter)(),[t,r]=s.useState(!1),[i,N]=s.useState("password"),[j,S]=s.useState(""),k=(0,h.a)("(max-width: 1530px)"),{register:I,handleSubmit:C,formState:{errors:Z}}=(0,o.cI)({resolver:(0,n.F)(w),mode:"all"}),E=async t=>{try{r(!0),S("");let a=await x.Z.post("".concat("https://api.bharatniveshyatra.com","/api/users/login"),t);if(200===a.status){f.ZP.success("Login Successful"),g.Z.set("authToken",a.data.token);let t=JSON.stringify(a.data.permissions);localStorage.setItem("userEmail",a.data.email),localStorage.setItem("userId",a.data.id),localStorage.setItem("userName",a.data.userName),localStorage.setItem("userRole",a.data.role),localStorage.setItem("userPermissions",t),r(!1),t.includes("analytics:read")?e.push("/dashboard"):t.includes("bnyGeneral:read")?e.push("/user-details"):t.includes("users:read")?e.push("/users"):e.push("/error-page/401")}}catch(t){if(r(!1),409===t.response.status){S("Invalid email or password. Please try again."),f.ZP.error("Invalid email or password");return}(0,y.Z)(t,e)}},P=async()=>{let t=g.Z.get("authToken");if(t)try{let r=await x.Z.get("".concat("https://api.bharatniveshyatra.com","/api/users/authenticate"),{headers:{"x-auth-token":t}});200===r.status&&e.push("/dashboard")}catch(t){(0,y.Z)(t,e)}else e.push("/auth/login")};return(0,s.useEffect)(()=>{P()},[]),(0,a.jsxs)("div",{className:"w-full py-10",children:[(0,a.jsx)(p.gA,{className:"text-primary",width:"400px",height:"50px"}),(0,a.jsx)("div",{className:"xl:mt-8 mt-6 xl:text-xl text-xl font-bold text-default-900"}),(0,a.jsxs)("form",{onSubmit:C(E),className:"mt-5 2xl:mt-7",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)(c._,{htmlFor:"email",className:"mb-2 font-medium text-default-600",children:["Email"," "]}),(0,a.jsx)(d.I,{disabled:t,...I("email"),type:"email",id:"email",className:(0,m.cn)("",{"border-destructive":Z.email}),placeholder:"Enter your email",size:k?"lg":"xl"})]}),Z.email&&(0,a.jsx)("div",{className:" text-destructive mt-2",children:Z.email.message}),(0,a.jsxs)("div",{className:"mt-3.5",children:[(0,a.jsxs)(c._,{htmlFor:"password",className:"mb-2 font-medium text-default-600",children:["Password"," "]}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)(d.I,{disabled:t,...I("password"),type:i,id:"password",className:"peer ",size:k?"lg":"xl",placeholder:"Enter your password"}),(0,a.jsx)("div",{role:"button",className:"absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer",onClick:()=>{"text"===i?N("password"):"password"===i&&N("text")},children:"password"===i?(0,a.jsx)(b.JO,{icon:"heroicons:eye",className:"w-5 h-5 text-default-400"}):(0,a.jsx)(b.JO,{icon:"heroicons:eye-slash",className:"w-5 h-5 text-default-400"})})]})]}),Z.password&&(0,a.jsx)("div",{className:" text-destructive mt-2",children:Z.password.message}),(0,a.jsx)("div",{className:"mt-5 flex flex-wrap gap-2"}),j&&(0,a.jsx)("div",{className:"text-destructive mt-3 mb-3  text-center",children:j}),(0,a.jsxs)(l.z,{className:"w-full",disabled:t,size:k?"md":"lg",children:[t&&(0,a.jsx)(u.Z,{className:"mr-2 h-4 w-4 animate-spin"}),t?"Loading...":"Sign In"]})]})]})},j=()=>(0,a.jsx)("div",{className:"min-h-screen bg-background  flex items-center  overflow-hidden w-full",children:(0,a.jsx)("div",{className:"min-h-screen basis-full flex flex-wrap w-full  justify-center overflow-y-auto",children:(0,a.jsx)("div",{className:" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center",children:(0,a.jsx)("div",{className:"lg:w-[480px] ",children:(0,a.jsx)(N,{})})})})})},6795:function(e,t,r){"use strict";r.d(t,{I:function(){return l}});var a=r(7437),s=r(2265),o=r(7742),n=r(4353);let i=(0,o.j)(" w-full   bg-background  border-default-300 dark:border-700  px-3 h-9   text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium  read-only:leading-9 read-only:bg-background  disabled:cursor-not-allowed disabled:opacity-50  transition duration-300 ",{variants:{color:{default:"border-default-300 text-default-500 focus:outline-none focus:border-primary disabled:bg-default-200  placeholder:text-primary-500",primary:"border-primary text-primary focus:outline-none focus:border-primary-700 disabled:bg-primary/30 disabled:placeholder:text-primary  placeholder:text-primary",info:"border-info/50 text-info focus:outline-none focus:border-info-700 disabled:bg-info/30 disabled:placeholder:text-info  placeholder:text-info/70",warning:"border-warning/50 text-warning focus:outline-none focus:border-warning-700 disabled:bg-warning/30 disabled:placeholder:text-info  placeholder:text-warning/70",success:"border-success/50 text-success focus:outline-none focus:border-success-700 disabled:bg-success/30 disabled:placeholder:text-info  placeholder:text-success/70",destructive:"border-destructive/50 text-destructive focus:outline-none focus:border-destructive-700 disabled:bg-destructive/30 disabled:placeholder:text-destructive  placeholder:text-destructive/70"},variant:{flat:"bg-default-100 read-only:bg-default-100",underline:"border-b",bordered:"border  ",faded:"border border-default-300 bg-default-100",ghost:"border-0 focus:border","flat-underline":"bg-default-100 border-b"},shadow:{none:"",sm:"shadow-sm",md:"shadow-md",lg:"shadow-lg",xl:"shadow-xl","2xl":"shadow-2xl"},radius:{none:"rounded-none",sm:"rounded",md:"rounded-lg",lg:"rounded-xl",xl:"rounded-[20px]"},size:{sm:"h-8 text-xs read-only:leading-8",md:"h-9 text-xs read-only:leading-9",lg:"h-10 text-sm read-only:leading-10",xl:"h-12 text-base read-only:leading-[48px]"}},compoundVariants:[{variant:"flat",color:"primary",className:"bg-primary/10 read-only:bg-primary/10"},{variant:"flat",color:"info",className:"bg-info/10 read-only:bg-info/10"},{variant:"flat",color:"warning",className:"bg-warning/10 read-only:bg-warning/10"},{variant:"flat",color:"success",className:"bg-success/10 read-only:bg-success/10"},{variant:"flat",color:"destructive",className:"bg-destructive/10 read-only:bg-destructive/10"},{variant:"faded",color:"primary",className:"bg-primary/10 border-primary/30 read-only:bg-primary/10 border-primary/30"},{variant:"faded",color:"info",className:"bg-info/10 border-info/30"},{variant:"faded",color:"warning",className:"bg-warning/10 border-warning/30"},{variant:"faded",color:"success",className:"bg-success/10 border-success/30"},{variant:"faded",color:"destructive",className:"bg-destructive/10 border-destructive/30"}],defaultVariants:{color:"default",size:"md",variant:"bordered",radius:"md"}}),l=s.forwardRef((e,t)=>{let{className:r,type:s,size:o,color:l,radius:d,variant:c,shadow:u,removeWrapper:f=!1,...m}=e;return f?(0,a.jsx)("input",{type:s,className:(0,n.cn)(i({color:l,size:o,radius:d,variant:c,shadow:u}),r),ref:t,...m}):(0,a.jsx)("div",{className:"flex-1 w-full",children:(0,a.jsx)("input",{type:s,className:(0,n.cn)(i({color:l,size:o,radius:d,variant:c,shadow:u}),r),ref:t,...m})})});l.displayName="Input"},8033:function(e,t,r){"use strict";r.d(t,{_:function(){return d}});var a=r(7437),s=r(2265),o=r(4602),n=r(7742),i=r(4353);let l=(0,n.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50   inline-block "),d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,a.jsx)(o.f,{ref:t,className:(0,i.cn)(l(),r),...s})});d.displayName=o.f.displayName},1515:function(e,t,r){"use strict";r.d(t,{a:function(){return s}});var a=r(2265);function s(e){let[t,r]=a.useState(!1);return a.useEffect(()=>{function t(e){r(e.matches)}let a=matchMedia(e);return a.addEventListener("change",t),r(a.matches),()=>a.removeEventListener("change",t)},[e]),t}},8994:function(e,t,r){"use strict";r.d(t,{Z:function(){return a}});let a=(0,r(7461).Z)("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},8792:function(e,t,r){"use strict";r.d(t,{default:function(){return s.a}});var a=r(5250),s=r.n(a)},2671:function(e,t){"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=Symbol.for("react.element"),a=(Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.memo"),Symbol.for("react.lazy"),{isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}}),s=Object.assign,o={};function n(e,t,r){this.props=e,this.context=t,this.refs=o,this.updater=r||a}function i(){}function l(e,t,r){this.props=e,this.context=t,this.refs=o,this.updater=r||a}n.prototype.isReactComponent={},n.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},n.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},i.prototype=n.prototype;var d=l.prototype=new i;d.constructor=l,s(d,n.prototype),d.isPureReactComponent=!0;var c=Object.prototype.hasOwnProperty,u={key:!0,ref:!0,__self:!0,__source:!0};t.createElement=function(e,t,a){var s,o={},n=null,i=null;if(null!=t)for(s in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(n=""+t.key),t)c.call(t,s)&&!u.hasOwnProperty(s)&&(o[s]=t[s]);var l=arguments.length-2;if(1===l)o.children=a;else if(1<l){for(var d=Array(l),f=0;f<l;f++)d[f]=arguments[f+2];o.children=d}if(e&&e.defaultProps)for(s in l=e.defaultProps)void 0===o[s]&&(o[s]=l[s]);return{$$typeof:r,type:e,key:n,ref:i,props:o,_owner:null}}},2846:function(e,t,r){"use strict";e.exports=r(2671)},4273:function(e,t,r){"use strict";var a=r(146),s=r(8009);t.Z=(e,t)=>{var r,o,n;console.error(e),(null==e?void 0:null===(r=e.response)||void 0===r?void 0:r.status)===401?(a.Z.remove("authToken"),t.push("/error-page/401")):(null==e?void 0:null===(o=e.response)||void 0===o?void 0:o.status)===400?(a.Z.remove("authToken"),t.push("/auth/login")):(null==e?void 0:null===(n=e.response)||void 0===n?void 0:n.status)===500&&s.ZP.error("Something went wrong. Please try again later")}},9586:function(e,t,r){"use strict";r.d(t,{WV:function(){return i},jH:function(){return l}});var a=r(2265),s=r(4887),o=r(9143),n=r(7437),i=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"].reduce((e,t)=>{let r=a.forwardRef((e,r)=>{let{asChild:a,...s}=e,i=a?o.g7:t;return"undefined"!=typeof window&&(window[Symbol.for("radix-ui")]=!0),(0,n.jsx)(i,{...s,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function l(e,t){e&&s.flushSync(()=>e.dispatchEvent(t))}},146:function(e,t,r){"use strict";/*! js-cookie v3.0.5 | MIT */function a(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)e[a]=r[a]}return e}r.d(t,{Z:function(){return s}});var s=function e(t,r){function s(e,s,o){if("undefined"!=typeof document){"number"==typeof(o=a({},r,o)).expires&&(o.expires=new Date(Date.now()+864e5*o.expires)),o.expires&&(o.expires=o.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var n="";for(var i in o)o[i]&&(n+="; "+i,!0!==o[i]&&(n+="="+o[i].split(";")[0]));return document.cookie=e+"="+t.write(s,e)+n}}return Object.create({set:s,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var r=document.cookie?document.cookie.split("; "):[],a={},s=0;s<r.length;s++){var o=r[s].split("="),n=o.slice(1).join("=");try{var i=decodeURIComponent(o[0]);if(a[i]=t.read(n,i),e===i)break}catch(e){}}return e?a[e]:a}},remove:function(e,t){s(e,"",a({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,a({},this.attributes,t))},withConverter:function(t){return e(a({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}}]);