<template>
    <div class="content-main GameHallManagement-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                    <span>{{GamesPlatformData.platform}}</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <ol>
                        <li>
                            <div style="margin-bottom:10px;">目前状态为
                                <Tag v-if="GamesPlatformData.close=='no'" color="#9f9f9f">关闭</Tag>
                                <Tag v-else color="yellow">开启</Tag>
                                <a v-if="GamesPlatformData.close=='yes'" @click="zhuangtaixiugai()">关闭</a>
                                <a v-else @click="zhuangtaixiugai()">开启</a>
                            </div>
                        </li>
                        <li>
                            转帐额度确认未结案共有
                            <a href="javascript:">0</a> 笔，共计 ￥
                            <a href="javascript:">0</a> 元。
                        </li>
                    </ol>
                </div>
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">回上一页</a>
                    <router-link :to="{name:'GamesPlatformList'}">回到列表</router-link>
                    <a href="javascript:">
                        <Tooltip content="登出并取回与更新钱包" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip>
                        踢除所有会员
                    </a>
                    <a href="javascript:">
                        <Tooltip content="更新钱包" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip>
                        更新所有钱包
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      GamesPlatformData: this.$route.query,
      HasDiscount: true,
      YuEData:{}
    };
  },
  created() {},
      beforeRouteEnter(to, from, next) {
    next(vm => {
      //   vm.$root.DaiLiXiangQing({id:1});
      vm.$root.HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_ChaXunDiSanFangYuE , { gamePlatform: vm.$route.query.platform,uid: vm.$route.query.id})
      .then(res => {
        vm.YuEData = res.data.data;
      });
    //   vm.$root
    //     .HuoQuHuiYuanDengJiRenShu({ levelId: vm.$route.query.levelId })
    //     .then(res => {
    //       vm.HuiYuanRenShu = res.data.data;
    //     });
    });
  },
  methods: {
    zhuangtaixiugai() {
      if (GamesPlatformData.close == "yes") {
          that.$root.HTTP_ALLLINKGET(that.$root.HTTP_L.HTTP_JinYongYouXiPingTai+GamesPlatformData.id)
        // that.$root
        //   .HTTP_JinYongYouXiPingTai(
        //     `/api/games/platform/disabled/${GamesPlatformData.id}`
        //   )
          .then(res => {
            that.$Message.success("禁用成功！");
            that.$Modal.remove();
            // that.table.TableData.data[params.index].close = 'no';
            that.$set(that.table.TableData.data[params.index], "close", "no");
            GamesPlatformData.close = "no";
          })
          .catch(res => {
            that.$Modal.remove();
            that.$set(that.table.TableData.data[params.index], "close", "no");
            GamesPlatformData.close = "no";
          });
      } else {
            that.$root.HTTP_ALLLINKGET(that.$root.HTTP_L.HTTP_QiYongYouXiPingTai+GamesPlatformData.id)
        // that.$root
        //   .HTTP_QiYongYouXiPingTai(`/api/games/game/enabled/${this.GamesPlatformData.id}`)
          .then(res => {
            that.$Message.success("启用成功！");
            that.$Modal.remove();
            // that.table.TableData.data[params.index].close = 'yes';
            that.$set(that.table.TableData.data[params.index], "close", "yes");
            GamesPlatformData.close = "yes";
          })
          .catch(res => {
            that.$Modal.remove();
            that.$set(that.table.TableData.data[params.index], "close", "yes");
            GamesPlatformData.close = "yes";
          });
      }
    }
  }
};
</script>

<style>

</style>
