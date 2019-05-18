
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_right">
          <!-- <Card dis-hover> -->
          <!-- <div slot="title">查询结果</div> -->
          <div class="serach">
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn c_search_top" span="24">
                  <!-- <Button type="primary" @click="$router.push({name:'CreateMemberLevel'})">新增等级</Button> -->
                  <Card dis-hover>
                    <!-- <div slot="title"><div slot="title">查询条件</div></div> -->
                    <i-form :model="search" inline>

                      <FormItem label="站点" prop="siteId">
                        <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>

                        <!-- <i-input v-model="search.siteName"></i-input> -->
                      </FormItem>
                      <FormItem label="会员名">
                        <i-input v-model="search.userName" :disabled="userNameDisabled"></i-input>
                      </FormItem>
                      <FormItem label="日期">
                        <DatePicker @on-change="ChangeDate" type="daterange" v-model="Time" placeholder="请选择入会日期" style="width: 220px"></DatePicker>
                      </FormItem>
                      <FormItem label="代理名称">
                        <i-input ref="agency" v-model="search.agencyName" :disabled="agencyNameDisabled"></i-input>
                      </FormItem>
                      <FormItem label="游戏平台代号">
                        <i-input v-model="search.platform"></i-input>
                      </FormItem>
                      <FormItem label="是否直属">
                        <Select v-model="search.directly" :disabled="search.agencyName ? false : true" style="width:160px;">
                          <Option v-for="i in directlyList" :key="i.value" :value="i.value">{{i.label}}</Option>
                        </Select>
                      </FormItem>
                      <FormItem class="form-group">
                        <Button @click="Search" type="primary">查询</Button>
                        <Button @click="Reset" type="warning">重置</Button>
                      </FormItem>
                    </i-form>
                  </Card>
                </div>
                <div style="margin: 10px 0;overflow: hidden">
                  <ReportTable ref="ReportTable" :search="search" :time="Time" :parentSiteName="siteName" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import mixins from "@/mixins";
import ReportTable from "@/template/Reports/components/ReportTable.vue";
export default {
  name: "GeneralReports",
  mixins: [mixins],
  components: {
    ReportTable
  },
  data() {
    return {
      // TableData: [],
      userNameDisabled: false,
      agencyNameDisabled: false,
      directlyList: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      siteName: "",
      siteId: null,
      agencyName: "",
      directly: null,
      userName: "",
      // isShow: 0,
      search: {
        timeStart: null,
        timeEnd: null,
        siteId: "",
        agencyName: "",
        userName: "",
        platform: "",
        directly: ""
      }
    };
  },
  created() {
    this.updateTime();
  },
  watch: {
    search: {
      handler(newValue, oldValue) {
        //代理名或会员名存在 则站点不可选
        if (newValue.agencyName || newValue.userName) {
          this.$set(this.SiteNameSelectData, "disabled", true);
          // this.search.siteId = "";
          if (newValue.agencyName) {
            this.userNameDisabled = true;
            // this.search.userName=""
          }
          if (newValue.userName) {
            this.agencyNameDisabled = true;
            // this.search.agencyName=""
          }
        } else {
          this.$set(this.SiteNameSelectData, "disabled", false);
          if (!newValue.agencyName) {
            this.userNameDisabled = false;
          }
          if (!newValue.userName) this.agencyNameDisabled = false;
        }
      },
      deep: true
    }
  },
  methods: {
    updateTime() {
      this.Time = [this.$moment().format("L"), this.$moment().format("L")];
      this.search.timeStart = this.Time[0];
      this.search.timeEnd = this.Time[1];
    },
    siteChange(re) {
      if (re) {
        this.search.siteId = re.SiteId;
        this.siteName = re.SiteName;
        this.userNameDisabled = this.search.siteId ? true : false;
        this.agencyNameDisabled = this.search.siteId ? true : false;
      }
    },
    ChangeDate(e) {
      this.search.timeStart = e[0];
      this.search.timeEnd = e[1];
    },
    Search() {
      this.$refs.ReportTable.PostData(this.search, true);
    },
    Reset() {
      this.$refs.SiteNameSelect.InitData();
      this.updateTime();
      this.search = {
        siteId: this.defaultSiteId,
        agencyName: "",
        platform: "",
        directly: "",
        userName: "",
        timeStart: this.$moment(this.Time[0]).format("L"),
        timeEnd: this.$moment(this.Time[1]).format("L")
      };
      this.$refs.ReportTable.showAgencyName = "";
      this.$refs.ReportTable.agencyName = "";
      this.$refs.ReportTable.siteName = "";
      //PpostDate定义在ReportTable中  获取表格数据的方法
      this.$refs.ReportTable.PostData(this.search);
    }
  }
};
</script>
<style scoped lang='less'>
.pointer {
  cursor: pointer;
}
.table {
  th,
  td {
    text-align: center;
    line-height: 30px;
  }
}
.MemberLogin_log_header {
  background: #ebebeb;
  line-height: 35px;
  padding: 0 10px;
  font-weight: 800;
  .ivu-row {
    // text-align: center
  }
}
.MemberLogin_log_list {
  .L_head {
    background: whitesmoke;
    line-height: 40px;
    padding: 0 10px;
  }
  .L_body {
    padding: 0px 10px;
    .ivu-row {
      line-height: 40px;
      border-bottom: 1px dotted #ddd;
      margin-bottom: 4px;
    }
    .ivu-col {
    }
    border: 1px solid #f5f5f5;
    border-top: none;
  }
}
</style>