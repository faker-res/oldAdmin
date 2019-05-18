<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
          <!-- 直接新增不带参数，通过点击编辑进入有默认显示 -->
          <span v-if="$route.query.isVerify">{{AgentData.userName}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <Alert show-icon>注意事项
          <template slot="desc">
            <p>新增代理：选择站点后，根据站点搜索所属代理父级账户。</p>
          </template>
        </Alert>
      </div>
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon>必填栏位
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form
          ref="AgentCreateForm"
          :model="AgentCreateForm"
          :rules="ruleValidate"
          :label-width="180"
        >
          <FormItem label="代理类型" prop="agencyType">
            <RadioGroup
              @on-change="agencyTypeChange"
              style="width:260px"
              v-model="AgentCreateForm.agencyType"
            >
              <Radio
                label="agency"
                :disabled="$route.query.isVerify&&AgentCreateForm.agencyType=='shareholder'"
              >代理</Radio>
              <Radio
                label="shareholder"
                :disabled="$route.query.isVerify&&AgentCreateForm.agencyType=='agency'"
              >大股东</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="$route.query.isVerify" label="代理账户名称">
            <i-input
              :disabled="!!$route.query.isVerify"
              v-model="AgentCreateForm.userName"
              style="width:260px"
              placeholder="代理账户名称"
            ></i-input>
          </FormItem>
          <FormItem v-else label="代理账户名称" prop="userName">
            <i-input
              :disabled="!!$route.query.isVerify"
              v-model="AgentCreateForm.userName"
              style="width:260px"
              placeholder="代理账户名称"
            ></i-input>
          </FormItem>

          <FormItem label="所属站点" prop="siteId">
            <SiteNameSelect
              ref="SiteNameSelect"
              @listenOnChange="siteChange"
              :SiteNameSelectData="SiteNameSelectData"
            ></SiteNameSelect>
          </FormItem>

          <FormItem
            label="代理父级账户"
            prop="superiorUserName"
            required
            v-if="AgentCreateForm.agencyType!='shareholder'"
          >
            <AutoComplete
              @listenOnChange="AutoCompleteChange"
              @listenSelect="changeSuperiorVerify"
              :AutoCompleteData="AutoCompleteData"
            ></AutoComplete>
          </FormItem>

          <FormItem label="代理等级" v-show="AgentCreateForm.agencyType!='shareholder'" prop="levelId">
            <LevelSelect
              ref="LevelSelect"
              :LevelSelectConf="LevelSelectOfAgency"
              v-on:listenLevelChange="levelChange"
            ></LevelSelect>
          </FormItem>

          <FormItem label="返点比例" prop="rebate">
            <RebateSelect
              ref="RebateSelect"
              :rebateConfig="rebateConOfMember"
              @listenRebateChange="listenRebateChange"
            ></RebateSelect>
          </FormItem>

          <FormItem label="状态">
            <Select v-model="AgentCreateForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem prop="refundPlatform" label="代理返水设置">
            <Collapse>
              <Panel name="refund">
                <div slot="content">
                  <site-refund-select
                    @listenOnChange="siteRefundSelectChange"
                    :SiteRefundSelectData="SiteRefundSelectData"
                  ></site-refund-select>
                </div>
              </Panel>
            </Collapse>
          </FormItem>
          <FormItem style="margin-bottom:80px;">
            <Button
              type="primary"
              v-if="!$route.query.isVerify"
              :loading="$root.btnLoading"
              @click="FormSubmitCreat()"
            >创建</Button>
            <Button type="primary" v-else :loading="$root.btnLoading" @click="FormSubmitCreat()">修改</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/create";
export default {
  // name: "AgentCreate",
  mixins: [mixins],
  data() {
    return {
      // rebateConOfMember: {
      //   type: "member",
      //   data: {},
      //   id: "",
      //   siteId: "",
      //   limit: true//是否显示上限
      // },
      refundPlatform: null,
      refundKey: [], //存放返水的key值
      AgentData: {},
      AgentCreateForm: {
        levelName: "",
        levelId: "",
        siteId: "",
        siteName: "",
        userName: "",
        rebate: null,
        superiorId: "",
        superiorUserName: "",
        agencyType: "agency",
        status: "yes"
      },
      ruleValidate: {
        levelId: [
          {
            required: true,
            type: "number",
            message: "请选择代理层级",
            trigger: "change"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入代理账户名称",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9_]{6,10}$/,
            message: "英文、数字长度为6-10位！",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            type: "number",
            message: "请选择站点",
            trigger: "change"
          }
        ],
        rebate: [
          {
            required: true,
            type: "object",
            message: "请输入您的返点比例",
            trigger: "change"
          }
        ],
        agencyType: [
          {
            required: true,
            type: "string",
            message: "请选择代理类型",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            type: "string",
            message: "请选择状态",
            trigger: "change"
          }
        ]
      }
    };
  },
  // beforeRouteUpdate(to, from, next) {
  //   if (to.query.isVerify && to.query.id) {
  //     this.isVerifyFn(to.query.id);
  //   } else {
  //     this.AgentCreateForm.userName = "";
  //     this.AgentCreateForm.levelName = "";
  //     this.AgentCreateForm.levelId = null;
  //   }
  //   next();
  // },
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
      } else {
        // 创建页面默认选中默认等级
        this.$set(this.LevelSelectOfAgency, "initDefault", true);
      }
    });
  },
  computed: {
    FanDianShuZi() {
      var arr = [];
      for (var a = 0.0; a < 1.01; a += 0.01) {
        arr.push(a.toFixed(2) - 0);
      }
      return arr;
    }
  },
  methods: {
    listenRebateChange(rebate) {
      this.AgentCreateForm.rebate = rebate;
    },
    levelChange(re) {
      this.AgentCreateForm.levelId = re.levelLabel;
      this.AgentCreateForm.levelName = re.levelName;
    },
    siteRefundSelectChange(re) {
      if (re.length) {
        re.forEach(item => {
          item.list.forEach(i => {
            this.AgentCreateForm[i.key] = i.value;
            this.refundKey.push(i.key);
          });
        });
      }
    },
    isVerifyFn(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DaiLiXiangQing, params)
        .then(res => {
          this.AgentData = res.data.data;
          for (let key in this.AgentCreateForm) {
            this.AgentCreateForm[key] = this.AgentData[key]
              ? this.AgentData[key]
              : "";
          }
          const { superiorId, superiorUserName, rebate, siteId, levelId, platform, agencyType } = res.data.data;
          this.AgentCreateForm.superiorId = superiorId;
          this.rebateConOfMember.data = rebate && JSON.parse(rebate); //自己的返点数据
          if (agencyType === "shareholder") {
            this.getSuperiorRebateDate("site", siteId, siteId);
          } else if (agencyType === "agency") {
            this.getSuperiorRebateDate("member", superiorId, siteId);
          }
          this.$set(this.AutoCompleteData, "data", {
            Name: superiorUserName,
            superiorId: superiorId
          });

          this.$refs.SiteNameSelect.setDefaultSite(siteId);
          this.$set(this.SiteNameSelectData, "disabled", true);

          this.$refs.LevelSelect.setDefaultLevel(levelId);

            // this.$set(this.SiteRefundSelectData, "id", superiorId);


          this.$set(this.SiteRefundSelectData, "siteId", siteId);
          this.$set(this.SiteRefundSelectData, "id", superiorId);
            //2019/2/15   molly  更改
          // if (agencyType === "shareholder") {
          //   this.$set(this.SiteRefundSelectData, "id", uid);
          // } else if (agencyType === "agency") {
          //   // this.getSuperiorRebateDate("member", superiorId, siteId);
          //   this.$set(this.SiteRefundSelectData, "id", superiorId);
          // }
          this.$set(this.SiteRefundSelectData, "data", {
            platform: platform
          });

          this.AgentCreateForm.id = this.$route.query.id;
        });
    },
    changeSuperiorVerify(v) {
      this.getSuperiorRebateDate("member", v.id, v.siteId);
      if (this.$route.query.isVerify) {
        this.$root
          .HTTP_ALLLINKPOST(
            this.$root.HTTP_L.HTTP_YanZhengShangJiDaiLiHuiYuan,
            {
              id: this.AgentCreateForm.id,
              superiorId: v.id,
              siteId: v.siteId
            }
          )
          .then(res => {
            if (typeof res.data.data === "string") {
              this.$root.confirm({
                title: "提示",
                content: res.data.data,
                loading: true,
                onOk: () => {
                  this.$Modal.remove();
                },
                onCancel: () => {
                  this.AutoCompleteData.data.Name =
                    res.data.data.superiorUserName;
                  this.AutoCompleteData.data.superiorId =
                    res.data.data.superiorId;
                  this.$set(this.AutoCompleteData, "data", {
                    Name: this.AgentData.superiorUserName,
                    superiorId: this.AgentData.superiorId
                  });
                }
              });
            }
          });
      }
    },
    siteChange(re) {
      // 站点选择
      if (re.SiteId) {
        if (this.AgentCreateForm.agencyType === "shareholder") {
          this.getSuperiorRebateDate("site", re.SiteId, re.SiteId);
        }
        // this.rebateConOfMember.siteId = re.SiteId;
        this.AgentCreateForm.siteId = re.SiteId - 0;
        this.AgentCreateForm.siteName = re.SiteName;
        this.AutoCompleteData.siteId = re.SiteId;
        this.SiteRefundSelectData.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "AgencyLevelModel");
      }
    },
    agencyTypeChange(re) {
      if (re === "shareholder") {
        this.AgentCreateForm.superiorId = 0;
        this.SiteRefundSelectData.id = 0;
        this.refundKey.forEach(i => {
          delete this.AgentCreateForm[i];
        });
        this.getSuperiorRebateDate(
          "site",
          this.AgentCreateForm.siteId,
          this.AgentCreateForm.siteId
        );
      } else {
        this.rebateConOfMember.type = "member";
        this.rebateConOfMember.id = "";
        this.rebateConOfMember.data = {};
        this.$refs.RebateSelect.contents = [];
      }
    },
    AutoCompleteChange(re) {
      // 代理上级名称自动查询
      if (re.id || re.id + "" === "0") {
        this.AgentCreateForm.superiorUserName = re.userName;
        this.AgentCreateForm.superiorId = re.id - 0;
        this.SiteRefundSelectData.id = re.id - 0; // 查询上级的返水
        this.rebateConOfMember.id = re.id - 0; //查询上级彩票返点
      }
    },
    FormSubmitCreat() {
      var that = this;
      this.$refs.AgentCreateForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          let sendParams = { ...this.AgentCreateForm };
          sendParams.rebate = JSON.stringify(sendParams.rebate);
          if (sendParams.agencyType === "shareholder") {
            sendParams.superiorUserName = sendParams.userName;
            // delete sendParams.rebate; //大股东的返点由后台去匹配，不用传该字段
          }
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ChuangJianDaiLi,
                sendParams
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "代理创建成功！"
                });
                that.AgentCreateForm.userName = "";
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiDaiLiXinXi,
                sendParams
              )
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "代理修改成功！"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        } else {
        }
      });
    },
    getSuperiorRebateDate(type, id, siteId) {
      //获取上级的返点数据
      this.rebateConOfMember.type = type;
      this.rebateConOfMember.id = id;
      this.rebateConOfMember.siteId = siteId;

      this.$refs.RebateSelect.fetchData();
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-tabs {
  overflow: visible;
}
.tip {
  padding: 5px 0;
  font-size: 13px;
  color: #aaa;
}
</style>

