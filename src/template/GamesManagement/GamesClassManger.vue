<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1" style="margin-bottom:10px;">
        <Button type="primary" @click="$router.push({name:'CreateGamesClass'})">添加游戏分类</Button>
      </div>
      <div class="page-con1">
        <GameClassManagerTable :table="table"></GameClassManagerTable>
      </div>
    </div>
  </div>
</template>

<script>
import GameClassManagerTable from "@/template/my-components/iview-table/table";
export default {
  // name: "GamesClassManger",
  components: { GameClassManagerTable },
  data() {
    return {
      loading: false,
      pageSize: 10,
      table: {
        TableColumn: [
          {
            title: "顺序",
            key: "sequence",
            width: 80,
          },
          {
            title: "平台",
            key: "platform",
            width: 150,
            render: (h, params) => {
              let text;
              switch (params.row.platform) {
                case "sport":
                  text="体育";
                  break;
                case "slot":
                  text="电子";
                  break;
                case "chess":
                  text="棋牌";
                  break;
                case "lottery":
                  text="彩票";
                  break;
                case "vr_lottery":
                  text="VR彩票";
                  break;
                case "live_casino":
                  text="真人";
                  break;
                default:
                  text="其他";
                  break;
              }
              return h('span',text);
            }
          },
          {
            title: "分类",
            key: "name",
            minWidth: 130,
          },
          {
            title: "分类编号",
            key: "code",
            minWidth: 150,
          },
          {
            title: "状态",
            key: "status",
            width: 116,
            render: (h, params) => {
              var that = this;
              var status = params.row.status == "yes" ? "no" : "yes";
              var type = params.row.status === "yes" ? "success" : "error";
              return h("div", [
                h(
                  "i-button", {
                      props: {
                          type: type,
                          size:"small"
                      },
                      on:{
                          click:()=>{
                              var alertMsg = "确认关闭游戏分类吗？";
                              if(status === 'yes'){
                                  alertMsg = "确认开启游戏分类吗？";
                              }
                              this.$Modal.confirm({
                                title: '提示',
                                content: `<h3>${alertMsg}</h3>`,
                                loading: false,
                                onOk:()=>{
                                  this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiYouXiFenLei,{
                                    code: params.row.code,
                                    name: params.row.name,
                                    platform: params.row.platform,
                                    status: status,
                                    sequence: params.row.sequence,
                                    updated_user: this.$root.adminuserinfo.adminUserName,
                                    gameClassId: params.row.id,
                                  }).then(res => {
                                    this.$root.modal("success" , "" , "修改状态成功")
                                    this.$set(
                                      this.table.TableData.data[params.index],
                                      "status",
                                      status
                                    );
                                      // this.$Message.success(res.data.data);
                                  });
                                },
                                onCancel:()=>{

                                }
                            });
                          }
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
            width: 180,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at - 0).format("LLL")||'无');
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
                          name: "GamesClassDetail",
                          query: { id: params.row.id }
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
                          name: "CreateGamesClass",
                          query: { id: params.row.id ,isVerify:true }
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
                          content: "确认删除？",
                          onOk: () => {
                            this.$root.loading()
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L
                                  .HTTP_ShanChuYouXiFenLei,
                                { gameClassId: params.row.id }
                              )
                              .then(res => {
                                this.$Spin.hide()
                                this.$root.modal("success" , "" , "删除游戏分类成功！")
                                this.table.TableData.data.splice(
                                  params.index,
                                  1
                                );
                                this.table.TableData.total--;
                              })
                              .catch(res => {
                                this.$Spin.hide()
                                this.$root.modal("error" , "" , "删除游戏分类失败！")
                              });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_YouXiFenLeiLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select"
        }
      }
    };
  },
  created() {
    this.getadminlist();
  },
  methods: {
    getadminlist(index) {
      var i = index || 1;
    }
  }
};
</script>

<style>

</style>
