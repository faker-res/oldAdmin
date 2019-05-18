<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{MemberData.userName}}</span>
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
                    <li>
                      <b>真实姓名：</b>{{MemberData.realName}}</li>
                    <li>
                      <b>上次登陆平台：</b>{{MemberData.lastGamePlatform}}</li>
                    <li>
                      <b>状态：</b>
                      <Tag v-if="MemberData.status=='no'" color="red">停用</Tag>
                      <a v-if="MemberData.status=='no'" @click="ZhuangTai" href="javascript:">启用</a>
                      <Tag v-if="MemberData.status=='yes'" color="green">启用</Tag>
                      <a v-if="MemberData.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a>
                    </li>

                    <li>
                      <b>所属站点：</b>{{MemberData.siteName}}</li>
                    <li>
                      <b>会员电话：</b>{{MemberData.phone}}</li>
                    <li>
                      <b>上次登陆设备：</b>{{MemberData.lastDevice}}</li>
                    <li>
                      <b>锁定状态 :</b>
                      <Button size="small" :type="MemberData.lock==='yes'?'success':'error'">{{MemberData.lock==='yes'?'已锁定':'未锁定'}}</Button>
                    </li>

                    <li>
                      <b>上级代理：</b>{{MemberData.agencyName}}</li>
                    <li>
                      <b>会员邮箱：</b>{{MemberData.email}}</li>
                    <li>
                      <b>上次登陆域名：</b>{{MemberData.lastDomain}}</li>
                    <li>
                      <b>是否返水：</b>
                      <Button size="small" :type="MemberData.refundBonus==='yes'?'success':'error'">{{MemberData.refundBonus==='yes'?'是':'否'}}</Button>
                    </li>

                    <li>
                      <b>等级名称：</b>{{MemberData.levelName}}</li>
                    <li>
                      <b>会员微信：</b>{{MemberData.wechat}}</li>
                    <li>
                      <b>上次登陆IP：</b>{{MemberData.lastIp}}</li>

                    <li>
                      <b>创建IP：</b>{{MemberData.createIp}}</li>
                    <li>
                      <b>会员头像：</b>{{MemberData.pic}}</li>
                    <li>
                      <b>历史登陆：</b>
                      <Button size="small" type="default" @click="getMemberHistory">历史记录</Button>
                    </li>
                    <li>
                      <b>会员等级人数：</b>
                      <Tooltip :content="MemberData.levelName" placement="top">
                        <Button @click="$router.push({name:'Member',params:{siteId:MemberData.siteId,levelId:MemberData.levelId}})" size="small">{{HuiYuanRenShu?HuiYuanRenShu:0}}</Button> 人
                      </Tooltip>
                    </li>
                  </ul>
                  <div>
                    <b>代理路径：</b>{{MemberData.agencyPath}}</div>
                  <div class="time">
                    <span>
                      <b>上次登陆时间：</b>{{$moment.unix(MemberData.lastTime-0).format("llll")}}</span>
                    <span>
                      <b>更新时间：</b>{{$moment.unix(MemberData.updated_at-0).format("llll")}}</span>
                  </div>

                  <div>
                    <p style="margin-bottom:10px;">
                      <b>备注 </b>
                      <a v-show="beizhuxiugai" @click="beizhu_zc = MemberData.remark;beizhuxiugai = false">修改</a>
                      <a v-show="!beizhuxiugai" @click="MemberData.remark = beizhu_zc;beizhuxiugai = true;">取消</a>
                      <a v-show="!beizhuxiugai" @click="BeiZhuXiuGaiBaoCun">保存</a>
                    </p>
                    <i-input :disabled="beizhuxiugai" type="textarea" v-model="MemberData.remark" :MemberDatas="4"></i-input>
                  </div>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>

        <!-- 账户信息 -->
        <div class="blockquote">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <h2>账户信息</h2>
                </div>
                <div class="card-content">
                  <ul class="ulDetails" v-if="MemberData.statistics">
                    <li>
                      <b>公司入款总额：</b>{{MemberData.statistics.offline_deposit_amount}}</li>
                    <li>
                      <b>提款总额：</b>{{MemberData.statistics.withdrawals_amount}}</li>
                    <li>
                      <b>线上入款总额：</b>{{MemberData.statistics.online_deposit_amount}}</li>
                    <li>
                      <b>红利返水总额：</b>{{MemberData.statistics.bonus_amount}}</li>

                    <li>
                      <b>公司入款次数：</b>{{MemberData.statistics.offline_deposit_count}}</li>
                    <li>
                      <b>提款次数：</b>{{MemberData.statistics.withdrawals_count}}</li>
                    <li>
                      <b>线上入款次数：</b>{{MemberData.statistics.online_deposit_count}}</li>
                    <li>
                      <b>红利返水次数：</b>{{MemberData.statistics.bonus_count}}</li>

                    <li>
                      <b>有效投注金额：</b>{{MemberData.statistics.valid_bet_amount}}</li>
                    <li>
                      <b>赢利：</b>{{MemberData.statistics.profit}}</li>
                    <li>
                      <b>下注输赢：</b>{{MemberData.statistics.net_amount}}</li>
                    <li>
                      <b>余额：</b>{{MemberData.balance}}</li>

                    <li>
                      <b>投注单量：</b>{{MemberData.statistics.bet_count}}</li>
                    <li>
                      <b>赢率：</b>{{MemberData.statistics.proportion*100+"%"}}</li>
                    <li>
                      <b>最后统计时间：</b>{{$moment.unix(MemberData.statistics.addTime).format('llll')}}</li>
                  </ul>
                  <Alert v-else show-icon>
                    <span style="margin-right:10px">暂无用户账户信息</span>
                  </Alert>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>

        <div class="blockquote">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <h2>银行信息</h2>
                </div>
                <div class="card-content">
                  <Row v-if="UserBankInfo.length" type="flex">
                    <i-col v-for="(item,i) in UserBankInfo" :key="i" :style="{
                        marginRight:'10px',
                        width:'280px',
                        height:'170px',
                        backgroundImage:`url(${item.imgSrc})`,
                        backgroundSize:'100% 100%',
                        fontSize: '12px'
                        }">
                      <div class="bank">
                        <p class="bankcard-title">
                          {{item.bankName}}
                          <router-link style="color:#00579c" :to="{name:'MemberBankAccountCreate',query:{id:item.id,siteId:item.siteId,isVerify:true}}">编辑该银行卡</router-link>
                        </p>
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
                          <Button @click="yinHangKaZhuangTai(item.id,item.status)" :type="item.status==='yes'?'success':'warning'" size="small">{{item.status==="yes"?"启用":"停用"}}</Button>
                        </p>
                      </div>
                    </i-col>
                  </Row>
                  <Alert v-else show-icon>
                    <span style="margin-right:10px">暂无银行卡信息</span>
                    <router-link :to="{  name: 'MemberBankAccountCreate',  query: {userName:MemberData.userName,id:MemberData.uid,siteName:MemberData.siteName,siteId:MemberData.siteId}}">新增会员银行卡</router-link>
                  </Alert>
                </div>
              </Card>
            </i-col>
          </Row>
        </div>

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
        <div class="blockquote">
          <Collapse>
            <Panel>
              <span>返水信息</span>
              <div slot="content">
                <div v-for="(item, index) in MemberData.platform" :key="index">
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
          <a @click="ResetWithdrawPass">重设取款密码</a>
          <a @click="ResetUserPass">重设登录密码</a>
          <a @click="ResetMemberSecret">重设密保答案</a>
          <router-link :to="{ name: 'MemberCreate',query: {siteId:MemberData.siteId,id: MemberData.uid,isVerify:true}}">编辑会员信息</router-link>
          <router-link :to="{ name: 'MemberCreate'}">新增会员</router-link>
          <router-link :to="{  name: 'MemberBankAccountCreate',  query: {userName:MemberData.userName,id:MemberData.uid,siteName:MemberData.siteName,siteId:MemberData.siteId}}">新增会员银行卡</router-link>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="MiMaSheZhiTC" :width='300' title="重设密码成功" ok-text="确定">
      <div style="text-align:center">
        <b style="font-size:35px">{{NewPas}}</b>
      </div>
      <div>
        <Button long :data-clipboard-text='NewPas' id="fuzhi" type="success">复制</Button>
      </div>
    </Modal>
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
      beizhuxiugai: true,
      beizhu_zc: "",
      MiMaSheZhiTC: false,
      MemberData: {},
      HuiYuanRenShu: 0,
      NewPas: "",
      UserBankInfo: {},
      rebateObj: {}
    };
  },
  computed: {
    newP() {
      if (this.MiMaSheZhiTC) {
        return this.ChongSheMiMa();
      }
    },
    memberHistoryData() {
      return {
        url: this.$root.HTTP_L.HTTP_Get_MemberHistory,
        params: {
          siteId: this.MemberData.siteId,
          uid: this.MemberData.uid
        }
      };
    }
  },
  mounted() {
    this.fetchData();
    clipboard = new Clipboard("#fuzhi");
    clipboard.on("success", e => {
      this.$Message.success(`复制 ${e.text} 成功`);
      e.clearSelection();
      this.MiMaSheZhiTC = false;
    });
  },
  methods: {
    async fetchData() {
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanXiangQing, {
          id: this.$route.query.id,
          siteId: this.$route.query.siteId
        })
        .then(res => {
          for (let key in res.data.data) {
            if (res.data.data[key] === "") {
              res.data.data[key] = "暂无信息";
            }
          }
          res.data.data.rebate = JSON.parse(res.data.data.rebate);
          this.rebateObj = { ...this.$root.Lottclass };
          for (let keyL in this.rebateObj) {
            this.rebateObj[keyL].forEach(item => {
              for (let keyR in res.data.data.rebate) {
                if (+keyR == +item.id) {
                  item.rebate = res.data.data.rebate[keyR];
                }
              }
            });
          }
          this.MemberData = res.data.data;
          this.UserBankInfo = res.data.data.bank;
          // 设置银行背景图片
          this.UserBankInfo.forEach(b => {
            this.bankList.forEach(c => {
              if (b.bankName === c.bankName) {
                b.imgSrc = c.imgSrc;
              }
            });
          });
        });
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuHuiYuanDengJiRenShu, {
          siteId: this.MemberData.siteId,
          levelId: this.$route.query.levelId
        })
        .then(res => {
          this.HuiYuanRenShu = res.data.data;
        });
    },
    getMemberHistory() {
      this.$refs.MemberLoginHistory.fetchData();
    },
    ZhuangTai() {
      var that = this;
      let tip = this.MemberData.status == "yes" ? "停用" : "启用";
      this.$Modal.confirm({
        title: "提示",
        content: `确定${tip}?`,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiHuiYuanZhuangTai, {
              id: this.MemberData.uid,
              status: this.MemberData.status == "yes" ? "no" : "yes",
              siteId: this.MemberData.siteId
            })
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.MemberData.status == "yes"
                ? (this.MemberData.status = "no")
                : (this.MemberData.status = "yes");
            })
            .catch(res => {
              this.$Message.error("状态修改失败！");
            });
        }
      });
    },
    yinHangKaZhuangTai(id, status) {
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
                siteId: this.MemberData.siteId
              }
            )
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.UserBankInfo.forEach(item => {
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
    BeiZhuXiuGaiBaoCun() {
      var that = this;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_BianJiHuiYuanBeiZhu, {
          id: this.MemberData.uid,
          siteId: this.MemberData.siteId,
          remark: this.MemberData.remark
        })
        .then(res => {
          this.$Modal.success({ title: "提示", content: "备注修改成功！" });
          that.beizhuxiugai = true;
        })
        .catch(res => {});
    },
    ChongSheMiMa(pas) {
      this.MiMaSheZhiTC = true;
      //   var nuwPassword = "";
      //   for (var i = 0; i < 6; i++) {
      //     nuwPassword += Math.floor(Math.random() * 10);
      //   }
      return pas;
    },
    ResetWithdrawPass() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改取款密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanQuKuanMiMaXiuGai, {
              id: this.MemberData.uid,
              siteId: this.MemberData.siteId
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    ResetUserPass() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改登录密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanDengLuMiMaXiuGai, {
              id: this.MemberData.uid,
              siteId: this.MemberData.siteId
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    ResetMemberSecret() {
      var that = this;
      this.$Modal.confirm({
        content: "[只有用户设置过密保才能进行重设操作],您确认重设该用户的密保答案吗？",
        loading: true,
        onOk: () => {
          let params = {
            siteId: this.MemberData.siteId,
            id: this.MemberData.uid
          };
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_Update_ResetMemberSecret,
              params
            )
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    }
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
</style>
