(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},9391:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>l.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>n});var a=t(482),r=t(9108),i=t(2563),l=t.n(i),o=t(8300),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(s,d);let n=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,2115)),"D:\\Cactus-Creatives\\amfi-bny\\analytics-frontend\\DashTail-starter-v1.3.0\\dash-tail-starter-kit\\app\\page.jsx"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,2666)),"D:\\Cactus-Creatives\\amfi-bny\\analytics-frontend\\DashTail-starter-v1.3.0\\dash-tail-starter-kit\\app\\layout.jsx"],error:[()=>Promise.resolve().then(t.bind(t,826)),"D:\\Cactus-Creatives\\amfi-bny\\analytics-frontend\\DashTail-starter-v1.3.0\\dash-tail-starter-kit\\app\\error.js"],"not-found":[()=>Promise.resolve().then(t.bind(t,6178)),"D:\\Cactus-Creatives\\amfi-bny\\analytics-frontend\\DashTail-starter-v1.3.0\\dash-tail-starter-kit\\app\\not-found.js"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["D:\\Cactus-Creatives\\amfi-bny\\analytics-frontend\\DashTail-starter-v1.3.0\\dash-tail-starter-kit\\app\\page.jsx"],u="/page",m={require:t,loadChunk:()=>Promise.resolve()},p=new a.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:n}})},7341:(e,s,t)=>{Promise.resolve().then(t.bind(t,194))},194:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>q});var a=t(5344),r=t(3729),i=t.n(r),l=t(708),o=t(5453),d=t(9709),n=t(9704),c=t(800),u=t(4806),m=t(2739),p=t(4669),x=t(9127);t(6506);var f=t(307),b=t(4501),h=t(7568),g=t(7665),v=t(8428),y=t(8014),w=t(9668);let j=d.z.object({email:d.z.string().email({message:"Your email is invalid."}),password:d.z.string().min(4)}),N=()=>{let e=(0,v.useRouter)(),[s,t]=i().useState(!1),[d,N]=i().useState("password"),[q,P]=i().useState(""),_=(0,h.a)("(max-width: 1530px)"),{register:k,handleSubmit:C,formState:{errors:I}}=(0,l.cI)({resolver:(0,o.F)(j),mode:"all"}),S=async s=>{try{t(!0),P("");let a=await g.Z.post("https://api.bharatniveshyatra.com/api/users/login",s);if(200===a.status){p.ZP.success("Login Successful"),y.Z.set("authToken",a.data.token);let s=JSON.stringify(a.data.permissions);localStorage.setItem("userEmail",a.data.email),localStorage.setItem("userId",a.data.id),localStorage.setItem("userName",a.data.userName),localStorage.setItem("userRole",a.data.role),localStorage.setItem("userPermissions",s),t(!1),s.includes("analytics:read")?e.push("/dashboard"):s.includes("bnyGeneral:read")?e.push("/user-details"):s.includes("users:read")?e.push("/users"):e.push("/error-page/401")}}catch(s){if(t(!1),409===s.response.status){P("Invalid email or password. Please try again."),p.ZP.error("Invalid email or password");return}(0,w.Z)(s,e)}},D=async()=>{let s=y.Z.get("authToken");if(s)try{let t=await g.Z.get("https://api.bharatniveshyatra.com/api/users/authenticate",{headers:{"x-auth-token":s}});200===t.status&&e.push("/dashboard")}catch(s){(0,w.Z)(s,e)}else e.push("/auth/login")};return(0,r.useEffect)(()=>{D()},[]),(0,a.jsxs)("div",{className:"w-full py-10",children:[a.jsx(f.gA,{className:"text-primary",width:"400px",height:"50px"}),a.jsx("div",{className:"xl:mt-8 mt-6 xl:text-xl text-xl font-bold text-default-900"}),(0,a.jsxs)("form",{onSubmit:C(S),className:"mt-5 2xl:mt-7",children:[(0,a.jsxs)("div",{children:[(0,a.jsxs)(u._,{htmlFor:"email",className:"mb-2 font-medium text-default-600",children:["Email"," "]}),a.jsx(c.I,{disabled:s,...k("email"),type:"email",id:"email",className:(0,x.cn)("",{"border-destructive":I.email}),placeholder:"Enter your email",size:_?"lg":"xl"})]}),I.email&&a.jsx("div",{className:" text-destructive mt-2",children:I.email.message}),(0,a.jsxs)("div",{className:"mt-3.5",children:[(0,a.jsxs)(u._,{htmlFor:"password",className:"mb-2 font-medium text-default-600",children:["Password"," "]}),(0,a.jsxs)("div",{className:"relative",children:[a.jsx(c.I,{disabled:s,...k("password"),type:d,id:"password",className:"peer ",size:_?"lg":"xl",placeholder:"Enter your password"}),a.jsx("div",{role:"button",className:"absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer",onClick:()=>{"text"===d?N("password"):"password"===d&&N("text")},children:"password"===d?a.jsx(b.JO,{icon:"heroicons:eye",className:"w-5 h-5 text-default-400"}):a.jsx(b.JO,{icon:"heroicons:eye-slash",className:"w-5 h-5 text-default-400"})})]})]}),I.password&&a.jsx("div",{className:" text-destructive mt-2",children:I.password.message}),a.jsx("div",{className:"mt-5 flex flex-wrap gap-2"}),q&&a.jsx("div",{className:"text-destructive mt-3 mb-3  text-center",children:q}),(0,a.jsxs)(n.z,{className:"w-full",disabled:s,size:_?"md":"lg",children:[s&&a.jsx(m.Z,{className:"mr-2 h-4 w-4 animate-spin"}),s?"Loading...":"Sign In"]})]})]})},q=()=>a.jsx("div",{className:"min-h-screen bg-background  flex items-center  overflow-hidden w-full",children:a.jsx("div",{className:"min-h-screen basis-full flex flex-wrap w-full  justify-center overflow-y-auto",children:a.jsx("div",{className:" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center",children:a.jsx("div",{className:"lg:w-[480px] ",children:a.jsx(N,{})})})})})},800:(e,s,t)=>{"use strict";t.d(s,{I:()=>d});var a=t(5344),r=t(3729),i=t(8720),l=t(9127);let o=(0,i.j)(" w-full   bg-background  border-default-300 dark:border-700  px-3 h-9   text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium  read-only:leading-9 read-only:bg-background  disabled:cursor-not-allowed disabled:opacity-50  transition duration-300 ",{variants:{color:{default:"border-default-300 text-default-500 focus:outline-none focus:border-primary disabled:bg-default-200  placeholder:text-primary-500",primary:"border-primary text-primary focus:outline-none focus:border-primary-700 disabled:bg-primary/30 disabled:placeholder:text-primary  placeholder:text-primary",info:"border-info/50 text-info focus:outline-none focus:border-info-700 disabled:bg-info/30 disabled:placeholder:text-info  placeholder:text-info/70",warning:"border-warning/50 text-warning focus:outline-none focus:border-warning-700 disabled:bg-warning/30 disabled:placeholder:text-info  placeholder:text-warning/70",success:"border-success/50 text-success focus:outline-none focus:border-success-700 disabled:bg-success/30 disabled:placeholder:text-info  placeholder:text-success/70",destructive:"border-destructive/50 text-destructive focus:outline-none focus:border-destructive-700 disabled:bg-destructive/30 disabled:placeholder:text-destructive  placeholder:text-destructive/70"},variant:{flat:"bg-default-100 read-only:bg-default-100",underline:"border-b",bordered:"border  ",faded:"border border-default-300 bg-default-100",ghost:"border-0 focus:border","flat-underline":"bg-default-100 border-b"},shadow:{none:"",sm:"shadow-sm",md:"shadow-md",lg:"shadow-lg",xl:"shadow-xl","2xl":"shadow-2xl"},radius:{none:"rounded-none",sm:"rounded",md:"rounded-lg",lg:"rounded-xl",xl:"rounded-[20px]"},size:{sm:"h-8 text-xs read-only:leading-8",md:"h-9 text-xs read-only:leading-9",lg:"h-10 text-sm read-only:leading-10",xl:"h-12 text-base read-only:leading-[48px]"}},compoundVariants:[{variant:"flat",color:"primary",className:"bg-primary/10 read-only:bg-primary/10"},{variant:"flat",color:"info",className:"bg-info/10 read-only:bg-info/10"},{variant:"flat",color:"warning",className:"bg-warning/10 read-only:bg-warning/10"},{variant:"flat",color:"success",className:"bg-success/10 read-only:bg-success/10"},{variant:"flat",color:"destructive",className:"bg-destructive/10 read-only:bg-destructive/10"},{variant:"faded",color:"primary",className:"bg-primary/10 border-primary/30 read-only:bg-primary/10 border-primary/30"},{variant:"faded",color:"info",className:"bg-info/10 border-info/30"},{variant:"faded",color:"warning",className:"bg-warning/10 border-warning/30"},{variant:"faded",color:"success",className:"bg-success/10 border-success/30"},{variant:"faded",color:"destructive",className:"bg-destructive/10 border-destructive/30"}],defaultVariants:{color:"default",size:"md",variant:"bordered",radius:"md"}}),d=r.forwardRef(({className:e,type:s,size:t,color:r,radius:i,variant:d,shadow:n,removeWrapper:c=!1,...u},m)=>c?a.jsx("input",{type:s,className:(0,l.cn)(o({color:r,size:t,radius:i,variant:d,shadow:n}),e),ref:m,...u}):a.jsx("div",{className:"flex-1 w-full",children:a.jsx("input",{type:s,className:(0,l.cn)(o({color:r,size:t,radius:i,variant:d,shadow:n}),e),ref:m,...u})}));d.displayName="Input"},4806:(e,s,t)=>{"use strict";t.d(s,{_:()=>n});var a=t(5344),r=t(3729),i=t(4217),l=t(8720),o=t(9127);let d=(0,l.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50   inline-block "),n=r.forwardRef(({className:e,...s},t)=>a.jsx(i.f,{ref:t,className:(0,o.cn)(d(),e),...s}));n.displayName=i.f.displayName},6506:(e,s,t)=>{"use strict";t.d(s,{default:()=>r.a});var a=t(1476),r=t.n(a)},7500:(e,s,t)=>{"use strict";t.r(s),t.d(s,{$$typeof:()=>i,__esModule:()=>r,default:()=>l});let a=(0,t(6843).createProxy)(String.raw`D:\Cactus-Creatives\amfi-bny\analytics-frontend\DashTail-starter-v1.3.0\dash-tail-starter-kit\app\auth\(login)\login\page.jsx`),{__esModule:r,$$typeof:i}=a,l=a.default},2115:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>i});var a=t(5036),r=t(7500);let i=async()=>a.jsx(r.default,{})}};var s=require("../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[638,643,213,967,987,290],()=>t(9391));module.exports=a})();