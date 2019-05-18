<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <div class="c_left">
                    <i-col class="c_search_top" span="24">
                        <Card dis-hover>
                            <i-form :model="search" inline>
                                <FormItem label="站点">
                                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                                </FormItem>
                                <FormItem label="时区">
                                    <Select v-model="search.timeType" style="width:100px">
                                        <Option value="cn">北京时间</Option>
                                        <Option value="en">美东时间</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="日期时间">
                                    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" v-model="Time" placeholder="选择日期" style="width: 340px"></DatePicker>
                                </FormItem>
                                <FormItem label="账号">
                                    <i-input type="text" style="width:200px" v-model="search.userName" placeholder="请输入账号"></i-input>
                                </FormItem>
                                <FormItem class="form-group">
                                    <Button @click="Search" type="primary">查询</Button>
                                    <Button @click="SearchRest" type="warning">重置</Button>
                                </FormItem>
                            </i-form>
                        </Card>
                    </i-col>
                </div>
                <div class="c_right">
                    <i-col class="c_search_result" span="24">
                        <div style="margin: 10px 0;overflow: hidden">
                            <MyTable :table="table"></MyTable>
                        </div>
                    </i-col>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "ThirdGameReports",
  mixins: [mixins],
  data() {
    return {
      search: {
        timeType: "cn",
        siteId: null,
        timeStart: "",
        timeEnd: "",
        userName: ""
      },
      table: {
        TableColumn: [
          {
            title: "平台",
            key: "platformName",
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display:
                        params.row.platformName !== "统计"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click() {
                        that.$router.push({
                          name: "ThirdGameReportsDetail",
                          query: {
                            timeStart: that.$moment(that.Time[0]).format("LLL"),
                            timeEnd: that.$moment(that.Time[1]).format("LLL"),
                            timeType: that.search.timeType,
                            platform: params.row.platform,
                            siteId: that.search.siteId,
                            userName: that.search.userName
                          }
                        });
                      }
                    }
                  },
                  params.row.platformName
                ),
                h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.platformName === "统计"
                          ? "inline-block"
                          : "none"
                    }
                  },
                  params.row.platformName
                )
              ]);
            }
          },
          {
            title: "下注人数",
            key: "betUser"
          },
          {
            title: "投注金额",
            key: "betAmount"
          },
          {
            title: "有效投注",
            key: "validBetAmount"
          },
          {
            title: "会员输赢",
            key: "netAmount"
          },
          {
            title: "单量",
            key: "betCount"
          },
          {
            title: "活动",
            // className: "activity",
            children: [
              {
                title: "类型",
                render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                              class: "activity"
                            },
                            item.typeName
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                }
              },
              {
                title: "人数",
                render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                              class: "activity"
                            },
                            item.actUser
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                }
              },
              {
                title: "金额",
                render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                              class: "activity"
                            },
                            item.amount
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                }
              }
            ]
          },
          {
            title: "赢率",
            key: "winRate",
            render: (h, params) => {
              return h('span',params.row.winRate + "%");
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Game_Reports,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          timeStart: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format("LLL"),
          timeEnd: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL"),
          timeType: "cn"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.updateTime();
    });
  },
  methods: {
    updateTime() {
      this.Time = [this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format("LLL"),this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL")];
    },
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    Search() {
      this.search.timeStart = this.$moment(this.Time[0]).format("LLL");
      this.search.timeEnd = this.$moment(this.Time[1]).format("LLL");
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
    },
    SearchRest() {
      this.$refs.SiteNameSelect.InitData();
      this.updateTime();
      this.search = {
        timeType: "cn",
        siteId: this.defaultSiteId,
        timeStart: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format("LLL"),
        timeEnd: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL"),
        userName: ""
      };
      this.Search();
    }
  }
};
</script>
<style lang="less" scoped>
// /deep/.ivu-picker-panel-content >.ivu-time-picker-cells-with-seconds >.ivu-time-picker-cells-list{
//   &:nth-of-type(1){
//     width: 100%;
//       li{
//         padding: 0;
//         text-align: center;
//       }
//   }
//   &:nth-of-type(2){
//     display: none;
//   }
//   &:nth-of-type(3){
//     display: none;
//   }
// }
</style>

