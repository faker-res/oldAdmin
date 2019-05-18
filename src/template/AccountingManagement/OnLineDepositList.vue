<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24" class-name="online-search">
            <Card dis-hover>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px" :disabled="disabled"></DatePicker>
                </FormItem>
                <FormItem label="订单号">
                  <i-input style="width:200px" v-model="search.code"></i-input>
                </FormItem>
                <FormItem label="支付平台">
                  <Select v-model="search.typeId" style="width:160px" placeholder="选择">
                    <Option v-for="(item,i) in paymentList" :value="item.id" :key="i" :label="item.name"></Option>
                  </Select>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem>
                <Collapse>
                  <Panel name="more">
                    <span>更多查询条件</span>
                    <div slot="content">
                      <FormItem label="等级">
                        <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" @listenLevelChange="levelChange"></LevelSelect>
                      </FormItem>
                      <FormItem label="状态">
                        <Select style="width:120px" v-model="search.status" placeholder="选择">
                          <Option value="all" label="全部">
                            <span>全部</span>
                          </Option>
                          <Option label="成功" value="success">
                            <span>成功</span>
                          </Option>
                          <Option label="未处理" value="payment">
                            <span>未处理</span>
                          </Option>
                          <Option label="失败" value="fail">
                            <span>失败</span>
                          </Option>
                        </Select>
                      </FormItem>
                      <FormItem label="金额范围">
                        <i-input style="width:100px" v-model="search.minAmount"></i-input>-
                        <i-input style="width:100px" v-model="search.maxAmount"></i-input>
                      </FormItem>
                    </div>
                  </Panel>
                </Collapse>
              </i-form>
            </Card>
          </i-col>
        </div>
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <Row type="flex" justify="end">
              <i-col>
                <Select v-model="search.limit" size="small" style="width:100px" @on-change="Search">
                  <Option value="10" label="每页10条"></Option>
                  <Option value="25" label="每页25条"></Option>
                  <Option value="50" label="每页50条"></Option>
                  <Option value="80" label="每页80条"></Option>
                </Select>
                <Select v-model="autoFresh" size="small" style="width:80px">
                  <Option value="0" label="不刷新">不刷新</Option>
                  <Option value="15" label="15秒">15秒</Option>
                  <Option value="30" label="30秒">30秒</Option>
                  <Option value="60" label="60秒">60秒</Option>
                  <Option value="90" label="90秒">90秒</Option>
                </Select>
              </i-col>
            </Row>
            <div style="margin: 10px 0;overflow: hidden">
              <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" :table="table" @catchError="catchError"></MyTable>
            </div>
            <div v-if="Object.keys(this.total).length">
              <span>{{total.success.success_name}}：{{total.success.success_total}}</span>
              <span>{{total.payment.payment_name}}：{{total.payment.payment_total}}，</span>
              <span>{{total.fail.fail_name}}：{{total.fail.fail_total}}，</span>
            </div>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "OnLineDepositList",
  mixins: [mixins],
  data() {
    return {
      total: {},
      search: {
        username: "",
        siteId: "",
        code: "",
        typeId: "all",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        maxAmount: "",
        minAmount: "",
        levelId: null
      },
      paymentList: [], //支付平台
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minwidth: 100
          },
          {
            title: "等级",
            key: "levelId",
            minWidth: 80,
            render: (h, params) => {
              return h('span',this.levelFilter(params.row.levelId, params.row.levelName));
            }
          },
          {
            title: "订单号",
            key: "code",
            minWidth: 210
          },
          {
            title: "代理/直属会员",
            key: "agencyName",
            minWidth: 125
          },
          {
            title: "账号",
            key: "username",
            minWidth: 100
          },
          {
            title: "提交时间",
            key: "time",
            minWidth: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(+params.row.time).format("LLL"));
            }
          },
          {
            title: "存入金额",
            key: "amount"
          },
          {
            title: "实际到账金额",
            key: "confirmAmount",
            minwidth: 120
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              let props = {
                type:
                  params.row.status == "success"
                    ? "success"
                    : params.row.status == "payment"
                      ? "primary"
                      : "error",
                size: "small"
              };
              return h(
                "Button",
                {
                  props: props
                },
                params.row.status == "success"
                  ? "成功"
                  : params.row.status == "payment"
                    ? "未处理"
                    : "失败"
              );
            }
          },
          {
            title: "支付平台",
            key: "type",
            minWidth: 100,
            render: (h, params) => {
              return h('span',params.row.type + params.row.subType);
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display:
                        params.row.status === "payment"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click() {
                        that.$Modal.confirm({
                          title: "提示",
                          content: "是否继续入款",
                          onOk: () => {
                            that.$root
                              .HTTP_ALLLINKPOST(
                                that.$root.HTTP_L.HTTP_CunKuanShenHe,
                                {
                                  siteId: params.row.siteId,
                                  depositId: params.row.id,
                                  date: params.row.time,
                                  status: "success",
                                  remark: `管理员${
                                    that.$root.adminuserinfo.adminUserName
                                  }强制入款`,
                                  updateUserName:
                                    that.$root.adminuserinfo.adminUserName
                                }
                              )
                              .then(res => {
                                that.$root.modal("success", "", "入款成功");
                                that.$set(
                                  that.table.TableData.data[params.index],
                                  "status",
                                  "success"
                                );
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  "强制入款"
                ),
                h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.status === "success" ||
                        params.row.status === "fail"
                          ? "inline-block"
                          : "none"
                    }
                  },
                  "-"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_ZaiXianZhiFuRuKuanLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10",
          startTime: this.$moment({
            hours: 0,
            minutes: 0,
            seconds: 0
          }).format("LLL"),
          endTime: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL")
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // if (this.search.siteId) {
        this.getPaymentWays();
        this.updateTime();
        this.getTotal();
      // }
    });
  },
  methods: {
    updateTime() {
      this.Time = [
        this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format("LLL"),
        this.$moment({ hours: 0, minutes: 0, seconds: 0 })
          .add(1, "days")
          .format("LLL")
      ];
    },
    getPaymentWays() {
      let params = {};
      if (this.search.siteId) {
        params.siteId = this.search.siteId;
      } else {
        params.siteId = this.defaultSiteId;
      }
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_CunKuanZaiXianZhiFuLieBiao,
          params
        )
        .then(res => {
          this.paymentList = res.data.data;
          this.paymentList.unshift({
            id: "all",
            name: "全部"
          });
        });
    },
    siteChange(re) {
      this.search.siteId = re.SiteId;
      this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
    },
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      this.search.typeId =
        this.search.typeId === "all" ? "" : this.search.typeId;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.status = this.search.status ? this.search.status : "all";
      this.search.typeId = this.search.typeId ? this.search.typeId : "all";
      this.getTotal();
    },
    SearchRest() {
      this.autoFresh = "0";
      this.search = {
        username: "",
        siteId: this.defaultSiteId,
        code: "",
        typeId: "all",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        maxAmount: "",
        minAmount: "",
        levelId: null
      };
      this.$refs.SiteNameSelect.InitData();
      this.$refs.LevelSelect.setDefaultLevel("");
      this.updateTime();
      this.Search();
    },
    getTotal() {
      this.search.siteId = this.search.siteId ? this.search.siteId : this.defaultSiteId
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      this.search.typeId =
        this.search.typeId === "all" ? "" : this.search.typeId;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      //总计
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Total_Online, this.search)
        .then(res => {
          this.total = res.data.data;
        });
      this.search.status = this.search.status ? this.search.status : "all";
      this.search.typeId = this.search.typeId ? this.search.typeId : "all";
    }
  }
};
</script>
<style lang="less" scoped>
.online-search {
  /deep/.ivu-collapse {
    background-color: transparent;
    border: none;
  }
  /deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
    height: 20px;
    line-height: 20px;
    padding-left: 0;
  }
  /deep/.ivu-collapse-content {
    padding: 0;
    background-color: transparent;
  }
  /deep/.ivu-collapse-content > .ivu-collapse-content-box {
    padding-top: 10px;
    padding-bottom: 0;
  }
  /deep/.ivu-collapse-content {
    padding: 0;
    background-color: transparent;
  }
}
</style>
