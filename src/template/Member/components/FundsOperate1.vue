<template>
  <div style="display:inline-block">
    <Button type="primary" @click="openFundsModal">加款减款</Button>
    <Modal class-name="vertical-center-modal" v-model="FundsOperate" :scrollable="true" :mask-closable="false" width="650"
      title="加款减款">
      <Tabs value="AccountChangeForm" @on-click="tabChange">
        <TabPane label="加款/扣款" name="AccountChangeForm">
          <FoundForms>

          </FoundForms>
        </TabPane>
        <TabPane label="批量加款/扣款" name="BatchAccountChangeForm">
          <FoundForms>

          </FoundForms>
        </TabPane>
      </Tabs>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  import FoundForms from "./FoundForms";
  export default {
    components: {
      FoundForms
    },
    data() {
      return {
        FundsOperate: false,
        FundsOperateDetail: false,
        failArr: [], //操作失败的集合
        failMoneyTotal: 0,
        successMoneyTotal: 0,
        successArr: [], //操作成功的集合
        showMultipleInput1: false,
        showMultipleInput2: false,
      
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
      };
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
        // this.reset();
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