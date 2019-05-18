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
              <i-form :model="searchParams" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="$router.push({name:'CarouselCreate',query:{siteId:searchParams.siteId}})" type="primary">新增轮播图</Button>
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
  </div>
</template>
<script>
import ViewImg from "@/template/my-components/ViewImg.vue";
import mixins from "@/mixins";
export default {
  name: "CarouselList",
  mixins: [mixins],
  components: { ViewImg },
  data() {
    return {
      siteName: "",
      searchParams: {},
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            width: 120,
            render: (h, params) => {
              return h('span',this.siteName);
            }
          },
          {
            title: "终端",
            key: "clientType",
            width: 120,
          },
          {
            title: "轮播",
            key: "body",
            minWidth: 350,
            render: (h, params) => {
              return params.row.body.map(item => {
                return h(ViewImg, {
                  props: {
                    imgSrc: item.img
                  }
                });
              });
            }
          },
          {
            title: "上线时间",
            key: "publish_at",
            width: 220,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.publish_at).format("LLL"));
            }
          },
          {
            title: "下线时间",
            key: "offline_at",
            width: 220,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.offline_at).format("LLL"));
            }
          },
          {
            title: "创建时间",
            key: "offline_at",
            width: 220,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at).format("LLL"));
            }
          },
          {
            title: "更新时间",
            key: "updated_at",
            width: 220,
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.updated_at).format("LLL"));
            }
          },
          {
            title: "操作",
            key: "",
            width: 200,
            render: (h, params) => {
              let that = this;
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "提示",
                          content: "确定删除吗？",
                          onOk() {
                            that.deleteCarousel({
                              siteId: params.row.siteId,
                              promotionId: params.row.promotionId
                            });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "CarouselCreate",
                          query: {
                            siteId: params.row.siteId,
                            promotionId: params.row.promotionId,
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
        TableData: {},
        loading: true,
        align: "center",
        Refresh: 0,
        posturl: this.$root.HTTP_L.HTTP_CarouselList,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        }
      }
    };
  },
  methods: {
    siteChange(re) {
      this.searchParams.siteId = re.SiteId;
      this.siteName = re.SiteName;
      if (this.searchParams.siteId) {
        this.Search();
      }
    },
    Search() {
      this.table.dataform = JSON.parse(JSON.stringify(this.searchParams));
    },
    deleteCarousel(params) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_DeleteCarousel, params)
        .then(res => {
          this.$Modal.success({ title: "提示", content: res.data.data });
          this.table.Refresh++;
        });
    }
  }
};
</script>
