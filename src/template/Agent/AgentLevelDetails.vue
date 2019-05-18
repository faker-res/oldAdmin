<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{AgentLevelInfo.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <i-col span="24">
            <Card>
              <div slot="title">
                <h2>层级信息</h2>
              </div>
              <div class="card-content">
                <ol>
                  <li><b>层级名称:</b>{{AgentLevelInfo.levelName}}</li>
                  <li><b>层级别称:</b>{{AgentLevelInfo.levelAlias}}</li>
                  <li>
                    <b>所属站点:</b>{{AgentLevelInfo.siteName}}</li>
                  <li>
                    <b>层级别称:</b>{{AgentLevelInfo.levelAlias}}</li>
                  <li>
                    <b>代理等级:</b>{{AgentLevelInfo.levelLabel}}</li>
                  <!-- <li> -->
                    <!-- <b>佣金比例:</b>{{AgentLevelInfo.ratio}}</li> -->
                  <!-- <li>
                    <b>玩家个数:</b>{{AgentLevelInfo.activeMember}}</li> -->
                  <!-- <li>
                    <b>最小投注额:</b>{{AgentLevelInfo.minBetMoney}}</li> -->
                  <!-- <li>
                    <b>最小存款额:</b>{{AgentLevelInfo.minPayMoney}}</li> -->
                  <li>
                    <b>是否默认:</b>
                    <Tag color="#a1a1a1" v-if="AgentLevelInfo.default=='no'">否</Tag>
                    <Tag color="yellow" v-else>是</Tag>
                  </li>
                  <li>
                    <b>状态:</b>
                    <Tag color="red" v-if="AgentLevelInfo.status=='no'">关闭</Tag>
                    <Tag color="green" v-else>开启</Tag>
                  </li>
                  <li>
                    <b>创建时间:</b>{{$moment.unix(AgentLevelInfo.created_at-0).format("llll")}}</li>
                  <li>
                    <b>更新时间:</b>{{$moment.unix(AgentLevelInfo.updated_at-0).format("llll")}}</li>
                  <li>
                    <b>备注:</b>{{AgentLevelInfo.remark}}</li>
                </ol>
                <div class="page-header">
                  <h2 class="binding">
                    晋级条件
                  </h2>
                  <ol>
                    <li>
                      <b>最低投注额：</b>{{AgentLevelInfo.minBetMoney}}</li>
                    <li>
                      <b>最低存款额：</b>{{AgentLevelInfo.minPayMoney}}</li>
                    <li>
                      <b>活跃玩家数：</b>{{AgentLevelInfo.activeMember}}</li>
                  </ol>
                </div>
                <div class="page-header">
                  <h2 class="binding">
                    佣金设置
                  </h2>
                  <ol v-if="Object.keys(AgentLevelInfo).length && AgentLevelInfo.welfare">
                    <li>
                      <b>最大投注额：</b>{{AgentLevelInfo.welfare.commission_max}}
                    </li>
                    <li>
                      <b>最小投注额：</b>{{AgentLevelInfo.welfare.commission_min}}
                    </li>
                    <li>
                      <b>佣金比例：</b>{{AgentLevelInfo.welfare.commission_scale}}
                    </li>
                  </ol>
                  <ol v-else><li>没有数据</li></ol>
                </div>
                <div class="page-header">
                  <h2 class="binding">
                    固定日工资设置
                  </h2>
                  <ol v-if="Object.keys(AgentLevelInfo).length && AgentLevelInfo.welfare">
                    <li>
                      <b>最低投注：</b>{{AgentLevelInfo.welfare.salary_min}}
                    </li>
                    <li>
                      <b>最低投注：</b>{{AgentLevelInfo.welfare.salary_money}}
                    </li>
                  </ol>
                  <ol v-else><li>没有数据</li></ol>
                </div>
                <div class="page-header">
                  <h2 class="binding">
                    分红设置
                  </h2>
                  <ol v-if="Object.keys(AgentLevelInfo).length && AgentLevelInfo.welfare">
                    <li>
                      <b>最低亏损额：</b>{{AgentLevelInfo.welfare.share_min}}</li>
                    <li>
                      <b>分红比例：</b>{{AgentLevelInfo.welfare.share_scale}}</li>
                  </ol>
                  <ol v-else><li>没有数据</li></ol>
                </div>
              </div>
            </Card>
            </i-col>
          </Row>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'AgentLevelCreate',query:{siteId:AgentLevelInfo.siteId,id:AgentLevelInfo.id,isVerify:true}}">编辑该代理等级信息</router-link>
          <!-- <a href="javascript:" @click="DeleteMemberBank">删除该代理等级信息</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        AgentLevelInfo: {}
      };
    },
    beforeRouteEnter(to, form, next) {
      next(vm => {
        vm.$root
          .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_XianShiDaiLiCengJiXiangQing, {
            id: vm.$route.query.id,
            siteId: vm.$route.query.siteId
          })
          .then(res => {
            vm.AgentLevelInfo = res.data.data;
          });
      });
    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.$route.query);
      });
    },
    methods: {
      DeleteMemberBank() {
        this.$Modal.confirm({
          content: "确认删除？",
          loading: true,
          onOk: () => {
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ShanChuDaiLiCengJi, {
                id: this.$route.query.id
              })
              .then(
                res => {
                  this.$Modal.remove();
                  this.$Message.info("代理等级删除成功！");
                  this.$root.go_back();
                },
                res => {
                  setTimeout(() => {
                    this.$Modal.remove();
                  }, 2000);
                }
              );
          }
        });
      }
    }
  };
</script>

<style>

</style>