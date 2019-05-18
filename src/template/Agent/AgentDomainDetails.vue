<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">
                    {{$route.meta.title}}
                    <span>{{this.$route.query.admin}}</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <Row>
                        <Col span="24">
                        <Card>
                            <div slot="title">
                                <h2>域名信息</h2>
                            </div>
                            <div class="card-content">
                                <ol>
                                    <li><b>站点ID：</b>{{AgentDomainDetails.siteId}}</li>
                                    <li><b>代理ID：</b>{{AgentDomainDetails.uid}}</li>
                                    <li><b>域名ID: </b>{{AgentDomainDetails.id}}</li>
                                    <li><b>站点名称:</b>{{AgentDomainDetails.siteName}}</li>
                                    <li><b>代理代码：</b>{{AgentDomainDetails.agencyCode}}</li>
                                    <li><b>代理名称：</b>{{AgentDomainDetails.userName}}</li>
                                    <li><b>代理域名：</b>{{AgentDomainDetails.domain}}</li>
                                    <li>
                                        <b>状态 :</b>
                                        <Tag v-if="AgentDomainDetails.status=='no'" color="red">停用</Tag>
                                        <a v-if="AgentDomainDetails.status=='no'" @click="ZhuangTai" href="javascript:">启用</a>

                                        <Tag v-if="AgentDomainDetails.status=='yes'" color="green">启用</Tag>
                                        <a v-if="AgentDomainDetails.status=='yes'" @click="ZhuangTai" href="javascript:">停用</a>
                                    </li>
                                    <li>
                                        <b>创建时间：</b>{{$moment.unix(AgentDomainDetails.created_at-0).format("LLLL")}}
                                    </li>
                                    <li>
                                        <b>更新时间：</b>{{$moment.unix(AgentDomainDetails.updated_at-0).format("LLLL")}}</li>
                                </ol>

                            </div>
                        </Card>
                        </Col>
                    </Row>
                </div>
                <!-- 彩票返点 -->
                <div class="blockquote">
                    <Collapse>
                        <Panel>
                            <span>彩票返点</span>
                            <div slot="content">
                                <div v-for="(item, key, index) in rebateObj" :key="index">
                                    <div class="page-header">
                                        <h3 class="binding">
                                            <b>{{key}}</b>
                                        </h3>
                                    </div>
                                    <ul class="ulDetailsDlCJ">
                                        <li v-for="(v,c) in item" :key="c">
                                            <span>
                                                <b class="key">
                                                    {{v.name}} :
                                                </b>
                                                <span class="value">
                                                    {{v.rebate}}%
                                                </span>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div class="blockquote">
                    <Collapse>
                        <Panel>
                            <span>返水信息</span>
                            <div slot="content">
                                <div v-for="(item, index) in AgentDomainDetails.platform" :key="index">
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
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div class="page-boot">
                <div class="b_link">
                    <a href="javascript:" @click="$root.go_back">返回上一页</a>
                    <a href="javascript:" @click="DeleteDomain">删除该域名信息</a>
                    <a href="javascript:" @click="$router.push({name:'AgentDomainCreate',query: {id: AgentDomainDetails.id,siteId: AgentDomainDetails.siteId,isVerify: true}})">编辑该域名信息</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      AgentDomainDetails: {},
      rebateObj: {}
    };
  },
  //组件守卫  进入前获取 无this实例
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_DaiLiYuMingXiangXiXinXi, {
          id: vm.$route.query.id,
          siteId: vm.$route.query.siteId
        })
        .then(res => {
          res.data.data.rebate = JSON.parse(res.data.data.rebate);
          vm.rebateObj = { ...vm.$root.Lottclass };
          for (let keyL in vm.rebateObj) {
            vm.rebateObj[keyL].forEach(item => {
              for (let keyR in res.data.data.rebate) {
                if (keyR == item.id) {
                  item.rebate = res.data.data.rebate[keyR];
                }
              }
            });
          }
          vm.AgentDomainDetails = res.data.data;
        });
    });
  },
  mounted() {
    this.$nextTick(() => {
    });
  },
  methods: {
    DeleteDomain() {
      var that = this;
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ShanChuDaiLiYuMing, {
              id: that.AgentDomainDetails.id
            })
            .then(res => {
              this.$Modal.remove();
              this.$Message.info("代理删除成功！");
              this.$root.go_back();
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    ZhuangTai() {
      var that = this;
      let tip =
        this.AgentDomainDetails.status == "yes" ? "确定停用？" : "确定启用？";
      this.$Modal.confirm({
        title: "提示",
        content: tip,
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_DomainStatus, {
              id: this.AgentDomainDetails.id,
              status: this.AgentDomainDetails.status == "yes" ? "no" : "yes",
              siteId: this.AgentDomainDetails.siteId
            })
            .then(res => {
              this.$Message.success("状态修改成功！");
              this.AgentDomainDetails.status == "yes"
                ? (this.AgentDomainDetails.status = "no")
                : (this.AgentDomainDetails.status = "yes");
            })
            .catch(res => {
              this.$Message.error("状态修改失败！");
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
