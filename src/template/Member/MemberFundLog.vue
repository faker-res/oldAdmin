
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
              <Form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input v-model="search.username"></i-input>
                </FormItem>
                <!-- <FormItem label="资金记录">
                  <TableNameSelect ref="TableNameSelect" @listenOnChange="tableChange" :TableNameSelectData="TableNameSelectOfMemberFund"></TableNameSelect>
                </FormItem> -->
                <FormItem label="日期">
                  <DatePicker type="daterange" confirm v-model="Time" format="yyyy-MM-dd" placeholder="请选择日期" style="width:215px"></DatePicker>
                </FormItem>
                <FormItem label="每页条数">
                  <Select v-model="search.limit" placeholder="选择" style="width:80px">
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
              </Form>
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
  name: "MemberFundLog",
  mixins: [mixins],
  data() {
    return {
      search: {
        username: "",
        siteId: "",
        // table: "",
        limit: "10",
      },
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 190,
          },
          {
            title: "账号",
            key: "username",
          },
          {
            title: "操作时间",
            key: "created_at",
            width: 180,
            render: (h, params) => {
              let text = this.$moment.unix(params.row.created_at).format("LLL");
              return h('span',text);
            }
          },
          {
            title: "业务类型",
            key: "typeName",
          },
          {
            title: "变更类型",
            key: "subTypeName",
          },
          {
            title: "变更金额",
            key: "money",
            minWidth: 116,
          },
          {
            title: "变更前",
            key: "beforMoney",
            minWidth: 116,
          },
          {
            title: "变更后",
            key: "afterMoney",
            minWidth: 116,
          },
          {
            title: "备注",
            key: "remarks",
            render: (h, params) => {
              return h("a", [
                h(
                  "Tooltip",
                  {
                    props: {
                      content:
                        params.row.remarks == "" ? "无" : params.row.remarks,
                      placement: "left"
                    }
                  },
                  params.row.remarks.length > 10
                    ? params.row.remarks.slice(0, 10) + "..."
                    : params.row.remarks == ""
                      ? "无"
                      : params.row.remarks
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuiYuanZiJinRiZhi,
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
      this.search.siteId = re.SiteId;
    },
    // tableChange(re) {
    //   this.search.table = re.table;
    // },
    Search() {
      let params = { ...this.search };
      if (this.Time[0] && this.Time[1]) {
        params.startTime = this.$moment(this.Time[0]).format("LLL");
        params.endTime = this.$moment(this.Time[1]).format("LLL");
      }
      for(let key in params){
        if(params[key]===""||params[key]===null){
          delete params[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(params));
    },
    SearchRest() {
      this.Time = ["", ""]; 
      // this.$refs.TableNameSelect.DATAA.SiteDataD.table = "";
      // this.$refs.TableNameSelect.DATAA.SiteDataD.name = "";
      this.search = {
        siteId: this.defaultSiteId,
        username: "",
        limit: "10"
      }
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    }
  }
};
</script>
<style scoped lang='less'>
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