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
                  <!--prop="siteId"-->
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <!-- <FormItem label="等级">
                  <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" @listenLevelChange="levelChange"></LevelSelect>
                </FormItem> -->
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.username"></i-input>
                </FormItem>
                <!-- <FormItem label="代理名称">
                  <i-input style="width:150px" v-model="search.agencyName"></i-input>
                </FormItem> -->
                <FormItem label="时间类型">
                  <Select style="width:135px" v-model="search.type">
                    <Option label="添加时间" value="addTime"></Option>
                    <Option label="第一次存款时间" value="firstTime"></Option>
                    <Option label="第二次存款时间" value=" secondTime"></Option>
                    <Option label="第三次存款时间" value="thirdTime"></Option>
                  </Select>
                </FormItem>
                <FormItem label="时间">
                  <DatePicker type="datetimerange" v-model="Time" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 220px"></DatePicker>
                </FormItem>
                <!-- <FormItem label="状态">
                  <Select style="width:120px" v-model="search.status" placeholder="全部">
                    <Option value="all" label="全部">
                      <span>全部</span>
                    </Option>
                    <Option label="开启" value="yes">
                      <span>开启</span>
                    </Option>
                    <Option label="关闭" value="no">
                      <span>关闭</span>
                    </Option>
                  </Select>
                </FormItem> -->
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
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <Card dis-hover>
              <div style="margin: 10px 0;overflow: hidden">
                <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" :table="table"></MyTable>
              </div>
            </Card>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  name: "FinanceFirst",
  mixins: [mixins],
  data() {
    return {
      search: {
        username: "",
        // agencyName: "",
        siteId: "",
        // levelId: "",
        limit: "10",
        // status: "all",
        startTime: "",
        endiTime: "",
        type: "addTime"
      },
      table: {
        TableColumn: [
          // {
          //   title: "站点名称",
          //   key: "siteName"
          // },
          {
            title: "账号",
            key: "username"
          },
          // {
          //   title: "等级",
          //   key: "levelId",
          //   minWidth: 80,
          //   render: (h, params) => {
          //     return this.levelFilter(params.row.levelId, params.row.levelName);
          //   }
          // },
          {
            title: "第一次存款金额",
            key: "firstAmount"
          },
          {
            title: "第一次存款时间",
            key: "firstTime",
            render: (h, params) => {
              let text = params.row.firstTime == 0
                ? "无"
                : this.$moment.unix(params.row.firstTime).format("LLL");
              return h('span',text);
            }
          },
          {
            title: "第二次存款金额",
            key: "secondAmount"
          },
          {
            title: "第二次存款时间",
            key: "secondTime",
            render: (h, params) => {
              let text = params.row.secondTime == 0
                ? "无"
                : this.$moment.unix(params.row.secondTime).format("LLL");
              return h('span',text);
            }
          },
          {
            title: "第三次存款金额",
            key: "thirdAmount"
          },
          {
            title: "第三次存款时间",
            key: "thirdTime ",
            render: (h, params) => {
              let text = params.row.thirdTime == 0
                ? "无"
                : this.$moment.unix(params.row.thirdTime).format("LLL");
              return h('span',text);
            }
          },
          {
            title: "添加时间",
            key: " addTime",
            render: (h, params) => {
              let text = params.row.addTime == 0
                ? "无"
                : this.$moment.unix(params.row.addTime).format("LLL");
              return h('span',text);
            }
          },
          // {
          //   title: "累计首存金额",
          //   key: "depositAmount",
          //   width: 130
          // },
          // {
          //   title: "首存时间",
          //   key: "depositTime",
          //   width: 180,
          //   render: (h, params) => {
          //     return params.row.depositTime == 0
          //       ? "无"
          //       : this.$moment.unix(params.row.depositTime).format("LLL");
          //   }
          // },
          // {
          //   title: "当日首存次数",
          //   key: "depositNumber",
          //   width: 130
          // },
          // {
          //   title: "首提金额累计",
          //   key: "withdrawalsAmount",
          //   width: 130
          // },
          // {
          //   title: "首提时间",
          //   key: "withdrawalsTime",
          //   width: 180,
          //   render: (h, params) => {
          //     return params.row.withdrawalsTime == 0
          //       ? "无"
          //       : this.$moment.unix(params.row.withdrawalsTime).format("LLL");
          //   }
          // },
          // {
          //   title: "当日首提次数",
          //   key: "withdrawalsNumber",
          //   width: 130
          // },
          // {
          //   title: "状态",
          //   key: "member_status",
          //   render: (h, params) => {
          //     let props = {
          //       color: params.row.member_status == "yes" ? "green" : "red",
          //       size: "small"
          //     };
          //     return h(
          //       "Tag",
          //       {
          //         props: props
          //       },
          //       params.row.member_status == "yes" ? "开启" : "关闭"
          //     );
          //   }
          // }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_ShouCunBaoBiao,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          startTime: this.$moment().format("L"),
          endTime: this.$moment().format("L")
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
      this.Time = [
        this.$moment().format("L"),
        this.$moment().format("L")
      ];
    },
    siteChange(re) {
      if (re) {
        this.search.siteId = re.SiteId;
        // this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    Search() {
      this.search.startTime = this.$moment(this.Time[0]).format("L");
      this.search.endTime = this.$moment(this.Time[1]).format("L");
      // if (this.search.startTime == this.search.endTime) {
      //   this.search.endTime = this.$moment(this.Time[0])
      //     .add(1, "day")
      //     .format("L");
      // }
      this.search.status =
        this.search.status === "all" ? "" : this.search.status;
      for (var key in this.search) {
        if (this.search[key] == null || this.search[key] == "") {
          delete this.search[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.search));
    },
    SearchRest() {
      this.search = {
        username: "",
        // agencyName: "",
        siteId: this.defaultSiteId,
        // levelId: "",
        limit: "10",
        // status: "all",
        startTime: "",
        endiTime: "",
        type: "addTime"
      };
      // this.$refs.LevelSelect.setDefaultLevel("");
      this.$refs.SiteNameSelect.InitData();
      this.updateTime();
      this.Search();
    }
  }
};
</script>