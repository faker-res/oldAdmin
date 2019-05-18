<template>
  <div class="content-main agent-main">
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
                <FormItem label="彩票名称">
                  <Select v-model="DataSearch.lid" style="width:140px" @on-change="Search">
                    <Option :key="i" v-for="(cp,i) in selectList" :value="cp.id">{{cp.name}}</Option>
                  </Select>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div style="margin: 10px 0;overflow: hidden">
                    <AdminlistTable :table="table"></AdminlistTable>
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
import AdminlistTable from "@/template/my-components/iview-table/table";
export default {
  name: "TimeSetting",
  components: {
    AdminlistTable
  },
  data() {
    return {
      selectList: [],
      DataSearch: {
        sid: JSON.parse(localStorage.AllSiteNameList)[0].id,
        lid: "ALL"
      },
      table: {
        TableColumn: [
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
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "UpdateLotteryTime",
                          query: {
                            lotteryId: params.row.lotteryId,
                            name: params.row.lotteryName
                          }
                        });
                      }
                    }
                  },
                  "时间设置"
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
    Search() {
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      //更新数据
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    }
  }
};
</script>