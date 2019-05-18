<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="账号">
                  <i-input style="width:150px" v-model="search.userName"></i-input>
                </FormItem>
                <FormItem label="日期">
                  <DatePicker type="daterange" v-model="Time" placeholder="选择日期" style="width: 220px"></DatePicker>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search(0)" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                  <Button @click="exportExcel" type="success" :loading="excelLoading">导出EXCEL</Button>
                </FormItem>
                <FormItem label="类型">
                  <Select v-model="search.isAgency" style="width: 80px;" @on-change="typeChange">
                    <Option value="all">全部</Option>
                    <Option value="yes">代理</Option>
                    <Option value="no">会员</Option>
                  </Select>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
        </div>
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <Breadcrumb separator=">" style="margin: 10px 10px 15px;">
              <BreadcrumbItem v-for="(bread,i) in breadList" :key="bread">
                <a href="javascript:;" @click="linkTo(bread,i)">{{bread}}</a>
              </BreadcrumbItem>
            </Breadcrumb>
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
    name: "AgencyReports",
    mixins: [mixins],
    data() {
      return {
        //标题栏的显示
        breadList: ["列表首页"],
        search: {
          siteId: null,
          timeStart: this.$moment().format("L"),
          timeEnd: this.$moment().format("L"),
          userName: "",
          isAgency: "all"
        },
        isLower: "",
        userName: "",
        excelLoading: false,
        table: {
          TableColumn: [{
              title: "代理账号",
              key: "userName",
            },
            {
              title: "账号类型",
              key: "isAgency",
              render: (h, params) => {
                return h("span",params.row.isAgency === "yes"? "代理": "会员");
              }
            },
            {
              title: "总下级会员人数",
              key: "userCount",
            },
            {
              title: "有效会员人数",
              key: "validUserCount",
            },
            {
              title: "注册人数",
              key: "regUserCount",
              sortable: "custom"
            },
            {
              title: "下注人数",
              key: "betUserCount",
              sortable: "custom"
            },
            {
              title: "首存人数",
              key: "firstDepositUserCount",
              sortable: "custom"
            },
            {
              title: "下注金额",
              key: "betAmount",
              sortable: "custom"
            },
            {
              title: "有效下注金额",
              key: "validBetAmount",
              sortable: "custom"
            },
            {
              title: "下注输赢",
              key: "netAmount",
              sortable: "custom"
            },
            {
              title: "代理返点",
              key: "agencyRebateAmount",
              sortable: "custom"
            },
            {
              title: "优惠金额",
              key: "bonusAmount",
              sortable: "custom"
            },
            {
              title: "团队净盈利",
              key: "profit",
              sortable: "custom"
            },
            {
              title: "存款金额",
              key: "depositAmount",
              sortable: "custom"
            },
            {
              title: "取款金额",
              key: "withdrawalsAmount",
              sortable: "custom"
            },
            {
              title: "操作",
              width: 120,
              render: (h, params) => {
                return h(
                  "a", {
                    style: {
                      display: params.row.isAgency === "yes"? "block": "none"
                    },
                    on: {
                      click: ()=> {
                        this.updateBread(params);
                      }
                    }
                  },
                  "查看下级"
                );
              }
            },
          ],
          TableData: {},
          loading: true,
          align: "center",
          posturl: this.$root.HTTP_L.HTTP_Agency_Reports,
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
      exportExcel(){
        this.excelLoading = true;
        let url = this.$root.HTTP_L.HTTP_Agency_ReportsOutput;
        let params = { ...this.search };
        params.output = true;
        params.userName = this.userName;
        params.isLower = this.isLower;
        params.timeStart = this.$moment(this.Time[0]).format("L");
        params.timeEnd = this.$moment(this.Time[1]).format("L");
        if(params.isAgency === "all"){
          delete params.isAgency;
        }
        if(!params.userName){
          delete params.userName;
        }
        this.$root.HTTP_ALLLINKPOST(url, params)
        .then(res => {
          window.location.href = `${res.data.data.full_path}`;
          this.excelLoading = false;
        });
      },
      typeChange(type){
        this.Search(this.isLower, this.userName);
      },
      linkTo(userName, i) {
        this.userName = userName;
        this.search.isAgency = "all";
        let arr = this.breadList.slice(0, i+1);
        this.breadList = arr;
        if (userName === "列表首页") {
          delete this.search.userName;
          this.isLower = 0;
        }else {
          this.isLower = 1 ;
        }
        this.Search(this.isLower,this.userName);
      },
      updateBread(params) {
        const { userName }= params.row;
        this.isLower = 1;
        this.userName = userName;
        this.search.isAgency = "all";
        this.breadList.push(userName);
        this.Search(this.isLower,this.userName);
      },
      updateTime() {
        this.Time = [this.$moment(), this.$moment()];
      },
      siteChange(re) {
        this.search.siteId = re.SiteId;
      },
      Search(type, userName) {
        // 查询全部的列表是不传isAgency参数的，isAgency => yes/no
        // type 0 搜索栏点击搜索
        // type 1 列表点击搜索
        if (type === 0){
          if(this.breadList.length > 1){
            // 在一级以上的列表页点击查询按钮时重置isAgency
            this.search.isAgency = "all";
          }
          this.breadList = ["列表首页"];
        } 
        let params = { ...this.search };

        delete params.output;
        this.isLower = type;
        this.userName = userName
        params.isLower = type;
        // 当在搜索栏点击搜索的时候为用户输入的，当在列表点击的时候为查询列表传来的userName
        params.userName = type === 0 ? this.search.userName : userName;
        // 当在列表点击的时候清空账号输入框内容
        this.search.userName = type === 1? "" : this.search.userName; 
      
        if(params.isAgency === "all"){
          delete params.isAgency;
        }
        if(!params.userName){
          delete params.userName;
        }

        params.timeStart = this.$moment(this.Time[0]).format("L");
        params.timeEnd = this.$moment(this.Time[1]).format("L");
        this.table.dataform = params;
      },
      SearchRest() {
        this.breadList = ["列表首页"];
        this.search = {
          siteId: this.defaultSiteId,
          timeStart: this.$moment().format("L"),
          timeEnd: this.$moment().format("L"),
          userName: "",
          isAgency: "all"
        };
        this.$refs.SiteNameSelect.InitData();
        this.updateTime();
        this.Search(0);
      }
    }
  };
</script>