{"source":"webpackJsonp([71],{1405:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(n(144)),i=a(n(857));function a(t){return t&&t.__esModule?t:{default:t}}var o={};e.default={name:\"\",data:function(){return{beizhuxiugai:!0,beizhu_zc:\"\",MiMaSheZhiTC:!1,ZhanDianXiangQingData:{},rebateObj:{},HuiYuanRenShu:0,ConfigData:{register:{},limit:{},service:{},close:{}}}},computed:{newP:function(){if(this.MiMaSheZhiTC)return this.ChongSheMiMa()}},beforeRouteEnter:function(t,e,n){n(function(o){o.$root.HTTP_ALLLINKPOST(o.$root.HTTP_L.HTTP_ZhanDianXiangQing,{systemId:o.$route.query.id}).then(function(n){for(var t in n.data.data.rebate=JSON.parse(n.data.data.rebate),o.rebateObj=(0,r.default)({},o.$root.Lottclass),o.rebateObj)o.rebateObj[t].forEach(function(t){for(var e in n.data.data.rebate)e==t.id&&(t.rebate=n.data.data.rebate[e])});for(var e in o.ZhanDianXiangQingData=n.data.data,o.ConfigData=JSON.parse(n.data.data.siteConfig),o.ConfigData)\"\"===o.ConfigData[e]&&(o.ConfigData[e]=\"-\");for(var i in o.ConfigData.Android)\"\"===o.ConfigData.Android[i]&&(o.ConfigData.Android[i]=\"-\");for(var a in o.ConfigData.IOS)\"\"===o.ConfigData.IOS[a]&&(o.ConfigData.IOS[a]=\"-\")})})},mounted:function(){var e=this;(o=new i.default(\"#fuzhi\")).on(\"success\",function(t){e.$Message.success(\"复制 \"+t.text+\" 成功\"),t.clearSelection(),e.MiMaSheZhiTC=!1})},methods:{},destroyed:function(){o.destroy()}}},1675:function(t,e,n){var i=n(1676);\"string\"==typeof i&&(i=[[t.i,i,\"\"]]),i.locals&&(t.exports=i.locals);n(75)(\"66b064fe\",i,!1,{})},1676:function(t,e,n){(t.exports=n(74)(!1)).push([t.i,\"\\n.page-boot .b_link a[data-v-005020a8] {\\n  margin-right: 15px;\\n}\\n.tablezl[data-v-005020a8] {\\n  margin-top: 13px;\\n}\\n.tablezl th[data-v-005020a8] {\\n  width: 100px;\\n}\\n\",\"\"])},1677:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a(\"div\",{staticClass:\"user_info\"},[a(\"div\",{staticClass:\"layout\"},[a(\"div\",{staticClass:\"page-header\"},[a(\"h1\",{staticClass:\"binding\"},[i._v(i._s(i.$route.meta.title)+\"\\n        \"),a(\"span\",[i._v(i._s(i.ZhanDianXiangQingData.siteName))])])]),i._v(\" \"),a(\"div\",{staticClass:\"page-con1\"},[a(\"div\",{staticClass:\"blockquote\"},[a(\"Row\",[a(\"i-col\",{attrs:{span:\"24\"}},[a(\"Card\",[a(\"div\",{attrs:{slot:\"title\"},slot:\"title\"},[a(\"b\",[i._v(\"站点名称:\")]),i._v(i._s(i.ZhanDianXiangQingData.siteName)+\"\\n              \")]),i._v(\" \"),a(\"div\",{staticClass:\"card-content\"},[a(\"ul\",{staticClass:\"ulDetails\"},[a(\"li\",[a(\"b\",[i._v(\"站点代码:\")]),i._v(i._s(i.ZhanDianXiangQingData.siteCode))]),i._v(\" \"),a(\"li\",[a(\"b\",[i._v(\"创建人:\")]),i._v(i._s(i.ZhanDianXiangQingData.createUserName))]),i._v(\" \"),a(\"li\",[a(\"b\",[i._v(\"更新人:\")]),i._v(i._s(i.ZhanDianXiangQingData.updateUserName?i.ZhanDianXiangQingData.updateUserName:\"暂无\"))]),i._v(\" \"),a(\"li\",[a(\"b\",[i._v(\"创建时间:\")]),i._v(i._s(i.$moment.unix(i.ZhanDianXiangQingData.created_at-0).format(\"llll\")))])]),i._v(\" \"),a(\"line\"),i._v(\" \"),a(\"Row\",[a(\"i-col\",{attrs:{span:\"6\"}},[a(\"p\",[a(\"b\",[i._v(\"站点配置：\")]),i._v(\" \"),a(\"ol\",[a(\"li\",[i._v(\"\\n                          PC注册填写项：\"+i._s(i.ConfigData.register.pc)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          H5注册填写项：\"+i._s(i.ConfigData.register.h5)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          APP注册填写项：\"+i._s(i.ConfigData.register.app)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          网站维护状态配置:\\n                          \"),\"on\"==i.ConfigData.close.status?a(\"Tag\",{attrs:{color:\"green\"}},[i._v(\"正常\")]):i._e(),i._v(\" \"),\"off\"==i.ConfigData.close.status?a(\"Tag\",{attrs:{color:\"red\"}},[i._v(\"关闭\")]):i._e()],1),i._v(\" \"),a(\"li\",[\"off\"==i.ConfigData.close.status?a(\"span\",[i._v(\"维护时间：\"+i._s(i.ConfigData.close.timeEnd?i.ConfigData.close.timeEnd:\"暂无\"))]):i._e()]),i._v(\" \"),a(\"li\",{directives:[{name:\"show\",rawName:\"v-show\",value:i.ConfigData.service.length,expression:\"ConfigData.service.length\"}]},[a(\"table\",{staticClass:\"table\"},[a(\"thead\",[a(\"tr\",[a(\"th\",[i._v(\"#\")]),i._v(\" \"),a(\"th\",[i._v(\"地址\")]),i._v(\" \"),a(\"th\",[i._v(\"状态\")])])]),i._v(\" \"),a(\"tbody\",i._l(i.ConfigData.service,function(t,e){return a(\"tr\",{key:e},[a(\"td\",[i._v(i._s(e+1))]),i._v(\" \"),a(\"td\",[i._v(i._s(t.url))]),i._v(\" \"),a(\"td\",[\"on\"==t.status?a(\"Tag\",{attrs:{color:\"green\"}},[i._v(\"正常\")]):i._e(),i._v(\" \"),\"off\"==t.status?a(\"Tag\",{attrs:{color:\"red\"}},[i._v(\"关闭\")]):i._e()],1)])}),0)])]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          最低存款：\"+i._s(i.ConfigData.limit.paymentLimit)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          最低取款：\"+i._s(i.ConfigData.limit.withdrawalsLimit)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          汇款赠送比例：\"+i._s(i.ConfigData.limit.paymentBonus)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          彩票最低下注金额：\"+i._s(i.ConfigData.limit.lotteryBetMin)+\"\\n                        \")]),i._v(\" \"),a(\"li\",[i._v(\"\\n                          彩票最高下注金额：\"+i._s(i.ConfigData.limit.lotteryBetMax)+\"\\n                        \")])])])]),i._v(\" \"),a(\"i-col\",{attrs:{span:\"6\"}},[i.ConfigData.Android?a(\"p\",[a(\"b\",[i._v(\"Android配置：\")]),i._v(\" \"),a(\"ol\",[a(\"li\",[i._v(\"版本号：\"+i._s(i.ConfigData.Android.version))]),i._v(\" \"),a(\"li\",[i._v(\"更新类型：\"+i._s(i.ConfigData.Android.type))]),i._v(\" \"),a(\"li\",[i._v(\"下载链接：\"+i._s(i.ConfigData.Android.link))]),i._v(\" \"),a(\"li\",[i._v(\"提示文字：\"+i._s(i.ConfigData.Android.tip))])])]):i._e()]),i._v(\" \"),a(\"i-col\",{attrs:{span:\"6\"}},[i.ConfigData.IOS?a(\"p\",[a(\"b\",[i._v(\"IOS配置：\")]),i._v(\" \"),a(\"ol\",[a(\"li\",[i._v(\"版本号：\"+i._s(i.ConfigData.IOS.version))]),i._v(\" \"),a(\"li\",[i._v(\"更新类型：\"+i._s(i.ConfigData.IOS.type))]),i._v(\" \"),a(\"li\",[i._v(\"下载链接：\"+i._s(i.ConfigData.IOS.link))]),i._v(\" \"),a(\"li\",[i._v(\"提示文字：\"+i._s(i.ConfigData.IOS.tip))])])]):i._e()]),i._v(\" \"),a(\"i-col\",{attrs:{span:\"6\"}},[a(\"p\",[a(\"b\",[i._v(\"其他配置：\")]),i._v(\" \"),a(\"ol\",[a(\"li\",[i._v(\"主题：\"+i._s(i.ConfigData.theme))]),i._v(\" \"),a(\"li\",[i._v(\"APP域名：\"+i._s(i.ConfigData.app_domain))]),i._v(\" \"),a(\"li\",[i._v(\"静态资源路径：\"+i._s(i.ConfigData.statics))])])])])],1)],1)])],1)],1)],1),i._v(\" \"),a(\"div\",{staticClass:\"blockquote\"},[a(\"Collapse\",[a(\"Panel\",[a(\"span\",[i._v(\"彩票返点\")]),i._v(\" \"),a(\"div\",{attrs:{slot:\"content\"},slot:\"content\"},i._l(i.rebateObj,function(t,e,n){return a(\"div\",{key:n},[a(\"div\",{staticClass:\"page-header\"},[a(\"h3\",{staticClass:\"binding\"},[a(\"b\",[i._v(i._s(e))])])]),i._v(\" \"),a(\"ul\",{staticClass:\"ulDetailsDlCJ\"},i._l(t,function(t,e){return a(\"li\",{key:e},[a(\"span\",[a(\"b\",{staticClass:\"key\"},[i._v(\"\\n                        \"+i._s(t.name)+\" :\\n                      \")]),i._v(\" \"),a(\"span\",{staticClass:\"value\"},[i._v(\"\\n                        \"+i._s(t.rebate)+\"%\\n                      \")])])])}),0)])}),0)])],1)],1)]),i._v(\" \"),a(\"div\",{staticClass:\"page-boot\"},[a(\"div\",{staticClass:\"b_link\"},[a(\"a\",{attrs:{href:\"javascript:\"},on:{click:i.$root.go_back}},[i._v(\"返回上一页\")]),i._v(\" \"),a(\"router-link\",{attrs:{to:{name:\"WebSiteModify\",query:{id:i.ZhanDianXiangQingData.id}}}},[i._v(\"编辑站点\")])],1)])])])};i._withStripped=!0;var a={render:i,staticRenderFns:[]};e.default=a},722:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=n(1405),a=n.n(i);for(var o in i)\"default\"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var r=n(1677),s=n.n(r),l=!1;var c=function(t){l||n(1675)},u=n(63)(a.a,s.a,!1,c,\"data-v-005020a8\",null);u.options.__file=\"src/template/SystemManagement/WebSiteDetails.vue\",e.default=u.exports},857:function(t,e,n){var i,a,o,r;r=function(t,e,n,i){\"use strict\";var a=s(e),o=s(n),r=s(i);function s(t){return t&&t.__esModule?t:{default:t}}var l=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};var c=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}();var u=function(t){function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,i);var n=function(t,e){if(!t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return!e||\"object\"!=typeof e&&\"function\"!=typeof e?t:e}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return n.resolveOptions(e),n.listenClick(t),n}return function(t,e){if(\"function\"!=typeof e&&null!==e)throw new TypeError(\"Super expression must either be null or a function, not \"+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(i,o.default),c(i,[{key:\"resolveOptions\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=\"function\"==typeof t.action?t.action:this.defaultAction,this.target=\"function\"==typeof t.target?t.target:this.defaultTarget,this.text=\"function\"==typeof t.text?t.text:this.defaultText,this.container=\"object\"===l(t.container)?t.container:document.body}},{key:\"listenClick\",value:function(t){var e=this;this.listener=(0,r.default)(t,\"click\",function(t){return e.onClick(t)})}},{key:\"onClick\",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new a.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:\"defaultAction\",value:function(t){return f(\"action\",t)}},{key:\"defaultTarget\",value:function(t){var e=f(\"target\",t);if(e)return document.querySelector(e)}},{key:\"defaultText\",value:function(t){return f(\"text\",t)}},{key:\"destroy\",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:\"isSupported\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[\"copy\",\"cut\"],e=\"string\"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),i}();function f(t,e){var n=\"data-clipboard-\"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=u},a=[t,n(858),n(860),n(861)],void 0===(o=\"function\"==typeof(i=r)?i.apply(e,a):i)||(t.exports=o)},858:function(t,e,n){var i,a,o,r;r=function(t,e){\"use strict\";var n,i=(n=e)&&n.__esModule?n:{default:n};var a=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};var o=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),r=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this.resolveOptions(t),this.initSelection()}return o(e,[{key:\"resolveOptions\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=\"\"}},{key:\"initSelection\",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:\"selectFake\",value:function(){var t=this,e=\"rtl\"==document.documentElement.getAttribute(\"dir\");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener(\"click\",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement(\"textarea\"),this.fakeElem.style.fontSize=\"12pt\",this.fakeElem.style.border=\"0\",this.fakeElem.style.padding=\"0\",this.fakeElem.style.margin=\"0\",this.fakeElem.style.position=\"absolute\",this.fakeElem.style[e?\"right\":\"left\"]=\"-9999px\";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+\"px\",this.fakeElem.setAttribute(\"readonly\",\"\"),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:\"removeFake\",value:function(){this.fakeHandler&&(this.container.removeEventListener(\"click\",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:\"selectTarget\",value:function(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:\"copyText\",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:\"handleResult\",value:function(t){this.emitter.emit(t?\"success\":\"error\",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:\"clearSelection\",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:\"destroy\",value:function(){this.removeFake()}},{key:\"action\",set:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:\"copy\";if(this._action=t,\"copy\"!==this._action&&\"cut\"!==this._action)throw new Error('Invalid \"action\" value, use either \"copy\" or \"cut\"')},get:function(){return this._action}},{key:\"target\",set:function(t){if(void 0!==t){if(!t||\"object\"!==(void 0===t?\"undefined\":a(t))||1!==t.nodeType)throw new Error('Invalid \"target\" value, use a valid Element');if(\"copy\"===this.action&&t.hasAttribute(\"disabled\"))throw new Error('Invalid \"target\" attribute. Please use \"readonly\" instead of \"disabled\" attribute');if(\"cut\"===this.action&&(t.hasAttribute(\"readonly\")||t.hasAttribute(\"disabled\")))throw new Error('Invalid \"target\" attribute. You can\\'t cut text from elements with \"readonly\" or \"disabled\" attributes');this._target=t}},get:function(){return this._target}}]),e}();t.exports=r},a=[t,n(859)],void 0===(o=\"function\"==typeof(i=r)?i.apply(e,a):i)||(t.exports=o)},859:function(t,e){t.exports=function(t){var e;if(\"SELECT\"===t.nodeName)t.focus(),e=t.value;else if(\"INPUT\"===t.nodeName||\"TEXTAREA\"===t.nodeName){var n=t.hasAttribute(\"readonly\");n||t.setAttribute(\"readonly\",\"\"),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute(\"readonly\"),e=t.value}else{t.hasAttribute(\"contenteditable\")&&t.focus();var i=window.getSelection(),a=document.createRange();a.selectNodeContents(t),i.removeAllRanges(),i.addRange(a),e=i.toString()}return e}},860:function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function a(){i.off(t,a),e.apply(n,arguments)}return a._=e,this.on(t,a,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,a=n.length;i<a;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],a=[];if(i&&e)for(var o=0,r=i.length;o<r;o++)i[o].fn!==e&&i[o].fn._!==e&&a.push(i[o]);return a.length?n[t]=a:delete n[t],this}},t.exports=n},861:function(t,e,n){var d=n(862),v=n(863);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error(\"Missing required arguments\");if(!d.string(e))throw new TypeError(\"Second argument must be a String\");if(!d.fn(n))throw new TypeError(\"Third argument must be a Function\");if(d.node(t))return u=e,f=n,(c=t).addEventListener(u,f),{destroy:function(){c.removeEventListener(u,f)}};if(d.nodeList(t))return r=t,s=e,l=n,Array.prototype.forEach.call(r,function(t){t.addEventListener(s,l)}),{destroy:function(){Array.prototype.forEach.call(r,function(t){t.removeEventListener(s,l)})}};if(d.string(t))return i=t,a=e,o=n,v(document.body,i,a,o);throw new TypeError(\"First argument must be a String, HTMLElement, HTMLCollection, or NodeList\");var i,a,o,r,s,l,c,u,f}},862:function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&(\"[object NodeList]\"===e||\"[object HTMLCollection]\"===e)&&\"length\"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return\"string\"==typeof t||t instanceof String},n.fn=function(t){return\"[object Function]\"===Object.prototype.toString.call(t)}},863:function(t,e,n){var r=n(864);function o(t,e,n,i,a){var o=function(e,n,t,i){return function(t){t.delegateTarget=r(t.target,n),t.delegateTarget&&i.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,o,a),{destroy:function(){t.removeEventListener(n,o,a)}}}t.exports=function(t,e,n,i,a){return\"function\"==typeof t.addEventListener?o.apply(null,arguments):\"function\"==typeof n?o.bind(null,document).apply(null,arguments):(\"string\"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return o(t,e,n,i,a)}))}},864:function(t,e){if(\"undefined\"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if(\"function\"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}}});"}