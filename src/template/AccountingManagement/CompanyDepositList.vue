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
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="等级">
                  <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" @listenLevelChange="levelChange"></LevelSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px" :disabled="disabled"></DatePicker>
                </FormItem>
                <FormItem label="公司账户">
                  <Select v-model="search.depositId" style="width:180px">
                    <Option v-for="(item,i) in bankList" :value="item.depositId" :key="i">{{item.bankName}}{{item.depositId === "all-all"
                      ? "" : '-'+ item.cardName}}</Option>
                  </Select>
                </FormItem>
                <FormItem label="状态">
                  <Select style="width:120px" v-model="search.status" placeholder="全部">
                    <Option value="all" label="全部">
                      <span>全部</span>
                    </Option>
                    <Option label="成功" value="success">
                      <span>成功</span>
                    </Option>
                    <Option label="等待支付" value="payment">
                      <span>待支付</span>
                    </Option>
                    <Option label="待审核" value="wait">
                      <span>待审核</span>
                    </Option>
                    <Option label="失败" value="fail">
                      <span>失败</span>
                    </Option>
                  </Select>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem>
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
              <span>{{total.wait.wait_name}}：{{total.wait.wait_total}}，</span>
              <span>{{total.fail.fail_name}}：{{total.fail.fail_total}}，</span>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal shenHeModal" v-model="shenHeModal" width="500">
      <p slot="header" style="text-align:center">
        <span>会员公司入款详情</span>
      </p>
      <div style="padding-left: 20px;position: relative;">
        <Spin size="small" fix v-if="reviewSpin"></Spin>
        <p>
          <label>账号：</label>{{dataDetail.username}}</p>
        <p>
          <label>会员姓名：</label>{{dataDetail.realName}}</p>
        <p>
          <label>订单号：</label>{{dataDetail.code}}</p>
        <p>
          <label>银行名称：</label>{{dataDetail.bankName}}</p>
        <p>
          <label>户主姓名：</label>{{dataDetail.bankAccountName}}</p>
        <p>
          <label>银行账号：</label>{{dataDetail.bankId}}</p>
        <p>
          <label>存入金额：</label>{{dataDetail.amount}}</p>
        <p>
          <label>实际到账金额：</label>{{dataDetail.amount*(1+paymentBonus/100)}}</p>
        <p>
          <label>汇款优惠：</label>
          <Select v-model="paymentBonus" style="width:120px;">
            <Option v-for="i in paymentBonusList" :key="i" :value="i" :label="i+'%'"></Option>
          </Select>
        </p>
        <p>
          <label>汇款时间：</label>{{$moment.unix(dataDetail.memberDepositTime).format("LLL")}}</p>
        <p>
          <label>订单时间</label>{{$moment.unix(dataDetail.depositTime).format("LLL")}}</p>
        <p>
          <label>操作类型：</label>通过</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long :loading="modal_loading" @click="ShenHeTongGuo">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const TableMore = {
  template: `
  <div class='more_data' style="text-align:left">
    <Row>
        <Col span="6"><b>开户名称</b>:{{row.bankAccountName}}</Col>
        <Col span="6"><b>存入银行卡号</b>:{{row.bankId}}</Col>
        <Col span="6"><b>银行流水号</b>:{{row.bankSerialNumber?row.bankSerialNumber:'无'}}</Col>
        <Col span="6"><b>审核人</b>:{{row.updateUserName?row.updateUserName:'无'}}</Col>
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
import mixins from "@/mixins";
export default {
  name: "CompanyDepositList",
  mixins: [mixins],
  data() {
    return {
      reviewSpin: false,
      shenHeModal: false, //审核弹框
      bonus: null, //站点下的paymentBonus
      paymentBonus: null, //
      paymentBonusList: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      modal_loading: false,
      rejectModal: false, //拒绝弹框
      // rejectReason: "审核失败", //拒绝原因
      params: {},
      dataDetail: {}, //表格数据详情
      index: null, //表格数据索引
      search: {
        username: "",
        siteId: "",
        depositId: "all-all",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        levelId: null
      },
      total: {},
      bankList: [], //公司账户
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 100
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
            title: "代理/直属会员",
            key: "agencyName",
            minWidth: 105
          },
          {
            title: "账号",
            minWidth: 100,
            key: "username"
          },
          {
            title: "汇款方式/姓名",
            minWidth: 130,
            render: (h, params) => {
              let text = (params.row.subType||params.row.type) +"/"+ params.row.realName
              return h('span',text);
            }
          },
          {
            title: "用户订单号",
            minWidth: 130,
            key: "bankSerialNumber",
            render: (h, params) => {
              return h('span',params.row.bankSerialNumber?params.row.bankSerialNumber:'无')
            }
          },
          {
            title: "存入金额",
            key: "amount",
            minWidth: 100,
            render: (h, params) => {
              return h("b", {}, params.row.amount);
            }
          },
          {
            title: "存入银行/姓名",
            minWidth: 130,
            render: (h, params) => {
              let text = params.row.bankName + "/" + params.row.bankAccountName;
              return h('span',text);
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 90,
            render: (h, params) => {
              let props = {
                type:
                  params.row.status === "success"
                    ? "success"
                    : params.row.status === "wait"
                      ? "warning"
                      : params.row.status === "payment"
                        ? "primary"
                        : "error",
                size: "small"
              };
              return h(
                "Button",
                {
                  props: props
                },
                params.row.status === "success"
                  ? "成功"
                  : params.row.status === "wait"
                    ? "待审核"
                    : params.row.status === "payment"
                      ? "待支付"
                      : "失败"
              );
            }
          },
          {
            title: "操作",
            key: "",
            minWidth: 100,
            render: (h, params) => {
              let props = {
                size: "small"
              };
              return h("div", [
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.shenHeModal = true;
                        this.reviewSpin = true;
                        this.dataDetail = {};
                        this.paymentBonus = this.bonus;
                        this.$root
                          .HTTP_ALLLINKPOST(
                            this.$root.HTTP_L.HTTP_CunKuanXiangQing,
                            {
                              depositId: params.row.id,
                              date: params.row.time,
                              siteId: params.row.siteId
                            }
                          )
                          .then(res => {
                            this.dataDetail = res.data.data;
                            this.reviewSpin = false;
                            this.index = params.index;
                          });
                      }
                    }
                  },
                  "审核"
                ),
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.params = params;
                        this.reject();
                      }
                    }
                  },
                  "拒绝"
                ),
                h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.status !== "wait" ? "inline-block" : "none"
                    }
                  },
                  "-"
                )
              ]);
            }
          },
          {
            title: "提交时间",
            key: "time",
            minWidth: 150,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.time - 0).format("LLL"));
            }
          },
          {
            title: "审核时间",
            key: "updateTime",
            minWidth: 150,
            render: (h, params) => {
              let text = params.row.updateTime != "0"
                ? this.$moment.unix(params.row.updateTime - 0).format("LLL")
                : "无";
              return h('span',text);
            }
          },
          {
            title: "操作者",
            key: "updateUserName",
            minWidth: 80
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_GongSiRuKuanLieBiao,
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
    getSystemBank(siteId) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiTongRuKuanKaLieBiao, {
          siteId: siteId
        })
        .then(res => {
          let dataList = res.data.data;
          this.bankList.push({
            depositId: "all-all",
            bankName: "全部",
            cardName: "全部"
          });
          dataList.forEach(i => {
            this.bankList.push({
              depositId: i.depositId + "-" + i.bankId,
              bankName: i.bankName,
              cardName: i.cardName
            });
          });
        });
    },
    siteChange(re) {
      if (re.SiteId) {
        this.bonus = re.paymentBonus * 100;
        this.search.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
        this.getSystemBank(re.SiteId);
      }
    },
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      this.search.depositId =
        this.search.depositId === "all-all" ? "" : this.search.depositId;
      for (let key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.status = this.search.status ? this.search.status : "all";
      this.search.depositId = this.search.depositId
        ? this.search.depositId
        : "all-all";
      this.getTotal();
    },
    SearchRest() {
      this.autoFresh = "0";
      this.search = {
        username: "",
        siteId: this.defaultSiteId,
        depositId: "all-all",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        levelId: null
      };
      this.$refs.LevelSelect.setDefaultLevel("");
      this.$refs.SiteNameSelect.InitData();
      this.updateTime();
      this.Search();
    },
    ShenHeTongGuo() {
      this.modal_loading = true;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_CunKuanShenHe, {
          siteId: this.dataDetail.siteId,
          depositId: this.dataDetail.id,
          date: this.dataDetail.depositTime,
          status: "success",
          remark: `审核通过`,
          paymentBonus: this.paymentBonus / 100
        })
        .then(res => {
          this.modal_loading = false;
          this.$root.modal("success", "", "入款成功！");
          this.$set(this.table.TableData.data[this.index], "status", "success");
          this.shenHeModal = false;
        });
    },
    reject() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_CunKuanShenHe, {
          siteId: this.params.row.siteId,
          depositId: this.params.row.id,
          date: this.params.row.time,
          status: "fail",
          remark: "审核失败"
        })
        .then(res => {
          this.$root.modal("success", "", "拒绝操作入款成功");
          this.$set(
            this.table.TableData.data[this.params.index],
            "status",
            "fail"
          );
        });
    },
    getTotal() {
      this.search.siteId = this.search.siteId ? this.search.siteId : this.defaultSiteId
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      this.search.depositId =
        this.search.depositId === "all-all" ? "" : this.search.depositId;
      for (let key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      //总计
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Total_Offline, this.search)
        .then(res => {
          this.total = res.data.data;
        });
      this.search.status = this.search.status ? this.search.status : "all";
      this.search.depositId = this.search.depositId
        ? this.search.depositId
        : "all-all";
    }
  }
};
</script>
<style lang="less" scoped>
.shenHeModal {
  .ivu-modal {
    .ivu-modal-body {
      min-height: 450px;
      overflow-y: scroll;

      p {
        line-height: 2.5 !important;
      }

      font-size: 14px !important;

      label {
        display: inline-block;
        width: 110px;
      }

      .text {
        display: inline-block;
        width: 200px;
      }
    }
  }
}
</style>