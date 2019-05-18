<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form ref="DataSearch" :model="DataSearch" inline>
              <FormItem label="站点" prop="siteId">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>

              <FormItem label="状态">
                <Select placeholder='选择' clearable v-model="DataSearch.status" style="width: 100px">
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{
                    item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button @click="SearchRest" type="warning">重置</Button>
              </FormItem>
            </i-form>
          </Card>
        </i-col>
        <i-col class="c_search_result" span="24">
          <div class="serach">
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn">
                  <Button type="primary" @click="$router.push({name:'MemberLevelCreate'})">添加站点等级</Button>
                  <Button type="primary" @click="$router.push({name:'MemberLevelBatch'})">修改会员等级</Button>
                  <!-- <BatchMemberLevel></BatchMemberLevel> -->
                  <Button type="primary" @click="paymentShow">支付通道</Button>
                </div>
                <div style="margin: 10px 0;overflow: hidden">
                  <MyTable :table="table"></MyTable>
                </div>
              </div>
            </div>
          </div>
        </i-col>
      </div>
    </div>
    <Modal v-model="paymentModal" title="支付设置" class="paymentModal" @on-ok="submitPayment" @on-cancel="cancel" width=900>
      <div class="scroll-bar-y" style="height:420px;">
        <Spin fix v-if="spinShow">
          <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
        <Card dis-hover style="margin-bottom:20px" v-if="Object.keys(paymentData).length">
          <p slot="title">电脑端</p>
          <ul>
            <li v-for="(i,v) in paymentData['pc']" :key="v" style="list-style:none;padding:5px 0;">
              <label style="display:inline-block;width:110px;">{{i.pc_name}}：</label>
              <Select clearable v-for="k in [0,1,2,3,4]" :key="k" :style="{width:'120px',marginRight:'10px'}" v-model="pc[i.pc_id][k]" :placeholder="'通道' + (k===0 ? '一' :k===1 ? '二' : k===2? '三' :k===3 ? '四' : '五')">
                <Option v-for="c in i.payment_list" :key="c.id" :value="c.id" :disabled="pcDisabled[i.pc_id][c.id]">{{c.payName}}</Option>
              </Select>
            </li>
          </ul>
        </Card>
        <Card dis-hover v-if="Object.keys(paymentData).length">
          <p slot="title">手机端</p>
          <ul>
            <li v-for="(i,v) in paymentData['h5']" :key="v" style="list-style:none;padding:5px 0;">
              <label style="display:inline-block;width:110px;">{{i.pc_name}}：</label>
              <Select clearable v-for="k in [0,1,2,3,4]" :key="k" :style="{width:'120px',marginRight:'10px'}" v-model="h5[i.pc_id][k]" :placeholder="'通道' + (k===0 ? '一' :k===1 ? '二' : k===2? '三' :k===3 ? '四' : '五')">
                <Option v-for="c in i.payment_list" :key="c.id" :value="c.id" :disabled="h5Disabled[i.pc_id][c.id]">{{c.payName}}</Option>
              </Select>
            </li>
          </ul>
        </Card>
      </div>
    </Modal>
    <Modal v-model="memberListShow" title="会员列表" width=1200>
      <div class="scroll-bar-y" style="max-height:420px;">
        <span v-for="i in memberList" :key="i" style="display:inline-block;width:12.5%;font-size:13px;padding:10px 0;">{{i}}</span>
      </div>
    </Modal>
    <Modal v-model="paymentListModal" title="支付通道" width=1200>
      <div class="scroll-bar-y" style="max-height:420px;">
        <table class="table" width="100%" v-if="Object.keys(paymentList).length">
          <thead>
            <tr>
              <th>终端</th>
              <th>等级</th>
              <th>支付方式</th>
              <!-- <th colspan="5">通道</th> -->
              <!-- </tr> -->
              <!-- <tr> -->
              <th>通道一</th>
              <th>通道二</th>
              <th>通道三</th>
              <th>通道四</th>
              <th>通道五</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :rowspan="paymentList.pc.length">电脑端</td>
              <td>{{paymentList.pc[0].lvl_alias_name || paymentList.pc[0].lvl_name}}</td>
              <td>
                <div v-for="(i,c) in paymentList.pc[0].payment_info" :key="c">{{i.payment_class}}</div>
              </td>
              <td :colspan="5">
                <div v-for="(i,c) in paymentList.pc[0].payment_info" :key="c">
                  <span v-for="(a,b) in i.payment_name" :key="b">{{a ? a : '&nbsp;'}}</span>
                </div>
              </td>
            </tr>
            <tr v-for="(i,c) in paymentList.pc.slice(1)" :key="c">
              <td>{{i.lvl_alias_name}}</td>
              <td>
                <div v-for="(v,k) in i.payment_info" :key="k">{{v.payment_class}}</div>
              </td>
              <td :colspan="5">
                <div v-for="(v,k) in i.payment_info" :key="k">
                  <span v-for="(a,b) in v.payment_name" :key="b">{{a ? a : '&nbsp;'}}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td :rowspan="paymentList.h5.length">手机端</td>
              <td>{{paymentList.h5[0].lvl_alias_name || paymentList.h5[0].lvl_name}}</td>
              <td>
                <div v-for="(i,c) in paymentList.h5[0].payment_info" :key="c">{{i.payment_class}}</div>
              </td>
              <td :colspan="5">
                <div v-for="(i,c) in paymentList.h5[0].payment_info" :key="c">
                  <span v-for="(a,b) in i.payment_name" :key="b">{{a ? a : '&nbsp;'}}</span>
                </div>
              </td>
            </tr>
            <tr v-for="i in paymentList.h5.slice(1)" :key="i.lvl_name">
              <td>{{i.lvl_alias_name}}</td>
              <td>
                <div v-for="(v,k) in i.payment_info" :key="k">{{v.payment_class}}</div>
              </td>
              <td :colspan="5">
                <div v-for="(v,k) in i.payment_info" :key="k">
                  <span v-for="(a,b) in v.payment_name" :key="b">{{a ? a : '&nbsp;'}}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
// import BatchMemberLevel from "./components/BatchMemberLevel";
import mixins from "@/mixins";
export default {
  // name: "MemberLevel",
  mixins: [mixins],
  components: {
    // BatchMemberLevel
  },
  data() {
    return {
      spinShow: true,
      paymentData: {}, //全部支付
      devices: [], //设备
      pc: {},
      h5: {},
      pcDisabled: {},
      h5Disabled: {},
      siteId: null,
      lvl_id: null,
      paymentList: [],
      paymentListModal: false,
      DataSearch: {
        status: "",
        siteId: "",
        levelId: []
      },
      paymentModal: false,
      memberListShow: false,
      memberList: [],
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "等级名称",
            key: "levelName",
          },
          {
            title: "等级别称",
            key: "levelAlias",
            render: (h, params) => {
              return h('span',params.row.levelAlias ? params.row.levelAlias : "无");
            }
          },
          {
            title: "会员人数",
            key: "memberNum",
            render: (h, params) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.memberList = params.row.memberNameList;
                      this.memberListShow = true;
                    }
                  }
                },
                params.row.memberNum
              );
            }
          },
          {
            title: "充值笔数",
            key: "depositNumber",
          },
          {
            title: "最小充值",
            key: "minPay",
          },
          {
            title: "打码量",
            key: "betAmount",
          },
          {
            title: "取款打码倍数",
            key: "multiple",
          },
          {
            title: "彩金奖励",
            key: "giftBonus",
          },
          {
            title: "日期",
            key: "updated_at",
            width: 200,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.updated_at - 0).format("LLL"));
            }
          },
          {
            title: "默认等级",
            key: "default",
            render: (h, params) => {
              var color = params.row.default == "yes" ? "yellow" : "#ddd";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.default == "yes" ? "是" : "否"
              );
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 116,
            render: (h, params) => {
              var that = this;
              var color = params.row.status === "yes" ? "success" : "error";
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: color,
                      size: "small"
                    },
                    on: {
                      click: () => {
                        that.ModifyLevelStatus(params);
                      }
                    }
                  },
                  params.row.status == "yes" ? "启用" : "停用"
                )
              ]);
            }
          },
          {
            title: "备注",
            key: "remark",
            maxWidth: 230,
            render: (h, params) => {
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "bottom"
                    },
                    style: {},
                    on: {
                      click: () => {}
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: {
                          color: "#2d8cf0"
                        }
                      },
                      !params.row.remark
                        ? "无"
                        : params.row.remark.length < 10
                          ? params.row.remark
                          : params.row.remark.slice(0, 10) + "..."
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      !params.row.remark ? "无" : params.row.remark
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "操作",
            key: "",
            minWidth: 250,
            render: (h, params) => {
              var that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "MemberLevelDetails",
                          query: {
                            siteId: params.row.siteId,
                            id: params.row.id
                          }
                        });
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "MemberLevelCreate",
                          query: {
                            siteId: params.row.siteId,
                            id: params.row.id,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.lvl_id = params.row.levelLabel;
                        this.siteId = params.row.siteId;
                        this.devices = [];
                        this.$root
                          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentSet, {
                            lvl_id: params.row.levelLabel,
                            siteId: params.row.siteId
                          })
                          .then(res => {
                            this.spinShow = false;
                            this.paymentData = res.data.data;
                            for (let key in this.paymentData) {
                              this.devices.push(key);
                              this.paymentData[key].forEach(i => {
                                this.$set(this[key], i.pc_id, []);
                                this.$set(this[key + "Disabled"], i.pc_id, {});
                                if (i.selected_id) {
                                  i.selected_id.split(",").forEach((k, v) => {
                                    this.$set(this[key][i.pc_id], v, k - 0);
                                    this.$set(
                                      this[key + "Disabled"][i.pc_id],
                                      k,
                                      true
                                    );
                                  });
                                }
                              });
                            }
                          });
                        this.paymentModal = true;
                      }
                    }
                  },
                  "支付设置"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuiYuanDengJiLieBiao,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      }
    };
  },
  watch: {
    pc: {
      handler(newValue, oldValue) {
        for (let key in newValue) {
          this.pcDisabled[key] = {};
          newValue[key].forEach((i, v) => {
            if (i) {
              this.$set(this.pcDisabled[key], i, true);
            }
          });
        }
      },
      deep: true
    },
    h5: {
      handler(newValue, oldValue) {
        for (let key in newValue) {
          this.h5Disabled[key] = {};
          newValue[key].forEach((i, v) => {
            if (i) {
              this.$set(this.h5Disabled[key], i, true);
            }
          });
        }
      },
      deep: true
    }
  },
  methods: {
    SearchRest() {
      this.DataSearch = {
        siteId: this.defaultSiteId,
        status: ""
      };
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    SearchSubmit() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    siteChange(re) {
      if (re.SiteId) {
        this.DataSearch.siteId = re.SiteId;
      }
    },
    ModifyLevelStatus(params) {
      var that = this;
      var status = params.row.status == "yes" ? "no" : "yes";
      this.$Modal.confirm({
        title: "提示",
        loading: true,
        content: params.row.status == "yes" ? "确定停用?" : "确定启用?",
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_XiuGaiHuiYuanXinXiZhuangTai,
              {
                id: params.row.id,
                status: status,
                siteId: params.row.siteId
              }
            )
            .then(res => {
              this.$Message.success("修改状态成功！");
              this.$Modal.remove();
              this.$set(
                that.table.TableData.data[params.index],
                "status",
                status
              );
              params.row.status = status;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    submitPayment() {
      let pc = {};
      let h5 = {};
      for (let key in this.pc) {
        pc[key] = this.pc[key]
          .filter(i => {
            if (i) {
              return i;
            }
          })
          .toString();
        if (!pc[key]) {
          delete pc[key];
        }
      }
      for (let key in this.h5) {
        h5[key] = this.h5[key]
          .filter(i => {
            if (i) {
              return i;
            }
          })
          .toString();
        if (!h5[key]) {
          delete h5[key];
        }
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentSet_Edit, {
          siteId: this.siteId,
          lvl_id: this.lvl_id,
          data: {
            pc: JSON.stringify(pc),
            h5: JSON.stringify(h5)
          }
        })
        .then(res => {
          this.spinShow = true;
          this.$root.modal("success", "", res.data.data);
        })
        .catch(res => {
          this.spinShow = true;
        });
    },
    cancel() {
      this.spinShow = true;
    },
    paymentShow() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_PaymentSet, {
          siteId: this.DataSearch.siteId
        })
        .then(res => {
          this.paymentList = res.data.data;
          this.paymentListModal = true;
        });
    }
  }
};
</script>
<style scoped lang='less'>
.xuanze {
  margin-bottom: 10px;
}

.form-group {
  .label {
    display: inline-block;
    width: 71px;
    text-align: right;
  }

  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper,
  .ivu-i-input-wrapper {
    margin: 0 5px;
  }

  margin-bottom: 5px;
}

.c_ser {
  margin-bottom: 10px;

  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
.table {
  text-align: center;
  font-size: 13px;
  tr {
    td {
      padding: 0;
      div {
        border-bottom: 1px solid #e9eaec;
        line-height: 2.5;
        // padding:5px 0;
        &:last-of-type {
          border-bottom: 0;
        }
        span {
          display: inline-block;
          width: 20%;
          border-right: 1px solid #e9eaec;
        }
      }
    }
  }
}
</style>