<template>
    <div>
        <Cascader :data="gameClassData" v-model="gameClassValue" trigger="hover" :style="GameClassSelectData.style" @on-change='gameClassChange'></Cascader>
    </div>
</template>

<script>
export default {
  props: ["GameClassSelectData"],
  data() {
    return {
      gameClassData: [],
      gameClassValue: []
    };
  },
  methods: {
    async InitData() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiLeiXing)
        .then(res => {
          for (let key in res.data.data) {
            let obj = {};
            obj.value = key;
            switch (key) {
              case "live_casino":
                obj.label = "真人视讯";
                break;
              case "lottery":
                obj.label = "彩票游戏";
                break;
              case "slot":
                obj.label = "电子游戏";
                break;
              case "sport":
                obj.label = "体育赛事";
                break;
              case "vr_lottery":
                obj.label = "VR彩票";
                break;
              case "chess":
                obj.label = "棋牌";
                break;
              default:
                obj.label = "其他";
            }
            obj.children = [];
            res.data.data[key].forEach(item => {
              obj.children.push({
                value: item.id,
                label: item.name
              });
            });
            this.gameClassData.push(obj);
          }
        });
    },
    gameClassChange(v, selectedData) {
      if (this.GameClassSelectData.type) {
        if (this.GameClassSelectData.type === "shield") {
          this.$emit("listenOnShieldChange", v, selectedData);
        } else {
          this.$emit("listenOnAllowChange", v, selectedData);
        }
      } else {
        this.$emit("listenOnChange", v, selectedData);
      }
    }
  },
  watch: {
    GameClassSelectData: {
      handler: function(val, oldVal) {
        this.gameClassValue = val.data;
      },
      deep: true
    }
  }
};
</script>

<style>
</style>