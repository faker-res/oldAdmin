{"source":"webpackJsonp([98],{1413:function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0}),t.default={data:function(){return{levelInfo:{},levelData:{},infoList:[]}},mounted:function(){var e=this;this.$nextTick(function(){e.getLevelDetails()})},methods:{getLevelDetails:function(){var t=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuDengJiXiangQing,{id:this.$route.query.id}).then(function(e){t.levelInfo=e.data.data})}}}},1699:function(e,t,n){var a=n(1700);\"string\"==typeof a&&(a=[[e.i,a,\"\"]]),a.locals&&(e.exports=a.locals);n(75)(\"892ead44\",a,!1,{})},1700:function(e,t,n){(e.exports=n(74)(!1)).push([e.i,\"\\n.blockquote b[data-v-757cc7a3] {\\n  display: inline-block;\\n  width: 180px;\\n  text-align: left;\\n}\\n\",\"\"])},1701:function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n(\"div\",{staticClass:\"user_info\"},[n(\"div\",{staticClass:\"layout\"},[n(\"div\",{staticClass:\"page-header\"},[n(\"h1\",{staticClass:\"binding\"},[e._v(\"\\n        \"+e._s(e.$route.meta.title)+\"\\n        \"),n(\"span\",[e._v(e._s(\"MemberLevelModel\"===e.$route.query.level?\"会员等级\":\"AgencyLevelModel\"===e.$route.query.level?\"代理等级\":\"会员返水等级\"))])])]),e._v(\" \"),n(\"div\",{staticClass:\"page-con1\"}),e._v(\" \"),n(\"div\",{staticClass:\"page-boot\"},[n(\"div\",{staticClass:\"b_link\"},[n(\"a\",{attrs:{href:\"javascript:\"},on:{click:e.$root.go_back}},[e._v(\"返回上一页\")])])])])])};a._withStripped=!0;var i={render:a,staticRenderFns:[]};t.default=i},728:function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var a=n(1413),i=n.n(a);for(var s in a)\"default\"!==s&&function(e){n.d(t,e,function(){return a[e]})}(s);var o=n(1701),l=n.n(o),r=!1;var c=function(e){r||n(1699)},u=n(63)(i.a,l.a,!1,c,\"data-v-757cc7a3\",null);u.options.__file=\"src/template/SystemManagement/SystemConfigDetail.vue\",t.default=u.exports}});"}