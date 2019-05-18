<template>
  <div class="user_info">
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
              <!-- <FormItem label="返水名称">
                <i-input autofocus type="text" style="width:140px" v-model="DataSearch.levelAlias" placeholder="多个请以,逗号隔开"></i-input>
              </FormItem> -->
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
            <div class="caozuo_btn" style="margin-bottom:10px">
              <Button type="primary" @click="$router.push({name:'MemberBounsCreate'})">会员返水等级新增</Button>
            </div>
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
  name: "MemberBonusList",
  mixins: [mixins],
  data() {
    return {
      DataSearch: {
        status: "",
        siteId: "",
        levelAlias: ""
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "返水名称",
            key: "levelAlias",
          },
          {
            title: "等级",
            key: "levelName",
          },
          {
            title: "最低下注金额",
            key: "lessBetAmount",
            width: 150,
          },
          {
            title: "最大返水金额",
            key: "maxBonusAmonut",
          },
          {
            title: "创建日期",
            key: "created_at",
            minWidth: 200,
            render: (h, params) => {
              let text = this.$moment.unix(+params.row.created_at).format("LLL");
              return h('span',text);
            }
          },
          {
            title: "默认返水",
            key: "default",
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
            render: (h, params) => {
              let that = this;
              let color = params.row.status == "yes" ? "success" : "error";
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: color,
                      size: "small"
                    },
                    on: {
                      click: () => {
                        that.ModifyBonusStatus(params);
                      }
                    }
                  },
                  params.row.status == "yes" ? "启用" : "停用"
                )
              ]);
            }
          },
          {
            title: "备注",
            key: "remark",
            render: (h, params) => {
              return h("div", [
                h(
                  "Tooltip",
                  {
                    style: { color: "#2d8cf0" },
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
                          name: "MemberBounsDetails",
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
                        this.$router.push({
                          name: "MemberBounsCreate",
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
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuiYuanFanShuiLieBiao,
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
        levelAlias: "",
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
    ModifyBonusStatus(params) {
      var that = this;
      var status = params.row.status == "yes" ? "no" : "yes";
      this.$Modal.confirm({
        title: "提示",
        loading: true,
        content: params.row.status == "yes" ? "确定停用" : "确定启用",
        onOk: () => {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_HuiYuanFanShuiZhuangTaiXiuGai, 
              {
                id: params.row.id,
                status: status,
                siteId: params.row.siteId
              }
            )
            .then(res => {
              that.$Message.success("停用成功！");
              that.$Modal.remove();
              that.$set(
                that.table.TableData.data[params.index],
                "status",
                status
              );
              params.row.status = status;
            })
            .catch(res => {
              this.$Message.error("停用失败！");
              that.$Modal.remove();
            });
        }
      });
    }
  }
};
</script>
