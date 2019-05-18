<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{ZhanDianXiangQingData.siteName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="blockquote">
          <Row>
            <i-col span="24">
              <Card>
                <div slot="title">
                  <b>站点名称:</b>{{ZhanDianXiangQingData.siteName}}
                </div>
                <div class="card-content">
                  <ul class="ulDetails">
                    <li>
                      <b>站点代码:</b>{{ZhanDianXiangQingData.siteCode}}</li>
                    <li>
                      <b>创建人:</b>{{ZhanDianXiangQingData.createUserName}}</li>
                    <li>
                      <b>更新人:</b>{{ZhanDianXiangQingData.updateUserName?ZhanDianXiangQingData.updateUserName:"暂无"}}</li>
                    <li>
                      <b>创建时间:</b>{{$moment.unix(ZhanDianXiangQingData.created_at-0).format("llll")}}</li>
                  </ul>
                  <line></line>
                  <Row>
                    <i-col span="6">
                      <p>
                        <b>站点配置：</b>
                        <ol>
                          <li>
                            PC注册填写项：{{ConfigData.register.pc}}
                          </li>
                          <li>
                            H5注册填写项：{{ConfigData.register.h5}}
                          </li>
                          <li>
                            APP注册填写项：{{ConfigData.register.app}}
                          </li>
                          <li>
                            网站维护状态配置:
                            <Tag v-if="ConfigData.close.status=='on'" color="green">正常</Tag>
                            <Tag v-if="ConfigData.close.status=='off'" color="red">关闭</Tag>
                          </li>
                          <li>
                            <span v-if="ConfigData.close.status=='off'">维护时间：{{ConfigData.close.timeEnd?ConfigData.close.timeEnd:"暂无"}}</span>
                          </li>
                          <li v-show="ConfigData.service.length">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>地址</th>
                                  <th>状态</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item,index) in ConfigData.service" :key="index">
                                  <td>{{index+1}}</td>
                                  <td>{{item.url}}</td>
                                  <td>
                                    <Tag v-if="item.status=='on'" color="green">正常</Tag>
                                    <Tag v-if="item.status=='off'" color="red">关闭</Tag>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </li>
                          <li>
                            最低存款：{{ConfigData.limit.paymentLimit}}
                          </li>
                          <li>
                            最低取款：{{ConfigData.limit.withdrawalsLimit}}
                          </li>
                          <li>
                            汇款赠送比例：{{ConfigData.limit.paymentBonus}}
                          </li>
                          <li>
                            彩票最低下注金额：{{ConfigData.limit.lotteryBetMin}}
                          </li>
                          <li>
                            彩票最高下注金额：{{ConfigData.limit.lotteryBetMax}}
                          </li>
                        </ol>
                      </p>
                    </i-col>
                    <i-col span="6">
                      <p v-if="ConfigData.Android">
                        <b>Android配置：</b>
                        <ol>
                          <li>版本号：{{ConfigData.Android.version}}</li>
                          <li>更新类型：{{ConfigData.Android.type}}</li>
                          <li>下载链接：{{ConfigData.Android.link}}</li>
                          <li>提示文字：{{ConfigData.Android.tip}}</li>
                        </ol>
                      </p>
                    </i-col>
                    <i-col span="6">
                      <p v-if="ConfigData.IOS">
                        <b>IOS配置：</b>
                        <ol>
                          <li>版本号：{{ConfigData.IOS.version}}</li>
                          <li>更新类型：{{ConfigData.IOS.type}}</li>
                          <li>下载链接：{{ConfigData.IOS.link}}</li>
                          <li>提示文字：{{ConfigData.IOS.tip}}</li>
                        </ol>
                      </p>
                    </i-col>
                    <i-col span="6">
                      <p>
                        <b>其他配置：</b>
                        <ol>
                          <li>主题：{{ConfigData.theme}}</li>
                          <li>APP域名：{{ConfigData.app_domain}}</li>
                          <li>静态资源路径：{{ConfigData.statics}}</li>
                        </ol>
                      </p>
                    </i-col>
                  </Row>
                </div>
              </Card>
            </i-col>
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
      </div>
      <div class="page-boot">
        <div class="b_link">
          <!-- <router-link :to="{  name: 'Statistics',  params: {}}">检视今日报表</router-link> -->
          <!-- <router-link :to="{  name: 'PayMentTransaction',  params: {}}">检视所属会员交易记录</router-link> -->
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
          <!-- <a @click="QuKuanPS">重设取款密码</a> -->
          <!-- <a @click="DengLuPS">重设登录密码</a> -->
          <!-- <a @click="deleatemember">删除该支付方式</a> -->
          <router-link :to="{  name: 'WebSiteModify',query:{id:ZhanDianXiangQingData.id}}">编辑站点</router-link>
          <!-- <router-link :to="{  name: 'PayMentCreate'}">新增支付方式</router-link> -->
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
      beizhuxiugai: true,
      beizhu_zc: "",
      MiMaSheZhiTC: false,
      ZhanDianXiangQingData: {},
      rebateObj: {},
      HuiYuanRenShu: 0,
      ConfigData: {
        register: {},
        limit: {},
        service: {},
        close: {}
      }
    };
  },
  computed: {
    newP() {
      if (this.MiMaSheZhiTC) {
        return this.ChongSheMiMa();
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root
        .HTTP_ALLLINKPOST(vm.$root.HTTP_L.HTTP_ZhanDianXiangQing, {
          systemId: vm.$route.query.id
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
          vm.ZhanDianXiangQingData = res.data.data;
          vm.ConfigData = JSON.parse(res.data.data.siteConfig);
          for (let key in vm.ConfigData) {
            if (vm.ConfigData[key] === "") vm.ConfigData[key] = "-";
          }
          for (let key in vm.ConfigData.Android) {
            if (vm.ConfigData.Android[key] === "")
              vm.ConfigData.Android[key] = "-";
          }
          for (let key in vm.ConfigData.IOS) {
            if (vm.ConfigData.IOS[key] === "") vm.ConfigData.IOS[key] = "-";
          }
        });
    });
  },
  mounted() {
    clipboard = new Clipboard("#fuzhi");
    clipboard.on("success", e => {
      this.$Message.success(`复制 ${e.text} 成功`);
      e.clearSelection();
      this.MiMaSheZhiTC = false;
    });
  },
  methods: {
  },
  destroyed() {
    clipboard.destroy();
  }
};
</script>
<style lang="less" scoped>
.page-boot {
  .b_link {
    a {
      margin-right: 15px;
    }
  }
}
.tablezl {
  margin-top: 13px;
  th {
    width: 100px;
  }
}
</style>
