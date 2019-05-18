<style lang="less" scoped>
@import "./tags-nav.less";
</style>

<template>
  <div class="tags-nav">
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <draggable :options="{animation:100,ghostClass: 'ghost'}" :no-transition-on-drag="true">
          <transition-group name="taglist-moving-animation">
            <Tag type="dot" v-for="(item,i) in pageTagsList" ref="tagsPageOpened" :key="i+1" :name="item.name" @on-close="closePage" @click.native="linkTo(item)" :closable="item.title!='首页'?true:false" :color="item.children?(item.children[0].name===currentPageName?'':'default'):(item.name===currentPageName?'default':'default')" :class="item.children?(item.children[0].name===currentPageName?'':'default'):(item.name===currentPageName?'active':'default')">{{ itemTitle(item) }}</Tag>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="close-con">
      <Dropdown transfer @on-click="handleTagsOption" style="width:30px">
        <Button size="small" type="text">
          <Icon :size="18" type="ios-close-outline" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="clearAll">关闭所有</DropdownItem>
          <DropdownItem name="clearOthers">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="btn-con left-btn">
      <Button type="text" @click="handleScroll(240)">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text" @click="handleScroll(-240)">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "TagNav",
  components: {
    draggable
  },
  data() {
    return {
      currentPageName: this.$route.name,
      tagBodyLeft: 0,
      refsTag: [],
      tagsCount: 1,
    };
  },
  props: {
    pageTagsList: Array,
    beforePush: {
      type: Function,
      default: item => {
        return true;
      }
    }
  },
  computed: {
    title() {
      return this.$store.state.app.currentTitle;
    },
    tagsList() {
      return this.$store.state.app.pageOpenedList;
    }
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addVisitedViews", route);
    },
    itemTitle(item) {
      if (typeof item.title === "object") {
        return this.$t(item.title.i18n);
      }
      return item.meta.title;
    },
    closePage(event, name) {
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPageName === name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].name === name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
      }
      this.$store.commit("removeTag", name);
      this.$store.commit("closePage", name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj);
      }
      this.$store.dispatch("delVisitedViews", lastPageObj).then(views => {});
    },
    linkTo(item) {
      let routerObj = {};
      routerObj.name = item.name;
      if (item.argu) {
        routerObj.params = item.argu;
      }
      if (item.query) {
        routerObj.query = item.query;
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj);
      }
    },
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(offset) {
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset);
      } else {
        if (
          this.$refs.scrollOuter.offsetWidth < this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollOuter.offsetWidth
            )
          ) {
            this.tagBodyLeft = this.tagBodyLeft;
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              this.$refs.scrollOuter.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                30
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
    },
    handleTagsOption(type) {
      if (type === "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          name: "home_index"
        });
      } else {
        this.$store.commit("clearOtherTags", this);
      }
      this.tagBodyLeft = 0;
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.scrollOuter.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollOuter.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          // (this.$refs.scrollOuter.offsetWidth - 100 - tag.offsetWidth) +
          // 20
          // (this.$refs.scrollOuter.offsetWidth - 55 - tag.offsetWidth)
          (this.$refs.scrollOuter.offsetWidth - tag.offsetWidth)
        );
      }
    }
  },
  mounted() {
    this.addViewTags();
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length;
  },
  watch: {
    $route(to) {
      this.addViewTags();
      this.currentPageName = to.name;
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
      this.tagsCount = this.tagsList.length;
    }
  }
};
</script>

