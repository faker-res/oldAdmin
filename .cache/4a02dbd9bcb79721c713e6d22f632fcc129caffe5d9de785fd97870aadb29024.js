{"source":"webpackJsonp([106],{1399:function(e,a,t){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0}),a.default={data:function(){return{CreatGameClassForm:{name:\"\",code:\"\",platform:\"\",sequence:1,status:\"yes\",created_user:\"\"},StatusList:[{value:\"yes\",label:\"开启\"},{value:\"no\",label:\"关闭\"}],CreatGameClassFormRules:{name:[{required:!0,message:\"游戏名称不能为空！\",trigger:\"blur\"}],code:[{required:!0,message:\"游戏编号不能为空！\",trigger:\"blur\"}],platform:[{required:!0,message:\"设备不能为空！\",trigger:\"blur\"}],sequence:[{required:!0,message:\"排序不能为空！\",trigger:\"blur\",pattern:/^.*$/}],status:[{required:!0,message:\"状态不正确！\",trigger:\"blur\"}]}}},created:function(){this.$route.query&&this.$route.query.id&&this.$route.query.isVerify?this.isVerifyFn(this.$route.query.id):this.CreatGameClassForm.created_user=this.$root.adminuserinfo.adminUserName},methods:{isVerifyFn:function(e){var t=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiFenLeiXiangQing,{gameClassId:e}).then(function(e){for(var a in t.CreatGameClassForm)t.CreatGameClassForm[a]=e.data.data[a];t.CreatGameClassForm.gameClassId=t.$route.query.id,t.CreatGameClassForm.updated_user=t.$root.adminuserinfo.adminUserName})},CreatMemberBankSubmit:function(){var a=this;this.$refs.CreatGameClassForm.validate(function(e){e?(a.$root.loading(),a.$route.query.isVerify?a.$root.HTTP_ALLLINKPOST(a.$root.HTTP_L.HTTP_XiuGaiYouXiFenLei,a.CreatGameClassForm).then(function(e){a.$Spin.hide(),a.$root.modal(\"success\",\"\",e.data.data)}):a.$root.HTTP_ALLLINKPOST(a.$root.HTTP_L.HTTP_ChuangJianYouXiFenLei,a.CreatGameClassForm).then(function(e){a.$Spin.hide(),a.$root.modal(\"success\",\"\",e.data.data)},function(e){a.$Spin.hide()})):a.$root.modal(\"error\",\"\",\"请填写完整的表单内容！\")})}}}},1659:function(e,a,t){var r=t(1660);\"string\"==typeof r&&(r=[[e.i,r,\"\"]]),r.locals&&(e.exports=r.locals);t(75)(\"65d6bd8f\",r,!1,{})},1660:function(e,a,t){(e.exports=t(74)(!1)).push([e.i,\"\\n.ShangChuanT[data-v-6cac544a] {\\n  height: 150px;\\n  width: 300px;\\n  background: #eee;\\n  border-radius: 3px;\\n  padding: 10px;\\n  margin-top: 20px;\\n  text-align: center;\\n}\\n.ShangChuanT img[data-v-6cac544a] {\\n  height: 100%;\\n  width: auto;\\n  max-width: 100%;\\n}\\n\",\"\"])},1661:function(e,a,t){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var r=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t(\"div\",{staticClass:\"content-main\"},[t(\"div\",{staticClass:\"layout\"},[t(\"div\",{staticClass:\"page-header\"},[t(\"h1\",{staticClass:\"binding\"},[a._v(a._s(a.$route.meta.title))])]),a._v(\" \"),t(\"div\",{staticClass:\"page-con1 form-t\"},[t(\"Form\",{ref:\"CreatGameClassForm\",staticStyle:{\"max-width\":\"60%\"},attrs:{model:a.CreatGameClassForm,rules:a.CreatGameClassFormRules,\"label-width\":120}},[t(\"FormItem\",{attrs:{label:\"创建人\"}},[t(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"请输入创建人\",disabled:!0},model:{value:a.CreatGameClassForm.created_user,callback:function(e){a.$set(a.CreatGameClassForm,\"created_user\",e)},expression:\"CreatGameClassForm.created_user\"}})],1),a._v(\" \"),t(\"FormItem\",{attrs:{label:\"游戏分类名称\",prop:\"name\"}},[t(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"游戏名称\"},model:{value:a.CreatGameClassForm.name,callback:function(e){a.$set(a.CreatGameClassForm,\"name\",e)},expression:\"CreatGameClassForm.name\"}})],1),a._v(\" \"),t(\"FormItem\",{attrs:{label:\"游戏分类编号\",prop:\"code\"}},[t(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"游戏编号\"},model:{value:a.CreatGameClassForm.code,callback:function(e){a.$set(a.CreatGameClassForm,\"code\",e)},expression:\"CreatGameClassForm.code\"}})],1),a._v(\" \"),t(\"FormItem\",{attrs:{label:\"平台\",prop:\"platform\"}},[t(\"RadioGroup\",{model:{value:a.CreatGameClassForm.platform,callback:function(e){a.$set(a.CreatGameClassForm,\"platform\",e)},expression:\"CreatGameClassForm.platform\"}},[t(\"Radio\",{attrs:{label:\"sport\"}},[a._v(\"体育\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"slot\"}},[a._v(\"电子\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"chess\"}},[a._v(\"棋牌\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"lottery\"}},[a._v(\"彩票\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"vr_lottery\"}},[a._v(\"VR彩票\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"live_casino\"}},[a._v(\"真人\")]),a._v(\" \"),t(\"Radio\",{attrs:{label:\"other\"}},[a._v(\"其他\")])],1)],1),a._v(\" \"),t(\"FormItem\",{attrs:{label:\"排序\",prop:\"sequence\"}},[t(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"排序\"},model:{value:a.CreatGameClassForm.sequence,callback:function(e){a.$set(a.CreatGameClassForm,\"sequence\",e)},expression:\"CreatGameClassForm.sequence\"}})],1),a._v(\" \"),t(\"FormItem\",{attrs:{label:\"状态\",prop:\"status\"}},[t(\"Select\",{staticStyle:{width:\"260px\"},model:{value:a.CreatGameClassForm.status,callback:function(e){a.$set(a.CreatGameClassForm,\"status\",e)},expression:\"CreatGameClassForm.status\"}},a._l(a.StatusList,function(e){return t(\"Option\",{key:e.value,attrs:{value:e.value}},[a._v(a._s(e.label))])}),1)],1),a._v(\" \"),t(\"FormItem\",[t(\"Button\",{attrs:{type:\"primary\"},on:{click:function(e){a.CreatMemberBankSubmit()}}},[a._v(\"提交\")]),a._v(\" \"),t(\"Button\",{on:{click:a.$root.go_back}},[a._v(\"取消\")])],1)],1)],1)])])};r._withStripped=!0;var s={render:r,staticRenderFns:[]};a.default=s},716:function(e,a,t){\"use strict\";Object.defineProperty(a,\"__esModule\",{value:!0});var r=t(1399),s=t.n(r);for(var o in r)\"default\"!==o&&function(e){t.d(a,e,function(){return r[e]})}(o);var i=t(1661),l=t.n(i),n=!1;var m=function(e){n||t(1659)},u=t(63)(s.a,l.a,!1,m,\"data-v-6cac544a\",null);u.options.__file=\"src/template/GamesManagement/CreateGamesClass.vue\",a.default=u.exports}});"}