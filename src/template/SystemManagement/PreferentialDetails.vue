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
            <li>
              <b>优惠名称：</b>{{PreferentialData.title}}
            </li>
            <li>
              <b>站点名称：</b> {{PreferentialData.siteName}}
            </li>
            <li>
              <b>状态：</b>
              <Tag v-if="PreferentialData.status=='no'" color="red">停用</Tag>
              <Tag v-if="PreferentialData.status=='yes'" color="green">启用</Tag>
            </li>
            <li>
              <b>优惠内容：</b><div v-html="PreferentialData.content"></div>
            </li>
            <li>
              <b>优惠Banner：</b><img :src="PreferentialData.img" />
            </li>
            <li>
              <b>优惠时间：</b>{{$moment.unix(PreferentialData.star_date-0).format("llll")}}-{{$moment.unix(PreferentialData.end_date-0).format("llll")}}
            </li>
            <li>
              <b>允许游戏分类：</b> {{PreferentialData.allow_game}}
            </li>
            <li>
              <b>禁止游戏分类：</b>{{PreferentialData.shield_game}}
            </li>
            <li>
              <b>优惠活动链接：</b><a target="_blank" :href="PreferentialData.jump_link">{{PreferentialData.jump_link}}</a>
            </li>
            <li>
              <b>是否显示会员中心：</b>
              <Tag v-if="PreferentialData.showMemberCenter=='no'" color="red">否</Tag>
              <Tag v-if="PreferentialData.showMemberCenter=='yes'" color="green">是</Tag>
            </li>
            <li>
              <b>排序：</b>{{PreferentialData.sequence}}
            </li>
            <li>
              <b>创建方式：</b>{{PreferentialData.type}}
            </li>
            <li>
              <b>创建人：</b>{{PreferentialData.createUserName}}
            </li>
            <li>
              <b>更新人：</b>{{PreferentialData.updateUserName ? PreferentialData.updateUserName : "无"}}
            </li>
            <li>
              <b>程序处理模块：</b>{{PreferentialData.url}}
            </li>
            <li>
              <b>备注：</b>{{PreferentialData.remarks}}
            </li>
            <li>
              <b>创建时间：</b>{{$moment.unix(PreferentialData.createTime-0).format("llll")}}
            </li>
            <li>
              <b>更新时间：</b>{{PreferentialData.updateTime ? $moment.unix(PreferentialData.updateTime-0).format("llll") : "无"}}
            </li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'PreferentialList'}">优惠列表</router-link>
          <router-link :to="{ name:'PreferentialCreat',query: { preferentialId: $route.query.preferentialId , isVerify:true}}">编辑</router-link>
          <a href="javascript:" @click="deletePreferential">删除</a>
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
    this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiXiangQing, {
        preferentialId: this.$route.query.preferentialId
      })
      .then(res => {
        this.PreferentialData = res.data.data;
        // this.$root
        //   .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZhanDianLieBiao)
        //   .then(res => {
        //     this.WebSiteList = res.data.data.data;
        //     // this.siteName = this.WebSiteListfiller(this.PreferentialData.siteId.split(','),'id')
        //   });
      });
  },
  methods: {
    deletePreferential() {
      var that = this;
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiShanChu, {
              preferentialClassId: this.PreferentialData.id
            })
            .then(res => {
              this.$Modal.remove();
                this.$root.modal("success" , "" , "删除成功！")
              // this.$Message.info("删除成功！");
              this.$root.go_back();
            })
            .catch(res => {
              this.$Modal.remove();
            });
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
    width: 130px;
    text-align: left;
  }
}
</style>

