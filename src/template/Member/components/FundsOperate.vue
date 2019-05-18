<template>
  <div style="display:inline-block">
    <Button type="primary" @click="openFundsModal">加款减款</Button>
    <Modal class-name="vertical-center-modal" v-model="FundsOperate" :scrollable="true" :mask-closable="false" width="650"
      title="加款减款">
      <Tabs value="AccountChangeForm" @on-click="tabChange">
        <TabPane label="加款/扣款" name="AccountChangeForm">
          <Form ref="AccountChangeForm" :model="AccountChangeForm" :rules="verifyRule" label-position="left"
            :label-width="90">
            <FormItem label="站点" prop="siteId" required>
              <SiteNameSelect ref="SiteNameSelect1" @listenOnChange="listenOnSiteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="账号" prop="userName" required>
              <AutoComplete ref="AutoComplete" @listenOnChange="AutoCompleteChange" :AutoCompleteData="AutoCompleteData"></AutoComplete>
            </FormItem>
            <FormItem label="操作" prop="role" required>
              <RadioGroup v-model="AccountChangeForm.role">
                <Radio label="+">加款</Radio>
                <Radio label="-">减款</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="类型" prop="type" required>
              <Select ref="FoundsTypeSelect1" clearable :style="{width:'260px'}" v-model="foundsTypeSelec1" @on-change="FoudTypeChange1">
                <Option v-for="(item,i) in FoundsType" :key='item.label+i' :value='item.value'>
                  <span>{{item.label}}</span>
                  <span :style="{float: 'right', color: '#ccc'}">{{item.type}}</span>
                </Option>
              </Select>
            </FormItem>
            <FormItem label="打码倍数" prop="multiple" v-show="AccountChangeForm.role === '+'" required>
              <input-number :min="0" :max="10" :step="1" v-model="AccountChangeForm.multiple" style="width:260px;"></input-number>
            </FormItem>
            <FormItem label="金额" prop="money">
              <i-input v-model="AccountChangeForm.money" style="width:260px;"></i-input>
            </FormItem>
            <FormItem label="备注" prop="remarks">
              <i-input v-model="AccountChangeForm.remarks" style="width:260px"></i-input>
            </FormItem>
            <FormItem>
              <Button type="primary" :disabled="submitBtnDisabled" :loading='$root.btnLoading' @click="submit('single')">确定</Button>
              <Button @click="reset">重置</Button>
            </FormItem>
          </Form>
        </TabPane>
        <TabPane label="批量加款/扣款" name="BatchAccountChangeForm">
          <div>
            <Form ref="BatchAccountChangeForm" :model="BatchAccountChangeForm" :rules="verifyRule" label-position="left"
              :label-width="90">
              <FormItem label="站点" prop="siteId" required>
                <SiteNameSelect ref="SiteNameSelect2" @listenOnChange="listenOnSiteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="操作" prop="role" required>
                <RadioGroup v-model="BatchAccountChangeForm.role">
                  <Radio label="+">加</Radio>
                  <Radio label="-">减</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="类型" prop="type" required>
                <Select ref="FoundsTypeSelect2" clearable :style="{width:'260px'}" v-model="foundsTypeSelect2"
                  @on-change="FoudTypeChange2">
                  <Option v-for="(item,i) in FoundsType" :key='item.label+i' :value='item.value'>
                    <span>{{item.label}}</span>
                    <span :style="{float: 'right', color: '#ccc'}">{{item.type}}</span>
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="打码倍数" prop="multiple" v-show="BatchAccountChangeForm.role === '+'" required>
                <input-number :min="0" :max="10" :step="1" v-model="BatchAccountChangeForm.multiple" style="width:260px;"></input-number>
              </FormItem>
              <FormItem label="金额" prop="userMoney">
                <i-input v-model="BatchAccountChangeForm.userMoney" @on-change="testUserNum" :rows="5" type="textarea"
                  style="width:260px;" placeholder="*格式为*:账号,金额 例如:a123,100 注意逗号为英文格式,一行一个,最多操作10000个用户"></i-input>
              </FormItem>
              <FormItem label="备注" prop="remarks">
                <i-input v-model="BatchAccountChangeForm.remarks" style="width:260px"></i-input>
              </FormItem>
              <FormItem>
                <Button type="primary" :disabled="submitBtnDisabled" :loading='$root.btnLoading' @click="submit('batch')">确定</Button>
                <Button @click="reset">重置</Button>
              </FormItem>
            </Form>
          </div>
        </TabPane>
      </Tabs>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import AutoComplete from "@/template/my-components/AutoComplete.vue";
  import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";;
  export default {
    components: {
      AutoComplete,
      SiteNameSelect,
    },
    data() {
      return {
        submitBtnDisabled: false,
        foundsTypeSelec1: "",
        foundsTypeSelect2: "",
        // type: "",//加减款类型
        FoundsType: [
          // {
          //   value: '{"type":"deposit","subType":"online"}',
          //   label: "线上支付掉单",
          //   type: "存款"
          // },
          {
            value: '{"type":"deposit","subType":"manual"}',
            label: "人工汇款",
            type: "存款"
          },
          // {value:'{"type":"withdrawals","subType":"manual"}',label:"人工提出",type:"取款"},
          {
            value: '{"type":"bonus","subType":"giftBonusAdmin"}',
            label: "彩金派送",
            type: "彩金"
          },
          {
            value: '{"type":"bonus","subType":"RebateBonus"}',
            label: "返水派送",
            type: "返水"
          },
          {
            value: '{"type":"bonus","subType":"bonus"}',
            label: "汇款优惠",
            type: "优惠"
          },
          {
            value: '{"type":"deposit","subType":"transfer"}',
            label: "额度转换失败",
            type: "额度转换"
          },
          {
            value: '{"type":"other","subType":"other"}',
            label: "其他",
            type: "其他"
          }
        ],
        FundsOperate: false,
        FundsOperateDetail: false,
        failArr: [], //操作失败的集合
        failMoneyTotal: 0,
        successMoneyTotal: 0,
        successArr: [], //操作成功的集合
        showMultipleInput1: false,
        showMultipleInput2: false,
        SiteNameSelectData: {
          type: "单选",
          default: false,
          placeholder: "站点",
          style: {
            width: "260px"
          }
        },
        AutoCompleteData: {
          siteId: null,
          type: "指定会员",
          xuanzhong: false, //false 是单选
          style: {
            width: "260px"
          },
          tip: "输入会员名称,带搜索功能"
        },
        AccountChangeForm: {
          //单个
          siteId: null,
          userName: null,
          type: null,
          role: "+",
          money: null,
          remarks: null,
          subType: null,
          userMoney: null,
          multiple: 0
        },
        BatchAccountChangeForm: {
          //批量
          siteId: null,
          userMoney: null,
          type: null,
          role: "+",
          remarks: null,
          subType: null,
          multiple: 0
        },
        verifyRule: {
          money: [{
            required: true,
            message: "金额必须填写",
            trigger: "blur"
          }],
          remarks: [{
            required: true,
            message: "备注必须填写",
            trigger: "blur"
          }],
          userMoney: [{
            required: true,
            message: "金额必须填写",
            trigger: "blur"
          }],
          multiple: [{
            required: true,
            message: "打码倍数必须填写",
            type: 'number',
            trigger: "blur"
          }],
          userName: [{
            required: true,
            message: "用户名必须填写",
            trigger: "blur"
          }],
          type: [{
            required: true,
            message: "类型必须选择",
            trigger: "blur"
          }],
        }
      };
    },
    watch: {
      "AccountChangeForm.role": function (val) {
        if (val === '-') {
          let arr = [
            {
              value: '{"type":"withdrawals","subType":"manual"}',
              label: "人工提出",
              type: "取款"
            },
            {
              value: '{"type":"other","subType":"other"}',
              label: "其他",
              type: "其他"
            }
          ]
          this.FoundsType = [...arr]
          this.AccountChangeForm.multiple = 0
        } else {
          let arr = [
            // {
            //   value: '{"type":"deposit","subType":"online"}',
            //   label: "线上支付掉单",
            //   type: "存款"
            // },
            {
              value: '{"type":"deposit","subType":"manual"}',
              label: "人工汇款",
              type: "存款"
            },
            {
              value: '{"type":"bonus","subType":"giftBonusAdmin"}',
              label: "彩金派送",
              type: "彩金"
            },
            {
              value: '{"type":"bonus","subType":"RebateBonus"}',
              label: "返水派送",
              type: "返水"
            },
            {
              value: '{"type":"bonus","subType":"bonus"}',
              label: "汇款优惠",
              type: "优惠"
            },
            {
              value: '{"type":"deposit","subType":"transfer"}',
              label: "额度转换失败",
              type: "额度转换"
            },
            {
              value: '{"type":"other","subType":"other"}',
              label: "其他",
              type: "其他"
            }
          ]
          this.FoundsType = [...arr]
        }
      },
      "BatchAccountChangeForm.role": function (val) {
        if (val === '-') {
          let arr = [
            {
              value: '{"type":"withdrawals","subType":"manual"}',
              label: "人工提出",
              type: "取款"
            },
            {
              value: '{"type":"other","subType":"other"}',
              label: "其他",
              type: "其他"
            }
          ]
          this.FoundsType = [...arr]
          this.BatchAccountChangeForm.multiple = 0
        } else {
          let arr = [
            // {
            //   value: '{"type":"deposit","subType":"online"}',
            //   label: "线上支付掉单",
            //   type: "存款"
            // },
            {
              value: '{"type":"deposit","subType":"manual"}',
              label: "人工汇款",
              type: "存款"
            },
            {
              value: '{"type":"bonus","subType":"giftBonusAdmin"}',
              label: "彩金派送",
              type: "彩金"
            },
            {
              value: '{"type":"bonus","subType":"RebateBonus"}',
              label: "返水派送",
              type: "返水"
            },
            {
              value: '{"type":"bonus","subType":"bonus"}',
              label: "汇款优惠",
              type: "优惠"
            },
            {
              value: '{"type":"deposit","subType":"transfer"}',
              label: "额度转换失败",
              type: "额度转换"
            },
            {
              value: '{"type":"other","subType":"other"}',
              label: "其他",
              type: "其他"
            }
          ]
          this.FoundsType = [...arr]
        }
      }
    },
    methods: {
      tabChange() {
        this.AccountChangeForm.role = "+"
        this.BatchAccountChangeForm.role = "+"
        this.FoundsType = [
          // {
          //   value: '{"type":"deposit","subType":"online"}',
          //   label: "线上支付掉单",
          //   type: "存款"
          // },
          {
            value: '{"type":"deposit","subType":"manual"}',
            label: "人工汇款",
            type: "存款"
          },
          {
            value: '{"type":"bonus","subType":"giftBonusAdmin"}',
            label: "彩金派送",
            type: "彩金"
          },
          {
            value: '{"type":"bonus","subType":"RebateBonus"}',
            label: "返水派送",
            type: "返水"
          },
          {
            value: '{"type":"bonus","subType":"bonus"}',
            label: "汇款优惠",
            type: "优惠"
          },
          {
            value: '{"type":"deposit","subType":"transfer"}',
            label: "额度转换失败",
            type: "额度转换"
          },
          {
            value: '{"type":"other","subType":"other"}',
            label: "其他",
            type: "其他"
          }
        ]
      },
      openFundsModal() {
        this.FundsOperate = true;
        this.reset();
      },
      FoudTypeChange1(val) {
        if (val) {
          const {
            type,
            subType
          } = JSON.parse(val);
          this.AccountChangeForm.type = type;
          this.AccountChangeForm.subType = subType;
          /*
          //彩金派送没有打码倍数
          if (subType === "giftBonusAdmin") {
            this.showMultipleInput1 = true;
          } else {
            this.showMultipleInput1 = false;
          }
          */
          // this.AccountChangeForm.role = type === "withdrawals" ? "-" : "+";
        }
      },
      FoudTypeChange2(val) {
        if (val) {
          const {
            type,
            subType
          } = JSON.parse(val);
          this.BatchAccountChangeForm.type = type;
          this.BatchAccountChangeForm.subType = subType;
          // if (subType === "giftBonusAdmin") {
          //   this.showMultipleInput2 = true;
          // } else {
          //   this.showMultipleInput2 = false;
          // }
          // this.BatchAccountChangeForm.role = type === "withdrawals" ? "-" : "+";
        }
      },
      listenOnSiteChange(re) {
        if (re.SiteId) {
          this.AutoCompleteData.siteId = re.SiteId;
          this.AccountChangeForm.siteId = re.SiteId;
          this.BatchAccountChangeForm.siteId = re.SiteId;
        }
      },
      AutoCompleteChange(re) {
        const {
          userName
        } = re;
        if (userName) {
          this.AccountChangeForm.userName = userName;
        }
      },
      reset() {
        this.$refs.SiteNameSelect1.setDefaultSite("");
        this.$refs.SiteNameSelect2.setDefaultSite("");
        this.foundsTypeSelec1 = ""
        this.foundsTypeSelect2 = ""
        this.$refs.AutoComplete.semodel.userName = "";
        this.AccountChangeForm.multiple = 0
        this.AccountChangeForm.type = ''
        this.AccountChangeForm.subType = ''
        this.AccountChangeForm.money = null
        this.AccountChangeForm.remarks = ''
        this.AccountChangeForm.userName = ''
        this.AccountChangeForm.siteId = null
        this.BatchAccountChangeForm.multiple = 0
        this.BatchAccountChangeForm.type = ''
        this.BatchAccountChangeForm.subType = ''
        this.BatchAccountChangeForm.userMoney = ''
        this.BatchAccountChangeForm.remarks = ''
        this.BatchAccountChangeForm.userName = ''
        this.BatchAccountChangeForm.siteId = null
        // this.AccountChangeForm = {
        //   role: "+",
        //   multiple: 0
        // };
        // this.BatchAccountChangeForm = {
        //   role: "+",
        //   multiple: 0
        // };
      },
      // 加减款操作
      submit(type, form) {
        this.submitBtnDisabled = true;
        clearTimeout(timer);
        let timer = setTimeout(()=>{
          this.submitBtnDisabled = false;
        },5000)
        /**
         * @augments type=single 单个操作
         * @augments type=batch 批量操作
         * @augments type=operateFailUser 操作失败用户
         * @augments form<obj> 失败用户的from
         * @param siteId: null,
                  userMoney: null,
                  type: null,
                  role: "+",
                  remarks: null,
                  subType: null,
                  multiple: 0
         */

        let submitForm = {};
        if (type === "single") {
          // this.AccountChangeForm.role = this.AccountChangeForm.type === "withdrawals" ? "-" : "+";
          Object.assign(submitForm, submitForm, this.AccountChangeForm);
          const {
            userName,
            money
          } = this.AccountChangeForm;
          submitForm.userMoney = userName + "," + money;
          delete submitForm["userName"];
          delete submitForm["money"];
          this.$refs.AccountChangeForm.validate(valid => {
            if (valid) {
              this.$root
                .HTTP_ALLLINKPOST(
                  this.$root.HTTP_L.HTTP_PiLiangXiuGaiHuiYuanJiaJianKuan,
                  submitForm
                )
                .then(res => {
                  this.$Modal.success({
                    title: "提示",
                    content: res.data.data
                  });
                  this.$emit("FundsOperate");
                  // }
                  this.reset();
                })
                .catch(res => {
                  this.reset();
                  this.$Modal.error({
                    title: "提示",
                    content: res.data.data
                  });
                });
            } else {
              this.$Modal.error({
                title: "提示",
                content: "请填写完整信息"
              });
            }
          })
        } else if (type === "batch") {
          // this.BatchAccountChangeForm.role = this.BatchAccountChangeForm.type === "withdrawals" ? "-" : "+";
          Object.assign(submitForm, submitForm, this.BatchAccountChangeForm);
          this.$refs.BatchAccountChangeForm.validate(valid => {
            if (valid) {
              this.$root
                .HTTP_ALLLINKPOST(
                  this.$root.HTTP_L.HTTP_PiLiangXiuGaiHuiYuanJiaJianKuan,
                  submitForm
                )
                .then(res => {
                  this.$Modal.success({
                    title: "提示",
                    content: res.data.data
                  });
                  this.$emit("FundsOperate");
                  // }
                  this.reset();
                })
                .catch(res => {
                  this.reset();
                  this.$Modal.error({
                    title: "提示",
                    content: res.data.data
                  });
                });
            } else {
              this.$Modal.error({
                title: "提示",
                content: "请填写完整信息"
              });
            }
          })
        }

      },
      // operateFailUser() {
      //   this.FundsOperateDetail = false;
      //   let form = {};
      //   Object.assign(form, form, this.BatchAccountChangeForm);
      //   let userMoney = "";
      //   this.failArr.forEach(item => {
      //     userMoney += `${item.userName},${item.money}\r\n`;
      //   });
      //   form.userMoney = userMoney;
      //   this.submit("operateFailUser", form);
      // },
      testUserNum(e) {
        var arr = e.target.value.split(",");
        if (arr.length > 10000) {
          this.$Modal.info({
            title: "提示",
            content: "用户量太大，最多可操作一万个用户，请分批操作！"
          });
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .fail-content {
    display: flex;
    flex-direction: column;
  }

  .fund-col {
    text-align: center;
    margin: 10px 0;
  }

  .total {
    padding: 2px 40px;
  }
</style>