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
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <!-- <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem> -->
              </i-form>
            </Card>
          </i-col>
        </div>
      </div>
      <div class="page-con1" style="margin-bottom:10px;">
        <Button type="primary" @click="$router.push({name:'SystemInPaymentCardCreat' ,query:{type : 'in'}})">新增系统入款卡</Button>
      </div>
      <div class="page-con1">
        <SystemInPaymentCardTable :table="table"></SystemInPaymentCardTable>
      </div>
    </div>
  </div>
</template>

<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";
import SystemInPaymentCardTable from "@/template/my-components/iview-table/table";
export default {
  // name:"SystemInPaymentCard",
  components: { SystemInPaymentCardTable , SiteNameSelect},
  data() {
    return {
      loading: false,
      search: {
        isRules: "select",
        siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id
      },
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: {
          width: "160px"
        }
      },
      table: {
        TableColumn: [ 
          {
            title: "站点",
            key: "siteName",
            minWidth: 100,
          },
          {
            title: "银行",
            key: "bankName",
            minWidth: 100,
          },
          {
            title: "姓名",
            key: "cardName",
            minWidth: 80,
          },
          {
            title: "账号",
            key: "cardNum",
            minWidth: 150,
          },
          {
            title: "网点",
            key: "cardAddress",
            minWidth: 150
          },{
            title: "等级",
            key: "level",
            minWidth: 120,
            render: (h, params) => {
              return h("a", [
                h(
                  "Tooltip", {
                    props: {
                      content: params.row.level,
                      placement: "left"
                    }
                  },
                  params.row.level.length > 10 ?
                  params.row.level.slice(0, 10) + "..." :
                  params.row.level == "" ? "无" : params.row.level
                )
              ]);
            }
          },
          {
            title: "状态",
            key: "status",
            minWidth: 80,
            render: (h, params) => {
              var color = params.row.status == "enabled" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "enabled" ? "开启" : "关闭"
              );
            }
          },
          {
            title: "日期",
            key: "addTime",
            minWidth: 180,
            render: (h, params) => {
              let text = params.row.updateTime != "0" ? this.$moment.unix(params.row.updateTime - 0).format("LLL") : "无";
              return h('span',text);
            }
          },
          {
            title: "操作者",
            key: "addUserName",
            minWidth: 100,
            render: (h, params) => {
              return h('span',params.row.addUserName||'无');
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
                          name: "SystemInPaymentCardDetails",
                          query: {
                            siteId: params.row.siteId,
                            systemBankId: params.row.id,
                            type : "in"
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
                          name: "SystemInPaymentCardCreat",
                          query: { siteId: params.row.siteId, systemBankId: params.row.id , isVerify : true ,type : "in"}
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
                            this.$root.loading()
                            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ShanChuXiTongChuRuKuanKa,{
                                siteId: params.row.siteId,
                                systemBankId: params.row.id
                              }).then(
                                res => {
                                  this.$Spin.hide();
                                  this.$Modal.remove();
                                  this.$root.modal("success" , "" , "系统入款卡删除成功！")
                                  this.table.TableData.data.splice(
                                    params.index,
                                    1
                                  );
                                  this.table.TableData.total--
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
        posturl: this.$root.HTTP_L.HTTP_XiTongRuKuanKaJiLu,
        flag: true,
        dataform: {
          // isRules:'select',
          // siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id
        }
      }
    };
  },
  methods: {
    mechange(re) {
      this.search.siteId = re.SiteId;
      if(re.SiteId){
        this.table.dataform = JSON.parse(JSON.stringify(this.search));
      }
    },
    Search() {
    },
    SearchRest() {
      this.search = {
        siteId: JSON.parse(localStorage.getItem("AllSiteNameList"))[0].id
      }
      this.$refs.SiteNameSelect.InitData();
      this.Search()
    }
  }
};
</script>

<style>

</style>
