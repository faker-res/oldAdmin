<template>
  <div style="width:100%;height:300px" ref="dangri"></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: ["CharData"],
  data() {
    return {
      dangri: null
      // CharDataP:this.CharData
    };
  },
  watch: {
    CharData: {
      handler(n, o) {
        var that = this;
        that.dangritubiao();
        // window.addEventListener("resize", function() {
        // that.visite_sunyi.resize();
        // });
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    let that = this;
    this.$nextTick(() => {
      that.dangri = echarts.init(this.$refs.dangri);
      that.dangri.clear();
      that.dangritubiao();
    });
  },
  methods: {
    dangritubiao() {
      var keys = [];
      var type = "";
      let that = this;
      for (let key in this.CharData) {
        if (this.CharData.hasOwnProperty(key)) {
          switch (key) {
            case "member":
              type = "会员注册";
              break;
            case "member_bank":
              type = "会员绑卡";
              break;
            case "agency":
              type = "代理注册";
              break;
            case "agency_bank":
              type = "代理绑卡";
              break;
            case "message":
              type = "站内信";
              break;
            case "transfer":
              type = "转账次数";
              break;
            case "report_deposit_amount":
              type = "存款金额";
              break;
            case "report_deposit_quantity":
              type = "存款笔数";
              break;
            case "report_withdrawals_amount":
              type = "提款金额";
              break;
            case "report_withdrawals_quantity":
              type = "提款笔数";
              break;
            case "report_slots_betCount":
              type = "老虎机注单数";
              break;
            case "report_slots_betAmount":
              type = "老虎机投注额";
              break;
            case "report_slots_validBetAmount":
              type = "老虎机有效投注额";
              break;
            case "report_slots_netAmount":
              type = "老虎机派彩";
              break;
            case "report_sport_betCount":
              type = "体育注单数";
              break;
            case "report_sport_betAmount":
              type = "体育投注额";
              break;
            case "report_sport_validBetAmount":
              type = "体育有效投注额";
              break;
            case "report_sport_netAmount":
              type = "体育派彩";
              break;
            case "report_lottery_betCount":
              type = "彩票注单数";
              break;
            case "report_lottery_betAmount":
              type = "彩票投注额";
              break;
            case "report_lottery_validBetAmount":
              type = "彩票有效投注额";
              break;
            case "report_lottery_netAmount":
              type = "彩票派彩";
              break;
            case "report_livecasino_betCount":
              type = "真人注单数";
              break;
            case "report_livecasino_betAmount":
              type = "真人投注额";
              break;
            case "report_livecasino_validBetAmount":
              type = "真人有效投注额";
              break;
            case "report_livecasino_netAmount":
              type = "真人派彩";
              break;
              case "report_chess_betCount":
              type = "棋牌注单数";
              break;
              case "report_chess_betAmount":
              type = "棋牌投注额";
              break;
              case "report_chess_validBetAmount":
              type = "棋牌有效投注额";
              break;
              case "report_chess_netAmount":
              type = "棋牌派彩";
              break;
          }
          keys.push(type);
        }
      }
      let value = [];
      for (let key in this.CharData) {
        value.push(this.CharData[key]);
      }
      const option = {
        color: [
          "#03A9F4",
          "#00BCD4",
          "#009688",
          "#4CAF50",
          "#8BC34A",
          "#FFEB3B",
          "#00BCD4",
          "#009688",
          "#4CAF50",
          "#8BC34A",
          "#FFEB3B",
          "#009688",
          "#4CAF50",
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // width:50,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: keys,
          triggerEvent: true
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar",
            barWidth: "50%",
            data: value,
            itemStyle: {
              normal: {
                color: function(param) {
                  var colorList = [
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                    "#4FC3F7",
                    "#0288D1",
                  ];
                  return colorList[param.dataIndex];
                }
              }
            }
          }
        ],
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {}
          },
          right: 40,
          iconStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "red" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "blue" // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        }
      };
      this.dangri.setOption(option);
    }
  }
};
</script>
<style scoped>
</style>
