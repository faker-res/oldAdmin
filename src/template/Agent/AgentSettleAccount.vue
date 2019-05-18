<template>
    <div class="content-main">
        <div class="layout">
          <div class="page-header">
            <h1 class="binding">{{$route.meta.title}}</h1>
          </div>
          <div class="page-con1">
            <div class="c_left">
              <i-col class="c_search_top" span="24">
                <Card dis-hover>
                  <i-form inline>
                    <FormItem label="站点" prop="siteId">                        
                      <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                    </FormItem>
                    <FormItem label="选择日期">
                      <DatePicker @on-change="ChangeDate" type="datetimerange" v-model="Time" format="yyyy-MM-dd" placeholder="请选择日期" style="width: 220px"></DatePicker>
                    </FormItem>
                    <FormItem>
                      <Button type="primary" @click="SearchSubmit">查询</Button>
                    </FormItem>
                  </i-form>
                </Card>
              </i-col>
            </div>
            <div class="c_right">
              <i-col class="c_search_result" span="24">
                  <div class="have_con">
                    <div class="data_sj">
                      <div class="caozuo_btn">
                        <Button :type="cancle" @click="JiSuan">发放分红</Button>
                      </div>
                      <div style="margin: 10px 0;overflow: hidden">
                        <MyTable ref="MyTable" :table="table" @listenOnTableData="listenOnTableData"></MyTable>
                      </div>
                    </div>
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
  name: "AgentSettleAccount",
  mixins: [mixins],
  data() {
    return {
      Time:[],
      // text:"计算代理工资",
      cancle:"info",
      search:{
        siteId:null,
        st:"",
        et:"",
        type:1//1:展示;2:发放
      },
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "账号",
            key: "userName",
          },
          {
            title: "总投注",
            key: "bet"
          },
          {
            title: "总盈亏",
            key: "betwin"
          },
          {
            title: "总反水、返点、彩金、优惠",
            minWidth: 160,
            key: "bonus"
          },
          {
            title: "上月盈亏",
            key: "lastmonth"
          },
          {
            title: "本月盈亏",
            key: "nowmonth"
          },
          {
            title: "本月分红",
            key: "addmoney",
            render: (h,params) => {
              return h("span",{
                style:{
                  color: "#f00"
                }
              },
              params.row.addmoney
              )
            }
          },
          {
            title: "发放基数",
            key: "nowmoney"
          },
          {
            title: "发放条件",
            key: "share_min"
          },
          {
            title: "发放比例",
            key: "share_scale"
          },
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Count_agencyBonus,
        dataform: {
          isRules: "select",
          type: 1,
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          st:this.$moment().subtract(30, "days").format("L"),
          et:this.$moment().format("L")
        },
        buttonDisabled:true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.Time=[this.$moment().subtract(30, "days").format("L"),this.$moment().format("L")]
      this.search.st=this.Time[0]
      this.search.et=this.Time[1]
    });
  },
  methods: {
    listenOnTableData(re){},
    ChangeDate(e) {
      this.search.st = e[0];
      this.search.et = e[1];
    },
    mechange(re) {
      this.search.siteId = re.SiteId;
    },
    JiSuan(){
      this.search.type = 2
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Count_agencyBonus, this.search)
        .then(res => {
          this.$root.modal("success", "", res.data.data);
        })
    },
    SearchSubmit(){
      this.search.type = 1
      this.table.dataform = JSON.parse(JSON.stringify(this.search))
    }
  }
};
</script>

<style scoped lang="less">
</style>
