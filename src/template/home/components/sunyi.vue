<template>
    <div style="width:100%;height:300px" :id="tid" class="visite_sunyi"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "visite_sunyi",
  props: ["showshuzi", "CharData",'tid'],
  data() {
    return {
      visite_sunyi:null,
      CharDataP: this.CharData,
      showdata: this.showshuzi,
      Btid:this.tid,
      CharTable:{
          visite_sunyi: {},
          visite_touzhudanliang:{},
      }
    };
  },
  watch: {
    showshuzi: {
      handler(newValue, oldValue) {
        this.showdata = newValue;
        this.tubiao(this.CharDataP);
      }
    },
    CharData:{
      handler(n,o){
        var that = this;
        that.tubiao(that.CharDataP);
        // window.addEventListener("resize", function() {
          // that.visite_sunyi.resize();
        // });
      },
      deep:true
    }
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      that.visite_sunyi = echarts.init(
        document.getElementById(that.Btid)
      );
      that.tubiao(that.CharDataP);
      that.visite_sunyi.on("click", function(params) {
        switch (that.CharData.title.text){
          case '新增代理':
          that.$router.push({name:'AgentSearch'});
          break;
          case '新增会员':
          that.$router.push({name:'Member'});
        }
        // console.log(that.CharData.title.text)
        // params.name?that.$Message.success(params.name):that.$Message.success(params.value);
      });
      window.addEventListener("resize", function() {
        that.visite_sunyi.resize();
      });
    });
  },
  methods: {
    tubiao(CharDataP) {
      let that = this;
      const option = {
        title: CharDataP.title,
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
          data: CharDataP.RiQi,
          nameTextStyle: {
            color: CharDataP.color
          },
          triggerEvent:true,
          axisLabel:{  
            interval:0, 
             formatter: function (value, index) {
              return value.substr(value.indexOf('-')+1)
             }
          },
        },
        yAxis: {
          type: "value",
          name: CharDataP.name,
          boundaryGap: [0, 0.01]
        },
        series: [
          {
            name: CharDataP.name,
            type: "bar",
            barWidth: "60%",
            data: (function() {
              var res = [];
              var len = CharDataP.dataShuJu.length;
              for(let i = 0;i<len;i++){
                 res.push({
                  value: CharDataP.dataShuJu[i],
                  itemStyle: { normal: { color: CharDataP.color } },
                  label: {
                    normal: {
                      show: that.showdata,
                      position: "top"
                    }
                  }
                });
              }
              return res;
            })(),
          }
        ]
      };
      that.visite_sunyi.setOption(option);
    }
  },
};
</script>
<style scoped>
#visite_volume_con {
}
</style>
