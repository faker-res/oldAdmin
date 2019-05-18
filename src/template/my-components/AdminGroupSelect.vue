<template>
  <div>
    <Select :style="AdminGroupSelectData.style" v-if="AdminGroupSelectData.type=='单选'" v-model="DATAA.DataD.id" >
      <Option v-for="item in AdminGroupList" :value="item.id" :key="item.value">{{ item.groupName }}</Option>
    </Select>
    <Select :style="AdminGroupSelectData.style" v-else multiple v-model="DATAA.DataS.id" >
      <Option v-for="item in AdminGroupList" :value="item.id" :key="item.value">{{ item.groupName }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  props: ["AdminGroupSelectData"],
  data() {
    return {
      DATAA: {
        DataD: {
          id: null,
          groupName: ""
        },
        DataS: {
          id: [],
          groupName: []
        }
      },
      DATAA2: {
        DataD: {
          id: null,
          groupName: ""
        },
        DataS: {
          id: [],
          groupName: []
        }
      },
      AdminGroupList: []
    };
  },
  created() {
    
  },
  methods:{
     async InitData(){
      await this.$root
      .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GuanLiYuanFenZuLieBiao)
      .then(res => {
        this.AdminGroupList = res.data.data.data;
        if(!this.AdminGroupSelectData.data)
          this.DATAA.DataD.id = this.AdminGroupList[0].id;
          this.DATAA.DataS.id.push(this.AdminGroupList[0].id);
      });
     }
  },
  watch: {
    AdminGroupSelectData: {
      handler: function(val, oldVal) {
        if (val.data) {
          this.DATAA.DataD.id = val.data.id;
          this.DATAA.DataS.id = val.data.id;
        }
      },
      deep: true
    },
    DATAA: {
      handler: function(val, oldVal) {
        this.AdminGroupList.forEach((m, i) => {
          if (
            m.id == val.DataD.id &&
            this.AdminGroupSelectData.type == "单选"
          ) {
            this.DATAA2.DataD.groupName = m.groupName;
            this.DATAA2.DataD.id = m.id;
          } else if (this.AdminGroupSelectData.type == "多选") {
            val.DataS.id.forEach((mm, ii) => {
              if (mm == m.id) {
                this.DATAA2.DataS.id = val.DataS.id;
              }
            });
          }
        });
        if (this.AdminGroupSelectData.type == "单选") {
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
