
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form ref="search" :model="search" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="等级">
                  <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfAgency" v-on:listenLevelChange="levelChange"></LevelSelect>
                </FormItem>
                <FormItem label="所属代理">
                  <i-input type="text" style="width:120px" v-model="search.superiorUserName" placeholder="上级代理账号"></i-input>
                </FormItem>
                <FormItem label="代理账号">
                  <i-input type="text" style="width:120px" v-model="search.userName" placeholder="多个请以,号隔开"></i-input>
                </FormItem>
                <FormItem label="开户日期">
                  <DatePicker type="daterange" confirm v-model="Time" format="yyyy-MM-dd" placeholder="请选择入会日期" style="width: 210px"></DatePicker>
                </FormItem>

                <FormItem label="状态">
                  <Select clearable v-model="search.status" style="width: 80px">
                    <Option value="yes">启用</Option>
                    <Option value="no">停用</Option>
                  </Select>
                </FormItem>

                <FormItem label="类型">
                  <Select v-model="search.agencyType" style="width: 80px">
                    <Option value="all">全部</Option>
                    <Option value="agency">代理</Option>
                    <Option value="shareholder">大股东</Option>
                  </Select>
                </FormItem>

                <FormItem>
                  <Button type="primary" @click="SearchSubmit">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
        </div>
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div class="caozuo_btn">
                    <Button type="primary" @click="$router.push({name:'AgentCreate'})">新增代理</Button>
                  </div>
                  <div style="margin: 10px 0;">
                    <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" @listenOnExpand="expand($event)" :table="table"></MyTable>
                  </div>
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
import deviceIcons from "@/local/deviceIcons";
import MemberLoginHistory from "@/template/my-components/MemberLoginHistory";

const TableMore = {
  components: { MemberLoginHistory },
  template: `
  <div class='table_more_data'>
    <div class="agency-path"><b>代理路径：</b>{{row.agencyPath}}</div>
    <ul class="clearfix">
        <li><b>真实姓名：</b><span >{{row.realName}}</span></li>
        <li><b>公司入款总额：</b>{{memberDetail?memberDetail.offline_deposit_amount:"暂无信息"}}</li>
        <li><b>提款总额：</b>{{memberDetail?memberDetail.withdrawals_amount:"暂无信息"}}</li>
        <li><b>线上入款总额：</b>{{memberDetail?memberDetail.online_deposit_amount:"暂无信息"}}</li>
        <li><b>红利返水总额：</b>{{memberDetail?memberDetail.bonus_amount:"暂无信息"}}</li>


        <li><b>手机号：</b><span >{{row.phone}}</span></li>
        <li><b>公司入款次数：</b>{{memberDetail?memberDetail.offline_deposit_count:"暂无信息"}}</li>
        <li><b>提款次数：</b>{{memberDetail?memberDetail.withdrawals_count:"暂无信息"}}</li>
        <li><b>线上入款次数：</b>{{memberDetail?memberDetail.online_deposit_count:"暂无信息"}}</li>
        <li><b>红利返水次数：</b>{{memberDetail?memberDetail.bonus_count:"暂无信息"}}</li>

        <li><b>微信：</b>{{row.wechat}}</li>
        <li><b>有效投注金额：</b>{{memberDetail?memberDetail.valid_bet_amount:"暂无信息"}}</li>
        <li><b>返点比例：</b>{{row.rebate}}</li>
        <li><b>站点名称</b>:{{row.siteName}}</li>
        <li><b>上次登陆设备：</b><span>{{row.lastDevice}}</span></li>


        <li><b>邮箱：</b>{{row.email}}</li>
        <li><b>投注单量：</b>{{row.betNumber}}</li>
        <li><b>下注输赢：</b>{{memberDetail?memberDetail.net_amount:"暂无信息"}}</li>
        <li><b>代理类型</b>：<span :style="{color:row.agencyType=='agency'?'black':'red'}">{{row.agencyType=='agency'?'普通代理':'大股东'}}</span></li>
        <li><b>历史登陆：</b><a href="javascript:;" @click="getMemberHistory()">历史记录</a></li> 

        <li><b>头像：</b><span >{{row.pic}}</span></li>
        <li><b>团队架构：</b><router-link :to="{name:'AgentTree',query:{siteId:row.siteId,uid:row.uid,userName:row.userName}}">点此查看</router-link></li>
        <li><b>最后统计时间：</b>{{memberDetail?$moment.unix(memberDetail.addTime).format("YYYY-MM-DD HH:mm:ss"):"暂无信息"}}</li>
    </ul>
    <div class="remark"><b>备注：</b>{{row.remark?row.remark:"暂无信息"}}</div>
    <MemberLoginHistory ref="MemberLoginHistory" :data="memberHistoryData"></MemberLoginHistory>
  </div>
  `,
  props: {
    row: Object,
    memberDetail: Object
  },
  computed: {
    memberHistoryData() {
      return {
        url: this.$root.HTTP_L.HTTP_Get_MemberHistory,
        params: {
          siteId: this.row.siteId,
          uid: this.row.uid
        }
      };
    }
  },
  methods: {
    getMemberHistory() {
      this.$refs.MemberLoginHistory.fetchData();
    }
  }
};

export default {
  name: "AgentSearch",
  mixins: [mixins],
  data() {
    return {
      search: {
        agencyType: "all"
      },
      memberDetailList:[],
      table: {
        //数据部分开始
        TableColumn: [
          {
            title: "所属代理",
            key: "superiorUserName",
            sortable: "custom",
            width: 150
          },
          {
            title: "代理等级",
            key: "levelId",
            width: 100,
            sortable: "custom",
            render: (h, params) => {
              return h('span',this.levelFilter(params.row.levelId, params.row.levelName));
            }
          },
          {
            title: "代理账号",
            key: "userName",
            width: 150,
            sortable: "custom",
            render: (h, params) => {
              let iconColor =
                params.row.online !== "no" ? "#19be6b" : "#ed3f14";
              let type = deviceIcons[params.row.online];
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "right-start"
                    },
                    style: {
                      height: "27px",
                      lineHeight: "27px"
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "social-vimeo",
                        color: "#ffeb3b"
                      },
                      style: {
                        fontSize: "12px",
                        verticalAlign: "middle",
                        display:
                          params.row.agencyType === "shareholder"
                            ? "inline-block"
                            : "none"
                      }
                    }),
                    h(
                      "span",
                      {
                        style: {
                          display: "inline-block",
                          width: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "middle"
                        }
                      },
                      params.row.userName
                    ),
                    h("Icon", {
                      props: {
                        type: type,
                        color: iconColor
                      },
                      style: {
                        width: "20px",
                        fontSize: params.row.online !== "no" ? "20px" : "5px",
                        verticalAlign: "middle"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      [
                        h("p", params.row.userName),
                        h(
                          "p",
                          params.row.online == "no"
                            ? "离线"
                            : `${
                                params.row.online === "other"
                                  ? "其他设备"
                                  : params.row.online
                              }在线`
                        )
                      ]
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "注册会员",
            key: "memberCount",
          },
          {
            title: "有效会员",
            key: "validMemberCount",
          },
          {
            title: "今日注册",
            key: "todayMemberCount",
          },
          {
            title: "今日有效",
            key: "todayValidMemberCount",
          },
          // {
          //   title: "入款统计",
          //   key: "offlineDepositAmount",
          // },
          // {
          //   title: "提款总额",
          //   key: "withdrawalsAmount",
          // },
          {
            title: "账户余额",
            key: "balance",
          },
          {
            title: "更新时间",
            key: "updated_at",
            sortable: "custom",
            width: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.updated_at - 0).format("LLL"));
            }
          },
          {
            title: "锁定",
            key: "lock",
            width: 85,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ['params'],
                data(){
                  return {
                    popShow: false
                  }
                },
                template:`
                  <Poptip v-model="popShow">
                      <Button
                      type="text" 
                      size="small" 
                      @click="popShow=true"
                      >
                        <Icon v-if="params.row.lock === 'yes'" type="locked" color="#bbbec4" size="22"></Icon>
                        <Icon v-else type="unlocked" color="#484f60" size="22"></Icon>
                      </Button>
                      <div slot="content" style="font-size:14px;">
                        <p style="margin-bottom:10px;width:164px;">
                          <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                          <span v-if="params.row.lock === 'no'">锁定的会员不能享受平台的自动优惠和自动晋级，只能人工调节等级</span>
                          <span v-else>你确定要解锁该会员吗?</span>
                        </p>
                        <Button type="text" @click="popShow=false">取消</Button>
                        <Button type="primary" size="small" @click="runModify(params)">确定</Button>
                      </div>
                  </Poptip>`,
                methods: {
                  runModify(table){
                    this.popShow = false;
                    that.ModifyLock(table);
                  }
                }
              }
              return h(Template,{
                props: {
                  params: params
                }
              })
            }
          },
          {
            title: "状态",
            key: "status",
            sortable: "custom",
            width: 90,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ['params'],
                data(){
                  return {
                    popShow: false
                  }
                },
                template:`
                  <Poptip v-model="popShow">
                      <Button
                      :type="params.row.status == 'yes' ? 'success' : 'error'" 
                      size="small" 
                      @click="popShow=true"
                      >{{params.row.status == "yes" ? "启用" : "停用"}}</Button>
                      <div slot="content" style="font-size:14px;">
                        <div style="margin-bottom:10px;">
                          <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                          <span>你确定要{{params.row.status == "yes" ? "停用" : "启用"}}该会员吗?</span>
                        </div>
                        <Button type="text" @click="popShow=false">取消</Button>
                        <Button type="primary" size="small" @click="runModify(params)">确定</Button>
                      </div>
                  </Poptip>`,
                methods: {
                  runModify(table){
                    this.popShow = false;
                    that.ModifyAgentStatus(table);
                  }
                }
              }
              return h(Template,{
                props: {
                  params: params
                }
              })
            }
          },
          {
            title: "操作",
            key: "",
            width: 160,
            render: (h, params) => {
              var that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "AgentUser",
                          query: {
                            siteId: params.row.siteId,
                            id: params.row.uid
                          }
                        });
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: { marginRight: "5px" },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "AgentCreate",
                          query: {
                            siteId: params.row.siteId,
                            id: params.row.uid,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
          },
          {
            type: "expand",
            title: "...",
            width: 40,
            render: (h, params) => {
              for (let key in params.row) {
                if (params.row[key] === "") {
                  params.row[key] = "暂无信息";
                }
              }
              return h(TableMore, {
                props: {
                  row: params.row,
                  memberDetail: this.memberDetailList[params.index]
                }
              });
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        Refresh: 0,
        posturl: this.$root.HTTP_L.HTTP_DaiLiLieBiao,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        },
        selectAllcencle: true
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.memberCountSearch();
    });
  },
  methods: {
    siteChange(re) {
      //站点选择事件监听
      if (re.SiteId) {
        this.search.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId,"AgencyLevelModel");
      }
    },
    SearchRest() {
      this.Time = ["", ""]; 
      this.search = {
        siteId: this.defaultSiteId,
        agencyType: "all"
      };
      this.$refs.LevelSelect.setDefaultLevel("");
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    SearchSubmit() {
      let params = {};
      params.siteId = this.search.siteId;
      if (this.search.levelId) {
        params.levelId = this.search.levelId;
      }
      if (this.search.userName) {
        params.userName = this.search.userName.split(",");
      }
      if (this.search.superiorUserName) {
        params.superiorUserName = this.search.superiorUserName;
      }
      if (this.search.status) {
        params.status = this.search.status;
      }
      if (this.search.agencyType && this.search.agencyType !== "all") {
        params.agencyType = this.search.agencyType;
      }
      if (this.Time[0] && this.Time[1]) {
        params.startTime = this.$moment(this.Time[0]).format("L");
        params.endTime = this.$moment(this.Time[1]).format("L");
      }

      if (params.superiorUserName && params.superiorUserName.length < 5) {
        this.$Modal.error({
          title: "提示",
          content: "所属代理长度最小5位"
        });
        return false;
      }
      if (Object.keys(params).length > 0) {
        this.table.dataform = params;
      }
    },
    ModifyLock(table) {
      let lock = table.row.lock == "yes" ? "no" : "yes";
      let url = this.$root.HTTP_L.HTTP_Update_MemberLock;
      let params = {
        uid: [table.row.uid],
        siteId: table.row.siteId,
        lock: lock
      }
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal("success","","修改成功！");
        this.$set(this.table.TableData.data[table.index], "lock", lock);
        table.row.lock = lock;
      })
    },
    ModifyAgentStatus(table) {
      let status = table.row.status == "yes" ? "no" : "yes";
      let url = this.$root.HTTP_L.HTTP_DaiLiZhuangTaiXiuGai;
      let params = {
        siteId: table.row.siteId,
        id: table.row.uid,
        status: status
      }
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal("success","","修改状态成功！！");
        this.$set(
          this.table.TableData.data[table.index],
          "status",
          status
        );
        table.row.status = status;
      })
    },
    expand(v){
      // console.log(v)
      if(v.status){
        this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_SingleMember,{siteId:v.row.siteId,uid:v.row.uid}).then(res => {
          this.$set(this.memberDetailList,v.row.index,res.data.data)
        })
      }
    }
  }
};
</script>
<style scoped lang='less'>
.ivu-radio-group-vertical .ivu-radio-wrapper {
  display: inline;
}
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    width: 100px;
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
.ivu-btn-small {
  padding: 0 7px;
}
</style>