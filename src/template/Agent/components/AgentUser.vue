<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{AgentData.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <h2>个人信息</h2>
                </div>
                <div class="card-content">
                  <ul class="ulDetails">
                    <li>
                      <b>用户名 :</b>
                      <router-link :to="{name:'MemberUser',query:{id:AgentData.uid,levelId:AgentData.ulevelId}}">{{AgentData.userName}}</router-link>
                    </li>
                    <li>
                      <b>真实姓名 :</b> {{AgentData.realName?AgentData.realName:'暂无信息'}}</li>
                    <li>
                      <b>等级名称 :</b> {{AgentData.levelName}} </li>
                    <li>
                      <b>状态 :</b>
                      <Tag v-if="AgentData.status=='no'" color="red">停用</Tag>
                      <a v-if="AgentData.status=='no'" @click="ZhuangTai" href="javascript:">启用</a>
                      <Tag v-if="AgentData.status=='yes'" color="green">启用</Tag>
                      <a v-if="AgentData.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a>
                    </li>

                    <li>
                      <b>所属站点 :</b> {{AgentData.siteName}}</li>
                    <li>
                      <b>代理电话 :</b> {{AgentData.phone?AgentData.phone:'暂无信息'}}</li>
                    <li>
                      <b>会员等级人数：</b>
                      <Tooltip :content="AgentData.levelName" placement="top">
                        <Button @click="$router.push({name:'AgentSearch',params:{siteId:AgentData.siteId,levelId:AgentData.levelId}})" size="small">{{MemberLevelCount?MemberLevelCount:0}}</Button> 人
                      </Tooltip>
                    </li>
                    <li>
                      <b>是否返水：</b>
                      <Button size="small" :type="AgentData.refundBonus==='yes'?'success':'error'">{{AgentData.refundBonus==='yes'?'是':'否'}}</Button>
                    </li>

                    <li>
                      <b>上级名称 :</b> {{(AgentData.superiorUserName&&AgentData.agencyType=='agency')?AgentData.superiorUserName:'暂无上级'}}</li>
                    <li>
                      <b>代理邮箱 :</b> {{AgentData.email?AgentData.email:'暂无信息'}}</li>
                    <li>
                      <b>余额 :</b> {{AgentData.balance}}</li>
                    <li>
                      <b>锁定状态 :</b>
                      <Button size="small" :type="AgentData.lock==='yes'?'success':'error'">{{AgentData.lock==='yes'?'已锁定':'未锁定'}}</Button>
                    </li>

                    <li>
                      <b>代理类型:</b>
                      <Tag v-if="AgentData.agencyType=='agency'" color="yellow">普通代理</Tag>
                      <Tag color="yellow" v-else>大股东</Tag>
                    </li>
                    <li>
                      <b>代理微信 :</b> {{AgentData.wechat?AgentData.wechat:'暂无信息'}}</li>
                    <li>
                      <b>历史登陆：</b>
                      <Button size="small" type="default" @click="getMemberHistory()">历史记录</Button>
                    </li>
                  </ul>
                  <div>
                    <b>代理路径：</b>{{AgentData.agencyPath}}</div>
                  <div class="time">
                    <span v-if="AgentData.created_at">
                      <b>创建时间 :</b> {{$moment.unix(AgentData.created_at-0).format("llll")}}
                    </span>
                    <span v-if="AgentData.updated_at">
                      <b>更新时间 :</b> {{$moment.unix(AgentData.updated_at-0).format("llll")}}
                    </span>
                  </div>
                  <div>
                    <b>代理树：</b>
                    <span>{{AgentData.userName}}→</span>
                    <span>代理
                      <router-link :to="{name:'AgentSearch',params:{siteId:AgentData.siteId,superiorUserName:AgentData.userName}}">{{AgentData.agencyNum}}</router-link>人→会员
                      <router-link :to="{name:'Member',params:{siteId:AgentData.siteId,agencyName:AgentData.userName}}">{{AgentData.uidNum}}</router-link>人
                    </span>
                    <router-link style="margin-left: 10px;" :to="{name:'AgentTree',query:{siteId:AgentData.siteId,uid:AgentData.uid,userName:AgentData.userName}}">查看团队架构</router-link>
                  </div>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>

        <!-- 团队收益 -->
        <div class="blockquote" v-if="AgentData.statistics">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <h2>团队收益</h2>
                </div>
                <div class="card-content">
                  <ul class="ulDetails">
                    <li>
                      <b>公司入款总额：</b>{{AgentData.statistics.offline_deposit_amount}}</li>
                    <li>
                      <b>提款总额：</b>{{AgentData.statistics.withdrawals_amount}}</li>
                    <li>
                      <b>线上入款总额：</b>{{AgentData.statistics.online_deposit_amount}}</li>
                    <li>
                      <b>红利返水总额：</b>{{AgentData.statistics.bonus_amount}}</li>

                    <li>
                      <b>公司入款次数：</b>{{AgentData.statistics.offline_deposit_count}}</li>
                    <li>
                      <b>提款次数：</b>{{AgentData.statistics.withdrawals_count}}</li>
                    <li>
                      <b>线上入款次数：</b>{{AgentData.statistics.online_deposit_count}}</li>
                    <li>
                      <b>红利返水次数：</b>{{AgentData.statistics.bonus_count}}</li>

                    <li>
                      <b>有效投注金额：</b>{{AgentData.statistics.valid_bet_amount}}</li>
                    <li>
                      <b>下注输赢：</b>{{AgentData.statistics.net_amount}}</li>
                    <li>
                      <b>赢利：</b>{{AgentData.statistics.profit}}</li>
                    <li>
                      <b>赢率：</b>{{AgentData.statistics.proportion*100+"%"}}</li>
                    <li>
                      <b>投注单量：</b>{{AgentData.statistics.bet_count}}</li>
                  </ul>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>
        <!-- 银行信息 -->
        <div class="blockquote">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <h2>银行信息</h2>
                </div>
                <div class="card-content">
                  <Row v-if="BankDataInfo.length" type="flex">
                    <i-col v-for="(item,i) in BankDataInfo" :key="i" :style="{
                        marginRight:'10px',
                        width:'280px',
                        height:'170px',
                        backgroundImage:`url(${item.imgSrc})`,
                        backgroundSize:'100% 100%',
                        fontSize: '12px'
                        }">
                      <div class="bank">
                        <p class="bankcard-title">{{item.bankName}}</p>
                        <p>{{item.cardAddress}}</p>
                        <p>{{item.cardNum}}</p>
                        <p>持卡人：{{item.cardName}}</p>
                        <p>
                          是否默认：
                          <span color="red" v-if="item.default=='no'">否</span>
                          <span color="green" v-else>是</span>
                        </p>
                        <p>
                          银行卡状态：
                          <Button @click="changeBankStatus(item.id,item.status)" :type="item.status==='yes'?'success':'warning'" size="small">{{item.status==="yes"?"启用":"停用"}}</Button>
                        </p>
                      </div>
                    </i-col>
                  </Row>
                  <Alert v-else show-icon>
                    <span style="margin-right:10px">暂无银行卡信息</span>
                    <router-link :to="{  name: 'MemberBankAccountCreate',  query: {userName:BankDataInfo.userName,id:BankDataInfo.uid,siteName:BankDataInfo.siteName,siteId:BankDataInfo.siteId}}">新增银行卡</router-link>
                  </Alert>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>

        <!-- 彩票返点 -->
        <div class="blockquote">
          <Collapse>
            <Panel>
              <span>彩票返点</span>
              <div slot="content">
                <div v-for="(item, key, index) in rebateObj" :key="index">
                  <div class="page-header">
                    <h3 class="binding">
                      <b>{{key}}</b>
                    </h3>
                  </div>
                  <ul class="ulDetailsDlCJ">
                    <li v-for="(v,c) in item" :key="c">
                      <span>
                        <b class="key">
                          {{v.name}} :
                        </b>
                        <span class="value">
                          {{v.rebate}}%
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <!-- 返水信息 -->
        <div class="blockquote">
          <Collapse>
            <Panel>
              <span>返水信息</span>
              <div slot="content">
                <div v-for="(item, index) in AgentData.platform" :key="index">
                  <div class="page-header">
                    <h3 class="binding">
                      <b>{{item.name}}</b>
                    </h3>
                  </div>
                  <ul class="ulDetailsDlCJ">
                    <li v-for="(v,c) in item.list" :key="c">
                      <span>
                        <b class="key">
                          {{v.name}} :
                        </b>
                        <span class="value">
                          {{v.value}}
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{  name: 'AgentCreate',  query: {siteId:AgentData.siteId,id:AgentData.uid,isVerify:true}}">编辑代理信息</router-link>
          <router-link :to="{  name: 'AgentCreate'}">新增代理</router-link>
        </div>
      </div>
    </div>
    <MemberLoginHistory ref="MemberLoginHistory" :data="memberHistoryData"></MemberLoginHistory>
  </div>
</template>
<script>
import MemberLoginHistory from "@/template/my-components/MemberLoginHistory";
import bankList from '@/local/bankList'
import Clipboard from "clipboard";
var clipboard = {};
export default {
  name: "",
  components: {
    MemberLoginHistory
  },
  data() {
    return {
      bankList :bankList,
      AgentData: {},
      BankDataInfo: [],
      pid: [],
      userName: "",
      MemberLevelCount: null,
      rebateObj: {}
    };
  },
  computed: {
    memberHistoryData() {
      return {
        url: this.$root.HTTP_L.HTTP_Get_MemberHistory,
        params: {
          siteId: this.AgentData.siteId,
          uid: this.AgentData.uid
        }
      };
    }
  },
  mounted() {
    this.fetchData();
    clipboard = new Clipboard("#fuzhi");
    clipboard.on("success", e => {
      this.$Modal.success({ title: "提示", content: `复制 ${e.text} 成功` });
      e.clearSelection();
    });
  },
  methods: {
    //获取初始数据
    async fetchData() {
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DaiLiXiangQing, {
          siteId: this.$route.query.siteId,
          id: this.$route.query.id
        })
        .then(res => {
          for (let key in res.data.data) {
            if (res.data.data[key] === "") {
              res.data.data[key] = "暂无信息";
            }
          }
          for (let key in res.data.data.statistics) {
            if (
              res.data.data.statistics[key] === null ||
              res.data.data.statistics[key] === ""
            ) {
              res.data.data.statistics[key] = 0;
            }
          }
          res.data.data.rebate = JSON.parse(res.data.data.rebate);
          this.rebateObj = { ...this.$root.Lottclass };
          for (let keyL in this.rebateObj) {
            this.rebateObj[keyL].forEach(item => {
              for (let keyR in res.data.data.rebate) {
                if (+keyR === +item.id) {
                  item.rebate = res.data.data.rebate[keyR];
                }
              }
            });
          }
          this.AgentData = res.data.data;
          this.BankDataInfo = res.data.data.bank;
          this.BankDataInfo.forEach(b => {
            this.bankList.forEach(c => {
              if (b.bankName === c.bankName) {
                b.imgSrc = c.imgSrc;
              }
            });
          });
        });
      //获取该代理下的会员等级人数
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Get_AgencyMemberLevelCount, {
          siteId: this.AgentData.siteId,
          levelId: this.AgentData.levelId
        })
        .then(res => {
          this.MemberLevelCount = res.data.data;
        });
    },
    getMemberHistory() {
      this.$refs.MemberLoginHistory.fetchData();
    },
    ZhuangTai() {
      var that = this;
      let tip = this.AgentData.status == "yes" ? "停用" : "启用";
      this.$Modal.confirm({
        title: "提示",
        content: `确定将状态变更为${tip}?`,
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DaiLiZhuangTaiXiuGai, {
              id: this.AgentData.uid,
              status: this.AgentData.status == "yes" ? "no" : "yes",
              siteId: this.AgentData.siteId
            })
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.$Modal.remove();
              this.AgentData.status == "yes"
                ? (this.AgentData.status = "no")
                : (this.AgentData.status = "yes");
            })
            .catch(res => {
              this.$Message.error("状态修改失败！");
              this.$Modal.remove();
            });
        }
      });
    },
    changeBankStatus(id, status) {
      var that = this;
      let tip = status === "yes" ? "停用" : "启用";
      status = status === "yes" ? "no" : "yes";
      this.$Modal.confirm({
        title: "提示",
        content: `确定${tip}?`,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_XiuGaiHuiYinHangZhuangTai,
              {
                id: id,
                status: status,
                siteId: this.AgentData.siteId
              }
            )
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.BankDataInfo.forEach(item => {
                if (item.id == id) {
                  item.status == "yes"
                    ? (item.status = "no")
                    : (item.status = "yes");
                }
              });
            })
            .catch(res => {
              this.$Message.error("状态修改失败！");
            });
        }
      });
    },
  },
  destroyed() {
    clipboard.destroy();
  }
};
</script>
<style lang="less" scoped>
.page-boot {
  .b_link {
    a {
      margin-right: 15px;
    }
  }
}
.tablezl {
  margin-top: 13px;
  th {
    width: 100px;
  }
}
.bank {
  padding: 10px 10px 10px 30px;
  .bankcard-title {
    text-indent: 30px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  p:not(.bankcard-title) {
    line-height: 22px;
  }
}
.ivu-btn-small {
  padding: 0px 7px;
}
.ivu-collapse > .ivu-collapse-item {
  border-top: 0;
}
.ivu-collapse {
  background-color: #f7f7f7;
}
</style>
