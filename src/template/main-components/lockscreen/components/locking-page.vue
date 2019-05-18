<template>
    <div style="width: 100%;height: 100%;background: #667aa6">
        <div class="unlock-con">
            <unlock :show-unlock="showUnlock" @on-unlock="handleUnlock"></unlock>
            <Button class="log-out" type="primary" size="small" icon="log-out" @click="$root.Logout">安全退出</Button>
        </div>
    </div>
</template>
<style>
.unlock-con {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #5f7ec0;
  background-image: url('../../../../assets/imgs/login_bg.jpg');
  background-size: cover;
  background-position: center;
  position: fixed;
}
</style>

<script>
import unlock from "./unlock.vue";
import Cookies from "js-cookie";
export default {
  components: {
    unlock
  },
  data() {
    return {
      showUnlock: false
    };
  },
  methods: {
    handleUnlock() {
      let lockScreenBack = document.getElementById("lock_screen_back");
      this.showUnlock = false;
      lockScreenBack.style.zIndex = -1;
      lockScreenBack.style.boxShadow = "0 0 0 0 #667aa6 inset";
    this.$router.push({
        name: Cookies.get("last_page_name"),query:JSON.parse(Cookies.get("query")) // 解锁之后跳转到锁屏之前的页面
      });
    }
  },
  mounted() {
    this.showUnlock = true;
    if (!document.getElementById("lock_screen_back")) {
      let lockdiv = document.createElement("div");
      lockdiv.setAttribute("id", "lock_screen_back");
      lockdiv.setAttribute("class", "lock-screen-back");
      document.body.appendChild(lockdiv);
    }
    let lockScreenBack = document.getElementById("lock_screen_back");
    lockScreenBack.style.zIndex = -1;
  }
};
</script>
<style scoped>
.log-out{
  position: absolute;
  top: 0;
  right: 0;
}
</style>

