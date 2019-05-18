<template>
  <div>
    <Select clearable :style="TableNameSelectData.style" v-model="DATAA.SiteDataD.table" :placeholder="TableNameSelectData.placeholder">
      <Option v-for="item in dataList" :value="item.table" :key="item.table">{{ item.name }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  props: ["TableNameSelectData"],
  data() {
    return {
      DATAA: {
        SiteDataD: {
          name: "",
          table: ""
        }
      },
      DATAA2: {
        SiteDataD: {
          name: "",
          table: ""
        }
      },
      dataList: [],
      List: [],
      table: ""
    };
  },
  methods: {
    async InitData() {
      this.DATAA = {
        SiteDataD: {
          name: "",
          table: ""
        }
      };
      this.DATAA2 = {
        SiteDataD: {
          name: "",
          table: ""
        }
      };
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuShuJuKuBiaoMing, {
          tableName: this.TableNameSelectData.type
        })
        .then(res => {
          this.dataList = Object.values(res.data.data);
        });
    }
  },
  watch: {
    DATAA: {
      handler: function(val, oldVal) {
        if (val.SiteDataD.table) {
          this.dataList.forEach((m, i) => {
            if (m.table == val.SiteDataD.table) {
              this.DATAA2.SiteDataD.table = m.table;
              this.DATAA2.SiteDataD.name = m.name;
            }
          });
        } else {
          this.DATAA2.SiteDataD = {
            table: "",
            name: ""
          };
        }
        this.$emit("listenOnChange", this.DATAA2.SiteDataD);
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
