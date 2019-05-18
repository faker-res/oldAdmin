
<template>
  <div class="content-main agent-main">
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
              <i-form :model="DataSearch" inline>
                <FormItem label="站点">
                  <!--prop="siteId"-->
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input v-model="DataSearch.username"></i-input>
                </FormItem>
                <!-- <FormItem label="代理记录">
                  <TableNameSelect ref="TableNameSelect" @listenOnChange="tableChange" :TableNameSelectData="TableNameSelectOfAgencyLog"></TableNameSelect>
                </FormItem> -->
                <FormItem label="每页条数">
                  <Select v-model="DataSearch.limit" style="width:80px">
                    <Option value="10" label="10">10</Option>
                    <Option value="25" label="25">25</Option>
                    <Option value="50" label="50">50</Option>
                    <Option value="80" label="80">80</Option>
                  </Select>
                </FormItem>
                <FormItem label="操作事件">
                  <Select v-model="DataSearch.act" style="width: 80px" clearable>
                    <Option v-for="item in actList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  name: "AgentLog",
  mixins: [mixins],
  data() {
    return {
      DataSearch: {
        username: "",
        siteId: "",
        // table: "",
        act: "",
        limit: "10"
      },
      actList: [
        { value: "create", label: "创建" },
        { value: "update", label: "更新" },
        { value: "delete", label: "删除" },
        { value: "other", label: "其它" }
      ],
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            minWidth: 100
          },
          {
            title: "代理账号",
            key: "username",
            minWidth: 100
          },
          {
            title: "业务类型",
            key: "type",
            minWidth: 80
          },
          {
            title: "操作时间",
            key: "created_at",
            minWidth: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
            }
          },
          {
            title: "IP",
            key: "ip",
            minWidth: 150
          },
          {
            title: "操作事件",
            key: "act",
            minWidth: 80,
            render: (h, params) => {
              let text;
              switch (params.row.act) {
                case 'create':
                  text="创建"
                  break;
                case 'update':
                  text="更新"
                  break;
                case 'delete':
                  text="删除"
                  break;
                default:
                  text="其它"
                  break;
              }
              return h('span',text);
            }
          },
          {
            title: "操作日志",
            key: "actionInfo",
            minWidth: 410,
            render: (h, params) => {
              let text = params.row.actionInfo.substring(
                params.row.actionInfo.indexOf("[描述]") + 7,
                params.row.actionInfo.indexOf("[触发]")
              );
              return h('span',text);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_DaiLiRiZhi,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.TableNameSelect.InitData();
    });
  },
  methods: {
    mechange(re) {
      this.DataSearch.siteId = re.SiteId;
    },
    // tableChange(re) {
    //   this.DataSearch.table = re.table;
    // },
    Search() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    SearchRest() {
      // this.$refs.TableNameSelect.DATAA.SiteDataD.table = "";
      // this.$refs.TableNameSelect.DATAA.SiteDataD.name = "";
      this.DataSearch = {
        username: "",
        siteId: this.defaultSiteId,
        // table: "",
        act: "",
        limit: "10"
      };
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    }
  }
};
</script>
<style scoped lang='less'>
.member-main {
}
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    width: 71px;
    text-align: right;
  }
  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper,
  .ivu-i-input-wrapper {
    margin: 0 5px;
  }
  margin-bottom: 5px;
}
.c_ser {
  margin-bottom: 10px;
  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>