<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{MemberLevelInfo.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <Col span="24">
            <Card>
              <div slot="title">
                <h2>层级信息</h2>
              </div>
              <div class="card-content">
                <ol>
                  <li>
                    <b>层级别称:</b>{{MemberLevelInfo.levelAlias}}</li>
                  <li>
                    <b>层级名称:</b>{{MemberLevelInfo.levelName}}</li>
                  <li>
                    <b>层级人数:</b>{{MemberLevelInfo.memberNum}}</li>
                  <li>
                    <b>网站名称:</b>{{MemberLevelInfo.siteName}}</li>
                  <li>
                    <b>最小充值:</b>{{MemberLevelInfo.minPay}}</li>
                  <li>
                    <b>存款次数:</b>{{MemberLevelInfo.depositNumber}}</li>
                  <li>
                    <b>打码量:</b>{{MemberLevelInfo.betAmount}}</li>
                  <li>
                    <b>打码倍数:</b>{{MemberLevelInfo.multiple}}</li>
                  <li>
                    <b>彩金奖励:</b>{{MemberLevelInfo.giftBonus}}</li>
                  <li>
                    <b>是否默认:</b>
                    <Tag color="#a1a1a1" v-if="MemberLevelInfo.default=='no'">否</Tag>
                    <Tag color="yellow" v-else>是</Tag>
                  </li>
                  <li>
                    <b>状态:</b>
                    <Tag color="red" v-if="MemberLevelInfo.status=='no'">关闭</Tag>
                    <Tag color="green" v-else>开启</Tag>
                  </li>
                  <li>
                    <b>备注:</b>{{MemberLevelInfo.remark ? MemberLevelInfo.remark : "无"}}</li>
                  <li>
                    <b>创建时间:</b>{{$moment.unix(MemberLevelInfo.created_at-0).format("llll")}}</li>
                  <li>
                    <b>更新时间:</b>{{$moment.unix(MemberLevelInfo.updated_at-0).format("llll")}}</li>
                </ol>
              </div>
            </Card>
            </Col>
            <div></div>
          </Row>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <router-link :to="{name:'MemberLevelCreate',query:{siteId:MemberLevelInfo.siteId,id:MemberLevelInfo.id,isVerify:true}}">编辑该会员等级信息</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MemberLevelInfo: {}
    };
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_HuiYuanDengJiXiangQing, {
          siteId: vm.$route.query.siteId,
          id: vm.$route.query.id
        })
        .then(res => {
          vm.MemberLevelInfo = res.data.data;
        });
    });
  },
};
</script>

<style>

</style>
