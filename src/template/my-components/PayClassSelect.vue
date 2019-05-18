<template>
  <div>
    <Select :style="PayClassSelectData.style" v-if="PayClassSelectData.type == '单选'" v-model="DATAA.SiteDataD.id" :placeholder="PayClassSelectData.placeholder">
      <Option v-for="item in dataList" :value="item.id" :key="item.id">{{ item.className }}</Option>
    </Select>
    <Select :style="PayClassSelectData.style" v-else multiple v-model="DATAA.SiteDataS.id">
      <Option v-for="item in dataList"  :value="item.id" :key="item.id">{{ item.className }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  props: ["PayClassSelectData"],
  data() {
    return {
      DATAA: {
        SiteDataD: {
          id: "",
          className: ""
        },
        SiteDataS: {
          id: [],
          className: []
        }
      },

      DATAA2: {
        SiteDataD: {
          id: "",
          className: ""
        },
        SiteDataS: {
          id: [],
          className: []
        }
      },
      dataList: []
    }
  },
  created() {
    // this.InitData();
  },
  methods: {
    async InitData() {
      let data = {}
      if(this.PayClassSelectData.status){
        data = {classType:this.PayClassSelectData.classType,classStatus:"yes"}
      }else{
        data = {classType:this.PayClassSelectData.classType}
      }
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiaLaLieBiao,data)
        .then(res => {
          this.dataList = res.data.data;
          if(this.PayClassSelectData.flag){
            this.dataList.unshift(
              {
                id:0,
                className:"全部"
              }
            )
          }
          if(this.PayClassSelectData.default){
            this.DATAA.SiteDataD.id = this.dataList[0].id
            this.dataList.forEach(item => {
              this.DATAA.SiteDataS.id.push(item.id)
              this.DATAA.SiteDataS.className.push(item.className)
            })
          }
          // console.log(this.dataList)
        });
    }
  },
  watch: {
    PayClassSelectData: {
      handler: function(val, oldVal) {
        if (val.data) {
          //编辑状态
          this.DATAA.SiteDataD.id = val.data.id - 0;
          this.DATAA.SiteDataS.id = val.data.id;
        } 
        // else {
        //   if(this.dataList.length){
        //     this.DATAA.SiteDataD.id = this.dataList[0].id - 0;
        //   }else{
        //     this.DATAA.SiteDataD.id = null;
        //     this.DATAA.SiteDataS.id = [];
        //   }
        // }
      },
      deep: true
    },
    DATAA: {
      handler: function(val, oldVal) {
        this.DATAA2.SiteDataS.id = [];
        this.DATAA2.SiteDataS.className = [];
        // if(val.SiteDataD.id){
        this.dataList.forEach((m, i) => {
          if (m.id - 0 == val.SiteDataD.id && this.PayClassSelectData.type == "单选") {
            this.DATAA2.SiteDataD.id = m.id;
            this.DATAA2.SiteDataD.className = m.className;
          }else if(this.PayClassSelectData.type == "多选"){
            val.SiteDataS.id.forEach((mm, ii) => {
              if (mm == m.id - 0) {
                this.DATAA2.SiteDataS.id.push(mm);
                this.DATAA2.SiteDataS.className.push(m.className);
              }
            });
          }
        });
        // }
        if (this.PayClassSelectData.type == "单选") {
          this.$emit("listenOnChange", this.DATAA2.SiteDataD);
        } else {
          this.$emit("listenOnChange", this.DATAA2.SiteDataS);
        }
        // this.$emit("listenOnChange", this.DATAA2.SiteDataD);

      },
      deep: true
    }
  }
};
</script>

<style>
</style>
