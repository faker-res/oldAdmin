<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                </h1>
            </div>
            <div class="page-con1" v-if="Object.keys(paymentData).length">
                <div class="blockquote">
                  <ul class="ulDetails">
                    <li><b>站点名称:</b>{{paymentData.payment.siteName}}</li>
                    <li><b>支付名称(会员端):</b>{{paymentData.payment.name}}</li>
                    <li><b>支付名称(管理端):</b>{{paymentData.payment.payName}}</li>
                    <!-- <li><b>支付分组:</b>{{paymentData.className}}</li> -->
                    <li><b>demo方法:</b>{{paymentData.payment.queryName}}</li>
                    <li><b>状态:</b>{{paymentData.payment.status=='yes'?'开启':'关闭'}}</li>
                    <li><b>支付商户号:</b>{{paymentData.payment.businessNo}}</li>
                    <li><b>排序:</b>{{paymentData.payment.sequence}}</li>
                    <li><b>支付额度:</b>{{paymentData.payment.formatAmount ? paymentData.payment.formatAmount : paymentData.payment.minAmount + "-" + paymentData.payment.maxAmount}}</li>
                    <!-- <li><b>支付上限:</b>{{paymentData.payment.maxAmount}}</li>
                    <li><b>支付下限:</b>{{paymentData.payment.minAmount}}</li> -->
                    <li><b>创建人:</b>{{paymentData.payment.created_user}}</li>
                    <li><b>创建时间:</b>{{$moment.unix(paymentData.payment.created_at).format("LLL")}}</li>
                    <li><b>修改人:</b>{{paymentData.payment.updated_user ? paymentData.payment.updated_user : "无"}}</li>
                    <li><b>修改时间:</b>{{paymentData.payment.updated_at !== 0 ? $moment.unix(paymentData.payment.updated_at).format("LLL") : "无"}}</li>
                  </ul>
                    <p><b>支付域名:</b>{{paymentData.payment.redirect_domain}}</p>
                    <p><b>支付秘钥:</b>{{paymentData.payment.businessKEY}}</p>
                    <p><b>银行编码:</b>{{paymentData.payment.bankCode}}</p>
                    
                </div>
                <div class="blockquote" v-if="paymentData.paymentLevel.length>0">
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
                            <tr v-for="(m,i) in paymentData.paymentLevel" :key="i">
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
                <div class="blockquote" v-if="paymentData.paymentLevel.length>0">
                     <b>支付分组</b>
                    <table class="table">
                        <thead>
                            <tr>
                                <!-- <th>ID</th> -->
                                <th>等级</th>
                                <th>状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(m,i) in paymentData.paymentClass" :key="i">
                                <td>{{m.className}}</td>
                                <td>
                                    <Tag v-if="m.classStatus=='no'" color="red">停用</Tag>
                                    <Tag v-if="m.classStatus=='yes'" color="green">启用</Tag>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="page-boot">
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">返回上一页</a>
                    <a @click="deleatemember">删除该支付方式</a>
                    <router-link :to="{  name: 'PaymentCreateNew',query:{paymentId:this.$route.query.paymentId,isVerify:true}}">编辑支付方式</router-link>
                    <router-link :to="{  name: 'PaymentCreateNew'}">新增支付方式</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "PayMentDetailsNew",
  data() {
    return {
      paymentData: {
      },
    };
  },
  computed: {
  },
  created() {
    },
  mounted() {
    this.$nextTick(() => {
      let params = {
        paymentId: this.$route.query.paymentId,
        siteId: this.$route.query.siteId,
      }
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Detail_Payment, params)
      .then(res => {
        this.paymentData = res.data.data;
      });
      
    });
  },
  methods: {
    deleatemember() {
      var that = this;
      this.$Modal
        .confirm({
          content: "确认删除？",
          loading: true,
          onOk: () => {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Delete_Payment, {
                paymentId: this.$route.query.paymentId,
                siteId: this.$route.query.siteId
              })
              .then(res => {
                this.$Modal.remove();
                this.$root.modal("success" , "" , "删除成功！")
                this.$router.push({name:"PaymentListNew"})
              });
          }
        })
        .catch(res => {
          this.$Modal.remove();
        });
    },
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
    width: 120px;
    text-align: left;
  }
}
</style>
