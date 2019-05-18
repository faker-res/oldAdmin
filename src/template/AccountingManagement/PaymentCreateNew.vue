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
        <Form ref="PayMentCreateForm" :model="PayMentCreateForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="站点" prop="siteId">
            <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
          </FormItem>
          <FormItem label="支付名称(管理端)" prop="payName">
            <Select style="width:260px" @on-change="paymentNameChange" label-in-value v-model="PayMentCreateForm.queryName">
              <Option v-for="i in paymentName" :key="i.queryName" :value="i.queryName" :label="i.payName"></Option>
            </Select>
          </FormItem>
          <FormItem label="支付名称(会员端)" prop="name">
            <i-input style="width:260px" v-model="PayMentCreateForm.name" placeholder="支付名称(会员端)"></i-input>
          </FormItem>
          <FormItem label="支付分组" prop="classId">
            <PayClassSelect ref="PayClassSelect" @listenOnChange="mechangeZhiFuFenZu" :PayClassSelectData="PayClassSelectOfPay" />
          </FormItem>
          <FormItem label="支付状态" prop='status'>
            <Select v-model="PayMentCreateForm.status" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem label="支付商户号" prop="businessNo">
            <i-input style="width:260px" v-model="PayMentCreateForm.businessNo" placeholder="支付商户号"></i-input>
          </FormItem>
          <FormItem label="支付密钥" prop="businessKEY">
            <i-input style="width:400px" type="textarea" :rows="6" v-model="PayMentCreateForm.businessKEY" placeholder="支付密钥"></i-input>
          </FormItem>
          <FormItem label="支付域名" prop="redirect_domain">
            <i-input style="width:260px" v-model="PayMentCreateForm.redirect_domain" placeholder="支付域名"></i-input>
          </FormItem>
          <FormItem label="支付金额">
            <RadioGroup v-model="moneyType" @on-change="moneyTypeChange">
              <Radio label="limitAmount">
                <span>支付限额（限制最大、最小金额）</span>
              </Radio>
              <Radio label="formatAmount">
                <span>支付固定金额</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem v-if="moneyType === 'formatAmount' && PayMentCreateForm.classId" label="支付固定金额" prop="formatAmount">
            <div v-for="(item,i) in payClassData" :key="i">
              <label style="display:inline-block;width:110px;">{{item.className}}</label>
              <Input style="width:260px" v-model="formatAmount[item.id]" placeholder="用,隔开，如100,200,300" />
            </div>
          </FormItem>
          <FormItem v-if="moneyType === 'limitAmount' && PayMentCreateForm.classId" label="支付限额" prop="limitAmount">
            <div v-for="(item,i) in payClassData" :key="i">
              <label style="display:inline-block;width:110px;">{{item.className}}</label>
              <InputNumber style="width:120px" :min="0" v-model="minAmount[item.id]" placeholder="最小支付额度"></InputNumber>
              -
              <InputNumber style="width:120px" :min="0" v-model="maxAmount[item.id]" placeholder="最小支付额度"></InputNumber>
            </div>
          </FormItem>
          <FormItem label="银行编码" prop="bankCode">
            <i-input style="width:400px" type="textarea" :rows="6" v-model="PayMentCreateForm.bankCode" placeholder="银行编码"></i-input>
          </FormItem>
          <FormItem label="备注" prop="remarks">
            <i-input style="width:400px" type="textarea" :rows="3" v-model="PayMentCreateForm.remarks" placeholder="备注"></i-input>
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
  mixins:[mixins],
  data() {
    return {
      flag: false,
      moneyType: "limitAmount", //支付金额类型
      PayMentData: {}, //支付详情
      paymentName: [], //系统支付账号名称
      payClassData: [], //选中的支付分组
      formatAmount: {}, //支付固定金额
      minAmount: {}, //最小金额
      maxAmount: {}, //最大金额
      devices: {}, //客户端
      levelModal: false, //会员等级弹框
      levelId: {}, //会员等级id
      levelName: {}, //会员等级名称
      classId: null, //选择会员等级时的对应的支付类型id
      PayMentCreateForm: {
        siteId: null,
        siteName: "",
        name: "",
        queryName: "",
        businessNo: "",
        businessKEY: "",
        payName: "",
        limitAmount: {}, //limitAmount:{1:{name:"",minAmount:"",maxAmount:"",devices:"",levelId:""},...}
        formatAmount: {}, //formatAmount:{1:{name:"",formatAmount:"",devices:"",levelId:""},...}
        bankCode: "",
        classId: "",
        status: "yes",
        created_user: "",
        redirect_domain: "",
        remarks: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入您的支付名称",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            message: "请选择站点名称",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        classId: [
          {
            required: true,
            message: "请选择支付分组",
            trigger: "blur",
            pattern: /^.*$/
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "blur"
          }
        ],
        payName: [
          {
            required: true,
            message: "请选择支付名称"
            // trigger: "blur"
          }
        ],
        businessNo: [
          {
            required: true,
            message: "请输入支付账号",
            trigger: "blur"
          }
        ],
        businessKEY: [
          {
            required: true,
            message: "请输入支付密钥",
            trigger: "blur"
          }
        ],
        redirect_domain: [
          {
            required: true,
            message: "请输入支付域名",
            trigger: "blur"
          }
        ],
        limitAmount: [
          {
            required: true,
            message: "请输入支付限额",
            trigger: "blur"
          }
        ],
        formatAmount: [
          {
            required: true,
            message: "请输入支付固定金额",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      Promise.all([
        this.$refs.PayClassSelect.InitData(),
        this.getPaymentName()
      ]).then(() => {
        this.PayMentCreateForm.created_user = this.$root.adminuserinfo.adminUserName;
        if (
          this.$route.query &&
          this.$route.query.paymentId &&
          this.$route.query.isVerify
        ) {
          let params = {
            paymentId: this.$route.query.paymentId,
            siteId: this.$route.query.siteId,
          }
          this.isVerifyFn(params);
        }
      });
      // }
    });
  },
  methods: {
    //获取支付名称
    async getPaymentName() {
      await this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Payment_Name)
        .then(res => {
          this.paymentName = res.data.data;
        });
    },
    //支付名称选择
    paymentNameChange(re) {
      this.PayMentCreateForm.queryName = re.value;
      this.PayMentCreateForm.payName = re.label;
    },
    isVerifyFn(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Detail_Payment,params)
        .then(res => {
          this.PayMentData = res.data.data;
          for (var key in this.PayMentCreateForm) {
            this.PayMentCreateForm[key] = this.PayMentData.payment[key];
          }
          this.PayMentCreateForm.paymentId = this.PayMentData.payment.id;
          this.PayMentCreateForm.updated_user = this.$root.adminuserinfo.adminUserName;
          //选中站点
          this.$refs.SiteNameSelect.setDefaultSite(
            this.PayMentData.payment.siteId
          );
          this.flag = true;
          //选中支付类型
          this.$set(this.PayClassSelectOfPay, "data", {});
          let classIdList = [];
          this.PayMentData.paymentClass.forEach(i => {
            classIdList.push(i.id - 0);
          });
          this.PayClassSelectOfPay.data.id = classIdList;
          this.moneyType = this.PayMentData.payment["limitAmount"]
            ? "limitAmount"
            : "formatAmount";
        });
    },
    //支付分组选择
    mechangeZhiFuFenZu(re) {
      this.payClassData = re.id.map((item, i) => {
        let obj = {};
        obj.id = item;
        obj.className = re.className[i];
        return obj;
      });
      this.PayMentCreateForm.classId = re.id.toString();
      if (this.flag) {
        //编辑支付账号时的初始信息
        this.PayMentCreateForm.limitAmount = this.PayMentData.payment
          .limitAmount
          ? JSON.parse(this.PayMentData.payment.limitAmount)
          : "";
        this.PayMentCreateForm.formatAmount = this.PayMentData.payment
          .formatAmount
          ? JSON.parse(this.PayMentData.payment.formatAmount)
          : "";
        let limitAmount = this.PayMentCreateForm.limitAmount;
        let formatAmount = this.PayMentCreateForm.formatAmount;
        if (limitAmount) {
          for (let key in limitAmount) {
            this.minAmount[key] = limitAmount[key].minAmount - 0;
            this.maxAmount[key] = limitAmount[key].maxAmount - 0;
          }
        } else {
          for (let key in formatAmount) {
            this.formatAmount[key] = formatAmount[key].formatAmount;
          }
        }
        this.flag = false;
      } else {
        this.moneyTypeChange();
      }
    },
    //支付金额类型选择、支付分组选择，对应的赋值
    moneyTypeChange(re) {
      let list = this.payClassData;
      let arry = list.map(i => {
        return i.id;
      });
      if (this.moneyType === "limitAmount") {
        //支付限额
        let minAmountObj = this.minAmount;
        let minAmountList = Object.keys(minAmountObj).map(item => {
          return item - 0;
        });
        this.PayMentCreateForm.limitAmount = {};
        this.PayMentCreateForm.formatAmount = "";
        list.forEach(i => {
          if (minAmountList.length) {
            if (minAmountList.indexOf(i.id) == -1) {
              this.minAmount[i.id] = 0;
              this.maxAmount[i.id] = 0;
            }
          } else {
            this.minAmount[i.id] = 0;
            this.maxAmount[i.id] = 0;
          }
        });
        list.forEach(i => {
          this.PayMentCreateForm.limitAmount[i.id] = {
            name: i.className,
            minAmount: "",
            maxAmount: ""
          };
        });
      } else {
        //支付固定金额
        let formatAmountObj = this.formatAmount;
        let formatAmountList = Object.keys(formatAmountObj).map(item => {
          return item - 0;
        });
        this.PayMentCreateForm.formatAmount = {};
        this.PayMentCreateForm.limitAmount = "";
        list.forEach(i => {
          if (formatAmountList.length) {
            if (formatAmountList.indexOf(i.id) == -1) {
              this.formatAmount[i.id] = "";
            }
          } else {
            this.formatAmount[i.id] = "";
          }
        });
        list.forEach(i => {
          this.PayMentCreateForm.formatAmount[i.id] = {
            name: i.className,
            formatAmount: ""
          };
        });
      }
    },
    //站点等级选择
    siteChange(re) {
      this.PayMentCreateForm.siteId = re.SiteId;
      this.PayMentCreateForm.siteName = re.SiteName;
    },
    FormSubmit() {
      if (this.PayMentCreateForm.limitAmount) {
        for (let key in this.PayMentCreateForm.limitAmount) {
          this.PayMentCreateForm.limitAmount[key].minAmount = this.minAmount[
            key
          ];
          this.PayMentCreateForm.limitAmount[key].maxAmount = this.maxAmount[
            key
          ];
        }
        this.PayMentCreateForm.limitAmount = JSON.stringify(
          this.PayMentCreateForm.limitAmount
        );
        this.PayMentCreateForm.formatAmount = " ";
      } else {
        for (let key in this.PayMentCreateForm.formatAmount) {
          this.PayMentCreateForm.formatAmount[
            key
          ].formatAmount = this.formatAmount[key];
        }
        this.PayMentCreateForm.formatAmount = JSON.stringify(
          this.PayMentCreateForm.formatAmount
        );
        this.PayMentCreateForm.limitAmount = " ";
      }
      if (this.PayMentCreateForm.bankCode === "") {
        this.PayMentCreateForm.bankCode = " ";
      }
      if (this.PayMentCreateForm.remarks === "") {
        this.PayMentCreateForm.remarks = " ";
      }
      this.$refs.PayMentCreateForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_Update_Payment,
                this.PayMentCreateForm
              )
              .then(res => {
                this.$Spin.hide();
                this.$root.modal("success", "", res.data.data);
                this.PayMentCreateForm.limitAmount =
                  this.PayMentCreateForm.limitAmount == " "
                    ? ""
                    : JSON.parse(this.PayMentCreateForm.limitAmount);
                this.PayMentCreateForm.formatAmount =
                  this.PayMentCreateForm.formatAmount == " "
                    ? ""
                    : JSON.parse(this.PayMentCreateForm.formatAmount);
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_Create_Payment,
                this.PayMentCreateForm
              )
              .then(res => {
                // this.$refs.PayMentCreateForm.resetFields();
                this.$Spin.hide();
                this.$root.modal("success", "", res.data.data);
                this.PayMentCreateForm.name = "";
                this.PayMentCreateForm.created_user = this.$root.adminuserinfo.adminUserName;
                this.PayMentCreateForm.limitAmount =
                  this.PayMentCreateForm.limitAmount == " "
                    ? ""
                    : JSON.parse(this.PayMentCreateForm.limitAmount);
                this.PayMentCreateForm.formatAmount =
                  this.PayMentCreateForm.formatAmount == " "
                    ? ""
                    : JSON.parse(this.PayMentCreateForm.formatAmount);
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        } else {
          this.$root.modal("error", "", "请填写正确的用户信息！");
        }
      });
    }
  },
  watch: {}
};
</script>