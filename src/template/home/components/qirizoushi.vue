<template>
    <div style="width:100%;height:300px"  ref="qiri">
    </div>
    
</template>
<script>
import echarts from "echarts";
export default {
  props: ["qirizoushi", "showshuzi"],
  data() {
    return {
      qiri: null,
      showdata: this.showshuzi,
      dataList: {}
      // CharDataP:this.CharData
    };
  },
  watch: {
    qirizoushi: { 
      handler(n, o) {
        var that = this;
        this.dataList["x"]=this.qirizoushi.days;
        this.dataList["y"]={};
        this.dataList["name"]={};
        for(let key in this.qirizoushi){
            if(key != "days"){
              this.dataList["y"][key]=this.qirizoushi[key]
              this.dataList["name"][key]=key
          }
        }
        this.qiri.clear();
        this.qiritubiao();
        window.addEventListener("resize", function() {
        that.qiri.resize();
        });
      },
      deep: true
    }
  },
  created() {
    
  },
  beforeCreate(){
    
  },
  mounted() {
    let that = this;
    this.$nextTick(() => {
      that.qiri = echarts.init(this.$refs.qiri);
    });
  },
  methods: {
    qiritubiao() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {data:[]},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // width:50,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: this.dataList.x,
          boundaryGap: false
        },
        yAxis: {
          type: "value",
          // name: CharDataP.name,
          boundaryGap: [0, 0.01]
        },
        series: [
        ]
      };
      let DataColor = ['#58D68D','#58D6CC','#58A1D6','#5862D6','#8D58D6','#CC58D6','#EA3D22']
      // console.log(this.dataList);
      for (let i in this.dataList.y) {
        let obj = {};
        obj.data=this.dataList.y[i]
          switch(i){
            case "agency":
              i="代理注册人数"
              break;
            case "member":
              i="会员注册人数"
              break;
            case "report_deposit:amount":
              i="存款金额"
              break;
            case "report_deposit:person":
              i="存款人数"
              break;
            case "report_deposit:quantity":
              i="存款笔数"
              break;
            case "report_withdrawals:amount":
              i="取款金额"
              break;
            case "report_withdrawals:person":
              i="取款人数"
              break;
            case "report_withdrawals:quantity":
              i="取款笔数"
          }
        obj.name=i
        obj.type="line";
        obj.smooth=true;
        obj.itemStyle={};
        obj.itemStyle.normal = {color:DataColor[option.series.length]}
        option.series.push(obj);
        option.legend.data.push(i);
      }
      that.qiri.setOption(option);
    }
  }
};
</script>
<style scoped>

</style>
