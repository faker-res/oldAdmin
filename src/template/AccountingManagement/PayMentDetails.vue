<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                  <ul class="ulDetails">
                    <li><b>支付名称:</b>{{paymentData.name}}</li>
                    <li><b>站点名称:</b>{{paymentData.siteName}}</li>
                    <li><b>支付分组:</b>{{paymentData.className}}</li>
                    <li><b>demo方法:</b>{{paymentData.queryName}}</li>
                    <li><b>状态:</b>{{paymentData.status=='yes'?'开启':'关闭'}}</li>
                    <li><b>版本号:</b>{{paymentData.version}}</li>
                    <li><b>支付商户号:</b>{{paymentData.businessNo}}</li>
                    <li><b>支付ID:</b>{{paymentData.businessId}}</li>
                    <li><b>编码:</b>{{paymentData.charset}}</li>
                    <li><b>排序:</b>{{paymentData.sequence}}</li>
                    <li><b>支付类型:</b>{{paymentData.payType}}</li>
                    <li><b>支付方式:</b>{{paymentData.payName}}</li>
                    <li><b>支付上限:</b>{{paymentData.maxAmount}}</li>
                    <li><b>支付下限:</b>{{paymentData.minAmount}}</li>
                    <li><b>创建人:</b>{{paymentData.createUser}}</li>
                    <li><b>创建时间:</b>{{paymentData.createTime}}</li>
                    <li><b>修改人:</b>{{paymentData.updateUser ? paymentData.updateUser : "无"}}</li>
                    <li><b>修改时间:</b>{{paymentData.updateTime}}</li>
                  </ul>
                    <p><b>支付域名:</b>{{paymentData.redirect_domain}}</p>
                    <p><b>支付秘钥:</b>{{paymentData.businessKEY}}</p>
                    <p><b>网关地址:</b>{{paymentData.gateway_url}}</p>
                    <p><b>消息通知地址:</b>{{paymentData.backNotifyUrl}}</p>
                    <p><b>页面跳转地址:</b>{{paymentData.pageNotifyUrl}}</p>
                    <p><b>银行编码:</b>{{paymentData.bankCode}}</p>
                    
                </div>
                <div class="blockquote" v-if="paymentData.allowLevel.length>0">
                     <b>允许等级：</b>
                    <table class="table">
                        <thead>
                            <tr>
                                <!-- <th>ID</th> -->
                                <th>等级</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(m,i) in paymentData.allowLevel" :key="i">
                                <!-- <td>{{m.levelId}}</td> -->
                                <td>{{m.levelName}}</td>
                                <td>
                                    <Tag v-if="m.levelStatus=='no'" color="red">停用</Tag>
                                    <Tag v-if="m.levelStatus=='yes'" color="green">启用</Tag>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="page-boot">
                <div class="b_link">
                    <!-- <router-link :to="{  name: 'Statistics',  params: {}}">检视今日报表</router-link> -->
                    <!-- <router-link :to="{  name: 'PayMentTransaction',  params: {}}">检视所属会员交易记录</router-link> -->
                    <a href="javascript:" @click="$root.go_back">返回上一页</a>
                    <!-- <a @click="QuKuanPS">重设取款密码</a> -->
                    <!-- <a @click="DengLuPS">重设登录密码</a> -->
                    <a @click="deleatemember">删除该支付方式</a>
                    <router-link :to="{  name: 'PaymentCreate',query:{paymentId:paymentData.paymentId,isVerify:true}}">编辑支付方式</router-link>
                    <router-link :to="{  name: 'PaymentCreate'}">新增支付方式</router-link>
                </div>
            </div>
        </div>
        <!-- <Modal class-name="vertical-center-modal"  v-model="MiMaSheZhiTC" :width='200' title="重设密码成功" ok-text="确定">
            <div style="text-align:center">
                <b style="font-size:35px">{{NewPas}}</b>
            </div>
            <div>
                <Button long :data-clipboard-text='NewPas' id="fuzhi" type="success">复制</Button>
            </div>
        </Modal> -->
    </div>
</template>
<script>
import Clipboard from "clipboard";
var clipboard = {};
export default {
  name: "",
  data() {
    return {
      beizhuxiugai: true,
      beizhu_zc: "",
      MiMaSheZhiTC: false,
      // PayMentData: {
      paymentData: {
        allowLevel:[]
      },
      // },
      HuiYuanRenShu: 0,
      NewPas: ""
    };
  },
  computed: {
    newP() {
      if (this.MiMaSheZhiTC) {
        return this.ChongSheMiMa();
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     //   vm.$root.DaiLiXiangQing({id:1});
  //     vm.$root
  //       .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_ZaiXianZhiFuXiangQing, {
  //         paymentId: vm.$route.query.paymentId
  //       })
  //       .then(res => {
  //         vm.PayMentData = res.data.data;
  //       });
  //     //   vm.$root
  //     //     .HuoQuHuiYuanDengJiRenShu({ levelId: vm.$route.query.levelId })
  //     //     .then(res => {
  //     //       vm.HuiYuanRenShu = res.data.data;
  //     //     });
  //   });
  // },
  created() {
    },
  mounted() {
    this.$nextTick(() => {
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuXiangQing, {
        paymentId: this.$route.query.paymentId
      })
      .then(res => {
        this.paymentData = res.data.data.paymentData;
      });
      
    });
    clipboard = new Clipboard("#fuzhi");
    clipboard.on("success", e => {
      this.$Message.success(`复制 ${e.text} 成功`);
      e.clearSelection();
      this.MiMaSheZhiTC = false;
    });
  },
  methods: {
    agentj() {},
    deleatemember() {
      var that = this;
      this.$Modal
        .confirm({
          content: "确认删除？",
          loading: true,
          onOk: () => {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuShanChu, {
                paymentId: that.PayMentData.id
              })
              .then(res => {
                this.$Modal.remove();
                this.$root.modal("success" , "" , "管理员删除成功！")
                this.$root.go_back();
              });
          }
        })
        .catch(res => {
          this.$Modal.remove();
        });
    },
    ChongSheMiMa(pas) {
      this.MiMaSheZhiTC = true;
      //   var nuwPassword = "";
      //   for (var i = 0; i < 6; i++) {
      //     nuwPassword += Math.floor(Math.random() * 10);
      //   }
      return pas;
    },
    QuKuanPS() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改取款密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanQuKuanMiMaXiuGai, {
              id: this.PayMentData.uid
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
          //   this.$root
          //     .HuiYuanQuKuanMiMaXiuGai({
          //       id: this.PayMentData.uid
          //     })
          //     .then(res => {
          //       this.$Modal.remove();
          //       this.NewPas = res.data.data;
          //       this.MiMaSheZhiTC = true;
          //     })
          //     .catch(res => {
          //       this.$Modal.remove();
          //     });
        }
      });
    },
    DengLuPS() {
      var that = this;
      this.$Modal.confirm({
        content: "确认修改登录密码？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanDengLuMiMaXiuGai, {
              id: this.PayMentData.uid
            })
            .then(res => {
              this.$Modal.remove();
              this.NewPas = res.data.data;
              this.MiMaSheZhiTC = true;
            })
            .catch(res => {
              this.$Modal.remove();
            });
          //   this.$root
          //     .HuiYuanDengLuMiMaXiuGai({
          //       id: this.PayMentData.uid
          //     })
          //     .then(res => {
          //       this.$Modal.remove();
          //       this.NewPas = res.data.data;
          //       this.MiMaSheZhiTC = true;
          //     })
          //     .catch(res => {
          //       this.$Modal.remove();
          //     });
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
.blockquote{
  p{
    margin : 5px 0;
  }
}
.blockquote{
  b{
    display:inline-block;
    width: 100px;
    text-align: left;
  }
}
</style>
