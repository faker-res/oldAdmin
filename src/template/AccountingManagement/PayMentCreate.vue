<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <!-- <div class="page-con1">
        <Alert show-icon>
          新增注意事项
          <template slot="desc">登入密码预设为123456，取款密码预设为123456。 </template>
        </Alert>
      </div> -->
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon> 必填栏位
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form ref="PayMentCreateForm" :model="PayMentCreateForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="会员等级" prop="levelId">
            <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" v-on:listenLevelChange="levelChange"></LevelSelect>
          </FormItem>
          <FormItem label="状态" prop='status'>
            <Select v-model="PayMentCreateForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem label="支付分组" prop="classId">
            <PayClassSelect ref="PayClassSelect" @listenOnChange="mechangeZhiFuFenZu" :PayClassSelectData="PayClassSelectOfPay" />
          </FormItem>
          <FormItem label="支付名称" prop="name">
            <i-input style="width:260px" v-model="PayMentCreateForm.name" placeholder="支付名称"></i-input>
          </FormItem>
          <FormItem label="第三方支付名" prop="payName">
            <i-input style="width:260px" v-model="PayMentCreateForm.payName" placeholder="第三方支付名"></i-input>
          </FormItem>
          <FormItem label="支付demo中方法名称" prop="queryName">
            <i-input style="width:260px" v-model="PayMentCreateForm.queryName" placeholder="支付demo中方法名称"></i-input>
          </FormItem>
          <FormItem label="支付商户号" prop="businessNo">
            <i-input style="width:260px" v-model="PayMentCreateForm.businessNo" placeholder="支付商户号"></i-input>
          </FormItem>
          <FormItem label="支付ID" prop="businessId">
            <i-input style="width:260px" v-model="PayMentCreateForm.businessId" placeholder="支付ID"></i-input>
          </FormItem>
          <FormItem label="支付秘钥" prop="businessKEY">
            <i-input style="width:400px" type="textarea" :rows="6" v-model="PayMentCreateForm.businessKEY" placeholder="支付秘钥"></i-input>
          </FormItem>
          <FormItem label="支付域名" prop="redirect_domain">
            <i-input style="width:260px" v-model="PayMentCreateForm.redirect_domain" placeholder="支付域名"></i-input>
          </FormItem>
          <FormItem label="支付限额" prop="maxAmount">
            <i-input style="width:120px" v-model="PayMentCreateForm.minAmount" placeholder="最小支付额度"></i-input> -
            <i-input style="width:120px" v-model="PayMentCreateForm.maxAmount" placeholder="最大支付额度"></i-input>
          </FormItem>
          <FormItem label="客户端" prop="devices">
            <RadioGroup v-model="PayMentCreateForm.devices">
              <Radio label="pc">PC</Radio>
              <Radio label="html5">HTML5</Radio>
              <Radio label="ios">IOS</Radio>
              <Radio label="android">Android</Radio>
              <Radio label="all">全部</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="排序" prop="sequence">
            <i-input style="width:260px" v-model="PayMentCreateForm.sequence" placeholder="排序"></i-input>
          </FormItem>
          <FormItem label="网关地址" prop="gateway_url">
            <i-input style="width:400px" v-model="PayMentCreateForm.gateway_url" placeholder="网关地址"></i-input>
          </FormItem>
          <FormItem label="消息通知地址" prop="backNotifyUrl">
            <i-input style="width:400px" v-model="PayMentCreateForm.backNotifyUrl" placeholder="消息通知地址"></i-input>
          </FormItem>
          <FormItem label="页面跳转地址" prop="pageNotifyUrl">
            <i-input style="width:400px" v-model="PayMentCreateForm.pageNotifyUrl" placeholder="页面跳转地址"></i-input>
          </FormItem>
          <FormItem label="编码" prop="charset">
            <i-input style="width:260px" v-model="PayMentCreateForm.charset" placeholder="编码"></i-input>
          </FormItem>
          <FormItem label="版本号" prop="version">
            <i-input style="width:260px" v-model="PayMentCreateForm.version" placeholder="版本号"></i-input>
          </FormItem>
          <FormItem label="支付类型" prop="payType">
            <i-input style="width:260px" v-model="PayMentCreateForm.payType" placeholder="支付类型"></i-input>
          </FormItem>
          <FormItem label="银行编码" prop="bankCode">
            <i-input style="width:400px" v-model="PayMentCreateForm.bankCode" placeholder="银行编码"></i-input>
          </FormItem>

          <FormItem>
            <Button @click="FormSubmit" :loading='$root.btnLoading' type="primary">确定提交</Button>
            <Button @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins/create";
export default {
  // name: "PayMentCreate",
  mixins: [mixins],
  data() {
    return {
      showRes: [],
      PayMentData: {},
      PayMentCreateForm: {
        siteId: null,
        siteName: "",
        name: "",
        queryName: "",
        version: "AAA",
        businessNo: "",
        businessId: "AAA",
        businessKEY: "",
        charset: "AAA",
        gateway_url: "AAA",
        backNotifyUrl: "AAA",
        pageNotifyUrl: "AAA",
        payType: "AAA",
        payName: "",
        maxAmount: "",
        minAmount: "",
        bankCode: "",
        classId: "",
        className: "",
        status: "yes",
        devices: "pc",
        createUser: "",
        sequence: "",
        levelId: "",
        redirect_domain: ""
      },
      ruleValidate: {
        levelId: [
          {
            required: true,
            // type: "number",
            message: "请输入您的会员层级",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            message: "请输入您的站点名称",
            trigger: "blur",
            pattern: /^.*$/
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
  mounted() {
    this.$nextTick(() => {
      Promise.all([this.$refs.PayClassSelect.InitData()]).then(() => {
        this.PayMentCreateForm.createUser = this.$root.adminuserinfo.adminUserName;
        if (
          this.$route.query &&
          this.$route.query.paymentId &&
          this.$route.query.isVerify
        ) {
          this.isVerifyFn(this.$route.query.paymentId);
        }
      });
      // }
    });
  },
  methods: {
    isVerifyFn(id) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuXiangQing, {
          paymentId: id
        })
        .then(res => {
          this.PayMentData = res.data.data;
          for (var key in this.PayMentCreateForm) {
            this.PayMentCreateForm[key] = this.PayMentData.paymentData[key];
          }
          this.PayMentCreateForm.paymentId = this.PayMentData.paymentData.paymentId;
          this.PayMentCreateForm.updateUser = this.$root.adminuserinfo.adminUserName;
          this.PayMentCreateForm.minAmount = Number(
            this.PayMentCreateForm.minAmount
          );
          this.PayMentCreateForm.maxAmount = Number(
            this.PayMentCreateForm.maxAmount
          );
          this.$set(this.levelNameSelectData, "data", {});
          this.$set(this.PayClassSelectData, "data", {});
          this.$refs.SiteNameSelect.setDefaultSite(
            this.PayMentData.paymentData.siteId
          );
          let levelIdList = [];
          this.PayMentData.paymentData.allowLevel.forEach(i => {
            levelIdList.push(i.levelLabel - 0);
          });
          this.levelNameSelectData.data.id = levelIdList;
          // this.levelNameSelectData.data.levelName = res.data.data["levelName"];
          // this.levelNameSelectData.data.siteId = this.PayMentData.paymentData["siteId"];
          this.PayClassSelectData.data.id = this.PayMentData.paymentData.classId.toString();
          this.PayClassSelectData.data.className = this.PayMentData.paymentData.className;
        });
    },
    mechangeZhiFuFenZu(re) {
      //支付分组选择
      this.PayMentCreateForm.classId = re.id;
      this.PayMentCreateForm.className = re.className;
    },
    levelChange(re) {
      //会员等级选择
      this.PayMentCreateForm.levelId = re.levelLabel.toString();
    },
    mechange(re) {
      //站点等级选择
      this.PayMentCreateForm.siteId = re.SiteId;
      this.PayMentCreateForm.siteName = re.SiteName;
      this.levelNameSelectData.siteId = re.SiteId - 0;
      this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
    },
    FormSubmit() {
      this.$refs.PayMentCreateForm.validate(valid => {
        if (valid) {
          if (this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ZaiXianZhiFuXiuGai,
                this.PayMentCreateForm
              )
              .then(res => {
                this.$root.modal("success", "", "编辑支付成功！");
              })
              .catch(res => {});
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_ZaiXianZhiFuChuangJian,
                this.PayMentCreateForm
              )
              .then(res => {
                // this.$refs.PayMentCreateForm.resetFields();
                this.$root.modal("success", "", "创建成功！");
                this.PayMentCreateForm.createUser = this.$root.adminuserinfo.adminUserName;
              });
          }
        } else {
          this.$root.modal("error", "", "请填写正确的用户信息！");
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
