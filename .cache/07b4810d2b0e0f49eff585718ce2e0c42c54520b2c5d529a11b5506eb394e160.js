{"source":"webpackJsonp([74],{1326:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});e.default=[{color:\"#ed3e14\",number:[1,7,23,29,45,12,18,30,34,13,19,35,2,8,24,40,46]},{color:\"#47cb89\",number:[5,16,21,27,32,38,43,6,11,17,22,28,33,39,44,49]},{color:\"#2d8cf0\",number:[3,9,25,41,47,10,14,36,15,31,37,4,20,26,42,48]}]},1448:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var d=l(a(774)),c=l(a(101)),p=l(a(144)),n=l(a(77)),r=l(a(782)),o=l(a(1326));function l(t){return t&&t.__esModule?t:{default:t}}e.default={name:\"LotteryWinSetting\",components:{AdminlistTable:r.default},data:function(){var i=this;return{sixLotteryColor:o.default,selectList:[],showUpdateOpenLotteryModal:!1,showAgainPrizeModal:!1,OpenLotteryForm:{lid:1,issue:null,number:null,openingTime:null},UpdateOpenLotteryForm:{lid:null,issue:null,number:null},AgainPrizeForm:{lotteryName:null,lid:null,issue:null,type:null,result:null},DataSearch:{lid:1},AgainPrizeFormRules:{type:[{required:!0,message:\"请选择类型\",trigger:\"change\"}],result:[{required:!0,message:\"请输入开奖号码\",trigger:\"blur\"}]},table:{TableColumn:[{title:\"彩种\",key:\"lotteryName\",render:function(t,e){return i.selectList.map(function(t){if(t.id==e.row.lotteryId)return t.name})}},{title:\"期数\",key:\"issue\"},{title:\"开奖结果\",key:\"resultInfo\",render:function(o,l){return l.row.resultInfo.split(\",\").map(function(e){var a=void 0;if(1===l.row.lotteryId||18===l.row.lotteryId||19===l.row.lotteryId)i.sixLotteryColor.map(function(t){t.number.includes(1*e)&&(a=t.color)});else{var t=parseInt(256*Math.random()),n=parseInt(256*Math.random()),r=parseInt(256*Math.random());a=\"rgba(\"+t+\",\"+n+\",\"+r+\",.9)\"}return o(\"span\",{style:{color:\"#fff\",cursor:\"pointer\",width:\"20px\",height:\"20px\",marginLeft:\"5px\",display:\"inline-block\",backgroundColor:a,textShadow:\"1px 1px 1px #000\"}},e)})}},{title:\"封盘时间\",key:\"openingTime\",render:function(t,e){return t(\"span\",i.$moment.unix(e.row.openingTime-0).format(\"LLL\"))}},{title:\"开奖时间\",key:\"addTime\",render:function(t,e){return t(\"span\",i.$moment.unix(e.row.addTime-0).format(\"LLL\"))}},{title:\"状态\",key:\"status\",render:function(t,e){return t(\"span\",\"yes\"===e.row.status?\"已结算\":\"未结算\")}},{title:\"操作\",key:\"\",render:function(t,e){return t(\"div\",[t(\"Button\",{props:{size:\"small\"},style:{marginRight:\"5px\",display:\"no\"===e.row.status?\"inline-block\":\"none\"},on:{click:function(){i.showUpdateOpenLotteryModal=!0,i.UpdateOpenLotteryForm.lid=e.row.lotteryId,i.UpdateOpenLotteryForm.issue=e.row.issue}}},\"修改\"),t(\"Button\",{props:{size:\"small\"},style:{marginRight:\"5px\",display:\"yes\"===e.row.status?\"inline-block\":\"none\"},on:{click:function(){i.selectList.map(function(t){t.id==e.row.lotteryId&&(i.AgainPrizeForm.lotteryName=t.name)}),i.showAgainPrizeModal=!0,i.resetAgainPrizeForm(),i.AgainPrizeForm.lid=e.row.lotteryId,i.AgainPrizeForm.issue=e.row.issue}}},\"回滚\"),t(\"Button\",{props:{size:\"small\"},style:{marginLeft:\"5px\"},on:{click:function(){i.LotteryClearing(e)}}},\"结算\")])}}],TableData:{},loading:!0,align:\"center\",posturl:this.$root.HTTP_L.HTTP_Get_OpenLotteryRecord,Refresh:0,dataform:{isRules:\"select\",lid:1}}}},created:function(){this.getLotteryRecordOfYes()},methods:{getLotteryRecordOfYes:function(){var e=this;this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Get_LotteryRecordOfYes).then(function(t){e.selectList=t.data.data})},LotteryClearing:function(e){var a=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_LotteryClearing,{issue:e.row.issue,lid:e.row.lotteryId}).then(function(t){a.$Modal.success({title:\"提示\",content:\"\"+t.data.data}),a.$set(a.table.TableData.data[e.index],\"status\",\"yes\"),e.row.status=\"yes\"})},toggleLottery:function(t){this.OpenLotteryForm.lid=t,this.Search()},resetOpenLotteryForm:function(){this.OpenLotteryForm.issue=\"\",this.OpenLotteryForm.number=\"\",this.OpenLotteryForm.openingTime=\"\",this.Search()},resetAgainPrizeForm:function(){this.AgainPrizeForm.type=\"\",this.AgainPrizeForm.result=\"\"},Search:function(){for(var t in this.DataSearch)null!=this.DataSearch[t]&&\"\"!=this.DataSearch[t]||delete this.DataSearch[t];this.table.dataform=JSON.parse((0,n.default)(this.DataSearch))},UpdateOpenLottery:function(){var e=this,t=this.$root.HTTP_L.HTTP_Insert_OpenLotteryNumber,a=(0,p.default)({},this.OpenLotteryForm),n=/\\w/,r=!0,o=!1,l=void 0;try{for(var i,s=(0,c.default)((0,d.default)(a));!(r=(i=s.next()).done);r=!0){var u=i.value;if(!n.test(u))return this.$root.modal(\"error\",\"\",\"请填写完整信息！\"),!1}}catch(t){o=!0,l=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw l}}this.$root.HTTP_ALLLINKPOST(t,a).then(function(t){e.$root.modal(\"success\",\"\",\"开奖成功\"),e.table.Refresh++})},UpdateOpenLotteryResult:function(){var e=this;this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_OpenLotteryResult,this.UpdateOpenLotteryForm).then(function(t){e.$root.modal(\"success\",\"\",\"修改成功\"),e.showUpdateOpenLotteryModal=!1,e.table.Refresh++})},UpdateAgainPrize:function(){var n=this;this.$refs.AgainPrizeForm.validate(function(t){if(t){var e=n.$root.HTTP_L.HTTP_Update_AgainPrize,a=(0,p.default)({},n.AgainPrizeForm);n.$root.HTTP_ALLLINKPOST(e,a).then(function(t){n.$root.modal(\"success\",\"\",\"重新开奖成功\"),n.resetAgainPrizeForm(),n.showAgainPrizeModal=!1,n.table.Refresh++})}})}}}},1783:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n(\"div\",{staticClass:\"user_info\"},[n(\"div\",{staticClass:\"layout\"},[n(\"div\",{staticClass:\"page-header\"},[n(\"h1\",{staticClass:\"binding\"},[a._v(\"\\n        \"+a._s(a.$route.meta.title)+\"\\n      \")])]),a._v(\" \"),n(\"div\",{staticClass:\"page-con1\"},[n(\"div\",{staticClass:\"c_left\"},[n(\"i-col\",{staticClass:\"c_search_top\",attrs:{span:\"24\"}},[n(\"Card\",{attrs:{\"dis-hover\":\"\"}},[n(\"i-form\",{attrs:{model:a.DataSearch,inline:\"\"}},[n(\"FormItem\",{attrs:{label:\"彩种\"}},[n(\"Select\",{staticStyle:{width:\"140px\"},attrs:{placeholder:\"请选择彩种\"},on:{\"on-change\":a.toggleLottery},model:{value:a.DataSearch.lid,callback:function(t){a.$set(a.DataSearch,\"lid\",t)},expression:\"DataSearch.lid\"}},a._l(a.selectList,function(t,e){return n(\"Option\",{key:e,attrs:{value:t.id}},[a._v(a._s(t.name))])}),1)],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"开奖期号\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"例如 201806190248\"},model:{value:a.OpenLotteryForm.issue,callback:function(t){a.$set(a.OpenLotteryForm,\"issue\",t)},expression:\"OpenLotteryForm.issue\"}})],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"封盘时间\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"例如 2018-07-25 18:30:00\"},model:{value:a.OpenLotteryForm.openingTime,callback:function(t){a.$set(a.OpenLotteryForm,\"openingTime\",t)},expression:\"OpenLotteryForm.openingTime\"}})],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"开奖号码\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"例如 1,2,3,4,5(用英文逗号隔开)\"},model:{value:a.OpenLotteryForm.number,callback:function(t){a.$set(a.OpenLotteryForm,\"number\",t)},expression:\"OpenLotteryForm.number\"}})],1),a._v(\" \"),n(\"FormItem\",[n(\"Button\",{attrs:{type:\"success\"},on:{click:a.UpdateOpenLottery}},[a._v(\"开奖\")]),a._v(\" \"),n(\"Button\",{attrs:{type:\"warning\"},on:{click:a.resetOpenLotteryForm}},[a._v(\"重置\")])],1)],1)],1)],1),a._v(\" \"),n(\"i-col\",{staticClass:\"c_search_result\",attrs:{span:\"24\"}},[n(\"div\",{staticClass:\"serach\"},[n(\"div\",{staticClass:\"have_con\"},[n(\"div\",{staticClass:\"data_sj\"},[n(\"div\",{staticStyle:{margin:\"10px 0\",overflow:\"hidden\"}},[n(\"AdminlistTable\",{attrs:{table:a.table}})],1)])])])])],1)]),a._v(\" \"),n(\"Modal\",{attrs:{\"class-name\":\"vertical-center-modal\",loading:!0,width:\"550px\",title:\"开奖修改\"},on:{\"on-ok\":a.UpdateOpenLotteryResult},model:{value:a.showUpdateOpenLotteryModal,callback:function(t){a.showUpdateOpenLotteryModal=t},expression:\"showUpdateOpenLotteryModal\"}},[n(\"Form\",{ref:\"UpdateOpenLotteryForm\",attrs:{model:a.UpdateOpenLotteryForm,\"label-position\":\"left\",\"label-width\":110}},[n(\"FormItem\",{attrs:{label:\"开奖号码\"}},[n(\"i-input\",{staticStyle:{width:\"300px\"},attrs:{type:\"textarea\",placeholder:\"例如 1,2,3,4,5(用英文逗号隔开)\"},model:{value:a.UpdateOpenLotteryForm.number,callback:function(t){a.$set(a.UpdateOpenLotteryForm,\"number\",t)},expression:\"UpdateOpenLotteryForm.number\"}})],1)],1)],1),a._v(\" \"),n(\"Modal\",{attrs:{\"class-name\":\"vertical-center-modal\",scrollable:!0,\"mask-closable\":!1,width:\"550px\",title:\"开奖回滚\"},model:{value:a.showAgainPrizeModal,callback:function(t){a.showAgainPrizeModal=t},expression:\"showAgainPrizeModal\"}},[n(\"Form\",{ref:\"AgainPrizeForm\",attrs:{model:a.AgainPrizeForm,rules:a.AgainPrizeFormRules,\"label-position\":\"left\",\"label-width\":110}},[n(\"FormItem\",{attrs:{label:\"彩种名称\",prop:\"lotteryName\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"例如 201806190248\"},model:{value:a.AgainPrizeForm.lotteryName,callback:function(t){a.$set(a.AgainPrizeForm,\"lotteryName\",t)},expression:\"AgainPrizeForm.lotteryName\"}})],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"开奖期号\",prop:\"issue\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{placeholder:\"例如 201806190248\"},model:{value:a.AgainPrizeForm.issue,callback:function(t){a.$set(a.AgainPrizeForm,\"issue\",t)},expression:\"AgainPrizeForm.issue\"}})],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"撤回类型\",prop:\"type\"}},[n(\"Select\",{staticStyle:{width:\"260px\"},attrs:{clearable:\"\",placeholder:\"请选择类型\"},model:{value:a.AgainPrizeForm.type,callback:function(t){a.$set(a.AgainPrizeForm,\"type\",t)},expression:\"AgainPrizeForm.type\"}},[n(\"Option\",{attrs:{value:\"1\"}},[a._v(\"只撤回未中奖的注单\")]),a._v(\" \"),n(\"Option\",{attrs:{value:\"2\"}},[a._v(\" 撤回所有的注单\")])],1)],1),a._v(\" \"),n(\"FormItem\",{attrs:{label:\"开奖号码\",prop:\"result\"}},[n(\"i-input\",{staticStyle:{width:\"260px\"},attrs:{type:\"textarea\",placeholder:\"例如 1,2,3,4,5(必须使用英文格式的逗号)\"},model:{value:a.AgainPrizeForm.result,callback:function(t){a.$set(a.AgainPrizeForm,\"result\",t)},expression:\"AgainPrizeForm.result\"}})],1),a._v(\" \"),n(\"FormItem\",[n(\"Button\",{attrs:{type:\"primary\",loading:a.$root.btnLoading},on:{click:a.UpdateAgainPrize}},[a._v(\"确定\")]),a._v(\" \"),n(\"Button\",{on:{click:function(t){a.showAgainPrizeModal=!1}}},[a._v(\"取消\")])],1)],1),a._v(\" \"),n(\"div\",{attrs:{slot:\"footer\"},slot:\"footer\"})],1)],1)])};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.default=r},760:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=a(1448),r=a.n(n);for(var o in n)\"default\"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);var l=a(1783),i=a.n(l),s=a(63)(r.a,i.a,!1,null,null,null);s.options.__file=\"src/template/LotteryManager/LotteryWinSetting.vue\",e.default=s.exports},769:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=i(a(774)),r=i(a(145)),o=i(a(76)),l=i(a(144));function i(t){return t&&t.__esModule?t:{default:t}}e.default={name:\"TableCommon\",props:[\"table\"],components:{},activated:function(){},data:function(){return{page:1,response:{},dateOption:{}}},watch:{\"table.posturl\":function(t){this.tableRequest()},\"table.Refresh\":function(t){this.tableRequest()},\"table.dataform\":{handler:function(t){0<this.table.posturl.indexOf(\"?\")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf(\"?\"))),this.table.post||this.tableRequest()},deep:!0},\"table.selectAllcencle\":function(t){this.$refs.table.selectAll(!1)}},created:function(){this.table.flag||this.tableRequest()},methods:{goPage:function(){var t=this.$refs.Page.$el.querySelector(\"input\").value;if(t>this.$refs.Page.allPages)return!1;0<this.table.posturl.indexOf(\"?\")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf(\"?\"))),this.table.posturl=this.table.posturl+\"?page=\"+t},PageChange:function(t){0<this.table.posturl.indexOf(\"?\")&&(this.table.posturl=this.table.posturl.slice(0,this.table.posturl.indexOf(\"?\"))),this.table.posturl=this.table.posturl+\"?page=\"+t},OnSelected:function(t){this.$emit(\"listenOnSelect\",t)},OnSortChange:function(t){this.$emit(\"listenOnSortTable\",t)},expand:function(t,e){this.$emit(\"listenOnExpand\",{row:t,status:e})},tableRequest:function(t){var e=this;this.table.loading=!0,\"get\"!==this.table.postType&&this.table.posturl?this.$root.HTTP_ALLLINKPOST(this.table.posturl,this.table.dataform).then(function(t){\"string\"==typeof t.data.data?e.table.TableData=JSON.parse(t.data.data):(t.data.data.hasOwnProperty(\"data\")?t.data.data.data.hasOwnProperty(\"list\")?(e.table.TableData=(0,l.default)({},t.data.data),e.table.TableData.data=[].concat((0,o.default)(t.data.data.data.list)),e.$set(e.table.TableData,\"totalCount\",t.data.data.data.total)):e.table.TableData=t.data.data:(e.table.TableData.data=t.data.data,(0,r.default)(t.data.data)&&(e.table.TableData.data=(0,n.default)(t.data.data))),0==t.data.data.length&&(e.table.TableData={}),e.page=t.data.data.current_page),e.table.loading=!1,e.table.TableData.data.length?e.table.buttonDisabled=!1:e.table.buttonDisabled=!0,e.$emit(\"listenOnTableData\")}).catch(function(t){e.table.loading=!1,e.$emit(\"listenOnTableData\"),e.table.TableData.data=[],t.body&&200!==t.body.code&&e.$emit(\"catchError\",t.body.code)}):this.table.posturl?this.$root.HTTP_ALLLINKGET(this.table.posturl,this.table.dataform).then(function(t){\"string\"==typeof t.data.data?e.table.TableData=JSON.parse(t.data.data):t.data.data.hasOwnProperty(\"data\")?e.table.TableData=t.data.data:e.table.TableData.data=t.data.data,e.table.loading=!1}).catch(function(t){e.table.loading=!1,e.table.TableData.data=[]}):this.table.loading=!1}}}},774:function(t,e,a){t.exports={default:a(779),__esModule:!0}},779:function(t,e,a){a(780),t.exports=a(11).Object.values},780:function(t,e,a){var n=a(31),r=a(781)(!1);n(n.S,\"Object\",{values:function(t){return r(t)}})},781:function(t,e,a){var s=a(64),u=a(54),d=a(78).f;t.exports=function(i){return function(t){for(var e,a=u(t),n=s(a),r=n.length,o=0,l=[];o<r;)d.call(a,e=n[o++])&&l.push(i?[e,a[e]]:a[e]);return l}}},782:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=a(769),r=a.n(n);for(var o in n)\"default\"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);var l=a(785),i=a.n(l),s=!1;var u=function(t){s||a(783)},d=a(63)(r.a,i.a,!1,u,null,null);d.options.__file=\"src/template/my-components/iview-table/table.vue\",e.default=d.exports},783:function(t,e,a){var n=a(784);\"string\"==typeof n&&(n=[[t.i,n,\"\"]]),n.locals&&(t.exports=n.locals);a(75)(\"78bbc5d7\",n,!1,{})},784:function(t,e,a){(t.exports=a(74)(!1)).push([t.i,\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\",\"\"])},785:function(t,e,a){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a(\"div\",[a(\"div\",[a(\"i-col\",{attrs:{span:\"24\"}},[a(\"i-table\",{ref:\"table\",class:{center:\"center\"==t.table.align},attrs:{border:\"\",loading:t.table.loading,context:t.$parent,data:t.table.TableData.data,columns:t.table.TableColumn},on:{\"on-sort-change\":t.OnSortChange,listenRequest:t.tableRequest,\"on-selection-change\":t.OnSelected,\"on-expand\":t.expand}})],1),t._v(\" \"),1<t.table.TableData.last_page?a(\"div\",{staticStyle:{margin:\"10px\"}},[a(\"div\",{staticClass:\"clearfix\",staticStyle:{float:\"right\"}},[a(\"Page\",{ref:\"Page\",staticStyle:{float:\"left\"},attrs:{total:t.table.TableData.total,\"show-total\":\"\",current:t.page,\"page-size\":t.table.TableData.per_page-0,\"show-elevator\":\"\"},on:{\"on-change\":t.PageChange}}),t._v(\" \"),a(\"Button\",{staticStyle:{float:\"left\",height:\"32px\",margin:\"10px 0 0 10px\"},attrs:{size:\"small\"},on:{click:t.goPage}},[t._v(\"go!\")])],1)]):t._e()],1)])};n._withStripped=!0;var r={render:n,staticRenderFns:[]};e.default=r}});"}