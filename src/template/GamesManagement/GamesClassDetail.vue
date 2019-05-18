<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <ol>
            <li>
              <b>游戏分类名称：</b>{{GamesClassInfo.name}}</li>
            <li>
              <b>游戏分类编号：</b>{{GamesClassInfo.code}}
            </li>
            <li>
              <b>创建时间：</b>{{this.$moment(GamesClassInfo.created_at * 1000).format("LLL")}}</li>
            <li>
              <b>创建人：</b>{{GamesClassInfo.created_user}}</li>
            <li>
              <b>平台：</b>{{GamesClassInfo.platform == "sport" ? "体育" : GamesClassInfo.platform == "slot" ? "电子" : GamesClassInfo.platform == "chess" ? "棋牌" : GamesClassInfo.platform == "lottery" ? "彩票" : GamesClassInfo.platform == "vr_lottery" ? "VR彩票" : GamesClassInfo.platform == "live_casino" ? "真人" : '其他'}}</li>
            <li>
                <b>序号：</b>{{GamesClassInfo.sequence}}
            </li>
            <li>
              <b>状态：</b>
              <Tag v-if="GamesClassInfo.status=='no'" color="red">停用</Tag>
              <!-- <a v-if="GamesClassInfo.status=='no'" @click="ZhuangTai" href="javascript:">启用</a> -->

              <Tag v-if="GamesClassInfo.status=='yes'" color="green">启用</Tag>
              <!-- <a v-if="GamesClassInfo.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a> -->
            </li>
            <!-- <li>
              <b>上次登录时间</b>：{{GamesClassInfo.uid}}</li> -->
            <li>
              <b>更新时间：</b>{{GamesClassInfo.updated_at ? this.$moment(GamesClassInfo.updated_at * 1000).format("LLL") : "无"}}</li>
            <li>
              <b>更新者：</b>{{GamesClassInfo.updated_user ? GamesClassInfo.updated_user : "无"}}</li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <!-- <router-link :to="{name:'ModifyMemberBankAccount',query:{id:GamesClassInfo.id}}">当前会员所有银行卡</router-link> -->
          <router-link :to="{name:'CreateGamesClass',query:{id:GamesClassInfo.id , isVerify:true }}">编辑该游戏分类</router-link>
          <a href="javascript:" @click="DeleteGameClass">删除该游戏分类</a>
          <router-link :to="{name:'GamesClassManger'}">游戏分类列表</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GamesClassInfo: {}
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_YouXiFenLeiXiangQing, {
          gameClassId: vm.$route.query.id
        })
        .then(res => {
          vm.GamesClassInfo = res.data.data;
          console.log(vm.GamesClassInfo)
        });
    });
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$route.query);
    });
  },
  methods: {
    DeleteGameClass() {
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_ShanChuYouXiFenLei,
              { gameClassId: this.GamesClassInfo.id }
            )
            .then(res => {
              this.$root.modal("success" , "" , "删除游戏分类成功！")
              this.$router.push({ name: "GamesClassManger" });
              this.$Modal.remove()
            })
            .catch(res => {
              this.$root.modal("error" , "" , "删除游戏分类失败！")
              this.$Modal.remove()
            });
        }
      });
    }
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