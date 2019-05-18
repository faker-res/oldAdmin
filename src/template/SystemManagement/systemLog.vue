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
                                <FormItem label="主机名">
                                    <i-input style="width:150px" v-model="search.instance" placeholder="请输入"></i-input>
                                </FormItem>
                                <FormItem label="级别名">
                                    <i-input style="width:150px" v-model="search.levelName" placeholder="请输入"></i-input>
                                </FormItem>
                                <FormItem label="参数">
                                    <i-input style="width:150px" v-model="search.path" placeholder="请输入"></i-input>
                                </FormItem>
                                <FormItem label="信息">
                                    <i-input style="width:150px" v-model="search.message" placeholder="请输入"></i-input>
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
                        <Button type="warning" @click="delConfirm" :disabled="clearList.length ? false : true">删除</Button>
                        <Button type="error" @click="delAllConfirm">全部删除</Button>
                        <div style="margin: 10px 0;overflow: hidden">
                            <systemLogTable :table="table" @listenOnSelect="listenOnSelect"></systemLogTable>
                        </div>
                    </i-col>
                </div>
            </div>
        </div>
        <Modal class-name="vertical-center-modal system-log-modal" v-model="RiZhiXiangQing" title="日志详情" width="800">
            <div class="blockquote scroll-bar-y" style="height:420px;">
                <ol>
                    <li><b>ID :</b> {{detailInfo.id}}</li>
                    <li><b>主机名 :</b> {{detailInfo.instance}}</li>
                    <li><b>环境 :</b> {{detailInfo.channel}}</li>
                    <li><b>级别 :</b> {{detailInfo.level}}</li>
                    <li><b>级别名 :</b> {{detailInfo.level_name}}</li>
                    <li><b>信息 :</b> {{detailInfo.message}}</li>
                    <li><b>地址 :</b> {{detailInfo.remote_addr}}</li>
                    <li><b>用户ID :</b> {{detailInfo.created_by}}</li>
                    <li><b>创建时间 :</b> {{detailInfo.created_at}}</li>
                    <li><b>代理 :</b> {{detailInfo.user_agent}}</li>
                    <li><b>错误详情 :</b>
                        <div v-html="detailInfo.context"></div>

                    </li>
                </ol>
            </div>
        </Modal>
        <Modal class-name="vertical-center-modal" v-model="delShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>是否继续删除</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import systemLogTable from "@/template/my-components/iview-table/table";
export default {
  components: {
    systemLogTable,
    SiteNameSelect
  },
  data() {
    return {
      RiZhiXiangQing: false, //日志详情弹框
      detailInfo: {},
      clearList: [], //要删除id
      delShow: false, //删除确认弹框
      modal_loading: false,
      search: {
        instance: "",
        level_name: "",
        path: "",
        message: ""
      },
      table: {
        TableColumn: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "ID",
            key: "id"
          },
          {
            title: "主机名",
            key: "instance"
          },
          {
            title: "环境",
            key: "channel"
          },
          {
            title: "级别",
            key: "level"
          },
          {
            title: "级别名",
            key: "level_name"
          },
          {
            title: "参数",
            key: "query",
            width: 220,
            render: (h, params) => {
              return h("div", [
                h("span", {
                  domProps: {
                    innerHTML: params.row.query
                  }
                })
              ]);
            }
          },
          {
            title: "信息",
            key: "message",
            width: 220,
            render: (h, params) => {
              return h("a", [
                h(
                  "Tooltip",
                  {
                    props: {
                      content:
                        params.row.message == "" ? "无" : params.row.message,
                      placement: "left"
                    }
                  },
                  params.row.message.length > 20
                    ? params.row.message.slice(0, 20) + "..."
                    : params.row.message == ""
                      ? "无"
                      : params.row.message
                )
              ]);
            }
          },
          {
            title: "地址",
            key: "remote_addr"
          },
          {
            title: "用户ID",
            key: "created_by",
            render: (h, params) => {
              return h('span',params.row.created_by||'-');
            }
          },
          {
            title: "创建时间",
            key: "created_at",
            width: 180
          },
          {
            title: "操作",
            render: (h, params) => {
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
                        this.RiZhiXiangQing = true;
                        this.$root
                          .HTTP_ALLLINKGET(
                            this.$root.HTTP_L.HTTP_FuWuDuanRiZhiXiangQing +
                              "/" +
                              params.row.id
                          )
                          .then(res => {
                            this.detailInfo = res.data.data;
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
                    on: {
                      click: () => {
                        this.$root
                          .HTTP_ALLLINKGET(
                            this.$root.HTTP_L.HTTP_FuWuDuanRiZhiShanChu +
                              "/" +
                              params.row.id
                          )
                          .then(res => {
                            this.$root.modal("success", "", "删除成功！");
                            this.table.TableData.data.splice(params.index, 1);
                            this.table.TableData.total--;
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
        posturl: this.$root.HTTP_L.HTTP_FuWuDuanRiZhiLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select"
        }
      }
    };
  },
  methods: {
    listenOnSelect(r) {
      this.clearList = [];
      r.forEach(e => {
        this.clearList.push(e.id);
      });
    },
    delConfirm() {
      //批量删除
      this.delShow = true;
    },
    delAllConfirm() {
      //全部删除
      this.clearList = [];
      this.delShow = true;
    },
    del() {
      this.modal_loading = true;
      let data = "";
      if (this.clearList.length == 0) {
        data = "0";
      } else {
        data = this.clearList.join();
      }
      this.$root
        .HTTP_ALLLINKGET(
          this.$root.HTTP_L.HTTP_FuWuDuanRiZhiShanChu + "/" + data
        )
        .then(res => {
          this.modal_loading = false;
          this.delShow = false;
          this.$root.modal("success", "", "删除成功！");
          this.table.Refresh++;
          this.clearList = [];
        });
    },
    Search() {
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
    },
    SearchRest() {
      this.search = {
        instance: "",
        level_name: "",
        path: "",
        message: ""
      };
      this.Search();
    }
  },
  mounted() {
    this.$nextTick(() => {});
  },
  watch: {
    "table.TableData": function(val) {
      this.$root.systemLogCount = val.total;
    }
  }
};
</script>
<style lang="less" scoped>
.system-log-modal {
  height: 602px;
  overflow-y: scroll;

  .ivu-modal-content {
    height: 602px;
    overflow-y: scroll;
  }
}
</style>