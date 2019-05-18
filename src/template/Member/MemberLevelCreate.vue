<template>
  <div class="content-main CreateMemberLevel-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Form ref="CreatMemberBerForm" :model="CreatMemberBerForm" :rules="rules" :label-width="120">
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>

          <FormItem label="选择等级" prop='levelLabel'>
            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" v-on:listenLevelChange="levelChange"></LevelSelect>
          </FormItem>

          <FormItem label="等级別称" prop='levelAlias'>
            <i-input v-model="CreatMemberBerForm.levelAlias" style="width: 260px" placeholder="请输入等级别称"></i-input>
          </FormItem>

          <FormItem label="打码量" prop='betAmount'>
            <i-input number v-model="CreatMemberBerForm.betAmount" style="width: 260px" placeholder="打码倍数整数建议0-30"></i-input>
          </FormItem>

          <FormItem label="存款次数" prop='depositNumber'>
            <i-input number v-model="CreatMemberBerForm.depositNumber" style="width: 260px" placeholder="请输入存款次数"></i-input>
          </FormItem>

          <FormItem label="彩金奖励" prop='giftBonus'>
            <i-input number v-model="CreatMemberBerForm.giftBonus" style="width: 260px" placeholder="请输入彩金奖励"></i-input>
          </FormItem>

          <FormItem label="取款打码倍数" prop='multiple'>
            <i-input number v-model="CreatMemberBerForm.multiple" style="width: 260px" placeholder="请输入取款打码倍数"></i-input>
          </FormItem>

          <FormItem label="累计存款金额" prop='minPay'>
            <i-input number v-model="CreatMemberBerForm.minPay" style="width: 260px" placeholder="请输入累计存款金额"></i-input>
          </FormItem>

          <FormItem label="状态" prop='status'>
            <Select v-model="CreatMemberBerForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem label='设为默认'>

            <RadioGroup v-model="CreatMemberBerForm.default">
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
            <i-input style="width:260px" type="textarea" :row="4" v-model="CreatMemberBerForm.remark" placeholder=""></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" v-if="$route.query.isVerify" :loading='$root.btnLoading' @click="handleSubmit('CreatMemberBerForm')">修改</Button>
            <Button type="primary" v-else :loading='$root.btnLoading' @click="handleSubmit('CreatMemberBerForm')">创建</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">返回</Button>
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
      btload: false,
      isDefault: false,
      CreatMemberBerForm: {
        siteId: null,
        siteName: "",
        levelName: "",
        minPay: "",
        status: "yes",
        default: "no",
        remark: "备注",
        levelLabel: "",
        levelAlias: "",
        betAmount: "",
        depositNumber: "",
        giftBonus: null,
        multiple: ""
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
        levelName: [
          {
            required: true,
            message: "请输入正确的等级名称",
            trigger: "blur"
            // type:'number'
          }
        ],
        levelLabel: [
          {
            required: true,
            message: "请输入正确的会员等级",
            trigger: "blur",
            type: "number"
          }
        ],
        levelAlias: [
          {
            required: true,
            message: "请输入正确的等级別称",
            trigger: "blur",
            type: "string"
          }
        ],
        betAmount: [
          {
            required: true,
            message: "请输入正确的打码倍数",
            trigger: "blur",
            type: "number"
          }
        ],
        depositNumber: [
          {
            required: true,
            message: "请输入正确的存款次数",
            trigger: "blur",
            type: "number"
          }
        ],
        giftBonus: [
          {
            required: true,
            message: "请输入正确的彩金奖励",
            trigger: "blur",
            type: "number"
          }
        ],
        multiple: [
          {
            required: true,
            message: "请输入正确的取款打码倍数",
            trigger: "blur",
            type: "number"
          }
        ],
        minPay: [
          {
            type: "number",
            required: true,
            message: "请输入正确的累计存款金额",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        let params = {
          siteId: this.$route.query.siteId,
          id: this.$route.query.id
        };
        this.isVerifyFn(params);
        this.LevelSelectOfMember.isLevelById = true;
      } else {
        this.LevelSelectOfMember.isLevelById = false;
      }
    });
  },
  methods: {
    levelChange(re) {
      this.CreatMemberBerForm.levelLabel = re.levelLabel;
      this.CreatMemberBerForm.levelName = re.levelName;
      this.CreatMemberBerForm.levelAlias = re.levelAlias;
    },
    isVerifyFn(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanDengJiXiangQing,params)
        .then(res => {
          for (let key in this.CreatMemberBerForm) {
            this.CreatMemberBerForm[key] = res.data.data[key];
          }
          this.CreatMemberBerForm.giftBonus = Number(res.data.data.giftBonus);
          this.CreatMemberBerForm.minPay = Number(res.data.data.minPay);
          this.CreatMemberBerForm.levelLabel = parseFloat(
            this.CreatMemberBerForm.levelLabel
          );
          const { levelLabel, levelName, levelAlias, siteId ,id} = res.data.data;
          this.$refs.LevelSelect.setDefaultLevel(levelLabel,levelName,levelAlias);
          this.$refs.SiteNameSelect.setDefaultSite(siteId);
          this.CreatMemberBerForm.id = id;
        });
    },
    siteChange(re) {
      if (re) {
        this.CreatMemberBerForm.siteId = re.SiteId;
        this.CreatMemberBerForm.siteName = re.SiteName;
        if (this.$route.query.isVerify) {
          this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
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
                this.$root.HTTP_L.HTTP_TianJiaHuiYuanDengJiXinXi,
                this.CreatMemberBerForm
              )
              .then(
                res => {
                  this.$Spin.hide();
                  this.$Modal.success({ title: "提示", content: "添加成功!" });
                  //站点下拉框重置
                  this.$refs.SiteNameSelect.InitData();
                  this.$refs.LevelSelect.setDefaultLevel("");
                  this.CreatMemberBerForm.siteId = null;
                  this.CreatMemberBerForm.siteName = "";
                },
                res => {
                  this.$Spin.hide();
                }
              );
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiHuiYuanDengJiXinXi,
                this.CreatMemberBerForm
              )
              .then(
                res => {
                  this.$Spin.hide();
                  this.$Modal.success({ title: "提示", content: "编辑成功!" });
                },
                res => {
                  this.$Spin.hide();
                }
              );
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
  th {
  }
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

