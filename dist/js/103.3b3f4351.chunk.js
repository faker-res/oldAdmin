webpackJsonp([103],{1452:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i,n=e(77),s=(i=n)&&i.__esModule?i:{default:i};a.default={name:"Odds",data:function(){return{value:"",iSXGPL:!1,XiuGaiPeiLvTC:!1,XiuGaiPeiLvData:{},spinShow:!0,ruleValidate:{ball:[{required:!0,message:"号码不正确",trigger:"blur"}],oddsMax:[{required:!0,message:"最大赔率不正确",trigger:"blur"}],oddsMin:[{required:!0,message:"最小赔率不正确",trigger:"blur"}],title:[{required:!0,message:"名称不正确",trigger:"blur"}]},DataMemory:{},btnLoading:!1,pageSize:10,table:{TableData:[],loading:!0,align:"center",posturl:this.$root.HTTP_L.HTTP_HuoQuCaiPiaoPeiLv+"/1",dataform:{},Refresh:0,postType:"get"}}},beforeRouteEnter:function(t,a,e){e(function(t){})},created:function(){var a=this,t=this.$route.query,e=t.sid,i=t.lid,n=this.$root.HTTP_L.HTTP_HuoQuCaiPiaoPeiLv+"/"+e+"/"+i;this.$root.HTTP_ALLLINKGET(n).then(function(t){a.spinShow=!1,a.table.TableData=t.data.data,"string"==typeof a.table.TableData.oddsInfo&&(a.table.TableData.oddsInfo=JSON.parse(a.table.TableData.oddsInfo)),a.table.TableData.oddsInfo.forEach(function(t){t.oddsMax=String(t.oddsMax),t.fsrate=String(t.fsrate),t.oddsMin=String(t.oddsMin),t.oddsMax=t.oddsMax.split("/"),t.oddsMin=t.oddsMin.split("/")}),a.XiuGaiPeiLvData=JSON.parse((0,s.default)(a.table.TableData)),a.table.loading=!1})},computed:{},methods:{XiuGaiTiJiao:function(){var a=this;this.spinShow=!0;var t=JSON.parse((0,s.default)(this.table.TableData.oddsInfo));t.forEach(function(t){t.oddsMax=t.oddsMax.join("/"),t.oddsMin=t.oddsMin.join("/")}),this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GengXinCaiPiaoPeiLv,{id:this.$route.query.id,oddsInfo:(0,s.default)(t)}).then(function(t){a.spinShow=!1,a.XiuGaiPeiLvData=JSON.parse((0,s.default)(a.table.TableData)),a.$Modal.success({title:"提示",content:"修改赔率成功！"}),a.iSXGPL=!1}).catch(function(t){a.spinShow=!1})},XiuGaiQuXiao:function(){this.table.TableData.oddsInfo=JSON.parse((0,s.default)(this.XiuGaiPeiLvData.oddsInfo)),this.iSXGPL=!1},UpdateLotteryTimeB:function(){var e=this;this.$refs.XiuGaiPeiLv.validate(function(t){if(t){for(var a in e.XiuGaiPeiLv.oddsInfo)e.XiuGaiPeiLv.oddsInfo[a]=e.DataMemory[a];e.XiuGaiPeiLv.id=e.table.TableData.id,e.$root.HTTP_ALLLINKPOST(e.$root.HTTP_L.HTTP_GengXinCaiPiaoPeiLv,e.XiuGaiPeiLv).then(function(t){e.$Message.success("编辑彩票赔率成功!"),e.table.Refresh++,e.XiuGaiPeiLvTC=!1}).catch(function(){})}else e.$Message.error("请填写正确的信息!")})},quanxuan:function(){this.HuiYuanDengJi=["未分层（新会员）","第一层（普通会员）","第二层（普通会员）","第十级（高级会员）"]},qingkong:function(){this.HuiYuanDengJi=[]}}}},1789:function(t,a,e){var i=e(1790);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(75)("21fd02aa",i,!1,{})},1790:function(t,a,e){(t.exports=e(74)(!1)).push([t.i,"\n.xuanze[data-v-e27eda76] {\n  margin-bottom: 10px;\n}\n.form-group[data-v-e27eda76] {\n  margin-bottom: 5px;\n}\n.form-group .label[data-v-e27eda76] {\n  display: inline-block;\n  width: 71px;\n  text-align: right;\n}\n.form-group .ivu-date-picker[data-v-e27eda76],\n.form-group .ivu-select[data-v-e27eda76],\n.form-group .ivu-input-wrapper[data-v-e27eda76],\n.form-group .ivu-i-input-wrapper[data-v-e27eda76] {\n  margin: 0 5px;\n}\n.c_ser[data-v-e27eda76] {\n  margin-bottom: 10px;\n}\n.c_ser span.xian[data-v-e27eda76] {\n  width: 10%;\n  display: inline-block;\n  text-align: center;\n}\n",""])},1791:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=function(){var i=this,t=i.$createElement,n=i._self._c||t;return n("div",{staticClass:"content-main agent-main"},[n("div",{staticClass:"layout"},[n("div",{staticClass:"page-header"},[n("h1",{staticClass:"binding"},[i._v(i._s(i.$route.meta.title)+"\n        "),n("span",[i._v(i._s(i.$route.query.name))])])]),i._v(" "),n("div",{staticClass:"page-con1"},[n("div",{staticClass:"c_right"},[n("i-col",{staticClass:"c_search_result",attrs:{span:"24"}},[n("div",{staticClass:"serach"},[n("div",{staticClass:"have_con"},[n("div",{staticClass:"caozuo_btn"},[i.iSXGPL?i._e():n("Button",{attrs:{type:"primary"},on:{click:function(t){i.iSXGPL=!i.iSXGPL}}},[i._v("修改赔率")]),i._v(" "),i.iSXGPL?n("Button",{attrs:{type:"success"},on:{click:i.XiuGaiTiJiao}},[i._v("保存修改")]):i._e(),i._v(" "),i.iSXGPL?n("Button",{attrs:{type:"error"},on:{click:i.XiuGaiQuXiao}},[i._v("取消修改")]):i._e(),i._v(" "),n("Button",{on:{click:i.$root.go_back}},[i._v("返回")])],1),i._v(" "),n("div",{staticClass:"data_sj"},[n("div",{staticStyle:{margin:"10px 0"}},[n("table",{staticClass:"table",staticStyle:{width:"100%","text-align":"center","line-height":"32px"}},[n("thead",[n("tr",[n("th",[i._v("描述")]),i._v(" "),n("th",[i._v("号码")]),i._v(" "),n("th",[i._v("最大赔率")]),i._v(" "),n("th",[i._v("最小赔率")]),i._v(" "),n("th",[i._v("返水")]),i._v(" "),n("th",[i._v("玩法")])])]),i._v(" "),n("tbody",i._l(i.table.TableData.oddsInfo,function(e,t){return n("tr",{key:t},[n("td",[i._v(i._s(e.title))]),i._v(" "),n("td",[n("Tooltip",{attrs:{placement:"top"}},[n("a",[i._v(i._s(e.ball.slice(0,20))+"\n                              "),n("span",{directives:[{name:"show",rawName:"v-show",value:20<e.ball.length,expression:"m.ball.length>20"}]},[i._v("...")])]),i._v(" "),n("div",{attrs:{slot:"content"},slot:"content"},[i._v("\n                              "+i._s(e.ball)+"\n                            ")])])],1),i._v(" "),n("td",[n("span",{directives:[{name:"show",rawName:"v-show",value:!i.iSXGPL,expression:"!iSXGPL"}]},[i._v(i._s(e.oddsMax.join("/")))]),i._v(" "),i._l(e.oddsMax,function(t,a){return n("span",{key:a},[n("input",{directives:[{name:"show",rawName:"v-show",value:i.iSXGPL,expression:"iSXGPL"},{name:"model",rawName:"v-model",value:e.oddsMax[a],expression:"m.oddsMax[c]"}],staticClass:"inputt",staticStyle:{width:"80px"},attrs:{type:"number",step:.01,min:e.oddsMin[a]},domProps:{value:e.oddsMax[a]},on:{input:function(t){t.target.composing||i.$set(e.oddsMax,a,t.target.value)}}})])})],2),i._v(" "),n("td",[n("span",{directives:[{name:"show",rawName:"v-show",value:!i.iSXGPL,expression:"!iSXGPL"}]},[i._v(i._s(e.oddsMin.join("/")))]),i._v(" "),i._l(e.oddsMin,function(t,a){return n("span",{key:a},[n("input",{directives:[{name:"show",rawName:"v-show",value:i.iSXGPL,expression:"iSXGPL"},{name:"model",rawName:"v-model",value:e.oddsMin[a],expression:"m.oddsMin[c]"}],staticClass:"inputt",staticStyle:{width:"80px"},attrs:{type:"number",step:.01,min:0,max:e.oddsMax[a]},domProps:{value:e.oddsMin[a]},on:{input:function(t){t.target.composing||i.$set(e.oddsMin,a,t.target.value)}}})])})],2),i._v(" "),n("td",[i._v(i._s(e.fsrate))]),i._v(" "),n("td",[i._v(i._s(e.playway))])])}),0)]),i._v(" "),i.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):i._e()],1)]),i._v(" "),n("div",{staticClass:"caozuo_btn"},[i.iSXGPL?n("Button",{attrs:{type:"success",loading:i.$root.btnLoading},on:{click:i.XiuGaiTiJiao}},[i._v("保存修改")]):i._e(),i._v(" "),i.iSXGPL?n("Button",{attrs:{type:"error"},on:{click:i.XiuGaiQuXiao}},[i._v("取消修改")]):i._e(),i._v(" "),n("Button",{on:{click:i.$root.go_back}},[i._v("返回")])],1)])])])],1)])])])};i._withStripped=!0;var n={render:i,staticRenderFns:[]};a.default=n},764:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e(1452),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(a,t,function(){return i[t]})}(s);var o=e(1791),r=e.n(o),d=!1;var u=function(t){d||e(1789)},l=e(63)(n.a,r.a,!1,u,"data-v-e27eda76",null);l.options.__file="src/template/LotteryManager/UpdateLotteryOdds.vue",a.default=l.exports}});