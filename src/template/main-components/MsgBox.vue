<template>
  <div :style='style' class='msg-container' @click.stop='stopDefault'>
    <div class='email' @click.stop='toggleMsgBox' :class="totalCount>0?'my-animate':''" v-if='totalCount>0'>
      <Badge :count='totalCount'>
        <Icon :size='40' type='email'></Icon>
      </Badge>
    </div>
    <div class='top'>
      <div class='title'>消息盒子</div>
    </div>
    <div class='msg-wrapper'>
      <div class='sideBar'>
        <div class='menuItem' :class="{'active':menuIndex==i}" v-for='(item,i) in infoList' :key='i' @click.stop='selectChange(item.key,i)'>
          <span>{{item.title}}</span>
          <Badge :count='item.count||0' class-name='badge-red'></Badge>
        </div>
      </div>
      <div class='content scroll-bar-y'>
        <div class='my-tag' v-for='(m,i) in renderData.list' :key='i' @click='goPage(renderData.router)'>
          <div class='time'>{{m.time}}</div>
          <div class='info'>{{m.content}}</div>
          <div class='icon' @click.stop='removeMsg(m.code,renderData.name)'>
            <Icon :size='20' type='ios-close-empty'></Icon>
          </div>
        </div>
        <div class='tip' v-if='!renderData.list.length'>暂无消息！</div>
      </div>
    </div>
    <audio :src='voiceSrc' ref='audio' :autoplay='true'></audio>
    <div class='clear-all'>
      <Button type='success' @click='clearAll'>一键清除</Button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      msgCopy: {
        EmergencyFinance: [],
        Preferential: [],
        Deposit: [],
        Withdrawals: [],
      },
      infoList: [
        {
          key: 'Deposit',
          title: '入款申请'
        },
        {
          key: 'Withdrawals',
          title: '提款申请'
        },
        {
          key: 'EmergencyFinance',
          title: '催帐申请'
        },
        {
          key: 'Preferential',
          title: '优惠申请'
        }
      ],
      menuIndex: 0,
      renderData: {},
      style: {
        left: -304
      },
      totalCount: null,
      voiceSrc: null,
      viods: [
        {
          name: 'Deposit',
          src: require('../../assets/audio/backcash.mp3')
        },
        {
          name: 'Withdrawals',
          src: require('../../assets/audio/complete.wav')
        },
        {
          name: 'Preferential',
          src: require('../../assets/audio/kai-jiang.mp3')
        },
        {
          name: 'EmergencyFinance',
          src: require('../../assets/audio/short.wav')
        }
      ]
    };
  },
  computed: {
    ...mapState(['msgList', 'voiceType', 'orderCode'])
  },
  watch: {
    msgList: {
      handler(val, oldval) {
        this.msgCopy = val;
        this.getMsgCount();
      },
      deep: true,
    },
    voiceType(val, oldval) {
      if (val) this.replayVoice(val);
    }
  },
  created() {
    this.selectChange('Deposit', 0); //默认显示入款申请
  },
  methods: {
    stopDefault() {},
    goPage(router) {
      this.$router.push({ name: router });
    },
    selectChange(val, i) {
      this.menuIndex = i;
      const {
        EmergencyFinance,
        Preferential,
        Deposit,
        Withdrawals,
      } = this.msgCopy;
      let config = {
        EmergencyFinance:{
          title: '催账申请',
          router: 'EmergencyList',
          list: EmergencyFinance
        },
        Preferential:{
          title: '优惠申请',
          router: 'PreferentialReceive',
          list: Preferential
        },
        Deposit:{
          title: '入款申请',
          router: 'CompanyDepositList',
          list: Deposit
        },
        Withdrawals:{
          title: '提款申请',
          router: 'WithdrawalsList',
          list: Withdrawals
        }
      }
      this.renderData = config[val];
    },
    async replayVoice(val) {
      let target = this.viods.filter(item => val.includes(item.name))[0];
      this.voiceSrc = target.src;
    },
    toggleMsgBox() {
      this.selectChange('Deposit', 0); //默认显示入款申请
      this.style.left = 0;
      document.documentElement.onclick = e => {
        let evt = window.event || e;
        if (evt.stopPropagation()) {
          evt.stopPropagation();
          evt.preventDefault();
        } else {
          evt.cancelBubble = true;
          evt.returnValue = false;
        }
        this.style.left = '-304px';
      };
    },
    getMsgCount() {
      const {
        EmergencyFinance,
        Preferential,
        Deposit,
        Withdrawals,
      } = this.msgCopy;
      this.infoList[0].count = Deposit.length;
      this.infoList[1].count = Withdrawals.length;
      this.infoList[2].count = EmergencyFinance.length;
      this.infoList[3].count = Preferential.length;
      this.totalCount = Deposit.length+Withdrawals.length+EmergencyFinance.length+Preferential.length;
    },
    removeMsg(code, arrKey) {
      /**
       * @description 催帐申请和优惠申请通过id删除
       * @description 公司入款和会员提款通过code订单号删除
       * @description 公司入款和会员提款通过code订单号删除
       * @description 同步菜单Badge count的数量
       */
      this.infoList.forEach((item, index) => {
        if (item.key == arrKey) {
          this.infoList[index].count--;
          this.infoList[index].count <= 0 ? 0 : this.infoList[index].count;
        }
      });
      this.msgCopy[arrKey].forEach((item, index) => {
        if (item['code'] == code || item['id'] == code) {
          this.msgCopy[arrKey].splice(index, 1);
          this.totalCount--;
        }
      });
    },
    clearAll() {
      this.totalCount = 0;
      this.infoList.forEach(item => {
        item.count = 0;
      });
      let msgStore = {
        EmergencyFinance: [],
        Preferential: [],
        Deposit: [],
        Withdrawals: [],
      };
      this.msgCopy = msgStore;
      this.selectChange('Deposit', 0);
      this.$store.commit('clearMsg',msgStore);
    }
  }
};
</script>
<style lang='less' scoped>
.msg-container {
  height: 92%;
  position: fixed;
  bottom: 0;
  left: -304px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-out;
  z-index: 1000;
  border-radius: 3px;
  border-top: 3px solid #19be6b;
  .title {
    font-size: 16px;
    font-weight: bold;
    padding: 8px 0;
    background-color: #fff;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .msg-wrapper {
    width: 304px;
    height: 100%;
    min-height: 400px;
    overflow: hidden;
    clear: both;
    .sideBar {
      float: left;
      height: 100%;
      border-right: 1px solid #eee;
      .menuItem {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
        /deep/.ivu-badge {
          width: 20px;
          margin-right: 0;
          .ivu-badge-count {
            height: 15px;
          }
        }
        &:hover {
          background-color: #f5f5f5;
          color: #495060;
        }
        &.active {
          color: #19be6b;
        }
      }
    }
    .content {
      float: right;
      width: 203px;
      height: 100%;
      .tip {
        text-align: center;
        padding: 10px 0;
        font-size: 12px;
      }
      .my-tag {
        width: 203px;
        height: 65px;
        position: relative;
        margin: 0.5px 0;
        border-radius: 0;
        border-bottom: 1px solid #eee;
        background-color: #fff;
        padding: 2px 10px;
        cursor: pointer;
        &:hover {
          background-color: #fdfdfd;
        }
        .info {
          font-size: 12px;
          font-weight: bold;
        }
        .time {
          font-size: 12px;
          padding-bottom: 5px;
        }
        .icon {
          position: absolute;
          right: 10px;
          top: 0;
        }
        /deep/.ivu-icon {
          color: #999;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
  .email {
    position: absolute;
    right: -60px;
    bottom: 30px;
    cursor: pointer;
  }
  .clear-all {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    /deep/.ivu-btn {
      width: 100%;
    }
  }
  .my-animate {
    animation: my-animate 1.2s 1s linear infinite;
  }

  @keyframes my-animate {
    from {
      transform: scale3d(1, 1, 1);
    }
    10%,
    20% {
      transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }
    30%,
    50%,
    70%,
    90% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }
    40%,
    60%,
    80% {
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }
}

@media screen and(min-width:1981px) {
  .msg-container {
    height: 94%;
  }
}
@media screen and(max-width:1979px) {
  .msg-container {
    height: 92%;
  }
}
</style>

