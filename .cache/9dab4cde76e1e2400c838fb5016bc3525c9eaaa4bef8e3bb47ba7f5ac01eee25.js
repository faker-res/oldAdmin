{"source":"webpackJsonp([73],{1354:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i,o=n(857),a=(i=o)&&i.__esModule?i:{default:i};var r={};e.default={name:\"\",data:function(){return{beizhuxiugai:!0,beizhu_zc:\"\",MemberBounsData:{},HuiYuanRenShu:0}},mounted:function(){var e=this;(r=new a.default(\"#fuzhi\")).on(\"success\",function(t){e.$Message.success(\"复制 \"+t.text+\" 成功\"),t.clearSelection()}),this.getBounsDetails()},methods:{getBounsDetails:function(){var e=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanFanShuiXiangQing,{id:this.$route.query.id,siteId:this.$route.query.siteId}).then(function(t){e.MemberBounsData=t.data.data})},ZhuangTai:function(){var e=this,t=\"yes\"===this.MemberBounsData.status?\"停用\":\"启用\";this.$Modal.confirm({title:\"提示\",content:\"确定\"+t+\"?\",onOk:function(){e.$root.HTTP_ALLLINKPOST(e.$root.HTTP_L.HTTP_HuiYuanFanShuiZhuangTaiXiuGai,{id:e.MemberBounsData.id,status:\"yes\"===e.MemberBounsData.status?\"no\":\"yes\",siteId:e.MemberBounsData.siteId}).then(function(t){e.$Message.success(\"状态修改成功！\"),\"yes\"==e.MemberBounsData.status?e.MemberBounsData.status=\"no\":e.MemberBounsData.status=\"yes\"}).catch(function(t){e.$Message.error(\"状态修改失败！\")})}})}},destroyed:function(){r.destroy()}}},1540:function(t,e,n){var i=n(1541);\"string\"==typeof i&&(i=[[t.i,i,\"\"]]),i.locals&&(t.exports=i.locals);n(75)(\"94020d5a\",i,!1,{})},1541:function(t,e,n){(t.exports=n(74)(!1)).push([t.i,\"\\n.page-boot .b_link a[data-v-1104de08] {\\n  margin-right: 15px;\\n}\\n.tablezl[data-v-1104de08] {\\n  margin-top: 13px;\\n}\\n.tablezl th[data-v-1104de08] {\\n  width: 100px;\\n}\\n\",\"\"])},1542:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i(\"div\",{staticClass:\"user_info\"},[i(\"div\",{staticClass:\"layout\"},[i(\"div\",{staticClass:\"page-header\"},[i(\"h1\",{staticClass:\"binding\"},[n._v(n._s(n.$route.meta.title)+\"\\n        \"),i(\"span\",[n._v(n._s(n.MemberBounsData.userName))])])]),n._v(\" \"),i(\"div\",{staticClass:\"page-con1\"},[i(\"div\",{staticClass:\"blockquote\"},[i(\"Row\",[i(\"Col\",{attrs:{span:\"24\"}},[i(\"Card\",[i(\"div\",{attrs:{slot:\"title\"},slot:\"title\"},[i(\"h2\",[n._v(\"返水等级信息\")])]),n._v(\" \"),i(\"div\",{staticClass:\"card-content\"},[i(\"ul\",{staticClass:\"ulDetails\"},[i(\"li\",[i(\"b\",[n._v(\"等级代码：\")]),n._v(n._s(n.MemberBounsData.levelLabel))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"站点ID：\")]),n._v(n._s(n.MemberBounsData.siteId))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"最低下注金额：\")]),n._v(n._s(n.MemberBounsData.lessBetAmount))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"默认返水：\")]),n._v(\" \"),i(\"Tag\",{attrs:{color:\"yes\"===n.MemberBounsData.default?\"yellow\":\"#ddd\"}},[n._v(\"\\n                    \"+n._s(\"yes\"===n.MemberBounsData.default?\"是\":\"否\")+\"\\n                  \")])],1),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"返水等级：\")]),n._v(n._s(n.MemberBounsData.levelName))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"站点名称：\")]),n._v(n._s(n.MemberBounsData.siteName))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"最大返水金额：\")]),n._v(n._s(n.MemberBounsData.maxBonusAmonut))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"状态：\")]),n._v(\" \"),\"no\"==n.MemberBounsData.status?i(\"span\",[i(\"Tag\",{attrs:{color:\"red\"}},[n._v(\"停用\")]),n._v(\" \"),i(\"a\",{attrs:{href:\"javascript:\"},on:{click:n.ZhuangTai}},[n._v(\"启用\")])],1):n._e(),n._v(\" \"),\"yes\"==n.MemberBounsData.status?i(\"span\",[\"yes\"==n.MemberBounsData.status?i(\"Tag\",{attrs:{color:\"green\"}},[n._v(\"启用\")]):n._e(),n._v(\" \"),\"yes\"==n.MemberBounsData.status?i(\"a\",{attrs:{href:\"javascript:\"},on:{click:n.ZhuangTai}},[n._v(\"停用\")]):n._e()],1):n._e()]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"返水名称:\")]),n._v(n._s(n.MemberBounsData.levelAlias))]),n._v(\" \"),i(\"li\",[i(\"b\",[n._v(\"备注：\")]),n._v(n._s(n.MemberBounsData.remark?n.MemberBounsData.remark:\"暂无\"))])]),n._v(\" \"),i(\"div\",{staticClass:\"time\"},[i(\"span\",[i(\"b\",[n._v(\"创建时间：\")]),n._v(n._s(n.$moment.unix(n.MemberBounsData.created_at-0).format(\"llll\")))]),n._v(\" \"),i(\"span\",[i(\"b\",[n._v(\"更新时间：\")]),n._v(n._s(n.$moment.unix(n.MemberBounsData.updated_at-0).format(\"llll\")))])])])])],1)],1)],1),n._v(\" \"),i(\"div\",{staticClass:\"blockquote\"},[i(\"Row\",[i(\"Col\",{attrs:{span:\"24\"}},[i(\"Card\",[i(\"div\",{attrs:{slot:\"title\"},slot:\"title\"},[i(\"h2\",[n._v(\"返水信息\")])]),n._v(\" \"),i(\"div\",{staticClass:\"card-content\"},n._l(n.MemberBounsData.platform,function(t,e){return i(\"div\",{key:e},[i(\"div\",{staticClass:\"page-header\"},[i(\"h3\",{staticClass:\"binding\"},[i(\"b\",[n._v(n._s(t.name))])])]),n._v(\" \"),i(\"ul\",{staticClass:\"ulDetailsDlCJ\"},n._l(t.list,function(t,e){return i(\"li\",{key:e},[i(\"span\",[i(\"b\",{staticClass:\"key\"},[n._v(\"\\n                          \"+n._s(t.name)+\" :\\n                          \")]),n._v(\" \"),i(\"span\",{staticClass:\"value\"},[n._v(\"\\n                          \"+n._s(t.value)+\"\\n                          \")])])])}),0)])}),0)])],1)],1)],1)]),n._v(\" \"),i(\"div\",{staticClass:\"page-boot\"},[i(\"div\",{staticClass:\"b_link\"},[i(\"a\",{attrs:{href:\"javascript:\"},on:{click:n.$root.go_back}},[n._v(\"返回上一页\")]),n._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"ModifyMemberBouns\",query:{id:n.MemberBounsData.id,isVerify:!0}}}},[n._v(\"编辑会员信息\")]),n._v(\" \"),i(\"router-link\",{attrs:{to:{name:\"MemberBounsCreate\"}}},[n._v(\"新增会员返水信息\")])],1)])])])};i._withStripped=!0;var o={render:i,staticRenderFns:[]};e.default=o},673:function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var i=n(1354),o=n.n(i);for(var a in i)\"default\"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);var r=n(1542),s=n.n(r),u=!1;var l=function(t){u||n(1540)},c=n(63)(o.a,s.a,!1,l,\"data-v-1104de08\",null);c.options.__file=\"src/template/Member/MemberBounsDetails.vue\",e.default=c.exports},857:function(t,e,n){var i,o,a,r;r=function(t,e,n,i){\"use strict\";var o=s(e),a=s(n),r=s(i);function s(t){return t&&t.__esModule?t:{default:t}}var u=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};var l=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}();var c=function(t){function i(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,i);var n=function(t,e){if(!t)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return!e||\"object\"!=typeof e&&\"function\"!=typeof e?t:e}(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return n.resolveOptions(e),n.listenClick(t),n}return function(t,e){if(\"function\"!=typeof e&&null!==e)throw new TypeError(\"Super expression must either be null or a function, not \"+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(i,a.default),l(i,[{key:\"resolveOptions\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=\"function\"==typeof t.action?t.action:this.defaultAction,this.target=\"function\"==typeof t.target?t.target:this.defaultTarget,this.text=\"function\"==typeof t.text?t.text:this.defaultText,this.container=\"object\"===u(t.container)?t.container:document.body}},{key:\"listenClick\",value:function(t){var e=this;this.listener=(0,r.default)(t,\"click\",function(t){return e.onClick(t)})}},{key:\"onClick\",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new o.default({action:this.action(e),target:this.target(e),text:this.text(e),container:this.container,trigger:e,emitter:this})}},{key:\"defaultAction\",value:function(t){return f(\"action\",t)}},{key:\"defaultTarget\",value:function(t){var e=f(\"target\",t);if(e)return document.querySelector(e)}},{key:\"defaultText\",value:function(t){return f(\"text\",t)}},{key:\"destroy\",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:\"isSupported\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[\"copy\",\"cut\"],e=\"string\"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),i}();function f(t,e){var n=\"data-clipboard-\"+t;if(e.hasAttribute(n))return e.getAttribute(n)}t.exports=c},o=[t,n(858),n(860),n(861)],void 0===(a=\"function\"==typeof(i=r)?i.apply(e,o):i)||(t.exports=a)},858:function(t,e,n){var i,o,a,r;r=function(t,e){\"use strict\";var n,i=(n=e)&&n.__esModule?n:{default:n};var o=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t};var a=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),r=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:\"resolveOptions\",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.container=t.container,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=\"\"}},{key:\"initSelection\",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:\"selectFake\",value:function(){var t=this,e=\"rtl\"==document.documentElement.getAttribute(\"dir\");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=this.container.addEventListener(\"click\",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement(\"textarea\"),this.fakeElem.style.fontSize=\"12pt\",this.fakeElem.style.border=\"0\",this.fakeElem.style.padding=\"0\",this.fakeElem.style.margin=\"0\",this.fakeElem.style.position=\"absolute\",this.fakeElem.style[e?\"right\":\"left\"]=\"-9999px\";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+\"px\",this.fakeElem.setAttribute(\"readonly\",\"\"),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,i.default)(this.fakeElem),this.copyText()}},{key:\"removeFake\",value:function(){this.fakeHandler&&(this.container.removeEventListener(\"click\",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:\"selectTarget\",value:function(){this.selectedText=(0,i.default)(this.target),this.copyText()}},{key:\"copyText\",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:\"handleResult\",value:function(t){this.emitter.emit(t?\"success\":\"error\",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:\"clearSelection\",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:\"destroy\",value:function(){this.removeFake()}},{key:\"action\",set:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:\"copy\";if(this._action=t,\"copy\"!==this._action&&\"cut\"!==this._action)throw new Error('Invalid \"action\" value, use either \"copy\" or \"cut\"')},get:function(){return this._action}},{key:\"target\",set:function(t){if(void 0!==t){if(!t||\"object\"!==(void 0===t?\"undefined\":o(t))||1!==t.nodeType)throw new Error('Invalid \"target\" value, use a valid Element');if(\"copy\"===this.action&&t.hasAttribute(\"disabled\"))throw new Error('Invalid \"target\" attribute. Please use \"readonly\" instead of \"disabled\" attribute');if(\"cut\"===this.action&&(t.hasAttribute(\"readonly\")||t.hasAttribute(\"disabled\")))throw new Error('Invalid \"target\" attribute. You can\\'t cut text from elements with \"readonly\" or \"disabled\" attributes');this._target=t}},get:function(){return this._target}}]),e}();t.exports=r},o=[t,n(859)],void 0===(a=\"function\"==typeof(i=r)?i.apply(e,o):i)||(t.exports=a)},859:function(t,e){t.exports=function(t){var e;if(\"SELECT\"===t.nodeName)t.focus(),e=t.value;else if(\"INPUT\"===t.nodeName||\"TEXTAREA\"===t.nodeName){var n=t.hasAttribute(\"readonly\");n||t.setAttribute(\"readonly\",\"\"),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute(\"readonly\"),e=t.value}else{t.hasAttribute(\"contenteditable\")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}},860:function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var i=this;function o(){i.off(t,o),e.apply(n,arguments)}return o._=e,this.on(t,o,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var a=0,r=i.length;a<r;a++)i[a].fn!==e&&i[a].fn._!==e&&o.push(i[a]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},861:function(t,e,n){var d=n(862),v=n(863);t.exports=function(t,e,n){if(!t&&!e&&!n)throw new Error(\"Missing required arguments\");if(!d.string(e))throw new TypeError(\"Second argument must be a String\");if(!d.fn(n))throw new TypeError(\"Third argument must be a Function\");if(d.node(t))return c=e,f=n,(l=t).addEventListener(c,f),{destroy:function(){l.removeEventListener(c,f)}};if(d.nodeList(t))return r=t,s=e,u=n,Array.prototype.forEach.call(r,function(t){t.addEventListener(s,u)}),{destroy:function(){Array.prototype.forEach.call(r,function(t){t.removeEventListener(s,u)})}};if(d.string(t))return i=t,o=e,a=n,v(document.body,i,o,a);throw new TypeError(\"First argument must be a String, HTMLElement, HTMLCollection, or NodeList\");var i,o,a,r,s,u,l,c,f}},862:function(t,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&(\"[object NodeList]\"===e||\"[object HTMLCollection]\"===e)&&\"length\"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return\"string\"==typeof t||t instanceof String},n.fn=function(t){return\"[object Function]\"===Object.prototype.toString.call(t)}},863:function(t,e,n){var r=n(864);function a(t,e,n,i,o){var a=function(e,n,t,i){return function(t){t.delegateTarget=r(t.target,n),t.delegateTarget&&i.call(e,t)}}.apply(this,arguments);return t.addEventListener(n,a,o),{destroy:function(){t.removeEventListener(n,a,o)}}}t.exports=function(t,e,n,i,o){return\"function\"==typeof t.addEventListener?a.apply(null,arguments):\"function\"==typeof n?a.bind(null,document).apply(null,arguments):(\"string\"==typeof t&&(t=document.querySelectorAll(t)),Array.prototype.map.call(t,function(t){return a(t,e,n,i,o)}))}},864:function(t,e){if(\"undefined\"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}t.exports=function(t,e){for(;t&&9!==t.nodeType;){if(\"function\"==typeof t.matches&&t.matches(e))return t;t=t.parentNode}}}});"}