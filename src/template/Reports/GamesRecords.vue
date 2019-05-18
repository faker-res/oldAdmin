<template>
  <div class="content-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form ref="RecordSearch" :model="RecordSearch" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="账号">
                <i-input autofocus type="text" style="width:150px" v-model="RecordSearch.userName" placeholder="请输入账号"></i-input>
              </FormItem>
              <FormItem label="选择游戏类型">
                <GameTypeSelect ref="GameTypeSelect" :GameClassSelectConf="GameClassSelectConf" @listenOnChange="listenOnGametypeChange"></GameTypeSelect>
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="datetimerange" v-model="timeRange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" style="width: 330px"></DatePicker>
              </FormItem>
              <FormItem label="注单编号">
                <i-input v-model="RecordSearch.billNo" style="width:150px" placeholder="请输入订单号"></i-input>
              </FormItem>
              <FormItem label="局号" v-if="RecordSearch.type === 'LIVE'">
                <i-input v-model="RecordSearch.gameCode" style="width:150px" placeholder="请输入局号"></i-input>
              </FormItem>
              <FormItem label="状态">
                <Select style="width: 90px" v-model="RecordSearch.status">
                  <Option value="all">全部</Option>
                  <Option value="yes">已结算</Option>
                  <Option value="no">未结算</Option>
                </Select>
              </FormItem>
              <FormItem label="每页笔数">
                <Select v-model="RecordSearch.pageLen" style="width:80px">
                  <Option value="30">30</Option>
                  <Option value="50">50</Option>
                  <Option value="100">100</Option>
                  <Option value="150">150</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button type="warning" @click="SearchRest">重置</Button>
              </FormItem>
            </i-form>
          </Card>
        </i-col>
        <i-col class="c_search_result" span="24">
          <div class="serach">
            <div class="have_con">
              <div style="margin: 10px 0;overflow: hidden">
                <MyTable :table="table" @listenOnTableData="listenOnTableData" />
              </div>
              <div v-if="Object.keys(table.TableData).length">
                <span>投注金额：{{table.TableData.totalCount.betAmount.toFixed(2)}}</span>
                <span>有效投注金额：{{table.TableData.totalCount.validBetAmount.toFixed(2)}}</span>
                <span>赢利金额：{{table.TableData.totalCount.netAmount.toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </i-col>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins";
import GameTypeSelect from "@/template/my-components/GameTypeSelect.vue";
export default {
  name: "GamesRecords",
  components: { GameTypeSelect },
  mixins: [mixins],
  data() {
    return {
      GameClassSelectConf: {
        style: {
          width: "185px"
        },
        GameClassVal: []
      },
      RecordSearch: {
        userName: "",
        platform: "", //游戏小类
        timeStart: "", //(必选)
        timeEnd: "", //(必选)
        billNo: "",
        type: "", //游戏大类(必选)
        isRules: "select",
        status: "all",
        pageLen: "30",
        siteId: null,
        gameCode: ""//局号
      },
      timeRange: [],
      gameList: [], //游戏类型大类
      platformList: [], //游戏类型小类
      commonColumn: [],
      //彩票
      lotteryCommon: [
        {
          title: "注单编号",
          key: "billNo",
          minWidth: 170,
        },
        {
          title: "站点",
          key: "siteName",
          minWidth: 100
        },
        {
          title: "会员名",
          key: "userName",
          minWidth: 100,
        },
        {
          title: "游戏账号",
          key: "playerName",
          minWidth: 110,
        },
        {
          title: "赔率",
          key: "odds",
          minWidth: 60
        },
        {
          title: "期数",
          key: "issue",
          width: 120
        },
        {
          title: "下注金额",
          key: "betAmount",
          minWidth: 90,
        },
        {
          title: "有效投注",
          key: "validBetAmount",
          minWidth: 90,
        },
        {
          title: "输赢",
          key: "netAmount",
          minWidth: 90,
        },
        {
          title: "订单个数",
          key: "betCount",
          minWidth: 60
        },
        {
          title: "彩种",
          key: "lotteryName",
          minWidth: 70
        },
        {
          title: "玩法",
          key: "playwayName",
          minWidth: 90
        },
        {
          title: "玩号",
          minWidth: 70,
          key: "ball",
          render:(h,params)=>{
            return h('span',params.row.ball||'-');
          }
        },
        {
          title: "下注内容",
          key: "betInfo",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    content:
                      params.row.betInfo == "" ? "无" : params.row.betInfo,
                    placement: "left"
                  }
                },
                params.row.betInfo.length > 5
                  ? params.row.betInfo.slice(0, 5) + "..."
                  : params.row.betInfo == ""
                    ? "无"
                    : params.row.betInfo
              )
            ]);
          }
        },
        {
          title: "下注时间/结算时间",
          width: 160,
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    borderBottom: "1px solid #e9eaec"
                  }
                },
                this.$moment.unix(params.row.betTime).format("LLL")
              ),
              h("div", this.$moment.unix(params.row.openTime).format("LLL"))
            ]);
          }
        },
        {
          title: "返点金额",
          key: "fdAmount",
          minWidth: 60
        },
        {
          title: "开奖结果",
          key: "result",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  props: {
                    content: params.row.result == "" ? "无" : params.row.result,
                    placement: "left"
                  }
                },
                params.row.result.length > 5
                  ? params.row.result.slice(0, 5) + "..."
                  : params.row.result == ""
                    ? "无"
                    : params.row.result
              )
            ]);
          }
        },
        {
          title: "状态",
          key: "status",
          minWidth: 50,
          render: (h, params) => {
            let text;
            switch (params.row.status) {
              case 0:
                text="未结算";
                break;
              case 1:
                text="赢";
                break;
              case 2:
                text="输";
                break;
              case 3:
                text="和";
                break;
              case 4:
                text="取消";
                break;
              default:
                text="撤销";
                break;
            }
            return h('span',text);
          }
        },
        {
          title: "返点值",
          key: "rebate",
          minWidth: 40
        }
      ],
      //体育
      sportColumn: [
        {
          title: "注单编号",
          key: "billNo",
          minWidth: 150,
        },
        {
          title: "站点",
          key: "siteName",
          minWidth: 100
        },
        {
          title: "平台",
          key: "platform",
          minWidth: 100
        },
        {
          title: "会员名",
          minWidth: 100,
          key: "userName",
        },
        {
          title: "第三方游戏账号",
          key: "playerName",
          minWidth: 120,
        },
        {
          title: "下注金额",
          key: "betAmount",
          minWidth: 90,
        },
        {
          title: "有效投注",
          key: "validBetAmount",
          minWidth: 90,
        },
        {
          title: "输赢",
          key: "netAmount",
          minWidth: 90,
        },
        {
          title: "游戏类型",
          key: "gameName",
          minWidth: 80,
        },
        {
          title: "下注内容",
          width: 300,
          render: (h, params) => {
            if (params.row.betInfo) {
              return h("div", [
                h("div", params.row.betInfo[0].leaguename),
                h("div", [
                  h("span", params.row.score + " "),
                  h("span", params.row.betInfo[0].hometeamname),
                  h("span", " VS "),
                  h("span", params.row.betInfo[0].awayteamname)
                ]),
                h("div", [
                  h("span", params.row.betInfo[0].teambetname + " "),
                  h("span", params.row.betInfo[0].hdp),
                  h("span", " @ "),
                  h("span", params.row.betInfo[0].odds)
                ])
              ]);
            }
          }
        },
        {
          title: "下注时间",
          key: "betTime",
          width: 160,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.betTime).format("LLL"));
          }
        },
        {
          title: "状态",
          key: "status",
          width: 60,
          render: (h, params) => {
            let text;
            switch (params.row.status) {
              case 0:
                text="未结算";
                break;
              case 1:
                text="已结算";
                break;
              default:
                text="无效"
                break;
            }
            return h('span',text);
          }
        }
      ],
      //棋牌，真人，电子
      liveColumn: [
        {
          title: "注单编号",
          key: "billNo",
          minWidth: 200,
        },
        {
          title: "站点",
          key: "siteName",
          minWidth: 100
        },
        {
          title: "平台",
          key: "platform",
          minWidth: 100
        },
        {
          title: "会员名",
          key: "userName",
          minWidth: 100,
        },
        {
          title: "游戏账号",
          key: "playerName",
          minWidth: 110,
        },
        {
          title: "下注金额",
          key: "betAmount",
          minWidth: 90,
        },
        {
          title: "有效投注",
          key: "validBetAmount",
          minWidth: 90,
        },
        {
          title: "输赢",
          key: "netAmount",
          minWidth: 90,
        },
        {
          title: "玩法",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gameName + " "),
              h("span", {
                domProps: {
                  innerHTML: params.row.betInfo
                }
              })
            ]);
          }
        },
        {
          title: "下注时间",
          key: "betTime",
          minWidth: 100,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.betTime).format("LLL"));
          }
        }
      ],
      table: {
        TableColumn: [],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_ChaXunXiaZhuJiLu,
        flag: true,
        dataform: {}
      }
    };
  },
  created (){
    if(Object.keys(this.$route.query).length){
      this.RecordSearch.siteId = this.$route.query.siteId;
      this.$set(this.SiteNameSelectData, "edit", true);
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query.type) {
        this.GameClassSelectConf.GameClassVal = [
          this.$route.query.type,
          this.$route.query.platform
        ];
      }
      this.$refs.GameTypeSelect.InitData().then(result => {
        this.gameList = result;
        if (this.$route.query.userName) {
          this.$refs.SiteNameSelect.setDefaultSite(this.$route.query.siteId - 0)
          if (this.$route.query.timeStart === this.$route.query.timeEnd) {
            this.timeRange = [
              this.$moment(this.$route.query.timeStart),
              this.$moment(this.$route.query.timeEnd).add(1, "day")
            ];
          } else {
            this.timeRange = [
              this.$moment(this.$route.query.timeStart),
              this.$moment(this.$route.query.timeEnd)
            ];
          }
          //从总报表、提款管理、彩票报表，跳转过来
          //总报表platform=CT_LOTTERY
          //提款管理platform=lottery
          this.RecordSearch.userName = this.$route.query.userName;
          this.RecordSearch.type = this.$route.query.type
            ? this.$route.query.type
            : this.gameList[0].value;
          this.RecordSearch.platform = this.$route.query.platform
            ? this.$route.query.platform === "CT_LOTTERY" ||
              this.$route.query.platform === "lottery"
              ? "all"
              : this.$route.query.platform
            : "";
        } else {
          this.updateTime();
          this.RecordSearch.type = this.gameList[0].value;
          this.RecordSearch.platform = this.gameList[0].children[0].value;
          this.RecordSearch.isRules = "select";
        }
        this.SearchSubmit();
      });
    });
  },
  methods: {
    updateTime() {
      this.timeRange = [
        this.$moment({
          hours: 0,
          minutes: 0,
          seconds: 0
        }).format("LLL"),
        this.$moment({
          hours: 0,
          minutes: 0,
          seconds: 0
        })
          .add(1, "days")
          .format("LLL")
      ];
    },
    listenOnGametypeChange(re) {
      this.RecordSearch.type = re[0];
      this.RecordSearch.platform = re[1];
    },
    mechange(re) {
      this.RecordSearch.siteId = re.SiteId;
    },
    listenOnTableData() {
      let game = this.RecordSearch.type;
      this.gameList.forEach(item => {
        if (item.value == game) {
          if (game == "CT_LOTTERY") {
            //彩票
            this.table.TableColumn = [...this.lotteryCommon];
          } else {
            switch (game) {
              case "VR_LOTTERY": //VR
                this.table.TableColumn = [...this.lotteryCommon];
                break;
              case "SPORT": //体育
                if (
                  this.RecordSearch.platform === "SHABA_SPORT" ||
                  this.RecordSearch.platform === "SX_SPORT"
                ) {
                }
                this.table.TableColumn = [...this.sportColumn];
                break;
              case "LIVE": //视讯
                this.table.TableColumn = [...this.liveColumn];
                // if (this.RecordSearch.platform === "AG_LIVE") {
                  this.table.TableColumn.splice(1,0,{
                    title: "局号",
                    key: "gameCode",
                    minWidth: 140
                  });
                // }
                break;
              default:
                this.table.TableColumn = [...this.liveColumn];
            }
          }
        }
      });
    },
    SearchSubmit() {
      let postData = {};
      this.RecordSearch.timeStart = this.$moment(this.timeRange[0]).format(
        "LLL"
      );
      this.RecordSearch.timeEnd = this.$moment(this.timeRange[1]).format("LLL");
      this.RecordSearch.gameCode = this.RecordSearch.type === 'LIVE' ? this.RecordSearch.gameCode : "";

      for (var key in this.RecordSearch) {
        if (this.RecordSearch.platform == "all") {
          this.RecordSearch.platform = "";
        }
        if (this.RecordSearch[key] != "" && this.RecordSearch[key] != null) {
          postData[key] = this.RecordSearch[key];
        }
      }
      this.table.dataform = postData;
    },
    SearchRest() {
      this.$refs.GameTypeSelect.GameClassVal = [
        this.gameList[0].value,
        this.gameList[0].children[0].value
      ];
      this.RecordSearch = {
        userName: "",
        platform: this.gameList[0].children[0].value,
        timeStart: "",
        timeEnd: "",
        billNo: "",
        type: this.gameList[0].value,
        status: "all",
        pageLen: "30",
        siteId: this.defaultSiteId
      };
      this.$set(this.SiteNameSelectData, "edit", false);
      this.$refs.SiteNameSelect.InitData();
      this.updateTime();
      this.SearchSubmit();
    }
  }
};
</script>

<style scoped lang="less">
</style>