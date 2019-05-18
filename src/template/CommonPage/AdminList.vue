<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <i-col
          class="c_search_top"
          span="24"
        >
          <Card dis-hover>
            <Form inline>
              <FormItem>
                <SiteNameSelect
                  ref='SiteNameSelect'
                  @listenOnChange="siteChange"
                  :SiteNameSelectData="SiteNameSelectData"
                ></SiteNameSelect>
              </FormItem>
              <FormItem>
                <Checkbox
                  v-model='checked'
                  @on-change="seeSuperAdmin"
                >只看超管</Checkbox>
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  @click="SearchSubmit"
                >查询</Button>
                <Button
                  type="warning"
                  @click="SearchRest"
                >重置</Button>
              </FormItem>
            </Form>
          </Card>
        </i-col>
        <i-col
          class="c_search_result"
          span="24"
        >
          <div class="serach">
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn">
                  <Button
                    type="primary"
                    @click="$router.push({name:'AdminCreate'})"
                  >创建管理员</Button>
                </div>
                <div style="margin:10px 0;">
                  <MyTable
                    v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)"
                    :table="table"
                  ></MyTable>
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
import mixins from "@/mixins";
export default {
  name: "AdminList",
  mixins: [mixins],
  data() {
    return {
      checked: false,
      siteId: "",
      WebSiteList: [],
      adminForm: {
        siteId: null
      },
      table: {
        TableColumn: [
          {
            title: "用户名",
            key: "userName",
            render: (h, params) => {
              const template = {
                props: ["row"],
                template: `
                  <Tooltip placement="right">
                    <span style="display:inline-block;width:84px">{{row.userName}}</span>
                    <Icon type="ios-checkmark" color="#19be6b" size="12" v-if="row.online==='yes'"></Icon>
                    <Icon type="ios-close" color="#ed3f14" size="12" v-else></Icon>
                    <div slot="content">
                      <div>{{row.userName}}</div>
                      <div>{{row.online==='yes'?'在线':'离线'}}</div>
                    </div>
                  </Tooltip>`
              };
              return h(template, {
                props: {
                  row: params.row
                }
              });
            }
          },
          {
            title: "可用站点",
            key: "name",
            minWidth: 120,
            render: (h, params) => {
              let sitename = params.row.siteId.split(",");
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "right"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: { color: "#2d8cf0", cursor: "pointer" }
                      },
                      this.WebSiteList.length ==
                        this.WebSiteListfiller(sitename, "id").length
                        ? "全部站点"
                        : this.WebSiteListfiller(sitename, "id").join(",")
                            .length < 5
                        ? this.WebSiteListfiller(sitename, "id").join(",")
                        : this.WebSiteListfiller(sitename, "id")
                            .join(",")
                            .slice(0, 5) + "..."
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
                      [
                        h(
                          "p",
                          this.WebSiteListfiller(sitename, "id").map(item => {
                            return h(
                              "div",
                              {
                                style: {
                                  cursor: "pointer",
                                  paddingTop: "3px",
                                  paddingBottom: "3px",
                                  borderBottom: "1px dotted #e9eaec23"
                                }
                              },
                              item
                            );
                          })
                        )
                      ]
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "角色",
            key: "roles",
            render: (h, params) => {
              const template = {
                props: ["row"],
                template: `
                  <Tooltip placement="right">
                    <span v-if="row.roles.length" style="color:#2d8cf0;cursor:pointer">{{row.roles[0].title}}</span>
                    <span v-else>暂无</span>
                    <div slot="content">
                      <div v-if="row.roles.length" v-for="(role,i) in row.roles" :key="i">{{role.title+" : "+role.description}}</div>
                    </div>
                  </Tooltip>`
              };
              return h(template, {
                props: {
                  row: params.row
                }
              });
            }
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              var color = params.row.status == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "yes" ? "开启" : "关闭"
              );
            }
          },
          {
            title: "创建时间",
            key: "time",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.time - 0).format("LLL"));
            }
          },
          {
            title: "创建人",
            key: "createUserName",
            render: (h, params) => {
              return h('span',params.row.createUserName);
            }
          },
          {
            title: "上次登录",
            key: "lastTime",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.lastTime - 0).format("LLL")||'-');
            }
          },
          {
            title: "操作",
            key: "",
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
                          name: "AdminDetails",
                          query: {
                            adminId: params.row.id
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
                          name: "AdminCreate",
                          query: {
                            id: params.row.id,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
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
                                this.$root.HTTP_L.HTTP_ShanChuGuanLiYuan,
                                { adminId: params.row.id }
                              )
                              .then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.$Message.info("管理员删除成功！");
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
        posturl: this.$root.HTTP_L.HTTP_GuanLiYuanLieBiao,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.SiteNameSelect.sendSiteList().then(res => {
        this.WebSiteList = res;
      });
    });
  },
  methods: {
    seeSuperAdmin(re) {
      if (re) {
        this.adminForm.siteId = 0;
      } else {
        this.adminForm.siteId = this.siteId;
      }
      this.$set(this.SiteNameSelectData, "disabled", re);
      this.SearchSubmit();
    },
    siteChange(re) {
      if (re) {
        this.siteId = re.SiteId;
        this.adminForm.siteId = re.SiteId;
      }
    },
    SearchSubmit() {
      let params = {};
      Object.assign(params, params, this.adminForm);
      this.table.dataform = params;
    },
    SearchRest() {
      this.adminForm = {
        siteId: this.defaultSiteId
      };
      this.checked = false;
      this.$set(this.SiteNameSelectData, "disabled", false);
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    WebSiteListfiller(array, element) {
      var arrt = [];
      for (let ac = 0; ac < array.length; ac++) {
        this.WebSiteList.forEach((i, c, v) => {
          if (array[ac] - 0 == 0) {
            arrt.push(i.siteName);
          } else if (array[ac] - 0 === this.WebSiteList[c][element] - 0) {
            arrt.push(i.siteName);
          }
        });
      }
      if (arrt == "") {
        arrt.push("未知信息");
      }
      return arrt;
    }
  }
};
</script>

<style>
</style>
