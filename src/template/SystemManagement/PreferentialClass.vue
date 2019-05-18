<template>
  <div class="content-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
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
                <FormItem label="存款页面是否显示">
                  <Select clearable style="width:120px" v-model="search.showDeposit" placeholder="选择">
                    <Option label="显示" value="yes"></Option>
                    <Option label="不显示" value="no"></Option>
                  </Select>
                </FormItem>
                <FormItem label="状态">
                  <Select clearable style="width:120px" v-model="search.classStatus" placeholder="选择">
                    <Option label="开启" value="yes"></Option>
                    <Option label="屏蔽" value="no"></Option>
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
      </div>
      <div class="page-con1" style="margin-bottom:10px;">
        <Button type="primary" @click="$router.push({name:'PreferentialClassCreat'})">创建优惠分组</Button>
      </div>
      <div class="page-con1">
        <MyTable :table="table"></MyTable>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  // name: "PreferentialClass",
  mixins: [mixins],
  data() {
    return {
      loading: false,
      WebSiteList: [],
      search: {
        siteId: null,
        showDeposit: "",
        classStatus: "",
        limit: "10"
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 100
          },
          {
            title: "分组类名",
            key: "className",
          },
          {
            title: "存款页面显示",
            render: (h, params) => {
              var color = params.row.showDeposit == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.showDeposit == "yes" ? "开启" : "关闭"
              );
            }
          },
          {
            title: "状态",
            key: "classStatus",
            render: (h, params) => {
              var color = params.row.classStatus == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.classStatus == "yes" ? "开启" : "关闭"
              );
            }
          },
          {
            title: "分组备注",
            key: "classRemarks",
            render: (h, params) => {
              var sitename = params.row.classRemarks;
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
                        // props: {
                        //   type: "text"
                        // },
                        style: {
                          color: "#2d8cf0",
                          cursor: "pointer"
                        }
                      },
                      // params.row.ball.length < 20
                      //   ? params.row.ball
                      //   : params.row.ball.slice(0, 20) + "..."
                      sitename == ""
                        ? "无"
                        : sitename.length < 10
                          ? sitename
                          : sitename.slice(0, 10) + "..."
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
                      sitename == "" ? "无" : sitename
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "创建时间",
            key: "createTime",
            width: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.createTime - 0).format("LLL"));
            }
          },
          {
            title: "创建人",
            key: "createUser",
          },
          {
            title: "操作",
            key: "",
            width: 250,
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
                          name: "PreferentialClassDetails",
                          query: {
                            preferentialClassId: params.row.id
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
                        this.$router.push({
                          name: "PreferentialClassCreat",
                          query: {
                            id: params.row.id,
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
                                this.$root.HTTP_L.HTTP_YouHuiFenZuShanChu,
                                {
                                  preferentialClassId: params.row.id
                                }
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.$root.modal(
                                    "success",
                                    "",
                                    "优惠组删除成功！"
                                  );
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
                            // this.$root
                            //   .HTTP_YouHuiFenZuShanChu({
                            //     preferentialClassId: params.row.id
                            //   })
                            //   .then(
                            //     res => {
                            //       this.$Modal.remove();
                            //       this.$Message.info("优惠组删除成功！");
                            //       this.table.TableData.data.splice(
                            //         params.index,
                            //         1
                            //       );
                            //     },
                            //     res => {
                            //       setTimeout(() => {
                            //         this.$Modal.remove();
                            //       }, 2000);
                            //     }
                            //   );
                          }
                        });
                        // console.log(params);
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
        posturl: this.$root.HTTP_L.HTTP_YouHuiFenZuJiLu,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10"
        }
      }
    };
  },
  methods: {
    mechange(re) {
      this.search.siteId = re.SiteId;
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
      this.$refs.SiteNameSelect.InitData();
      this.search = {
        siteId: this.defaultSiteId,
        limit: "10",
        showDeposit: "",
        classStatus: ""
      };
      this.Search();
    }
  }
};
</script>

<style>
</style>