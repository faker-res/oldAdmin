<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <span>{{$route.query.level === "MemberLevelModel" ? "会员等级" : $route.query.level === "AgencyLevelModel" ? "代理等级" : "会员返水等级"}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <!-- <div class="blockquote">
          <ol>
            <li 
              v-for="(item,i) in infoList" 
              :key="i">
              <span v-if="item !== 'status' && item !== 'default' && item !== 'platform' && item !== 'welfare'"><b>{{levelData[item]}}：</b>{{levelInfo[item] ? levelInfo[item] : "无"}}</span>
              <span v-if="item === 'welfare' && levelInfo[item]">
                <b>{{levelData[item]}}：</b>
                <span>最大投注额：{{levelInfo[item]['commission_max']}}，</span>
                <span>最小投注额：{{levelInfo[item]['commission_min']}}，</span>
                <span>佣金比例：{{levelInfo[item]['commission_scale']}}，</span>
                <span>最低投注：{{levelInfo[item]['salary_min']}}，</span>
                <span>固定日工资：{{levelInfo[item]['salary_money']}}，</span>
                <span>最低亏损额：{{levelInfo[item]['share_min']}}，</span>
                <span>分红比例：{{levelInfo[item]['share_scale']}}</span>
              </span>
            </li>
            <li>
              <b>是否默认：</b>
              <Tag color="#a1a1a1" v-if="levelInfo.default=='no'">否</Tag>
              <Tag color="yellow" v-else>是</Tag>
            </li>
            <li>
              <b>状态：</b>
              <Tag color="red" v-if="levelInfo.status=='no'">关闭</Tag>
              <Tag color="green" v-else>开启</Tag>
            <li>
              <b>创建时间：</b>{{$moment.unix(levelInfo.created_at-0).format("llll")}}</li>
            <li>
              <b>更新时间：</b>{{levelInfo.updated_at ? $moment.unix(levelInfo.updated_at-0).format("llll") : "无"}}</li>
          </ol>
        </div>
        <div class="blockquote" v-if="$route.query.level === 'MemberRefundLevelModel'">
          <h2>平台</h2>
          <div v-for="(item, key, index) in levelInfo.platform" :key="index">
            <div class="page-header">
              <h3 class="binding">
                <b>{{key}}</b>
              </h3>
            </div>
            <ul class="ulDetailsDlCJ">
              <li v-for="(jiushi,ind) in item" :key="ind">
                <span v-for="(itemc,keyc,indexc) in jiushi" :key="indexc">
                  <b class="key">
                    {{$root.AMMLevelData.platform[keyc]}} :
                  </b>
                  <span class="value">
                    {{itemc}}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelInfo: {},
      levelData:{},
      infoList:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.levelData = JSON.parse(localStorage.getItem(this.$route.query.level));
      // this.infoList = Object.keys(this.levelData)
      this.getLevelDetails();
    });
  },
  methods: {
    getLevelDetails(){
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuDengJiXiangQing , { id: this.$route.query.id })
      .then(res => {
        console.log(111)
          this.levelInfo = res.data.data;
          // this.levelInfo.welfare = JSON.parse(this.levelInfo.welfare)
      });
    }
  }
};
</script>

<style lang="less" scoped>
.blockquote{
  b{
    display:inline-block;
    width: 180px;
    text-align: left;
  }
}
</style>
