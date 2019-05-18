<template>
  <div
    v-show="show"
    class="back-top-inner"
    @click="toTop"
  >
    <Icon
      type="chevron-up"
      color="#FFF"
    ></Icon>
  </div>
</template>
<script>
export default {
  data() {
    return {
      el: "",
      show: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.addListener();
    });
  },
  methods: {
    addListener() {
      this.el = document.querySelector("#single-page");
      this.el.addEventListener("scroll", () => {
        if (this.el.scrollTop >= 500) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
    toTop() {
      let base = 0.8;
      clearInterval(timer);
      this.changeMousewheel(false);
      let timer = setInterval(() => {
        let top = this.el.scrollTop;
        top *= base;
        if (top <= 0) {
          clearInterval(timer);
          top = 0;
          this.changeMousewheel(true);
        }
        this.el.scrollTop = top;
      }, 10);
    },
    changeMousewheel(flag) {
      this.el.onmousewheel = function scrollFun() {
        return flag;
      };
    }
  }
};
</script>
<style lang="less" scoped>
.back-top-inner {
  position: absolute;
  bottom: 115px;
  right: 30px;
  width: 45px;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
