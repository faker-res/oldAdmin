<template>
    <div class="content-main SiteMail-main">
        <div class="layout">
            <div>
                <div class="page-header">
                    <h1 class="binding">{{$route.meta.title}}</h1>
                </div>
                <div class="page-con1">
                    <div class="neirong">
                        <div class="tabs">
                            <a :class="{'active':showzx=='MemberLevelModel'}" @click="showzx = 'MemberLevelModel'" href="javascript:;">会员等级配置</a>
                            <a :class="{'active':showzx=='AgencyLevelModel'}" @click="showzx = 'AgencyLevelModel'" href="javascript:;">代理等级配置</a>
                            <a :class="{'active':showzx=='MemberRefundLevelModel'}" @click="showzx = 'MemberRefundLevelModel'" href="javascript:;">会员返水等级配置</a>
                            <!-- <a :class="{'active':showzx=='BankList'}" @click="showzx = 'BankList'" href="javascript:;">银行配置</a> -->
                            <a :class="{'active':showzx=='CommonLevel'}" @click="showzx = 'CommonLevel'" href="javascript:;">公共等级</a>
                        </div>
                        <div v-if="showzx=='MemberLevelModel'" class="tab_con tb">
                            <Button type="primary" style="margin-bottom:10px;" @click="$router.push({name:'SystemConfigCreate' , query:{level:'MemberLevelModel'}})">添加会员等级</Button>
                            <memberLevelList @listenOnSign='listenOnSign' :table="table" />
                        </div>
                        <div v-if="showzx=='AgencyLevelModel'" class="tab_con bb">
                            <Button type="primary" style="margin-bottom:10px;" @click="$router.push({name:'SystemConfigCreate' , query:{level:'AgencyLevelModel'}})">添加代理等级</Button>
                            <AgentLevelList @listenOnSign='listenOnSign' :table="table" />
                        </div>
                        <div v-if="showzx=='MemberRefundLevelModel'" class="tab_con bb">
                            <Button type="primary" style="margin-bottom:10px;" @click="$router.push({name:'SystemConfigCreate' , query:{level:'MemberRefundLevelModel'}})">添加会员返水等级</Button>
                            <MemberRefundLevel @listenOnSign='listenOnSign' :table="table" />
                        </div>
                        <!-- <div v-if="showzx=='BankList'" class="tab_con bb">
                            <Button type="primary" style="margin-bottom:10px;" @click="$router.push({name:'SystemConfigCreate' , query:{level:'BankList'}})">添加银行</Button>
                            <BankList :table="table" />
                        </div> -->
                        <div v-if="showzx=='CommonLevel'" class="tab_con bb">
                            <Button type="primary" style="margin-bottom:10px;" @click="$router.push({name:'CommonLevelCreate'})">添加等级</Button>
                            <CommonLevelList :table="table" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MemberLevelList from "@/template/my-components/iview-table/table";
import AgentLevelList from "@/template/my-components/iview-table/table";
import MemberRefundLevel from "@/template/my-components/iview-table/table";
// import BankList from "@/template/my-components/iview-table/table";
import CommonLevelList from "@/template/my-components/iview-table/table";

export default {
  // name: 'LevelConfigList',
  components: {
    MemberLevelList,
    AgentLevelList,
    MemberRefundLevel,
    // BankList,
    CommonLevelList
  },
  data() {
    return {
      showzx: "MemberLevelModel",
      table: {
        TableColumn: [],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuoQuChuShiDengJiLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select",
          level: "MemberLevelModel"
        },
        sign: true, //判断sign,进行初始字段缓存
        flag: false, //created时是否请求数据
        post: true //解决dataform和posturl同时改变导致请求两次的问题
      },
      commonColumn: [
        {
          title: "默认",
          key: "default",
          minWidth: 80,
          render: (h, params) => {
            var that = this;
            var color = params.row.default == "yes" ? "green" : "red";
            var status = params.row.default == "yes" ? "no" : "yes";
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.default == "yes" ? "开启" : "关闭"
              )
            ]);
          }
        },
        {
          title: "状态",
          key: "status",
          minWidth: 80,
          render: (h, params) => {
            var that = this;
            var color = params.row.status == "yes" ? "green" : "red";
            var status = params.row.status == "yes" ? "no" : "yes";
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.status == "yes" ? "开启" : "关闭"
              )
            ]);
          }
        },
        {
          title: "创建时间",
          key: "created_at",
          minWidth: 180,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL"));
          }
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "Tooltip",
                {
                  style: { color: "#2d8cf0" },
                  props: {
                    content: params.row.remark == "" ? "无" : params.row.remark,
                    placement: "left"
                  }
                },
                params.row.hasOwnProperty("remark")
                  ? params.row.remark.length > 5
                    ? params.row.remark.slice(0, 5) + "..."
                    : params.row.remark == ""
                      ? "无"
                      : params.row.remark
                  : ""
              )
            ]);
          }
        },
        {
          title: "操作",
          minWidth: 110,
          render: (h, params) => {
            var that = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: "inline-block"
                    // display:
                    //   this.showzx === "BankList" ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "SystemConfigDetail",
                        query: {
                          level: this.showzx,
                          id: params.row.id
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
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "SystemConfigCreate",
                        query: {
                          level: this.showzx,
                          id: params.row.id,
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
        }
      ],
      memberColumn: [],
      // bankColumn: [
      //   {
      //     title: "银行名称",
      //     key: "bankName"
      //   },
      //   {
      //     title: "图标",
      //     key: "cardImg",
      //     render: (h, params) => {
      //       if(params.row.cardImg){
      //         return h("img", {
      //           attrs: {
      //             src: params.row.cardImg
      //           }
      //         });
      //       }else{
      //         return h('span',"-");
      //       }
      //     }
      //   },
      //   {
      //     title: "状态",
      //     key: "status",
      //     minWidth: 116,
      //     render: (h, params) => {
      //       var that = this;
      //       var color = params.row.status == "yes" ? "green" : "red";
      //       var status = params.row.status == "yes" ? "no" : "yes";
      //       return h("div", [
      //         h(
      //           "Tag",
      //           {
      //             props: {
      //               color: color
      //             }
      //           },
      //           params.row.status == "yes" ? "开启" : "关闭"
      //         )
      //       ]);
      //     }
      //   },
      //   {
      //     title: "创建时间",
      //     key: "updateTime",
      //     minWidth: 180,
      //     render: (h, params) => {
      //       let text;
      //       if(params.row.updateTime==0){
      //         text = '无';
      //       }else{
      //         text = this.$moment.unix(params.row.updateTime - 0).format("LLL");
      //       }
      //       return h('span',text);
      //     }
      //   },
      //   {
      //     title: "操作",
      //     key: "",
      //     minWidth: 100,
      //     render: (h, params) => {
      //       var that = this;
      //       return h("div", [
      //         h(
      //           "Button",
      //           {
      //             props: {
      //               size: "small"
      //             },
      //             style: {
      //               marginRight: "5px",
      //               display:
      //                 this.showzx === "BankList" ? "none" : "inline-block"
      //             },
      //             on: {
      //               click: () => {
      //                 this.$router.push({
      //                   name: "SystemConfigDetail",
      //                   query: {
      //                     level: this.showzx,
      //                     id: params.row.id
      //                   }
      //                 });
      //               }
      //             }
      //           },
      //           "详情"
      //         ),
      //         h(
      //           "Button",
      //           {
      //             props: {
      //               size: "small"
      //             },
      //             on: {
      //               click: () => {
      //                 this.$router.push({
      //                   name: "SystemConfigCreate",
      //                   query: {
      //                     level: this.showzx,
      //                     id: params.row.id,
      //                     isVerify: true
      //                   }
      //                 });
      //               }
      //             }
      //           },
      //           "编辑"
      //         )
      //       ]);
      //     }
      //   }
      // ],
      commonLevelColumn: [
        {
          title: "等级名称",
          key: "levelName"
        },
        {
          title: "创建时间",
          key: "created_at",
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.created_at).format("LLL"));
          }
        },
        {
          title: "更新时间",
          key: "updated_at",
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.updated_at).format("LLL"));
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
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "CommonLevelCreate",
                        query: {
                          id: params.row.id,
                          levelName: params.row.levelName,
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
        }
      ]
    };
  },
  created() {
    this.column();
  },
  computed: {},
  methods: {
    listenOnSign(re) {
      //监听sign变化(生产环境)
      this.getLevelData().then(res => {
        this.column();
      });
    },
    column() {
      this.memberColumn = [];
      // if (this.showzx === "BankList") {
      //   this.table.TableColumn = [...this.bankColumn];
      // } else 
      if (this.showzx === "CommonLevel") {
        this.table.TableColumn = [...this.commonLevelColumn];
      } else {
        let levelItem = JSON.parse(localStorage.getItem(this.showzx));
        for (let i in levelItem) {
          let obj = {};
          if (
            i !== "status" &&
            i !== "default" &&
            i !== "platform" &&
            i !== "remark" &&
            i !== "welfare" &&
            i !== "created_at" &&
            i !== "updated_at"
          ) {
            obj = {
              title: levelItem[i],
              key: i
            };
            this.memberColumn.push(obj);
          }
        }
        this.table.TableColumn = [...this.memberColumn, ...this.commonColumn];
      }
    }
  },
  watch: {
    showzx: function(value, old) {
      // if (value === "BankList") {
      //   this.table.sign = false;
      //   this.table.post = true;
      //   this.table.dataform = {};
      //   this.table.posturl = this.$root.HTTP_L.HTTP_HuoQuYinHangLieBiao;
      // } else 
      if (value === "CommonLevel") {
        this.table.sign = false;
        this.table.post = true;
        this.table.dataform = {};
        this.table.posturl = this.$root.HTTP_L.HTTP_HuoQuGongGongDengJi;
      } else {
        this.table.sign = true;
        this.table.post = old === "CommonLevel" ? true : false;
        // this.table.post =
        //   old === "BankList" || old === "CommonLevel" ? true : false;
        this.$set(this.table.dataform, "level", value);
        this.table.posturl = this.$root.HTTP_L.HTTP_HuoQuChuShiDengJiLieBiao;
      }
      this.column();
    }
  }
};
</script>
<style scoped lang='less'>
.time {
  text-align: right;
}
.content-main {
  padding: 0;
}
.SiteMail-main {
  .page-header {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    .binding {
    }
  }
  .page-con1 {
    margin-top: 10px;
    padding-bottom: 20px;
  }
  .tabs {
    a {
      padding: 10px;
      display: inline-block;
      background: #fff;
      margin-bottom: -1px;
      border: 1px solid #fff;
      border-bottom: 1px solid #eee;
      margin-left: 10px;
    }
    a.active {
      border: 1px solid #eee;
      border-bottom: 1px solid #fff;
      color: #3a5593;
    }
    margin-top: 15px;
    border-bottom: 1px solid #eee;
  }
  .tab_con {
    .tu_biao {
      width: 50%;
      float: left;
    }

    border-left: 5px solid #eee;
    padding-left: 10px;
    margin: 15px 0;
    width: 100.1%;
  }
}
</style>
