<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{$route.query.admin}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <ol>
            <li><b>站点名称：</b>
              {{PreferentialData.siteName}}
            </li>
            <li>
                <b>状态：</b>
                <Tag v-if="PreferentialData.status=='desabled'" color="red">停用</Tag>
                <Tag v-if="PreferentialData.status=='enabled'" color="green">启用</Tag>
            </li>
            <li>
                <b>类型：</b>
                <Tag v-if="PreferentialData.bankType=='in'" color="yellow">入款卡</Tag>
                <Tag v-if="PreferentialData.bankType=='out'" color="yellow">出款卡</Tag>
                <Tag v-if="PreferentialData.bankType=='both'" color="yellow">出款和入款卡</Tag>
            </li>
            <li>
              <b>银行卡所属人：</b>
              {{PreferentialData.cardName}}
            </li>
            <li><b>所属银行：</b>
              {{PreferentialData.bankName}}
            </li>
            <li>
              <b>卡号：</b>
              {{PreferentialData.cardNum}}
            </li>
            <li>
              <b>开卡地址：</b>
              {{PreferentialData.cardAddress}}
            </li>
            <li>
              <b>图片：</b>
              <img :src="PreferentialData.cardImg"/>
            </li>
            <li>
              <b>允许会员等级：</b>{{PreferentialData.level}}
            </li>
              <li>
                <b>创建时间：</b>{{$moment.unix(PreferentialData.addTime-0).format("llll")}}</li>
              <li>
                <b>创建人：</b>{{PreferentialData.addUserName}}</li>
              <li v-if="PreferentialData.updateTime != '0'">
                <b>更新时间：</b>{{$moment.unix(PreferentialData.updateTime-0).format("llll")}}</li>
              <li v-if="PreferentialData.updateUserName">
                <b>更新人：</b>{{PreferentialData.updateUserName}}</li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name: $route.query.type === 'out' ? 'SystemOutPaymentCard' : 'SystemInPaymentCard'}">系统入款卡列表</router-link>
          <router-link :to="{ name:$route.query.type === 'out' ? 'SystemOutPaymentCardCreat' : 'SystemInPaymentCardCreat',query: { siteId: $route.query.siteId, systemBankId: $route.query.systemBankId , isVerify: true , type: $route.query.type}}">编辑</router-link>
          <a href="javascript:" @click="deleteCard">删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PreferentialData: {},
      WebSiteList: [],
      siteName: ""
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {});
  },
  created() {
    this.getData();
  },
  methods: {
    getData(){
      let url = this.$root.HTTP_L.HTTP_ChuRuKuanKaXiangQing;
      let params = {
        siteId: this.$route.query.siteId,
        systemBankId: this.$route.query.systemBankId,
      }
      this.$root
      .HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.PreferentialData = res.data.data;
      });
    },
    deleteCard() {
      this.$Modal.confirm({
        title: "删除",
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ShanChuXiTongChuRuKuanKa,{
              siteId: params.row.siteId,
              systemBankId: this.$route.query.systemBankId
            }).then(
              res => {
                this.$Modal.remove();
                this.$root.modal("success" , "" , "删除成功！")
                this.$router.push({name: $route.query.type === 'out' ? 'SystemOutPaymentCard' : 'SystemInPaymentCard'})
              },
              res => {
                setTimeout(() => {
                  this.$Modal.remove();
                }, 2000);
              }
            );
        }
      });
    },
    WebSiteListfiller(array, element) {
      var arrt = [];
      for (let ac = 0; ac < array.length; ac++) {
        this.WebSiteList.forEach((i, c, v) => {
          if (array[ac] - 0 === this.WebSiteList[c][element]) {
            arrt.push(i.siteName);
          }
        });
      }
      return arrt.join(",");
    }
  },
  mounted() {
    this.$nextTick(() => {
    });
  }
};
</script>

<style lang="less" scoped>
.blockquote{
  b{
    display:inline-block;
    width: 100px;
    text-align: left;
  }
}
</style>
