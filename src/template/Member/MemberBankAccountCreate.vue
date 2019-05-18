<template>
  <div class="content-main CreatMemberBankAccount-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">会员银行卡
          <span v-if="$route.query.isVerify">修改</span>
          <span v-else>添加</span>
          <span>{{CreatMemberBankAccountForm.userName}}</span>
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form ref="CreatMemberBankAccountForm" style="max-width:60%" :model="CreatMemberBankAccountForm" :rules="CreatMemberBankAccountFormRules" :label-width="120">
          <FormItem label='会员账户'>
            <i-input style="width:260px" v-model="CreatMemberBankAccountForm.userName" :disabled="true"></i-input>
          </FormItem>
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref='SiteNameSelect' @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="银行名称" prop="bankName">
            <i-input v-if="inputBank" style="width:260px" v-model="CreatMemberBankAccountForm.bankName" placeholder='请输入银行卡名称'></i-input>
            <BankSelect v-else ref='BankSelect' @listenOnChange="BankChange" :BankSelectData="BankSelectData"></BankSelect>
            <p style="font-size:12px" v-if="!$route.query.isVerify">
              <a href="javascript:;" v-show="!inputBank" @click="inputBank=true;CreatMemberBankAccountForm.bankName=''">找不到所需银行选项，手动输入?</a>
              <a href="javascript:;" v-show="inputBank" @click="inputBank=false;CreatMemberBankAccountForm.bankName=''">返回重新选择</a>
            </p>
          </FormItem>
          <FormItem label="持卡人姓名" prop='cardName'>
            <i-input :disabled="$route.query.isVerify?true:false" style="width:260px" v-model="CreatMemberBankAccountForm.cardName" placeholder="持卡人姓名"></i-input>
          </FormItem>
          <FormItem label="银行归属省市" prop='cardAddress'>
            <i-input style="width:260px" v-model="CreatMemberBankAccountForm.cardAddress" placeholder="例：四川省成都市"></i-input>
          </FormItem>
          <FormItem label="状态" prop='status'>
            <Select v-model="CreatMemberBankAccountForm.status" style="width:260px">
              <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="卡号" prop="cardNum">
            <i-input style="width:260px" v-model="CreatMemberBankAccountForm.cardNum" placeholder="例：6227002020690175526"></i-input>
          </FormItem>
          <FormItem label='设为默认'>
            <RadioGroup v-model="CreatMemberBankAccountForm.default">
              <Radio label="yes">开启</Radio>
              <Radio label="no">关闭</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" v-if="$route.query.isVerify" :loading='$root.btnLoading' @click="CreatMemberBankSubmi()">修改</Button>
            <Button type="primary" v-else :loading='$root.btnLoading' @click="CreatMemberBankSubmi()">创建</Button>
            <Button type="ghost" style="margin-left: 8px" @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import BankSelect from "@/template/my-components/BankSelect.vue";
export default {
  components: {
    SiteNameSelect,
    BankSelect
  },
  data() {
    return {
      inputBank: false,
      CreatMemberBankAccountForm: {
        id: "", //会员银行id
        uid: null,
        userName: "",
        bankName: "",
        cardNum: "",
        cardAddress: "",
        cardName: "",
        status: "yes",
        default: "yes",
        siteId: "",
        siteName: ""
      },
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: {
          width: "260px"
        }
      },
      BankSelectData: {
        placeholder: "请输入银行名称",
        style: {
          width: "260px"
        }
      },
      StatusList: [
        {
          value: "yes",
          label: "开启"
        },
        {
          value: "no",
          label: "关闭"
        }
      ],
      CreatMemberBankAccountFormRules: {
        uid: [
          { required: true, message: "代理账户ID不正确！", trigger: "blur" }
        ],
        siteId: [
          {
            required: true,
            message: "站点名称不正确！",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        userName: [
          { required: true, message: "代理账户不正确！", trigger: "blur" }
        ],
        cardNum: [
          { required: true, message: "银行卡号不正确！", trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "所属银行不正确！", trigger: "blur" }
        ],
        cardName: [
          { required: true, message: "持卡人姓名不正确！", trigger: "blur" }
        ],
        cardAddress: [
          { required: true, message: "省市不正确", trigger: "blur" }
        ],
        status: [{ required: true, message: "状态不正确！", trigger: "blur" }]
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
        this.isVerifyFn(this.$route.query.id,this.$route.query.siteId);
      } else {
        for (let key in this.$route.query) {
          if (key == "id") {
            this.CreatMemberBankAccountForm.uid = this.$route.query["id"];
          } else {
            this.CreatMemberBankAccountForm[key] = this.$route.query[key];
          }
        }
        this.$refs.SiteNameSelect.setDefaultSite(this.$route.query.siteId);
      }
    });
  },

  // beforeRouteUpdate(to, from, next) {
  //   if (
  //     this.$route.query &&
  //     this.$route.query.id &&
  //     this.$route.query.isVerify
  //   ) {
  //     this.isVerifyFn(to.query.id);
  //   } else {
  //     this.CreatMemberBankAccountForm.userName = "";
  //   }
  //   next();
  // },
    methods: {
      isVerifyFn(eid,siteId) {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiangXiHuiYuanYinHangXinXi, {
            id: eid,
            siteId: siteId
        })
        .then(res => {
          let bankData = res.data.data[0];
          for (let key in this.CreatMemberBankAccountForm) {
            this.CreatMemberBankAccountForm[key] = bankData[key];
          }
          this.$refs.BankSelect.setDefaultBank(bankData.bankName);
          this.$refs.SiteNameSelect.setDefaultSite(bankData.siteId);
          this.$set(this.SiteNameSelectData, "disabled", true);
        });
    },
    siteChange(re) {
      this.CreatMemberBankAccountForm.siteId = re.SiteId;
      this.CreatMemberBankAccountForm.siteName = re.SiteName;
    },
    BankChange(re) {
      this.CreatMemberBankAccountForm.bankName = re;
    },
    CreatMemberBankSubmi() {
      var that = this;
      this.$refs.CreatMemberBankAccountForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_TianJiaHuiYuanYinHangKa,
                that.CreatMemberBankAccountForm
              )
              .then(
                res => {
                  that.$Spin.hide();
                  that.$Modal.success({ title: "提示", content: "添加成功！" });
                  that.$root.go_back();
                },
                res => {
                  this.$Spin.hide();
                }
              );
          } else {
            let VerifyMemberBankAccountForm = {};
            for (let key in this.CreatMemberBankAccountForm) {
              if (
                !(
                  key == "uid" ||
                  key == "userName" ||
                  key == "siteName"
                )
              ) {
                VerifyMemberBankAccountForm[
                  key
                ] = this.CreatMemberBankAccountForm[key];
              }
            }
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_BianJiHuiYuanYinHangXinXi,
                VerifyMemberBankAccountForm
              )
              .then(
                res => {
                  that.$Spin.hide();
                  that.$Modal.success({ title: "提示", content: "编辑成功！" });
                },
                res => {
                  this.$Spin.hide();
                }
              );
          }
        } else {
          this.$Modal.error({
            title: "提示",
            content: "请填写完整的表单内容！"
          });
        }
      });
    }
  }
};
</script>
