{"source":"webpackJsonp([101],{1348:function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0}),n.default={data:function(){return{MemberLevelInfo:{}}},beforeRouteEnter:function(e,n,t){t(function(n){n.$root.HTTP_ALLLINKPOST(n.$root.HTTP_L.HTTP_HuiYuanDengJiXiangQing,{siteId:n.$route.query.siteId,id:n.$route.query.id}).then(function(e){n.MemberLevelInfo=e.data.data})})}}},1526:function(e,n,t){var l=t(1527);\"string\"==typeof l&&(l=[[e.i,l,\"\"]]),l.locals&&(e.exports=l.locals);t(75)(\"006292c8\",l,!1,{})},1527:function(e,n,t){(e.exports=t(74)(!1)).push([e.i,\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\",\"\"])},1528:function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t(\"div\",{staticClass:\"user_info\"},[t(\"div\",{staticClass:\"layout\"},[t(\"div\",{staticClass:\"page-header\"},[t(\"h1\",{staticClass:\"binding\"},[e._v(\"\\n        \"+e._s(e.$route.meta.title)+\"\\n        \"),t(\"span\",[e._v(e._s(e.MemberLevelInfo.userName))])])]),e._v(\" \"),t(\"div\",{staticClass:\"page-con1\"},[t(\"div\",{staticClass:\"blockquote\"},[t(\"Row\",[t(\"Col\",{attrs:{span:\"24\"}},[t(\"Card\",[t(\"div\",{attrs:{slot:\"title\"},slot:\"title\"},[t(\"h2\",[e._v(\"层级信息\")])]),e._v(\" \"),t(\"div\",{staticClass:\"card-content\"},[t(\"ol\",[t(\"li\",[t(\"b\",[e._v(\"层级别称:\")]),e._v(e._s(e.MemberLevelInfo.levelAlias))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"层级名称:\")]),e._v(e._s(e.MemberLevelInfo.levelName))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"层级人数:\")]),e._v(e._s(e.MemberLevelInfo.memberNum))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"网站名称:\")]),e._v(e._s(e.MemberLevelInfo.siteName))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"最小充值:\")]),e._v(e._s(e.MemberLevelInfo.minPay))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"存款次数:\")]),e._v(e._s(e.MemberLevelInfo.depositNumber))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"打码量:\")]),e._v(e._s(e.MemberLevelInfo.betAmount))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"打码倍数:\")]),e._v(e._s(e.MemberLevelInfo.multiple))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"彩金奖励:\")]),e._v(e._s(e.MemberLevelInfo.giftBonus))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"是否默认:\")]),e._v(\" \"),\"no\"==e.MemberLevelInfo.default?t(\"Tag\",{attrs:{color:\"#a1a1a1\"}},[e._v(\"否\")]):t(\"Tag\",{attrs:{color:\"yellow\"}},[e._v(\"是\")])],1),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"状态:\")]),e._v(\" \"),\"no\"==e.MemberLevelInfo.status?t(\"Tag\",{attrs:{color:\"red\"}},[e._v(\"关闭\")]):t(\"Tag\",{attrs:{color:\"green\"}},[e._v(\"开启\")])],1),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"备注:\")]),e._v(e._s(e.MemberLevelInfo.remark?e.MemberLevelInfo.remark:\"无\"))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"创建时间:\")]),e._v(e._s(e.$moment.unix(e.MemberLevelInfo.created_at-0).format(\"llll\")))]),e._v(\" \"),t(\"li\",[t(\"b\",[e._v(\"更新时间:\")]),e._v(e._s(e.$moment.unix(e.MemberLevelInfo.updated_at-0).format(\"llll\")))])])])])],1),e._v(\" \"),t(\"div\")],1)],1)]),e._v(\" \"),t(\"div\",{staticClass:\"page-boot\"},[t(\"div\",{staticClass:\"b_link\"},[t(\"a\",{attrs:{href:\"javascript:\"},on:{click:e.$root.go_back}},[e._v(\"返回上一页\")]),e._v(\" \"),t(\"router-link\",{attrs:{to:{name:\"MemberLevelCreate\",query:{siteId:e.MemberLevelInfo.siteId,id:e.MemberLevelInfo.id,isVerify:!0}}}},[e._v(\"编辑该会员等级信息\")])],1)])])])};l._withStripped=!0;var r={render:l,staticRenderFns:[]};n.default=r},667:function(e,n,t){\"use strict\";Object.defineProperty(n,\"__esModule\",{value:!0});var l=t(1348),r=t.n(l);for(var v in l)\"default\"!==v&&function(e){t.d(n,e,function(){return l[e]})}(v);var a=t(1528),i=t.n(a),o=!1;var s=function(e){o||t(1526)},_=t(63)(r.a,i.a,!1,s,null,null);_.options.__file=\"src/template/Member/MemberLevelDetails.vue\",n.default=_.exports}});"}