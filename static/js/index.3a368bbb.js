!function(){"use strict";var e,t,i,n,r,o,s,a={26:function(e,t,i){let n;var r=i(893),o=i(745),s=i(294),a=i(862),l=i(70);let c=({children:e,backgroundColor:t="white",theme:i="light"})=>(0,r.jsxs)("div",{style:{overflow:"hidden"},children:[(0,r.jsx)("style",{children:".sp-wrapper { flex: 1 }"}),(0,r.jsx)(l.X,{direction:"horizontal",children:(0,r.jsx)(a.oT,{template:"react",files:{"/App.js":e},theme:i,children:(0,r.jsx)("span",{style:{"--sp-colors-surface1":t},children:(0,r.jsx)(a.Pw,{})})})})]}),d=({children:e,backgroundColor:t="white",theme:i="light"})=>(0,r.jsxs)("div",{style:{overflow:"hidden"},children:[(0,r.jsx)("style",{children:`.sp-stack.sp-preview { height: auto; }
    .sp-code-editor { overflow: initial; }
    .sp-layout { background-color: ${t}; }
    .cm-editor .cm-scroller { overflow-x: initial; }`}),(0,r.jsx)(a.oT,{template:"react",files:{"/App.js":e},theme:i,customSetup:{dependencies:{"react-native-web":"latest","responsive-react-native":"latest",mobx:"latest"}},children:(0,r.jsxs)(a.sp,{children:[(0,r.jsx)("div",{style:{overflow:"hidden","--sp-colors-surface1":t},children:(0,r.jsx)(l.X,{direction:"horizontal",children:(0,r.jsx)(a._V,{})})}),(0,r.jsx)(a.Gj,{})]})})]}),{styled:h,css:p,globalCss:u,keyframes:g,getCssText:m,theme:f,createTheme:x,config:y}=(0,i(98).Th)({theme:{color:{gray:"lightgray",codeBackground:"#EFEFEF",white:"white",highlight:"#82D9FF",interact:"#FF85FA"},space:{small:"10px",medium:"20px",large:"40px",huge:"80px"}},media:{phone:"(max-width: 500px)",tablet:"(max-width: 1000px)",desktop:"(min-width: 1000px)",widescreen:"(min-width: 1500px)"},utils:{marginX:e=>({marginLeft:e,marginRight:e})}}),v=h("div",{display:"grid",gridTemplateColumns:`minmax(${f.space.medium}, 1fr) minmax(0, 1000px) minmax(${f.space.medium}, 1fr)`,variants:{size:{wide:{gridTemplateColumns:"minmax(20px, 1fr) minmax(0, 1200px) minmax(20px, 1fr)"},ultrawide:{gridTemplateColumns:"minmax(20px, 1fr) minmax(0, 1400px) minmax(20px, 1fr)"}}}}),b=h("div",{display:"grid",gridColumn:"2",gap:f.space.medium}),w=({children:e,css:t,size:i})=>(0,r.jsx)(v,{size:i,children:(0,r.jsx)(b,{css:t,children:e})}),j=h("h2",{fontFamily:"sans-serif",margin:0}),k=h("p",{fontFamily:"sans-serif",lineHeight:"130%",margin:0}),C=h("span",{fontFamily:"monospace",fontSize:"110%",background:f.color.codeBackground,padding:2,borderRadius:4}),S=h("span",{color:f.color.highlight,fontWeight:"bold"}),F=h("a",{outline:"none",textDecoration:"none",background:"-webkit-linear-gradient(0deg, #FF85FA, #82D9FF)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent","&:hover,&:focus":{background:"-webkit-linear-gradient(180deg, #FF85FA, #82D9FF)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"},variants:{color:{black:{color:"black",background:"none","-webkit-background-clip":"initial","-webkit-text-fill-color":"initial","&:hover,&:focus":{fontWeight:"bold",color:f.color.highlight,background:"none","-webkit-background-clip":"initial","-webkit-text-fill-color":"initial"}}}}}),V=h("a",{fontFamily:"sans-serif",color:"black",textDecoration:"none",outline:"none","&:hover,&:focus":{background:"-webkit-linear-gradient(0deg, #FF85FA, #82D9FF)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"}}),T=h("a",{textDecoration:"none"}),B=h("p",{fontFamily:"sans-serif",color:"black",fontWeight:"bold"}),A=h("footer",{display:"flex",marginTop:f.space.huge,marginBottom:f.space.huge,gap:f.space.medium}),R=h("div",{display:"flex",flexBasis:"25%",alignItems:"flex-start",flexDirection:"column",gap:f.space.small,"@tablet":{flexBasis:"50%"}}),I=()=>(0,r.jsx)(w,{children:(0,r.jsxs)(A,{children:[(0,r.jsxs)(R,{children:[(0,r.jsx)(B,{children:"Documentation"}),(0,r.jsx)(V,{onClick:e=>eZ(e,"getting-started"),href:"/getting-started",children:"Getting Started"}),(0,r.jsx)(V,{onClick:e=>eZ(e,"features"),href:"/features",children:"Features"}),(0,r.jsx)(V,{onClick:e=>eZ(e,"styled"),href:"/styled",children:"Styled API"}),(0,r.jsx)(V,{onClick:e=>eZ(e,"configuration"),href:"/configuration",children:"Configuration"})]}),(0,r.jsxs)(R,{children:[(0,r.jsx)(B,{children:"Links"}),(0,r.jsx)(V,{href:"https://github.com/tobua/responsive-react-native",children:"GitHub"}),(0,r.jsx)(V,{href:"https://npmjs.com/responsive-react-native",children:"npm"})]})]})}),H=h("div",{position:"relative",width:"100%",overflow:"hidden"}),O=h("main",{display:"flex",flexDirection:"column",alignItems:"center",background:"linear-gradient(#FF85FA, #82D9FF)",height:"100vh",paddingTop:f.space.medium,"@tablet":{height:"auto",paddingBottom:f.space.huge,marginBottom:f.space.large},variants:{type:{code:{height:180,"@tablet":{height:160,marginBottom:0,paddingBottom:0}}}}}),z=h("div",{background:"white",width:"120vw",height:200,transform:"rotate(-5deg)",position:"absolute",top:"93vh",left:"-5vw","@desktop":{transform:"rotate(-3deg)"},"@widescreen":{transform:"rotate(-2deg)"},"@tablet":{top:"initial",bottom:"-2vh",height:100,transform:"rotate(-3deg)"},variants:{type:{code:{top:"70%","@tablet":{top:"80%"}}}}}),D=h("h1",{color:"white",fontFamily:"Roboto Serif, serif",margin:0,padding:0,gridColumn:"1 / 3",marginTop:f.space.medium}),W=({type:e="code",children:t})=>"intro"===e?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(H,{children:[(0,r.jsx)(O,{children:t}),(0,r.jsx)(z,{})]})}):(0,r.jsxs)(H,{children:[(0,r.jsxs)(O,{type:e,children:[(0,r.jsx)(F,{onClick:e=>eZ(e,""),color:"black",css:{fontFamily:"sans-serif"},href:"/responsive-react-native",children:"Home"}),(0,r.jsx)(D,{children:t})]}),(0,r.jsx)(z,{type:e})]}),E=h("div",{display:"flex",justifyContent:"flex-end",marginTop:f.space.large}),L=h("footer",{display:"flex",flexDirection:"column",background:"rgba(255, 133, 250, 0.3)",gap:f.space.small,padding:f.space.medium}),M=h("p",{margin:0,fontFamily:"sans-serif"}),P=h("div",{fontSize:24,fontWeight:"bold",fontFamily:"sans-serif"}),q=({name:e,href:t})=>(0,r.jsx)(E,{children:(0,r.jsxs)(L,{children:[(0,r.jsx)(M,{children:"Continue Reading"}),(0,r.jsx)(V,{onClick:e=>eZ(e,t.replace("/","")),href:t,children:(0,r.jsx)(P,{children:e})})]})}),N=h("a",{display:"flex",gap:f.space.large,textDecoration:"none",color:"black",marginTop:f.space.large}),Z=h("blockquote",{fontFamily:"sans-serif",display:"flex",alignItems:"center",gap:f.space.small,margin:0,marginBottom:f.space.small}),$=h("cite",{fontFamily:"sans-serif"}),_=h("span",{fontFamily:"sans-serif",fontSize:28,fontWeight:"bold",color:f.color.highlight}),G=()=>(0,r.jsx)(w,{css:{justifyContent:"center"},children:(0,r.jsxs)(N,{href:"https://onwebfocus.com/styled",children:[(0,r.jsx)("img",{width:80,height:80,src:"/onwebfocus.png",alt:"Article in onbwefocus.com blog."}),(0,r.jsxs)("div",{children:[(0,r.jsxs)(Z,{cite:"https://onwebfocus.com/styled",children:[(0,r.jsx)(_,{children:'"'}),"This plugin however goes much further while still being simpler.",(0,r.jsx)(_,{children:'"'})]}),(0,r.jsx)($,{children:"onwebfocus.com Blog"})]})]})}),U=h("div",{display:"flex",justifyContent:"center",alignItems:"center",gap:f.space.medium,gridColumn:"1 / 3","@tablet":{gridColumn:"initial"},"@phone":{flexWrap:"wrap"}}),X=h("a",{textDecoration:"none",fontFamily:"sans-serif",color:f.color.white,padding:f.space.small,whiteSpace:"nowrap",borderRadius:10,border:"3px solid white","&:hover":{background:"-webkit-linear-gradient(90deg, #FF85FA, #82D9FF)"},variants:{style:{full:{background:f.color.white,color:"black",mixBlendMode:"lighten","&:hover":{color:f.color.white,mixBlendMode:"normal"}}}}}),J=()=>(0,r.jsxs)(U,{children:[(0,r.jsx)(X,{onClick:e=>eZ(e,"getting-started"),style:"full",href:"/responsive-react-native/getting-started",children:"Getting Started"}),(0,r.jsx)(X,{href:"https://github.com/tobua/responsive-react-native",children:"GitHub"}),(0,r.jsx)(X,{href:"#styled",children:"↓ Styled API"})]}),Q=({size:e=100,color:t="white"})=>(0,r.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M3.5 20V90C3.5 94.1421 6.85786 97.5 11 97.5H72C76.1421 97.5 79.5 94.1421 79.5 90V20C79.5 15.8579 76.1421 12.5 72 12.5H11C6.85786 12.5 3.5 15.8579 3.5 20Z",stroke:t,strokeWidth:"5"}),(0,r.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M45 15H50V8C50 6.34315 51.3431 5 53 5H92C93.6569 5 95 6.34315 95 8V60C95 61.6569 93.6569 63 92 63H77V68H92C96.4183 68 100 64.4183 100 60V8C100 3.58173 96.4183 0 92 0H53C48.5817 0 45 3.58172 45 8V15Z",fill:t})]}),Y=({size:e=100,color:t="white"})=>(0,r.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H90C94.1421 97.5 97.5 94.1421 97.5 90V10C97.5 5.85786 94.1421 2.5 90 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z",stroke:t,strokeWidth:"5"}),(0,r.jsx)("path",{d:"M16.5 81.6396C16.5 83.0203 17.6193 84.1396 19 84.1396H41.5C42.8807 84.1396 44 83.0203 44 81.6396C44 80.2589 42.8807 79.1396 41.5 79.1396H21.5V59.1396C21.5 57.7589 20.3807 56.6396 19 56.6396C17.6193 56.6396 16.5 57.7589 16.5 59.1396V81.6396ZM85.1396 18C85.1396 16.6193 84.0203 15.5 82.6396 15.5L60.1396 15.5C58.7589 15.5 57.6396 16.6193 57.6396 18C57.6396 19.3807 58.7589 20.5 60.1396 20.5H80.1396V40.5C80.1396 41.8807 81.2589 43 82.6396 43C84.0203 43 85.1396 41.8807 85.1396 40.5L85.1396 18ZM20.7678 83.4074L84.4074 19.7677L80.8718 16.2322L17.2322 79.8718L20.7678 83.4074Z",fill:t})]}),K=({size:e=100,color:t="white"})=>(0,r.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H90C94.1421 97.5 97.5 94.1421 97.5 90V10C97.5 5.85786 94.1421 2.5 90 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z",stroke:t,strokeWidth:"5"}),(0,r.jsx)("line",{x1:"21.2695",y1:"40.2604",x2:"42.4827",y2:"61.4736",stroke:t,strokeWidth:"5",strokeLinecap:"round"}),(0,r.jsx)("line",{x1:"20.734",y1:"61.4736",x2:"41.9472",y2:"40.2604",stroke:t,strokeWidth:"5",strokeLinecap:"round"}),(0,r.jsx)("circle",{cx:"70",cy:"50",r:"12.5",stroke:t,strokeWidth:"5"})]}),ee=({size:e=100,color:t="white"})=>(0,r.jsxs)("svg",{width:e,height:e,viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M3.5 10V90C3.5 94.1421 6.85786 97.5 11 97.5H52C56.1421 97.5 59.5 94.1421 59.5 90V10C59.5 5.85786 56.1421 2.5 52 2.5H11C6.85786 2.5 3.5 5.85787 3.5 10Z",stroke:t,strokeWidth:"5"}),(0,r.jsx)("path",{d:"M71.5 10V90C71.5 94.1421 74.8579 97.5 79 97.5H88C92.1421 97.5 95.5 94.1421 95.5 90V10C95.5 5.85786 92.1421 2.5 88 2.5H79C74.8579 2.5 71.5 5.85787 71.5 10Z",stroke:t,strokeWidth:"5"})]}),et=h("div",{display:"grid",gridTemplateColumns:"1fr 1fr",gap:f.space.large,alignItems:"center",marginBottom:f.space.huge,"@phone":{gridTemplateColumns:"1fr"}}),ei=h("div",{gridColumn:"1 / 2",display:"flex",flexDirection:"column",height:"100%",overflow:"hidden","@phone":{gridColumn:"initial"},variants:{position:{center:{justifyContent:"center"}}}}),en=h("div",{gridColumn:"2 / 3",display:"flex",flexDirection:"column",height:"100%",overflow:"hidden","@phone":{gridColumn:"initial"},variants:{position:{center:{justifyContent:"center"}}}}),er=h("div",{display:"flex",alignItems:"center",gap:f.space.medium,marginBottom:f.space.large}),eo=h("div",{fontSize:24,fontWeight:"bold",fontFamily:"sans-serif"}),es=h("div",{fontFamily:"sans-serif",fontSize:"16px",lineHeight:"24px"}),ea=h("span",{backgroundColor:"#EFEFEF",fontFamily:"monospace",padding:2,borderRadius:3}),el=()=>(0,r.jsx)(w,{children:(0,r.jsxs)(et,{children:[(0,r.jsxs)(ei,{children:[(0,r.jsxs)(er,{children:[(0,r.jsx)(Q,{size:40,color:"black"}),(0,r.jsx)(eo,{children:"Responsive StyleSheet"})]}),(0,r.jsxs)(es,{children:["By default the ",(0,r.jsx)(ea,{children:"createStyles"})," method can replace any call to the default React Native"," ",(0,r.jsx)(ea,{children:"StyleSheet.create"}),"."]})]}),(0,r.jsx)(en,{children:(0,r.jsx)(c,{backgroundColor:"#EFEFEF",children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    width: 200,
    padding: 10,
  },
})

export default () => <View style={styles.view} />`})})]})}),ec=()=>(0,r.jsx)(w,{children:(0,r.jsxs)(et,{children:[(0,r.jsx)(ei,{position:"center",children:(0,r.jsx)(c,{backgroundColor:"#EFEFEF",children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    width: 200,
    // =>
    // 200px at 420px viewport.
    // 150px at 320px viewport.
    // 250px at 520px viewport.
    padding: 10,
    flex: 1 // Unscaleable property, will be ignored.
  },
})

export default () => <View style={styles.view} />`})}),(0,r.jsxs)(en,{children:[(0,r.jsxs)(er,{children:[(0,r.jsx)(Y,{size:40,color:"black"}),(0,r.jsx)(eo,{children:"Scaled Values"})]}),(0,r.jsx)(es,{children:"Any size property will be linearly scaled depending on the current viewport size."}),(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",height:300,position:"relative"},children:(0,r.jsx)("img",{style:{maxHeight:"100%"},src:"scale.svg",alt:"Illustration of responsive scaling."})})]})]})}),ed=()=>(0,r.jsx)(w,{children:(0,r.jsxs)(et,{children:[(0,r.jsxs)(ei,{children:[(0,r.jsxs)(er,{children:[(0,r.jsx)(K,{size:40,color:"black"}),(0,r.jsx)(eo,{children:"Adaptive Values"})]}),(0,r.jsx)(es,{children:"Using a special syntax different values can be used depending on breakpoint, orientation or platform. All (??) values will still be scaled to match the current viewport size."}),(0,r.jsxs)("ul",{children:[(0,r.jsx)("li",{children:(0,r.jsxs)(es,{children:["Breakpoint: ",(0,r.jsx)(ea,{children:"{ [breakpoint]: value }"})]})}),(0,r.jsx)("li",{children:(0,r.jsxs)(es,{children:["Orientation: ",(0,r.jsx)(ea,{children:"[portrait, landscale]"})]})}),(0,r.jsx)("li",{children:(0,r.jsxs)(es,{children:["Platform: ",(0,r.jsx)(ea,{children:"{ ios: value, android: value }"})]})})]})]}),(0,r.jsx)(en,{children:(0,r.jsx)(c,{backgroundColor:"#EFEFEF",children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    // Value for current breakpoint will be used.
    width: { small: 10, medium: 20, large: 30 },
    // Orientation will decide value [portrait, landscape].
    padding: [10, 20],
    // Platform can also be used as object key.
    height: { ios: 20, android: 40 }
  },
})

export default () => <View style={styles.view} />`})})]})}),eh=()=>(0,r.jsx)(w,{children:(0,r.jsxs)(et,{children:[(0,r.jsx)(ei,{children:(0,r.jsx)(c,{backgroundColor:"#EFEFEF",children:`import { useResponsive } from 'responsive-react-native'

export default () => {
  const { breakpoint, orientation } = useResponsive()

  if (breakpoint === 'small') {
    return null
  }
  
  return (
    <View style={styles.view} />
  )
}`})}),(0,r.jsxs)(en,{children:[(0,r.jsxs)(er,{children:[(0,r.jsx)(ee,{size:40,color:"black"}),(0,r.jsx)(eo,{children:"Breakpoints"})]}),(0,r.jsxs)(es,{children:["In addition to picking values based on breakpoint the current breakpoint can also be accessed to dynamically render specific content. In addition to the default ",(0,r.jsx)(ea,{children:"small"}),", ",(0,r.jsx)(ea,{children:"medium"})," and"," ",(0,r.jsx)(ea,{children:"large"})," breakpoint other breakpoints can be configured."]})]})]})}),ep=h("footer",{display:"flex",flexDirection:"column",flexBasis:"50%",gap:f.space.medium}),eu=h("div",{fontSize:24,fontWeight:"bold",fontFamily:"sans-serif",color:f.color.white}),eg=h("div",{fontFamily:"sans-serif",color:f.color.white}),em=({Icon:e,title:t,description:i})=>(0,r.jsxs)(ep,{children:[e&&(0,r.jsx)(e,{size:70}),(0,r.jsx)(eu,{children:t}),(0,r.jsx)(eg,{children:i})]}),ef=h("div",{display:"grid",gridTemplateColumns:"1fr 1fr",gap:f.space.large}),ex=()=>(0,r.jsxs)(ef,{children:[(0,r.jsx)(em,{Icon:Q,title:"Responsive StyleSheet",description:"Quickly make an existing application responsive without any refactoring."}),(0,r.jsx)(em,{Icon:Y,title:"Scaled Values",description:"Quickly make an existing application responsive without any refactoring."}),(0,r.jsx)(em,{Icon:K,title:"Adaptive Values",description:"Quickly make an existing application responsive without any refactoring."}),(0,r.jsx)(em,{Icon:ee,title:"Breakpoints",description:"Quickly make an existing application responsive without any refactoring."})]});var ey=i(150),ev=i(440);let eb=h("div",{position:"absolute",top:0,left:0,right:0,width:"100%",display:"flex",justifyContent:"center",alignItems:"center",height:30,variants:{position:{[ey.V1.Left]:{justifyContent:"flex-start"},[ey.V1.Right]:{justifyContent:"flex-end"},top:{alignItems:"flex-start"},center:{alignItems:"center"}}}}),ew=h("div",{width:10,height:10,backgroundColor:"black",borderRadius:10}),ej=h("div",{width:"60%",height:"80%",backgroundColor:"black",borderBottomLeftRadius:10,borderBottomRightRadius:10}),ek=h("div",{width:"20%",height:"60%",backgroundColor:"black",borderRadius:10}),eC=({type:e})=>e===ey.V1.Notch?(0,r.jsx)(eb,{position:"top",children:(0,r.jsx)(ej,{})}):e===ey.V1.DynamicIsland?(0,r.jsx)(eb,{position:"center",children:(0,r.jsx)(ek,{})}):(0,r.jsx)(eb,{position:e,children:(0,r.jsx)(ew,{})}),eS=h("section",{display:"flex",alignItems:"center",marginBottom:f.space.huge}),eF=h("div",{flex:1,display:"flex",justifyContent:"center",alignItems:"center","@phone":{display:"none"}}),eV=h("div",{marginLeft:f.space.medium,"@tablet":{display:"flex",flexDirection:"column",flex:1,alignItems:"center",marginLeft:0,marginTop:f.space.medium}}),eT=h("div",{border:"10px solid black",background:"black",borderRadius:10}),eB=h("div",{position:"relative",borderRadius:5,background:"white",height:"100%",padding:0,paddingTop:f.space.large}),eA=h("p",{fontFamily:"sans-serif",textAlign:"center",variants:{weight:{bold:{fontWeight:"bold"}}}}),eR=h("span",{fontFamily:"monospace"}),eI=Object.keys(ey.JY).map(e=>({value:e,label:ey.JY[e].name})),eH=({phone:e,setPhone:t})=>{let i=e.width/e.height,n=e.size,o=e.size*i,{sandpack:l}=(0,a.X3)(),c=(0,s.useCallback)(e=>{let i=ey.JY[e.value];Object.values(l.clients).forEach(e=>{e.iframe.contentWindow?.postMessage({type:"width",width:i.width/i.scale},"*")}),t(i)},[l.clients,t]);return(0,s.useEffect)(()=>{Object.values(l.clients).forEach(t=>{t.iframe.contentWindow?.postMessage({type:"width",width:e.width/e.scale},"*")})},[l,e]),(0,r.jsxs)(a.sp,{children:[(0,r.jsx)(eF,{children:(0,r.jsx)(a._V,{})}),(0,r.jsxs)(eV,{children:[(0,r.jsx)(ev.ZP,{id:"phone-select",instanceId:"responsive-phone-select",value:{value:e.id,label:e.name},onChange:c,options:eI,styles:{container:e=>({...e,marginBottom:20,outline:"none",borderColor:"initial",zIndex:999}),control:(e,t)=>({...e,boxShadow:void 0,borderColor:t.isFocused?"black":"var(--sp-colors-surface2)","&:hover":{borderColor:"black"}}),indicatorSeparator:()=>({display:"none"}),indicatorContainer:e=>({...e}),option:(e,t)=>({...e,backgroundColor:t.isSelected?"#82D9FF":t.isFocused?"#FF85FA":"transparent",cursor:"pointer",":active":{backgroundColor:"#FF85FA"}})}}),(0,r.jsx)(eT,{css:{width:100*o,height:100*n},children:(0,r.jsxs)(eB,{children:[(0,r.jsx)(eC,{type:e.camera}),(0,r.jsx)(a.Gj,{showOpenInCodeSandbox:!1})]})}),(0,r.jsxs)(eA,{weight:"bold",children:[e.width," x ",e.height," \xb7 ",e.size,'"']}),(0,r.jsxs)(eA,{children:[e.width/e.scale," x ",e.height/e.scale," ",(0,r.jsxs)(eR,{children:["@",e.scale,"x"]})]})]})]})},eO=()=>{let[e,t]=(0,s.useState)(ey.JY.iphone15);return(0,r.jsx)(w,{size:e.type===ey.Dy.Tablet?"ultrawide":"wide",children:(0,r.jsxs)(eS,{children:[(0,r.jsx)("style",{children:`.sp-wrapper { width: 100%; }
.sp-layout { background-color: initial; border: initial; width: 100%; display: flex; flex-wrap: nowrap; }
.sp-editor { border: 1px solid var(--sp-colors-surface2); border-radius: 5px; }
.sp-tabs { background: initial; }
.sp-stack { max-height: 500px; }
.sp-code-editor { background: initial; }
.cm-editor { background-color: initial !important; }
.sp-preview { height: 100%; background-color: initial; max-height: initial; }
.sp-preview-iframe { height: 100%; }
.sp-preview-container { background: initial; }

@media only screen and (max-width: 1000px) {
  .sp-layout { flex-wrap: wrap; }
}`}),(0,r.jsx)(a.oT,{template:"react",files:{"/App.js":{code:`import { useState, useEffect } from 'react'
import { Dimensions, Text } from 'react-native'
import { Rerender, rerender } from 'responsive-react-native'
import Screen from './screen.js'

export default function Wrapper() {
  const [width, setWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    function messageListener(event) {
      // Ignore messages originating from sandbox itself.
      if (typeof event.data === 'object' && event.data.type === 'width') {
        Dimensions.get('window').width = event.data.width
        setWidth(event.data.width)
        rerender()
      }
    }

    window.addEventListener('message', messageListener)

    return () => window.removeEventListener('message', messageListener)
  }, [])

  return (
    <Rerender>
      {() => <Screen width={width} />}
    </Rerender>
  )
}`,hidden:!0},"/screen.js":{code:`import { View, Text } from 'react-native'
import { createStyles } from 'responsive-react-native'
import { Header } from './components.js'
import { Breakpoint } from './breakpoint.js'

const styles = createStyles({
  wrapper: {
    gap: 10,
    paddingHorizontal: 20
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
    width: 100,
    height: 100
  },
})

export default function Screen({ width }) {
  return (
    <View style={styles.wrapper}>
      <Header />
      <Text>Width: {width}</Text>
      <View style={[styles.box, styles.smallBox]}>
        <Text>100x100</Text>
      </View>
      <Breakpoint />
    </View>
  )
}`,active:!0},"/components.js":`import { View, Text, Dimensions } from 'react-native'
import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  box: {
    display: 'inline-flex',
    padding: 10,
    backgroundColor: 'lightgray'
  },
  smallBox: {
    width: 100,
    height: 100
  },
  largeBox: {
    width: 150,
    height: 150
  }
})

export const Header = () => (
  <View style={styles.header}>
    <Text style={styles.title}>My Responsive App</Text>
    <Text>👤</Text>
  </View>
)`,"/breakpoint.js":`import { View, Text, Dimensions } from 'react-native'
import { createStyles, useResponsive } from 'responsive-react-native'

const styles = createStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  tile: {
    backgroundColor: '#82D9FF',
    width: 50,
    height: 50,
    borderRadius: 10
  }
})

const tileCount = { small: 2, medium: 3, large: 4 }

export const Breakpoint = () => {
  const { breakpoint } = useResponsive()
  
  return (
    <>
      <Text>Breakpoint: {breakpoint}</Text>
      <View style={styles.header}>
        {Array.from(Array(tileCount[breakpoint])).map(
          (value, index) => <View key={index} style={styles.tile} />
        )}
      </View>
    </>
  )
}`},customSetup:{dependencies:{"react-native-web":"latest","responsive-react-native":"latest"}},children:(0,r.jsx)(eH,{phone:e,setPhone:t})})]})})},ez=h("h1",{fontSize:50,fontWeight:"bold",fontFamily:"serif",textAlign:"center",margin:0,background:"-webkit-linear-gradient(90deg, #FF85FA, #82D9FF)","-webkit-background-clip":"text","-webkit-text-fill-color":"transparent"}),eD=h("div",{fontFamily:"sans-serif",paddingLeft:"20%",paddingRight:"20%",textAlign:"center",margin:0,marginBottom:f.space.medium}),eW=h("h2",{fontSize:24,fontWeight:"bold",fontFamily:"sans-serif",margin:0}),eE=h("p",{fontFamily:"sans-serif",marginBottom:f.space.medium,margin:0}),eL=()=>(0,r.jsxs)(w,{children:[(0,r.jsx)("a",{id:"styled",children:(0,r.jsx)(ez,{children:"Styled API"})}),(0,r.jsxs)(eD,{children:["Guaranteed to take the React Native development experience to the next level the Styled API especially"," ",(0,r.jsx)("strong",{children:"removes the need for any rerenders"})," when the styles change."]}),(0,r.jsx)(c,{backgroundColor:"black",theme:"dark",children:`import { Styled } from 'responsive-react-native'

const CustomView = Styled(
  'View',
  {
    backgroundColor: 'gray',
    padding: 10,
  },
  {
    // Truthy prop.
    highlight: {
      backgroundColor: 'red',
    }
  }
)

export default () => <CustomView highlight />`}),(0,r.jsx)(eW,{children:"Observable Styles with MobX"}),(0,r.jsx)(eE,{children:"When a function is passed and MobX is installed the styles will automatically adapt whenever any of the state accessed inside changes."}),(0,r.jsx)(c,{backgroundColor:"black",theme:"dark",children:`import { observable } from 'mobx'
import { Styled } from 'responsive-react-native'

const Store = observable({ highlight: false })

const ObservableView = Styled('View', () => ({
  backgroundColor: Store.highlight ? 'red' : 'gray',
}))

export default () => (
  <View>
    <ObservableView />
    <Button
      title="Highlight"
      onPress={() =>
        runInAction(() => {
          Store.highlight = !Store.highlight
        })
      }
    />
  </View>
)`})]}),eM=h("h1",{color:"white",fontFamily:"Roboto Serif, serif",margin:0,padding:0,gridColumn:"1 / 3","@tablet":{gridColumn:"initial"}}),eP=h("div",{display:"grid",gridTemplateColumns:"1fr 1fr",gap:f.space.large,alignItems:"center",height:"80%",maxWidth:1e3,marginLeft:f.space.medium,marginRight:f.space.medium,"@tablet":{gridTemplateColumns:"1fr",height:"auto"}}),eq="/responsive-react-native",eN={[`${eq}/`]:(0,r.jsx)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W,{type:"intro",children:(0,r.jsxs)(eP,{children:[(0,r.jsx)(eM,{children:"Out-of-the-box Responsive StyleSheets for React Native."}),(0,r.jsx)(ex,{}),(0,r.jsx)(c,{children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: 'red',
    width: 200,
    height: 100,
    padding: 10
  },
  text: {
    fontSize: 16
  }
})

export default () => (
  <View style={styles.view}>
    <Text style={styels.text}>Hello Responsive</Text>
  </View>
)`}),(0,r.jsx)(J,{})]})}),(0,r.jsx)(eO,{}),(0,r.jsx)(el,{}),(0,r.jsx)(ec,{}),(0,r.jsx)(ed,{}),(0,r.jsx)(eh,{}),(0,r.jsx)(eL,{}),(0,r.jsx)(G,{}),(0,r.jsx)(w,{children:(0,r.jsx)(q,{name:"Getting Started",href:"/getting-started"})}),(0,r.jsx)(I,{})]})},{}),[`${eq}/styled`]:(0,r.jsx)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W,{children:"Styled Interface"}),(0,r.jsxs)(w,{children:[(0,r.jsxs)(k,{children:["Inspired by styled-components for the web this interface allows to merge dynamic styles together with tags and reuse them. Regular React Native stylesheets can't be updated anymore without rerendering the whole tree. Using the Styled interface however doesn't require a full rerender through the ",(0,r.jsx)(C,{children:"<Rerender />"})," component anymore. The linked styles will directly be updated whenever the viewport or the orientation changes. Additionally, styles for props can be added which also dynamically update the component's styles."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { View } from 'react-native'
import { Styled } from 'responsive-react-native'

const CustomView = Styled(
  View,
  {
    backgroundColor: 'gray',
    padding: 10,
  },
  {
    // Truthy prop.
    highlight: {
      backgroundColor: 'red',
    },
    // Current breakpoint.
    large: {
      backgroundColor: 'blue',
    },
    // Current OS.
    ios: {
      padding: 5,
    }
  }
)

export default () => <CustomView highlight />`}),(0,r.jsxs)(k,{children:["As the ",(0,r.jsx)(S,{children:"first argument"})," the ",(0,r.jsx)(C,{children:"Styled"})," method takes the component to extend. This can be a string representation of a React Native element or the element itself. The ",(0,r.jsx)(S,{children:"second argument"})," takes the styles just like ",(0,r.jsx)(C,{children:"createStyles"})," does. Scaleable values will automatically adapt linearly based on the viewport and adaptive values can be used to specify values for specific breakpoints or orientations. An optional"," ",(0,r.jsx)(S,{children:"third argument"})," takes an object which can contain styles which will dynamically be applied if a truthy prop, a breakpoint, the operating system or the orientation matches a key."]}),(0,r.jsx)(j,{children:"Observable Styles with MobX"}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:"npm install mobx responsive-react-native"}),(0,r.jsxs)(k,{children:["When a function is passed and MobX is installed the styles will automatically adapt whenever any of the state accessed inside changes. The ",(0,r.jsx)(C,{children:"Styled"})," method interface stays the same except that for the second and third argument a method returning base styles or conditional styles has to be passed."]}),(0,r.jsx)(d,{backgroundColor:f.color.codeBackground,children:`import { observable, runInAction } from 'mobx'
import { View, Button } from 'react-native'
import { Styled } from 'responsive-react-native'

const Store = observable({ highlight: false })

const ObservableView = Styled(View, () => ({
  backgroundColor: Store.highlight ? 'red' : 'gray',
  width: 50,
  height: 50
}))

export default () => (
  <View style={{ padding: 10 }}>
    <ObservableView />
    <Button
      title="Highlight"
      onPress={() =>
        runInAction(() => {
          Store.highlight = !Store.highlight
        })
      }
    />
  </View>
)`}),(0,r.jsx)(k,{children:"When the state changes and this results in different styles being returned the styles will adapt without any React component themselves having to rerender."}),(0,r.jsx)(q,{name:"Configuration",href:"/configuration"})]}),(0,r.jsx)(I,{})]})},{}),[`${eq}/getting-started`]:(0,r.jsx)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W,{children:"Getting Started"}),(0,r.jsxs)(w,{children:[(0,r.jsx)(j,{children:"Installation"}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:"npm install responsive-react-native"}),(0,r.jsx)(j,{children:"Two Approaches"}),(0,r.jsxs)(k,{children:["There are two different ways to use responsive styles. The first uses the familiar Stylesheets used in React Native and automativally makes any scaleable values responsive. This approach requires that the whole application rerenders when the viewport changes. Usually, this is not an issue since viewport changes on mobile devices are rare. The second way uses styled components and requires a separate definition for each component. Using the latter interface requires more effort and is only recommended when starting with a new project. This interface doesn't require any rerenders and can conditionally apply styles based on component props.The ",(0,r.jsx)(F,{href:"/styled",children:"Styled API"})," approach is explained in detail on a dedicated page."]}),(0,r.jsxs)(k,{children:["To quickly try out the Stylesheet approach on an existing project it's possible to override the"," ",(0,r.jsx)(C,{children:"StyleSheet.create"})," method without touching every component. This is detailed in the"," ",(0,r.jsx)(F,{href:"#refactoring",children:"refactoring section"})," below."]}),(0,r.jsx)(j,{children:"Responsive Stylesheets"}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    padding: 20,
    height: 40,
    flex: 1, // Remains unmodified.
    backgroundColor: 'blue',
  },
  text: {
    fontSize: 16,
  },
})

export const App = () => (
  <View style={styles.view}>
    <Text style={styles.text}>Hello Responsive World</Text>
  </View>
)`}),(0,r.jsx)(j,{children:"How Does It Work?"}),(0,r.jsxs)(k,{children:["The pixel based values will scale depending on the viewport size of the device. Essentially, the values will more or less scale so that the layout will look the same on any device. By default at ",(0,r.jsx)(C,{children:"420px"})," the value will stay the same. It's possible to ",(0,r.jsx)(F,{href:"/configuration",children:"configure"})," the default viewport as well as the strength of the scaling."]}),(0,r.jsx)(j,{children:"Rerendering"}),(0,r.jsxs)(k,{children:["Since Stylesheets are statically initialized and frozen at the top of the file they cannot be made to automatically adapt during rendering. The ",(0,r.jsx)(C,{children:"createStyles"})," method works around this by returning a proxied object that can adapt based on the viewport. However, a full rerender of the application is still necessary when the viewport changes in order to get the new styles. Any part of the application wrapped in ",(0,r.jsx)(C,{children:"<Rerender>"})," automatically rerenders on changes to the viewport. Usually this component is added directly at the application root as in the example below."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { View, Text } from 'react-native'
import { Rerender } from 'responsive-react-native'

function App() {
  return (
    <Rerender>
      {() => (
        <View>
          <Text>Hello World</Text>
        </View>
      )}
    </Rerender>
  )
}`}),(0,r.jsx)(j,{children:"Adaptive Values (Breakpoints and Orientation)"}),(0,r.jsx)(k,{children:"A custom Stylesheet syntax makes it easy to define breakpoint or orientation dependent styles directly in the stylesheet."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: ['blue', 'red'], // => blue in portrait, red in landscape.
    height: { small: 40, large: 80 }, // => 40 for small and medium breakpoint, 80 on large breakpoint.
    padding: [
      { small: 40, medium: 60 },
      { small: 20, large: 80 },
    ], // Both approaches can be combined either way.
  },
})`}),(0,r.jsx)(T,{id:"refactoring",children:(0,r.jsx)(j,{children:"Refactoring an Existing Project"})}),(0,r.jsxs)(k,{children:["Any project using the standard ",(0,r.jsx)(C,{children:"StyleSheet.create"})," can quickly be modified to make all applicable properties scale responsively. This can be achieved by overriding said method."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { StyleSheet } from 'react-native'
import { createStyles } from 'responsive-react-native'

Object.assign(StyleSheet, { create: createStyles })`}),(0,r.jsxs)(k,{children:["Calls to ",(0,r.jsx)(C,{children:"StyleSheet.create"})," are usually run before rendering occurs right away when the file is imported. This means that the override needs to happen before any components are imported. Placing the above code in a separate file and importing it before any components will achieve this."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { AppRegistry } from 'react-native'
import './refactor-stylesheet' // Import above code before any components.
import App from './App'

AppRegistry.registerComponent('responsive-app', () => App)`}),(0,r.jsx)(q,{name:"Features",href:"/features"})]}),(0,r.jsx)(I,{})]})},{}),[`${eq}/features`]:(0,r.jsx)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W,{children:"Features"}),(0,r.jsxs)(w,{children:[(0,r.jsx)(j,{children:"Scaled Values"}),(0,r.jsxs)(k,{children:["This type of responsive design hasn't found it's way into the web yet where breakpoints and static values are still preferred. Luckily, it's very easy to use and will work out of the box. All values influencing the scaling can also be"," ",(0,r.jsx)(F,{href:"/configuration#scaled-values",children:"configured"}),"."]}),(0,r.jsxs)(k,{children:["All scaleable values inside a stylesheet created with ",(0,r.jsx)(C,{children:"createStyles"})," are automatically linearly scaled. At a medium viewport of ",(0,r.jsx)(C,{children:"420px"})," the value will stay exactly the same. At the lower breakpoint of"," ",(0,r.jsx)(C,{children:"320px"})," the value will be reduced by the scaling ",(0,r.jsx)(C,{children:"factor"})," which is"," ",(0,r.jsx)(C,{children:"0.5"})," by default. A factor of one would cut the value in half in this case while the default of"," ",(0,r.jsx)(C,{children:"0.5"})," will remove a fourth. Below the ",(0,r.jsx)(C,{children:"minimum"})," the value will stay the same which fine as there aren't any devices with smaller viewports. For bigger devices the value will scale linearly in the opposite direction until the ",(0,r.jsx)(C,{children:"maximum"})," breakpoint of ",(0,r.jsx)(C,{children:"520px"}),"."]}),(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",height:300,position:"relative"},children:(0,r.jsx)("img",{style:{maxHeight:"100%"},src:"/scale.svg",alt:"Illustration of responsive scaling."})}),(0,r.jsx)(k,{children:"The above chart illustrates how the linear scaling works and which values play a role."}),(0,r.jsx)(k,{children:"This type of responsive scaling usually takes no effort and can easily be integrated into existing applications. Due to the heavy use of pixel based scaling on mobile devices there is less fragmentation when it comes to the range of target viewports. This is one of the major reasons why responsive design currently isn't very popular for mobile devices. Still, there is slight fragmentation which is very well adressed by using scaled values which make a design created on a default device look the same on any kind of device. The issue of too much whitespace on large devices as well as an overcrowded design on smaller devices is gone."}),(0,r.jsx)(j,{children:"Adaptive Values (Breakpoints and Orientation)"}),(0,r.jsxs)(k,{children:["Just like Media Queries in CSS adaptive values allow values based on the current breakpoint or orientation. The syntax is deliberately kept terse to make responsive styles quick to write. ",(0,r.jsx)(S,{children:"Breakpoints"})," are written as objects with their specific breakpoint as the key. If the current breakpoint is missing the nearest one below will be used. The values will no longer scale and are the same in any viewport where the breakpoint applies."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    height: { small: 40, large: 80 }
  }
})`}),(0,r.jsx)(k,{children:"In the above example screens matching the small and medium viewport will receive a width of 40 while the large breakpoint gets value 80."}),(0,r.jsx)(k,{children:"Values that should match the orientation are written as arrays where the first key applies for portrait and the second for landscape."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { createStyles } from 'responsive-react-native'

const styles = createStyles({
  view: {
    backgroundColor: ['blue', 'red']
  }
})`}),(0,r.jsx)(k,{children:"In this example the background will be blue on portrait and red on landscape."}),(0,r.jsxs)(j,{children:[(0,r.jsx)(C,{children:"useResponsive"})," React Hook"]}),(0,r.jsx)(k,{children:"The current breakpoint as well as the orientation can be accessed during rendering to adapt the layout or content. Using this hook will automatically rerender the component any time the breakpoint or orientation changes."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { useResponsive } from 'responsive-react-native'

export default function App() {
  const { breakpoint, setBreakpoint, orientation } = useResponsive()
  return (
    <View style={{ margin: breakpoint === 'large' ? 0 : 10 }}>
      <Text>Current breakpoint: {breakpoint}</Text>
      <Button title="Set Breakpoint to Small" onPress={() => setBreakpoint('small')} />
    </View>
  )
}`}),(0,r.jsx)(j,{children:(0,r.jsx)(C,{children:"getValue(value: number)"})}),(0,r.jsx)(k,{children:"Internally used to render the scaleable stylesheet values this helper function can be used to get any responsive value."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { getValue } from 'responsive-react-native'

export const Header = () => <View style={{ height: getValue(50) }} />`}),(0,r.jsx)(j,{children:(0,r.jsx)(C,{children:"linearScale(value: number, breakpoint: string)"})}),(0,r.jsxs)(k,{children:["Method used to scale values linearly according to ",(0,r.jsx)(F,{href:"/configuration#scaled-values",children:"scale"})," configured. Useful when overriding the default ",(0,r.jsx)(C,{children:"value"})," method but still needing the linearly scaled value."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { linearScale, configure } from 'responsive-react-native'

configure({
  value: (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => {
    const scaledValue = linearScale(value, breakpoint)

    // Linear scaling only for portrait.
    if (orientation === 'portrait') {
      return scaledValue
    }

    return value
  },
})`}),(0,r.jsxs)(j,{children:[(0,r.jsx)(C,{children:"<SelectBreakpoint />"})," Component to Test Breakpoints"]}),(0,r.jsx)(k,{children:"This utility component can be placed anywhere to get a UI to quickly switch between different breakpoints."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { SelectBreakpoint } from 'responsive-react-native'

export const Settings = () => (
  <View>
    <SelectBreakpoint />
    <SelectBreakpoint color="blue" fontSize={16} />
    <SelectBreakpoint style={{ marginHorizontal: 40 }} />
  </View>
)`}),(0,r.jsx)(q,{name:"Styled API",href:"/styled"})]}),(0,r.jsx)(I,{})]})},{}),[`${eq}/configuration`]:(0,r.jsx)(function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(W,{children:"Configuration"}),(0,r.jsxs)(w,{children:[(0,r.jsx)(k,{children:"While the defaults should work fine to get started it's also possible to configure almost any behaviour."}),(0,r.jsx)(T,{id:"breakpoint",children:(0,r.jsx)(j,{children:"Breakpoints"})}),(0,r.jsx)(k,{children:"By default small, medium and large breakpoints are available. The number of breakpoints, their names as well as the starting point can all be changed. The number defines the minimal viewport width where this breakpoint will apply. By default the initial breakpoint is inferred from the viewport size, but can also be configured."}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { configure } from 'responsive-react-native'

configure({
  // Available breakpoints, default { small: 360, medium: 420, large: 999 }.
  breakpoints: {
    tiny: 300,
    normal: 600,
    huge: 800,
  },
  // Initial breakpoint, default inferred from breakpoint values.
  breakpoint: 'small'
})`}),(0,r.jsxs)(k,{children:["When configuring breakpoints with TypeScript use the following to override ",(0,r.jsx)(C,{children:"CustomBreakpoints"})," types for proper type checking."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`declare module 'responsive-react-native' {
  interface CustomBreakpoints {
    tiny: number
    normal: number
    huge: number
  }
}`}),(0,r.jsx)(T,{id:"scaled-values",children:(0,r.jsx)(j,{children:"Scaled Values"})}),(0,r.jsxs)(k,{children:["Regular pixel based values will not be adapted based on breakpoints, but linearly scaled between a minimum and a maximum breakpoint. In the middle between these two points the value will not scale at all. By specifying the"," ",(0,r.jsx)(C,{children:"factor"})," the strength of the scaling can be defined."]}),(0,r.jsx)("div",{style:{display:"flex",justifyContent:"center",height:300,position:"relative"},children:(0,r.jsx)("img",{style:{maxHeight:"100%"},src:"/scale.svg",alt:"Illustration of responsive scaling."})}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { configure } from 'responsive-react-native'

configure({
  // Responsive scaling configuration, default { minimum: 320, maximum: 520, factor: 0.5 }.
  scale: {
    minimum: 300,
    maximum: 600,
    factor: 1,
  },
})`}),(0,r.jsxs)(k,{children:["For even more fine grained control it's possible to override the default scaling function. This method called"," ",(0,r.jsx)(C,{children:"value"})," will receive the number of the property. This would be 10 in the case of"," ",(0,r.jsx)(C,{children:"{ padding: 10 }"}),". Additionally, the method will receive the current breakpoint. As shown below with this it's easily possible to calculate the value based on the breakpoint instead of scaling linearly."]}),(0,r.jsx)(c,{backgroundColor:f.color.codeBackground,children:`import { configure } from 'responsive-react-native'

configure({
  // Method used to calculate responsive values, default linear scaling according to "scale" configuration.
  value: (value: number, breakpoint: string, orientation: 'portrait' | 'landscape') => {
    if (breakpoint === 'medium') {
      return value
    }

    const halfValue = Math.round(value / 6)

    if (breakpoint === 'small') {
      return value - halfValue
    }

    return value + halfValue
  },
})`})]}),(0,r.jsx)(I,{})]})},{})},eZ=(e,t)=>{let i=`${eq}/${t}`;e.preventDefault(),window.history.pushState({},void 0,i),n(i),window.scrollTo({top:0,behavior:"smooth"})};window.addEventListener("popstate",e=>{e.preventDefault();let t=window.location.pathname;n(t)}),document.body.innerHTML="",(0,o.createRoot)(document.body).render((0,r.jsx)(function({children:e}){return e},{children:(0,r.jsx)(function(){let[e,t]=(0,s.useState)(window.location.pathname);return(n=t,eN[e])?eN[e]:(0,r.jsx)("p",{children:"Page not found"})},{})}))}},l={};function c(e){var t=l[e];if(void 0!==t)return t.exports;var i=l[e]={id:e,loaded:!1,exports:{}};return a[e](i,i.exports,c),i.loaded=!0,i.exports}c.m=a,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},c.t=function(i,n){if(1&n&&(i=this(i)),8&n||"object"==typeof i&&i&&(4&n&&i.__esModule||16&n&&"function"==typeof i.then))return i;var r=Object.create(null);c.r(r);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&i;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach(function(e){o[e]=function(){return i[e]}});return o.default=function(){return i},c.d(r,o),r},c.d=function(e,t){for(var i in t)c.o(t,i)&&!c.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},c.f={},c.e=function(e){return Promise.all(Object.keys(c.f).reduce(function(t,i){return c.f[i](e,t),t},[]))},c.u=function(e){return"static/js/async/"+e+"."+({154:"8c82eda2",26:"0af41714",264:"ec2be933",368:"bd5e8502"})[e]+".js"},c.miniCssF=function(e){return""+e+".css"},c.h=function(){return"bac6f022029a9c32"},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i={},c.l=function(e,t,n,r){if(i[e]){i[e].push(t);return}if(void 0!==n)for(var o,s,a=document.getElementsByTagName("script"),l=0;l<a.length;l++){var d=a[l];if(d.getAttribute("src")==e){o=d;break}}o||(s=!0,(o=document.createElement("script")).charset="utf-8",o.timeout=120,c.nc&&o.setAttribute("nonce",c.nc),o.src=e),i[e]=[t];var h=function(t,n){o.onerror=o.onload=null,clearTimeout(p);var r=i[e];if(delete i[e],o.parentNode&&o.parentNode.removeChild(o),r&&r.forEach(function(e){return e(n)}),t)return t(n)},p=setTimeout(h.bind(null,void 0,{type:"timeout",target:o}),12e4);o.onerror=h.bind(null,o.onerror),o.onload=h.bind(null,o.onload),s&&document.head.appendChild(o)},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},n=[],c.O=function(e,t,i,r){if(t){r=r||0;for(var o=n.length;o>0&&n[o-1][2]>r;o--)n[o]=n[o-1];n[o]=[t,i,r];return}for(var s=1/0,o=0;o<n.length;o++){for(var t=n[o][0],i=n[o][1],r=n[o][2],a=!0,l=0;l<t.length;l++)(!1&r||s>=r)&&Object.keys(c.O).every(function(e){return c.O[e](t[l])})?t.splice(l--,1):(a=!1,r<s&&(s=r));if(a){n.splice(o--,1);var d=i();void 0!==d&&(e=d)}}return e},c.p="/responsive-react-native/",c.rv=function(){return"1.2.3"},r={980:0},c.f.j=function(e,t){var i=c.o(r,e)?r[e]:void 0;if(0!==i){if(i)t.push(i[2]);else{var n=new Promise(function(t,n){i=r[e]=[t,n]});t.push(i[2]=n);var o=c.p+c.u(e),s=Error();c.l(o,function(t){if(c.o(r,e)&&(0!==(i=r[e])&&(r[e]=void 0),i)){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,i[1](s)}},"chunk-"+e,e)}}},c.O.j=function(e){return 0===r[e]},o=function(e,t){var i,n,o=t[0],s=t[1],a=t[2],l=0;if(o.some(function(e){return 0!==r[e]})){for(i in s)c.o(s,i)&&(c.m[i]=s[i]);if(a)var d=a(c)}for(e&&e(t);l<o.length;l++)n=o[l],c.o(r,n)&&r[n]&&r[n][0](),r[n]=0;return c.O(d)},(s=self.webpackChunk=self.webpackChunk||[]).forEach(o.bind(null,0)),s.push=o.bind(null,s.push.bind(s)),c.ruid="bundler=rspack@1.2.3";var d=c.O(void 0,["361","22"],function(){return c(26)});c.O(d)}();