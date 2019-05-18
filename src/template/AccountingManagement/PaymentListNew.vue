<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1">
        <Button type="primary" @click="$router.push({name:'PaymentCreateNew'})" style="margin-bottom:10px;">创建支付账号</Button>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form :model="search" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="支付分组">
                <PayClassSelect ref="PayClassSelect" @listenOnChange="mechangeZhiFuFenZu" :PayClassSelectData="PayClassSelectData" />
              </FormItem>
              <FormItem label="客户端">
                <Select style="width:120px" v-model="search.devices">
                  <Option value="all">
                    <span>全部</span>
                  </Option>
                  <Option value="pc">
                    <span>PC</span>
                  </Option>
                  <Option value="h5">
                    <span>H5</span>
                  </Option>
                  <Option value="ios">
                    <span>IOS</span>
                  </Option>
                  <Option value="android">
                    <span>Android</span>
                  </Option>
                </Select>
              </FormItem>
              <FormItem label="每页条数">
                <Select v-model="search.limit" style="width:80px">
                  <Option value="10" label="10">10</Option>
                  <Option value="25" label="25">25</Option>
                  <Option value="50" label="50">50</Option>
                  <Option value="80" label="80">80</Option>
                </Select>
              </FormItem>
              <FormItem class="form-group">
                <Button @click="Search" type="primary">查询</Button>
                <Button @click="SearchRest" type="warning">重置</Button>
              </FormItem>
            </i-form>
          </Card>
        </i-col>
        <i-col class="c_search_result" span="24">
          <div class="tabs">
            <div class="tabs-nav-container">
              <div class="tabs-nav-wrap">
                <div class="tabs-tab" :class="{active:search.status === 'yes'}" @click="toggleStatus('yes')">启用</div>
                <div class="tabs-tab" :class="{active:search.status === 'no'}" @click="toggleStatus('no')">停用</div>
              </div>
            </div>
          </div>
          <div style="margin: 10px 0;overflow: hidden">
            <MyTable :table="table"></MyTable>
          </div>
        </i-col>
      </div>
    </div>
    <Modal v-model="levelManage" title="支付管理" @on-ok="changeLevelManage" class="levelManageModal" width=900>
      <i-form :model="levelManageData" :label-width="110">
        <FormItem label="商户名称">
          <span style="color:#f00;line-height:36px;font-weight:800;" v-if="Object.keys(params).length">{{params.row.payName}}</span>
        </FormItem>
        <FormItem label="支付分组">
          <PayClassSelect ref="payClassLevelManage" @listenOnChange="changePayClass" :PayClassSelectData="PayClassLevelData" />
        </FormItem>
        <FormItem v-if="moneyType === 'formatAmount'" label="支付固定金额">
          <div v-for="(item,i) in payClassData" :key="i">
            <label style="display:inline-block;width:110px;">{{item.className}}</label>
            <Input style="width:260px" v-model="formatAmount[item.id]" placeholder="用,隔开，如100,200,300" />
          </div>
        </FormItem>
        <FormItem v-if="moneyType === 'limitAmount'" label="支付限额">
          <div v-for="(item,i) in payClassData" :key="i">
            <label style="display:inline-block;width:110px;">{{item.className}}</label>
            <InputNumber style="width:120px" :min="0" v-model="minAmount[item.id]" placeholder="最小支付额度"></InputNumber>
            -
            <InputNumber style="width:120px" :min="0" v-model="maxAmount[item.id]" placeholder="最大支付额度"></InputNumber>
          </div>
        </FormItem>
      </i-form>
    </Modal>
    <Modal v-model="bussinessDetail" class="bussinessDetailModal">
      <p slot="header" style="text-align:center">
        <span>查看商家讯息</span>
      </p>
      <div v-if="Object.keys(params).length">
        <p>
          <label>商户名称：</label>
          <span style="color:#f00;">{{params.row.payName}}</span>
        </p>
        <p>
          <label>商户代称：</label>
          <span>{{params.row.name}}</span>
        </p>
        <p>
          <label>商户编号：</label>
          <span>{{params.row.businessNo}}</span>
        </p>
      </div>
      <div slot="footer">
        <Button type="primary" @click="bussinessDetail = false">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  // name: "PaymentList",
  mixins: [mixins],
  data() {
    return {
      bussinessDetail: false, //商家讯息弹框
      search: {
        siteId: "",
        class: null,
        devices: "all",
        status: "yes",
        limit: "10"
        // level: ""
      },
      levelManage: false, //层级管理弹框
      levelManageData: {
        //层级管理提交数据
        limitAmount: {},
        formatAmount: {},
        paymentId: null,
        classId: "",
        siteId: ""
      },
      PayClassLevelData: {
        //层级管理里的支付类型下拉框
        flag: false,
        default: false, //不默认选中
        classType: "payment",
        type: "多选",
        placeholder: "请选择支付类型",
        style: {
          width: "260px"
        }
      },
      payClassData: [], //层级管理弹框的支付类型具体数据
      moneyType: "", //层级管理弹框的支付类型
      devices: {}, //层级管理弹框的客户端选中
      formatAmount: {}, //层级管理支付固定金额
      minAmount: {}, //层级管理最小金额
      maxAmount: {}, //层级管理最大金额
      levelId: {}, //层级管理会员等级id
      levelName: {}, //层级管理会员等级名称
      levelModal: false, //层级管理会员等级弹框
      classId: null, //层级管理选择会员等级时的对应的支付类型id
      params: {},
      flag: false,
      table: {
        TableColumn: [
          {
            title: "站点名称",
            minWidth: 80,
            key: "siteName"
          },
          {
            title: "支付名称(会员端)",
            key: "name"
          },
          {
            title: "支付名称(管理端)",
            key: "payName"
          },
          {
            title: "支付分组",
            render: (h, params) => {
              return h(
                "p",
                params.row.classData.map((item, index) => {
                  return h(
                    "div",
                    {
                      style: {
                        padding: "5px 0"
                      }
                    },
                    item.className
                  );
                })
              );
            }
          },
          {
            title: "支付额度",
            minWidth: 220,
            render: (h, params) => {
              let data = params.row.limitAmount
                ? JSON.parse(params.row.limitAmount)
                : JSON.parse(params.row.formatAmount);
              return h(
                "p",
                Object.values(data).map((item, index) => {
                  return h(
                    "div",
                    {
                      style: {
                        padding: "5px"
                      }
                    },
                    item.name +
                      ":" +
                      (item.hasOwnProperty("formatAmount")
                        ? item.formatAmount
                        : item.minAmount + "-" + item.maxAmount)
                  );
                })
              );
            }
          },
          {
            title: "备注",
            key: "remarks",
            render: (h, params) => {
              return h('span',params.row.remarks ? params.row.remarks : "无");
            }
          },
          {
            title: "操作",
            key: "",
            width: 300,
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      // type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.status == "yes" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.bussinessDetail = true;
                        this.params = params;
                      }
                    }
                  },
                  "查看商家讯息"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.flag = true;
                        this.formatAmount = {};
                        this.minAmount = {};
                        this.maxAmount = {};
                        this.params = params;
                        this.moneyType = params.row.limitAmount
                          ? "limitAmount"
                          : "formatAmount";
                        this.levelManageData.paymentId = params.row.id;
                        this.levelManageData.siteId = params.row.siteId;
                        //选中支付类型
                        this.$set(this.PayClassLevelData, "data", {});
                        let classIdList = [];
                        params.row.classData.forEach(i => {
                          classIdList.push(i.id - 0);
                        });
                        this.PayClassLevelData.data.id = classIdList;
                        this.levelManage = true;
                      }
                    }
                  },
                  "支付管理"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.params = params;
                        this.sequence(params.row.status, "");
                      }
                    }
                  },
                  params.row.status === "yes" ? "停用" : "启用"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "PaymentCreateNew",
                          query: {
                            siteId: params.row.siteId,
                            paymentId: params.row.id,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      display:
                        params.row.status === "no" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_Delete_Payment,
                                {
                                  paymentId: params.row.id,
                                  siteId: params.row.siteId
                                }
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.$root.modal(
                                    "success",
                                    "",
                                    "支付账户删除成功！"
                                  );
                                  this.table.TableData.data.splice(
                                    params.index,
                                    1
                                  );
                                  this.table.TableData.total--;
                                },
                                res => {
                                  this.$Spin.hide();
                                  setTimeout(() => {
                                    this.$Modal.remove();
                                  }, 2000);
                                }
                              );
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        Refresh: 0,
        posturl: this.$root.HTTP_L.HTTP_List_Payment,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10",
          status: "yes"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.PayClassSelect.InitData();
      this.$refs.payClassLevelManage.InitData();
    });
  },
  methods: {
    //排序和修改状态
    sequence(status, sequence) {
      if (status) {
        status = status === "yes" ? "no" : "yes";
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Payment_Status, {
          paymentId: this.params.row.id,
          updated_user: this.$root.adminuserinfo.adminUserName,
          sequence: sequence,
          status: status,
          siteId: this.params.row.siteId
        })
        .then(res => {
          this.$root.modal("success", "", res.data.data);
          this.table.Refresh++;
        });
    },
    //层级管理里的支付分组选择
    changePayClass(re) {
      this.payClassData = re.id.map((item, i) => {
        let obj = {};
        obj.id = item;
        obj.className = re.className[i];
        return obj;
      });
      if (this.flag) {
        //编辑状态
        this.levelManageData.limitAmount = this.params.row.limitAmount
          ? JSON.parse(this.params.row.limitAmount)
          : "";
        this.levelManageData.formatAmount = this.params.row.formatAmount
          ? JSON.parse(this.params.row.formatAmount)
          : "";
        let limitAmount = this.levelManageData.limitAmount;
        let formatAmount = this.levelManageData.formatAmount;
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
          this.levelManageData.limitAmount = {};
          this.levelManageData.formatAmount = "";
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
            this.levelManageData.limitAmount[i.id] = {
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
          this.levelManageData.formatAmount = {};
          this.levelManageData.limitAmount = "";
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
            this.levelManageData.formatAmount[i.id] = {
              name: i.className,
              formatAmount: ""
            };
          });
        }
      }
      this.levelManageData.classId = re.id.toString();
    },
    //提交层级管理
    changeLevelManage() {
      if (this.levelManageData.limitAmount) {
        for (let key in this.levelManageData.limitAmount) {
          this.levelManageData.limitAmount[key].minAmount = this.minAmount[key];
          this.levelManageData.limitAmount[key].maxAmount = this.maxAmount[key];
        }
        this.levelManageData.limitAmount = JSON.stringify(
          this.levelManageData.limitAmount
        );
        this.levelManageData.formatAmount = " ";
      } else {
        for (let key in this.levelManageData.formatAmount) {
          this.levelManageData.formatAmount[
            key
          ].formatAmount = this.formatAmount[key];
        }
        this.levelManageData.formatAmount = JSON.stringify(
          this.levelManageData.formatAmount
        );
        this.levelManageData.limitAmount = " ";
      }
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Payment_LevelManage,
          this.levelManageData
        )
        .then(res => {
          this.$root.modal("success", "", res.data.data);
          this.table.Refresh++;
        });
    },
    mechangeZhiFuFenZu(re) {
      //搜索的支付分组选择
      this.search.class = re.id;
    },
    mechange(re) {
      //站点等级选择
      this.search.siteId = re.SiteId;
    },
    mechangeHuiYuanDengJi(re) {
      //搜索里的会员等级选择
      this.search.level = re.id;
    },
    //启用停用
    toggleStatus(status) {
      this.search.status = status;
      this.Search();
    },
    Search() {
      this.search.class = this.search.class === 0 ? "" : this.search.class;
      this.search.devices =
        this.search.devices === "all" ? "" : this.search.devices;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.class = this.search.class ? this.search.class : 0;
      this.search.devices = this.search.devices ? this.search.devices : "all";
    },
    SearchRest() {
      this.$refs.PayClassSelect.DATAA.SiteDataD.id = 0;
      this.search = {
        siteId: this.defaultSiteId,
        class: null,
        devices: "",
        status: this.search.status,
        limit: "10"
      };
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  height: 32px;
  padding-left: 0;
  margin-bottom: 16px;
  margin: 0;
  border-bottom: 1px solid #dddee1;
  // float: left;
  list-style: none;
  box-sizing: border-box;
  position: relative;
  transition: transform 0.5s ease-in-out;

  .tabs-nav-container {
    margin-bottom: -1px;
    line-height: 1;
    font-size: 14px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    zoom: 1;

    .tabs-nav-wrap {
      position: relative;

      .tabs-tab {
        margin: 0;
        margin-right: 4px;
        height: 31px;
        padding: 5px 16px 4px;
        border: 1px solid #dddee1;
        border-bottom: 0;
        border-radius: 4px 4px 0 0;
        transition: all 0.3s ease-in-out;
        background: #f8f8f9;
        display: inline-block;
        height: 100%;
        padding: 8px 16px;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
      }

      .active {
        height: 32px;
        padding-bottom: 5px;
        background: #fff;
        transform: translateZ(0);
        border-color: #dddee1;
        color: #2d8cf0;
      }
    }
  }
}

.bussinessDetailModal {
  .ivu-modal {
    .ivu-modal-body {
      p {
        font-size: 14px !important;
        line-height: 2.5 !important;
      }
    }
  }
}

// .levelManageModal {
//   .ivu-modal {
//     .ivu-modal-body {
//       .ivu-form-item{

//         .ivu-form-item-content {
//           display: inline-block !important;
//         }
//       }
//     }
//   }
// }
</style>