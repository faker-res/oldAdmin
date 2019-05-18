
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form ref="DataSearch" :model="DataSearch" inline>
              <FormItem label="站点" prop="siteId">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="等级名称">
                <i-input autofocus type="text" style="width:200px" v-model="DataSearch.levelName" placeholder="多个请以,逗号隔开"></i-input>
              </FormItem>
              <FormItem label="状态">
                <Select clearable v-model="DataSearch.status" style="width: 100px">
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button @click="SearchRest" type="warning">重置</Button>
              </FormItem>
            </i-form>
          </Card>
        </i-col>
        <i-col class="c_search_result" span="24">
          <div class="serach">
            <div class="no_con" v-if="0">
              <Alert show-icon>
                查询结果
                <template slot="desc">请输入查询条件</template>
              </Alert>
            </div>
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn">
                  <Button type="primary" @click="$router.push({name:'AgentLevelCreate'})">添加代理等级</Button>
                </div>
                <div style="margin: 10px 0;overflow: hidden">
                  <MyTable :table="table"></MyTable>
                </div>
              </div>
            </div>
          </div>
        </i-col>
      </div>
    </div>
  </div>
</template>

<script>
const TableMore = {
  template: `
  <div class='more_data' style="text-align:left">
    <Row>
        <Col span="4"><b>最大投注额(佣金)：</b>{{row.welfare.commission_max}}</Col>
        <Col span="4"><b>佣金比例：</b>{{row.welfare.commission_scale}}</Col>
        <Col span="4"><b>最低投注(日工资)：</b>{{row.welfare.salary_min}}</Col>
        <Col span="4"><b>最低亏损额(分红)：</b>{{row.welfare.share_min}}</Col>
        <Col span="4"><b>最低投注额：</b>{{row.minBetMoney}}</Col>
        <Col span="4"><b>更新时间：</b>{{$moment.unix(row.updated_at).format("LLL")}}</Col>
    </Row>
    <Row>
        <Col span="4"><b>最小投注额(佣金)：</b>{{row.welfare.commission_min}}</Col>
        <Col span="4"><b>玩家个数：</b>{{row.activeMember}}</Col>
        <Col span="4"><b>固定日工资：</b>{{row.welfare.salary_money}}</Col>
        <Col span="4"><b>分红比例：</b>{{row.welfare.share_scale}}</Col>
        <Col span="4"><b>最低存款额：</b>{{row.minPayMoney}}</Col>
        <Col span="4"><b>备注</b>:{{row.remark}}</Col>
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
import mixins from "@/mixins";
export default {
  name: "AgentLevel",
  mixins: [mixins],
  data() {
    return {
      DataSearch: {
        status: "",
        siteId: "",
        levelName: ""
        // cardNum:""
      },
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "等级",
            key: "levelName",
          },
          {
            title: "等级别称",
            key: "levelAlias",
          },
          {
            title: "玩家个数",
            key: "activeMember",
          },
          {
            title: "创建日期",
            key: "created_at",
            minWidth: 200,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },
          {
            title: "默认等级",
            key: "default",
            minWidth: 100,
            render: (h, params) => {
              var color = params.row.default == "yes" ? "yellow" : "#ddd";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.default == "yes" ? "是" : "否"
              );
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 110,
            render: (h, params) => {
              var that = this;
              var type = params.row.status === "yes" ? "success" : "error";
              var status = params.row.status == "yes" ? "no" : "yes";
              return h("div", [
                h(
                  "i-button",
                  {
                    props: {
                      type: type,
                      size: "small"
                    },
                    on: {
                      click: () => {
                        var alertMsg = "确认停用代理等级吗？";
                        if (status === "yes") {
                          alertMsg = "确认启用代理等级吗？";
                        }
                        this.$Modal.confirm({
                          title: "提示",
                          content: `<h3>${alertMsg}</h3>`,
                          loading: false,
                          onOk: () => {
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_DaiLiDengJiZhuangTai,
                                {
                                  id: params.row.id,
                                  status: status,
                                  siteId: that.DataSearch.siteId
                                }
                              )
                              .then(res => {
                                this.$Message.success("代理等级状态更新成功！");
                                this.$set(
                                  that.table.TableData.data[params.index],
                                  "status",
                                  status
                                );
                                params.row.status = status;
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  params.row.status == "yes" ? "启用" : "停用"
                )
              ]);
            }
          },
          {
            title: "备注",
            key: "remark",
            render: (h, params) => {
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "left"
                    },
                    style: {},
                    on: {
                      click: () => {}
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: { color: "#2d8cf0" }
                      },
                      params.row.remark == ""
                        ? "无"
                        : params.row.remark.length < 3
                          ? params.row.remark.slice(0, 3) + "..."
                          : params.row.remark
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      params.row.remark == "" ? "无" : params.row.remark
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "操作",
            key: "",
            width: 220,
            render: (h, params) => {
              var that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "AgentLevelDetails",
                          query: {
                            id: params.row.id,
                            siteId: params.row.siteId
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
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "AgentLevelCreate",
                          query: {
                            id: params.row.id,
                            siteId: params.row.siteId,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
          },
          {
            type: "expand",
            title: "...",
            width: 80,
            render: (h, params) => {
              return h(TableMore, {
                props: {
                  row: params.row
                }
              });
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_DaiLiCengJiLieBiao,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      }
    };
  },
  methods: {
    SearchRest() {
      this.DataSearch = {
        siteId: this.defaultSiteId,
        levelName: "",
        status: ""
      };
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    SearchSubmit() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    mechange(re) {
      this.DataSearch.siteId = re.SiteId;
    }
  },
};
</script>
<style scoped lang='less'>
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    width: 71px;
    text-align: right;
  }
  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper,
  .ivu-i-input-wrapper {
    margin: 0 5px;
  }
  margin-bottom: 5px;
}
.c_ser {
  margin-bottom: 10px;
  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>