<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{MemberBankInfo.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <Col>
            <Card>
              <div slot="title">
                <h2>银行卡信息</h2>
              </div>
              <div class="card-content">
                <ol>
                  <li><b>用户名：</b>{{MemberBankInfo.userName}}</li>
                  <li><b>银行姓名：</b>{{MemberBankInfo.cardName}}</li>
                  <li><b>银行名称：</b>{{MemberBankInfo.bankName}}</li>
                  <li>
                    <b>银行卡号：</b>{{MemberBankInfo.cardNum}}
                  </li>
                  <li><b>银行归属地：</b>{{MemberBankInfo.cardAddress}}</li>
                  <li><b>所属站点：</b>{{MemberBankInfo.siteName}}</li>
                  <li><b>会员ID：</b>{{MemberBankInfo.id}}</li>
                  <li>
                    <b>是否默认：</b>
                    <Tag color="red" v-if="MemberBankInfo.default=='no'">否</Tag>
                    <Tag color="green" v-else>是</Tag>
                  </li>
                  <li>
                    <b>银行卡状态：</b>
                    <Tag v-if="MemberBankInfo.status=='no'" color="red">停用</Tag>
                    <a v-if="MemberBankInfo.status=='no'" @click="changeStatus" href="javascript:">启用</a>

                    <Tag v-if="MemberBankInfo.status=='yes'" color="green">启用</Tag>
                    <a v-if="MemberBankInfo.status=='yes'" @click="changeStatus" href="javascript:">停用</a>
                  </li>
                  <li>
                    <b>创建时间：</b>{{$moment.unix(MemberBankInfo.created_at-0).format("LLL")}}</li>
                  <li>
                    <b>更新时间：</b>{{$moment.unix(MemberBankInfo.updated_at-0).format("LLL")}}</li>
                </ol>
              </div>
            </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'MemberBankAccountCreate',query:{siteId: MemberBankInfo.siteId, id:MemberBankInfo.id, isVerify: true}}">编辑该会员银行信息</router-link>
          <a href="javascript:" @click="DeleteMemberBank">删除该条会员银行</a>
          <router-link :to="{name:'MemberBankList'}">会员银行卡列表</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MemberBankInfo: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getMemberBankInfo();
    });
  },
  methods: {
    getMemberBankInfo(){
      let url = this.$root.HTTP_L.HTTP_XiangXiHuiYuanYinHangXinXi;
      let params = { id: this.$route.query.id, siteId: this.$route.query.siteId };
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.MemberBankInfo = res.data.data[0];
      });
    },
    changeStatus() {
      var that = this;
      let tip = this.MemberBankInfo.status == "yes" ? "停用" : "启用";
      this.$Modal.confirm({
        title: "",
        content: `确定${tip}?`,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_XiuGaiHuiYinHangZhuangTai,
              {
                id: this.MemberBankInfo.id,
                status: this.MemberBankInfo.status == "yes" ? "no" : "yes",
                siteId: this.MemberBankInfo.siteId
              }
            )
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.MemberBankInfo.status == "yes"
                ? (this.MemberBankInfo.status = "no")
                : (this.MemberBankInfo.status = "yes");
            })
            .catch(res => {
              this.$Message.error("状态修改失败！");
            });
        }
      });
    },
    DeleteMemberBank() {
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_ShanChuHuiYuanYinHangXinXi,
              { id: this.MemberBankInfo.id, siteId: this.MemberBankInfo.siteId }
            )
            .then(res => {
              this.$Message.success("删除会员银行卡成功！");
              this.$router.push({ name: "MemberBankList" });
              this.$Modal.remove();
            })
            .catch(res => {
              this.$Message.error("删除会员银行卡失败！");
              this.$Modal.remove();
            });
        }
      });
    }
  }
};
</script>

<style>

</style>
