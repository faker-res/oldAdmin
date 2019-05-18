<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
        </div>
      </div>
      <div style="margin: 10px 0;overflow: hidden">
        <LotteryTable :table="table"></LotteryTable>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
        </div>
      </div>
    </div>
    <Modal
      class-name="vertical-center-modal"
      v-model="updateOpenDataModal"
      :mask-closable="false"
      width="550px"
      title="修改开奖结果"
    >
      <Form
        ref="AgainPrizeForm"
        :model="updateOpenDataForm"
        label-position="left"
        :label-width="110"
      >
        <FormItem label="开奖号码" prop="lotteryName">
          <i-input
            size="large"
            type="textarea"
            style="width:260px;"
            v-model="updateOpenDataForm.randOpen"
          ></i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.btnLoading" @click="updateOpenData">确定</Button>
          <Button @click="updateOpenDataModal=false">取消</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import LotteryTable from "@/template/my-components/iview-table/table";
import sixLotteryColor from "@/local/sixLotteryColor";
export default {
  components: { LotteryTable },
  data() {
    return {
      updateOpenDataForm: {},
      randOpen: "",
      updateOpenDataModal: false,
      sixLotteryColor: sixLotteryColor,
      LotteryInfo: [],
      table: {
        TableColumn: [
          {
            title: "彩票名称",
            key: "lotteryName"
          },
          {
            title: "期数",
            key: "qishu"
          },
          {
            title: "开奖结果",
            key: "open",
            width: 270,
            render: (h, params) => {
              if (params.row.open) {
                return params.row.open.split(",").map(ballnum => {
                  let bgColor;
                  if (
                    params.row.lotteryId === 18 ||
                    params.row.lotteryId === 19
                  ) {
                    this.sixLotteryColor.map(item => {
                      if (item.number.includes(ballnum * 1)) {
                        bgColor = item.color;
                      }
                    });
                  } else {
                    let c1 = parseInt(Math.random() * 256);
                    let c2 = parseInt(Math.random() * 256);
                    let c3 = parseInt(Math.random() * 256);
                    bgColor = `rgba(${c1},${c2},${c3},.9)`;
                  }
                  return h(
                    "span",
                    {
                      style: {
                        color: "#fff",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                        marginLeft: "5px",
                        display: "inline-block",
                        backgroundColor: bgColor,
                        textShadow: "1px 1px 1px #000"
                      }
                    },
                    ballnum
                  );
                });
              } else {
                return h("span", "-");
              }
            }
          },
          {
            title: "随机输赢统计",
            key: "randWin"
            // width: 100
          },
          {
            title: "会员输赢",
            key: "win"
          },
          {
            title: "下注金额",
            key: "betMoney"
          },
          {
            title: "下注金额(黑名单)",
            key: "blackBetMoney"
            // width: 110
          },
          {
            title: "用户输赢(黑名单)",
            key: "blackWin"
            // width: 110
          },
          {
            title: "单量",
            key: "betCount"
          },
          {
            title: "黑名单会员输赢统计",
            key: "winBlackList"
          },
          {
            title: "状态",
            key: "status",
            render: (h, params) => {
              let text;
              switch (params.row.status) {
                case "init":
                  text = "初始";
                  break;
                case "waitWincalc":
                  text = "等待预结算";
                  break;
                case "waitOpen":
                  text = "等待开奖";
                  break;
                default:
                  text = "已开奖";
                  break;
              }
              return h("span", text);
            }
          },
          {
            title: "当前开奖模式",
            key: "killStatus",
            render: (h, params) => {
              let text;
              switch (params.row.killStatus) {
                case "rand":
                  text = "随机";
                  break;
                case "kill":
                  text = "控制";
                  break;
                default:
                  text = "放水";
                  break;
              }
              return h("span", text);
            }
          },
          {
            title: "开奖时间",
            key: "openTime",
            width: 160,
            render: (h, params) => {
              let text =
                params.row.openTime == 0
                  ? "无"
                  : this.$moment.unix(+params.row.openTime).format("LLL");
              return h("span", text);
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              const { id, randOpen } = params.row;
              return h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    visibility: params.row.status === "init" ? "visible" : "hidden"
                  },
                  on: {
                    click: () => {
                      this.updateOpenDataModal = true;
                      this.updateOpenDataForm.id = id;
                      this.randOpen = randOpen.split("|");
                      this.updateOpenDataForm.randOpen = this.randOpen[0];
                    }
                  }
                },
                "修改"
              );
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_KuaiSuKaiJiangJieGuo,
        Refresh: 0,
        dataform: { lotteryId: this.$route.query.lotteryId }
      }
    };
  },
  methods: {
    updateOpenData() {
      let url = this.$root.HTTP_L.HTTP_Update_OpenData;
      let params = { ...this.updateOpenDataForm };
      this.randOpen.fill(params.randOpen);
      params.randOpen = this.randOpen.join("|");
      console.log(params.randOpen)
      this.$root
        .HTTP_ALLLINKPOST(url, params)
        .then(res => {
          this.updateOpenDataModal = false;
          this.$root.modal("success", "", "更新成功");
          this.table.Refresh++;
          this.resetForm();
        })
        .catch(res => {});
    },
    resetForm() {
      for (let key in this.updateOpenDataForm) {
        this.updateOpenDataForm[key] = "";
      }
    }
  }
};
</script>
