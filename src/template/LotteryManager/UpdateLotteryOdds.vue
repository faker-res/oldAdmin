
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{$route.query.name}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_right">
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="caozuo_btn">
                  <Button type="primary" v-if="!iSXGPL" @click="iSXGPL=!iSXGPL">修改赔率</Button>
                  <Button type="success" v-if="iSXGPL" @click="XiuGaiTiJiao">保存修改</Button>
                  <Button type="error" v-if="iSXGPL" @click="XiuGaiQuXiao">取消修改</Button>
                  <Button @click="$root.go_back">返回</Button>
                </div>
                <div class="data_sj">
                  <div style="margin: 10px 0;">
                    <!-- <i-table :class="{center:table.align=='center'}" :loading="table.loading" :context="$parent" :data="table.TableData.oddsInfo" :columns="table.TableColumn"></i-table> -->
                    <!-- <div style="margin: 10px;overflow: hidden">
                                            <div style="float: right;">
                                                <Page :total="1010" show-total :current="1" :page-size="20"></Page>
                                            </div>
                                        </div> -->
                    <table class="table" style="width:100%;text-align:center;line-height:32px">
                      <thead>
                        <tr>
                          <th>描述</th>
                          <th>号码</th>
                          <th>最大赔率</th>
                          <th>最小赔率</th>
                          <th>返水</th>
                          <th>玩法</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(m,i) in table.TableData.oddsInfo" :key="i">
                          <td>{{m.title}}</td>
                          <td>
                            <Tooltip placement="top">
                              <a>{{m.ball.slice(0, 20)}}
                                <span v-show="m.ball.length>20">...</span>
                              </a>
                              <div slot="content">
                                {{m.ball}}
                              </div>
                            </Tooltip>
                          </td>
                          <td>
                            <span v-show="!iSXGPL">{{m.oddsMax.join('/')}}</span>
                            <span v-for="(i,c) in m.oddsMax" :key="c">
                              <input style="width:80px" class="inputt" type="number" v-show="iSXGPL" :step="0.01" :min="m.oddsMin[c]" v-model="m.oddsMax[c]">
                            </span>
                            <!-- <span v-show="!iSXGPL">{{m.oddsMax}}</span>
                            <input style="width:80px" class="inputt" type="number" v-show="iSXGPL" :step="0.01" :min="m.oddsMin" v-model="m.oddsMax"> -->
                          </td>
                          <td>
                            <span v-show="!iSXGPL">{{m.oddsMin.join('/')}}</span>
                            <span v-for="(i,c) in m.oddsMin" :key="c">
                              <input style="width:80px" class="inputt" type="number" v-show="iSXGPL" :step="0.01" :min="0" :max="m.oddsMax[c]" v-model="m.oddsMin[c]">
                            </span>
                            <!-- <span v-show="!iSXGPL">{{m.oddsMin}}</span>
                            <input style="width:80px" class="inputt" type="number" v-show="iSXGPL" :step="0.01" :min="0" :max="m.oddsMax" v-model="m.oddsMin"> -->
                          </td>
                          <td>{{m.fsrate}}</td>
                          <td>{{m.playway}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Spin size="large" fix v-if="spinShow"></Spin>
                  </div>
                </div>
                <div class="caozuo_btn">
                  <Button type="success" :loading="$root.btnLoading" v-if="iSXGPL" @click="XiuGaiTiJiao">保存修改</Button>
                  <Button type="error" v-if="iSXGPL" @click="XiuGaiQuXiao">取消修改</Button>
                  <Button @click="$root.go_back">返回</Button>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Odds",
  data() {
    return {
      value: "",
      iSXGPL: false,
      XiuGaiPeiLvTC: false,
      XiuGaiPeiLvData: {},
      spinShow: true,
      ruleValidate: {
        ball: [
          {
            required: true,
            message: "号码不正确",
            trigger: "blur"
          }
        ],
        oddsMax: [
          {
            required: true,
            // type: "number",
            message: "最大赔率不正确",
            trigger: "blur"
          }
        ],
        oddsMin: [
          {
            required: true,
            // type: "number",
            message: "最小赔率不正确",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            message: "名称不正确",
            trigger: "blur"
          }
        ]
      },
      DataMemory: {},
      btnLoading: false,
      pageSize: 10,

      table: {
        //数据部分开始
        // TableColumn: [
        //   {
        //     title: "描述",
        //     key: "title",
        //     render: (h, params) => {
        //       return params.row.title;
        //     }
        //   },
        //   {
        //     title: "号码",
        //     key: "ball",
        //     render: (h, params) => {
        //       return h("div", {}, [
        //         h(
        //           "Tooltip",
        //           {
        //             props: {
        //               placement: "bottom"
        //             },
        //             style: {},
        //             on: {
        //               click: () => {}
        //             }
        //           },
        //           [
        //             h(
        //               "span",
        //               {
        //                 // props: {
        //                 //   type: "text"
        //                 // },
        //                 style: { color: "#2d8cf0" }
        //               },
        //               params.row.ball.length < 20
        //                 ? params.row.ball
        //                 : params.row.ball.slice(0, 20) + "..."
        //             ),
        //             h(
        //               "div",
        //               {
        //                 slot: "content",
        //                 style: {
        //                   zIndex: 999,
        //                   whiteSpace: "normal"
        //                 }
        //               },
        //               params.row.ball
        //             )
        //           ]
        //         )
        //       ]);
        //     }
        //   },
        //   {
        //     title: "最大赔率",
        //     key: "oddsMax",
        //     render: (h, params) => {
        //       var value = params.row.oddsMax;
        //       return h("div", [
        //         h(
        //           "span",
        //           {
        //             style: { display: this.iSXGPL ? "none" : "block" }
        //           },
        //           params.row.oddsMax
        //         ),
        //         h("input", {
        //           domProps: {
        //             type: "number",
        //             value: value,
        //             min: params.row.oddsMin,
        //             step: 0.01
        //           },
        //           on: {
        //             change: () => {
        //               this.$set(
        //                 this.table.TableData.oddsInfo[params.index],
        //                 "oddsMax",
        //                 value
        //               );
        //             }
        //           },
        //           class: ["inputt"],
        //           style: {
        //             display: this.iSXGPL ? "block" : "none",
        //             width: "100%"
        //           }
        //         })
        //       ]);
        //     }
        //   },
        //   {
        //     title: "最小赔率",
        //     key: "oddsMin",
        //     render: (h, params) => {
        //       return h("div", [
        //         h(
        //           "span",
        //           {
        //             style: { display: this.iSXGPL ? "none" : "block" }
        //           },
        //           params.row.oddsMin - 0
        //         ),
        //         h("InputNumber", {
        //           props: {
        //             type: "number",
        //             value: Number(params.row.oddsMin),
        //             min: 0,
        //             step: 0.01,
        //             max: Number(params.row.oddsMin)
        //           },
        //           on: {
        //             Onchange: e => {
        //               //   this.$set(this.table.TableData.data[params.index],'oddsMax',params.row.oddsMax);
        //             }
        //           },
        //           style: {
        //             display: this.iSXGPL ? "block" : "none",
        //             width: "100%"
        //           },
        //           key: params.row.oddsMin
        //         })
        //       ]);
        //     }
        //   },
        //   {
        //     title: "返水比例",
        //     key: "fsrate",
        //     render: (h, params) => {
        //       return params.row.fsrate;
        //     }
        //   },
        //   {
        //     title: "玩法",
        //     key: "playway",
        //     render: (h, params) => {
        //       return params.row.playway;
        //     }
        //   }
        // ],
        TableData: [],
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuoQuCaiPiaoPeiLv + "/1",
        dataform: {},
        Refresh: 0,
        postType: "get"
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {});
  },
  created() {
    const { sid, lid } = this.$route.query;
    let link = this.$root.HTTP_L.HTTP_HuoQuCaiPiaoPeiLv + `/${sid}/` + lid;
    // this.$http
    //   .get(this.table.posturl + '/'+this.$route.query.id)
    this.$root.HTTP_ALLLINKGET(link).then(res => {
      this.spinShow = false;
      this.table.TableData = res.data.data;

      if (typeof this.table.TableData.oddsInfo == "string") {
        this.table.TableData.oddsInfo = JSON.parse(
          this.table.TableData.oddsInfo
        );
      }
      this.table.TableData.oddsInfo.forEach(i => {
        i.oddsMax = String(i.oddsMax)
        i.fsrate = String(i.fsrate)
        i.oddsMin = String(i.oddsMin)
        i.oddsMax = i.oddsMax.split("/");
        i.oddsMin = i.oddsMin.split("/");
      });
      this.XiuGaiPeiLvData = JSON.parse(JSON.stringify(this.table.TableData));
      this.table.loading = false;
    });
  },
  computed: {
    
  },
  methods: {
    // XiuGaiPeiLv() {},
    XiuGaiTiJiao() {
      this.spinShow = true;
      let data = JSON.parse(JSON.stringify(this.table.TableData.oddsInfo));
      data.forEach(i => {
        i.oddsMax = i.oddsMax.join("/");
        i.oddsMin = i.oddsMin.join("/");
      });
      // console.log(data);
      // return;
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GengXinCaiPiaoPeiLv, {
          id: this.$route.query.id,
          oddsInfo: JSON.stringify(data)
        })
        .then(res => {
          this.spinShow = false;
          this.XiuGaiPeiLvData = JSON.parse(JSON.stringify(this.table.TableData));//修改成功之后数据应该更新
          this.$Modal.success({ title: "提示", content: "修改赔率成功！" });
          this.iSXGPL = false;
        })
        .catch(res => {
          this.spinShow = false;
        });
    },
    XiuGaiQuXiao() {
      this.table.TableData.oddsInfo = JSON.parse(
        JSON.stringify(this.XiuGaiPeiLvData.oddsInfo)
      );
      this.iSXGPL = false;
    },
    UpdateLotteryTimeB() {
      //this.XiuGaiPeiLv.id = this.DataMemory.id;
      this.$refs.XiuGaiPeiLv.validate(valid => {
        if (valid) {
          for (let key in this.XiuGaiPeiLv.oddsInfo) {
            this.XiuGaiPeiLv.oddsInfo[key] = this.DataMemory[key];
          }
          this.XiuGaiPeiLv.id = this.table.TableData.id;
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_GengXinCaiPiaoPeiLv,
              this.XiuGaiPeiLv
            )
            .then(res => {
              this.$Message.success("编辑彩票赔率成功!");
              this.table.Refresh++;
              this.XiuGaiPeiLvTC = false;
            })
            .catch(() => {});
        } else {
          this.$Message.error("请填写正确的信息!");
        }
      });
    },
    quanxuan() {
      this.HuiYuanDengJi = [
        "未分层（新会员）",
        "第一层（普通会员）",
        "第二层（普通会员）",
        "第十级（高级会员）"
      ];
    },
    qingkong() {
      this.HuiYuanDengJi = [];
    }
  }
};
</script>
<style scoped lang='less'>
.member-main {
}
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    width: 71px;
    text-align: right;
  }
  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper,
  .ivu-i-input-wrapper {
    margin: 0 5px;
  }
  margin-bottom: 5px;
}
.c_ser {
  margin-bottom: 10px;
  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>