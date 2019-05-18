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
              <b>游戏名称：</b>{{GamesInfo.name}}</li>
            <li>
              <b>游戏编号：</b>{{GamesInfo.code}}
            </li>
            <li>
              <b>所属分类：</b>{{GamesInfo.className}}</li>
            <li>
              <b>创建时间：</b>{{this.$moment.unix(GamesInfo.created_at - 0).format("LLL")}}</li>
            <li>
              <b>创建人：</b>{{GamesInfo.created_user}}</li>
            <li>
              <b>设备：</b>:{{GamesInfo.devices == 'all'?'全部':GamesInfo.devices=='pc'?'PC':GamesInfo.devices=='h5'?'H5':GamesInfo.devices=='android'?'安卓':GamesInfo.devices=='ios'?'IOS':'其他'}}</li>
            <li>
              <b>图片：</b><img :src='GamesInfo.images' /></li>
            <li>
              <b>标签：</b>{{GamesInfo.tag == "hot" ? "热门" : GamesInfo.tag == "recommond" ? "推荐" : GamesInfo.tag == "favorite" ? "常用" : GamesInfo.tag}}</li>
            <li>
              <b>平台：</b>{{GamesInfo.platform == "sport" ? "体育" : GamesInfo.platform == "slot" ? "电子" : GamesInfo.platform == "chess" ? "棋牌" : GamesInfo.platform == "lottery" ? "彩票" : GamesInfo.platform == "vr_lottery" ? "VR彩票" : GamesInfo.platform == "live_casino" ? "真人" : '其他'}}</li>
            <li>
                <b>序号：</b>{{GamesInfo.sequence}}
            </li>
            <li>
                <b>特殊设置：</b>{{GamesInfo.special_setting}}
            </li>
            <li>
              <b>状态：</b>
              <Tag v-if="GamesInfo.status=='no'" color="red">停用</Tag>
              <!-- <a v-if="GamesInfo.status=='no'" @click="ZhuangTai" href="javascript:">启用</a> -->

              <Tag v-if="GamesInfo.status=='yes'" color="green">启用</Tag>
              <!-- <a v-if="GamesInfo.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a> -->
            </li>
            <!-- <li>
              <b>上次登录时间</b>：{{GamesInfo.uid}}</li> -->
            <li>
              <b>更新时间：</b>{{this.$moment.unix(GamesInfo.updated_at - 0).format("LLL")}}</li>
            <li>
              <b>更新者：</b>{{GamesInfo.updated_user}}</li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <!-- <router-link :to="{name:'ModifyMemberBankAccount',query:{id:GamesInfo.id}}">当前会员所有银行卡</router-link> -->
          <!-- <router-link :to="{name:'UpdateLotteryTime',query:{lotteryId: GamesInfo.id,name: GamesInfo.name}}">时间设置</router-link> -->
          <!-- <router-link :to="{name:'UpdateLotteryOdds',query:{id: GamesInfo.id, name: GamesInfo.name}}">赔率设置</router-link> -->
          <router-link :to="{name:'GamesVerify',query:{id:GamesInfo.id}}">编辑该游戏</router-link>
          <a href="javascript:" @click="DeleteGame">删除该游戏</a>
          <router-link :to="{name:'GamesManger'}">游戏列表</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GamesInfo: {}
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_YouXiXiangQing, {
          gameId: vm.$route.query.id
        })
        .then(res => {
          vm.GamesInfo = res.data.data;
          // console.log(vm.GamesInfo)
        });
    });
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$route.query);
    });
  },
  methods: {
    DeleteGame() {
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_ShanChuYouXi,
              { gameId: this.GamesInfo.id }
            )
            .then(res => {
              this.$root.modal("success" , "" , "删除游戏成功！")
              this.$router.push({ name: "GamesManger" });
              this.$Modal.remove()
            })
            .catch(res => {
              this.$root.modal("error" , "" , "删除游戏失败！")
              this.$Modal.remove()
            });
        }
      });
      // this.$root
      //   .HTTP_ShanChuHuiYuanYinHangXinXi({ id: this.GamesInfo.id })
      //   .then(res => {
      //     this.$Message.success("删除会员银行信息成功！");
      //     this.$router.push({ name: "MemberBankList" });
      //   })
      //   .catch(res => {
      //     this.$Message.error("删除会员失败！");
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
.blockquote{
  b{
    display:inline-block;
    width: 80px;
    text-align: left;
  }
}
</style>
