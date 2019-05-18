<template>
  <Layout class="layout">
    <Header class="" :style="{position: 'fixed',width:'100%', minWidth: '1000px',padding:'0'}">
      <div style="min-width:1350px;max-width:100%;margin:0 auto;">
        <Menu class="Menuuid" mode="horizontal" trigger='click' theme="dark" active-name="1">
          <div class="layout-logo">
            <router-link to="/" exact-active-class='active'>综合平台管理系统</router-link>
          </div>
          <!-- menuItems来自main.js 根据权限分配菜单  显示的是标题所有的管理模块-->
          <div class="layout-nav fl_l" v-if="$root.menuItems.length">
            <Dropdown trigger="click" v-for="(NavItem,index) in $root.menuItems" v-if="NavItem.show" :key="index" style="margin-right:30px">
              <a :class="{'nav_active':$route.path.includes(NavItem.name)}" href="javascript:void(0)">
                {{NavItem.name}}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list" :class="NavItem.id===33 && NavItem.showCount>=7 || NavItem.id===9 && NavItem.showCount>=7 ?'scroll-bar-y':''" :style="{height: NavItem.id===33 || NavItem.id===9 ? NavItem.showCount>=7 ? '300px' : 39*NavItem.showCount+'px' : ''}">
                <DropdownItem v-for="(NavChild,ix) in NavItem.children" :key="ix">
                  <router-link v-if="NavChild.show" :to="{ path: NavChild.path }" exact-active-class='active'>{{NavChild.name}}</router-link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div class="layout-nav fl_r">
            <!-- <small style="color: #fff;" class="timmer">{{timmer}}</small> -->
            <!-- <marquee style="width:150px;vertical-align:middle;font-size:14px;">
              <span style="color: #fff;">{{remindMessage}}</span>
            </marquee> -->
            <div class="marquee">
              <span class="text">{{remindMessage}}</span>
            </div>
            <Badge :count="siteMailCount" v-if="siteMailCountShow">
              <router-link :to="{name :'SiteMail'}">
                <Icon type="ios-email-outline" size="22" color="#fff"></Icon>
              </router-link>
            </Badge>
            <Badge :count="$root.systemLogCount" v-if="$root.systemLogCountShow">
              <router-link :to="{name :'SystemLog'}">
                <Icon type="ios-bell-outline" size="20" color="#fff"></Icon>
              </router-link>
            </Badge>
            <Dropdown trigger="click">
              <a :class="{'nav_active':$route.path.includes('UserSeting')}" href="javascript:void(0)">
                <span>{{timeStr}}
                  <b>{{$root.adminuserinfo.adminUserName}}</b>
                </span>
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="5-2">
                  <router-link :to="{name:'ChangePassword'}" exact-active-class='active'>变更密码</router-link>
                </DropdownItem>
                <DropdownItem name="5-4">
                  <router-link :to="{name:'AdminDetails',query:{adminId:$root.adminuserinfo.adminId}}" exact-active-class="active">个人信息</router-link>
                </DropdownItem>
                <DropdownItem name="5-5">
                  <a style="width:150px" href="javascript:" @click="$root.Logout">安全退出</a>
                </DropdownItem>
                <DropdownItem name="5-6">
                  <a style="width:150px" href="javascript:">
                    <lock-screen ref="lockScreen"></lock-screen>
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </div>
      <!-- 打开窗口的标题显示 -->
      <div class="children-layout">
        <div class="tags-con">
          <tags-nav :pageTagsList="pageTagsList"></tags-nav>
        </div>
      </div>
    </Header>
    <!-- 主体内容 -->
    <div class="single-page-con scroll-bar-y" id="single-page">
      <div class="single-page">
        <transition name="fade" mode="out-in">
          <!-- 缓存匹配的组件 -->
          <keep-alive :include="cachedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </div>
      <BackToTop></BackToTop>
    </div>
    <div class="bot_com">
      <div class="layout">
        © Company 2018
      </div>
    </div>
    <audio :src='voiceSrc' ref='audio' :autoplay='true'></audio>
    <!-- <Websocket /> -->
    <!-- <MsgBox /> -->
  </Layout>
</template>
<script>
import TagsNav from "./main-components/TagsNav.vue";
import lockScreen from "./main-components/lockscreen/lockscreen.vue";
// import MsgBox from "./main-components/MsgBox.vue";
import BackToTop from "./main-components/BackToTop.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
// import Websocket from "./main-components/Websocket";
import tagNames from "@/local/tagNames";

export default {
  components: {
    TagsNav,
    // MsgBox,
    lockScreen,
    // Websocket,
    BackToTop
  },
  data() {
    return {
      timeStr: "",
      navItem: [],
      childrenItem: [],
      // timmer: this.$moment().format("YYYY年MMMD日ddddAh:mm:ss")
      remindMessage: "",
      siteMailCountShow: false,
      siteMailCount: 0,
      timer: null,
      voiceSrc: null
    };
  },
  created() {
    this.$root.getLottclass(); //获取彩票分类返点
    this.$root.getColumn(); // 调用存储返点的方法
    this.$root.getSiteList(); // 获取所有的站点列表
    // this.Greetings(); //早上好，晚上好，问候语
    this.$root.getNavItems(); //获取顶部菜单列表
    this.getSystemLog(); //获取系统日志
    this.remindInterval(); //获取提示消息
    this.init(); //初始化
  },
  computed: {
    TimeC: {
      get: function() {
        return this.$store.state.lockTimeC;
      },
      set: function(newValue) {
        this.$store.commit("lockTime", newValue);
      }
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    pageTagsList() {
      const tagList = this.$store.state.app.pageOpenedList;
      tagList.forEach(item => {
        if (tagNames[item.name] && this.$route.name === "item.name") {
          if (item.query.isVerify) {
            item.meta.title = tagNames[item.name].update;
          } else {
            item.meta.title = tagNames[item.name].create;
          }
        }
      });
      return tagList; // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
  
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }   
      // vuex userinfo 信息
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);

      // 顶部时间
      this.$store.commit("setOpenedList");
      this.$root.Dtime = setInterval(() => {
        // this.timmer = this.$moment().format("YYYY年MMMD日ddddAh:mm:ss");
        this.$store.commit("lockTime", (this.TimeC = this.TimeC + 1));
        if (this.TimeC >= 3600) {
          // 计时器锁屏
          this.$refs.lockScreen.lockScreen();
          this.$store.commit("lockTime", 0);
          clearInterval(this.$root.Dtime);
        }
      }, 1000);
    },
    Greetings() {
      let now = new Date(),
        hour = now.getHours();
      if (hour < 6) {
        this.timeStr = "凌晨好,";
      } else if (hour < 9) {
        this.timeStr = "早上好,";
      } else if (hour < 12) {
        this.timeStr = "上午好,";
      } else if (hour < 14) {
        this.timeStr = "中午好,";
      } else if (hour < 17) {
        this.timeStr = "下午好,";
      } else if (hour < 19) {
        this.timeStr = "傍晚好,";
      } else if (hour < 22) {
        this.timeStr = "晚上好,";
      } else {
        this.timeStr = "夜里好,";
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    getSystemLog() {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_FuWuDuanRiZhiLieBiao, {
          isRules: "show"
        })
        .then(res => {
          this.$root.systemLogCount = res.data.data.total;
          this.$root.systemLogCountShow = true;
        })
        .catch(res => {
          this.$root.systemLogCountShow = false;
        });
    },
    getRemind() {
      let time = new Date().getTime();
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_RemindMessage, {
          time: time
        })
        .then(res => {
          let remindList = res.data;
          let remindVoiceFlag = false;
          this.remindMessage = "";
          if (remindList.length) {
            remindList.forEach(r => {
              if (r.code === "message") {
                this.siteMailCountShow = true;
                this.siteMailCount = r.count;
              } else {
                remindVoiceFlag = remindVoiceFlag ? true : r.count ? true : false;
                this.remindMessage += r.name + r.count + "条;";
                this.siteMailCountShow = false;
                this.siteMailCount = 0;
              }
              // this.siteMailCountShow = r.code === "message" ? true : false;
              // this.siteMailCount = r.code === "message" ? r.count : 0;
            });
            if (remindVoiceFlag) {
              this.voiceSrc = require("../assets/audio/backcash.mp3");
              this.$refs.audio.load();
            }else{
              this.$refs.audio.pause();
            }
          } else {
            this.siteMailCountShow = false;
          }
        })
        .catch(res => {});
    },
    remindInterval() {
      clearInterval(this.timer);
      this.timer = null;
      this.getRemind();
      this.timer = setInterval(() => {
        this.getRemind();
      }, 15000);
    }
  },
  watch: {
    $route(to) {
      this.$store.commit("setCurrentPageName", to.name);
      let pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>
<style lang="less">
@import "./main.less";

.ivu-badge {
  margin-right: 20px;

  .ivu-badge-count {
    height: 12px;
    border-radius: 5px;
    font-size: 10px;
    right: -6px;
    padding: 0;
    background: #ff6c00;
    line-height: 12px;
    top: -6px;
  }
}

#JuBuLoding {
  position: fixed;
  right: 10px;
  top: 10px;
  width: 60px;
  z-index: 1000;
}

.back-top-inner {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.single-page {
  margin-top: 120px;
  background: #fff;
  padding-left: 10px;
  padding-right: 10px;
}

.Menuuid.ivu-menu {
  font-size: 18px;
}

.layout-logo {
  margin-left: 20px;
  height: 62px;
  font-size: 22px;
  border-radius: 3px;
  float: left;
  line-height: 62px;
  text-align: center;

  a {
    color: #fff !important;
  }
}

.layout-nav {
  margin: 0 auto;
  margin-right: 20px;

  .ivu-dropdown-menu {
    .ivu-dropdown-item {
      padding: 0;
    }
  }

  .ivu-select-dropdown {
    border-radius: 0px 0px 5px 5px;
  }

  .ivu-dropdown-rel {
    a {
      color: hsla(0, 0%, 100%, 0.7);
      display: inline-block;
    }

    a:hover {
      color: #fff;
    }

    a.nav_active {
      color: #fff;
    }
  }

  .ivu-dropdown-item {
    a {
      color: #222;
      padding: 10px 12px;
      display: inline-block;
      font-size: 14px;
      width: 100%;
    }

    a.active {
      color: #2d8cf0;
    }
  }
}

.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item-selected,
.ivu-menu-horizontal
  .ivu-menu-submenu
  .ivu-select-dropdown
  .ivu-menu-item-selected:hover {
  color: #222;
  background: #fff;
}

.layout-nav.fl_l {
  margin-left: 40px;
}
.layout-nav.fl_r {
  .marquee {
    display: inline-block;
    vertical-align: middle;
    width: 300px;
    color: #fff;
    margin: 0 auto;
    overflow: hidden;
    .text {
      font-size: 14px;
      white-space: nowrap;
      position: relative;
      animation: text 5s linear infinite;
      @keyframes text {
        0% {
          left: 50%;
        }
        100% {
          left: -100%;
        }
      }
      // .text{
      //   transform: translateX(-250%);
      //   transation: 5s;
      // }
    }
  }
}
.layout-footer-center {
  text-align: center;
}

.ivu-layout-header {
  top: 0;
  z-index: 1000;
}

.time.layout {
  padding: 10px 0 0 0;
  text-align: right;

  .people {
    margin-right: 5px;

    b {
      color: #2d8cf0;
      margin: 0 3px;
    }
  }

  .t {
    min-width: 220px;
    display: inline-block;
  }

  i {
    padding: 0 3px;
  }
}

.bot_com {
  height: 40px;
  line-height: 40px;
  background: #f6f6f6;
}

.layout-nav {
  .ivu-menu-horizontal .ivu-menu-submenu .ivu-select-dropdown .ivu-menu-item {
    padding: 0;

    a {
      padding: 7px 16px;
    }
  }
}

@media screen and (max-width: 1440px) {
  // .timmer {
  //   display: none;
  // }
  .marquee {
    width: 150px !important;
  }
}
</style>