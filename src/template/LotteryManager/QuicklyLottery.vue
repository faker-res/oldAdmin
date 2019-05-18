<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <!-- <div class="caozuo_btn">
                    <Button type="primary" @click="$router.push({name:'QuicklyLotteryBlackList'})">黑名单管理</Button>
                  </div> -->
                  <div style="margin: 10px 0;overflow: hidden">
                    <QuickLotteryListTable :table="table"></QuickLotteryListTable>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
      <Modal class-name="vertical-center-modal" v-model="ShowConfigFormModal" :loading="true" @on-ok="UpdateTheConfig" title="更新配置">
        <Form :model="ConfigForm" label-position="left" :label-width="110">
          <FormItem class="form-group" label="当前风控状态">
            <Select @on-change="SelectControlStatus" v-model="ConfigForm.level" style="width:260px">
              <Option value="rand">随机</Option>
              <Option value="kill">控制</Option>
              <Option value="open">放水</Option>
            </Select>
          </FormItem>
          <FormItem class="form-group" label="平台盈利率">
            <InputNumber :step="0.01" style="width:260px" v-model="ConfigForm.rate" placeholder="请输入平台盈利率"></InputNumber>
          </FormItem>
          <FormItem class="form-group" label="状态变更">
            <i-switch size="large" v-model="lockStatu" @on-change="changeLock">
              <span slot="open">未锁</span>
              <span slot="close">已锁</span>
            </i-switch>
          </FormItem>
          <FormItem class="form-group" label="奖池上限金额">
            <InputNumber :step="1000" style="width:260px" v-model="ConfigForm.maxJackpot" placeholder="请输入奖池上限金额"></InputNumber>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
import QuickLotteryListTable from "@/template/my-components/iview-table/table";
export default {
  components: {
    QuickLotteryListTable
  },
  data() {
    return {
      ShowConfigFormModal: false,
      lockStatu: null,
      ConfigForm: {
        id: null,
        level: null,
        rate: null,
        lock: null,
        maxJackpot: null
      },
      DataSearch: {
        lid: ""
      },
      table: {
        TableColumn: [
          {
            title: "彩票名称",
            key: "lotteryName",
          },
          {
            title: "所属分类",
            key: "type",
          },
          {
            title: "下注金额",
            key: "betMoney",
          },
          {
            title: "会员输赢",
            key: "win",
          },
          {
            title: "下注金额(黑名单)",
            key: "blackBetMoney",
            // width: 110,
          },
          {
            title: "用户输赢(黑名单)",
            key: "blackWin",
            // width: 110,
          },
          {
            title: "风控状态",
            key: "level",
            // width:60,
            render: (h, params) => {
              let text;
              switch (params.row.level) {
                case "rand":
                  text="随机"
                  break;
                case "kill":
                  text="控制"
                  break;
                default:
                  text="放水"
                  break;
              }
              return h('span',text);
            }
          },
          {
            title: "平台盈利",
            key: "rate",
            // width:60,
            render: (h, params) => {
              return h('span',params.row.rate * 100 + "%");
            }
          },
          {
            title: "开奖间隔",
            key: "openTimeSet",
            // width:75,
            render: (h, params) => {
              let oTs = params.row.openTimeSet;
              let hour = Math.floor(oTs / 3600);
              hour = hour > 0 ? hour + "小时" : "";
              let min = Math.floor((oTs % 3600) / 60);
              min = min > 0 ? min + "分钟" : "";
              let sec = oTs % 60;
              sec = sec > 0 ? sec + "秒" : "";
              let time = hour + min + sec;
              return h('span',time);
            }
          },
          {
            title: "开始统计时间",
            key: "lastCountTime",
            width: 140,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.lastCountTime - 0).format("LLL"));
            }
          },
          // {
          //   title: "奖池金额",
          //   key: "jackpot",
          // },
          // {
          //   title: "奖池上限金额",
          //   key: "maxJackpot",
          //   // minWidth: 90,
          // },
          // {
          //   title: "奖池状态",
          //   key: "jackpotStatus",
          //   width:60,
          //   render: (h, params) => {
          //     return h('span',params.row.jackpotStatus === "add" ? "累积" : "派彩");
          //   }
          // },
          {
            title: "状态",
            key: "lock",
            width:50,
            render: (h, params) => {
              return h('span',params.row.lock === 0 ? "未锁" : "加锁");
            }
          },
          {
            title: "操作",
            key: "",
            width: 170,
            render: (h, params) => {
              var that = this;
              return h("div", [
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
                          name: "LotteryWinDetail",
                          query: {
                            lotteryId: params.row.lotteryId
                          }
                        });
                      }
                    }
                  },
                  "详情"
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
                        this.$Modal.confirm({
                          content: "确认初始化？",
                          onOk: () => {
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_KuaiSuChuShiHuaPeiZhi,
                                {
                                  id: params.row.id
                                }
                              )
                              .then(res => {
                                this.$Modal.success({
                                  title: "提示",
                                  content: "初始化成功！"
                                });
                              })
                              .catch(res => {
                                this.$Message.error("初始化失败！");
                              });
                          }
                        });
                      }
                    }
                  },
                  "初始化"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.lockStatu = !Boolean(params.row.lock);
                        this.ShowConfigFormModal = true;
                        this.ConfigForm.id = params.row.id;
                        this.ConfigForm.level = params.row.level;
                        this.ConfigForm.rate = Number(params.row.rate);
                        this.ConfigForm.maxJackpot = Number(
                          params.row.maxJackpot
                        );
                      }
                    }
                  },
                  "更新"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_KuaiSuShuJuZongLan,
        Refresh: 0,
        dataform: { isRules: "select" }
      }
    };
  },
  methods: {
    SelectControlStatus(val) {
      this.ConfigForm.level = val;
    },
    changeLock(val) {
      if (val) {
        this.ConfigForm.lock = 0;
      } else {
        this.ConfigForm.lock = 1;
      }
    },
    UpdateTheConfig() {
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_KuaiSuGengXinPeiZhi,
          this.ConfigForm
        )
        .then(res => {
          this.$Modal.success({
            title: "提示",
            content: "更新成功！"
          });
          this.ShowConfigFormModal = false;
          this.table.dataform = { isRules: "select" };
        })
        .catch(res => {
          this.$Message.error("更新失败！");
        });
    },
    Search() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    SearchRest() {
      this.DataSearch = {
        lid: ""
      };
      this.table.dataform = { lid: "" };
    }
  }
};
</script>