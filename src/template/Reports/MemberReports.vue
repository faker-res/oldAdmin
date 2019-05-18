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
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.userName"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="daterange" v-model="Time" placeholder="选择日期" style="width: 220px"></DatePicker>
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
              <MyTable :table="table" @listenOnSortTable="$root.TableDataSort($event,table.dataform)"></MyTable>
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
    name: "MemberReports",
    mixins: [mixins],
    data() {
      return {
        search: {
          siteId: null,
          timeStart: "",
          timeEnd: "",
          agencyName: "",
          userName: "",
          key: "",
          value: ""
        },
        table: {
          TableColumn: [{
              title: "账号",
              key: "userName",
              minWidth: 100
            },
            {
              title: "注单数量",
              key: "betCount",
              sortable: "custom",
              // minWidth: 100,
            },
            {
              title: "下注金额",
              key: "betAmount",
              sortable: "custom",
              minWidth: 100
            },
            {
              title: "有效投注金额",
              key: "validBetAmount",
              minWidth: 100
            },
            // {
            //   title: "充值次数",
            //   minWidth: 100,
            //   render: (h, params) => {
            //     return (
            //       params.row.onlineDepositNumber + params.row.offlineDepositNumber
            //     );
            //   }
            // },
            // {
            //   title: "公司入款总额",
            //   key: "offlineDepositAmount",
            //   minWidth: 100,
            //   sortable: "custom"
            // },
            // {
            //   title: "线上入款总额",
            //   key: "onlineDepositAmount",
            //   sortable: "custom",
            //   minWidth: 100
            // },
            // {
            //   title: "投注金额",
            //   key: "betAmount",
            //   sortable: "custom",
            //   minWidth: 100
            // },
            {
              title: "用户输赢",
              key: "netAmount",
              sortable: "custom",
              minWidth: 100
            },
            {
              title: "会员优惠、活动",
              key: "memberBonus",
              sortable: "custom",
              minWidth: 100
            },
            {
              title: "存款金额",
              key: "depositAmount",
              sortable: "custom",
              minWidth: 100
            },
            {
              title: "存款次数",
              key: "depositCount",
              // minWidth: 100
            },
            // {
            //   title: "优惠礼金",
            //   key: "bonusAmount",
            //   sortable: "custom",
            //   minWidth: 100
            // },
            {
              title: "取款金额",
              key: "withdrawalsAmount",
              sortable: "custom",
              minWidth: 100
            },
            {
              title: "取款次数",
              key: "withdrawalsCount",
            },
            {
              title: "盈利",
              key: "profit",
              // sortable: "custom",
              minWidth: 100,
              render: (h, params) => {
                return h(
                  "span", {
                    style: {
                      color: "red"
                    }
                  },
                  params.row.profit
                );
              }
            },
            {
              title: "赢率",
              key: "proportion",
              minWidth: 100,
              render: (h, params) => {
                return h(
                  "span", {
                    style: {
                      color: "red"
                    }
                  },
                  params.row.proportion
                );
              }
            }
          ],
          TableData: {},
          loading: true,
          align: "center",
          posturl: this.$root.HTTP_L.HTTP_HuiYUanBaoBiao,
          Refresh: 0,
          dataform: {
            isRules: "select",
            siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
            timeStart: this.$moment().format("L"),
            timeEnd: this.$moment().format("L")
          }
        }
      };
    },

    mounted() {
      this.$nextTick(() => {
        this.updateTime();
      });
    },
    methods: {
      updateTime() {
        this.Time = [this.$moment(), this.$moment()];
      },
      mechange(re) {
        this.search.siteId = re.SiteId;
      },
      Search() {
        this.search.timeStart = this.$moment(this.Time[0]).format("L");
        this.search.timeEnd = this.$moment(this.Time[1]).format("L");
        for (var key in this.search) {
          if (this.search[key] == null || this.search[key] == "") {
            delete this.search[key];
          }
        }
        this.table.dataform = JSON.parse(JSON.stringify(this.search));
      },
      SearchRest() {
        this.search = {
          siteId: this.defaultSiteId,
          timeStart: "",
          timeEnd: "",
          agencyName: "",
          userName: "",
          key: "",
          value: ""
        };
        this.$refs.SiteNameSelect.InitData();
        this.updateTime();
        this.Search();
      }
    }
  };
</script>