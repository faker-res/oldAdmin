<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="DataSearch" inline>
                <FormItem label="站点">
                  <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
                </FormItem>
                <FormItem label="彩票名称">
                  <Select v-model="DataSearch.lid" style="width:140px">
                    <Option :key="i" v-for="(cp,i) in selectList" :value="cp.id">{{cp.name}}</Option>
                  </Select>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                  <Button @click="clean" type="error">清除彩票玩法赔率缓存</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
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
  </div>
</template>

<script>
import mixins from "@/mixins";
export default {
  name: "OddSetting",
  mixins: [mixins],
  data() {
    return {
      selectList: [],
      DataSearch: {
        sid: "",
        lid: "ALL"
      },
      table: {
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
          },
          {
            title: "彩票名称",
            key: "lotteryName",
          },
          {
            title: "操作",
            key: "",
            render: (h, params) => {
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
                          name: "UpdateLotteryOdds",
                          query: {
                            sid: params.row.siteId,
                            lid: params.row.lotteryId,
                            id: params.row.id,
                            name: params.row.lotteryName
                          }
                        });
                      }
                    }
                  },
                  "赔率设置"
                )
              ]);
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_CaiPiaoYouXiLieBiao,
        Refresh: 0,
        dataform: {
          sid: JSON.parse(localStorage.AllSiteNameList)[0].id,
          lid: "ALL"
        }
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getLottClass();
    });
  },
  methods: {
    getLottClass() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_CaiPiaoYouXiXiaLa)
        .then(res => {
          res.data.data.map(item => {
            if (item.name == "彩票游戏") {
              this.selectList = item["list"];
              this.selectList.unshift({
                id: "ALL",
                name: "全部",
                platform: "全部"
              });
            }
          });
        });
    },
    siteChange(re) {
      if (re.SiteId) {
        this.DataSearch.sid = re.SiteId;
      }
    },
    Search() {
      let params = { ...this.DataSearch };
      this.table.dataform = params;
    },
    SearchRest() {
      this.DataSearch = {
        sid: this.defaultSiteId,
        lid: "ALL"
      };
      this.$refs.SiteNameSelect.InitData();
      this.Search();
    },
    clean(){
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Clean_LotteryRedis)
        .then(res => {
          this.$Modal.success({
            title: "提示",
            content: `${res.data.data}`
          });
        });
    }
  }
};
</script>