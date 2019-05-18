<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1" style="margin-bottom:10px;">
        <Button type="primary" @click="$router.push({name:'PreferentialCreat'})">创建优惠</Button>
      </div>
      <div class="page-con1">
        <!-- <Table :loading="loading" stripe :columns="AdminColumns" :data="AdminData.data"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="AdminData.total" :page-size="AdminData.per_page" show-total class="paging" @on-change="getadminlist"></Page>
                    </div>
                </div> -->
        <AdminlistTable :table="table"></AdminlistTable>
      </div>
    </div>
  </div>
</template>

<script>
const TableMore = {
  template: `
  <div class='more_data' style="text-align:left">
    <Row>
    
        <Col span="4"><b>用户名</b>:{{row.userName}}</Col>
        <Col span="4"><b>返水层级</b>:{{row.refundLevelName}}</Col>
        <Col span="4"><b>状态</b>:{{row.status=='yes'?'开启':'关闭'}}</Col>
        <Col span="4"><b>会员等级</b>:{{row.levelName}}</Col>
        <Col span="4"><b>代理账户</b>:{{row.agencyName}}</Col>
        <Col span="4"><b>余额</b>:{{row.balance}}</Col>
    </row>
    <Row>
        <Col span="4"><b>站点名称</b>:<span v-if="row.siteName">{{row.siteName}}</span><span v-else>无</span></Col>
        <Col span="4"><b>手机号</b>:<span v-if="row.phone">{{row.phone}}</span><span v-else>无</span></Col>
        <Col span="4"><b>邮箱</b>:<span v-if="row.email">{{row.email}}</span><span v-else>无</span></Col>
        <Col span="4"><b>微信</b>:<span v-if="row.wechat">{{row.wechat}}</span><span v-else>无</span></Col>
        <Col span="4"><b>真实姓名</b>:<span v-if="row.realName">{{row.realName}}</span><span v-else>无</span></Col>
        <Col span="4"><b>备注</b>:<span v-if="row.remark">{{row.remark}}</span><span v-else>无</span></Col>
    </row>
    <Row>
        <Col span="4"><b>上次登陆设备</b>:<span v-if="row.lastDevice">{{row.lastDevice}}</span><span v-else>无</span></Col>
        <Col span="4"><b>上次登陆域名</b>:<span v-if="row.lastDomain">{{row.lastDomain}}</span><span v-else>无</span></Col>
        <Col span="4"><b>上次登陆时间</b>:<span v-if="row.lastTime">{{row.lastTime}}</span><span v-else>无</span></Col>
        <Col span="4"><b>上次登录网络</b>:<span v-if="row.lastGamePlatform">{{row.lastGamePlatform}}</span><span v-else>无</span></Col>
        <Col span="4"><b>上次登陆ip</b>:<span v-if="row.lastIP">{{row.lastIP}}</span><span v-else>无</span></Col>        
    </row>
    <Row>
        <Col span="24"><b>所属代理路径</b>:{{row.agencyPath}}</Col>
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
import AdminlistTable from "@/template/my-components/iview-table/table";
export default {
  components: { AdminlistTable },
  data() {
    return {
      loading: false,
      WebSiteList: [],
      table: {
        TableColumn: [
          {
            title: "名称",
            key: "title",
            render: (h, params) => {
              var sitename = params.row.title;
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "left"
                    },
                    style: {},
                    on: {
                      click: () => {}
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        // props: {
                        //   type: "text"
                        // },
                        style: { color: "#2d8cf0", cursor: "pointer" }
                      },
                      // params.row.ball.length < 20
                      //   ? params.row.ball
                      //   : params.row.ball.slice(0, 20) + "..."
                      sitename.length <= 4
                        ? sitename
                        : sitename.slice(0, 4) + "..."
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      sitename
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "显示",
            key: "showMemberCenter",
            render: (h, params) => {
              // h('span',[
              var color =
                params.row.showMemberCenter == "yes" ? "yellow" : "#ddd";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.showMemberCenter == "yes" ? "是" : "否"
              );
              // ])
              // return params.row.status;
            }
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              // h('span',[
              var color = params.row.status == "yes" ? "green" : "red";
              return h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "yes" ? "开启" : "关闭"
              );
              // ])
              // return params.row.status;
            }
          },
          {
            title: "活动时间",
            key: "end_date",
            width: 320,
            render: (h, params) => {
              return this.$moment.unix(params.row.star_date - 0).format("LLL")+'-'+this.$moment.unix(params.row.end_date - 0).format("LLL");
            }
          },
          // {
          //   title: "创建人",
          //   key: "createUserName",
          //   render: (h, params) => {
          //     return params.row.createUserName;
          //   }
          // },
          {
            title: "站点名称",
            key: "siteName",
            width: 116,
            render: (h, params) => {
              return params.row.siteName;
            }
          },
          {
            title: "备注",
            key: "remarks",
            render: (h, params) => {
              var sitename = params.row.remarks;
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "left"
                    },
                    style: {},
                    on: {
                      click: () => {}
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        // props: {
                        //   type: "text"
                        // },
                        style: { color: "#2d8cf0", cursor: "pointer" }
                      },
                      // params.row.ball.length < 20
                      //   ? params.row.ball
                      //   : params.row.ball.slice(0, 20) + "..."
                      sitename.length < 10
                        ? sitename
                        : sitename.slice(0, 10) + "..."
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      sitename
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "操作",
            key: "",
            width: 250,
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
                          name: "PreferentialDetails",
                          query: {
                            preferentialId: params.row.id
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
                          name: "PreferentialCreat",
                          query: { preferentialId: params.row.id , isVerify:true}
                        });
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "删除",
                          content: "确认删除？",
                          loading: true,
                          onOk: () => {
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_YouHuiShanChu,
                                {
                                 preferentialId: params.row.id
                                }
                              )
                              .then(
                                res => {
                                  this.$Modal.remove();
                                  this.$root.modal("success" , "" , "优惠删除成功！")
                                  // this.$Message.info("优惠删除成功！");
                                  this.table.TableData.data.splice(
                                    params.index,
                                    1
                                  );
                                  this.table.TableData.total--
                                },
                                res => {
                                  setTimeout(() => {
                                    this.$Modal.remove();
                                  }, 2000);
                                }
                              );
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          },
          {
            type: "expand",
            title: "...",
            width: 80,
            render: (h, params) => {
              return h(TableMore, {
                props: {
                  row: params.row
                }
              });
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_YouHuiLeiBiao,
        dataform: {
          isRules: "select"
        }
      }
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      //   vm.$http.post(vm.$root.HTTP_L.HTTP_ZhanDianLieBiao).then(res => {
      //     vm.WebSiteList = res.data.data.data;
      // });
    });
  },
  created() {
    this.getadminlist();
  },
  // computed:{
  //   WebSiteListfille(array,element){
  //     return this.WebSiteListfiller(array,element)
  //   }
  // },
  methods: {
    WebSiteListfiller(array, element) {
      var arrt = [];
      for (let ac = 0; ac < array.length; ac++) {
        this.WebSiteList.forEach((i, c, v) => {
          if (array[ac] - 0 === this.WebSiteList[c][element]) {
            arrt.push(i.siteName);
          }
        });
      }
      return arrt.join(",");
    },
    getadminlist(index) {
      var i = index || 1;
      //   this.$http.post("/api/admin/index?page="+i, this.dataform)
    }
    // changepage(event,data) {
    //     debugger
    //     this.$http.post("/api/admin/index?page="+index, { data }).then((res) => {
    //        this.AdminData = JSON.parse(res.body.data)
    //     });
    // }
  }
};
</script>

<style>
</style>
