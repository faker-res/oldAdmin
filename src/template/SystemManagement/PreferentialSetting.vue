<template>
  <div class="content-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div
        class="page-con1"
        style="margin-bottom:10px;"
      >
        <Button
          type="primary"
          @click="$router.push({name:'PreferentialSettingCreat'})"
        >创建优惠模板</Button>
      </div>
      <div class="page-con1">
        <div class="c_right">
          <i-col
            class="c_search_result"
            span="24"
          >
            <div style="margin: 10px 0;overflow: hidden">
              <PreferentialSettingTable :table="table"></PreferentialSettingTable>
            </div>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PreferentialSettingTable from "@/template/my-components/iview-table/table";
export default {
  // name: "PreferentialSetting",
  components: {
    PreferentialSettingTable
  },
  data() {
    return {
      table: {
        TableColumn: [
          {
            title: "名称",
            key: "name",
            render: (h, params) => {
               return h('span',params.row.name||'-');
            }
          },
          {
            title: "键值",
            key: "key"
          },
          {
            title: "参数",
            key: "value"
          },
          {
            title: "状态",
            render: (h, params) => {
              return h(
                "Tag",
                {
                  props: {
                    color: params.row.status === "yes" ? "green" : "red"
                  }
                },
                params.row.status === "yes" ? "开启" : "关闭"
              );
            }
          },
          {
            title: "创建人",
            key: "username"
          },
          {
            title: "创建时间",
            key: "created_at",
            minWidth: 180,
            render: (h, params) => {
                let text = params.row.created_at==0?"-":this.$moment.unix(+params.row.created_at).format("LLL")
                return h('span',text);
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              var that = this;
              return h("div", [
                // h(
                //     "Button", {
                //         props: {
                //             size: "small"
                //         },
                //         style: {
                //             marginRight: "5px"
                //         },
                //         on: {
                //             click: () => {
                //                 this.$router.push({
                //                     name: "PreferentialClassDetails",
                //                     query: {
                //                         preferentialClassId: params.row.id
                //                     }
                //                 });
                //             }
                //         }
                //     },
                //     "详情"
                // ),
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
                          name: "PreferentialSettingCreat",
                          query: {
                            Id: params.row.id,
                            isVerify: true
                          }
                        });
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
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除",
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L
                                  .HTTP_Delete_PreferentialSetting,
                                {
                                  Id: params.row.id,
                                  username: this.$root.adminuserinfo
                                    .adminUserName
                                }
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.table.TableData.data.splice(
                                    params.index,
                                    1
                                  );
                                  this.table.TableData.total--;
                                },
                                res => {
                                  this.$Spin.hide();
                                  setTimeout(() => {
                                    this.$Modal.remove();
                                  }, 2000);
                                }
                              );
                          }
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
        posturl: this.$root.HTTP_L.HTTP_List_PreferentialSetting,
        Refresh: 0,
        dataform: {
          isRules: "select"
        }
      }
    };
  },
  methods: {}
};
</script>