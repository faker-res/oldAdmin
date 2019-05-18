<template>
  <div class="user_info">
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
              <i-form ref="DataSearch" :model="DataSearch" inline>
                <FormItem label="站点" prop="siteId">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="域名">
                  <i-input autofocus type="text" style="width:160px" v-model="DataSearch.domain" placeholder="请输入代理域名"></i-input>
                </FormItem>
                <FormItem label="代理账号">
                  <i-input autofocus type="text" style="width:120px" v-model="DataSearch.userName" placeholder="输入代理账号"></i-input>
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
        </div>
        <div class="c_right">
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
                    <Button type="primary" @click="$router.push({name:'AgentDomainCreate'})">添加代理域名</Button>
                    <Button type="primary" @click="$router.push({name:'AgentDomainCreate',query:{agencyType:'shareholder'}})">批量添加大股东域名</Button>
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
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "AgentDomainList",
  mixins: [mixins],
  data() {
    return {
      loading: false,
      pageSize: 10,
      DataSearch: {
        status: "",
        siteId: ""
      },
      statusList: [
        {
          value: "no",
          label: "停用"
        },
        {
          value: "yes",
          label: "启用"
        }
      ],
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "代理账号",
            key: "userName",
          },
          {
            title: "代理代码",
            key: "agencyCode",
            render: (h, params) => {
              return h('span',params.row.agencyCode || "-");
            }
          },
          {
            title: "域名",
            key: "domain",
            render: (h, params) => {
              return h('span',params.row.domain || "-");
            }
          },
          {
            title: "返水比列",
            key: "rebate",
          },
          {
            title: "状态",
            key: "status",
            width: 120,
            render: (h, params) => {
              var that = this;
              var type = params.row.status === "yes" ? "success" : "error";
              var status = params.row.status === "yes" ? "no" : "yes";
              return h(
                "i-button",
                {
                  props: {
                    type: type,
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var alertMsg = "确认停用代理域名吗？";
                      if (status === "yes") {
                        alertMsg = "确认启用代理域名吗？";
                      }
                      this.$Modal.confirm({
                        title: "提示",
                        content: `<h3>${alertMsg}</h3>`,
                        loading: false,
                        onOk: () => {
                          this.$root
                            .HTTP_ALLLINKPOST(
                              this.$root.HTTP_L.HTTP_Update_DomainStatus,
                              {
                                id: params.row.id,
                                status: status,
                                siteId: that.DataSearch.siteId
                              }
                            )
                            .then(res => {
                              this.$Modal.success({title:"提示",content:"代理域名状态更新成功！"});
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
              );
            }
          },
          {
            title: "创建日期",
            key: "created_at",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },

          {
            title: "操作",
            key: "",
            width: 250,
            render: (h, params) => {
              var that = this;
              let adminStatus = params.row.admin_status == 0 ? 1 : 0;
              let tipMsg = "确认冻结代理域名吗？";
              if (adminStatus == 0) {
                tipMsg = "确认解冻代理域名吗？";
              }
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
                          name: "AgentDomainDetails",
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
                        this.$Modal.confirm({
                          title: "提示",
                          content: `<h3>${tipMsg}</h3>`,
                          loading: false,
                          onOk: () => {
                            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_DomainAdminStatus,{id:params.row.id,status:adminStatus}).then(res => {
                              this.$Modal.success({title:"提示",content:res.data.data});
                              this.$set(
                                that.table.TableData.data[params.index],
                                "admin_status",
                                adminStatus
                              );
                              params.row.adminStatus = adminStatus;
                            })
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  adminStatus === 1 ? "冻结" : "解冻"
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
                        // console.log(params);
                        this.$router.push({
                          name: "AgentDomainCreate",
                          query: {
                            id: params.row.id,
                            siteId: params.row.siteId,
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
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_ShanChuDaiLiYuMing,
                                { id: params.row.id, siteId: params.row.siteId }
                              )
                              .then(res => {
                                this.$Spin.hide();
                                this.$Modal.remove();
                                this.$Message.info("代理域名删除成功！");
                                this.table.TableData.data.splice(
                                  params.index,
                                  1
                                );
                                this.table.TableData.total--;
                              })
                              .catch(res => {
                                this.$Spin.hide();
                                this.$Modal.remove();
                              });
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
        posturl: this.$root.HTTP_L.HTTP_DaiLiYuMingLieBiao,
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
    },
    getadminlist(index) {
      var i = index || 1;
    }
  }
};
</script>
