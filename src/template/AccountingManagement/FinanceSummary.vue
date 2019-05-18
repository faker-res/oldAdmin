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
              <div slot="title">查询条件</div>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <FormItem label="类型">
                  <FinanceSelect ref="FinanceSelect" :FinanceSelectData="FinanceSelectData" @listenOnChange="financeChange" @init="FinanceData" />
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择日期" style="width: 330px" :disabled="disabled"></DatePicker>
                </FormItem>
                <FormItem label="每页">
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
                  <Button @click="typeChoose = true" type="success">导出EXCEL</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
        </div>
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div style="margin: 10px 0;overflow: hidden">
              <MyTable :table="table" @catchError="catchError"></MyTable>
            </div>
            <div v-if="Object.keys(this.total).length">
              <p>
                <span>{{total.bonus.name}}：{{total.bonus.total}}，</span>
                <span v-for="(item,i) in total.bonus.list" :key="i" v-if="item.key !== 'cancelRebateBonus_total' && item.key !== 'returnPoints_total'">{{item.name}}：{{item[item.key]}}，</span>
              </p>
              <p>
                <span>{{total.deposit.name}}：{{total.deposit.total}}，</span>
                <span v-for="(item,i) in total.deposit.list" :key="i">{{item.name}}：{{item[item.key]}}，</span>
              </p>
              <p>
                <span>{{total.withdrawals.name}}：{{total.withdrawals.total}}，</span>
                <span v-for="(item,i) in total.withdrawals.list" :key="i" v-if="item.key !== 'application_total' && item.key !== 'refuse_total'">{{item.name}}：{{item[item.key]}}，</span>
              </p>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal v-model="typeChoose" title="选择导出类型" @on-ok="Export" width=800>
      <CheckboxGroup v-for="(item,i) in financeData" :key="i" v-model="financeCheck[item.type]">
        <span style="display:inline-block;width:50px;">{{item.name}}：</span>
        <Checkbox v-for="k in item.subType" :key="k.value" :label="k.value">{{k.label}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "FinanceSummary",
  mixins: [mixins],
  data() {
    return {
      total: {},
      typeChoose: false, //导出excel时选择类型弹框
      financeData: [], //导出excel时的复选框
      financeCheck: {}, //导出excel时选中的类型
      search: {
        username: "",
        siteId: "",
        limit: "10",
        startTime: "",
        endiTime: ""
      },
      table: {
        TableColumn: [
          {
            title: "账号",
            key: "username",
            minWidth: 100
          },
          {
            title: "订单号",
            key: "orderId",
            minWidth: 210
          },
          {
            title: "账变类型",
            key: "type_name",
            minWidth: 80,
            render: (h, params) => {
              if (params.row.type === "withdrawals") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#f00"
                    }
                  },
                  params.row.type_name
                );
              } else {
                return h('span',params.row.type_name);
              }
            }
          },
          {
            title: "账变内容",
            minWidth: 140,
            key: "subType_name",
            render: (h, params) => {
              if (
                params.row.type === "withdrawals" &&
                (params.row.subType === "withdrawals" ||
                  params.row.subType === "manual" ||
                  params.row.subType === "other")
              ) {
                return h(
                  "span",
                  {
                    style: {
                      color: "#f00"
                    }
                  },
                  params.row.subType_name
                );
              } else {
                return h('span',params.row.subType_name);
              }
            }
          },
          {
            title: "操作前余额",
            key: "beforMoney",
            minWidth: 70,
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    color: "#ccc"
                  }
                },
                params.row.beforMoney
              );
            }
          },
          {
            title: "金额",
            key: "money",
            minWidth: 60,
            render: (h, params) => {
              if (params.row.type === "withdrawals") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#f00"
                    }
                  },
                  params.row.money
                );
              } else {
                return h('span',params.row.money);
              }
            }
          },
          {
            title: "操作后余额",
            key: "afterMoney",
            minWidth: 70,
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    color: "#ccc"
                  }
                },
                params.row.afterMoney
              );
            }
          },
          {
            title: "提交时间",
            key: "order_created_at",
            width: 150,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.order_created_at - 0).format("LLL"));
            }
          },
          {
            title: "审核时间",
            key: "updated_at",
            width: 150,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.updated_at - 0).format("LLL"));
            }
          },
          {
            title: "备注",
            key: "remarks",
            minWidth: 200
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_List_FinanceSummary,
        Refresh: 0,
        flag: Object.keys(this.$route.query).length ? true : false,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          limit: "10",
          startTime: this.$moment({hours: 0,minutes: 0,seconds: 0}).format("LLL"),
          endTime: this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL")
        }
      }
    };
  },
  created(){
    if(Object.keys(this.$route.query).length){
      this.$set(this.SiteNameSelectData, "edit", true);
      this.search.siteId = this.$route.query.siteId
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.FinanceSelect.InitData();
        if(Object.keys(this.$route.query).length){
          this.Time = [this.$route.query.startTime,this.$route.query.endTime];
          this.$refs.SiteNameSelect.setDefaultSite(this.$route.query.siteId - 0)
          this.search.username = this.$route.query.username
          this.Search()
        }else{
          this.updateTime();
          this.getToal(); 
        }
    });
  },
  methods: {
    updateTime() {
      this.Time = [
        this.$moment({hours: 0,minutes: 0,seconds: 0}).format("LLL"),
        this.$moment({ hours: 0, minutes: 0, seconds: 0 }).add(1, "days").format("LLL")
      ];
    },
    getToal() {
      //总计
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      this.search.siteId = this.search.siteId ? this.search.siteId : this.defaultSiteId;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      //this.search  endTime startTime limit siteID
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Statistics_FinanceSummary,
          this.search
        )
        .then(res => {
          //res  table more数据
          this.total = res.data.data;
          for (let key in this.total) {
            this.total[key].list.forEach((item, index) => {
              Object.keys(item).forEach(i => {
                if (i !== "name") {
                  item.key = i;
                }
              });
            });
          }
        });
    },
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("LLL");
      this.search.endTime = this.$moment(this.Time[1]).format("LLL");
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
      this.getToal();
    },
    SearchRest() {
      this.autoFresh = "0";
      this.$refs.FinanceSelect.FinanceValue = [];
      this.search = {
        username: "",
        siteId: this.defaultSiteId,
        limit: "10",
        startTime: "",
        endiTime: ""
      };
      this.updateTime();
      this.$set(this.SiteNameSelectData, "edit", false);
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    FinanceData(v) {
      this.financeData = v;
      this.financeData.forEach(item => {
        this.$set(this.financeCheck, item.type, []);
      });
      this.financeCheck["deposit"] = ["offline", "online", "manual", "other"];
      this.financeCheck["withdrawals"] = ["withdrawals", "manual", "other"];
      this.financeCheck["bonus"] = ["RebateBonus"];
      this.financeCheck["other"] = ["other"];
    },
    Export() {
      let username = this.search.username;
      let timeDis = this.Time[1] - this.Time[0]; //时间间隔，单位毫秒
      let startTime = this.$moment(this.Time[0]).format("LLL");
      let endTime = this.$moment(this.Time[1]).format("LLL");
      let siteId = this.search.siteId;
      let type = {};
      for (let key in this.financeCheck) {
        type[key] = this.financeCheck[key].toString();
        if (!type[key]) {
          delete type[key];
        }
      }
      if (Object.keys(type).length === 0) {
        this.$root.modal("error", "", "请选择需要导出的数据类型！");
        return;
      }
      let data = {
        type,
        startTime,
        endTime,
        siteId
      };
      if (timeDis > 86400000) {
        //导出超过一天的记录,需要加上username
        if (!username) {
          this.$Modal.error({
            title: "提示",
            content: "如需导出大于1天的数据, 请输入会员帐号"
          });
          return false;
        }
        data.username = username;
      } else {
        delete data["username"];
      }
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Export_FinanceSummary, data)
        .then(res => {
          location.href = res.data.data.full_path;
        });
    },
    financeChange(v) {
      this.search.type = v[0];
      this.search.subType = v[1];
    }
  }
};
</script>