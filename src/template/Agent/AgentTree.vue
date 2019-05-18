<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <div class="blockquote">
                    <div style="width:100%;height:600px;" id="my-echart"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "AgentTree",
  data() {
    return {
      AgentTree: null
    };
  },
  mounted() {
    this.fetchData().then(() => {
      var myChart = echarts.init(document.getElementById("my-echart"), "light");
      // 指定图表的配置项和数据
      var data = {};
      data.name = this.$route.query.userName;
      data.children = this.AgentTree;
      var option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove"
        },
        legend: {
          top: "2%",
          left: "3%",
          orient: "vertical",
          data: [
            {
              name: "代理树",
              icon: "rectangle"
            }
          ],
          borderColor: "#c23531"
        },
        series: [
          {
            type: "tree",

            name: "代理树",

            data: [data],

            top: "5%",
            left: "7%",
            bottom: "2%",
            right: "60%",

            // orient: 'vertical',//垂直
            symbolSize: 7,

            label: {
              normal: {
                position: "left",
                verticalAlign: "middle",
                align: "right"
              }
            },

            leaves: {
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left"
                }
              }
            },

            expandAndCollapse: true,

            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });
  },
  methods: {
    async fetchData() {
      const { uid, siteId } = this.$route.query;
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Get_AgencyTree, {
          siteId,
          uid
        })
        .then(res => {
          this.AgentTree = res.data.data;
        });
    }
  }
};
</script>
