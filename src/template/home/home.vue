
<template>
  <div class="content-main home-main">
    <div class="layout">
      <div>
        <div class="page-header">
          <i-form label-position="left">
          <FormItem label="站点选择：" style="margin-bottom:0px;">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
        </i-form>
        </div>
        <div class="page-con1">
          <h3 v-show="isShowDay">
            <Icon type="ios-paper-outline"></Icon>
            今日营运状况
          </h3>
          <div class="neirong" v-show="isShowDay">
            <div class="tab_con tb">
              <dangriyunying :CharData='meterDay'/>
            </div>
          </div>
          <h3 v-show="isShowImage">
            <Icon type="ios-paper-outline"></Icon>
            最近七日营运状况
          </h3>
          <div class="neirong" v-show="isShowImage">
            <div class="tabs">
              <a :class="{'active':showzx==1}" @click="showzx = 1" href="javascript:void(0)">图表呈现</a>
              <a :class="{'active':showzx==2}" @click="showzx = 2" href="javascript:void(0)">报表呈现</a>
            </div>
            <div v-show="showzx==1" class="tab_con tb">
              <!-- <div style="text-align: right;" class="showshuzi">
                <Checkbox v-model="aa">显示数字</Checkbox>
              </div> -->
              <div class="tu_biao">
                <qirizoushi :showshuzi='aa' :qirizoushi='qirizoushi'/>
              </div>
            </div>
            <div v-show="showzx==2" class="tab_con bb">
              <table>
                <thead style=" background: #f8f8f9;">
                  <tr>
                    <th rowspan="2">时间</th>
                    <th rowspan="2">会员注册人数</th>
                    <th rowspan="2">代理注册人数</th>
                    <th colspan="3">存款</th>
                    <th colspan="3">取款</th>
                  </tr>
                  <tr>
                    <th>总人数（人）</th>
                    <th>存款金额（元）</th>
                    <th>存款笔数</th>
                    <th>总人数（人）</th>
                    <th>取款金额（元）</th>
                    <th>取款笔数</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(item,i) in qiribaobiao" :key='i'>
                    <td>{{item.days}}</td>
                    <td>{{item.member}}</td>
                    <td>{{item.agency}}</td>
                    <td>{{item['report_deposit:person']}}</td>
                    <td>{{item['report_deposit:amount']}}</td>
                    <td>{{item['report_deposit:quantity']}}</td>
                    <td>{{item['report_withdrawals:person']}}</td>
                    <td>{{item['report_withdrawals:amount']}}</td>
                    <td>{{item['report_withdrawals:quantity']}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h3 v-show="isShowTotal">
            <Icon type="ios-book-outline"></Icon>
            报表汇总
          </h3>
          <div class="neirong" v-show="isShowTotal">
            <div class="tab_con" style="overflow-x: scroll;">
              <!-- <jiaodianzixun></jiaodianzixun> -->
              <table >
                <thead style=" background: #f8f8f9;">
                  <tr>
                    <th rowspan="2" style="width: 80px;">时间</th>
                    <th rowspan="2" style="width: 100px;">会员 (人)</th>
                    <th colspan="3" style="width: 300px;">存款</th>
                    <th colspan="3" style="width: 300px;">取款</th>
                    <th colspan="12" style="width: 1550px;">会员财务统计</th>
                    <th colspan="4" style="width: 350px;">真人视讯</th>
                    <th colspan="4" style="width: 350px;">棋牌游戏</th>
                    <th colspan="4" style="width: 350px;">电子游戏</th>
                    <th colspan="4" style="width: 350px;">体育游戏</th>
                    <th colspan="4" style="width: 350px;">彩票游戏</th>
                  </tr>
                  <tr>
                    <th>总人数（人）</th>
                    <th>存款金额（元）</th>
                    <th>存款笔数</th>
                    <th>总人数（人）</th>
                    <th>取款金额（元）</th>
                    <th>取款笔数</th>

                    <th>公司存款金额（元）</th>
                    <th>公司存款笔数</th>
                    <th>在线存款金额（元）</th>
                    <th>在线存款笔数</th>
                    <th>提款金额（元）</th>
                    <th>提款笔数</th>
                    <th>红利金额（元）</th>
                    <th>红利笔数</th>
                    <th>投注金额（元）</th>
                    <th>投注笔数</th>
                    <th>派彩金额（元）</th>
                    <th>收益金额（元）</th>

                    <th>注单笔数</th>
                    <th>投注金额</th>
                    <th>有效投注额</th>
                    <th>派彩金额</th>
                    <th>注单笔数</th>
                    <th>投注金额</th>
                    <th>有效投注额</th>
                    <th>派彩金额</th>
                    <th>注单笔数</th>
                    <th>投注金额</th>
                    <th>有效投注额</th>
                    <th>派彩金额</th>
                    <th>注单笔数</th>
                    <th>投注金额</th>
                    <th>有效投注额</th>
                    <th>派彩金额</th>
                    <th>注单笔数</th>
                    <th>投注金额</th>
                    <th>有效投注额</th>
                    <th>派彩金额</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in JiaoDianZiXunDataE" :key='index'>
                    <td>{{item.name}}</td>

                    <!-- <td>
                      <a v-if="item.agency.count>0" href="javascript:" @click="$router.push({name:'AgentSearch'})">{{item.agency.count}}</a>
                      <span v-else>{{item.agency.count}}</span>
                    </td> -->
                    <td>
                      <!-- <a v-if="item.member.count>0" href="javascript:" @click="$router.push({name:'Member'})"> {{item.member.count}}</a> -->
                      <span>{{item.member.count}}</span>
                    </td>

                    <td> {{item.report_deposit.person}}</td>
                    <td>
                      <!-- <a v-if="item.report_deposit.amount>0" href="javascript:" @click="$router.push({name:'DepositList'})"> {{item.report_deposit.amount}}</a> -->
                      <span> {{item.report_deposit.amount}}</span>
                    </td>
                    <td>{{item.report_deposit.quantity}}</td>

                    <td> {{item.report_withdrawals.person}}</td>
                    <td>
                      <!-- <a v-if="item.report_withdrawals.amount>0" href="javascript:" @click="$router.push({name:'WithdrawalsList'})"> {{item.report_withdrawals.amount}}</a> -->
                      <span> {{item.report_withdrawals.amount}}</span>
                    </td>
                    <td>{{item.report_withdrawals.quantity}}</td>

                    <td>{{item.member_finance_statistics.offlineDepositAmount}}</td>
                    <td>{{item.member_finance_statistics.offlineDepositNumber}}</td>
                    <td>{{item.member_finance_statistics.onlineDepositAmount}}</td>
                    <td>{{item.member_finance_statistics.onlineDepositNumber}}</td>
                    <td>{{item.member_finance_statistics.withdrawalsAmount}}</td>
                    <td>{{item.member_finance_statistics.withdrawalsNumber}}</td>
                    <td>{{item.member_finance_statistics.bonusAmount}}</td>
                    <td>{{item.member_finance_statistics.bonusNumber}}</td>
                    <td>{{item.member_finance_statistics.betAmount}}</td>
                    <td>{{item.member_finance_statistics.betNumber}}</td>
                    <td>{{item.member_finance_statistics.netAmount}}</td>
                    <td>{{item.member_finance_statistics.profit}}</td>

                    <td>{{item.report_livecasino.betCount}}</td>
                    <td>{{item.report_livecasino.betAmount}}</td>
                    <td>{{item.report_livecasino.validBetAmount}}</td>
                    <td>{{item.report_livecasino.netAmount}}</td>
                    

                    <td>{{item.report_chess.betCount}}</td>
                    <td>{{item.report_chess.betAmount}}</td>
                    <td>{{item.report_chess.validBetAmount}}</td>
                    <td>{{item.report_chess.netAmount}}</td>

                    <td>{{item.report_slots.betCount}}</td>
                    <td>{{item.report_slots.betAmount}}</td>
                    <td>{{item.report_slots.validBetAmount}}</td>
                    <td>{{item.report_slots.netAmount}}</td>

                    <td>{{item.report_sport.betCount}}</td>
                    <td>{{item.report_sport.betAmount}}</td>
                    <td>{{item.report_sport.validBetAmount}}</td>
                    <td>{{item.report_sport.netAmount}}</td>

                    <td>{{item.report_lottery.betCount}}</td>
                    <td>{{item.report_lottery.betAmount}}</td>
                    <td>{{item.report_lottery.validBetAmount}}</td>
                    <td>{{item.report_lottery.netAmount}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import dangriyunying from "./components/dangriyunying.vue";
import qirizoushi from "./components/qirizoushi.vue";
// import baobiaochengxian from "./components/baobiaochengxian.vue";
export default {
  name: "home",
  components: {
    // sunyi,
    dangriyunying,
    qirizoushi,
    SiteNameSelect
    // baobiaochengxian
  },
  data() {
    return {
      //   JiaoDianZiXunData1: [
      //     { type: "today", name: "今日" },
      //     { type: "yesterday", name: "昨日" },
      //     { type: "week", name: "本周" },
      //     { type: "lastweek", name: "上周" },
      //     { type: "month", name: "本月" },
      //     { type: "lastmonth", name: "上月" }
      //   ],
      JiaoDianZiXunData: {},
      // meterDay: {},
      JiaoDianZiXunDataE:[],
      qiribaobiao:[],
      isShowDay:true,
      isShowImage:true,
      isShowTotal:true,
      SiteNameSelectData: {
        type: "单选",
        default: true,
        placeholder: "站点",
        style: {
          width: "140px"
        }
      },
      CurrentSiteId:'',
      BaoBiaoZongLan: [
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" },
        { days: "", agent: "", member: "" }
      ],

      showzx: 1,
      aa: false,
      XinZengDaiLi: {
        name: "人数",
        color: "#2d8cf0",
        RiQi: [],
        dataShuJu: [],
        title: {
          text: "新增代理",
          subtext: "",
          sublink: "",
        }
      },
      XinZengHuiYuan: {
        name: "人数",
        color: "#dc3912",
        RiQi: [],
        dataShuJu: [],
        title: {
          text: "新增会员",
          subtext: "",
          sublink: ""
        }
      },
      meterDay:{},
      qirizoushi:{}
    };
  },
  methods: {
    siteChange(re) {
      //站点选择事件监听
      if(re.SiteId){
        this.CurrentSiteId = re.SiteId;
        this.getShowDay();
        this.getFocus();
        this.getMeterDay();
      }
      
    },
    getShowDay(){//最近7日运营状况
      var that = this;
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZuiJinQiRiZouShi,{isRules:'show',siteId:this.CurrentSiteId}).then(res => {
        that.isShowDay = true;
        that.qirizoushi = res.data.data;
        that.qirizoushi.days.forEach((item,i) => {
          let obj={}
          for(var key in that.qirizoushi){
            obj[key]=that.qirizoushi[key][i]
          }
          that.qiribaobiao.push(obj)
        })
      }).catch((res) => {
          if(res.status === 403){
            this.isShowImage = false;
          }
      });
    },
    getFocus(){//报表汇总
        var that = this;
        this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_JiaoDianZiXunXinXi,{isRules:'show',siteId:this.CurrentSiteId}).then(res => {
          that.JiaoDianZiXunData = res.data.data;
          for (let key in that.JiaoDianZiXunData) {
            switch (key) {
              case "today":
                that.JiaoDianZiXunData[key].name = "今日";
                break;
              case "yesterday":
                that.JiaoDianZiXunData[key].name = "昨日";
                break;
              case "week":
                that.JiaoDianZiXunData[key].name = "本周";
                break;
              case "lastweek":
                that.JiaoDianZiXunData[key].name = "上周";
                break;
              case "month":
                that.JiaoDianZiXunData[key].name = "本月";
                break;
              case "lastmonth":
                that.JiaoDianZiXunData[key].name = "上月";
                break;
            }
          }
          that.JiaoDianZiXunDataE = Object.values(that.JiaoDianZiXunData);
        }).catch((res) => {
          if(res.status === 403){
            that.isShowTotal = false;
          }
        });
    },
    getMeterDay(){//获取今日运营状况
      var that = this;
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_JianRiShiShiShuJu,{isRules:'show',siteId:this.CurrentSiteId})
      .then(res => {
        that.meterDay = res.data.data;
      }).catch((res) => {
        if(res.status === 403){
          that.isShowDay = false;
        }
      });
    },

  }
};
</script>
<style scoped lang='less'>
.time {
  text-align: right;
}
.content-main {
  padding: 0;
}
.home-main {
  .page-header {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .binding {
    }
  }
  .page-con1 {
    margin-top: 10px;
    padding-bottom: 20px;
  }
  .tabs {
    a {
      padding: 10px;
      display: inline-block;
      background: #fff;
      margin-bottom: -1px;
      border: 1px solid #fff;
      border-bottom: 1px solid #eee;
    }
    a.active {
      border: 1px solid #eee;
      border-bottom: 1px solid #fff;
      color: #3a5593;
    }
    margin-top: 15px;
    border-bottom: 1px solid #eee;
  }
  .tab_con {
    .tu_biao {
      // width: 50%;
      // float: left;
    }
    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      td,
      th {
        border: 1px solid #ddd;
        text-align: center;
        line-height: 30px;
      }
    }
    // overflow: hidden;
    border-left: 5px solid #eee;
    padding: 10px;
    margin: 15px 0;
  }
}
</style>
