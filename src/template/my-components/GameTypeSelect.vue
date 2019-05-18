<template>
  <Cascader :data="GameClassData" v-model="GameClassVal" trigger="hover" :style="GameClassSelectConf.style" @on-change='foudClassChange'></Cascader>
</template>
<script>
export default {
  props: ["GameClassSelectConf"],
  data() {
    return {
      GameClassData: [],
      GameClassVal: []
    };
  },
  methods: {
    async InitData() {
      await this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_YouXiLeiXingXiaLaLieBiao, {
          isRules: "show"
        })
        .then(res => {
          var result = res.data.data;
          result.forEach(item => {
            let obj = {};
            obj.label = item.name;
            obj.value = item.type;
            obj.children = [];
            item.list.unshift({
              name: "全部",
              platform: "all"
            });
            item.list.forEach(citem => {
              let cobj = {};
              cobj.label = citem.name;
              cobj.value = citem.platform;
              cobj.name = citem.name;
              cobj.platform = citem.platform;
              obj.children.push(cobj);
            });
            this.GameClassData.push(obj);
          });
        });
      if (this.GameClassSelectConf.GameClassVal.length) {
        this.GameClassVal = this.GameClassSelectConf.GameClassVal;
        if (
          this.GameClassVal[1] === "CT_LOTTERY" ||
          this.GameClassVal[1] === "" ||
          this.GameClassVal[1] === "lottery"
        ) {
          this.GameClassVal[1] = "all";
        }
      } else {
        this.GameClassVal = [
          this.GameClassData[0].value,
          this.GameClassData[0].children[0].value
        ];
      }
      return this.GameClassData;
    },
    foudClassChange(v, selectedData) {
      this.$emit("listenOnChange", v);
    }
  }
};
</script>