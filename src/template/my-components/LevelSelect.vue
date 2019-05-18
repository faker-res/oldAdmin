<template>
  <div>
    <div v-if="levelList.length>0">
      <div v-if="LevelSelectConf.type=='单选'">
        <Select 
        v-if="LevelSelectConf.isLevelById" clearable 
        :disabled="LevelSelectConf.disabled" 
        :style="LevelSelectConf.style" 
        :placeholder="LevelSelectConf.placeholder" 
        v-model="singleData.levelByIdData.levelLabel">
          <Option v-for="(item, i) in levelList" :key="i" :value="item.levelLabel">{{item.levelAlias}}</Option>
        </Select>
        <Select 
        v-else clearable 
        :disabled="LevelSelectConf.disabled" 
        :style="LevelSelectConf.style" 
        :placeholder="LevelSelectConf.placeholder" 
        v-model="singleData.commonLevelData.levelLabel">
          <Option v-for="(item, i) in levelList" :key="i" :value="item.id">{{item.levelName}}</Option>
        </Select>
      </div>
      <div v-else>
        <Select 
        v-if="LevelSelectConf.isLevelById"
        clearable multiple
        :disabled="LevelSelectConf.disabled" 
        :style="LevelSelectConf.style" 
        :placeholder="LevelSelectConf.placeholder" 
        v-model="multipleData.levelByIdData.levelLabel">
          <Option v-for="(item, i) in levelList" :key="i" :value="item.levelLabel">{{item.levelAlias}}</Option>
        </Select>
        <Select 
        v-else 
        clearable multiple
        :disabled="LevelSelectConf.disabled" 
        :style="LevelSelectConf.style" 
        :placeholder="LevelSelectConf.placeholder" 
        v-model="multipleData.commonLevelData.levelLabel">
          <Option v-for="(item, i) in levelList" :key="i" :value="item.id">{{item.levelName}}</Option>
        </Select>
      </div>
    </div>
    <div v-else :style="LevelSelectConf.style">
        <span style="font-size:10px;color:red;">请先
          <router-link :to="{name:targetLevelRouter}">添加等级!</router-link>
        </span>
    </div>
  </div>
</template>
<script>
/**
 * props[LevelSelectConf]
 * isLevelById => 是否调用了根据站点查询等级的接口
 * placeholder => placeholder
 * style => { width: "260px" }
 * type => 单选/多选
 * initDefault => 初始化设置默认值，如创建会员 $set
 * model => MemberLevelModel/AgencyLevelModel/MemberRefundLevelModel/CommonLevelCreate
 */
export default {
  props: ["LevelSelectConf"],
  data() {
    return {
      singleData: {
        levelByIdData: {
          levelLabel: "",
        },
        commonLevelData: {
          levelLabel: "",
        },
      },
      multipleData: {
        levelByIdData: {
          levelLabel: [],
        },
        commonLevelData: {
          levelLabel: [],
        },
      },
      levelList: []
    };
  },
  computed: {
    targetLevelRouter() {
      switch (this.LevelSelectConf.model) {
        case "MemberLevelModel":
          return "MemberLevel";
          break;
        case "AgencyLevelModel":
          return "AgentLevel";
          break;
        default:
          return "CommonLevelCreate";
          break;
      }
    }
  },
  watch: {
    singleData: {
      handler(val, oldVal) {
        this.singleChange(val);
      },
      deep: true
    },
    multipleData: {
      handler(val, oldVal) {
        this.multipleChange(val);
      },
      deep: true
    }
  },
  methods: {
   async setDefaultLevel(levelLabel,levelName,levelAlias) {
      // 如果跳转页面需要同步等级可以异步调用这个方法
      if (this.LevelSelectConf.type=="单选") {
        if(this.LevelSelectConf.isLevelById){
          this.singleData.levelByIdData.levelLabel = levelLabel;
          this.singleData.levelByIdData.levelName = levelName;
          this.singleData.levelByIdData.levelAlias = levelAlias;
        }else{
          this.singleData.commonLevelData.levelLabel = levelLabel;
          this.singleData.commonLevelData.levelName = levelName;
        }
      } else {
        if(this.LevelSelectConf.isLevelById){
          this.multipleData.levelByIdData.levelLabel = levelLabel;
        }else{
          this.multipleData.commonLevelData.levelLabel = levelLabel;
        }
      }
    },
    async init() {
      //初始化设置默认值
      if (this.LevelSelectConf.type == "单选") {
        if (this.LevelSelectConf.isLevelById) {
          this.singleData.levelByIdData.levelLabel = this.levelList[0].levelLabel;
        } else {
          this.singleData.commonLevelData.levelLabel = this.levelList[0].id;
        }
      }
    },
    singleChange(val) {
      let data = { ...this.singleData };
      if(this.LevelSelectConf.isLevelById){
        this.levelList.forEach(le => {
          if (val.levelByIdData.levelLabel == le.levelLabel) {
            data.levelByIdData.levelAlias = le.levelAlias;
            data.levelByIdData.levelName = le.levelName;
          }
        });
        this.$emit("listenLevelChange", data.levelByIdData);
      }else{
        this.levelList.forEach(le => {
          if (val.commonLevelData.levelLabel == le.id) {
            data.commonLevelData.levelName = le.levelName;
          }
        });
        this.$emit("listenLevelChange", data.commonLevelData);
      }
    },
    multipleChange(val) {
      let data = { ...this.multipleData };
      if(this.LevelSelectConf.isLevelById){
        data.levelByIdData.levelAlias = [];
        data.levelByIdData.levelName = [];
        this.levelList.forEach(le => {
          data.levelByIdData.levelLabel && data.levelByIdData.levelLabel.forEach(dle => {
            if (dle == le.levelLabel) {
              data.levelByIdData.levelAlias.push(le.levelAlias)
              data.levelByIdData.levelName.push(le.levelName)
            }
          })
        });
        this.$emit("listenLevelChange", data.levelByIdData);
      }else{
        data.commonLevelData.levelName = [];
        this.levelList.forEach(le => {
          data.commonLevelData.levelLabel && data.commonLevelData.levelLabel.forEach(dle => {
            if (dle == le.levelLabel) {
              data.commonLevelData.levelName.push(le.levelName)
            }
          })
        });
        this.$emit("listenLevelChange", data.commonLevelData);
      }
    },
    async getLevelById(id, type) {
      let params = {
        siteId: [id],
        type: type
      };
      await this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_SiteIdHuoQuGongGongDengJi,
          params
        )
        .then(res => {
          if (res.data.data[id]) {
            this.levelList = res.data.data[id];
            if( this.LevelSelectConf.initDefault ){
              this.init();
            }
          } else {
            this.levelList = [];
          }
        });
    },
    async getCommonLevel() {
     await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_HuoQuGongGongDengJi)
        .then(res => {
          if (res.data.data.length) {
            this.levelList = res.data.data;
          } else {
            this.levelList = [];
          }
        });
    }
  }
};
</script>
