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
          <div class="serach">

            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn c_search_top" span="24">
                  <Card dis-hover>
                    <i-form inline>
                      <FormItem label="站点">
                        <SiteNameSelect ref="SiteNameSelect" @listenOnChange="mechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                      </FormItem>
                      <FormItem label="账号">
                        <i-input v-model="DataSearch.userName"></i-input>
                      </FormItem>
                      <FormItem label="是否登录">
                        <Select v-model="DataSearch.isLogin" clearable style="width:100px">
                          <Option label="是" value="yes">是</Option>
                          <Option label="否" value="no">否</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="日期" class="form-group">
                        <Select v-model="DataSearch.day" clearable style="width:100px">
                          <Option label="今日" :value="0">今日</Option>
                          <Option label="最近三天" :value="3">最近三天</Option>
                          <Option label="最近五天" :value="5">最近五天</Option>
                          <Option label="最近一周" :value="7">最近一周</Option>
                          <Option label="最近一月" :value="30">最近一月</Option>
                        </Select>
                      </FormItem>
                      <FormItem class="form-group">
                        <Button @click="Search" type="primary">查询</Button>
                        <Button @click="SearchReset" type="warning">重置</Button>
                      </FormItem>
                    </i-form>
                  </Card>
                </div>
                <div style="margin: 10px 0;overflow: hidden">
                  <i-col class="c_search_result" span="24">
                    <MyTable :table="table"></MyTable>
                  </i-col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="istoday" width="860" title="登录日志详情">
      <div class="scroll-bar-y" style="max-height:420px;">
        <table class="table" style="width:100%">
          <thead>
            <tr>
              <th>站点</th>
              <th>域名</th>
              <th>代理</th>
              <th>账号</th>
              <th>设备</th>
              <th>IP</th>
              <th>登录时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="7" v-if="!DataMemory.length">没有数据</td>
            </tr>
            <tr class="MemberLogin_log_list" v-for="(m,i) in DataMemory" :key="i">
              <td>{{m.siteName}}</td>
              <td>{{m.domain?m.domain:'无'}}</td>
              <td>{{m.agencyName ? m.agencyName : "无"}}</td>
              <td>{{m.userName}}</td>
              <td>
                <span v-if="m.device=='pc'">Windows电脑端</span>
                <span v-if="m.device=='mac'">Mac电脑端</span>
                <span v-if="m.device=='android'">安卓设备</span>
                <span v-if="m.device=='iphone'">iphone苹果设备</span>
                <span v-if="m.device=='ipad'">ipad苹果平板</span>
                <span v-if="m.device=='android_tablet'">android安卓平板</span>
                <span v-if="m.device=='other'">其他设备</span>
              </td>
              <td>{{m.ip}}</td>
              <td>{{$moment.unix(m.updated_at-0).format("LLL")}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  name: "MemberLoginLog",
  mixins: [mixins],
  data() {
    return {
      istoday: false,
      DataMemory: [],
      TableData: [],
      DataSearch: {
        day: 0,
        userName: "",
        isLogin: "yes",
        siteId: ""
      },
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "站点",
            render: (h, params) => {
              return h('span',params.row.last.siteName);
            }
          },
          {
            title: "域名",
            render: (h, params) => {
              return h('span',params.row.last.domain);
            }
          },
          {
            title: "代理",
            render: (h, params) => {
              return h('span',params.row.last.agencyName);
            }
          },
          {
            title: "账号",
            render: (h, params) => {
              return h('span',params.row.last.userName);
            }
          },
          {
            title: "设备",
            render: (h, params) => {
              let device;
              switch (params.row.last.device) {
                case "pc":
                  device = "Windows电脑端";
                  break;
                case "mac":
                  device = "Mac电脑端";
                  break;
                case "android":
                  device = "安卓设备";
                  break;
                case "iphone":
                  device = "iphone苹果设备";
                  break;
                case "ipad":
                  device = "ipad苹果平板";
                  break;
                case "android_tablet":
                  device = "android安卓平板";
                  break;
                default:
                  device = "其他设备";
              }
              return h('span',device);
            }
          },
          {
            title: "IP",
            render: (h, params) => {
              return h('span',params.row.last.ip);
            }
          },
          {
            title: "登录时间",
            render: (h, params) => {
              let text = this.$moment.unix(+params.row.last.updated_at).format("LLL")
              return h('span',text);
            }
          },
          {
            title: "操作",
            key: "",
            render: (h, params) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.DataMemory = params.row.list;
                      this.istoday = true;
                    }
                  }
                },
                "详情"
              );
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuiYuanDengLuRiZhi,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id,
          day: 0,
          isLogin: "yes"
        }
      }
    };
  },
  methods: {
    mechange(re) {
      this.DataSearch.siteId = re.SiteId;
    },
    ShowLoginLog(m, i) {
      this.DataMemory = m;
      this.istoday = true;
    },
    SearchReset() {
      this.DataSearch = {
        day: 0,
        userName: "",
        isLogin: "yes",
        siteId: this.defaultSiteId
      };
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    Search() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] === null || this.DataSearch[key] === "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    }
  }
};
</script>
<style scoped lang='less'>
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
    border: 1px solid #f5f5f5;
    border-top: none;
  }
}
</style>