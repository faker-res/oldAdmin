<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">
                    {{$route.meta.title}}
                    <span v-if="$route.query.isVerify">{{$route.query.level === 'MemberLevelModel' ? '会员等级' : $route.query.level === 'AgencyLevelModel' ? '代理等级'
                        : $route.query.level === 'MemberRefundLevelModel' ? '会员返水等级' : '银行'}}修改</span>
                    <span v-else>{{$route.query.level === 'MemberLevelModel' ? '会员等级' : $route.query.level === 'AgencyLevelModel' ? '代理等级'
                        : '会员返水等级'}}添加</span>
                </h1>
            </div>
            <div class="page-con1">
                <div>
                    <Form ref="CreatLevelForm" :model="CreatLevelForm" :label-width="200">
                        <FormItem>
                            <label slot="label" v-if="$route.query.level == 'MemberLevelModel'">会员等级</label>
                            <label slot="label" v-else-if="$route.query.level == 'AgencyLevelModel'">代理等级</label>
                            <label slot="label" v-else-if="$route.query.level == 'MemberRefundLevelModel'">会员返水等级</label>
                            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfCommon" @listenLevelChange="levelChange"></LevelSelect>
                        </FormItem>
                        <!-- <FormItem v-if="$route.query.level === 'BankList'" label="银行名称">
                            <i-input placeholder="请输入银行名称" v-model="CreatLevelForm.bankName" style="width:260px"></i-input>
                        </FormItem> -->
                        <FormItem v-for="(item,i) in params" :key="i" :label="list[i][item]" v-if="item !== 'levelLabel' && item !== 'levelName' && item !== 'status' && item !== 'default' && item !== 'platform' && item !== 'welfare'">
                            <i-input v-model="CreatLevelForm[item]" style="width:260px"></i-input>
                        </FormItem>
                        <FormItem label="状态">
                            <Select style="width:260px" v-model="CreatLevelForm.status">
                                <Option value="yes">开启</Option>
                                <Option value="no">停用</Option>
                            </Select>
                        </FormItem>
                        <!-- <FormItem label="默认" v-if="$route.query.level !== 'BankList'"> -->
                        <FormItem label="默认">
                            <Select style="width:260px" v-model="CreatLevelForm.default">
                                <Option value="yes">是</Option>
                                <Option value="no">否</Option>
                            </Select>
                        </FormItem>
                        <div v-if="this.$route.query.level === 'AgencyLevelModel'">
                            <div class="page-header">
                                <h2 class="binding">
                                    佣金设置
                                </h2>
                            </div>
                            <FormItem prop="commission_max" label='最大投注额'>
                                <input-number :min="0" style="width:260px" v-model="welfare.commission_max" placeholder="佣金最低投注额(元)"></input-number>
                            </FormItem>
                            <FormItem prop="commission_min" label='最小投注额'>
                                <input-number :min="0" style="width:260px" v-model="welfare.commission_min" placeholder="最高可获得佣金(元)"></input-number>
                            </FormItem>
                            <FormItem prop="commission_scale" label='佣金比例'>
                                <input-number :step="0.1" :min="0" :max="1" style="width:260px" v-model="welfare.commission_scale" placeholder="佣金比例"></input-number>
                            </FormItem>
                            <div class="page-header">
                                <h2 class="binding">
                                    固定日工资设置
                                </h2>
                            </div>
                            <FormItem prop="salary_min" label='最低投注'>
                                <input-number :min="0" style="width:260px" v-model="welfare.salary_min" placeholder="工资最低投注额(元)"></input-number>
                            </FormItem>
                            <FormItem prop="salary_money" label='固定日工资'>
                                <input-number :min="0" style="width:260px" v-model="welfare.salary_money" placeholder="工资最低投注额(元)"></input-number>
                            </FormItem>
                            <div class="page-header">
                                <h2 class="binding">
                                    分红设置
                                </h2>
                            </div>
                            <FormItem prop="share_min" label='最低亏损额'>
                                <input-number :min="0" style="width:260px" v-model="welfare.share_min" placeholder="工资最低投注额(元)"></input-number>
                            </FormItem>
                            <FormItem prop="share_scale" label='分红比例'>
                                <input-number :min="0" style="width:260px" v-model="welfare.share_scale" placeholder="工资最低投注额(元)"></input-number>
                            </FormItem>
                        </div>
                    </Form>
                    <div v-for="(item,i) in platformList" :key="i">
                        <div class="page-header">
                            <h2 class="binding">{{item}}</h2>
                        </div>
                        <Form :label-width="180" inline>
                            <FormItem v-for="(value,index) in platformData[item]" :key="index" :label="value.name">
                                <InputNumber v-model='platform[item][index][value.code]' :min='0' :max='10' style="width:100px"></InputNumber>
                            </FormItem>
                        </Form>
                    </div>
                    <Form :label-width="180">
                        <FormItem>
                            <Button @click="CreatingLevel" :loading='$root.btnLoading' type="primary">确定
                                <span v-if="$route.query.isVerify">修改</span>
                                <span v-else>创建</span>
                            </Button>
                            <Button @click="$router.push({name:'SystemConfigList'})">等级列表</Button>
                            <Button @click="$root.go_back">返回</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from "@/mixins/create";
export default {
  mixins: [mixins],
  data() {
    return {
      btnLoading: false,
      statusShow: true,
      defaultShow: true,
      platformList: [], //游戏大类
      platformData: {}, //动态获取的平台字段
      platform: {}, //提交的平台返水数据
      params: [], //动态获取的字段名
      list: [], //循环获取的字段数组
      welfare: {
        //佣金、日工资、分红
        commission_max: null,
        commission_min: null,
        commission_scale: null,
        salary_min: null,
        salary_money: null,
        share_min: null,
        share_scale: null
      },
      CreatLevelForm: {},
      levelData: {},
    };
  },
  watch: {
    "CreatLevelForm.levelLabel": function(val, oldVal) {
      if (oldVal) {
        if (val !== oldVal) {
          for (let key in this.platform) {
            this.platform[key].forEach(item => {
              for (let i in item) {
                item[i] = Number(val);
              }
            });
          }
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // if (this.$route.query.level !== "BankList"){
      //   this.$refs.LevelSelect.getCommonLevel();
      // }
      this.$refs.LevelSelect.getCommonLevel();
    });
  },
  created() {
    if (this.$route.query.isVerify) {
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      // if (this.$route.query.level === "BankList") {
      //   this.CreatLevelForm["bankName"] = "";
      //   this.CreatLevelForm["status"] = "";
      //   this.CreatLevelForm["id"] = "";
      // } else {
        this.list = [];
        this.levelData = JSON.parse(
          localStorage.getItem(this.$route.query.level)
        );
        this.params = Object.keys(this.levelData);
        this.params.forEach(item => {
          this.$set(this.CreatLevelForm, item, "");
          let obj = {};
          obj[item] = this.levelData[item];
          this.list.push(obj);
          if (item === "levelAlias") {
            this.CreatLevelForm[item] = "暂缺";
          }
        });
        this.CreatLevelForm.default = "no";
        this.CreatLevelForm.status = "yes";
        if (this.levelData.hasOwnProperty("platform")) {
          this.platformList = Object.keys(this.levelData.platform);
          this.platformData = this.levelData.platform;
          let platform = {};
          this.platformList.forEach(item => {
            platform[item] = [];
            this.platformData[item].forEach(v => {
              let obj = {};
              obj[v.code] = 0;
              platform[item].push(obj);
            });
          });
          this.platform = platform;
          for (let key in this.platform) {
            this.platform[key].forEach(item => {
              for (let i in item) {
                item[i] = Number(item[i]);
              }
            });
          }
        }
      // }
    },
    isVerify() {
      // if (this.$route.query.level === "BankList") {
      //   //银行配置
      //   this.$root
      //     .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuYinHangXiangQing, {
      //       id: this.$route.query.id
      //     })
      //     .then(res => {
      //       this.$set(this.CreatLevelForm, "bankName", res.data.bankName);
      //       this.$set(this.CreatLevelForm, "status", res.data.status);
      //       this.$set(this.CreatLevelForm, "id", res.data.id);
      //     });
      // } else {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuDengJiXiangQing, {
            id: this.$route.query.id,
            level: this.$route.query.level
          })
          .then(res => {
            this.init();
            for (let key in this.CreatLevelForm) {
              this.CreatLevelForm[key] = res.data.data[key];
            }
            if (res.data.data.welfare) {
              this.welfare = JSON.parse(res.data.data.welfare);
              for (let key in this.welfare) {
                this.welfare[key] = Number(this.welfare[key]);
              }
            }
            this.$refs.LevelSelect.setDefaultLevel(res.data.data.levelLabel);

            if (res.data.data.platform) {
              this.platform = res.data.data.platform;
              for (let key in this.platform) {
                this.platform[key].forEach(item => {
                  for (let i in item) {
                    item[i] = Number(item[i]);
                  }
                });
              }
            }
          });
      // }
    },
    levelChange(re) {
      this.CreatLevelForm.levelLabel = re.levelLabel;
      this.CreatLevelForm.levelName = re.levelName;
    },
    CreatingLevel() {
      // if (this.$route.query.level === "BankList") {
      //   this.$root.loading();
      //   if (!this.$route.query.isVerify) {
      //     this.$root
      //       .HTTP_ALLLINKPOST(
      //         this.$root.HTTP_L.HTTP_TianJiaYinHang,
      //         this.CreatLevelForm
      //       )
      //       .then(
      //         res => {
      //           this.$Spin.hide();
      //           this.$root.modal("success", "", "添加成功！");
      //         },
      //         res => {
      //           this.$Spin.hide();
      //         }
      //       );
      //   } else {
      //     this.$root
      //       .HTTP_ALLLINKPOST(
      //         this.$root.HTTP_L.HTTP_XiuGaiYinHang,
      //         this.CreatLevelForm
      //       )
      //       .then(
      //         res => {
      //           this.$Spin.hide();
      //           this.$root.modal("success", "", "修改成功！");
      //         },
      //         res => {
      //           this.$Spin.hide();
      //         }
      //       );
      //   }
      // } else {
        if (this.$route.query.level === "AgencyLevelModel") {
          this.CreatLevelForm.welfare = this.welfare;
        }
        let data = {
          level: this.$route.query.level
        };
        if (this.levelData.hasOwnProperty("platform")) {
          this.CreatLevelForm.platform = this.platform;
        }
        Object.assign(data, this.CreatLevelForm);
        this.$root.loading();
        if (!this.$route.query.isVerify) {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_ChuangJianChuShiDengJi,
              data
            )
            .then(
              res => {
                this.$Spin.hide();
                this.$root.modal("success", "", "添加成功！");
              },
              res => {
                this.$Spin.hide();
              }
            );
        } else {
          Object.assign(data, {
            id: this.$route.query.id
          });
          this.$root
            .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiChuShiDengJi, data)
            .then(
              res => {
                this.$Spin.hide();
                this.$root.modal("success", "", "修改成功！");
              },
              res => {
                this.$Spin.hide();
              }
            );
        }
      // }
    }
  }
};
</script>

<style>
</style>