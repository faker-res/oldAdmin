{"source":"webpackJsonp([107],{1431:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r,n=u(a(144)),i=u(a(145)),o=u(a(332)),s=u(a(76)),l=u(a(333));function u(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{tip:0,parentData:[],parentName:\"\",autoVal:\"\",autoData:[],CreatRuleForm:{parent_id:\"\",name:\"\",permission_id:\"\",type:\"\",status:\"\"},CreatRuleFormRules:{name:[{required:!0,pattern:/^.*$/,message:\"请输入！\",trigger:\"blur\"}],type:[{required:!0,pattern:/^.*$/,message:\"请选择类型！\",trigger:\"blur\"}],status:[{required:!0,pattern:/^.*$/,message:\"请选择状态！\",trigger:\"blur\"}]}}},watch:{autoVal:function(t,e){t||(this.tip=4,this.$Message.error(\"该权限不存在，请重新搜索！\"),this.autoData=[],this.CreatRuleForm.permission_id=\"\")}},mounted:function(){var e=this;this.$nextTick(function(){e.getParentList().then(function(t){e.$route.query.isVerify&&e.getMenusDetails()})})},methods:{getParentList:(r=(0,l.default)(o.default.mark(function t(){var e=this;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetMenus).then(function(t){t.data.data.parents.forEach(function(t){var a={value:\"\",label:\"\",children:[]};a.value=t.id,a.label=t.name,t.children.forEach(function(t){var e={};e.value=t.id,e.label=t.name,e.children=[],a.children.push(e)}),e.parentData.push(a)}),e.parentData=[{value:\"\",label:\"顶级菜单\"}].concat((0,s.default)(e.parentData))});case 2:case\"end\":return t.stop()}},t,this)})),function(){return r.apply(this,arguments)}),getMenusDetails:function(){var l=this;this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetMenusDetails,{id:this.$route.query.id}).then(function(t){var e=t.data.data,a=e.id,r=e.permission_id,i=e.uri,n=e.name,o=e.type,s=e.status;l.autoVal=i,l.CreatRuleForm.id=a,l.CreatRuleForm.name=n,l.CreatRuleForm.type=o,l.CreatRuleForm.status=s,l.CreatRuleForm.permission_id=r,t.data.data.parent&&(l.parentName=t.data.data.parent.name,l.CreatRuleForm.parent_id=t.data.data.parent.id)})},parentFormat:function(t,e){if(0!==t.length){var a=t.length-1;return this.CreatRuleForm.parent_id=e[a].value,this.parentName=\"顶级菜单\"!==t[a],t[a]}if(this.$route.query.isVerify)return this.parentName?this.parentName:\"顶级菜单\"},autoSearch:function(t){var e=this;this.tip=1;var a=this.$root.HTTP_L.HTTP_SearchUri,r={uri:this.autoVal};return this.autoVal?this.autoVal.length<=2?!(this.tip=2):void this.$root.HTTP_ALLLINKGET(a,r).then(function(t){(0,i.default)(t.data.data).length?(e.tip=3,1===(0,i.default)(t.data.data).length&&(e.CreatRuleForm.permission_id=(0,i.default)(t.data.data)[0])):(e.tip=4,e.$Message.error(\"该权限不存在，请重新搜索！\")),e.autoData=t.data.data}):(this.tip=0,!1)},autoSelect:function(t){for(var e in this.autoData)if(this.autoData[e]===t){this.CreatRuleForm.permission_id=e;break}},CreatRule:function(){var i=this;this.$refs.CreatRuleForm.validate(function(t){if(t){i.$root.loading();var e=void 0,a=(0,n.default)({},i.CreatRuleForm);i.$route.query.isVerify?(e=i.$root.HTTP_L.HTTP_UpdateMenus,i.$root.HTTP_ALLLINKPOST(e,a).then(function(t){i.$Spin.hide(),i.$root.modal(\"success\",\"\",\"编辑成功！\")}).catch(function(t){i.$Spin.hide()})):(e=i.$root.HTTP_L.HTTP_CreateMenus,i.$root.HTTP_ALLLINKPOST(e,a).then(function(t){i.$Spin.hide(),i.CreatRuleForm.name=\"\",i.CreatRuleForm.type=\"\",i.CreatRuleForm.status=\"\",i.autoVal=\"\",i.$root.modal(\"success\",\"\",\"添加成功！\")}).catch(function(t){i.$Spin.hide()}));var r=(new Date).getTime();i.$store.commit(\"menuSortChange\",r)}})}}}},1746:function(t,e,a){var r=a(1747);\"string\"==typeof r&&(r=[[t.i,r,\"\"]]),r.locals&&(t.exports=r.locals);a(75)(\"6e6c4294\",r,!1,{})},1747:function(t,e,a){(t.exports=a(74)(!1)).push([t.i,\"\",\"\"])},1748:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r(\"div\",{staticClass:\"user_info\"},[r(\"div\",{staticClass:\"layout\"},[r(\"div\",{staticClass:\"page-header\"},[r(\"h1\",{staticClass:\"binding\"},[e._v(e._s(e.$route.meta.title))])]),e._v(\" \"),r(\"div\",{staticClass:\"page-con1\"},[r(\"Form\",{ref:\"CreatRuleForm\",attrs:{model:e.CreatRuleForm,rules:e.CreatRuleFormRules,\"label-width\":210}},[r(\"FormItem\",{attrs:{label:\"父类\",prop:\"parent_id\"}},[r(\"Cascader\",{staticStyle:{width:\"260px\"},attrs:{data:e.parentData,\"render-format\":e.parentFormat,\"change-on-select\":\"\"}})],1),e._v(\" \"),r(\"FormItem\",{attrs:{label:\"名称\",prop:\"name\"}},[r(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"请输入菜单名称\"},model:{value:e.CreatRuleForm.name,callback:function(t){e.$set(e.CreatRuleForm,\"name\",t)},expression:\"CreatRuleForm.name\"}})],1),e._v(\" \"),r(\"FormItem\",{attrs:{label:\"URI路径\",prop:\"permission_id\"}},[r(\"AutoComplete\",{staticStyle:{width:\"260px\"},attrs:{disabled:!this.parentName,placeholder:\"以'api'开头,最小长度为3字符\"},on:{\"on-select\":e.autoSelect,\"on-search\":e.autoSearch},model:{value:e.autoVal,callback:function(t){e.autoVal=t},expression:\"autoVal\"}},[e._l(e.autoData,function(t,e,a){return r(\"Option\",{key:a,attrs:{label:t,value:t}})}),e._v(\" \"),1===e.tip?r(\"small\",{staticStyle:{display:\"block\",\"text-align\":\"center\"}},[e._v(\"搜索中...\")]):2===e.tip?r(\"small\",{staticStyle:{display:\"block\",\"text-align\":\"center\",color:\"#ed3f14\"}},[e._v(\"至少输入api三个字符\")]):3===e.tip?r(\"small\",{staticStyle:{display:\"block\",\"text-align\":\"center\"}},[e._v(\"搜索完成\")]):4===e.tip?r(\"small\",{staticStyle:{display:\"block\",\"text-align\":\"center\",color:\"#ed3f14\"}},[e._v(\"该权限不存在，请重新搜索\")]):r(\"small\",{staticStyle:{display:\"block\",\"text-align\":\"center\",color:\"#ed3f14\"}},[e._v(\"请输入您要查询的内容\")])],2)],1),e._v(\" \"),r(\"FormItem\",{attrs:{label:\"类型\",prop:\"type\"}},[r(\"Select\",{staticStyle:{width:\"260px\"},model:{value:e.CreatRuleForm.type,callback:function(t){e.$set(e.CreatRuleForm,\"type\",t)},expression:\"CreatRuleForm.type\"}},[r(\"Option\",{attrs:{value:\"nav\"}},[e._v(\"导航\")]),e._v(\" \"),r(\"Option\",{attrs:{value:\"menu\"}},[e._v(\"子菜单\")]),e._v(\" \"),r(\"Option\",{attrs:{value:\"link\"}},[e._v(\"链接\")]),e._v(\" \"),r(\"Option\",{attrs:{value:\"button\"}},[e._v(\"按钮\")])],1)],1),e._v(\" \"),r(\"FormItem\",{attrs:{label:\"状态\",prop:\"status\"}},[r(\"Select\",{staticStyle:{width:\"260px\"},model:{value:e.CreatRuleForm.status,callback:function(t){e.$set(e.CreatRuleForm,\"status\",t)},expression:\"CreatRuleForm.status\"}},[r(\"Option\",{attrs:{value:\"open\"}},[e._v(\"开启\")]),e._v(\" \"),r(\"Option\",{attrs:{value:\"close\"}},[e._v(\"关闭\")])],1)],1),e._v(\" \"),r(\"FormItem\",[r(\"Button\",{attrs:{type:\"primary\"},on:{click:e.CreatRule}},[e.$route.query.isVerify?r(\"span\",[e._v(\"确定修改\")]):r(\"span\",[e._v(\"确定创建\")])]),e._v(\" \"),r(\"Button\",{on:{click:e.$root.go_back}},[e._v(\"返回\")])],1)],1)],1)])])};r._withStripped=!0;var i={render:r,staticRenderFns:[]};e.default=i},745:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=a(1431),i=a.n(r);for(var n in r)\"default\"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);var o=a(1748),s=a.n(o),l=!1;var u=function(t){l||a(1746)},c=a(63)(i.a,s.a,!1,u,\"data-v-5528c91e\",null);c.options.__file=\"src/template/CommonPage/RuleCreate.vue\",e.default=c.exports}});"}