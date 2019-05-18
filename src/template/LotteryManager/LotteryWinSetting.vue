<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="DataSearch" inline>
                <FormItem label="彩种">
                  <Select v-model="DataSearch.lid" style="width:140px" @on-change="toggleLottery" placeholder="请选择彩种">
                    <Option :key="i" v-for="(cp,i) in selectList" :value="cp.id">{{cp.name}}</Option>
                  </Select>
                </FormItem>
                  <FormItem label="开奖期号">
                    <i-input style="width:260px" v-model="OpenLotteryForm.issue" placeholder="例如 201806190248"></i-input>
                  </FormItem>
                  <FormItem label="封盘时间">
                    <i-input style="width:260px" v-model="OpenLotteryForm.openingTime" placeholder="例如 2018-07-25 18:30:00"></i-input>
                  </FormItem>
                  <FormItem label="开奖号码">
                    <i-input style="width:260px" v-model="OpenLotteryForm.number" placeholder="例如 1,2,3,4,5(用英文逗号隔开)"></i-input>
                  </FormItem>
                <FormItem>
                    <Button @click="UpdateOpenLottery" type="success">开奖</Button>
                    <Button @click="resetOpenLotteryForm" type="warning">重置</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div style="margin:10px 0;overflow: hidden">
                    <AdminlistTable :table="table"></AdminlistTable>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
      <Modal class-name="vertical-center-modal" v-model="showUpdateOpenLotteryModal" :loading="true" @on-ok="UpdateOpenLotteryResult" width="550px" title="开奖修改">
        <Form ref="UpdateOpenLotteryForm" :model="UpdateOpenLotteryForm" label-position="left" :label-width="110">
          <FormItem label="开奖号码">
            <i-input style="width:300px" type="textarea" v-model="UpdateOpenLotteryForm.number" placeholder="例如 1,2,3,4,5(用英文逗号隔开)"></i-input>
          </FormItem>
        </Form>
      </Modal>
      <Modal class-name="vertical-center-modal" v-model="showAgainPrizeModal" :scrollable="true" :mask-closable="false" width="550px" title="开奖回滚">
        <Form ref="AgainPrizeForm" :model="AgainPrizeForm" :rules="AgainPrizeFormRules" label-position="left" :label-width="110">
          <FormItem label="彩种名称" prop="lotteryName">
            <i-input style="width:260px" v-model="AgainPrizeForm.lotteryName" placeholder="例如 201806190248"></i-input>
          </FormItem>
          <FormItem label="开奖期号" prop="issue">
            <i-input style="width:260px" v-model="AgainPrizeForm.issue" placeholder="例如 201806190248"></i-input>
          </FormItem>
          <FormItem label="撤回类型" prop="type">
            <Select clearable v-model="AgainPrizeForm.type" style="width:260px;" placeholder="请选择类型">
              <Option value="1">只撤回未中奖的注单</Option>
              <Option value="2"> 撤回所有的注单</Option>
            </Select>
          </FormItem>
          <FormItem label="开奖号码" prop="result">
            <i-input style="width:260px;" type="textarea" v-model="AgainPrizeForm.result" placeholder="例如 1,2,3,4,5(必须使用英文格式的逗号)"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading='$root.btnLoading' @click="UpdateAgainPrize">确定</Button>
            <Button @click="showAgainPrizeModal=false">取消</Button>
          </FormItem>
        </Form>
        <div slot="footer"></div>
      </Modal>
    </div>
  </div>
</template>

<script>
import AdminlistTable from "@/template/my-components/iview-table/table";
import sixLotteryColor from "@/local/sixLotteryColor";
export default {
  name: "LotteryWinSetting",
  components: {
    AdminlistTable
  },
  data() {
    return {
      sixLotteryColor: sixLotteryColor,
      selectList: [],
      showUpdateOpenLotteryModal: false,
      showAgainPrizeModal: false,
      OpenLotteryForm: {
        lid: 1,
        issue: null,
        number: null,
        openingTime: null
      },
      UpdateOpenLotteryForm: {
        lid: null,
        issue: null,
        number: null
      },
      AgainPrizeForm: {
        lotteryName: null,
        lid: null,
        issue: null,
        type: null,
        result: null
      },
      DataSearch: {
        lid: 1,
      },
      AgainPrizeFormRules:{
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        result: [
          {
            required: true,
            message: "请输入开奖号码",
            trigger: "blur"
          }
        ]
      },
      table: {
        TableColumn: [
          {
            title: "彩种",
            key: "lotteryName",
            render: (h, params) => {
              return this.selectList.map(item => {
                if (item.id == params.row.lotteryId) {
                  return item.name;
                }
              });
            }
          },
          {
            title: "期数",
            key: "issue",
          },
          {
            title: "开奖结果",
            key: "resultInfo",
            render: (h, params) => {
              return params.row.resultInfo.split(",").map(ballnum => {
                let bgColor;
                if (
                  params.row.lotteryId === 1 ||//香港六合彩
                  params.row.lotteryId === 18 ||//快速六合彩
                  params.row.lotteryId === 19//5分六合彩
                ) {
                  this.sixLotteryColor.map(item => {
                    if (item.number.includes(ballnum * 1)) {
                      bgColor = item.color;
                    }
                  });
                } else {
                  let c1 = parseInt(Math.random() * 256);
                  let c2 = parseInt(Math.random() * 256);
                  let c3 = parseInt(Math.random() * 256);
                  bgColor = `rgba(${c1},${c2},${c3},.9)`;
                }
                return h(
                  "span",
                  {
                    style: {
                      color: "#fff",
                      cursor: "pointer",
                      width: "20px",
                      height: "20px",
                      marginLeft: "5px",
                      display: "inline-block",
                      backgroundColor: bgColor,
                      textShadow: "1px 1px 1px #000"
                    }
                  },
                  ballnum
                );
              });
            }
          },
          {
            title: "封盘时间",
            key: "openingTime",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.openingTime - 0).format("LLL"));
            }
          },
          {
            title: "开奖时间",
            key: "addTime",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.addTime - 0).format("LLL"));
            }
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              return h('span',params.row.status === "yes" ? "已结算" : "未结算");
            }
          },
          {
            title: "操作",
            key: "",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.status === "no" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.showUpdateOpenLotteryModal = true;
                        this.UpdateOpenLotteryForm.lid = params.row.lotteryId;
                        this.UpdateOpenLotteryForm.issue = params.row.issue;
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.status === "yes" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.selectList.map(item => {
                          if (item.id == params.row.lotteryId) {
                            this.AgainPrizeForm.lotteryName = item.name;
                          }
                        });
                        this.showAgainPrizeModal = true;
                        this.resetAgainPrizeForm();
                        this.AgainPrizeForm.lid = params.row.lotteryId;
                        this.AgainPrizeForm.issue = params.row.issue;
                      }
                    }
                  },
                  "回滚"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginLeft: "5px"
                    },
                    on: {
                      click: () => {
                        this.LotteryClearing(params);
                      }
                    }
                  },
                  "结算"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Get_OpenLotteryRecord,
        Refresh: 0,
        dataform: {
          isRules: "select",
          lid: 1
        }
      }
    };
  },
  created() {
   this.getLotteryRecordOfYes();
  },
  methods: {
    getLotteryRecordOfYes(){
       this.$root
      .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Get_LotteryRecordOfYes)
      .then(res => {
        this.selectList = res.data.data;
      });
    },
    LotteryClearing(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_LotteryClearing, {
          issue: params.row.issue,
          lid: params.row.lotteryId
        })
        .then(res => {
          this.$Modal.success({
            title: "提示",
            content: `${res.data.data}`
          });
          this.$set(this.table.TableData.data[params.index], "status", "yes");
          params.row.status = "yes";
        });
    },
    toggleLottery(re) {
      this.OpenLotteryForm.lid = re;
      this.Search();
    },
    resetOpenLotteryForm(){
        this.OpenLotteryForm.issue = ""; 
        this.OpenLotteryForm.number = ""; 
        this.OpenLotteryForm.openingTime = "";
        this.Search();
    },
    resetAgainPrizeForm(){
      this.AgainPrizeForm.type = ""; 
      this.AgainPrizeForm.result = ""; 
    },
    Search() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    UpdateOpenLottery() {
      //开奖
      let url = this.$root.HTTP_L.HTTP_Insert_OpenLotteryNumber;
      let params = { ...this.OpenLotteryForm };
      let reg = /\w/;
      for (let value of Object.values(params)) {
        if(!reg.test(value)){
          this.$root.modal('error','','请填写完整信息！');
          return false;
        }
      }
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal('success','','开奖成功');
        this.table.Refresh++;
      })
    },
    UpdateOpenLotteryResult() {
      //修改开奖结果
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Update_OpenLotteryResult,
          this.UpdateOpenLotteryForm
        )
        .then(res => {
          this.$root.modal('success','','修改成功');
          this.showUpdateOpenLotteryModal = false;
          this.table.Refresh++;
        })
    },
    UpdateAgainPrize() {
      //回滚重新派奖
      this.$refs.AgainPrizeForm.validate(valid => {
        if(valid){
          let url = this.$root.HTTP_L.HTTP_Update_AgainPrize;
          let params = { ...this.AgainPrizeForm };
          this.$root.HTTP_ALLLINKPOST(url, params)
          .then(res => {
            this.$root.modal('success','','重新开奖成功');
            this.resetAgainPrizeForm();
            this.showAgainPrizeModal = false;
            this.table.Refresh++;
          })
        }
      })
    }
  },
};
</script>