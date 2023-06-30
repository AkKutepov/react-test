(()=>{var e={829:(e,t,n)=>{"use strict";n.r(t);const r=new function(){var e;return e={elem:function(t){var n="";return Array.isArray(t)&&(n=t.length<=2||null===t[2]||"string"==typeof t[2]||"number"==typeof t[2]||"bigint"==typeof t[2]?React.createElement.apply(this,t):React.createElement.apply(this,t.map(((t,n)=>n>1?e.elem(t):t)))),n},bus:new class{constructor(){this.events={}}on(e,t){this.events[e]=this.events[e]||[],~this.events[e].findIndex((e=>e===t))||this.events[e].push(t)}off(e,t){var n;this.events[e]&&~(n=this.events[e].findIndex((e=>e===t)))&&this.events[e].splice(n,1)}trigger(e,t){this.events[e]&&this.events[e].forEach((function(e){e(t)}))}},sort:function(e,t){null==e&&(e=0),e=e>0?1:e<0?-1:0,null==t&&(t=0);var n=[],r=[],a=-1,i=-1==(t=t>0?1:t<0?-1:0)?function(e,t){return e>t?1:e<t?-1:0}:function(e,n){return 1==t&&(n=n.toLowerCase()),e>n?1:e<n?-1:0};return{find:function(r){null==r&&(r=-1==t?0:"");var o,s,l=!1,d=0,c=0,p=0,u=n.length-1;if(s=-1==t?r:1==t?(r+"").toLowerCase():r+"",n.length)if(e){for(;;)if(p=Math.floor(c+(u-c)/2),0==(o=i(s,n[p]))){if(a=p,l=!0,(c=++p)>u)break}else if(o==e){if((c=++p)>u)break}else if(c==(u=p))break}else for(d=0;d<n.length;d++)if(0==i(s,n[d])){a=d,l=!0;break}return l||(a=e?c:d),l},add:function(i,o,s){if(null==i&&(i=-1==t?0:""),null==o&&(o=null),void 0!==s){if(!(s>=0&&s<=n.length))throw new Error("Error add before");return-1==t?n.splice(s,0,i):n.splice(s,0,i+""),r.splice(s,0,o),void(a=s)}e?(this.find(i)&&a++,-1==t?n.splice(a,0,i):n.splice(a,0,i+""),r.splice(a,0,o)):(a=n.length,n[a]=-1==t?i:i+"",r[a]=o)},rem:e=>{var t,i;if(null!=e||(e=a),!(e>=0&&e<n.length))throw new Error("Error rem index");return t=n.splice(e,1)[0],i=r.splice(e,1)[0],a=-1,{key:t,val:i}},clear:()=>{n=[],r=[],a=-1},get k(){return n},get v(){return r},get i(){return a},get k1(){return n[a]},get v1(){return r[a]},get param(){return{sort:e,compare:t}}}},style:function(e,t){var n=document.createElement("template");n.innerHTML=e.css,t.appendChild(n.content)}}};var a,i,o={};class s extends React.Component{constructor(e){super(e),(i=(a=this).methods).data={},this.state={data_W:[],data_ViewVisible:0,data_SettingVisible:0}}componentDidMount(){r.style(a,o.div),o.cityMoved=null,o.cityMovedIndex=-1,o.refreshTimeout=0,i.refreshData()||a.setState({data_SettingVisible:1}),window.addEventListener("mouseup",i.winOnMouseup),window.addEventListener("touchend",i.winOnMouseup)}componentWillUnmount(){window.removeEventListener("mouseup",i.winOnMouseup),window.removeEventListener("touchend",i.winOnMouseup)}componentDidUpdate(){var e;i.orderCities(),i.renewCities(),a.state.data_W.length&&a.state.data_ViewVisible&&(e=o.div.querySelector(".city-container"))&&(e.addEventListener("touchstart",i.cityOnMousedown,{passive:!1}),e.addEventListener("touchmove",i.cityOnMousemove,{passive:!1})),a.state.data_SettingVisible&&(e=o.div.querySelector(".input-group").querySelector("input"))&&e.focus()}methods={refreshData(){var e,t=localStorage.getItem("trWeather")||"[]";return"[]"==t&&(t='[{"name":"Havana","country":"CU"},{"name":"Dubai","country":"AE"}]'),e=JSON.parse(t).map((e=>e.name+", "+e.country)),i.getWeather(e),1},settingMode(){a.setState({data_SettingVisible:!a.state.data_SettingVisible})},cityOnInput(e){var t,n,r="";t=e.target.value,null!=(n=/[a-z .-]+,?[a-z]{0,2}/i.exec(t))&&(r=n[0]),t!=r&&(e.target.value=r)},addCityOnEnter(e){if("Enter"===e.key||"click"==e.type){e.preventDefault();var t=e.target.closest(".input-group").querySelector("input"),n=t.value;n.length>2&&(n=n.toLowerCase(),i.getWeather([n]),t.select())}},getIndex(e){var t,n=-1,r=o.div.querySelectorAll(".city");for(t=0;t<r.length;t++)if(r[t]==e){n=t;break}return n},renewCities(){var e,t=[];for(e=0;e<a.state.data_W.length;e++)t[e]={name:a.state.data_W[e].name,country:a.state.data_W[e].sys.country};localStorage.setItem("trWeather",JSON.stringify(t))},winOnMouseup(e){var t,n,r,s=o.cityMovedIndex;if(t=o.cityMoved){if(r=i.getIndex(t),t.style.zIndex="inherit",t.style.opacity=1,o.cityMoved.style.cursor="pointer",o.cityMoved=null,i.orderCities(),r==s)return;n=o.div.querySelectorAll(".city"),s<r?t.parentNode.insertBefore(t,n[s]):t.parentNode.insertBefore(t,n[s+1]),setTimeout((()=>{var e=a.state.data_W;e.splice(r,0,e.splice(s,1)[0]),a.setState({data_W:e})}),200)}},cityOnMousedown(e){e.preventDefault();var t=e.target||e.srcElement;if("move"==t.dataset.name||"move"==t.parentNode.dataset.name){(l=o.cityMoved=t.closest(".city")).style.cursor="move",l.style.zIndex=10,l.style.opacity=.5,o.bounds=o.cityMoved.closest(".city-container").getBoundingClientRect(),o.cityMovedIndex=i.getIndex(l);var n=t.getBoundingClientRect(),r=t.parentNode.getBoundingClientRect();"touchstart"==e.type?(e.touches[0]||e.changedTouches[0],o.offsetY=3*n.height/4+(n.y-r.y)):"mousedown"==e.type&&(o.offsetY=e.nativeEvent.offsetY+(n.y-r.y))}else if("bin"==t.dataset.name||"bin"==t.parentNode.dataset.name){var s,l,d=(l=t.closest(".city")).querySelector(".city-name").innerHTML,c=d.substring(0,d.indexOf(",")),p=d.substring(d.indexOf(",")+1).trim();~(s=a.state.data_W.findIndex((e=>e.name==c&&e.sys.country==p)))&&(l.style.opacity=0,setTimeout((()=>{var e=a.state.data_W.filter(((e,t)=>t!=s));if(a.setState({data_W:e}),s<a.state.data_W.length){var t=window.getComputedStyle(l).getPropertyValue("transition");l.style.transition="none",l.style.opacity=1,l.style.transition=t}}),500))}},cityOnMousemove(e){if(e.preventDefault(),o.cityMoved){var t=o.cityMoved,n=o.div.querySelectorAll(".city"),r={};if(o.cityMoved.closest(".city-container"),"touchmove"==e.type){var a=e.touches[0]||e.changedTouches[0];r.y=a.pageY-o.bounds.top-document.documentElement.scrollTop}else"mousemove"==e.type&&(r.y=e.pageY-o.bounds.top-document.documentElement.scrollTop);if([...n].findIndex((e=>e==t)),r.y-o.offsetY+t.offsetHeight<o.bounds.height&&r.y-o.offsetY>0){r.y,o.offsetY;var s=o.cityMoved,l=s.previousElementSibling,d=s.nextElementSibling;o.reorderTimer||(l&&s.offsetTop<=l.offsetTop+10?(s.parentNode.insertBefore(s,l),i.orderCities()):d&&s.offsetTop+s.offsetHeight>=d.offsetTop+d.offsetHeight-10&&(s.parentNode.insertBefore(d,s),i.orderCities())),t.style.top=r.y-o.offsetY+"px"}}},orderCities(){var e,t,n=0,r=o.div.querySelectorAll(".city");if(r.length){const a=".3rem";for(e=0;e<r.length;e++)0==e?(n=r[e].offsetHeight,r[e].style.top=0):(r[e].style.top="calc("+n+"px + "+a+")",n=r[e].offsetTop+r[e].offsetHeight);(t=o.div.querySelector(".city-container")).style.maxHeight=n+"px",t.offsetHeight<n&&(t.style.height=n+"px")}},ms2kmh:e=>3600*e/1e3,wind2words(e){var t,n=[{name:"Calm",speed:2},{name:"Light air",speed:6},{name:"Light breeze",speed:11},{name:"Gentle breeze",speed:19},{name:"Moderate breeze",speed:30},{name:"Fresh breeze",speed:39},{name:"Strong breeze",speed:50},{name:"Moderate gale",speed:61},{name:"Fresh gale",speed:74},{name:"Strong gale",speed:87},{name:"Whole gale",speed:102},{name:"Storm",speed:117},{name:"Hurricane",speed:1e6}];if(~(t=n.findIndex((t=>t.speed>e))))return n[t].name+"."},deg2words:e=>["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"][Math.floor(e/22.5+.5)%16],kelvin2Celsius:e=>+(e-273.15).toFixed(1),dewPoint(e,t){if(i.kelvin2Celsius(e)>0&&i.kelvin2Celsius(e)<60){const r=17.271,a=237.7;var n=r*i.kelvin2Celsius(e)/(a+i.kelvin2Celsius(e))+Math.log(t/100);return(a*n/(r-n)).toFixed(1)+"℃"}return"-"},capitalizeFirstLetter:e=>e.charAt(0).toUpperCase()+e.slice(1),getWeather(e){var t=[];o.refreshTimeout&&clearTimeout(o.refreshTimeout),o.refreshTimeout=setTimeout((()=>{i.refreshData()}),18e5),e.length&&function n(r){fetch("https://api.openweathermap.org/data/2.5/weather?q="+e[r]+"&limit=5&appid=65d3d0a48fb24bcee34d1d3c38ff4d4c",{method:"GET"}).then((e=>{if(e.ok)return e.json();throw 404===e.status?alert("Error! Location not found. Try new location."):alert("Error! Status: "+e.status)})).then((i=>{if(t[r++]=i,t[r-1].local_name&&t[r-1].local_name.en&&(t[r-1].name=t[r-1].local_name.en),r==e.length)if(a.setState({data_ViewVisible:1}),1!=e.length||1==a.state.data_W.length&&a.state.data_W[0].name==t[0].name&&a.state.data_W[0].sys.country==t[0].sys.country)a.setState({data_W:t});else{if(~a.state.data_W.findIndex((e=>{var n=e.name,r=e.sys.country,a=t[0].name,i=t[0].sys.country;if(n==a&&r==i)return 1})))return void alert("Already on the list.");var o=a.state.data_W;a.setState({data_W:o.concat(t)})}else n(r)})).catch((e=>{}))}(0)}};render(){return console.log("com Weather render"),r.elem(["div",{ref:e=>{o.div=e}},["div",{id:"my-weather-wrapper"},a.state.data_ViewVisible?["div",{className:"view"}].concat(a.state.data_W.map(((e,t)=>["div",{className:"card mb-3",key:e.name+", "+e.sys.country},["div",{className:"card-header"},["p",null,e.name+", "+e.sys.country],t||a.state.data_SettingVisible?[React.Fragment,null]:["svg",{onClick:i.settingMode,className:"bi bi-gear",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",fill:"currentColor",viewBox:"0 0 16 16"},["path",{d:"M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"}],["path",{d:"M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"}]]],["div",{className:"card-body"},["div",null,["img",{src:"https://openweathermap.org/img/wn/"+e.weather[0].icon+"@2x.png"}],["h4",null,i.kelvin2Celsius(e.main.temp)+"℃"]],["div",{className:"card-text"},["div",null,"Feels like "+i.kelvin2Celsius(e.main.feels_like)+"℃. "+i.capitalizeFirstLetter(e.weather[0].description)+". "+i.wind2words(i.ms2kmh(e.wind.speed))],["div",null,["div",{className:"weather-params"},["svg",{transform:"rotate("+e.wind.deg+")",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},["path",{d:"M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"}]],["div",null," "+e.wind.speed.toFixed(1)+"m/s "+i.deg2words(e.wind.deg)]],["div",{className:"weather-params right"},["svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},["path",{d:"M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.32,20.45 4.93,20.07V20.07C3.12,18.26 2,15.76 2,13A10,10 0 0,1 12,3M22,13C22,15.76 20.88,18.26 19.07,20.07V20.07C18.68,20.45 18.05,20.45 17.66,20.06C17.27,19.67 17.27,19.04 17.66,18.65V18.65C19.11,17.2 20,15.21 20,13C20,12 19.81,11 19.46,10.1L20.67,8C21.5,9.5 22,11.18 22,13Z"}]],["div",null," "+e.main.pressure+"hPa"]]],["div",null,["div",{className:"weather-params"},"Humidity: "+e.main.humidity+"%"],["div",{className:"weather-params right"},"Dew point: "+i.dewPoint(e.main.temp,e.main.humidity)]],["div",null,["div",{className:"weather-params"},"Visibility: "+(e.visibility/1e3).toFixed(1)+"km"]]]]]))):[React.Fragment,null],a.state.data_SettingVisible?["div",{className:"card mb-3 setting"},["div",{className:"card-header"},["p",null,"Setting"],a.state.data_W.length?["svg",{className:"bi bi-x-lg",xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",fill:"currentColor",viewBox:"0 0 16 16",onClick:i.settingMode},["path",{d:"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"}]]:[React.Fragment,null]],["div",{className:"card-body text-dark"},a.state.data_W.length?["div",{className:"city-container",onMouseDown:i.cityOnMousedown,onMouseMove:i.cityOnMousemove,onTouchStart:i.cityOnMousedown,onTouchMove:i.cityOnMousemove}].concat(a.state.data_W.map((e=>["div",{className:"city"},["svg",{className:"bi bi-list","data-name":"move",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",fill:"currentColor",viewBox:"0 0 16 16"},["path",{fillRule:"evenodd",d:"M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"}]],["div",{className:"city-name","data-name":e.name},e.name+", "+e.sys.country],["svg",{className:"bi bi-trash3","data-name":"bin",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16"},["path",{d:"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"}]]]))):[React.Fragment,null],["div",{className:"input-container"},["div",null,"Add location:"],["div",{className:"input-group input-group-sm mb-3"},["input",{className:"form-control",type:"text","aria-label":"Small","aria-describedby":"inputGroup-sizing-sm",onInput:i.cityOnInput,onKeyDown:i.addCityOnEnter}],["div",{className:"input-group-append"},["span",{onClick:i.addCityOnEnter,className:"input-group-text",id:"inputGroup-sizing-sm"},["svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",viewBox:"0 0 24 24"},["path",{d:"M20 4V10.5C20 14.09 17.09 17 13.5 17H7.83L10.92 20.09L9.5 21.5L4 16L9.5 10.5L10.91 11.91L7.83 15H13.5C16 15 18 13 18 10.5V4H20Z"}]]]]]]]]:[React.Fragment,null]]])}css="\n<style scoped>\n  #my-weather-wrapper {\n    font-family: Roboto Condensed, Arial;\n\n    display: inline-flex;\n    justify-content: flex-start;\n    flex-wrap: nowrap;\n    flex-direction: row;\n  }\n  #my-weather-wrapper .card {\n    border:none;\n    max-width:50vw;\n    width:12rem;\n  }\n  .card {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    min-width: 0;\n    word-wrap: break-word;\n    background-color: #fff;\n    background-clip: border-box;\n    border: 1px solid rgba(0, 0, 0, 0.125);\n    border-radius: 0.25rem;\n  }\n  .card > .list-group:first-child .list-group-item:first-child {\n    border-top-left-radius: 0.25rem;\n    border-top-right-radius: 0.25rem;\n  }\n  .card > .list-group:last-child .list-group-item:last-child {\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem;\n  }\n  .card-body {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    padding: 1.25rem;\n  }\n  \n  #my-weather-wrapper .card-header {\n    border:none;\n    display:flex;\n    justify-content: space-between;\n    font-size:.8em;\n    font-weight:700;\n    padding:.5rem .5rem;\n  }\n  .card-header {\n    padding: 0.75rem 1.25rem;\n    margin-bottom: 0;\n    background-color: rgba(0, 0, 0, 0.03);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n  }\n  #my-weather-wrapper .card-header p {\n    margin-top:0;\n    margin-bottom:0;\n    text-align:left;\n    height: 18px;\n    width:calc(100% - 18px)\n  }\n  #my-weather-wrapper .card-header svg {\n     cursor:pointer;\n  }\n  #my-weather-wrapper .card-body {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    padding:0 .75rem .75rem .75rem;\n  }\n  #my-weather-wrapper h4 {\n    font-size: 1.5rem;\n    margin-top: 0;\n    margin-bottom: 0;\n    font-family: inherit;\n    font-weight: 500;\n    line-height: 1.2;\n    color: inherit;  \n  }\n  \n  #my-weather-wrapper .card-body img {\n    height:5rem;\n  }\n  #my-weather-wrapper .view .card-body > div:nth-child(1) {\n    display:flex;\n    align-items: center;\n  }\n  #my-weather-wrapper .view .card-body > div:nth-child(n+2) {\n    display:flex;\n    flex-direction: column;\n    justify-content: flex-start;\n  }\n  #my-weather-wrapper h4 {\n    margin-bottom:0;\n  }\n  #my-weather-wrapper .card-text > div {\n    font-size:.8em;\n  }\n  #my-weather-wrapper .card-text > div:nth-child(1) {\n     margin-bottom:.5rem;\n  }\n  #my-weather-wrapper .card-text > div:nth-child(n+2) {\n    display:flex;\n    justify-content: space-between;\n  }\n  #my-weather-wrapper .weather-params {\n    display:flex;\n    align-items: center;\n    font-size:.95em;\n    width:53%;\n    white-space:nowrap;\n  }\n  #my-weather-wrapper .weather-params.right {\n    width:47%;\n  }\n  #my-weather-wrapper .weather-params svg {\n    width: 1em;\n  }\n  \n  #my-weather-wrapper .setting .card-body {\n    padding:.75rem;\n  }\n  #my-weather-wrapper .city-container {\n    position:relative;\n    transition:max-height .25s linear .25s;\n    \n    -ms-user-select: none;\n    -moz-user-select: none;\n    -khtml-user-select: none;\n    -webkit-user-select: none;\n  }\n  #my-weather-wrapper .city {\n    background:rgb(240 240 240 / 1);\n    border-radius:.2rem;\n    /* box-sizing: border-box; */\n    display:flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size:.85rem;\n    padding:.2rem .4rem .3rem .4rem;\n    position:absolute;\n    width:100%;\n    transition:opacity .25s linear 0s;\n  }\n  \n  *, *::before, *::after {\n    box-sizing: border-box;\n  }\n  #my-weather-wrapper .city-name {\n    width: calc(100% - 40px);\n  }\n  #my-weather-wrapper .bi-list {\n    cursor:pointer;\n  }\n  #my-weather-wrapper .bi-trash3 {\n    cursor:pointer;\n  }\n  #my-weather-wrapper .input-container {\n    margin-top:2rem;\n    text-align:left;\n  }\n  #my-weather-wrapper .input-container svg {\n    cursor:pointer;\n  }\n\n  #my-weather-wrapper .mb-3 {\n    margin-bottom: 1rem !important;\n  }\n  #my-weather-wrapper .input-group {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: stretch;\n    -ms-flex-align: stretch;\n    align-items: stretch;\n  }  \n  #my-weather-wrapper .form-control {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 auto;\n    flex: 1 1 auto;\n    width: 1%;\n    margin-bottom: 0;\n\n    display: block;\n    width: 100%;\n    padding: 0.2rem 0.5rem;\n    font-family: inherit;\n    font-size: .875rem;\n    line-height: 1.5;\n    color: #495057;\n    background-color: #fff;\n    background-clip: padding-box;\n    border: 1px solid #ced4da;\n    border-radius: 0.25rem;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  }\n  #my-weather-wrapper .form-control:focus {\n    color: #495057;\n    background-color: #fff;\n    border-color: #80bdff;\n    outline: 0;\n    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);\n    z-index: 3;\n  }\n  #my-weather-wrapper .input-group-append {\n    padding: 0.35rem 0.5rem 0 0.5rem;\n    line-height: 1.5;\n    background-color: #e9ecef;\n    border:1px solid #ced4da;\n    border-radius: 0.25rem;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    margin-left: -1px;\n  }\n</style>\n"}window.customElements.define("com-weather",class extends HTMLElement{constructor(){super(),this.innerHTML=""}connectedCallback(){this.initShadowDOM()}initShadowDOM(){let e=this.attachShadow({mode:"open"});const t=React.createElement(s);ReactDOM.createRoot(e).render(t)}})},362:(e,t,n)=>{"use strict";n.d(t,{Z:()=>g});var r=n(81),a=n.n(r),i=n(645),o=n.n(i),s=n(667),l=n.n(s),d=new URL(n(954),n.b),c=new URL(n(397),n.b),p=new URL(n(166),n.b),u=o()(a()),m=l()(d),h=l()(c),f=l()(p);u.push([e.id,"@font-face {\r\n  font-family: 'Roboto Condensed';\r\n  src: local('Roboto Condensed Regular'), local('Roboto-Condensed-Regular'),\r\n      url("+m+") format('woff2'),\r\n      url("+h+") format('woff'),\r\n      url("+f+") format('truetype');\r\n  font-weight: 400;\r\n  font-style: normal;\r\n}",""]);const g=u},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,a,i){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(r)for(var s=0;s<this.length;s++){var l=this[s][0];null!=l&&(o[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);r&&o[c[0]]||(void 0!==i&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=i),n&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=n):c[2]=n),a&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=a):c[4]="".concat(a)),t.push(c))}},t}},667:e=>{"use strict";e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{"use strict";e.exports=function(e){return e[1]}},267:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>y});var r=n(379),a=n.n(r),i=n(795),o=n.n(i),s=n(569),l=n.n(s),d=n(565),c=n.n(d),p=n(216),u=n.n(p),m=n(589),h=n.n(m),f=n(362),g={};g.styleTagTransform=h(),g.setAttributes=c(),g.insert=l().bind(null,"head"),g.domAPI=o(),g.insertStyleElement=u(),a()(f.Z,g);const y=f.Z&&f.Z.locals?f.Z.locals:void 0},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},o=[],s=0;s<e.length;s++){var l=e[s],d=r.base?l[0]+r.base:l[0],c=i[d]||0,p="".concat(d," ").concat(c);i[d]=c+1;var u=n(p),m={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==u)t[u].references++,t[u].updater(m);else{var h=a(m,r);r.byIndex=s,t.splice(s,0,{identifier:p,updater:h,references:1})}o.push(p)}return o}function a(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,a){var i=r(e=e||[],a=a||{});return function(e){e=e||[];for(var o=0;o<i.length;o++){var s=n(i[o]);t[s].references--}for(var l=r(e,a),d=0;d<i.length;d++){var c=n(i[d]);0===t[c].references&&(t[c].updater(),t.splice(c,1))}i=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var a=void 0!==n.layer;a&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,a&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},166:(e,t,n)=>{"use strict";e.exports=n.p+"9acfa08f547f6a2fd149.ttf"},397:(e,t,n)=>{"use strict";e.exports=n.p+"25787041ddfe8df69d5d.woff"},954:(e,t,n)=>{"use strict";e.exports=n.p+"512246f3e4dd1aa9f3b6.woff2"}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,n(267),n(829)})();