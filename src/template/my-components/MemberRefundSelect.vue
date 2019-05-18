<template>
  <div>
    <Select :style="refundLevelNameSelectData.style" v-if="refundLevelNameSelectData.type=='单选'" v-model="DATAA.DataD.id" style="width:260px">
      <Option v-for="item in MemberRefundList" :value="item.id" :key="item.value">{{ item.levelAlias }}</Option>
    </Select>
    <Select :style="refundLevelNameSelectData.style" v-else multiple v-model="DATAA.DataS.id" style="width:260px">
      <Option v-for="item in MemberRefundList" :value="item.id" :key="item.value">{{ item.levelAlias }}</Option>
    </Select>
  </div>
</template>
<!--  -->
<script>
export default {
  props: ["refundLevelNameSelectData"],
  data() {
    return {
      DATAA: {
        DataD: {
          id: null,
          refundLevelName: ""
        },
        DataS: {
          id: [],
          refundLevelName: []
        }
      },
      DATAA2: {
        DataD: {
          id: null,
          refundLevelName: ""
        },
        DataS: {
          id: [],
          refundLevelName: []
        }
      },
      MemberRefundList: []
    };
  },
  created() {
    // this.$nextTick(()=>{
      // this.$root
      // .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanFanShuiLieBiao)
      // .then(res => {
      //   this.MemberRefundList = res.data.data.data;
      //   if (!this.refundLevelNameSelectData.hasOwnProperty('data')) {
      //     this.DATAA.DataD.id = this.MemberRefundList[0].id;
      //     this.DATAA.DataS.id.push(this.MemberRefundList[0].id);
      //   }
      //   //  this.$emit("listenOnasync", true);
      // });
    // })
  },
  methods:{
    async InitData(){
     await this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuiYuanFanShuiLieBiao)
      .then(res => {
        this.MemberRefundList = res.data.data.data;
        if (!this.refundLevelNameSelectData.hasOwnProperty('data')) {
          this.DATAA.DataD.id = this.MemberRefundList[0].id;
          this.DATAA.DataS.id.push(this.MemberRefundList[0].id);
        }
        //  this.$emit("listenOnasync", true);
      });
    }
  },
  watch: {
    refundLevelNameSelectData: {
      handler: function(val, oldVal) {
        if (this.refundLevelNameSelectData.data&&Object.values(this.refundLevelNameSelectData.data).length>0) {
          this.DATAA.DataD.id = val.data.id;
          this.DATAA.DataS.id = val.data.id;
        }
      },
      deep: true
    },
    DATAA: {
      handler: function(val, oldVal) {
        this.MemberRefundList.forEach((m, i) => {
          if (m.id == val.DataD.id && this.refundLevelNameSelectData.type == "单选") {
            this.DATAA2.DataD.refundLevelName = m.levelAlias;
            this.DATAA2.DataD.id = m.id;
          } else if (this.refundLevelNameSelectData.type == "多选") {
            val.DataS.id.forEach((mm, ii) => {
              if (mm == m.id) {
                this.DATAA2.DataS.id = val.DataS.id;
              }
            });
          }
        });
        if (this.refundLevelNameSelectData.type == "单选") {
          this.$emit("listenOnChange", this.DATAA2.DataD);
        } else {
          this.$emit("listenOnChange", this.DATAA2.DataS);
        }
      },
      deep: true
    }
  }
};
</script>

<style>

</style>
