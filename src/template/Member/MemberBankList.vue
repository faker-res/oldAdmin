<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form ref="DataSearch" :model="DataSearch" inline>
              <FormItem label="站点" prop="siteId">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="账号">
                <i-input autofocus type="text" style="width:200px" v-model="DataSearch.userName" placeholder="多个请以,逗号隔开"></i-input>
              </FormItem>

              <FormItem label="状态">
                <Select placeholder="选择" clearable v-model="DataSearch.status" style="width: 100px">
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
            <MyTable :table="table"></MyTable>
          </div>
        </i-col>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  // name:"MemberBankList",
  mixins: [mixins],
  data() {
    return {
      DataSearch: {
        status: "",
        siteId: "",
        userName: ""
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            width: 100,
          },
          {
            title: "账号",
            key: "userName",
            width: 160,
          },
          {
            title: "姓名",
            key: "cardName",
            width: 160,
          },
          {
            title: "银行",
            width: 160,
            key: "bankName",
          },
          {
            title: "卡号",
            key: "cardNum",
            minWidth: 220
          },
          {
            title: "银行归属地",
            key: "cardAddress",
            minWidth: 250,
            render: (h, params) => {
              return h('span',params.row.cardAddress || "无");
            }
          },
          {
            title: "默认银行",
            key: "default",
            width: 100,
            render: (h, params) => {
              let color = params.row.default == "yes" ? "yellow" : "#ddd";
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
            width: 100,
            render: (h, params) => {
              let that = this;
              let type = params.row.status == "yes" ? "success" : "error";
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: type,
                      size: "small"
                    },
                    on: {
                      click: () => {
                        that.ModifyStatus(params);
                      }
                    }
                  },
                  params.row.status == "yes" ? "启用" : "停用"
                )
              ]);
            }
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
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "MemberBankDetails",
                          query: { id: params.row.id, siteId: params.row.siteId }
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
                          name: "MemberBankAccountCreate",
                          query: { id: params.row.id, siteId: params.row.siteId, isVerify: true }
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
                        that.DeleteBankCard(params);
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
        posturl: this.$root.HTTP_L.HTTP_HuiYuanYinHangLieBiao,
        Refresh: 0,
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
        userName: "",
        status: ""
      };
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    SearchSubmit() {
      for (let key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },

    mechange(re) {
      this.DataSearch.siteId = re.SiteId;
    },
    ModifyStatus(params) {
      /**
       * 修改会员银行卡状态
       * @param id 银行卡序号
       * @param status yes/no
       * @param siteId 站点id
       */
      var that = this;
      var status = params.row.status == "yes" ? "no" : "yes";
      this.$Modal.confirm({
        title: "提示",
        loading: true,
        content: params.row.status == "yes" ? "确定停用" : "确定启用",
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_XiuGaiHuiYinHangZhuangTai,
              {
                siteId: params.row.siteId,
                id: params.row.id,
                status: status
              }
            )
            .then(res => {
              this.$Message.success("修改状态成功！");
              this.$Modal.remove();
              this.$set(
                that.table.TableData.data[params.index],
                "status",
                status
              );
              params.row.status = status;
            })
            .catch(res => {
              this.$Modal.remove();
            });
        }
      });
    },
    DeleteBankCard(params) {
      this.$Modal.confirm({
        content: "确认删除？",
        loading: true,
        onOk: () => {
          this.$root.loading();
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_ShanChuHuiYuanYinHangXinXi,
              { id: params.row.id ,siteId: params.row.siteId}
            )
            .then(res => {
              this.$Spin.hide();
              this.$Modal.remove();
              this.$Modal.success({
                title: "提示",
                content: "删除会员银行成功！"
              });
              this.table.TableData.data.splice(params.index, 1);
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
};
</script>
