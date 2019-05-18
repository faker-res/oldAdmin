<template>
  <div class="content-main Notification-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Button type="primary" @click="$router.push({name:'SendNotification'})">
          创建
        </Button>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form ref="NotificationSerach" :model="NotificationSerach" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="ZhanDianmechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="公告标题">
                  <i-input type="text" style="width:150px" v-model="NotificationSerach.like.title" placeholder="以信息内容做模糊搜寻"></i-input>
                </FormItem>
                <FormItem label="发布人">
                  <i-input type="text" style="width:150px" v-model="NotificationSerach.like.who" placeholder="以信息内容做模糊搜寻"></i-input>
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
            <div style="margin: 10px 0;overflow: hidden">
              <MyTable :table="table"></MyTable>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="YouJianDo" width="800">
      <p slot="header" style="color:#f60;font-size:18px">
        <span>公告信息</span>
      </p>
      <div style="font-size:15px">
        <h2 style="text-align:center">{{YouJianNeiRong.title}}</h2>
        <p class="GongGaoNeiRong" style="font-family:Microsoft JhengHei" v-html="YouJianNeiRong.description"></p>
        <br>
        <small>
          <label style="display:inline-block;width:60px;">发送人：</label>{{YouJianNeiRong.who}}
        </small>
        <br>
        <small>
          <label style="display:inline-block;width:60px;">类型：</label>{{YouJianNeiRong.type === "lantern" ? "走马灯" : YouJianNeiRong.type === "popups" ? "弹框" : YouJianNeiRong.type === "notice" ? "公告" : "文章"}}
        </small>
        <br>
        <small>
          <label style="display:inline-block;width:60px;">状态：</label>{{YouJianNeiRong.status === "yes" ? "开启" : "关闭"}}
        </small>
        <br>
        <small>
          <label style="display:inline-block;width:60px;">更新时间：</label>{{$moment.unix(YouJianNeiRong.updated_at-0).format("LLL")}}
        </small>
        <br>
        <small>
          <label style="display:inline-block;width:60px;">上线时间：</label>{{$moment.unix(YouJianNeiRong.publish_at-0).format("LLL")}} - {{$moment.unix(YouJianNeiRong.offline_at-0).format("LLL")}}
        </small>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      siteName: [],
      levelName: [],
      NotificationSerach: {
        like: {
          title: "",
          who: ""
        },
        siteId: ""
      },
      YouJianDo: false,
      YouJianNeiRong: {},
      SiteIdSelectModal: false,
      SouSuo: false,
      table: {
        //数据部分开始

        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            align: "center"
          },
          {
            title: "信息类型",
            align: "center",
            render: (h, params) => {
              let text;
              switch (params.row.type) {
                case "lantern":
                  text="走马灯";
                  break;
                case "popups":
                  text="弹框";
                  break;
                case "notice":
                  text="公告";
                  break;
                default:
                  text="文章";
                  break;
              }
              return h('span',text);
            }
          },
          {
            title: "内容类型",
            align: "center",
            render: (h, params) => {
              return h('span',params.row.desc_format_type === "text" ? "文本" : "HTML");
            }
          },
          {
            title: "标题",
            key: "age",
            align: "center",
            render: (h, params) => {
              var row = params.row.title;
              return h(
                "a",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.YouJianDo = true;
                      this.YouJianNeiRong = params.row;
                    }
                  }
                },
                row.length > 45 ? row.slice(0, 45) + "..." : row
              );
            }
          },
          {
            title: "状态",
            align: "center",
            render: (h, params) => {
              return h('span',params.row.status === "yes" ? "开启" : "关闭");
            }
          },
          {
            title: "发布人",
            key: "who",
            align: "center"
          },
          {
            title: "创建时间",
            key: "created_at",
            width: 180,
            align: "center",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at).format("LLL"));
            }
          },
          {
            title: "操作",
            key: "",
            width: 250,
            align: "center",
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
                        this.YouJianDo = true;
                        this.YouJianNeiRong = params.row;
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
                          name: "SendNotification",
                          query: {
                            isVerify: true,
                            id: params.row.id,
                            siteId: params.row.siteId
                          }
                        });
                      }
                    }
                  },
                  "编辑"
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
                          loading: true,
                          onOk: () => {
                            this.$root.loading();
                            let url = this.$root.HTTP_L.HTTP_ShanChuGongGao;
                            let key = {
                              id: params.row.id,
                              siteId: params.row.siteId,
                            }
                            this.$root.HTTP_ALLLINKPOST(url,key)
                            .then(
                              res => {
                                this.$Spin.hide();
                                this.$Modal.remove();
                                this.$root.modal(
                                  "success",
                                  "",
                                  "公告删除成功！"
                                );
                                this.table.TableData.data.splice(
                                  params.index,
                                  1
                                );
                                this.table.TableData.total--;
                              },
                              res => {
                                this.$Spin.hide();
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
          }
        ],
        TableData: {},
        loading: true,
        align: "",
        posturl: this.$root.HTTP_L.HTTP_GongGaoLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      },
      ColumnsNotification: []
    };
  },
  methods: {
    ZhanDianmechange(re) {
      this.siteName = re.SiteName;
      this.NotificationSerach.siteId = re.SiteId;
    },
    SearchSubmit() {
      var SearChData = {
        like: {
          //   who: null,
          //   title: null
        },
        // in: {}
        siteId: this.NotificationSerach.siteId
      };
      for (let key in this.NotificationSerach) {
        for (let er in this.NotificationSerach[key]) {
          if (key == "like" && this.NotificationSerach[key][er] != "") {
            SearChData[key][er] = this.NotificationSerach[key][er];
          }
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(SearChData));
    },
    SearchRest() {
      this.NotificationSerach = {
        like: {
          title: "",
          who: ""
        },
        siteId: this.defaultSiteId
      };
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    handleReachBottom() {
      return new Promise(resolve => {
        this.$root.modal("info", "", "已经加载全部内容");
      });
    },
    handleCheckAll() {
      if (this.NotificationSerach.indeterminate) {
        this.NotificationSerach.checkAll = false;
      } else {
        this.NotificationSerach.checkAll = !this.NotificationSerach.checkAll;
      }
      this.NotificationSerach.indeterminate = false;
      if (this.NotificationSerach.checkAll) {
        this.NotificationSerach.leixing = this.NotificationSerach.xuanzeList.map(
          x => x.label
        );
        this.NotificationSerach.indeterminate = true;
      } else {
        this.NotificationSerach.leixing = [];
        this.NotificationSerach.indeterminate = false;
      }
    }
  }
};
</script>

<style  lang="less">
.GongGaoNeiRong {
  img {
    max-width: 100%;
    text-align: center;
  }
  table {
    th,
    td {
      padding: 5px;
      border: 1px solid #eee;
    }
  }
}
.Notification-main {
  .ivu-scroll-container {
    ::-webkit-scrollbar {
      display: none;
    }
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 3px;
    background-color: #eee;
  }

  ::-webkit-scrollbar-track {
    background-color: #eee;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
}
</style>
