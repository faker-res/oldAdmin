<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{MemberBounsData.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <Col span="24">
            <Card>
              <div slot="title">
               <h2>返水等级信息</h2> 
              </div>
              <div class="card-content">
                <ul class="ulDetails">
                  <li>
                    <b>等级代码：</b>{{MemberBounsData.levelLabel}}</li>
                  <li>
                    <b>站点ID：</b>{{MemberBounsData.siteId}}</li>
                  <li>
                    <b>最低下注金额：</b>{{MemberBounsData.lessBetAmount}}</li>
                  <li>
                    <b>默认返水：</b>
                    <Tag :color="MemberBounsData.default==='yes' ? 'yellow' : '#ddd'">
                      {{MemberBounsData.default=== "yes" ? "是" : "否"}}
                    </Tag>
                  </li>
                  <li>
                    <b>返水等级：</b>{{MemberBounsData.levelName}}</li>
                  <li>
                    <b>站点名称：</b>{{MemberBounsData.siteName}}</li>
                  <li>
                    <b>最大返水金额：</b>{{MemberBounsData.maxBonusAmonut}}</li>
                  <li>
                    <b>状态：</b>
                    <span v-if="MemberBounsData.status=='no'">
                      <Tag color="red">停用</Tag>
                      <a @click="ZhuangTai" href="javascript:">启用</a>
                    </span>
                    <span v-if="MemberBounsData.status=='yes'">
                      <Tag v-if="MemberBounsData.status=='yes'" color="green">启用</Tag>
                      <a v-if="MemberBounsData.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a>
                    </span>
                  </li>
                  <li>
                    <b>返水名称:</b>{{MemberBounsData.levelAlias}}</li>
                  <li>
                    <b>备注：</b>{{MemberBounsData.remark?MemberBounsData.remark:"暂无"}}</li>
                </ul>
                <div class="time">
                  <span>
                    <b>创建时间：</b>{{$moment.unix(MemberBounsData.created_at-0).format("llll")}}</span>
                  <span>
                    <b>更新时间：</b>{{$moment.unix(MemberBounsData.updated_at-0).format("llll")}}</span>
                </div>
              </div>
            </Card>
            </Col>
          </Row>
        </div>
        <div class="blockquote">
          <Row>
            <Col span="24">
              <Card>
                <div slot="title">
                  <h2>返水信息</h2>
                </div>
                <div class="card-content">
                  <div v-for="(item, index) in MemberBounsData.platform" :key="index">
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
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{  name: 'ModifyMemberBouns',  query: {id:MemberBounsData.id,isVerify: true}}">编辑会员信息</router-link>
          <router-link :to="{  name: 'MemberBounsCreate'}">新增会员返水信息</router-link>
        </div>
      </div>
    </div>
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
      MemberBounsData: {},
      HuiYuanRenShu: 0,
    };
  },
  mounted() {
    clipboard = new Clipboard("#fuzhi");
    clipboard.on("success", e => {
      this.$Message.success(`复制 ${e.text} 成功`);
      e.clearSelection();
    });
    this.getBounsDetails();
  },
  methods: {
    getBounsDetails(){
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanFanShuiXiangQing, {
          id: this.$route.query.id,
          siteId: this.$route.query.siteId
        })
        .then(res => {
          this.MemberBounsData = res.data.data;
        });
    },
    ZhuangTai() {
      var that = this;
      let tip = this.MemberBounsData.status === "yes" ? "停用" : "启用";
      this.$Modal.confirm({
        title: "提示",
        content: `确定${tip}?`,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_HuiYuanFanShuiZhuangTaiXiuGai,
              {
                id: this.MemberBounsData.id,
                status: this.MemberBounsData.status === "yes" ? "no" : "yes",
                siteId: this.MemberBounsData.siteId
              }
            )
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.MemberBounsData.status == "yes"
                ? (this.MemberBounsData.status = "no")
                : (this.MemberBounsData.status = "yes");
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
</style>
