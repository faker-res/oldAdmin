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
                                    <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                                </FormItem>
                                <FormItem label="账号">
                                    <i-input style="width:150px" v-model="search.username"></i-input>
                                </FormItem>
                                <FormItem label="日期">
                                    <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px"></DatePicker>
                                </FormItem>
                                <FormItem label="状态">
                                    <Select style="width:120px" v-model="search.status" placeholder="全部">
                                        <Option value="all" label="全部">
                                            <span>全部</span>
                                        </Option>
                                        <Option label="待审核" value="wait">
                                            <span>待审核</span>
                                        </Option>
                                        <Option label="拒绝" value="fail">
                                            <span>拒绝</span>
                                        </Option>
                                        <Option label="通过审核" value="success">
                                            <span>通过审核</span>
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="每页笔数">
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
        <Modal v-model="auditModal" width="500">
            <p slot="header" style="text-align:center">
                <Icon type="information-circled"></Icon>
                <span>操作确认</span>
            </p>
            <div style="font-size:16px;line-height:3.5;">
                <p>{{title}}</p>
                <p v-if="title === '确认拒绝优惠领取吗？'">
                    <span>拒绝原因：</span>
                    <Input v-model="reject" style="width:300px;" />
                </p>
                <p v-if="tip" style="color:red;">拒绝原因不能为空！</p>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="audit">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "PreferentialReceive",
  mixins: [mixins],
  data() {
    return {
      title: "确认拒绝优惠领取吗？",
      modal_loading: false,
      params: null, //表格数据
      auditModal: false, //弹框
      status: "", //审核状态
      reject: "", //拒绝原因
      tip: false,
      search: {
        username: "",
        siteId: "",
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: ""
      },
      table: {
        TableColumn: [
          {
            title: "订单号",
            key: "orderId",
            minWidth: 120
          },
          {
            title: "账号",
            minWidth: 100,
            key: "username"
          },
          {
            title: "优惠名称",
            minWidth: 100,
            key: "title"
          },
          {
            title: "优惠金额",
            minWidth: 100,
            key: "bouns"
          },
          {
            title: "打码倍数",
            minWidth: 100,
            key: "multiple"
          },
          {
            title: "状态",
            key: "status",
            minWidth: 90,
            render: (h, params) => {
              let props = {
                type:
                  params.row.status === "success"
                    ? "success"
                    : params.row.status === "wait"
                      ? "warning"
                      : "error",
                size: "small"
              };
              return h(
                "Button",
                {
                  props: props
                },
                params.row.status === "success"
                  ? "通过审核"
                  : params.row.status === "wait"
                    ? "待审核"
                    : "拒绝"
              );
            }
          },
          {
            title: "操作",
            key: "",
            minWidth: 120,
            render: (h, params) => {
              let props = {
                size: "small"
              };
              return h("div", [
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      marginRight: "5px",
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.auditModal = true;
                        this.title = "确认通过优惠领取吗？";
                        this.params = params;
                        this.status = "success";
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.auditModal = true;
                        this.title = "确认拒绝优惠领取吗？";
                        this.params = params;
                        this.status = "fail";
                      }
                    }
                  },
                  "拒绝"
                ),
                h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.status !== "wait" ? "inline-block" : "none"
                    }
                  },
                  "-"
                )
              ]);
            }
          },
          {
            title: "提交时间",
            key: "time",
            minWidth: 170,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.time - 0).format("LLL"));
            }
          },
          {
            title: "审核时间",
            key: "update_time",
            minWidth: 170,
            render: (h, params) => {
              let text = params.row.update_time != "0"
                ? this.$moment.unix(params.row.update_time - 0).format("LLL")
                : "无";
              return h('span',text);
            }
          },
          {
            title: "审核者",
            key: "update_user",
            minWidth: 80,
            render: (h, params) => {
              return h('span',params.row.update_user||"无");
            }
          },
          {
            title: "备注",
            key: "remarks",
            render: (h, params) => {
              return h('span',params.row.remarks||"无");
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_List_PreferentialReceive,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id,
          limit: "10",
          startTime: this.$moment({
            hours: 0,
            minutes: 0,
            seconds: 0
          }).format("LLL"),
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
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
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
        username: "",
        siteId: this.defaultSiteId,
        limit: "10",
        status: "all",
        startTime: "",
        endiTime: ""
      };
      this.updateTime();
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    audit() {
      if (this.status === "fail") {
        if (this.reject == "") {
          this.tip = true;
          return;
        } else {
          this.tip = false;
        }
      }
      this.modal_loading = true;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Audit_PreferentialReceive, {
          receiveId: this.params.row.pid,
          bouns: this.params.row.bouns,
          status: this.status,
          update_user: this.$root.adminuserinfo.adminUserName,
          remarks:
            this.status === "success"
              ? `管理员${this.$root.adminuserinfo.adminUserName}通过`
              : this.reject
        })
        .then(res => {
          this.$root.modal("success", "", "审核完成");
          this.$set(
            this.table.TableData.data[this.params.index],
            "status",
            this.status
          );
        });
    }
  }
};
</script>