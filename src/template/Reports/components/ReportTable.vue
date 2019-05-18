<template>
  <i-col class="c_search_result" span="24">
    <Card dis-hover>
      <!-- <div slot="title">查询结果</div> -->
      <div slot="title">
        <!-- <a href="javascript:void(0);" @click="tiaozhuan(1)">
          <b>所有站点</b>
        </a> -->
        <!-- 头部的显示内容 -->
        <span>{{level}}</span>
        <span v-if="level != 1">
          <!-- <span class="ivu-breadcrumb-item-separator">/</span> -->
          <!-- title是否可以点击 -->

          <!--大标题点击-->
          <span v-if="!titleDisable[2]"> 
            <a href="javascript:void(0);" @click="tiaozhuan(2)">
              <b v-if="search.siteId">{{parentSiteName}}大股东</b>
              <b v-else>{{siteName}}大股东</b>
            </a>
          </span>
          <span v-else>
            <b v-if="search.siteId" style="color:#c3cbd6">{{parentSiteName}}大股东</b>
            <b v-else style="color:#c3cbd6">{{siteName}}大股东</b>
          </span>
        </span>
        
        <span v-if="level == 3 || level == 4 || level == 5">
          <span class="ivu-breadcrumb-item-separator">/</span>
          <a v-if="!titleDisable[3]" href="javascript:void(0);" @click="tiaozhuan(3)">
            <b>{{showAgencyName}}代理及直属会员</b>
          </a>
          <b v-else style="color:#c3cbd6">{{showAgencyName}}代理及直属会员</b>
        </span>
        <span v-if="level == 4 || level == 5">
          <span class="ivu-breadcrumb-item-separator">/</span>
          <a v-if="!titleDisable[4]" href="javascript:void(0);" @click="tiaozhuan(4)">
            <b>{{agencyName}}直属会员</b>
          </a>
          <b v-else style="color:#c3cbd6">{{agencyName}}直属会员</b>
        </span>
        <span v-if="level == 5">
          <span class="ivu-breadcrumb-item-separator">/</span>
          <a v-if="!titleDisable[5]" href="javascript:void(0);" @click="tiaozhuan(5)">
            <b>会员</b>
          </a>
          <b v-else style="color:#c3cbd6">会员</b>
        </span>
      </div>
      <!-- 没有数据 -->
      <div class="no_con" v-if="!tableData.length || tableData[0] == ''">
        <Alert show-icon>
          <template slot="desc">没有内容</template>
        </Alert>
      </div>
      <!-- 有数据 -->
      <div v-else>
        <!-- 一级报表 -->
        <div v-if="level == 1">
          <table class="table" style="width:100%">
            <thead>
              <tr>
                <th>
                  站点名称
                </th>
                <th>
                  <span>用户总人数</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betUser','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betUser','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>订单个数</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betCount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betCount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>投注金额</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betAmount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>有效投注金额</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('validBetAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('validBetAmount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>会员输赢</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('netAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('netAmount','desc')"></Icon>
                  </span>
                </th>
                <th>赢率</th>
                <th>会员收入</th>
                <th>代理收入</th>
              </tr>
            </thead>
            <tbody>
              <tr class="MemberLogin_log_list" v-for="(m,i) in tableData" :key="i">
                <td>
                  <a href="javascript:void(0);" @click="DiErDengJi(m.siteId,m.siteName,m.agencyName,m.platform,m.directly,m.userName)">{{m.siteName}}</a>
                </td>
                <td>
                  {{m.betUser}}
                </td>
                <td>
                  {{m.betCount}}
                </td>
                <td>
                  {{Number(m.betAmount).toFixed(2)}}
                </td>
                <td>
                  {{Number(m.validBetAmount).toFixed(2)}}
                </td>
                <td>
                  {{Number(m.netAmount).toFixed(2)}}
                </td>
                <td>
                  {{m.winRate}}
                </td>
                <td style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{m.userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{m.userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{m.agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{m.agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{m.agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{m.agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{m.agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <!-- 一级报表总计 -->
              <tr>
                <td>总计</td>
                <td>{{sum.betUser}}</td>
                <td>{{sum.betCount}}</td>
                <td>{{sum.betAmount.toFixed(2)}}</td>
                <td>{{sum.validBetAmount.toFixed(2)}}</td>
                <td>{{sum.netAmount.toFixed(2)}}</td>
                <td>-</td>
                <td style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{sum.userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{sum.userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{sum.agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{sum.agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{sum.agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{sum.agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{sum.agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 二三四五级报表 -->
        <div v-if="level != 1" v-for="(m,i) in tableData" :key="i">
          <p v-if="m.length" class="tableTitle">
            <span v-if="m[0].platform">{{m[0].platformName}}</span>
            <span v-else>总计</span>
          </p>
          <table class="table" :class="m[0].platform ? 'fixed-table' : ''" style="width:100%">
            <thead>
              <tr>
                <!-- <th v-if="siteName">站点名称</th> -->
                <th>用户名</th>
                <th v-if="level == 2 || level == 3">
                  <span>用户总人数</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betUser','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betUser','desc')"></Icon>
                  </span>
                </th>
                <th v-if="m.data_date">下注时间</th>
                <th>
                  <span>订单总数</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betCount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betCount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>投注金额</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('betAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('betAmount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>有效投注金额</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('validBetAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('validBetAmount','desc')"></Icon>
                  </span>
                </th>
                <th>
                  <span>会员输赢</span>
                  <span class="ivu-table-sort">
                    <Icon type="arrow-up-b" @click.native="sort('netAmount','asc')"></Icon>
                    <Icon type="arrow-down-b" @click.native="sort('netAmount','desc')"></Icon>
                  </span>
                </th>
                <th v-if="!m[0].platform">赢率</th>
                <!-- 总计才有会员收入和代理收入 -->
                <th v-if="!m[0].platform">会员收入</th>
                <th v-if="!m[0].platform">代理收入</th>
              </tr>
            </thead>
            <tbody v-if="m.length">
              <tr v-if="level == 3" v-show="show[i]" v-for="(item,index) in agentData[i]" :key="index">
                <td>
                  <a href="javascript:void(0);" @click="DiErDengJi(item.siteId,item.siteName,item.agencyName,item.platform,item.directly,item.userName)">{{item.agencyName}}</a>
                </td>
                <td>{{item.betUser}}</td>
                <td>{{item.betCount}}</td>
                <td>{{Number(item.betAmount).toFixed(2)}}</td>
                <td>{{Number(item.validBetAmount).toFixed(2)}}</td>
                <td>{{Number(item.netAmount).toFixed(2)}}</td>
                <td v-if="!m[0].platform">{{item.winRate}}</td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{item.userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{item.userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{item.agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{item.agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{item.agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{item.agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{item.agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <!-- 总代理 -->
              <tr v-if="level == 3 && agentSum[i].betUser != 0">
                <td v-show="!show[i]">
                  <a href="javascript:void(0);" @click="toggleAgentDataShow(i)">总代理</a>
                </td>
                <td v-show="show[i]">总计</td>
                <td>{{agentSum[i].betUser}}</td>
                <td>{{agentSum[i].betCount}}</td>
                <td>{{agentSum[i].betAmount.toFixed(2)}}</td>
                <td>{{agentSum[i].validBetAmount.toFixed(2)}}</td>
                <td>{{agentSum[i].netAmount.toFixed(2)}}</td>
                <td v-if="!m[0].platform">-</td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{agentSum[i].userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{agentSum[i].userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{agentSum[i].agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{agentSum[i].agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{agentSum[i].agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{agentSum[i].agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{agentSum[i].agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr v-if="item.directly != 2" v-show="!show[i]" class="MemberLogin_log_list" v-for="(item,index) in m"
                :key="index">
                <!-- <td v-if="siteName">
                      {{siteName}}
                      </td> -->
                <td v-if="item.directly == 1">
                  <a href="javascript:void(0);" @click="DiErDengJi(item.siteId,item.siteName,item.agencyName,item.platform,item.directly,item.userName)">直属会员</a>
                </td>
                <!-- <td v-if="item.directly == 2">
                        <a href="javascript:void(0);" @click="DiErDengJi(item.siteId,item.siteName,item.agencyName,item.platform,item.directly,item.userName)">总代理</a>
                      </td> -->
                <td v-else>
                  <a v-if="level != 5" href="javascript:void(0);" @click="DiErDengJi(item.siteId,item.siteName,item.agencyName,item.platform,item.directly,item.userName)">{{item.agencyName
                    || item.userName}}</a>
                  <router-link v-else-if="level == 5 && item.hasOwnProperty('platformName')" :to="{name:'GamesRecords' , query:{userName:item.userName , timeStart:search.timeStart , timeEnd:search.timeEnd , platform:item.platform , type:item.type, siteId:search.siteId}}">{{item.userName}}</router-link>
                  <span v-else>{{item.userName}}</span>
                </td>
                <td v-if="level == 2 || level == 3">
                  <span>{{item.betUser}}</span>
                </td>
                <td>
                  {{item.betCount}}
                </td>
                <td>{{Number(item.betAmount).toFixed(2)}}</td>
                <td>{{Number(item.validBetAmount).toFixed(2)}}</td>
                <td>{{Number(item.netAmount).toFixed(2)}}</td>
                <td v-if="!m[0].platform">
                  {{item.winRate}}
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{item.userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{item.userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{item.agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{item.agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{item.agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{item.agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{item.agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr v-show="!show[i]">
                <td>总计</td>
                <td v-if="level == 2 || level == 3">{{sum[i].betUser}}</td>
                <td>{{sum[i].betCount}}</td>
                <td>{{sum[i].betAmount.toFixed(2)}}</td>
                <td>{{sum[i].validBetAmount.toFixed(2)}}</td>
                <td>{{sum[i].netAmount.toFixed(2)}}</td>
                <td v-if="!m[0].platform">-</td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{sum[i].userIncome.preferential.toFixed(2)}}</td>
                        <td>会员返水：{{sum[i].userIncome.refand.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{sum[i].agencyIncome.rebate.toFixed(2)}}</td>
                        <td>代理返水：{{sum[i].agencyIncome.refand.toFixed(2)}}</td>
                        <td>代理佣金：{{sum[i].agencyIncome.brokerage.toFixed(2)}}</td>
                        <td>代理工资：{{sum[i].agencyIncome.salary.toFixed(2)}}</td>
                        <td>代理分红：{{sum[i].agencyIncome.bonus.toFixed(2)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody> 
            <!-- 五级报表 (单平台)-->
            <!--
            <tbody v-else>
              <tr class="MemberLogin_log_list">
                <td>
                  <router-link :to="{name:'GamesRecords' , query:{userName:m.userName , timeStart:search.timeStart , timeEnd:search.timeEnd , type:item.platform }}">{{m.userName}}点击但平台</router-link>
                </td>
                <td>
                  {{$moment.unix(m.data_date).format("L")}}
                </td>
                <td>
                  {{m.betCount}}
                </td>
                <td>
                  {{m.betAmount}}
                </td>
                <td>
                  {{m.validBetAmount}}
                </td>
                <td>
                  {{m.netAmount}}
                </td>
                <td v-if="!m[0].platform">{{m.winRate}}</td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{m.userIncome.preferential}}</td>
                        <td>会员返水：{{m.userIncome.refand}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{m.agencyIncome.rebate}}</td>
                        <td>代理返水：{{m.agencyIncome.refand}}</td>
                        <td>代理佣金：{{m.agencyIncome.brokerage}}</td>
                        <td>代理工资：{{m.agencyIncome.salary}}</td>
                        <td>代理分红：{{m.agencyIncome.bonus}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>总计</td>
                <td>-</td>
                <td>{{sum.betCount}}</td>
                <td>{{sum.betAmount.toFixed(2)}}</td>
                <td>{{sum.validBetAmount.toFixed(2)}}</td>
                <td>{{sum.netAmount.toFixed(2)}}</td>
                <td>-</td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="userIncomeTr">
                        <td>会员优惠：{{sum.userIncome.preferential}}</td>
                        <td>会员返水：{{sum.userIncome.refand}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td v-if="!m[0].platform" style="padding:0;">
                  <table class="trTable">
                    <tbody>
                      <tr class="agencyIncomeTr">
                        <td>代理返点：{{sum.agencyIncome.rebate}}</td>
                        <td>代理返水：{{sum.agencyIncome.refand}}</td>
                        <td>代理佣金：{{sum.agencyIncome.brokerage}}</td>
                        <td>代理工资：{{sum.agencyIncome.salary}}</td>
                        <td>代理分红：{{sum.agencyIncome.bonus}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
            -->
          </table>
        </div>
      </div>
    </Card>
  </i-col>
</template>

<script>
  export default {
    name: "ReportTable",
    props: ["search", "time", "parentSiteName"],
    data() {
      return {
        // num:null,
        titleDisable: { //title是否可点击
          1: true,
          2: true,
          3: true,
          4: true,
          5: true
        },
        tableData: [],
        agentData: [], //总代理具体数据
        agentDataShow: [], //总代理具体数据是否显示
        show: [],
        level: 1, //所有站点1，大股东列表2，总代或代理及其下面的代理和直属会员3，代理下的直属会员4，单个会员5
        //单个会员之后跳往游戏记录
        agencyName: "",
        showAgencyName: "",
        directly: null, //判断level,0-下级代理及直属会员，1-直属会员，2-总代理
        siteName: "", //判断level
        siteId: null, //判断level
        userName: "", //判断level
        backSearchData: { //储存搜索条件，点击title返回上级
          1: {},
          2: {},
          3: {},
          4: {},
          5: {}
        },
        sum: {}, //报表的总计
        agentSum: {} //总代理的总计
      };
    },
    watch: {},
    created() {
      this.search.siteId = JSON.parse(localStorage.AllSiteNameList)[0].id
      this.PostData();
    },
    methods: {
      sort(v, c) {
        let temp = null
        let list = this.tableData
        if (c === "asc") {
          if (this.level == 1) {
            for (var i = 0; i < list.length - 1; i++) {
              for (var j = 0; j < list.length - i - 1; j++) {
                if ((list[j][v] - 0) > (list[j + 1][v] - 0)) {
                  temp = list[j];
                  list[j] = list[j + 1];
                  list[j + 1] = temp;
                }
              }
            }

          } else {
            list.forEach(item => {
              for (var i = 0; i < item.length - 1; i++) {
                for (var j = 0; j < item.length - i - 1; j++) {
                  if ((item[j][v] - 0) > (item[j + 1][v] - 0)) {
                    temp = item[j];
                    item[j] = item[j + 1];
                    item[j + 1] = temp;
                  }
                }
              }
            })
          }
        } else {
          if (this.level == 1) {
            for (var i = 0; i < list.length - 1; i++) {
              for (var j = 0; j < list.length - i - 1; j++) {
                if ((list[j][v] - 0) < (list[j + 1][v] - 0)) {
                  temp = list[j];
                  list[j] = list[j + 1];
                  list[j + 1] = temp;
                }
              }
            }

          } else {
            list.forEach(item => {
              for (var i = 0; i < item.length - 1; i++) {
                for (var j = 0; j < item.length - i - 1; j++) {
                  if ((item[j][v] - 0) < (item[j + 1][v] - 0)) {
                    temp = item[j];
                    item[j] = item[j + 1];
                    item[j + 1] = temp;
                  }
                }
              }
            })
          }

        }
        this.tableData = [...list]
      },
      tiaozhuan(re) {
        this.PostData(this.backSearchData[re]);
      },
      toggleAgentDataShow(i) { //点击显示总代理具体信息
        // this.num = i
        this.agentDataShow[i] = !this.agentDataShow[i]
        this.show = [...this.agentDataShow]
      },
      DiErDengJi(siteId, siteName, agencyName, platform, directly, userName) {
        this.siteName = siteName ? siteName : this.siteName;
        let searchData = {
          siteId: this.search.siteId,
          agencyName: agencyName ? agencyName : "",
          platform: platform ? platform : "",
          directly: directly == 1 ? directly : "",
          userName: userName ? userName : "",
          timeStart: this.$moment(this.time[0]).format("L"),
          timeEnd: this.$moment(this.time[1]).format("L")
        };
        this.PostData(searchData);
      },
      PostData(arg, flag) {
        this.show = []
        if (!arg) {
          arg = this.search;
        }
        for (let key in arg) {
          arg[key] = arg[key] ? arg[key] : "";
        }
        arg.isRules = "select"
        // console.log(arg)
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiBaoBiaoQuanBuReports, arg)
          .then(res => {
            if (res.data.code == 200) {
              // this.titleDisable = flag ? true : false;
              this.siteId = arg.siteId;
              this.agencyName = arg.agencyName ? arg.agencyName : "";
              this.showAgencyName = arg.agencyName ? arg.agencyName : this.showAgencyName;
              this.directly = arg.directly ? arg.directly : "";
              this.userName = arg.userName ? arg.userName : "";
              if (res.data.data.length) { //一级报表
                this.sum = {
                  betUser: 0,
                  betAmount: 0,
                  betCount: 0,
                  netAmount: 0,
                  validBetAmount: 0,
                  agencyIncome: {},
                  userIncome: {}
                };
                this.tableData = res.data.data;

                this.tableData.forEach(item => {
                  for (let key in this.sum) {
                    if (key === "agencyIncome" || key === "userIncome") {
                      for (let i in item[key]) {
                        this.sum[key][i] = this.sum[key][i] ? this.sum[key][i] : 0;
                        this.sum[key][i] += Number(item[key][i]);
                      }
                    } else {
                      this.sum[key] += Number(item[key]);
                    }
                  }
                });
              } else { //二三四五级报表
                this.agentSum = {}; //总代理的总计
                this.sum = {}; //报表的总计
                this.agentData = []; //总代理具体数据
                this.tableData = Object.values(res.data.data);
                this.tableData.forEach((item, index) => {
                  if (item[0]&&item[0].hasOwnProperty("agencyIncome")) { //判断是否为TOTAL总计
                    let sumObj1 = {
                      betUser: 0,
                      betAmount: 0,
                      betCount: 0,
                      netAmount: 0,
                      validBetAmount: 0,
                      agencyIncome: {},
                      userIncome: {}
                    };
                    let agentObj1 = {
                      betUser: 0,
                      betAmount: 0,
                      betCount: 0,
                      netAmount: 0,
                      validBetAmount: 0,
                      agencyIncome: {},
                      userIncome: {}
                    }
                    let agentDataObj1 = []
                    item.forEach((value, i) => {
                      if (value.directly == 2) {
                        this.agentDataShow[index] = false //总代理具体信息默认不显示
                        agentDataObj1.push(value)
                        for (let key in agentObj1) {
                          if (key === "agencyIncome" || key === "userIncome") {
                            for (let i in value[key]) {
                              agentObj1[key][i] = agentObj1[key][i] ? agentObj1[key][i] : 0;
                              agentObj1[key][i] += Number(value[key][i]);
                            }
                          } else {
                            agentObj1[key] += Number(value[key]);
                          }
                        }
                      }
                      for (let key in sumObj1) {
                        if (key === "agencyIncome" || key === "userIncome") {
                          for (let i in value[key]) {
                            sumObj1[key][i] = sumObj1[key][i] ? sumObj1[key][i] : 0;
                            sumObj1[key][i] += Number(value[key][i]);
                          }
                        } else {
                          sumObj1[key] += Number(value[key]);
                        }
                      }
                    });
                    this.agentData[index] = agentDataObj1;
                    this.sum[index] = sumObj1;
                    this.agentSum[index] = agentObj1;
                  } else { //计算各个平台的总计
                    let sumObj = {
                      betUser: 0,
                      betAmount: 0,
                      betCount: 0,
                      netAmount: 0,
                      validBetAmount: 0
                    };
                    let agentObj = {
                      betUser: 0,
                      betAmount: 0,
                      betCount: 0,
                      netAmount: 0,
                      validBetAmount: 0
                    }
                    let agentDataObj = []
                    item.forEach((value, i) => {
                      if (value.directly == 2) {
                        this.agentDataShow[index] = false //总代理具体信息默认不显示
                        agentDataObj.push(value)
                        for (let key in agentObj) {
                          agentObj[key] += Number(value[key]);
                        }
                      }
                      for (let key in sumObj) {
                        sumObj[key] += Number(value[key]);
                      }
                    });
                    this.agentData[index] = agentDataObj;
                    this.sum[index] = sumObj;
                    this.agentSum[index] = agentObj;
                  }
                });
              }
              if (this.tableData.length) {
                if (this.siteId && !this.agencyName && !this.userName) {
                  this.level = 2;
                } else if (this.agencyName && !this.directly) {
                  this.level = 3;
                } else if (this.agencyName && this.directly) {
                  this.level = 4;
                } else if (this.userName) {
                  this.level = 5;
                } else {
                  this.level = 1;
                }
              }
              if (flag) { //直接条件搜索
                for (let i = 1; i < this.level; i++) {
                  this.titleDisable[i] = flag ? true : false;
                }
              }
              this.titleDisable[this.level] = false;
              this.backSearchData[this.level] = JSON.parse(JSON.stringify(arg));
            }
          });
      }
    }
  };
</script>

<style scoped lang='less'>
  .tableTitle {
    font-size: 20px;
  }

  .table {

    th,
    td {
      text-align: center; // line-height: 30px;
    }

    .agent {
      background-color: #f8f8f9;
    }
  }

  .trTable {
    border-collapse: collapse;
    width: 100%;

    tr {
      width: 100%;

      td {
        border: 0;
        border-right: 1px solid #e9eaec;

        &:last-child {
          border: 0;
        }
      }
    }

    .userIncomeTr {
      td {
        width: 50%;
      }
    }

    .agencyIncomeTr {
      width: 20%;
    }
  }

  .fixed-table {
    table-layout: fixed
  }

  .MemberLogin_log_header {
    background: #ebebeb;
    line-height: 35px;
    padding: 0 10px;
    font-weight: 800;

    .ivu-row {
      // text-align: center
    }
  }

  .MemberLogin_log_list {
    .L_head {
      background: whitesmoke;
      line-height: 40px;
      padding: 0 10px;
    }

    .L_body {
      padding: 0px 10px;

      .ivu-row {
        line-height: 40px;
        border-bottom: 1px dotted #ddd;
        margin-bottom: 4px;
      }

      .ivu-col {}

      border: 1px solid #f5f5f5;
      border-top: none;
    }
  }

  .ivu-table-sort i.on {
    color: #2d8cf0;
  }
</style>