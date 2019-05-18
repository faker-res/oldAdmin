<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <Button
          type="info"
          class="back-button"
          @click="$root.go_back"
        >返回上一页</Button>
        <div class="c_right">
          <i-col
            class="c_search_result"
            span="24"
          >
            <div style="margin: 10px 0;overflow: hidden">
              <ThirdGameReportsDetailTable :table="table"></ThirdGameReportsDetailTable>
            </div>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ThirdGameReportsDetailTable from "@/template/my-components/iview-table/table";
export default {
  name: "ThirdGameReportsDetail",
  components: {
    ThirdGameReportsDetailTable
  },
  data() {
    return {
      table: {
        TableColumn: [
          {
            title: "账号",
            key: "userName",
            render: (h, params) => {
              return h("span", params.row.userName || params.row.platformName);
              // return h("div", [
              //     h("span", {
              //             style: {
              //                 display: params.row.userName ? "none" : "block"
              //             }
              //         },
              //         params.row.platformName
              //     ),
              //     h("a", {
              //             style: {
              //                 display: params.row.userName ? "block" : "none"
              //             },
              //             on: {
              //                 click: () => {
              //                     this.$router.push({
              //                         name: "GamesRecords",
              //                         query: {
              //                             userName: params.row.userName,
              //                             timeStart: this.$route.query.timeStart,
              //                             timeEnd: this.$route.query.timeEnd,
              //                             type: "CT_LOTTERY",
              //                             platform: params.row.platform
              //                         }
              //                     })
              //                 }
              //             }
              //         },
              //         params.row.userName
              //     )
              // ])
            }
          },
          {
            title: "游戏平台",
            key: "platformName",
            render: (h, params) => {
              return h(
                "span",
                params.row.platformName === "统计"
                  ? "-"
                  : params.row.platformName
              );
            }
          },
          {
            title: "投注金额",
            key: "betAmount"
          },
          {
            title: "有效投注",
            key: "validBetAmount"
          },
          {
            title: "会员输赢",
            key: "netAmount"
          },
          {
            title: "单量",
            key: "betCount"
          },
          {
            title: "赢率",
            key: "winRate",
            render: (h, params) => {
              return h("span", params.row.winRate + "%");
            }
          }
        ],
        TableData: {},
        loading: true,
        flag: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_Detail_ThirdGameReports,
        Refresh: 0,
        dataform: {}
      }
    };
  },
  created() {},
  methods: {
    search() {
      let dataSend = {
        isRules: "select",
        timeStart: this.$route.query.timeStart,
        timeEnd: this.$route.query.timeEnd,
        timeType: this.$route.query.timeType,
        platform: this.$route.query.platform,
        siteId: this.$route.query.siteId,
        userName: this.$route.query.userName
      };
      for (let key in dataSend) {
        if (
          dataSend[key] == null ||
          dataSend[key] == "" ||
          dataSend[key] == undefined
        ) {
          delete dataSend[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(dataSend));
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.search();
    });
  }
};
</script>
<style lang="less" scoped>
.back-button {
  margin-bottom: 10px;
}
</style>