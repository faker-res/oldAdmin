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
          <i-col class="c_search_top" span="24" class-name="emergency">
            <Card dis-hover>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <!--prop="siteId"-->
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="订单号">
                  <i-input style="width:150px" v-model="search.code"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px" :disabled="disabled"></DatePicker>
                </FormItem>
                <FormItem label="催帐类型">
                  <Select style="width:90px" v-model="search.type" placeholder="选择">
                    <Option value="all" label="全部">
                      <span>全部</span>
                    </Option>
                    <Option value="deposit" label="存款类">
                      <span>存款类</span>
                    </Option>
                    <Option label="取款类" value="withdrawals">
                      <span>取款类</span>
                    </Option>
                    <Option label="优惠类" value="preferential">
                      <span>优惠类</span>
                    </Option>
                  </Select>
                </FormItem>
                <FormItem label="催帐状态">
                  <Select style="width:90px" v-model="search.status" placeholder="选择">
                    <Option value="all" label="全部">
                      <span>全部</span>
                    </Option>
                    <Option label="未处理" value="no">
                      <span>未处理</span>
                    </Option>
                    <Option label="已处理" value="yes">
                      <span>已处理</span>
                    </Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
        </div>
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <Row type="flex" justify="end">
              <i-col>
                <Select v-model="search.limit" size="small" style="width:100px" @on-change="Search">
                  <Option value="10" label="每页10条"></Option>
                  <Option value="25" label="每页25条"></Option>
                  <Option value="50" label="每页50条"></Option>
                  <Option value="80" label="每页80条"></Option>
                </Select>
                <Select v-model="autoFresh" size="small" style="width:80px">
                  <Option value="0" label="不刷新">不刷新</Option>
                  <Option value="15" label="15秒">15秒</Option>
                  <Option value="30" label="30秒">30秒</Option>
                  <Option value="60" label="60秒">60秒</Option>
                  <Option value="90" label="90秒">90秒</Option>
                </Select>
              </i-col>
            </Row>
            <div style="margin: 10px 0;overflow: hidden">
              <MyTable :table="table" @catchError="catchError"></MyTable>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="deal" title="处理催帐" @on-ok="ok" @on-cancel="cancel">
      <i-input v-model="remark" type="textarea" :autosize="{minRows: 4}"></i-input>
    </Modal>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "EmergencyList",
  mixins: [mixins],
  data() {
    return {
      deal: false,
      remark: "",
      search: {
        username: "",
        siteId: "",
        code: "",
        type: "all",
        limit: "10",
        status: "all",
        startTime: "",
        endTime: ""
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 100
          },
          {
            title: "账号",
            minWidth: 100,
            key: "userName",
          },
          {
            title: "订单号",
            key: "code",
            minWidth: 160
          },
          {
            title: "催帐类型",
            key: "type",
            minWidth: 80,
            render: (h, params) => {
              let text = params.row.type === "deposit"
                ? "存款类"
                : params.row.type === "withdrawals"
                  ? "取款类"
                  : "优惠类";
              return h('span',text);
            }
          },
          {
            title: "催帐金额",
            key: "amount",
            minWidth: 110,
            render: (h, params) => {
              return h("b", {}, params.row.amount);
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 100,
            render: (h, params) => {
              var color = params.row.status == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "yes" ? "已处理" : "未处理"
              );
            }
          },
          {
            title: "操作者",
            key: "update_user",
            minWidth: 116,
            render: (h, params) => {
              return h('span',params.row.update_user ? params.row.update_user : "无");
            }
          },
          {
            title: "提交时间",
            key: "created_at",
            minWidth: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
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
        posturl: this.$root.HTTP_L.HTTP_CuiZhangJiLu,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10",
          startTime: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).format(
            "LLL"
          ),
          endTime: this.$moment(new Date().getTime() - 2000).format("LLL")
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
      this.Time = [
        this.$moment({
          hours: 0,
          minutes: 0,
          seconds: 0
        }).format("LLL"),
        this.$moment(new Date().getTime() - 2000).format("LLL")
      ];
    },
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    ok() {
      let datad = {
        Id: params.row.id,
        remark: this.remark,
        update_user: that.$root.adminuserinfo.adminUserName
      };
      that.$root
        .HTTP_ALLLINKPOST(that.$root.HTTP_L.HTTP_CuiZhangHuiFuChuLi, datad)
        .then(res => {
          this.$root.modal("success", "", res.data.data);
          that.$set(that.table.TableData.data[params.index], "status", "yes");
          that.$set(
            that.table.TableData.data[params.index],
            "remark",
            datad.remark
          );
        });
    },
    cancel() {
      this.deal = false;
      this.remark = "";
    },
    Search() {
      this.search.startTime = this.Time[0]
        ? this.$moment(this.Time[0]).format("LLL")
        : "";
      this.search.endTime = this.Time[1]
        ? this.$moment(this.Time[1]).format("LLL")
        : "";
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      if (this.search.type === "all") {
        delete this.search.type;
      }
      if (this.search.status === "all") {
        delete this.search.status;
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.search.type = this.search.type ? this.search.type : "all";
      this.search.status = this.search.status ? this.search.status : "all";
    },
    SearchRest() {
      this.autoFresh = "0";
      this.search = {
        code: "",
        username: "",
        siteId: this.defaultSiteId,
        limit: "10",
        status: "all",
        type: "all"
      };
      this.updateTime();
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    }
  }
};
</script>
<style lang="less">
.emergency {
  .ivu-form-inline .ivu-form-item {
    margin-right: 5px;
  }
}
</style>

