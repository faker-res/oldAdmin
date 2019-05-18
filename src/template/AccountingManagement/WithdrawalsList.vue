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
                  <!--prop="siteId"-->
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="等级">
                  <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" @listenLevelChange="levelChange"></LevelSelect>
                </FormItem>
                <FormItem label="所属代理">
                  <i-input style="width:120px" v-model="search.agencyName"></i-input>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:120px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width: 330px" :disabled="disabled"></DatePicker>
                </FormItem>
                <FormItem label="状态">
                  <Select style="width:115px" v-model="search.status" placeholder="全部">
                    <Option value="all" label="全部">
                      <span>全部</span>
                    </Option>
                    <Option label="提款完成" value="success">
                      <span>提款完成</span>
                    </Option>
                    <Option label="提款拒绝" value="fail">
                      <span>提款拒绝</span>
                    </Option>
                    <Option label="审核中" value="wait">
                      <span>审核中</span>
                    </Option>
                    <Option label="系统处理中" value="system_processing">
                      <span>系统处理中</span>
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
              <MyTable :table="table" @catchError="catchError"></MyTable>
            </div>
            <div v-if="Object.keys(this.total).length">
              <span>{{total.success.success_name}}：{{total.success.success_total}}</span>
              <span>{{total.fail.fail_name}}：{{total.fail.fail_total}}，</span>
              <span>{{total.wait.wait_name}}：{{total.wait.wait_total}}，</span>
              <span>{{total.system_processing.system_processing_name}}：{{total.system_processing.system_processing_total}}，</span>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="XZZF" :loading="$root.btnLoading" title="选择出款银行" width="300" @on-ok="XuanZeZhiFuYinHang('t')">
      <Select v-model="morenzhifu">
        <Option v-for="item in systemOutBank" :value="item.id.toString()" :key="item.id">{{ item.bankName }}</Option>
      </Select>
    </Modal>
    <Modal class-name="vertical-center-modal shenHeModal" v-model="shenHeModal" width="700">
      <p slot="header" style="text-align:center">
        <span>会员提现详情</span>
      </p>
      <div style="padding-left: 20px;">
        <div class="tabs">
          <span class="tabs-item" :class="{'tabs-active' : tabsSelect}" @click="tabsSelect = true">提现详情</span>
          <span class="tabs-item" :class="{'tabs-active' : !tabsSelect}" @click="tabsSelect = false">打码量</span>
        </div>
        <div class="detail-box" v-show="tabsSelect" style="position:relative;">
          <Spin size="small" fix v-if="withdrawSpin"></Spin>
          <p>
            <label>账号：</label>
            <span class="text">{{dataDetail.username}}</span>
          </p>
          <p>
            <label>订单号：</label>
            <span class="text">{{dataDetail.code}}</span>
          </p>
          <p>
            <label>银行名称：</label>
            <span class="text">{{dataDetail.bankName}}</span>
            <Button type="info" size="small" v-clipboard:copy="dataDetail.bankName" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
          </p>
          <p>
            <label>户主姓名：</label>
            <span class="text">{{dataDetail.bankAccountName}}</span>
            <Button type="info" size="small" v-clipboard:copy="dataDetail.bankAccountName" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
          </p>
          <p>
            <label>银行账号：</label>
            <span class="text">{{dataDetail.bankAccount}}</span>
            <Button type="info" size="small" v-clipboard:copy="dataDetail.bankAccount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
          </p>
          <p>
            <label>开户网点：</label>
            <span class="text">{{dataDetail.bankAddress}}</span>
            <Button type="info" size="small" v-clipboard:copy="dataDetail.bankAddress" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
          </p>
          <p>
            <label>提现金额：</label>
            <span class="text" style="color:red;">{{dataDetail.amount}}</span>
            <Button type="info" size="small" v-clipboard:copy="dataDetail.amount" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</Button>
          </p>
          <p>
            <label>账号余额：</label>
            <span class="text">{{dataDetail.balance}}</span>
          </p>
          <p>
            <label>操作类型：</label>
            <RadioGroup v-if="submitShow" v-model="shenHeLeiXing">
              <Radio label="success">
                <span>通过</span>
              </Radio>
              <Radio label="fail">
                <span>拒绝</span>
              </Radio>
            </RadioGroup>
            <span v-else>{{dataDetail.status === "success" ? "提款完成" : "提款拒绝"}}</span>
          </p>
          <p v-if='shenHeLeiXing === "fail"'>
            <label>拒绝原因：</label>
            <Select v-if="submitShow" clearable v-model="rejectReason" style="width:180px">
              <Option v-for="(item,i) in rejectReasonList" :value="item" :key="i" :label="item"></Option>
            </Select>
            <span v-else>{{dataDetail.remark}}</span>
          </p>
        </div>
        <div class="table-box" v-show="!tabsSelect" style="position:relative;">
          <div class="scroll-bar-y" style="height:340px;position:relative;">
            <Spin size="small" fix v-if="betSpin"></Spin>
            <table class="table">
              <thead>
                <tr>
                  <th>金额</th>
                  <th>类型</th>
                  <th>需要的打码倍数</th>
                  <th>打码量</th>
                  <th>需要的打码量</th>
                  <th>时间</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in betAmountList" :key="i">
                  <td>{{item.amount}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.multiple}}</td>
                  <td>{{item.betAmount}}</td>
                  <td>{{item.needBetAmount}}</td>
                  <td>{{$moment.unix(item.time).format("LLL")}}</td>
                </tr>
                <tr v-if="betAmountList.length">
                  <td>统计</td>
                  <td colspan="5">
                    <span>
                      <b>最后需要的打码量：</b>{{needTotal.toFixed(2)}}</span>
                    <span style="margin: 0 15px;">
                      <b>现有打码量：</b>{{currentTotal.toFixed(2)}}</span>
                    <span>
                      <b>是否满足提款要求：</b>
                      <span :style="{color:needTotal>currentTotal?'red':'green'}">{{needTotal>currentTotal?"否":"是"}}</span>
                    </span>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="6">暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div slot="footer" v-show="submitShow && tabsSelect" style="text-align:center">
        <Button type="success" size="large" :loading="modal_loading" @click="ShenHeTongGuo">提交</Button>
      </div>
    </Modal>
    <Modal class-name="vertical-center-modal betPlatform-modal" v-model="dianJiHuiYuan">
      <div>
        投注平台：
        <span v-if="betPlatform.length">
          <a href="javascript:void(0);" v-for="(item,index) in betPlatform" :key="index" @click="goGamesRecords(item.type,item.platform)">{{item.platform_name}}(投注次数：{{item.betCount}})，</a>
        </span>
        <span v-else>无</span>
      </div>
      <a href="javascript:void(0);" @click="goFinanceTrend">查看该会员存取资金总汇</a>
    </Modal>
  </div>
</template>
<script>
import BetPlatformModal from "./components/betPlatformModal";
import FinanceTrendModal from "./components/financeTrendModal";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
Vue.use(VueClipboard);
import mixins from "@/mixins";
export default {
  name: "WithdrawalsList",
  mixins: [mixins],
  components: {
    BetPlatformModal,
    FinanceTrendModal
  },
  data() {
    return {
      withdrawSpin: false,
      betSpin: false,
      total: {},
      needTotal: null,
      currentTotal: null,
      tabsSelect: true,
      submitTime: null, //会员提款的提交时间
      XZZF: false, //选择出款银行弹框
      shenHeModal: false, //提现审核弹框
      modal_loading: false, //提交按钮loading
      dataDetail: {}, //会员提现详情
      index: null, //表格数据索引
      shenHeLeiXing: "success", //审核类型,true通过,false拒绝
      submitShow: true, //提交按钮显示
      betAmountList: [], //打码量
      rejectReasonList: [
        "打码量不足",
        "注单审核中",
        "银行信息有误",
        "跨行维护中",
        "当日提款金额已超限",
        "额度异常",
        "请联系在线客服",
        "其他情况"
      ],
      rejectReason: "其他情况",
      dianJiHuiYuan: false, //点击会员出现弹框
      modalSearchData: {}, //点击会员传参
      morenzhifu: "",
      systemOutBank: [], //未禁用的出款卡
      PostSendData: {},
      bankList: [], //所有出款卡
      search: {
        username: "",
        siteId: "",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        levelId: "",
        agencyName: ""
      },
      betPlatform: [], //下注平台
      table: {
        TableColumn: [
          {
            title: "代理/直属会员",
            key: "agencyName",
            minWidth: 125
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
            title: "账号",
            key: "username",
            minWidth: 80,
            render: (h, params) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.dianJiHuiYuan = true;
                      this.submitTime = params.row.time;
                      this.modalSearchData = {
                        siteId: params.row.siteId,
                        username: params.row.username,
                        startTime: this.$moment(this.Time[0]).format("LLL"),
                        endTime: this.$moment(this.Time[1]).format("LLL")
                      };
                      //获取会员的下注平台
                      this.$root
                        .HTTP_ALLLINKPOST(
                          this.$root.HTTP_L.HTTP_XiaZhuPingTai,
                          this.modalSearchData
                        )
                        .then(res => {
                          this.betPlatform = res.data.data;
                        });
                    }
                  }
                },
                params.row.username
              );
            }
          },
          {
            title: "真实姓名",
            key: "bankAccountName",
            minWidth: 80,
            render: (h, params) => {
              return h("span", {}, params.row.bankAccountName);
            }
          },
          {
            title: "提出金额",
            key: "amount",
            minWidth: 100,
            render: (h, params) => {
              return h("b", {}, params.row.amount);
            }
          },
          {
            title: "手续费",
            key: "fees",
            minWidth: 80,
            render: (h, params) => {
              return h("b", {}, params.row.fees);
            }
          },
          {
            title: "优惠金额",
            key: "bonusAmount",
            minWidth: 100,
            render: (h, params) => {
              return h("b", {}, params.row.bonusAmount);
            }
          },
          {
            title: "次数",
            key: "number",
            minWidth: 80
          },
          {
            title: "实际出款",
            key: "actualAmount",
            minWidth: 100,
            render: (h, params) => {
              return h("b", {}, params.row.actualAmount);
            }
          },
          {
            title: "审核时间",
            width: 220,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid #e9eaec"
                    }
                  },
                  "提交时间：" +
                    this.$moment.unix(params.row.time).format("LLL")
                ),
                h(
                  "div",
                  `审核时间：${
                    params.row.update_time != 0
                      ? this.$moment.unix(params.row.update_time).format("LLL")
                      : "无"
                  }`
                )
              ]);
            }
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 80,
            render: (h, params) => {
              return h("div", [
                h(
                  "Tooltip",
                  {
                    style: {
                      color: "#2d8cf0"
                    },
                    props: {
                      content:
                        params.row.remark == "" ? "无" : params.row.remark,
                      placement: "left"
                    }
                  },
                  params.row.remark.length > 5
                    ? params.row.remark.slice(0, 5) + "..."
                    : params.row.remark == ""
                      ? "无"
                      : params.row.remark
                )
              ]);
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 100,
            render: (h, params) => {
              let that = this;
              let props = {
                color:
                  params.row.status == "success"
                    ? "green"
                    : params.row.status == "system_processing"
                      ? "blue"
                      : params.row.status == "wait"
                        ? "yellow"
                        : "red"
              };
              return h("div", [
                h(
                  "Tag",
                  {
                    props: props
                  },
                  params.row.status == "success"
                    ? "提款完成"
                    : params.row.status == "system_processing"
                      ? "系统处理中"
                      : params.row.status == "wait"
                        ? "等待审核"
                        : "提款拒绝"
                )
              ]);
            }
          },
          {
            title: "操作",
            minWidth: 80,
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      display:
                        params.row.status === "wait" ||
                        params.row.status === "system_processing"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click() {
                        that.shenHeModal = true;
                        that.submitShow = true;
                        //2019/2/16  molly  修改点击后默认选中通过
                        that.shenHeLeiXing = 'success';
                        that.getDetail(params);
                      }
                    }
                  },
                  "审核"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      display:
                        params.row.status === "success" ||
                        params.row.status === "fail"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click() {
                        that.shenHeModal = true;
                        that.submitShow = false;
                        that.shenHeLeiXing = params.row.status;
                        that.getDetail(params);
                      }
                    }
                  },
                  "详情"
                )
              ]);
            }
          },
          {
            title: "操作者",
            key: "update_user",
            minWidth: 80,
            render: (h, params) => {
              return h('span', params.row.update_user ? params.row.update_user : "无");
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_QuKuanLieBiao,
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
  watch: {
    shenHeModal: function(val) {
      if (!val) {
        this.tabsSelect = true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // if (this.search.siteId) {
        // this.getSystemBank();
        this.updateTime();
        this.getTotal();
      // }
    });
  },
  destroyed() {
    this.dianJiHuiYuan = false;
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
    // getSystemBank() {
    //   //获取系统出款卡列表
    //   this.$root
    //     .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiTongChuKuanKaLieBiao)
    //     .then(res => {
    //       this.bankList = res.data.data;
    //       this.bankList.unshift({
    //         id: "all",
    //         bankName: "全部"
    //       });
    //       let list = [];
    //       this.bankList.forEach(item => {
    //         if (item.status === "enabled") {
    //           list.push(item);
    //         }
    //       });
    //       this.systemOutBank = [...list];
    //     });
    // },
    onCopy: function(e) {
      this.$Message.success("复制成功");
    },
    onError: function(e) {
      this.$Message.error("复制失败");
    },
    goGamesRecords(type, platform) {
      this.dianJiHuiYuan = false;
      let dataObj = {};
      dataObj.userName = this.modalSearchData.username;
      dataObj.timeStart = this.$moment
        .unix(this.submitTime)
        .subtract(1, "day")
        .format("LLL");
      dataObj.timeEnd = this.$moment.unix(this.submitTime).format("LLL");
      dataObj.type = type;
      dataObj.platform = platform;
      dataObj.siteId = this.search.siteId;
      this.$router.push({
        name: "GamesRecords",
        query: dataObj
      });
    },
    goFinanceTrend() {
      this.dianJiHuiYuan = false;
      this.$router.push({
        name: "FinanceSummary",
        query: this.modalSearchData
      });
    },
    getDetail(params) {
      //获取取款详情和打码量
      this.dataDetail = {};
      this.betAmountList = [];
      this.withdrawSpin = true;
      this.betSpin = true;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_TiKuanXiangQing, {
          withdrawalsId: params.row.id,
          siteId: params.row.siteId,
          date: params.row.time
        })
        .then(res => {
          this.dataDetail = res.data.data;
          this.withdrawSpin = false;
          this.index = params.index;
        });
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_BetAmountCheck, {
          uid: params.row.uid,
          siteId: params.row.siteId
        })
        .then(res => {
          this.betAmountList = res.data.data;
          this.betSpin = false;
          this.needTotal = 0;
          this.currentTotal = 0;
          this.betAmountList.forEach((item, index) => {
            if (index === this.betAmountList.length - 1) {
              this.needTotal = item.needBetAmount * 1;
              this.currentTotal = item.betAmount * 1;
            }
          });
        });
    },
    ShenHeTongGuo() {
      this.modal_loading = true;
      let dataSend = {
        withdrawalsId: this.dataDetail.id,
        siteId: this.dataDetail.siteId,
        date: this.dataDetail.time,
        status: "",
        remark: "-",
        updateUserName: this.$root.adminuserinfo.adminUserName
      };
      if (this.shenHeLeiXing === "success") {
        dataSend.status = "success";
      } else {
        dataSend.status = "fail";
        dataSend.remark = this.rejectReason;
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_TiKuanShenHe, dataSend)
        .then(res => {
          this.modal_loading = false;
          if (this.shenHeLeiXing === "success") {
            this.$root.modal("success", "", "出款成功");
            this.$set(
              this.table.TableData.data[this.index],
              "status",
              "success"
            );
          } else {
            this.$root.modal("success", "", "拒绝操作出款成功");
            this.$set(this.table.TableData.data[this.index], "status", "fail");
          }
          this.shenHeModal = false;
        })
        .catch(res => {
          this.shenHeModal = false;
          this.modal_loading = false;
        });
    },
    XuanZeZhiFuYinHang(t) {
      var that = this;
      var bankName = "";
      that.systemOutBank.forEach(function(element) {
        if (element.id === that.morenzhifu) {
          bankName = element.bankName;
        }
      });
      let datad = {
        withdrawalsId: this.PostSendData.id,
        siteId: this.PostSendData.siteId,
        date: this.PostSendData.time,
        status: "success",
        remark:
          t == "t"
            ? `管理员${this.$root.adminuserinfo.adminUserName}通过`
            : `管理员${this.$root.adminuserinfo.adminUserName}拒绝`,
        updateUserName: this.$root.adminuserinfo.adminUserName,
        outBankId: this.morenzhifu - 0,
        outBankName: bankName
      };
      that.$root
        .HTTP_ALLLINKPOST(that.$root.HTTP_L.HTTP_TiKuanShenHe, datad)
        .then(res => {
          that.$Modal.success({
            title: "审核成功",
            content: `<h2>${res.data.data}</h2>`
          });
          that.$set(
            that.table.TableData.data[that.PostSendData._index],
            "status",
            "success"
          );
          that.$set(
            that.table.TableData.data[that.PostSendData._index],
            "remark",
            datad.remark
          );
        })
        .catch(res => {});
    },
    siteChange(re) {
      if (re) {
        this.search.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.status = this.search.status ? this.search.status : "all";
      this.getTotal();
    },
    SearchRest() {
      this.autoFresh = "0";
      this.search = {
        username: "",
        siteId: this.defaultSiteId,
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: "",
        levelId: "",
        agencyName: ""
      };
      this.updateTime();
      this.$refs.LevelSelect.setDefaultLevel("");
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    getTotal() {
      this.search.siteId = this.search.siteId ? this.search.siteId : this.defaultSiteId
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Total_Withdrawals, this.search)
        .then(res => {
          this.total = res.data.data;
        });
      this.search.status = this.search.status ? this.search.status : "all";
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  th,
  td {
    text-align: center; // line-height: 30px;
  }
  // .w80{
  //   width: 80px;
  // }
  // .w82{
  //   width: 82px;
  // }
  // .w84{
  //   width: 84px;
  // }
  // .w110{
  //   width: 110px;
  // }
  // .w124{
  //   width: 124px;
  // }
  // .w163{
  //   width: 163px;
  // }
}

.tabs {
  border-bottom: 1px solid #dddee1;
  margin-bottom: 16px;
  font-size: 15px;
  .tabs-item {
    cursor: pointer;
    display: inline-block;
    padding: 5px 15px;
  }
  .tabs-active {
    border-bottom: 2px solid #2d8cf0;
    color: #2d8cf0;
  }
}
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
        width: 80px;
      }
      .text {
        display: inline-block;
        width: 300px;
      }
    }
  }
}
</style>