<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>列表</span>
        </h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24">
          <Card dis-hover>
            <i-form :model="search" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="时间">
                <DatePicker type="daterange" v-model="Time" placeholder="选择日期" style="width: 220px"></DatePicker>
              </FormItem>
              <FormItem label="操作人">
                <i-input v-model="search.created_name" style="width:160px;"></i-input>
              </FormItem>
              <!-- <FormItem label="优先级">
                <Select v-model="search.priority" style="width:100px" clearable>
                  <Option v-for="(i,v) in priority" :key="v" :value='i.key' :label='i.name'></Option>
                </Select>
              </FormItem> -->
              <!-- <FormItem label="类型">
                <Select v-model="search.type_name" style="width:100px" clearable>
                  <Option v-for="(e,c) in type_name" :key="c" :value='e.key' :label='e.name'></Option>
                </Select>
              </FormItem> -->
              <FormItem label="操作事件">
                <i-input v-model="search.event" style="width:160px;"></i-input>
              </FormItem>
              <!-- <FormItem label="操作接口">
                <i-input v-model="search.path" style="width:160px;"></i-input>
              </FormItem> -->
              <FormItem label="客户端IP">
                <i-input v-model="search.remote_addr" style="width:160px;"></i-input>
              </FormItem>
              <FormItem label="每页条数">
                <Select v-model="search.perPage" style="width:80px">
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
      <div class="page-con1">
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="no_con" v-if="0">
                <Alert show-icon>
                  查询结果
                  <template slot="desc">请输入查询条件 </template>
                </Alert>
              </div>
              <div class="have_con">
                <div class="data_sj">
                  <div style="margin: 10px 0;overflow: hidden">
                    <MyTable :table="table"></MyTable>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal system-log-modal" v-model="RiZhiXiangQing" title="日志详情" width="800">
      <div class="blockquote scroll-bar-y" style="height:420px;">
        <ol>
          <li><b>日志ID:</b> {{detailInfo.id}}</li>
          <li><b>站点:</b> {{detailInfo.site_id}}</li>
          <li><b>操作人:</b> {{detailInfo.created_name}}</li>
          <li><b>事件:</b> {{detailInfo.event}}</li>
          <li><b>channel:</b> {{detailInfo.channel}}</li>
          <li><b>优先级:</b> {{detailInfo.priority}}</li>
          <li><b>类型:</b> {{detailInfo.type_name}}</li>
          <li><b>path:</b> {{detailInfo.path}}</li>
          <li><b>method:</b> {{detailInfo.method}}</li>
          <li><b>request:</b> {{detailInfo.request}}</li>
          <li><b>信息:</b> {{detailInfo.message ? detailInfo.message : "无"}}</li>
          <li><b>内容:</b> {{detailInfo.context ? detailInfo.context : "无"}}</li>
          <li><b>操作IP:</b> {{detailInfo.remote_addr}}</li>
          <li><b>客户端:</b> {{detailInfo.user_agent}}</li>
          <li><b>创建时间:</b> {{detailInfo.created_at}}</li>
        </ol>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import mixins from "@/mixins";
  export default {
    name: "AdminLog",
    mixins: [mixins],
    // components: { AdminLogDataTable },
    data() {
      return {
        RiZhiXiangQing:false,
        detailInfo:{},
        priority:[],
        type_name:[],
        Time: [],
        search: {
          site_id: "",
          created_name: "",
          priority: "",
          type_name: "",
          event: "",
          path: "",
          remote_addr: "",
          startTime: "",
          endTime: "",
          perPage: ""
        },
        table: {
          //数据部分开始
          TableColumn: [
            // {
            //   title: "站点名称",
            //   key: "site_id",
            //   render: (h, params) => {
            //     let siteName = "";
            //     params.row.site_id.split(',').forEach(i => {
            //       if (i == 0) {
            //         siteName = "无站点"
            //       } else {
            //         this.$root.AllSiteNameList.forEach(e => {
            //           if (e.id == i) {
            //             siteName = siteName == "" ? e.siteName : (siteName + "，" + e.siteName)
            //           }
            //         })
            //       }
            //     })
            //     return h('span',siteName);
            //   }
            // },
            {
              title: "操作人",
              key: "created_name"
            },
            {
              title: "消息",
              key: "message"
            },
            {
              title: "操作事件",
              key: "event",
              // width: "110px",
            },
            {
              title: "创建时间",
              key: "created_at",
              // width: "110px",
            },
            {
              title: "操作IP",
              key: "remote_addr"
            },
            // {
            //   title: "操作接口",
            //   key: "path"
            // },
            {
              title: "操作详情",
              // width: "110px",
              render: (h, params) => {
                return h(
                  "Button", {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Admin_OperationLogDetail,{id:params.row.id}).then(res => {
                          if(res.data.code === 200){
                            this.RiZhiXiangQing = true
                            this.detailInfo = res.data.data
                          }
                        })
                      }
                    }
                  },
                  "查看详情"
                );
              }
            }
          ],
          TableData: {},
          loading: true,
          align: "center",
          postType: "get",
          posturl: this.$root.HTTP_L.HTTP_Admin_OperationLog,
          dataform: {
            isRules: "select",
            siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          }
        }
      };
    },
    computed: {},
    created () {
      this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Admin_OperationLogForm).then(res => {
        this.priority = res.data.data.priority
        this.type_name = res.data.data.type_name
      })
    },
    methods: {
      mechange(re) {
        //站点等级选择
        this.search.site_id = re.SiteId;
      },
      Search() {
        console.log(this.Time)
        this.search.startTime = this.Time[0] ? this.$moment(this.Time[0]).format("L") : "";
        this.search.endTime = this.Time[1] ? this.$moment(this.Time[1]).format("L") : "";
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
        this.Time = [];
        this.Search();
      }
    }
  };
</script>
<style scoped lang='less'>
  .member-main {}

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