<template>
  <div class="rebate-select">
    <div v-if="!contents.length">
      <Alert type="error" style="width:50%">请先输入所属代理账号！</Alert>
    </div>
    <Layout v-else>
      <Sider>
        <div class="menu-wrapper">
          <div class="menu" :class="{'active':menuIndex==i}" v-for="(menu,i) in menuItems" :key="i" @click="onselectLott(menu,i)">
            <Icon type="document-text"></Icon>
            <span>{{menu}}</span>
          </div>
        </div>
      </Sider>
      <Content>
        <div v-for="(con,p_i) in contents" :key="p_i" v-show="con.name==showContent">
          <div class="btns">
            <span>统一设置：</span>
            <Select style="width:120px" v-model="con.batchRebate" @on-change="batchSetRebate(con.batchRebate,p_i)" placeholder="请选择">
              <Option v-for="(item,b_i) in rebateDefault" :key="b_i" :value="item">{{item}}%</Option>
            </Select>
          </div>
          <div class="btns">
            <span>批量设置：</span>
            <Button type="error" icon="minus-round" @click="reduceRebate(p_i)" size="small"></Button>
            <Button type="info" icon="plus-round" @click="addRebate(p_i)" size="small"></Button>
          </div>
          <div v-for="(lott,l_i) in con.list" :key="l_i" class="item-wrapper">
            <div class="label">{{lott.name}}：</div>
            <div>
              <Select v-model="lott.rebate" placeholder="请选择" style="width:120px" @on-change="selectSingleRabate">
                <Option v-for="(op,s_i) in lott.options" :key="s_i" :value="op">{{op}}%</Option>
              </Select>
              <span class="tip" v-if="rebateConfig.limit">上限：{{lott.maxRebate||"3.0"}}%</span>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  </div>
</template>
<script>
/**
 * props[rebateConfig]
 * id => 上级id/站点id
 * type => member(会员/代理/代理域名)/site(站点)
 * data => {},会员/代理编辑的时候传过来的自己的返点数据
 */
import rebateDefault from '@/local/rebateDefault'
export default {
  props: ["rebateConfig"],
  data() {
    return {
      rebateDefault: rebateDefault,
      menuItems: [],
      showContent: "六合彩",
      contents: [],
      menuIndex: 0
    };
  },
  created() {
    // watch函数没有触发，创建站点页面,需要自请求数据渲染
    if (!this.$route.query.isVerify && this.rebateConfig.type == "site") {
      this.fetchData();
    }
  },
  watch: {
    // rebateConfig: {
    //   handler(val, oldVal) {
    //     // debugger
    //     this.fetchData();
    //   },
    //   deep: true
    // }
  },
  methods: {
    batchSetRebate(batchRebate,index) {
      this.contents[index].list.forEach(child => {
        let re = +batchRebate;
        if (this.rebateConfig.type != "site") {
          re = re >= +child.maxRebate ? +child.maxRebate : re;
        }
        this.$set(child, "rebate", re.toFixed(1));
      })
      this.createData();
    },
    reduceRebate(index) {
      this.contents[index].list.forEach(child => {
        let re = +child.rebate - 0.1;
        re = re <= 0 ? 0 : re;
        this.$set(child, "rebate", re.toFixed(1));
      })
      this.createData();
    },
    addRebate(index) {
       // 超出上级返点显示自己的返点
      this.contents[index].list.forEach(child => {
        let re = +child.rebate + 0.1;
        re = re >= +child.maxRebate ? +child.maxRebate : re;
        this.$set(child, "rebate", re.toFixed(1));
      })
      this.createData();
    },
    onselectLott(name, index) {
      this.menuIndex = index;
      this.showContent = name;
    },
    fetchData() {
      // console.log("fetch")
      /**数据组装，渲染页面
       * 代理/会员/域名/站点，创建的时候默认提交返点1.5
       * 代理/会员/域名修改页面,需要设置上级返点为上限值，站点的上限制默认为3
       */
      let params;
      const { id, type, data, siteId } = this.rebateConfig;
      if (id) {
        params = { type, id, siteId };
      } else {
        params = { type };
      }
      const url = this.$root.HTTP_L.HTTP_Get_Lottclass;
      this.$root.HTTP_ALLLINKGET(url, params)
      .then(res => {
        this.menuItems = Object.keys(res.data.data);
        let arr = [];
        for (let key in res.data.data) {
          let obj = {};
          obj.name = key;
          res.data.data[key].forEach(item => {
            if (this.$route.query.isVerify && data) {
              for (let _key in data) {
                if (_key == item.id) {
                  if (this.rebateConfig.limit) {
                    item.maxRebate = (+item.rebate).toFixed(1); // 上级返点设为max
                  }else {
                    item.maxRebate = this.rebateDefault[this.rebateDefault.length-1];
                  }
                  item.rebate = (+data[_key]).toFixed(1); // 父组件传来的设为当前显示值
                }
              }
            } else {
              if (this.rebateConfig.limit) {
                item.maxRebate = (+item.rebate).toFixed(1);
              }else {
                item.maxRebate = this.rebateDefault[this.rebateDefault.length-1];
              }
              item.rebate = "1.5"; // 默认设置为1.5
              if(item.rebate > item.maxRebate ) item.rebate = item.maxRebate
            }
            item.options = this.createOptions(+item.maxRebate || this.rebateDefault[this.rebateDefault.length-1]);
          });
          obj.list = res.data.data[key];
          arr.push(obj);
        }
        this.contents = arr;
        this.createData();
      });
    },
    createOptions(max) {
      let arr = [];
      for (let i = 0; i < max; i++) {
        for (let j = 0; j <= 10; j++) {
          let step = j * 0.1;
          if (i + step <= max) {
            arr.push((i + step).toFixed(1));
          }
        }
      }
      return arr;
    },
    selectSingleRabate() {
      this.createData();
    },
    createData() {
      // 数据组装，提交事件 "{"1":"0.9","2":"0.8"}"
      let data = {};
      this.contents.forEach(parent => {
        parent.list.forEach(child => {
          data[child.id] = child.rebate;
        });
      });
      this.$emit("listenRebateChange", data);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-layout {
  background: #fff;
}
/deep/.ivu-layout-content {
  padding: 0 50px;
}
/deep/.ivu-btn {
  margin: 0 10px;
}
/deep/.ivu-layout-sider {
  background: #fff;
}
.btns {
  padding: 0 29px 15px;
}
.menu-wrapper {
  .borderR(@w,@c) {
    display: block;
    content: "";
    width: @w;
    height: 100%;
    background: @c;
    position: absolute;
    right: -1px;
    top: 0;
  }
  &::after {
    .borderR(1px, #eee);
  }
  .menu {
    cursor: pointer;
    height: 60px;
    line-height: 60px;
    text-indent: 30px;
    position: relative;
    &.active {
      color: #2d8cf0;
    }
    &.active::after {
      .borderR(2px, #2d8cf0);
    }
    &:hover {
      background: #eee;
    }
  }
}
.item-wrapper {
  display: flex;
  .label {
    width: 108px;
    padding-right: 10px;
    text-align: right;
    font-size: 14px;
    padding: 5px 0;
    margin-right: 5px;
  }
  .tip {
    font-size: 10px;
    color: #ed3f14;
  }
}
</style>

