<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                </h1>
            </div>
            <div class="page-con1">
                <div class="caozuo_btn">
                    <Button size="large" @click="CleanCache" type="primary">清空所有redis缓存</Button>
                </div>
                <div class="blockquote">
                    <ol>
                        <li v-for="(item,index)  in CacheData" :key="index">
                            {{item}}
                            <a href="javascript:" @click="ShanChuHuanCun(item,index)">删除</a>
                        </li>
                    </ol>
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
      CacheData: []
    };
  },
  //进入路由前执行的函数
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_GeShiDaYinHuanCunLieBiao, {
          type: "list",
          isRules: "select"
        })
        .then(res => {
          vm.CacheData = res.data.data;
        })
        .catch(res => {
          vm.CacheData = res.data.data;
        });
    });
  },
  created() {},
  mounted() {},
  methods: {
    CleanCache() {
      this.$Modal.confirm({
        title: "确认删除？",
        content:"清除缓存所有用户和管理员将需重新登录！",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_QingkongSuoYouHuanCun)
            .then(res => {
              this.$root.modal("success" , "" , "清除缓存成功！")
              this.$root.Logout();
              this.$Modal.remove();
            });
        }
      });
    },
    ShanChuHuanCun(item,index) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GenJuHuanCunMingChengJingZhunShanChu, {
          redisName: item
        })
        .then(res => {
          this.$root.modal("success" , "" , "清除缓存成功！")
          this.CacheData.splice(index,1);
        });
    }
  },
  destroyed() {}
};
</script>
<style lang="less" scoped>
</style>
