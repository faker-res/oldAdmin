webpackJsonp([30],{1345:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=l(a(77)),n=l(a(797));function l(e){return e&&e.__esModule?e:{default:e}}t.default={mixins:[n.default],components:{},data:function(){var l=this;return{spinShow:!0,paymentData:{},devices:[],pc:{},h5:{},pcDisabled:{},h5Disabled:{},siteId:null,lvl_id:null,paymentList:[],paymentListModal:!1,DataSearch:{status:"",siteId:"",levelId:[]},paymentModal:!1,memberListShow:!1,memberList:[],table:{TableColumn:[{title:"站点",key:"siteName"},{title:"等级名称",key:"levelName"},{title:"等级别称",key:"levelAlias",render:function(e,t){return e("span",t.row.levelAlias?t.row.levelAlias:"无")}},{title:"会员人数",key:"memberNum",render:function(e,t){return e("a",{on:{click:function(){l.memberList=t.row.memberNameList,l.memberListShow=!0}}},t.row.memberNum)}},{title:"充值笔数",key:"depositNumber"},{title:"最小充值",key:"minPay"},{title:"打码量",key:"betAmount"},{title:"取款打码倍数",key:"multiple"},{title:"彩金奖励",key:"giftBonus"},{title:"日期",key:"updated_at",width:200,render:function(e,t){return e("span",l.$moment.unix(t.row.updated_at-0).format("LLL"))}},{title:"默认等级",key:"default",render:function(e,t){return e("Tag",{props:{color:"yes"==t.row.default?"yellow":"#ddd"}},"yes"==t.row.default?"是":"否")}},{title:"状态",key:"status",minWidth:116,render:function(e,t){var a=l;return e("div",[e("Button",{props:{type:"yes"===t.row.status?"success":"error",size:"small"},on:{click:function(){a.ModifyLevelStatus(t)}}},"yes"==t.row.status?"启用":"停用")])}},{title:"备注",key:"remark",maxWidth:230,render:function(e,t){return e("div",{},[e("Tooltip",{props:{placement:"bottom"},style:{},on:{click:function(){}}},[e("span",{style:{color:"#2d8cf0"}},t.row.remark?t.row.remark.length<10?t.row.remark:t.row.remark.slice(0,10)+"...":"无"),e("div",{slot:"content",style:{zIndex:999,whiteSpace:"normal"}},t.row.remark?t.row.remark:"无")])])}},{title:"操作",key:"",minWidth:250,render:function(e,t){return e("div",[e("Button",{props:{size:"small"},style:{marginRight:"5px"},on:{click:function(){l.$router.push({name:"MemberLevelDetails",query:{siteId:t.row.siteId,id:t.row.id}})}}},"详情"),e("Button",{props:{size:"small"},style:{marginRight:"5px"},on:{click:function(){l.$router.push({name:"MemberLevelCreate",query:{siteId:t.row.siteId,id:t.row.id,isVerify:!0}})}}},"编辑"),e("Button",{props:{size:"small"},on:{click:function(){l.lvl_id=t.row.levelLabel,l.siteId=t.row.siteId,l.devices=[],l.$root.HTTP_ALLLINKPOST(l.$root.HTTP_L.HTTP_PaymentSet,{lvl_id:t.row.levelLabel,siteId:t.row.siteId}).then(function(e){l.spinShow=!1,l.paymentData=e.data.data;var t=function(n){l.devices.push(n),l.paymentData[n].forEach(function(a){l.$set(l[n],a.pc_id,[]),l.$set(l[n+"Disabled"],a.pc_id,{}),a.selected_id&&a.selected_id.split(",").forEach(function(e,t){l.$set(l[n][a.pc_id],t,e-0),l.$set(l[n+"Disabled"][a.pc_id],e,!0)})})};for(var a in l.paymentData)t(a)}),l.paymentModal=!0}}},"支付设置")])}}],TableData:{},loading:!0,align:"center",posturl:this.$root.HTTP_L.HTTP_HuiYuanDengJiLieBiao,dataform:{isRules:"select",siteId:JSON.parse(localStorage.AllSiteNameList)[0].id}}}},watch:{pc:{handler:function(e,t){var n=this,a=function(a){n.pcDisabled[a]={},e[a].forEach(function(e,t){e&&n.$set(n.pcDisabled[a],e,!0)})};for(var l in e)a(l)},deep:!0},h5:{handler:function(e,t){var n=this,a=function(a){n.h5Disabled[a]={},e[a].forEach(function(e,t){e&&n.$set(n.h5Disabled[a],e,!0)})};for(var l in e)a(l)},deep:!0}},methods:{SearchRest:function(){this.DataSearch={siteId:this.defaultSiteId,status:""},this.$refs.SiteNameSelect.InitData(),this.SearchSubmit()},SearchSubmit:function(){for(var e in this.DataSearch)null!=this.DataSearch[e]&&""!=this.DataSearch[e]||delete this.DataSearch[e];this.table.dataform=JSON.parse((0,i.default)(this.DataSearch))},siteChange:function(e){e.SiteId&&(this.DataSearch.siteId=e.SiteId)},ModifyLevelStatus:function(t){var a=this,n=this,l="yes"==t.row.status?"no":"yes";this.$Modal.confirm({title:"提示",loading:!0,content:"yes"==t.row.status?"确定停用?":"确定启用?",onOk:function(){a.$root.HTTP_ALLLINKPOST(a.$root.HTTP_L.HTTP_XiuGaiHuiYuanXinXiZhuangTai,{id:t.row.id,status:l,siteId:t.row.siteId}).then(function(e){a.$Message.success("修改状态成功！"),a.$Modal.remove(),a.$set(n.table.TableData.data[t.index],"status",l),t.row.status=l}).catch(function(e){a.$Modal.remove()})}})},submitPayment:function(){var t=this,e={},a={};for(var n in this.pc)e[n]=this.pc[n].filter(function(e){if(e)return e}).toString(),e[n]||delete e[n];for(var l in this.h5)a[l]=this.h5[l].filter(function(e){if(e)return e}).toString(),a[l]||delete a[l];this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentSet_Edit,{siteId:this.siteId,lvl_id:this.lvl_id,data:{pc:(0,i.default)(e),h5:(0,i.default)(a)}}).then(function(e){t.spinShow=!0,t.$root.modal("success","",e.data.data)}).catch(function(e){t.spinShow=!0})},cancel:function(){this.spinShow=!0},paymentShow:function(){var t=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentSet,{siteId:this.DataSearch.siteId}).then(function(e){t.paymentList=e.data.data,t.paymentListModal=!0})}}}},1517:function(e,t,a){var n=a(1518);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(75)("c702333a",n,!1,{})},1518:function(e,t,a){(e.exports=a(74)(!1)).push([e.i,"\n.xuanze[data-v-fee6cafe] {\n  margin-bottom: 10px;\n}\n.form-group[data-v-fee6cafe] {\n  margin-bottom: 5px;\n}\n.form-group .label[data-v-fee6cafe] {\n  display: inline-block;\n  width: 71px;\n  text-align: right;\n}\n.form-group .ivu-date-picker[data-v-fee6cafe],\n.form-group .ivu-select[data-v-fee6cafe],\n.form-group .ivu-input-wrapper[data-v-fee6cafe],\n.form-group .ivu-i-input-wrapper[data-v-fee6cafe] {\n  margin: 0 5px;\n}\n.c_ser[data-v-fee6cafe] {\n  margin-bottom: 10px;\n}\n.c_ser span.xian[data-v-fee6cafe] {\n  width: 10%;\n  display: inline-block;\n  text-align: center;\n}\n.table[data-v-fee6cafe] {\n  text-align: center;\n  font-size: 13px;\n}\n.table tr td[data-v-fee6cafe] {\n  padding: 0;\n}\n.table tr td div[data-v-fee6cafe] {\n  border-bottom: 1px solid #e9eaec;\n  line-height: 2.5;\n}\n.table tr td div[data-v-fee6cafe]:last-of-type {\n  border-bottom: 0;\n}\n.table tr td div span[data-v-fee6cafe] {\n  display: inline-block;\n  width: 20%;\n  border-right: 1px solid #e9eaec;\n}\n",""])},1519:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=a(145),i=(n=l)&&n.__esModule?n:{default:n};var s=function(){var n=this,e=n.$createElement,l=n._self._c||e;return l("div",{staticClass:"content-main agent-main"},[l("div",{staticClass:"layout"},[l("div",{staticClass:"page-header"},[l("h1",{staticClass:"binding"},[n._v(n._s(n.$route.meta.title))])]),n._v(" "),l("div",{staticClass:"page-con1"},[l("i-col",{staticClass:"c_search_top",attrs:{span:"24"}},[l("Card",{attrs:{"dis-hover":""}},[l("i-form",{ref:"DataSearch",attrs:{model:n.DataSearch,inline:""}},[l("FormItem",{attrs:{label:"站点",prop:"siteId"}},[l("SiteNameSelect",{ref:"SiteNameSelect",attrs:{SiteNameSelectData:n.SiteNameSelectData},on:{listenOnChange:n.siteChange}})],1),n._v(" "),l("FormItem",{attrs:{label:"状态"}},[l("Select",{staticStyle:{width:"100px"},attrs:{placeholder:"选择",clearable:""},model:{value:n.DataSearch.status,callback:function(e){n.$set(n.DataSearch,"status",e)},expression:"DataSearch.status"}},n._l(n.statusList,function(e){return l("Option",{key:e.value,attrs:{value:e.value}},[n._v(n._s(e.label))])}),1)],1),n._v(" "),l("FormItem",[l("Button",{attrs:{type:"primary"},on:{click:n.SearchSubmit}},[n._v("查询")]),n._v(" "),l("Button",{attrs:{type:"warning"},on:{click:n.SearchRest}},[n._v("重置")])],1)],1)],1)],1),n._v(" "),l("i-col",{staticClass:"c_search_result",attrs:{span:"24"}},[l("div",{staticClass:"serach"},[l("div",{staticClass:"have_con"},[l("div",{staticClass:"data_sj"},[l("div",{staticClass:"caozuo_btn"},[l("Button",{attrs:{type:"primary"},on:{click:function(e){n.$router.push({name:"MemberLevelCreate"})}}},[n._v("添加站点等级")]),n._v(" "),l("Button",{attrs:{type:"primary"},on:{click:function(e){n.$router.push({name:"MemberLevelBatch"})}}},[n._v("修改会员等级")]),n._v(" "),l("Button",{attrs:{type:"primary"},on:{click:n.paymentShow}},[n._v("支付通道")])],1),n._v(" "),l("div",{staticStyle:{margin:"10px 0",overflow:"hidden"}},[l("MyTable",{attrs:{table:n.table}})],1)])])])])],1)]),n._v(" "),l("Modal",{staticClass:"paymentModal",attrs:{title:"支付设置",width:"900"},on:{"on-ok":n.submitPayment,"on-cancel":n.cancel},model:{value:n.paymentModal,callback:function(e){n.paymentModal=e},expression:"paymentModal"}},[l("div",{staticClass:"scroll-bar-y",staticStyle:{height:"420px"}},[n.spinShow?l("Spin",{attrs:{fix:""}},[l("Icon",{staticClass:"demo-spin-icon-load",attrs:{type:"load-c",size:"18"}}),n._v(" "),l("div",[n._v("加载中")])],1):n._e(),n._v(" "),(0,i.default)(n.paymentData).length?l("Card",{staticStyle:{"margin-bottom":"20px"},attrs:{"dis-hover":""}},[l("p",{attrs:{slot:"title"},slot:"title"},[n._v("电脑端")]),n._v(" "),l("ul",n._l(n.paymentData.pc,function(a,e){return l("li",{key:e,staticStyle:{"list-style":"none",padding:"5px 0"}},[l("label",{staticStyle:{display:"inline-block",width:"110px"}},[n._v(n._s(a.pc_name)+"：")]),n._v(" "),n._l([0,1,2,3,4],function(t){return l("Select",{key:t,style:{width:"120px",marginRight:"10px"},attrs:{clearable:"",placeholder:"通道"+(0===t?"一":1===t?"二":2===t?"三":3===t?"四":"五")},model:{value:n.pc[a.pc_id][t],callback:function(e){n.$set(n.pc[a.pc_id],t,e)},expression:"pc[i.pc_id][k]"}},n._l(a.payment_list,function(e){return l("Option",{key:e.id,attrs:{value:e.id,disabled:n.pcDisabled[a.pc_id][e.id]}},[n._v(n._s(e.payName))])}),1)})],2)}),0)]):n._e(),n._v(" "),(0,i.default)(n.paymentData).length?l("Card",{attrs:{"dis-hover":""}},[l("p",{attrs:{slot:"title"},slot:"title"},[n._v("手机端")]),n._v(" "),l("ul",n._l(n.paymentData.h5,function(a,e){return l("li",{key:e,staticStyle:{"list-style":"none",padding:"5px 0"}},[l("label",{staticStyle:{display:"inline-block",width:"110px"}},[n._v(n._s(a.pc_name)+"：")]),n._v(" "),n._l([0,1,2,3,4],function(t){return l("Select",{key:t,style:{width:"120px",marginRight:"10px"},attrs:{clearable:"",placeholder:"通道"+(0===t?"一":1===t?"二":2===t?"三":3===t?"四":"五")},model:{value:n.h5[a.pc_id][t],callback:function(e){n.$set(n.h5[a.pc_id],t,e)},expression:"h5[i.pc_id][k]"}},n._l(a.payment_list,function(e){return l("Option",{key:e.id,attrs:{value:e.id,disabled:n.h5Disabled[a.pc_id][e.id]}},[n._v(n._s(e.payName))])}),1)})],2)}),0)]):n._e()],1)]),n._v(" "),l("Modal",{attrs:{title:"会员列表",width:"1200"},model:{value:n.memberListShow,callback:function(e){n.memberListShow=e},expression:"memberListShow"}},[l("div",{staticClass:"scroll-bar-y",staticStyle:{"max-height":"420px"}},n._l(n.memberList,function(e){return l("span",{key:e,staticStyle:{display:"inline-block",width:"12.5%","font-size":"13px",padding:"10px 0"}},[n._v(n._s(e))])}),0)]),n._v(" "),l("Modal",{attrs:{title:"支付通道",width:"1200"},model:{value:n.paymentListModal,callback:function(e){n.paymentListModal=e},expression:"paymentListModal"}},[l("div",{staticClass:"scroll-bar-y",staticStyle:{"max-height":"420px"}},[(0,i.default)(n.paymentList).length?l("table",{staticClass:"table",attrs:{width:"100%"}},[l("thead",[l("tr",[l("th",[n._v("终端")]),n._v(" "),l("th",[n._v("等级")]),n._v(" "),l("th",[n._v("支付方式")]),n._v(" "),l("th",[n._v("通道一")]),n._v(" "),l("th",[n._v("通道二")]),n._v(" "),l("th",[n._v("通道三")]),n._v(" "),l("th",[n._v("通道四")]),n._v(" "),l("th",[n._v("通道五")])])]),n._v(" "),l("tbody",[l("tr",[l("td",{attrs:{rowspan:n.paymentList.pc.length}},[n._v("电脑端")]),n._v(" "),l("td",[n._v(n._s(n.paymentList.pc[0].lvl_alias_name||n.paymentList.pc[0].lvl_name))]),n._v(" "),l("td",n._l(n.paymentList.pc[0].payment_info,function(e,t){return l("div",{key:t},[n._v(n._s(e.payment_class))])}),0),n._v(" "),l("td",{attrs:{colspan:5}},n._l(n.paymentList.pc[0].payment_info,function(e,t){return l("div",{key:t},n._l(e.payment_name,function(e,t){return l("span",{key:t},[n._v(n._s(e||" "))])}),0)}),0)]),n._v(" "),n._l(n.paymentList.pc.slice(1),function(e,t){return l("tr",{key:t},[l("td",[n._v(n._s(e.lvl_alias_name))]),n._v(" "),l("td",n._l(e.payment_info,function(e,t){return l("div",{key:t},[n._v(n._s(e.payment_class))])}),0),n._v(" "),l("td",{attrs:{colspan:5}},n._l(e.payment_info,function(e,t){return l("div",{key:t},n._l(e.payment_name,function(e,t){return l("span",{key:t},[n._v(n._s(e||" "))])}),0)}),0)])}),n._v(" "),l("tr",[l("td",{attrs:{rowspan:n.paymentList.h5.length}},[n._v("手机端")]),n._v(" "),l("td",[n._v(n._s(n.paymentList.h5[0].lvl_alias_name||n.paymentList.h5[0].lvl_name))]),n._v(" "),l("td",n._l(n.paymentList.h5[0].payment_info,function(e,t){return l("div",{key:t},[n._v(n._s(e.payment_class))])}),0),n._v(" "),l("td",{attrs:{colspan:5}},n._l(n.paymentList.h5[0].payment_info,function(e,t){return l("div",{key:t},n._l(e.payment_name,function(e,t){return l("span",{key:t},[n._v(n._s(e||" "))])}),0)}),0)]),n._v(" "),n._l(n.paymentList.h5.slice(1),function(e){return l("tr",{key:e.lvl_name},[l("td",[n._v(n._s(e.lvl_alias_name))]),n._v(" "),l("td",n._l(e.payment_info,function(e,t){return l("div",{key:t},[n._v(n._s(e.payment_class))])}),0),n._v(" "),l("td",{attrs:{colspan:5}},n._l(e.payment_info,function(e,t){return l("div",{key:t},n._l(e.payment_name,function(e,t){return l("span",{key:t},[n._v(n._s(e||" "))])}),0)}),0)])})],2)]):n._e()])])],1)};s._withStripped=!0;var r={render:s,staticRenderFns:[]};t.default=r},664:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(1345),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(1519),r=a.n(s),o=!1;var c=function(e){o||a(1517)},u=a(63)(l.a,r.a,!1,c,"data-v-fee6cafe",null);u.options.__file="src/template/Member/MemberLevel.vue",t.default=u.exports},768:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l,i,s=c(a(144)),r=c(a(332)),o=c(a(333));function c(e){return e&&e.__esModule?e:{default:e}}t.default={props:["SiteNameSelectData"],data:function(){return{singleData:{SiteId:null},multipleData:{SiteId:[]},siteIdList:[]}},created:function(){var e=this;this.$nextTick(function(){e.getSiteList()})},watch:{"$root.AllSiteNameList":{handler:function(e,t){e&&(this.siteIdList=e,this.InitData())},deep:!0},singleData:{handler:function(e,t){this.singleChange(e)},deep:!0},multipleData:{handler:function(e,t){this.multipleChange(e)},deep:!0}},methods:{getSiteList:function(){localStorage.AllSiteNameList&&(this.siteIdList=JSON.parse(localStorage.AllSiteNameList),this.InitData())},setDefaultSite:(i=(0,o.default)(r.default.mark(function e(t){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"单选"==this.SiteNameSelectData.type?this.singleData.SiteId=t:this.multipleData.SiteId=t;case 1:case"end":return e.stop()}},e,this)})),function(e){return i.apply(this,arguments)}),InitData:(l=(0,o.default)(r.default.mark(function e(){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"单选"!=this.SiteNameSelectData.type||this.SiteNameSelectData.edit||(this.singleData.SiteId=this.siteIdList[0].id);case 1:case"end":return e.stop()}},e,this)})),function(){return l.apply(this,arguments)}),sendSiteList:(n=(0,o.default)(r.default.mark(function e(){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.siteIdList);case 1:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)}),singleChange:function(t){var a=(0,s.default)({},this.singleData);this.siteIdList.forEach(function(e){e.id==t.SiteId&&(a.SiteName=e.siteName,a.paymentBonus=JSON.parse(e.siteConfig).limit.paymentBonus)}),this.$emit("listenOnChange",a)},multipleChange:function(e){var a=(0,s.default)({},this.multipleData);a.SiteName=[],this.siteIdList.forEach(function(t){a.SiteId&&a.SiteId.forEach(function(e){t.id==e&&a.SiteName.push(t.siteName)})}),this.$emit("listenOnChange",a)}}}},769:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(a(774)),l=r(a(145)),i=r(a(76)),s=r(a(144));function r(e){return e&&e.__esModule?e:{default:e}}t.default={name:"TableCommon",props:["table"],components:{},activated:function(){},data:function(){return{page:1,response:{},dateOption:{}}},watch:{"table.posturl":function(e){this.tableRequest()},"table.Refresh":function(e){this.tableRequest()},"table.dataform":{handler:function(e){0<this.table.posturl.indexOf("?")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf("?"))),this.table.post||this.tableRequest()},deep:!0},"table.selectAllcencle":function(e){this.$refs.table.selectAll(!1)}},created:function(){this.table.flag||this.tableRequest()},methods:{goPage:function(){var e=this.$refs.Page.$el.querySelector("input").value;if(e>this.$refs.Page.allPages)return!1;0<this.table.posturl.indexOf("?")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf("?"))),this.table.posturl=this.table.posturl+"?page="+e},PageChange:function(e){0<this.table.posturl.indexOf("?")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf("?"))),this.table.posturl=this.table.posturl+"?page="+e},OnSelected:function(e){this.$emit("listenOnSelect",e)},OnSortChange:function(e){this.$emit("listenOnSortTable",e)},expand:function(e,t){this.$emit("listenOnExpand",{row:e,status:t})},tableRequest:function(e){var t=this;this.table.loading=!0,"get"!==this.table.postType&&this.table.posturl?this.$root.HTTP_ALLLINKPOST(this.table.posturl,this.table.dataform).then(function(e){"string"==typeof e.data.data?t.table.TableData=JSON.parse(e.data.data):(e.data.data.hasOwnProperty("data")?e.data.data.data.hasOwnProperty("list")?(t.table.TableData=(0,s.default)({},e.data.data),t.table.TableData.data=[].concat((0,i.default)(e.data.data.data.list)),t.$set(t.table.TableData,"totalCount",e.data.data.data.total)):t.table.TableData=e.data.data:(t.table.TableData.data=e.data.data,(0,l.default)(e.data.data)&&(t.table.TableData.data=(0,n.default)(e.data.data))),0==e.data.data.length&&(t.table.TableData={}),t.page=e.data.data.current_page),t.table.loading=!1,t.table.TableData.data.length?t.table.buttonDisabled=!1:t.table.buttonDisabled=!0,t.$emit("listenOnTableData")}).catch(function(e){t.table.loading=!1,t.$emit("listenOnTableData"),t.table.TableData.data=[],e.body&&200!==e.body.code&&t.$emit("catchError",e.body.code)}):this.table.posturl?this.$root.HTTP_ALLLINKGET(this.table.posturl,this.table.dataform).then(function(e){"string"==typeof e.data.data?t.table.TableData=JSON.parse(e.data.data):e.data.data.hasOwnProperty("data")?t.table.TableData=e.data.data:t.table.TableData.data=e.data.data,t.table.loading=!1}).catch(function(e){t.table.loading=!1,t.table.TableData.data=[]}):this.table.loading=!1}}}},770:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l,i,s,r=u(a(144)),o=u(a(332)),c=u(a(333));function u(e){return e&&e.__esModule?e:{default:e}}t.default={props:["LevelSelectConf"],data:function(){return{singleData:{levelByIdData:{levelLabel:""},commonLevelData:{levelLabel:""}},multipleData:{levelByIdData:{levelLabel:[]},commonLevelData:{levelLabel:[]}},levelList:[]}},computed:{targetLevelRouter:function(){switch(this.LevelSelectConf.model){case"MemberLevelModel":return"MemberLevel";case"AgencyLevelModel":return"AgentLevel";default:return"CommonLevelCreate"}}},watch:{singleData:{handler:function(e,t){this.singleChange(e)},deep:!0},multipleData:{handler:function(e,t){this.multipleChange(e)},deep:!0}},methods:{setDefaultLevel:(s=(0,c.default)(o.default.mark(function e(t,a,n){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"单选"==this.LevelSelectConf.type?this.LevelSelectConf.isLevelById?(this.singleData.levelByIdData.levelLabel=t,this.singleData.levelByIdData.levelName=a,this.singleData.levelByIdData.levelAlias=n):(this.singleData.commonLevelData.levelLabel=t,this.singleData.commonLevelData.levelName=a):this.LevelSelectConf.isLevelById?this.multipleData.levelByIdData.levelLabel=t:this.multipleData.commonLevelData.levelLabel=t;case 1:case"end":return e.stop()}},e,this)})),function(e,t,a){return s.apply(this,arguments)}),init:(i=(0,c.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:"单选"==this.LevelSelectConf.type&&(this.LevelSelectConf.isLevelById?this.singleData.levelByIdData.levelLabel=this.levelList[0].levelLabel:this.singleData.commonLevelData.levelLabel=this.levelList[0].id);case 1:case"end":return e.stop()}},e,this)})),function(){return i.apply(this,arguments)}),singleChange:function(t){var a=(0,r.default)({},this.singleData);this.LevelSelectConf.isLevelById?(this.levelList.forEach(function(e){t.levelByIdData.levelLabel==e.levelLabel&&(a.levelByIdData.levelAlias=e.levelAlias,a.levelByIdData.levelName=e.levelName)}),this.$emit("listenLevelChange",a.levelByIdData)):(this.levelList.forEach(function(e){t.commonLevelData.levelLabel==e.id&&(a.commonLevelData.levelName=e.levelName)}),this.$emit("listenLevelChange",a.commonLevelData))},multipleChange:function(e){var a=(0,r.default)({},this.multipleData);this.LevelSelectConf.isLevelById?(a.levelByIdData.levelAlias=[],a.levelByIdData.levelName=[],this.levelList.forEach(function(t){a.levelByIdData.levelLabel&&a.levelByIdData.levelLabel.forEach(function(e){e==t.levelLabel&&(a.levelByIdData.levelAlias.push(t.levelAlias),a.levelByIdData.levelName.push(t.levelName))})}),this.$emit("listenLevelChange",a.levelByIdData)):(a.commonLevelData.levelName=[],this.levelList.forEach(function(t){a.commonLevelData.levelLabel&&a.commonLevelData.levelLabel.forEach(function(e){e==t.levelLabel&&a.commonLevelData.levelName.push(t.levelName)})}),this.$emit("listenLevelChange",a.commonLevelData))},getLevelById:(l=(0,c.default)(o.default.mark(function e(t,a){var n,l=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={siteId:[t],type:a},e.next=3,this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_SiteIdHuoQuGongGongDengJi,n).then(function(e){e.data.data[t]?(l.levelList=e.data.data[t],l.LevelSelectConf.initDefault&&l.init()):l.levelList=[]});case 3:case"end":return e.stop()}},e,this)})),function(e,t){return l.apply(this,arguments)}),getCommonLevel:(n=(0,c.default)(o.default.mark(function e(){var t=this;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuGongGongDengJi).then(function(e){e.data.data.length?t.levelList=e.data.data:t.levelList=[]});case 2:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)})}}},771:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=s(a(332)),i=s(a(333));function s(e){return e&&e.__esModule?e:{default:e}}t.default={props:["PayClassSelectData"],data:function(){return{DATAA:{SiteDataD:{id:"",className:""},SiteDataS:{id:[],className:[]}},DATAA2:{SiteDataD:{id:"",className:""},SiteDataS:{id:[],className:[]}},dataList:[]}},created:function(){},methods:{InitData:(n=(0,i.default)(l.default.mark(function e(){var t,a=this;return l.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t={},t=this.PayClassSelectData.status?{classType:this.PayClassSelectData.classType,classStatus:"yes"}:{classType:this.PayClassSelectData.classType},e.next=4,this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiaLaLieBiao,t).then(function(e){a.dataList=e.data.data,a.PayClassSelectData.flag&&a.dataList.unshift({id:0,className:"全部"}),a.PayClassSelectData.default&&(a.DATAA.SiteDataD.id=a.dataList[0].id,a.dataList.forEach(function(e){a.DATAA.SiteDataS.id.push(e.id),a.DATAA.SiteDataS.className.push(e.className)}))});case 4:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)})},watch:{PayClassSelectData:{handler:function(e,t){e.data&&(this.DATAA.SiteDataD.id=e.data.id-0,this.DATAA.SiteDataS.id=e.data.id)},deep:!0},DATAA:{handler:function(t,e){var n=this;this.DATAA2.SiteDataS.id=[],this.DATAA2.SiteDataS.className=[],this.dataList.forEach(function(a,e){a.id-0==t.SiteDataD.id&&"单选"==n.PayClassSelectData.type?(n.DATAA2.SiteDataD.id=a.id,n.DATAA2.SiteDataD.className=a.className):"多选"==n.PayClassSelectData.type&&t.SiteDataS.id.forEach(function(e,t){e==a.id-0&&(n.DATAA2.SiteDataS.id.push(e),n.DATAA2.SiteDataS.className.push(a.className))})}),"单选"==this.PayClassSelectData.type?this.$emit("listenOnChange",this.DATAA2.SiteDataD):this.$emit("listenOnChange",this.DATAA2.SiteDataS)},deep:!0}}}},773:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(768),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(777),r=a.n(s),o=!1;var c=function(e){o||a(775)},u=a(63)(l.a,r.a,!1,c,null,null);u.options.__file="src/template/my-components/SiteNameSelect.vue",t.default=u.exports},774:function(e,t,a){e.exports={default:a(779),__esModule:!0}},775:function(e,t,a){var n=a(776);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(75)("6e9b1005",n,!1,{})},776:function(e,t,a){(e.exports=a(74)(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},777:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",["单选"==t.SiteNameSelectData.type?a("Select",{style:t.SiteNameSelectData.style,attrs:{clearable:t.SiteNameSelectData.clearable,disabled:t.SiteNameSelectData.disabled,placeholder:t.SiteNameSelectData.placeholder},model:{value:t.singleData.SiteId,callback:function(e){t.$set(t.singleData,"SiteId",e)},expression:"singleData.SiteId"}},t._l(t.siteIdList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.siteName))])}),1):a("Select",{style:t.SiteNameSelectData.style,attrs:{multiple:"",disabled:t.SiteNameSelectData.disabled,placeholder:t.SiteNameSelectData.placeholder},model:{value:t.multipleData.SiteId,callback:function(e){t.$set(t.multipleData,"SiteId",e)},expression:"multipleData.SiteId"}},t._l(t.siteIdList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.siteName))])}),1)],1)};n._withStripped=!0;var l={render:n,staticRenderFns:[]};t.default=l},778:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=s(a(332)),i=s(a(333));function s(e){return e&&e.__esModule?e:{default:e}}t.default={props:["FinanceSelectData"],data:function(){return{FinanceData:[],FinanceValue:[]}},created:function(){},methods:{InitData:(n=(0,i.default)(l.default.mark(function e(){var i=this;return l.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_ZiJinZouXiang,{isRules:"show"}).then(function(n){i.FinanceSelectData.flag&&delete n.data.data.transfer;var l=[],e=function(e){var t={};t.type=e,t.subType=[];var a={};switch(a.value=e){case"bonus":a.label="优惠",t.name="优惠";break;case"deposit":a.label="存款",t.name="存款";break;case"other":a.label="其他",t.name="其他";break;case"transfer":a.label="额度转换",t.name="额度转换";break;case"withdrawals":a.label="出款",t.name="出款"}a.children=[],"other"!==e&&n.data.data[e].unshift({key:"",value:"全部"}),n.data.data[e].forEach(function(e){i.FinanceSelectData.flag?"cancelRebateBonus"!==e.key&&"returnPoints"!==e.key&&"application"!==e.key&&"refuse"!==e.key&&"transfer"!==e.key&&(a.children.push({value:e.key,label:e.value}),e.key&&t.subType.push({value:e.key,label:e.value})):a.children.push({value:e.key,label:e.value})}),i.FinanceData.push(a),l.push(t)};for(var t in n.data.data)e(t);i.$emit("init",l),i.FinanceData.unshift({value:"",label:"全部"})});case 1:case"end":return e.stop()}},e,this)})),function(){return n.apply(this,arguments)}),FinanceClassChange:function(e){this.$emit("listenOnChange",e)}},watch:{}}},779:function(e,t,a){a(780),e.exports=a(11).Object.values},780:function(e,t,a){var n=a(31),l=a(781)(!1);n(n.S,"Object",{values:function(e){return l(e)}})},781:function(e,t,a){var o=a(64),c=a(54),u=a(78).f;e.exports=function(r){return function(e){for(var t,a=c(e),n=o(a),l=n.length,i=0,s=[];i<l;)u.call(a,t=n[i++])&&s.push(r?[t,a[t]]:a[t]);return s}}},782:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(769),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(785),r=a.n(s),o=!1;var c=function(e){o||a(783)},u=a(63)(l.a,r.a,!1,c,null,null);u.options.__file="src/template/my-components/iview-table/table.vue",t.default=u.exports},783:function(e,t,a){var n=a(784);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(75)("78bbc5d7",n,!1,{})},784:function(e,t,a){(e.exports=a(74)(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},785:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("i-col",{attrs:{span:"24"}},[a("i-table",{ref:"table",class:{center:"center"==e.table.align},attrs:{border:"",loading:e.table.loading,context:e.$parent,data:e.table.TableData.data,columns:e.table.TableColumn},on:{"on-sort-change":e.OnSortChange,listenRequest:e.tableRequest,"on-selection-change":e.OnSelected,"on-expand":e.expand}})],1),e._v(" "),1<e.table.TableData.last_page?a("div",{staticStyle:{margin:"10px"}},[a("div",{staticClass:"clearfix",staticStyle:{float:"right"}},[a("Page",{ref:"Page",staticStyle:{float:"left"},attrs:{total:e.table.TableData.total,"show-total":"",current:e.page,"page-size":e.table.TableData.per_page-0,"show-elevator":""},on:{"on-change":e.PageChange}}),e._v(" "),a("Button",{staticStyle:{float:"left",height:"32px",margin:"10px 0 0 10px"},attrs:{size:"small"},on:{click:e.goPage}},[e._v("go!")])],1)]):e._e()],1)])};n._withStripped=!0;var l={render:n,staticRenderFns:[]};t.default=l},786:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(770),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(787),r=a.n(s),o=a(63)(l.a,r.a,!1,null,null,null);o.options.__file="src/template/my-components/LevelSelect.vue",t.default=o.exports},787:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",[0<a.levelList.length?n("div",["单选"==a.LevelSelectConf.type?n("div",[a.LevelSelectConf.isLevelById?n("Select",{style:a.LevelSelectConf.style,attrs:{clearable:"",disabled:a.LevelSelectConf.disabled,placeholder:a.LevelSelectConf.placeholder},model:{value:a.singleData.levelByIdData.levelLabel,callback:function(e){a.$set(a.singleData.levelByIdData,"levelLabel",e)},expression:"singleData.levelByIdData.levelLabel"}},a._l(a.levelList,function(e,t){return n("Option",{key:t,attrs:{value:e.levelLabel}},[a._v(a._s(e.levelAlias))])}),1):n("Select",{style:a.LevelSelectConf.style,attrs:{clearable:"",disabled:a.LevelSelectConf.disabled,placeholder:a.LevelSelectConf.placeholder},model:{value:a.singleData.commonLevelData.levelLabel,callback:function(e){a.$set(a.singleData.commonLevelData,"levelLabel",e)},expression:"singleData.commonLevelData.levelLabel"}},a._l(a.levelList,function(e,t){return n("Option",{key:t,attrs:{value:e.id}},[a._v(a._s(e.levelName))])}),1)],1):n("div",[a.LevelSelectConf.isLevelById?n("Select",{style:a.LevelSelectConf.style,attrs:{clearable:"",multiple:"",disabled:a.LevelSelectConf.disabled,placeholder:a.LevelSelectConf.placeholder},model:{value:a.multipleData.levelByIdData.levelLabel,callback:function(e){a.$set(a.multipleData.levelByIdData,"levelLabel",e)},expression:"multipleData.levelByIdData.levelLabel"}},a._l(a.levelList,function(e,t){return n("Option",{key:t,attrs:{value:e.levelLabel}},[a._v(a._s(e.levelAlias))])}),1):n("Select",{style:a.LevelSelectConf.style,attrs:{clearable:"",multiple:"",disabled:a.LevelSelectConf.disabled,placeholder:a.LevelSelectConf.placeholder},model:{value:a.multipleData.commonLevelData.levelLabel,callback:function(e){a.$set(a.multipleData.commonLevelData,"levelLabel",e)},expression:"multipleData.commonLevelData.levelLabel"}},a._l(a.levelList,function(e,t){return n("Option",{key:t,attrs:{value:e.id}},[a._v(a._s(e.levelName))])}),1)],1)]):n("div",{style:a.LevelSelectConf.style},[n("span",{staticStyle:{"font-size":"10px",color:"red"}},[a._v("请先\n        "),n("router-link",{attrs:{to:{name:a.targetLevelRouter}}},[a._v("添加等级!")])],1)])])};n._withStripped=!0;var l={render:n,staticRenderFns:[]};t.default=l},788:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(771),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(791),r=a.n(s),o=!1;var c=function(e){o||a(789)},u=a(63)(l.a,r.a,!1,c,null,null);u.options.__file="src/template/my-components/PayClassSelect.vue",t.default=u.exports},789:function(e,t,a){var n=a(790);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(75)("5d92e312",n,!1,{})},790:function(e,t,a){(e.exports=a(74)(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},791:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",["单选"==t.PayClassSelectData.type?a("Select",{style:t.PayClassSelectData.style,attrs:{placeholder:t.PayClassSelectData.placeholder},model:{value:t.DATAA.SiteDataD.id,callback:function(e){t.$set(t.DATAA.SiteDataD,"id",e)},expression:"DATAA.SiteDataD.id"}},t._l(t.dataList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.className))])}),1):a("Select",{style:t.PayClassSelectData.style,attrs:{multiple:""},model:{value:t.DATAA.SiteDataS.id,callback:function(e){t.$set(t.DATAA.SiteDataS,"id",e)},expression:"DATAA.SiteDataS.id"}},t._l(t.dataList,function(e){return a("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.className))])}),1)],1)};n._withStripped=!0;var l={render:n,staticRenderFns:[]};t.default=l},793:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(778),l=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);var s=a(796),r=a.n(s),o=!1;var c=function(e){o||a(794)},u=a(63)(l.a,r.a,!1,c,null,null);u.options.__file="src/template/my-components/FinanceSelect.vue",t.default=u.exports},794:function(e,t,a){var n=a(795);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(75)("5f5623c0",n,!1,{})},795:function(e,t,a){(e.exports=a(74)(!1)).push([e.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},796:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Cascader",{style:t.FinanceSelectData.style,attrs:{data:t.FinanceData,trigger:"hover"},on:{"on-change":t.FinanceClassChange},model:{value:t.FinanceValue,callback:function(e){t.FinanceValue=e},expression:"FinanceValue"}})],1)};n._withStripped=!0;var l={render:n,staticRenderFns:[]};t.default=l},797:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=u(a(146)),l=u(a(145)),i=u(a(773)),s=u(a(782)),r=u(a(786)),o=u(a(793)),c=u(a(788));function u(e){return e&&e.__esModule?e:{default:e}}var d={components:{MyTable:s.default,SiteNameSelect:i.default,LevelSelect:r.default,FinanceSelect:o.default,PayClassSelect:c.default},data:function(){return{Time:[],autoFresh:"0",autoFreshTimer:null,disabled:!1,levelList:[],statusList:[{value:"no",label:"停用"},{value:"yes",label:"启用"}],SiteNameSelectData:{type:"单选",placeholder:"请输入站点名称",style:{width:"120px"}},LevelSelectOfMember:{model:"MemberLevelModel",type:"单选",isLevelById:!0,style:{width:"120px"}},LevelSelectOfAgency:{model:"AgencyLevelModel",type:"单选",isLevelById:!0,style:{width:"120px"}},LevelSelectOfCommon:{model:"CommonLevelCreate",type:"单选",style:{width:"120px"}},FinanceSelectData:{flag:!0,placeholder:"请选择",style:{width:"200px"}},PayClassSelectData:{type:"单选",flag:!0,default:!0,placeholder:"选择支付类型",style:{width:"160px"},classType:"qr_code"},PayClassSelectOfPay:{status:"yes",default:!1,classType:"payment",type:"多选",placeholder:"请选择支付分组",style:{width:"260px"}}}},computed:{defaultSiteId:function(){return JSON.parse(localStorage.AllSiteNameList)[0].id}},watch:{autoFresh:function(e,t){e!==t&&this.autoFreshFun(e)}},methods:{memberCountSearch:function(){if(0<(0,l.default)(this.$route.params).length){(0,n.default)(this.search,this.search,this.$route.params);var e=this.$route.params.levelId;this.$refs.LevelSelect.setDefaultLevel(e),this.SearchSubmit()}},levelFilter:function(t,e){var a=this.$refs.LevelSelect.levelList.filter(function(e){return t===e.levelLabel});return a&&a[0]?a[0].levelAlias:e},levelChange:function(e){this.search.levelId=e.levelLabel},autoFreshFun:function(e){var t=this;"0"===e?(clearInterval(this.autoFreshTimer),this.disabled=!1):(this.disabled=!0,this.updateTime(),this.Search(),e*=1e3,clearInterval(this.autoFreshTimer),this.autoFreshTimer=setInterval(function(){t.updateTime(),t.Search()},e))},catchError:function(e){clearInterval(this.autoFreshTimer),this.autoFresh="0"}},activated:function(){this.autoFreshFun(this.autoFresh)},deactivated:function(){clearInterval(this.autoFreshTimer)}};t.default=d}});