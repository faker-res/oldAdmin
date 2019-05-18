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
              <b>站点名称：</b>{{PreferentialData.siteName}}</li>
            <li>
              <b>优惠类名：</b>{{PreferentialData.className}}
            </li>
            <li>
              <b>状态：</b>
              <Tag v-if="PreferentialData.classStatus=='no'" color="red">停用</Tag>
              <Tag v-if="PreferentialData.classStatus=='yes'" color="green">启用</Tag>
            </li>
            <li>
              <b>存款页面是否显示：</b>
              <Tag v-if="PreferentialData.showDeposit=='no'" color="red">不显示</Tag>
              <Tag v-if="PreferentialData.showDeposit=='yes'" color="green">显示</Tag>
            </li>
            <li>
              <b>创建时间：</b>{{$moment.unix(PreferentialData.createTime-0).format("llll")}}</li>
            <li>
              <b>创建人：</b>{{PreferentialData.createUser}}</li>
            <li>
              <b>排序：</b>{{PreferentialData.sequence}}</li>
            <li>
              <b>更新时间：</b>{{$moment.unix(PreferentialData.updateTime-0).format("llll")}}</li>
            <li>
              <b>更新人：</b>{{PreferentialData.updateUser}}</li>
            <li>
              <b>备注：</b>{{PreferentialData.classRemarks}}</li>
          </ol>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'PreferentialClass'}">优惠分组列表</router-link>
          <router-link :to="{ name:'PreferentialClassCreat',query: { id: $route.query.preferentialClassId , isVerify:true}}">编辑</router-link>
          <a href="javascript:" @click="deletePreferentialClass">删除</a>
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
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiFenZuXiangQing, {
          preferentialClassId: this.$route.query.preferentialClassId
        })
        .then(res => {
          this.PreferentialData = res.data.data;
          // this.$root
          // .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZhanDianLieBiao)
          // .then(res => {
          // this.WebSiteList = res.data.data.data;
          // this.siteName = this.WebSiteListfiller(this.PreferentialData.siteId.split(','),'id')
          // });
        });
    },
    methods: {
      deletePreferentialClass() {
        var that = this;
        this.$Modal.confirm({
          content: "确认删除？",
          loading: true,
          onOk: () => {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiFenZuShanChu, {
                preferentialClassId: this.PreferentialData.id
              })
              .then(res => {
                this.$Modal.remove();
                this.$root.modal("success", "", "删除成功！")
                this.$root.go_back();
              })
              .catch(res => {
                this.$Modal.remove();
              });
          }
        });
      },
      // WebSiteListfiller(array, element) {
      //   var arrt = [];
      //   for (let ac = 0; ac < array.length; ac++) {
      //     this.WebSiteList.forEach((i, c, v) => {
      //       if (array[ac] - 0 === this.WebSiteList[c][element]) {
      //         arrt.push(i.siteName);
      //       }
      //     });
      //   }
      //   console.log(arrt.join(","));
      //   return arrt.join(",");
      // }
    },
    mounted() {
      this.$nextTick(() => {});
    }
  };
</script>

<style lang="less" scoped>
  .blockquote {
    b {
      display: inline-block;
      width: 130px;
      text-align: left;
    }
  }
</style>