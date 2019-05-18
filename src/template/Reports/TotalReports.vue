<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                </h1>
            </div>
            <div class="page-con1">
                <div class="c_left">
                    <i-col class="c_search_top" span="24">
                        <Card dis-hover>
                            <i-form :model="search" inline>
                                <FormItem label="站点">
                                    <!--prop="siteId"-->
                                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                                </FormItem>
                                <FormItem class="date-search">
                                    <Button :class="{'active':index==0}" @click="index=0">今天</Button>
                                    <Button :class="{'active':index==1}" @click="index=1">昨天</Button>
                                    <Button :class="{'active':index==2}" @click="index=2">本月</Button>
                                    <Button :class="{'active':index==3}" @click="index=3">上月</Button>
                                </FormItem>
                                <FormItem label="时区">
                                    <Select v-model="search.timeType" style="width:100px">
                                        <Option value="cn">北京时间</Option>
                                        <Option value="en">美东时间</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="日期时间">
                                    <DatePicker type="datetimerange" v-model="Time" placeholder="请选择日期" style="width: 335px" @on-change="timeConfirm"></DatePicker>
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
                    <i-col class="c_search_result" span="24" v-if="Object.keys(reportData).length">
                        <Card dis-hover>
                            <ul class="box">
                                <li>
                                    <div class="circle"></div>
                                    <div>
                                        <p>盈利</p>
                                        <p style="color:#F01212;">{{reportData.profit}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="circle"></div>
                                    <div>
                                        <p>盈率</p>
                                        <p style="color:#F01212;">{{reportData.profitRate}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="circle"></div>
                                    <div>
                                        <p>有效投注</p>
                                        <p>
                                            <span style="color:#0670D2;">{{reportData.validBetAmount}}</span>
                                            <span style="color:#F01212;">/{{reportData.betUserCount}}人</span>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="circle"></div>
                                    <div>
                                        <p>会员输赢</p>
                                        <p>
                                            <!-- <span style="color:#0670D2;"></span> -->
                                            <span style="color:#F01212;">{{reportData.netAmount}}</span>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                        <div class="dataBox">
                            <Row :gutter="16">
                                <i-col span="8">
                                    <Card dis-hover>
                                        <ul>
                                            <li>
                                                <p>充值金额<span>{{reportData.depositAmount}}/{{reportData.depositUserCount}}人</span></p>
                                                <ul>
                                                    <!-- <li>网银支付</li>
                                                    <li>银行转账</li>
                                                    <li>支付宝</li>
                                                    <li>微信支付</li>
                                                    <li>QQ钱包</li>
                                                    <li>银联支付</li>
                                                    <li>第四方</li>
                                                    <li>人工存款</li> -->
                                                    <li v-for="item in reportData.depositTypeCount" :key="item.depositClassName">
                                                        <div class="small-circle"></div>
                                                        {{item.depositClassName}}
                                                        <span class="blue">{{item.depositAmount}}/{{item.depositUserCount}}人/{{item.depositCount}}笔</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>提现金额<span class="red">{{reportData.withdrawalsAmount}}/{{reportData.withdrawalsUserCount}}人</span></li>
                                            <li>代理收入<span class="red">{{reportData.agencyIncomeAmount}}/{{reportData.agencyIncomeUserCount}}人</span></li>
                                            <!-- <li>返点金额<span class="red">{{reportData.rebateAmount}}/{{reportData.rebateUserCount}}人</span></li> -->
                                            <li>
                                                <p>活动礼金<span class="red">{{reportData.bonusAmount}}/{{reportData.bonusUserCount}}人</span></p>
                                                <ul>
                                                    <li>
                                                        <div class="small-circle"></div>系统派送<span class="blue">{{reportData.bonusSystemAmount}}/{{reportData.bonusSystemUserCount}}人</span>
                                                    </li>
                                                    <li>
                                                        <div class="small-circle"></div>人工派送<span class="blue">{{reportData.bonusAdminAmount}}/{{reportData.bonusAdminUserCount}}人</span>
                                                    </li>
                                                    <li>
                                                        <div class="small-circle"></div>返水派送<span class="blue">{{reportData.bonusRebateAmount}}/{{reportData.bonusRebateCount}}人</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </Card>
                                </i-col>
                                <i-col span="8">
                                    <Card dis-hover>
                                        <ul>
                                            <li>在线人数<span class="red">{{reportData.onlineUserCount}}人</span></li>
                                            <li>
                                                <p>充值笔数<span class="red">{{reportData.depositCount}}/{{reportData.depositUserCount}}人</span></p>
                                                <ul>
                                                    <li>
                                                        <div class="small-circle"></div>第三方支付笔数<span class="red">{{reportData.depositOnlineCount}}/{{reportData.depositOnlineUserCount}}人</span>
                                                    </li>
                                                    <li>
                                                        <div class="small-circle"></div>银行转账笔数<span class="red">{{reportData.depositOfflineCount}}/{{reportData.depositOfflineUserCount}}人</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>提现笔数<span class="red">{{reportData.withdrawalsCount}}/{{reportData.withdrawalsUserCount}}人</span></li>
                                            <li>充值操作<span class="red">{{reportData.depositAverageTime}}秒</span></li>
                                            <li>提现操作<span class="red">{{reportData.withdrawalsAverageTime}}秒</span></li>
                                            <li>
                                                人工提出<span class="red">{{reportData.withdrawalsAdminAmount}}/{{reportData.withdrawalsAdminUserCount}}人/{{reportData.withdrawalsAdminCount}}笔</span>
                                                <!-- <p>人工提出</p>
                                                <ul>
                                                    <li>误存提出</li>
                                                    <li>行政提出</li>
                                                </ul> -->
                                            </li>
                                            <li>拒绝金额</li>
                                            <li>注册人数<span class="red">{{reportData.registerUserCount}}人</span></li>
                                            <li>首充人数<span class="red">{{reportData.firstDepositUserCount}}人</span></li>
                                        </ul>
                                    </Card>
                                </i-col>
                                <i-col span="8">
                                    <Card dis-hover>
                                        <ul>
                                            <li>投注单量<span>{{reportData.betCount}}/{{reportData.betUserCount}}人</span></li>
                                            <li>撤单金额<span>{{reportData.cancelBetAmount}}/{{reportData.cancelBetUserCount}}人</span></li>
                                            <li>会员余额<span class="red">{{reportData.userBalanceAmount}}</span></li>
                                            <li>本月盈利<span class="red">{{reportData.totalMonth.profit}}</span></li>
                                            <li>本月盈率<span class="red">{{reportData.totalMonth.profitRate}}</span></li>
                                            <li>上月盈利<span class="red">{{reportData.totalLastMonth.profit}}</span></li>
                                            <li>上月盈率<span class="red">{{reportData.totalLastMonth.profitRate}}</span></li>
                                            <li>本月损益<span class="blue">{{reportData.totalMonth.incomeStatemen}}</span></li>
                                            <li>本月毛率<span class="red">{{reportData.totalMonth.grossInterestRate}}</span></li>
                                            <li>上月损益<span class="red">{{reportData.totalLastMonth.incomeStatemen}}</span></li>
                                            <li>上月毛率<span class="red">{{reportData.totalLastMonth.grossInterestRate}}</span></li>
                                            <li>打赏金额<span>{{reportData.rewardAmount}}/{{reportData.rewardUserCount}}人</span></li>
                                        </ul>
                                    </Card>
                                </i-col>
                            </Row>
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
  name: "TotalReports",
  mixins: [mixins],
  data() {
    return {
      index: null,
      search: {
        siteId: "",
        timeStart: "",
        timeEnd: "",
        timeType: "cn"
      },
      reportData: {},
      dateOption: [
        {
          text: "今天",
          value: () => {
            return [this.$moment().startOf("day"), this.$moment().endOf("day")];
          }
        },
        {
          text: "昨天",
          value: () => {
            return [
              this.$moment()
                .day(this.$moment().day() - 1)
                .startOf("day"),
              this.$moment()
                .day(this.$moment().day() - 1)
                .endOf("day")
            ];
          }
        },
        {
          text: "本月",
          value: () => {
            return [
              this.$moment().startOf("month"),
              this.$moment().endOf("month")
            ];
          }
        },
        {
          text: "上月",
          value: () => {
            return [
              this.$moment()
                .month(this.$moment().month() - 1)
                .startOf("month"),
              this.$moment()
                .month(this.$moment().month() - 1)
                .endOf("month")
            ];
          }
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.updateTime();
      this.search.siteId = this.defaultSiteId;
      this.Search();
    });
  },
  methods: {
    updateTime() {
      this.Time = [this.$moment().startOf("day"), this.$moment().endOf("day")];
    },
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    Search() {
      if (this.index != null) {
        this.Time = this.dateOption[this.index].value();
      }
      this.search.timeStart = this.$moment(this.Time[0]).format("LLL");
      this.search.timeEnd = this.$moment(this.Time[1]).format("LLL");
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }

      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Total_Reports, this.search)
        .then(res => {
          this.reportData = res.data.data;
        });
    },
    SearchRest() {
      this.search = {
        siteId: this.defaultSiteId,
        timeStart: "",
        timeEnd: "",
        timeType: "cn"
      };
      this.index = null;
      this.updateTime();
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    timeConfirm() {
      this.index = null;
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  list-style: none;

  li {
    flex: 1;
    width: 25%;

    .circle {
      float: left;
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    &:nth-of-type(1) .circle {
      background-color: #fe7d6a;
    }

    &:nth-of-type(2) .circle {
      background-color: #29b5f5;
    }

    &:nth-of-type(3) .circle {
      background-color: #81c784;
    }

    &:nth-of-type(4) .circle {
      background-color: #fdd34f;
    }
  }
}

.dataBox {
  margin-top: 10px;
  min-height: 520px;

  .ivu-card {
    padding: 10px;
    line-height: 35px;

    .ivu-card-body {
      & > ul {
        list-style: none;

        & > li {
          border-bottom: 1px solid #dddee1;

          span {
            margin-left: 15px;
          }

          &:last-child {
            border: 0;
          }

          ul {
            list-style: none;

            li {
              margin-left: 10px;

              .small-circle {
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #46acfe;
                border-radius: 50%;
                margin-right: 10px;
              }
            }
          }
        }
      }

      .red {
        color: #f34142;
      }

      .blue {
        color: #46acfe;
      }
    }
  }
}

.date-search {
  .ivu-btn {
    background-color: #fff;
  }

  .ivu-btn.active {
    color: #fff;
    background-color: #2db7f5;
    border: 0;
  }

  .active {
    background-color: #2db7f5;
    color: #fff;
    // border-color
  }
}
</style>