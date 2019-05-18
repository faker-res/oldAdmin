<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
                    <span>列表</span>
                </h1>
            </div>
            <div class="page-con1">
                <div class="c_left">
                    <i-col class="c_search_top" span="24">
                        <Card dis-hover>
                            <i-form :model="search" inline>
                                <FormItem label="站点">
                                    <!--prop="siteId"-->
                                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                                </FormItem>
                                <FormItem label="账号">
                                    <i-input style="width:150px" v-model="search.userName"></i-input>
                                </FormItem>
                                <FormItem label="日期时间">
                                    <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px"></DatePicker>
                                </FormItem>
                                <FormItem label="转入平台">
                                    <Select clearable style="width:110px" v-model="search.platform">
                                        <Option v-for="(item,index) in codeList" :value="item.value" :key="index">{{item.name}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="状态">
                                    <Select style="width: 150px" v-model="search.status">
                                        <Option value="all">全部</Option>
                                        <Option value="success">成功</Option>
                                        <Option value="fail">失败</Option>
                                        <Option value="wait">转帐中</Option>
                                    </Select>
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
  name: "GamesTransfer",
  mixins: [mixins],
  data() {
    return {
      codeList: [],
      search: {
        userName: "",
        siteId: "",
        platform: "",
        timeStart: "",
        timeEnd: "",
        status: "all"
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 120
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 160
          },
          {
            title: "账号",
            key: "userName",
            minWidth: 110
          },
          {
            title: "转出平台",
            minWidth: 80,
            key: "platformOut"
          },
          {
            title: "转入平台",
            minWidth: 80,
            key: "platformIn"
          },
          {
            title: "转入金额",
            minWidth: 120,
            key: "money"
          },
          {
            title: "状态",
            width: 80,
            key: "status",
            render: (h, params) => {
              let props = {
                type:
                  params.row.status == "success"
                    ? "success"
                    : params.row.status == "wait"
                      ? "warning"
                      : params.row.status == "cancel"
                        ? "cancel"
                        : "error",
                size: "small"
              };
              return h(
                "Button",
                {
                  props: props
                },
                params.row.status == "success"
                  ? "成功"
                  : params.row.status == "wait"
                    ? "审核中"
                    : params.row.status == "cancel"
                      ? "取消"
                      : "失败"
              );
            }
          },
          {
            title: "转账前余额",
            key: "beforMoney",
            minWidth: 180,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid #e9eaec"
                    }
                  },
                  "转出平台余额：" + params.row.beforMoney.split("#")[0]
                ),
                h(
                  "div",
                  {},
                  "转入平台余额：" + params.row.beforMoney.split("#")[1]
                )
              ]);
            }
          },
          {
            title: "转账后余额",
            key: "afterMoney",
            minWidth: 180,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid #e9eaec"
                    }
                  },
                  "转出平台余额：" + params.row.afterMoney.split("#")[0]
                ),
                h(
                  "div",
                  {},
                  "转入平台余额：" + params.row.afterMoney.split("#")[1]
                )
              ]);
            }
          },
          {
            title: "转账时间/转账完成时间",
            minWidth: 160,
            render: (h, params) => {
              return h("div", [
                h(
                  "div",
                  {
                    style: {
                      borderBottom: "1px solid #e9eaec"
                    }
                  },
                  this.$moment.unix(params.row.created_at).format("LLL")
                ),
                h(
                  "div",
                  params.row.updated_at
                    ? this.$moment.unix(params.row.updated_at).format("LLL")
                    : "无"
                )
              ]);
            }
          },
          {
            title: "备注",
            key: "remark",
            minWidth: 100,
            render: (h, params) => {
              return h("a", [
                h(
                  "Tooltip",
                  {
                    props: {
                      content:
                        params.row.remark == "" ? "无" : params.row.remark,
                      placement: "left"
                    }
                  },
                  params.row.remark.length > 5
                    ? params.row.remark.slice(0, 5) + "..."
                    : params.row.remark == ""
                      ? "无"
                      : params.row.remark
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_DiSanFangYouXiZhuanZhangJiLu,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          timeStart: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format(
            "LLL"
          ),
          timeEnd: this.$moment({ hours: 0, minutes: 0, seconds: 0 })
            .add(1, "days")
            .format("LLL")
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.updateTime();
      this.getThirdWays();
    });
  },
  methods: {
    getThirdWays() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_DiSanFangPingTai, {
          isRules: "show"
        })
        .then(res => {
          this.codeList = res.data.data;
        });
    },
    updateTime() {
      this.Time = [
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
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    Search() {
      this.search.timeStart = this.$moment(this.Time[0]).format("LLL");
      this.search.timeEnd = this.$moment(this.Time[1]).format("LLL");
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.status = this.search.status ? this.search.status : "all";
    },
    SearchRest() {
      this.search = {
        userName: "",
        siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id,
        platform: "",
        timeStart: "",
        timeEnd: "",
        status: "all"
      };
      this.updateTime();
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    }
  }
};
</script>