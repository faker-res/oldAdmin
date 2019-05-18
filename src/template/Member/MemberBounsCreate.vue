<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon> 必填栏位
        </h1>
      </div> 
      <div class="page-con1 form-t">
        <Form ref="CreateMemberBounsForm" :model="CreateMemberBounsForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="返水等级别称" prop="levelAlias">
            <i-input style="width:260px" placeholder='请输入返水等级别称' v-model="CreateMemberBounsForm.levelAlias"></i-input>
          </FormItem>

          <FormItem label="所属站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>

          <FormItem prop='platform' label="会员返水设置">
            <site-refund-select @listenOnChange="siteRefundSelectChange" :SiteRefundSelectData="SiteRefundSelectOfBouns"></site-refund-select>
          </FormItem>

          <FormItem label="反水等级" prop="levelId">
            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfRefund" v-on:listenLevelChange="levelChange"></LevelSelect>
          </FormItem>

          <FormItem label="最低下注金额" prop="lessBetAmount">
            <input class="inputt" type="number" min="0" step="1" style="width:260px" placeholder="请输入最低下注金额" v-model="CreateMemberBounsForm.lessBetAmount">
          </FormItem>

          <FormItem label="最大返水金额限制" prop="maxBonusAmonut">
            <input class="inputt" min="0" type="number" step="0.1" style="width:260px" placeholder="最大返水金额限制" v-model="CreateMemberBounsForm.maxBonusAmonut">
          </FormItem>

          <FormItem label="状态" prop='status'>
            <Select v-model="CreateMemberBounsForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>

          <FormItem label="默认返水等级" prop="default">
            <Select v-model="CreateMemberBounsForm.default" style="width:260px">
              <Option value="no" label="否">
                <span>否</span>
              </Option>
              <Option :disabled="isDefault" value="yes" label="是">
                <span>是</span>
              </Option>
            </Select>
            <div style="font-size:12px;line-height:24px;color: rgb(27, 95, 218);" v-show="isDefault" color="red">如需设为默认，请关闭已经设为默认的等级</div>
          </FormItem>
          <FormItem label="备注">
            <i-input style="width:260px" v-model="CreateMemberBounsForm.remark" type="textarea" :rows="6" placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="FormSubmit()">提交</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">取消</Button>
          </FormItem>
        </Form>
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
      LevelList: [],
      resDefault: ["河北省", "张家口市", "怀来县", "沙城镇"],
      showRes: [],
      MemberData: {},
      CreateMemberBounsForm: {
        levelAlias: "",
        lessBetAmount: "",
        maxBonusAmonut: "",
        default: "no",
        sequence: "1",
        status: "yes",
        remark: "",
        siteId: null,
        siteName: "",
        levelLabel: null,
        levelName: ""
      },
      ruleValidate: {
        levelAlias: [
          {
            required: true,
            message: "请输入返水等级别称",
            trigger: "blur"
          }
        ],
        lessBetAmount: [
          {
            required: true,
            message: "请输入您的最低下注金额",
            trigger: "blur"
          }
        ],
        maxBonusAmonut: [
          {
            required: true,
            message: "请输入最大返水金额限制",
            trigger: "blur"
          }
        ],
        default: [
          {
            required: true,
            message: "请输入默认返水等级",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请输入您的状态",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    res1(val) {
      this.showRes = val;
    },
    resDefault(val) {
      this.showRes = val;
    }
  },
  created () {
    if (
      this.$route.query &&
      this.$route.query.id &&
      this.$route.query.isVerify
    ) {
      this.$set(this.SiteNameSelectData, "edit", true);
      this.$set(this.SiteNameSelectData, "disabled", true);
    }
  },
  mounted() {
    if (
      this.$route.query &&
      this.$route.query.id &&
      this.$route.query.isVerify
    ) {
      let params = {
        id: this.$route.query.id,
        siteId: this.$route.query.siteId
      }
      this.isVerifyFn(params);
    }
  },
  methods: {
    levelChange(re) {
      this.CreateMemberBounsForm.levelLabel = re.levelLabel;
      this.CreateMemberBounsForm.levelName = re.levelName;
    },
    //会员返水，新增时默认值为站点的返水
    siteRefundSelectChange(re) {
      if (re.length) {
        re.forEach(item => {
          item.list.forEach(i => {
            this.CreateMemberBounsForm[i.key] = i.value;
          });
        });
      }
    },
    siteChange(re) {
      if (re.SiteId) {
        this.CreateMemberBounsForm.siteId = re.SiteId;
        this.CreateMemberBounsForm.siteName = re.SiteName;
        this.SiteRefundSelectOfBouns.id = 0;// 大股东也就是站点的反水
        this.SiteRefundSelectOfBouns.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberRefundLevelModel");
      }
    },
    isVerifyFn(params) {
      let url = this.$root.HTTP_L.HTTP_HuiYuanFanShuiXiangQing;
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.MemberData = res.data.data;
        for (let key in this.CreateMemberBounsForm) {
          this.CreateMemberBounsForm[key] = this.MemberData[key]
            ? this.MemberData[key]
            : "";
        }
        const { siteId, levelLabel, levelName } = res.data.data;
        this.$refs.SiteNameSelect.setDefaultSite(siteId);
        this.$refs.LevelSelect.setDefaultLevel(levelLabel, levelName);

        this.$set(this.SiteRefundSelectOfBouns, "data", {
          platform: res.data.data.platform
        });

        this.CreateMemberBounsForm.id = this.MemberData.id;
      });
    },
    FormSubmit() {
      this.$refs.CreateMemberBounsForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ChuangJianHuiYuanFanShui,
                this.CreateMemberBounsForm
              )
              .then(
                res => {
                  this.$Spin.hide();
                  this.$Modal.success({ title: "提示", content: "创建成功!" });
                  this.CreateMemberBounsForm.levelAlias = "";
                },
                res => {
                  this.$Spin.hide();
                }
              );
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiHuiYuanFanShuiXinXi,
                this.CreateMemberBounsForm
              )
              .then(
                res => {
                  this.$Spin.hide();
                  this.$Modal.success({ title: "提示", content: "修改成功!" });
                },
                res => {
                  this.$Spin.hide();
                }
              );
          }
        } else {
          this.$Modal.error({
            title: "提示",
            content: "请填写正确的用户信息!"
          });
        }
      });
    }
  }
};
</script>

