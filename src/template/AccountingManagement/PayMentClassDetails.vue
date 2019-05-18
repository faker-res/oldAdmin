<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <ol>
            <li>
              <b>创建人：</b>{{PayMentClassData.createUser}}</li>
            <li>
              <b>分组名称：</b>{{PayMentClassData.className}}</li>
            <li>
              <b>支付类型：</b>{{PayMentClassData.classType}}</li>
            <li>
              <b>设备：</b>{{PayMentClassData.devices}}</li>
            <li>
              <b>状态：</b>
              <Tag v-if="PayMentClassData.classStatus=='no'" color="red">停用</Tag>

              <Tag v-if="PayMentClassData.classStatus=='yes'" color="green">启用</Tag>
            </li>
            <li>
              <b>排序：</b>{{PayMentClassData.sequence}}</li>
            <li>
              <b>备注：</b>{{PayMentClassData.classRemarks}}</li>
            <li>
              <b>创建时间：</b>{{$moment.unix(PayMentClassData.createTime-0).format("llll")}}</li>
            <li>
              <b>更新人：</b>{{PayMentClassData.updateUser ? PayMentClassData.updateUser : "无"}}</li>
            <li>
              <b>更新时间：</b>{{PayMentClassData.updateTime != 0 ? $moment.unix(PayMentClassData.updateTime-0).format("llll") : "无"}}</li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <a @click="deletePaymentClass">删除该支付组</a>
          <router-link :to="{  name: 'PaymentClassCreate',query:{paymentClassId:PayMentClassData.id,isVerify:true}}">编辑支付组</router-link>
          <router-link :to="{  name: 'PaymentClassCreate'}">新增支付组</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      PayMentClassData: {}
    };
  },
  created() {
    this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiangQIng, {
          paymentClassId: this.$route.query.paymentClassId
        })
        .then(res => {
          this.PayMentClassData = res.data.data;
        });
  },
  methods: {
    deletePaymentClass() {
      var that = this;
      this.$Modal
        .confirm({
          content: "确认删除？",
          loading: true,
          onOk: () => {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuShanChu,
                { paymentClassId: that.PayMentClassData.id }
              )
              .then(res => {
                this.$Modal.remove();
                this.$root.modal("success" , "" , "支付分组删除成功！")
                this.$root.go_back();
              });
          }
        })
        .catch(res => {
          this.$Modal.remove();
        });
    }
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
  b{
    display:inline-block;
    width: 70px;
    text-align: left;
  }
}
</style>
