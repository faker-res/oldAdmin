{"source":"webpackJsonp([116],{1364:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s,r=a(334),n=(s=r)&&s.__esModule?s:{default:s};t.default=(0,n.default)({name:\"PayMentClassCreate\",methods:{renderFormat:function(e){return e.join(\" => \")}},watch:{res1:function(e){this.showRes=e},resDefault:function(e){this.showRes=e}},data:function(){return{res1:[],resDefault:[\"河北省\",\"张家口市\",\"怀来县\",\"沙城镇\"],showRes:[],btnLoading:!1,devices:[\"pc\",\"h5\"],PayMentClassCreateForm:{className:\"\",classStatus:\"yes\",classRemarks:\"\",createUser:\"\",classType:\"payment\",devices:\"\"},ruleValidate:{className:[{required:!0,message:\"请输入您的分组名称\",trigger:\"blur\"}],classStatus:[{required:!0,message:\"请输入您的分组状态\",trigger:\"blur\"}],createUser:[{required:!0,message:\"请输入您的创建人\",trigger:\"blur\"}]}}},created:function(){},mounted:function(){var e=this;this.$nextTick(function(){e.$route.query&&e.$route.query.paymentClassId&&e.$route.query.isVerify?e.isVerifyFn(e.$route.query.paymentClassId):e.PayMentClassCreateForm.createUser=e.$root.adminuserinfo.adminUserName})}},\"methods\",{isVerifyFn:function(e){var a=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiangQIng,{paymentClassId:e}).then(function(e){for(var t in a.PayMentClassCreateForm)a.PayMentClassCreateForm[t]=e.data.data[t];a.PayMentClassCreateForm.paymentClassId=e.data.data.id,a.PayMentClassCreateForm.updateUser=a.$root.adminuserinfo.adminUserName,a.devices=a.PayMentClassCreateForm.devices.split(\",\")})},FormSubmit:function(){var t=this;this.PayMentClassCreateForm.devices=this.devices.toString(),this.$refs.PayMentClassCreateForm.validate(function(e){e&&(t.$root.loading(),t.$route.query.isVerify?t.$root.HTTP_ALLLINKPOST(t.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiuGai,t.PayMentClassCreateForm).then(function(e){t.$Spin.hide(),t.$root.modal(\"success\",\"\",\"编辑成功！\")},function(e){t.$Spin.hide()}):t.$root.HTTP_ALLLINKPOST(t.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuChuangJian,t.PayMentClassCreateForm).then(function(e){t.$Spin.hide(),t.$root.modal(\"success\",\"\",\"创建成功！\")},function(e){t.$Spin.hide()}))})},chuanjianyonghu:function(){for(var e=\"\",t=0;t<8;t++)e+=Math.floor(10*Math.random());this.PayMentClassCreateForm.userName=e,this.PayMentClassCreateForm.phone=\"158\"+e-0}})},1570:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",{staticClass:\"content-main agent-main\"},[a(\"div\",{staticClass:\"layout\"},[a(\"div\",{staticClass:\"page-header\"},[a(\"h1\",{staticClass:\"binding\"},[t._v(t._s(t.$route.meta.title))])]),t._v(\" \"),a(\"div\",{staticClass:\"page-con1\"},[a(\"Alert\",{attrs:{\"show-icon\":\"\"}},[t._v(\"\\n        新增注意事项\\n        \"),a(\"template\",{slot:\"desc\"},[t._v(\"登入密码预设为123456。 \")])],2)],1),t._v(\" \"),a(\"div\",{staticClass:\"page-header\"},[a(\"h1\",{staticClass:\"binding\"},[a(\"Icon\",{attrs:{type:\"star\",color:\"red\"}}),t._v(\" 必填栏位\\n      \")],1)]),t._v(\" \"),a(\"div\",{staticClass:\"page-con1 form-t\"},[a(\"Form\",{ref:\"PayMentClassCreateForm\",attrs:{model:t.PayMentClassCreateForm,rules:t.ruleValidate,\"label-width\":180}},[a(\"FormItem\",{attrs:{label:\"分组名称\",prop:\"className\"}},[a(\"i-input\",{staticStyle:{width:\"260px\"},model:{value:t.PayMentClassCreateForm.className,callback:function(e){t.$set(t.PayMentClassCreateForm,\"className\",e)},expression:\"PayMentClassCreateForm.className\"}})],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"支付分类\",prop:\"classType\"}},[a(\"Select\",{staticStyle:{width:\"260px\"},model:{value:t.PayMentClassCreateForm.classType,callback:function(e){t.$set(t.PayMentClassCreateForm,\"classType\",e)},expression:\"PayMentClassCreateForm.classType\"}},[a(\"Option\",{attrs:{value:\"payment\",label:\"在线支付\"}}),t._v(\" \"),a(\"Option\",{attrs:{value:\"qr_code\",label:\"二维码扫描\"}})],1)],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"客户端\",prop:\"devices\"}},[a(\"CheckboxGroup\",{model:{value:t.devices,callback:function(e){t.devices=e},expression:\"devices\"}},[a(\"Checkbox\",{attrs:{label:\"pc\"}},[a(\"span\",[t._v(\"PC\")])]),t._v(\" \"),a(\"Checkbox\",{attrs:{label:\"h5\"}},[a(\"span\",[t._v(\"H5\")])])],1)],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"状态\",prop:\"classStatus\"}},[a(\"Select\",{staticStyle:{width:\"260px\"},model:{value:t.PayMentClassCreateForm.classStatus,callback:function(e){t.$set(t.PayMentClassCreateForm,\"classStatus\",e)},expression:\"PayMentClassCreateForm.classStatus\"}},[a(\"Option\",{attrs:{value:\"yes\",label:\"开启\"}},[a(\"span\",[t._v(\"开启\")])]),t._v(\" \"),a(\"Option\",{attrs:{value:\"no\",label:\"关闭\"}},[a(\"span\",[t._v(\"关闭\")])])],1)],1),t._v(\" \"),a(\"FormItem\",{attrs:{label:\"备注信息\",prop:\"classRemarks\"}},[a(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{type:\"textarea\",row:4,placeholder:\"备注信息\"},model:{value:t.PayMentClassCreateForm.classRemarks,callback:function(e){t.$set(t.PayMentClassCreateForm,\"classRemarks\",e)},expression:\"PayMentClassCreateForm.classRemarks\"}})],1),t._v(\" \"),a(\"FormItem\",[t.$route.query.isVerify?a(\"Button\",{attrs:{type:\"primary\",loading:t.$root.btnLoading},on:{click:function(e){t.FormSubmit()}}},[t._v(\"修改\")]):a(\"Button\",{attrs:{type:\"primary\",loading:t.$root.btnLoading},on:{click:function(e){t.FormSubmit()}}},[t._v(\"确定创建\")]),t._v(\" \"),a(\"Button\",{on:{click:t.$root.go_back}},[t._v(\"返回\")])],1)],1)],1)])])};s._withStripped=!0;var r={render:s,staticRenderFns:[]};t.default=r},681:function(e,t,a){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var s=a(1364),r=a.n(s);for(var n in s)\"default\"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);var o=a(1570),i=a.n(o),l=a(63)(r.a,i.a,!1,null,null,null);l.options.__file=\"src/template/AccountingManagement/PaymentClassCreate.vue\",t.default=l.exports}});"}