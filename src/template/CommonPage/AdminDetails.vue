<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{sAdmianUserinfo.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <i-col span="24">
            <Card>
              <div slot="title">
                <b>用户名:</b>{{sAdmianUserinfo.userName}}
              </div>
              <div class="card-content">
                <ol>
                  <li>
                    <b>所在组:</b>{{sAdmianUserinfo.groupName}}
                  </li>
                  <li>
                    <b>状态:</b>
                    <Tag v-if="sAdmianUserinfo.status=='no'" color="red">停用</Tag>
                    <Tag v-if="sAdmianUserinfo.status=='yes'" color="green">启用</Tag>
                  </li>
                  <li>
                    <b>创建者:</b>{{sAdmianUserinfo.createUserName}}
                  </li>
                  <li>
                    <b>可用站点:</b>
                    <span v-for="(site,i) in siteName" :key="i">{{site}} | </span>
                  </li>
                  <li>
                    <b>创建IP:</b>{{sAdmianUserinfo.createIp}}
                  </li>
                  <li>
                    <b>上次登录IP:</b>{{sAdmianUserinfo.lastIp}}
                  </li>
                  <li>
                    <b>上次登录时间:</b>{{sAdmianUserinfo.lastTime ? $moment.unix(sAdmianUserinfo.lastTime-0).format("LLL") : "无"}}
                  </li>
                  <li>
                    <b>创建时间:</b>{{$moment.unix(sAdmianUserinfo.time-0).format("LLL")}}
                  </li>
                  <li>
                    <b>更新时间:</b>{{sAdmianUserinfo.updateTime ? $moment.unix(sAdmianUserinfo.updateTime-0).format("LLL") : "无"}}
                  </li>
                </ol>
              </div>
            </Card>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'AdminList'}">管理员列表</router-link>
          <router-link :to="{ name:'AdminCreate',query: { adminId: $route.query.adminId, isVerify:true }}">编辑管理员</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sAdmianUserinfo: {},
      WebSiteList: [],
      siteName: ""
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {});
  },
  created() {
    this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GuanLiYuanZhangHaoXiangQing, {
        adminId: this.$route.query.adminId
      })
      .then(res => {
        this.sAdmianUserinfo = res.data.data;
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZhanDianLieBiao)
          .then(res => {
            this.WebSiteList = res.data.data;
            let siteStr = this.WebSiteListfiller(
              this.sAdmianUserinfo.siteId.split(","),
              "id"
            );
            this.siteName = siteStr.split(",");
          });
      });
  },
  methods: {
    WebSiteListfiller(array, element) {
      var arrt = [];
      for (let ac = 0; ac < array.length; ac++) {
        this.WebSiteList.forEach((i, c, v) => {
          if (array[ac] - 0 == 0) {
            arrt.push(i.siteName);
          } else if (array[ac] - 0 === this.WebSiteList[c][element] - 0) {
            arrt.push(i.siteName);
          }
        });
      }
      if (arrt.length == 0) {
        arrt.push("未知信息");
      }
      return arrt.join(",");
    }
  },
  mounted() {
    this.$nextTick(() => {});
  }
};
</script>
