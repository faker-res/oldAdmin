webpackJsonp([109],{1340:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{AllMenu:[]}},created:function(){var t=JSON.parse(window.localStorage.getItem("AdminInfo"));t&&(this.AllMenu=t.rules)},computed:{menuList:function(){return this.$store.state.app.menuList}},methods:{}}},1500:function(t,e,n){var a=n(1501);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(75)("7a156b50",a,!1,{})},1501:function(t,e,n){(t.exports=n(74)(!1)).push([t.i,"\nli[data-v-0fb1f79c] {\n  margin: 5px;\n}\nli a[data-v-0fb1f79c] {\n  margin: 5px 0;\n  display: inline-block;\n}\n",""])},1502:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticClass:"user_info"},[a("div",{staticClass:"layout"},[n._m(0),n._v(" "),n._m(1),n._v(" "),a("div",{staticClass:"page-header"},[a("h1",{staticClass:"binding"},[n._v("\n                "+n._s(n.$route.meta.title)+"\n                "),a("span",[n._v("已有链接(详情不提供直接预览)")])])]),n._v(" "),a("div",{staticClass:"page-con1"},[a("div",{staticClass:"blockquote"},[a("ol",n._l(n.menuList,function(t,e){return a("li",{key:e,staticStyle:{"margin-right":"30px"},attrs:{trigger:"click"}},[a("b",{class:{nav_active:n.$route.path.includes(t.name)},attrs:{href:"javascript:void(0)"}},[n._v("\n                            "+n._s(t.title)+":\n                        ")]),n._v(" "),n._l(t.children,function(t,e){return a("router-link",{key:e,attrs:{disabled:!t.meta.isNav,to:{name:t.name,query:{}},"exact-active-class":"active"}},[n._v(n._s(t.title))])})],2)}),0)])]),n._v(" "),n._m(2),n._v(" "),a("div",{staticClass:"page-con1"},[a("div",{staticClass:"blockquote"},[a("ol",[a("li",n._l(n.AllMenu,function(t,e){return"nav"==t.location?a("router-link",{key:e,attrs:{disabled:!0,to:{name:"home_index"}}},[n._v(n._s(t.adminRuleName))]):n._e()}),1),n._v(" "),a("li",n._l(n.AllMenu,function(t,e){return"menu"==t.location?a("router-link",{key:e,attrs:{disabled:!0,to:{name:"home_index"}}},[n._v(n._s(t.adminRuleName))]):n._e()}),1),n._v(" "),a("li",n._l(n.AllMenu,function(t,e){return"link"==t.location?a("router-link",{key:e,attrs:{disabled:!0,to:{name:"home_index"}}},[n._v(n._s(t.adminRuleName))]):n._e()}),1)])])])])])};a._withStripped=!0;var i={render:a,staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header"},[n("h1",{staticClass:"binding"},[t._v("\n                后台管理中心操作简述\n                "),n("span",[t._v("说明")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-con1"},[n("div",{staticClass:"blockquote"},[n("ol",[n("li",[t._v("\n                        顶部进度条加载成功并完成 才能对页面进行操作\n                    ")]),t._v(" "),n("li",[t._v("\n                        表格内有带有蓝色的字体视为可点击或者有 Tip气泡提示\n                    ")]),t._v(" "),n("li",[t._v("\n                        点击页面没有反应:可能是网速较慢，如果排除网速较慢的问题，则是页面报错,F5刷新 ---如果依然无法点击请联系技术人员解决\n                    ")]),t._v(" "),n("li",[t._v("提示：Too Many Attempts. 是页面请求频繁，请稍后点击")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-header"},[n("h1",{staticClass:"binding"},[t._v("\n                全部接口功能大汇总\n                "),n("span",[t._v("导航-列表-操作-详情")])])])}]};e.default=i},660:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(1340),i=n.n(a);for(var s in a)"default"!==s&&function(t){n.d(e,t,function(){return a[t]})}(s);var l=n(1502),r=n.n(l),o=!1;var c=function(t){o||n(1500)},u=n(63)(i.a,r.a,!1,c,"data-v-0fb1f79c",null);u.options.__file="src/template/CommonPage/AllLink.vue",e.default=u.exports}});