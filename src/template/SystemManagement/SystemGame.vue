<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}
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
        <Modal v-model="modal" title="编辑简介" width="400" @on-ok="edit('','edit')">
            简介：<Input v-model="summary" type="textarea" :rows="4" />
            排序：<Input v-model="sequence" />
        </Modal>
    </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      modal: false,
      summary: "", //简介
      sequence: "", //排序
      params: {},
      search: {
        siteId: "",
        userName: this.$root.adminuserinfo.adminUserName
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 120
          },
          {
            title: "游戏分类代码",
            key: "code",
            minWidth: 100
          },
          {
            title: "游戏分类名称",
            key: "name",
            minWidth: 80
          },
          {
            title: "简介",
            key: "summary",
            render: (h,params) => {
              return h('span',params.row.summary||'-');
            }
          },
          {
            title: "排序",
            minWidth: 60,
            key: "sequence"
          },
          {
            title: "状态",
            minWidth: 80,
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
                        var alertMsg = "确认关闭游戏吗？";
                        if (status === "yes") {
                          alertMsg = "确认开启游戏吗？";
                        }
                        this.$Modal.confirm({
                          title: "提示",
                          content: `<h3>${alertMsg}</h3>`,
                          loading: false,
                          onOk: () => {
                            //   params.row.status = status;
                            that.params = params;
                            that.edit();
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  params.row.status == "yes" ? "开启" : "关闭"
                )
              ]);
            }
          },
          {
            title: "时间",
            key: "created_at",
            minWidth: 160,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },
          {
            title: "创建人",
            key: "created_user",
            minWidth: 100
          },

          {
            title: "操作",
            minWidth: 210,
            render: (h, params) => {
              let that = this;
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
                      click() {
                        that.params = params;
                        that.upDown("up");
                      }
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "ios-arrow-up"
                      },
                      style: {
                        marginRight: "5px"
                      }
                    }),
                    h("span", {}, "升序")
                  ]
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
                      click() {
                        that.params = params;
                        that.upDown("down");
                      }
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "ios-arrow-down"
                      },
                      style: {
                        marginRight: "5px"
                      }
                    }),
                    h("span", {}, "降序")
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click() {
                        that.modal = true;
                        that.summary = params.row.summary
                          ? params.row.summary
                          : "";
                        that.sequence = params.row.sequence;
                        that.params = params;
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Get_SystemGame,
        Refresh: 0,
        flag: true,
        dataform: {
          // isRules: 'select',
          //     siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id,
          //     userName: this.$root.adminuserinfo.adminUserName
        }
      }
    };
  },
  methods: {
    mechange(re) {
      this.search.siteId = re.SiteId;
      if (this.search.siteId) {
        this.search.isRules = "select";
        this.search.userName = this.$root.adminuserinfo.adminUserName;
        this.table.dataform = JSON.parse(JSON.stringify(this.search));
      }
    },
    // 编辑简介 、排序、状态
    edit(s, e) {
      /**
       * @param s 状态
       * @param e 编辑
       */
      let summary = ""; //v
      let status = ""; //s
      let sequence = null;
      if (e === "edit") {
        summary = this.summary;
        sequence = this.sequence;
        status = this.params.row.status;
      } else {
        summary = this.params.row.summary;
        sequence = this.params.row.sequence;
        status = s ? "" : this.params.row.status === "yes" ? "no" : "yes";
      }
      summary = summary ? summary : " ";
      const reg = /^(0|[1-9][0-9]*)$/;
      if (!reg.test(sequence)) {
        this.$root.modal("error", "", "请输入正确的排序！");
        return false;
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_SystemGame, {
          siteId: this.params.row.siteId,
          Id: this.params.row.id,
          updated_user: this.$root.adminuserinfo.adminUserName,
          sequence: sequence,
          status: status,
          // siteId: this.params.row.siteId,
          summary: summary
        })
        .then(res => {
          // this.$root.modal("success" , "" , "游戏状态更新成功！")
          this.$Message.success("游戏状态更新成功！");
          this.table.Refresh++;
        });
    },
    upDown(sequence) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_UpDown_SystemGame, {
          Id: this.params.row.id,
          updated_user: this.$root.adminuserinfo.adminUserName,
          sequence: sequence,
          siteId: this.params.row.siteId
        })
        .then(res => {
          // this.$root.modal("success" , "" , "游戏状态更新成功！")
          // this.$Message.success("游戏状态更新成功！");
          this.table.Refresh++;
        });
    }
  }
};
</script>