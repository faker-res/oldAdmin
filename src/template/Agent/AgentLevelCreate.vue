<template>
  <div class="content-main CreateMemberLevel-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Form ref="CreateAgentLevelForm" :model="CreateAgentLevelForm" :rules="rules" :label-width="120">
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>

          <FormItem label="选择等级" prop='levelLabel'>
            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfAgency" v-on:listenLevelChange="levelChange"></LevelSelect>
          </FormItem>
          <FormItem label="等级名称" prop='levelName'>
            <i-input style="width:260px" type="text" v-model="CreateAgentLevelForm.levelName" placeholder="等级名称"></i-input>
          </FormItem>
          <FormItem label="等级别称" prop='levelAlias'>
            <i-input style="width:260px" type="text" v-model="CreateAgentLevelForm.levelAlias" placeholder="等级别称"></i-input>
          </FormItem>
          <div>
            <div class="page-header">
              <h2 class="binding">
                佣金设置
              </h2>
            </div>
            <div style="display:flex;">
              <div>
                <FormItem prop="commission_max" label='最大投注额'>
                  <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.commission_max" placeholder="佣金最低投注额(元)"></input-number>
                </FormItem>
                <FormItem prop="commission_min" label='最小投注额'>
                  <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.commission_min" placeholder="最高可获得佣金(元)"></input-number>
                </FormItem>
                <FormItem prop="commission_scale" label='佣金比例'>
                  <input-number :step="0.1" :min="0" :max="100" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.commission_scale" placeholder="佣金比例"></input-number>%
                </FormItem>
              </div>
              <div style="margin-left:20px">
                发放对象：大股东下直属代理<br />
                发放周期：每天后台自动发放<br />
                计算方式：代理以及代理下级下下级所有会员的打码量来<br />
                例如设置 佣金最大=10000 佣金最小=10 佣金比例=1%<br />
                代理每日总投注额1000 = 1000 * 0.01 = 10<br />
                代理每日总投注额5000 = 5000 * 0.01 = 50<br />
                代理每日总投注额20000 = 10000 * 0.01 = 100<br />
                注：（当超过最大佣金设置时，按设置的最大佣金值来计算。当小于佣金最小时，不计算佣金。
              </div>
            </div>
          </div>
          <div>
            <div class="page-header">
              <h2 class="binding">
                固定日工资设置
              </h2>
            </div>
            <div style="display:flex;">
              <div>
                <FormItem prop="salary_min" label='最低投注'>
                  <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.salary_min" placeholder="工资最低投注额(元)"></input-number>
                </FormItem>
                <FormItem prop="salary_money" label='固定日工资'>
                  <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.salary_money" placeholder="工资最低投注额(元)"></input-number>
                </FormItem>
              </div>
              <div style="margin-left:34px">
                发放对象：大股东下直属代理<br />
                发放周期：每天后台自动发放<br />
                计算方式：代理以及代理下级下下级所有会员的打码量来<br />
                例如设置 工资最低投注=50000 工资=10<br />
                代理每日总投注额1000时 工资为0<br />
                代理每日总投注额50001时 工资为10<br />
              </div>
            </div>
          </div>
          <div>
            <div class="page-header">
              <h2 class="binding">
                分红设置
              </h2>
            </div>
            <div style="display:flex;">
              <div>
                <FormItem prop="share_min" label='最低亏损额'>
                  <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.share_min" placeholder="工资最低投注额(元)"></input-number>
                </FormItem>
                <FormItem prop="share_scale" label='分红比例'>
                  <input-number :min="0" :max="100" type="text" style="width:260px" v-model="CreateAgentLevelForm.welfare.share_scale" placeholder="工资最低投注额(元)"></input-number>%
                </FormItem>
              </div>
              <div style="margin-left:20px">
                发放对象：大股东下直属代理<br />
                发放周期：半月后台手动发放<br />
                计算方式：代理以及代理下级下下级所有会员的总亏损<br />
                例如设置 分红最低亏损=500,000 分红比例=1%<br />
                代理半月总亏损499,99 分红为0<br />
                代理半月总亏损500,000=500,000*0.01 分红为 5,000<br />
                每次结算会累计上次结算的会员的盈利<br />
                如上次结算会员总亏损为负数，本次结算时会扣出上次结算的负亏损
              </div>
            </div>
          </div>
          <div class="page-header">
            <h2 class="binding">
              晋级条件
            </h2>
          </div>
          <FormItem prop="minBetMoney" label='最低投注额'>
            <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.minBetMoney" placeholder="最低投注额(元)"></input-number>
          </FormItem>

          <FormItem prop="minPayMoney" label='最低存款额'>
            <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.minPayMoney" placeholder="最低存款额(元)"></input-number>
          </FormItem>

          <FormItem prop="activeMember" label='活跃玩家数'>
            <input-number :min="0" type="text" style="width:260px" v-model="CreateAgentLevelForm.activeMember" placeholder="活跃玩家数"></input-number>
          </FormItem>

          <div class="page-header">
            <h2 class="binding">
              其他设置
            </h2>
          </div>
          <FormItem label="状态" prop='status'>
            <Select v-model="CreateAgentLevelForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem label='设为默认'>

            <RadioGroup v-model="CreateAgentLevelForm.default">
              <Radio label="no">关闭</Radio>
              <Radio :disabled="isDefault" label="yes">开启</Radio>
            </RadioGroup>

            <span style="vertical-align: -2px;display: inline-block;">
              <Tooltip v-show="isDefault" content="请关闭已经设为默认的等级" placement="top-start">
                <Icon type="help-circled"></Icon>
              </Tooltip>
              <span v-show="isDefault" color="red">请关闭已经设为默认的等级</span>
            </span>
          </FormItem>
          <FormItem label="备注">
            <i-input style="width:260px" type="textarea" :row="4" v-model="CreateAgentLevelForm.remark" placeholder=""></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="$root.btnLoading" @click="handleSubmit('CreateAgentLevelForm')">确认提交</Button>
            <Button type="ghost" @click="$root.go_back">返回上一页</Button>
          </FormItem>
        </Form>
      </div>
      <div class="page-con1">
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
      isDefault: false,
      CreateAgentLevelForm: {
        siteId: null,
        siteName: "",
        levelName: "",
        levelLabel: null,
        levelAlias: null,
        welfare: {
          commission_max: null,
          commission_min: null,
          commission_scale: null,
          salary_min: null,
          salary_money: null,
          share_min: null,
          share_scale: null
        },
        minBetMoney: null,
        minPayMoney: 0,
        activeMember: null,
        minPayMoney: null,
        status: "yes",
        default: "no",
        remark: ""
      },
      rules: {
        siteId: [
          {
            required: true,
            message: "请输入站点id",
            trigger: "blur",
            type: "number"
          }
        ],
        siteName: [
          {
            required: true,
            message: "请输入站点名称",
            trigger: "blur"
          }
        ],
        levelLabel: [
          {
            required: true,
            message: "请输入正确的代理等级",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        levelName: [
          {
            required: true,
            message: "请输入正确的等级名称",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        levelAlias: [
          {
            required: true,
            message: "请输入正确的等级别称",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        welfare: [
          {
            type: "object",
            required: true,
            fields: {
              //需要完整输入才校验通过
              commission_max: {
                type: "number",
                required: true,
                message: "请输入正确的佣金最低投注额",
                trigger: "blur"
              },
              commission_min: {
                type: "number",
                required: true,
                message: "请输入正确的最高佣金",
                trigger: "blur"
              },
              commission_scale: {
                type: "number",
                required: true,
                message: "请输入正确的佣金比例",
                trigger: "blur"
              },
              salary_min: {
                type: "number",
                required: true,
                message: "请输入正确的日工资最低投注额",
                trigger: "blur"
              },
              salary_money: {
                type: "number",
                required: true,
                message: "请输入正确的固定日工资",
                trigger: "blur"
              },
              share_min: {
                type: "number",
                required: true,
                message: "请输入正确的分红最低亏损",
                trigger: "blur"
              },
              share_scale: {
                type: "number",
                required: true,
                message: "请输入正确的分红比例",
                trigger: "blur"
              }
            }
          }
        ],
        minBetMoney: [
          {
            type: "number",
            required: true,
            message: "请输入正确的最低投注额",
            trigger: "blur"
          }
        ],
        minPayMoney: [
          {
            type: "number",
            required: true,
            message: "请输入正确的最低存款额",
            trigger: "blur"
          }
        ],
        activeMember: [
          {
            type: "number",
            required: true,
            message: "请输入正确的活跃玩家数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created () {
    if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.$set(this.SiteNameSelectData, "edit", true);
      }
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.isVerifyFn(this.$route.query.id);
        this.LevelSelectOfAgency.isLevelById = true;
      } else {
        this.LevelSelectOfAgency.isLevelById = false;
      }
    });
  },
  methods: {
    levelChange(re) {
      this.CreateAgentLevelForm.levelLabel = re.levelLabel;
      this.CreateAgentLevelForm.levelName = re.levelName;
    },
    isVerifyFn(eid) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XianShiDaiLiCengJiXiangQing, {
          id: this.$route.query.id,
          siteId: this.$route.query.siteId
        })
        .then(res => {
          for (let key in this.CreateAgentLevelForm) {
            this.CreateAgentLevelForm[key] = res.data.data[key];
          }
          this.CreateAgentLevelForm.id = this.$route.query.id;
          const {
            minBetMoney,
            minPayMoney,
            activeMember
          } = this.CreateAgentLevelForm;
          this.CreateAgentLevelForm.minBetMoney = parseFloat(minBetMoney);
          this.CreateAgentLevelForm.minPayMoney = parseFloat(minPayMoney);
          this.CreateAgentLevelForm.activeMember = parseFloat(activeMember);
          if (res.data.data.welfare) {
            const welfare = {
              ...res.data.data.welfare
            };
            for (let key in this.CreateAgentLevelForm.welfare) {
              this.CreateAgentLevelForm.welfare[key] = parseFloat(welfare[key]);
            }
          }
          const { levelLabel, levelName, levelAlias, siteId } = res.data.data;
          this.$refs.LevelSelect.setDefaultLevel(levelLabel, levelName, levelAlias);
          this.$refs.SiteNameSelect.setDefaultSite(siteId);
        });
    },
    siteChange(re) {
      //站点名称选择
      if (re) {
        this.CreateAgentLevelForm.siteId = re.SiteId;
        this.CreateAgentLevelForm.siteName = re.SiteName;
        if (this.$route.query.isVerify) {
          this.$refs.LevelSelect.getLevelById(re.SiteId, "AgencyLevelModel");
        } else {
          this.$refs.LevelSelect.getCommonLevel();
        }
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$root.loading();
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_TianJiaDaiLiCengJi,
                this.CreateAgentLevelForm
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "代理等级添加成功!"
                });
                this.$refs.SiteNameSelect.InitData();
                this.$refs.LevelSelect.setDefaultLevel("");
                this.CreateAgentLevelForm.activeMember = null;
                this.CreateAgentLevelForm.minPayMoney = null;
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            this.btload = true;
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiDaiLiCengJi,
                this.CreateAgentLevelForm
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "编辑代理等级成功!"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        } else {
          this.$Modal.error({
            title: "提示",
            content: "请填写完善相关信息！!"
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.table {
  th.info {
    background: #d5e8fc;
  }

  th,
  td {
    border: 1px solid #eee;
    line-height: 35px;
    text-align: center;
  }
}
</style>