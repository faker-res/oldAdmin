<template></template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      client: null
    };
  },
  created() {
    this.getWsUrl();
  },
  computed: { ...mapState(["logoutStatus"]) },
  watch: {
    logoutStatus(val, oldval) {
      if (val) {
        this.disconnect();
      } else {
        this.connect();
      }
    }
  },
  methods: {
    async getWsUrl() {
      await this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_V1WebSocket)
        .then(res => {
          let wsUrl = res.data.data.wss;
          this.client = Stomp.client(wsUrl);
        });
        this.connect();
    },
    onConnected(frame) {
      const topic = {
        all: "/topic/public", //广播
        group: "/group/system", //分组
        alone: "/user/system_1/message" //个人
      };
      // ---订阅频道
      this.client.subscribe(topic.group, this.responseCallback, this.onFailed);
      this.client.subscribe(topic.alone, this.responseCallback, this.onFailed);
    },
    onFailed(frame) {},
    responseCallback(frame) {
      //   ---接收消息
      this.MessageModel(frame);
    },
    connect() {
      const headers = {
        id: 1,
        group: "system"
        // 'login': MQTT_USERNAME,//用户的登录
        // 'passcode': MQTT_PASSWORD,//密码凭证
        // 'client-id': clientid
      };
      this.client.connect(
        headers,
        this.onConnected,
        this.onFailed
      );
    },
    disconnect() {
      this.client.disconnect();
    },
    MessageModel(a) {
      /**
       * EmergencyFinance 催账申请
       * Preferential 优惠申请
       * Deposit 公司入款申请
       * Withdrawals 提款申请
       */
      localStorage.removeItem("msg");
      var that = this;
      var data = JSON.parse(a.body);
      var msgid = a.headers["message-id"];
      var msgObj = {
        id: msgid,
        siteId: data.siteId,
        type: data.type,
        code: data.code,
        typeName: data.typeName,
        content: data.message,
        time: this.$moment.unix(data.time - 0).format("LLL")
      };
      let AdminInfo = JSON.parse(localStorage.getItem("AdminInfo"));
      if (AdminInfo) {
        AdminInfo.site.forEach(item => {
          //账户下的站点权限
          if (item.id === msgObj.siteId) {
            if (msgObj.type.includes("EmergencyFinance")) {
              this.$store.commit("addMsg", {
                type: "EmergencyFinance",
                data: msgObj
              });
            } else if (msgObj.type.includes("Preferential")) {
              this.$store.commit("addMsg", {
                type: "Preferential",
                data: msgObj
              });
            } else if (msgObj.type.includes("Deposit")) {
              this.$store.commit("addMsg", {
                type: "Deposit",
                data: msgObj
              });
            } else if (msgObj.type.includes("Withdrawals")) {
              this.$store.commit("addMsg", {
                type: "Withdrawals",
                data: msgObj
              });
            }
          }
        });
      }
      var title, router;
      if (data.type.includes("EmergencyFinance")) {
        title = "催账申请";
        router = { name: "EmergencyList" };
      } else if (data.type.includes("Preferential")) {
        title = "优惠申请";
        router = { name: "PreferentialReceive" };
      } else if (data.type.includes("Deposit")) {
        title = "公司入款申请";
        router = { name: "CompanyDepositList" };
      } else if (data.type.includes("Withdrawals")) {
        title = "提款申请";
        router = { name: "WithdrawalsList" };
      } else {
        title = "通知";
      }
      this.$Notice.config({
        top: 110,
        duration: 5
      });
      this.$Notice.info({
        title: title,
        render: h => {
          return h("span", [
            h("div", [
              h(
                "span",
                {
                  style: {
                    lineHeight: "25px",
                    fontSize: "13px"
                  }
                },
                data.message
              ),
              h(
                "a",
                {
                  on: {
                    click() {
                      that.$router.push(router);
                    }
                  },
                  style: {
                    marginTop: "5px",
                    display: title === "通知" ? "none" : "inline-block",
                    fontSize: "13px"
                  }
                },
                "查看"
              )
            ]),

            h(
              "small",
              {
                style: {
                  lineHeight: "25px",
                  float: "right"
                }
              },
              this.$moment.unix(data.time - 0).format("LLL")
            )
          ]);
        }
      });
    }
  }
};
</script>