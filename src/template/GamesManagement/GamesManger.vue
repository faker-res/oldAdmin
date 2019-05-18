<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">
          {{$route.meta.title}}
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover>
              <i-form :model="DataSearch" inline>
                <FormItem label="平台">
                  <Select clearable v-model="DataSearch.platform" style="width:180px">
                    <Option value="sport">体育赛事</Option>
                    <Option value="slot">电子游戏</Option>
                    <Option value="chess">棋牌</Option>
                    <Option value="lottery">彩票游戏</Option>
                    <Option value="vr_lottery">VR彩票</Option>
                    <Option value="live_casino">真人视讯</Option>
                    <Option value="other">其他</Option>
                  </Select>
                </FormItem>
                <FormItem label="游戏类型">
                  <GameClassSelect ref="GameClassSelect" :GameClassSelectData="GameClassSelectData" @listenOnChange='listenOnChange' />
                </FormItem>
                <FormItem label="游戏名称">
                  <i-input v-model="DataSearch.name"></i-input>
                </FormItem>
                <FormItem label="游戏编码">
                  <i-input v-model="DataSearch.code"></i-input>
                </FormItem>
                <FormItem label="客户端">
                  <Select clearable v-model="DataSearch.devices" style="width:80px">
                    <Option value="pc">PC</Option>
                    <Option value="h5">H5</Option>
                    <Option value="android">安卓</Option>
                    <Option value="ios">IOS</Option>
                    <Option value="all">全部</Option>
                    <Option value="other">其他</Option>
                  </Select>
                </FormItem>
                <FormItem label="状态">
                  <Select clearable v-model="DataSearch.status" style="width:80px">
                    <Option value="yes">是</Option>
                    <Option value="no">否</Option>
                  </Select>
                </FormItem>
                <FormItem label="下拉菜单显示">
                  <Select clearable v-model="DataSearch.isSelect" style="width:80px">
                    <Option value="yes">是</Option>
                    <Option value="no">否</Option>
                  </Select>
                </FormItem>
                <FormItem label="标签">
                  <Select clearable v-model="tag.type" style="width:180px">
                    <Option value="FAVORITE">常用</Option>
                    <Option value="HOT">热门</Option>
                    <Option value="CLASSIC">经典</Option>
                    <Option value="NEW">最新</Option>
                    <Option value="VIDEO_SLOTS">电动吃角子</Option>
                    <Option value="JACKPOT">奖池</Option>
                    <Option value="SMALL_AMOUNT">小额投注</Option>
                    <Option value="LARGE_AMOUNT">大额投注</Option>
                    <Option value="DIMINISHING">消消乐</Option>
                    <Option value="CLASSIC_SLOTS">经典拉霸</Option>
                  </Select>
                  -
                  <Select clearable v-model="tag.compensation" style="width:180px">
                    <Option value="1-1">单线</Option>
                    <Option value="5-10">5-10赔付线</Option>
                    <Option value="15-20">15-20赔付线</Option>
                    <Option value="25-25">25+赔付线</Option>
                    <Option value="243">243游戏</Option>
                    <Option value="99-99">其他</Option>
                  </Select>
                  -
                  <Select clearable v-model="tag.game" style="width:180px">
                    <Option value="CARTOON">卡通</Option>
                    <Option value="ROCKY">洛奇</Option>
                    <Option value="GIRL">少女</Option>
                    <Option value="FISH">捕鱼</Option>
                  </Select>
                </FormItem>
                <FormItem class="form-group">
                  <Button @click="Search" type="primary">查询</Button>
                  <Button @click="SearchRest" type="warning">重置</Button>
                </FormItem>
              </i-form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div class="caozuo_btn">
                    <Button type="primary" @click="$router.push({name:'CreateGame'})">添加游戏</Button>
                    <Button type="success" @click="CanShuSheZhi">全局彩票参数设置</Button>
                  </div>
                  <div style="margin: 10px 0;overflow: hidden">
                    <GameManagerTable :table="table"></GameManagerTable>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" v-model="CSSZ" title="参数设置" @on-ok="ChangeOk" width='350px' :loading="$root.btnLoading">
      <Form :label-width="110" :model="CanShuSheZhiData" :rules="CanShuSheZhiDataRules">
        <FormItem label="单注限额" prop="bet_limit_min">
          <input-number style="width:80px" :step="1" :min="1" v-model="CanShuSheZhiData.bet_limit_min"></input-number>
          <span class="xian">-</span>
          <input-number style="width:80px" :step="1" :min="1" v-model="CanShuSheZhiData.bet_limit_max"></input-number>
        </FormItem>
        <FormItem label="同期最高限额" prop="issue_limit_max">
          <input-number style="width:173px" :step="1" :min="1" v-model="CanShuSheZhiData.issue_limit_max"></input-number>
        </FormItem>
        <FormItem label="返点限额" prop="rebate_min">
          <input-number style="width:80px" :step="0.1" :min="0" v-model="CanShuSheZhiData.rebate_min"></input-number>
          <span class="xian">-</span>
          <input-number style="width:80px" :step="0.1" :min="0" v-model="CanShuSheZhiData.rebate_max"></input-number>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import GameManagerTable from "@/template/my-components/iview-table/table";
import GameClassSelect from "@/template/my-components/GameClassSelect.vue";
const TableMore = {
  template: `
  <div class='more_data' style="text-align:left">
    <Row>
        <Col span="4"><b>游戏分类</b>:{{row.className}}</Col>
        <Col span="4"><b>游戏编号</b>:{{row.code}}</Col>
        <Col span="4"><b>平台</b>:{{row.platform === "sport" ? "体育" : row.platform === "slot" ? "电子" : row.platform === "chess" ? "棋牌" : row.platform === "lottery" ? "彩票" : row.platform === "vr_lottery" ? "VR彩票" : row.platform === "live_casino" ? "真人" : '其他'}}</Col>
        <Col span="4"><b>创建人</b>:{{row.created_user}}</Col>
        <Col span="4"><b>创建时间</b>:{{this.$moment(row.created_at * 1000).format("LLL")}}</Col>
        <Col span="4"><b>修改人</b>:{{row.updated_user  ? row.updated_user : "无"}}</Col>
    </row>
    <Row>
        <Col span="4"><b>修改时间</b>:{{row.updated_at != "0" ? this.$moment(row.updated_at * 1000).format("LLL") : "无"}}</Col>
        <Col span="4"><b>序号</b>:{{row.sequence}}</Col>
    </Row>
    </div>
    `,
  props: {
    row: Object
  }
};
export default {
  name: "GamesManger",
  components: {
    GameManagerTable,
    GameClassSelect
  },
  data() {
    return {
      loading: false,
      pageSize: 10,
      CSSZ: false,
      isChange: 0,
      // gameClassData: [],
      gameClassValue: [],
      GameClassSelectData: {
        style: {
          width: "180px"
        }
      },
      tag: {
        type: "",
        compensation: "",
        game: ""
      },
      DataSearch: {
        code: "",
        name: "",
        classId: "",
        platform: "",
        devices: "",
        status: "",
        isSelect: "",
        tag: ""
      },
      CanShuSheZhiData: {
        bet_limit_min: 0.1,
        bet_limit_max: 0.1,
        issue_limit_max: 0.1,
        rebate_min: 0.1,
        rebate_max: 0.1
      },
      CanShuSheZhiDataRules: {
        bet_limit_min: [
          {
            requried: true,
            type: "number",
            trigger: "blur",
            message: "单注最低限额不正确！"
          }
        ]
      },
      table: {
        TableColumn: [
          {
            title: "游戏名称",
            key: "name",
          },
          {
            title: "平台",
            key: "className",
          },
          {
            title: "标签",
            key: "tag",
          },
          {
            title: "设备",
            key: "devices",
            // width: 150,
            render: (h, params) => {
              return h('span',params.row.devices == "all" ? "全部" : params.row.devices);
            }
          },
          {
            title: "状态",
            key: "status",
            width: 116,
            render: (h, params) => {
              var that = this;
              var status = params.row.status == "yes" ? "no" : "yes";
              var type = params.row.status === "yes" ? "success" : "error";
              return h("div", [
                h(
                  "i-button",
                  {
                    props: {
                      type: type,
                      size: "small"
                    },
                    on: {
                      click: () => {
                        var alertMsg = "确认关闭游戏吗？";
                        if (status === "yes") {
                          alertMsg = "确认开启游戏吗？";
                        }
                        this.$Modal.confirm({
                          title: "提示",
                          content: `<h3>${alertMsg}</h3>`,
                          loading: false,
                          onOk: () => {
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_XiuGaiYouXi,
                                {
                                  gameId: params.row.id,
                                  code: params.row.code,
                                  name: params.row.name,
                                  classId: params.row.classId,
                                  className: params.row.className,
                                  images: "",
                                  devices: params.row.devices,
                                  tag: params.row.tag,
                                  special_setting: params.row.special_setting,
                                  status: status,
                                  sequence: params.row.sequence,
                                  updated_user: this.$root.adminuserinfo
                                    .adminUserName,
                                  platform: params.row.platform,
                                  isSelect:
                                    params.row.isSelect == "yes" ? "no" : "yes"
                                }
                              )
                              .then(res => {
                                this.$root.modal("success", "", "修改状态成功");
                                this.$set(
                                  this.table.TableData.data[params.index],
                                  "status",
                                  status
                                );
                              });
                          },
                          onCancel: () => {}
                        });
                      }
                    }
                  },
                  params.row.status == "yes" ? "开启" : "关闭"
                )
              ]);
            }
          },
          {
            title: "操作",
            render: (h, params) => {
              var that = this;
              // var platform = params.row.platform == 'lottery' ? 'inlineBlock' : 'none';
              return h("div", [
                //   h(
                //     "Button", {
                //       props: {
                //         type: "warning",
                //         size: "small"
                //       },
                //       style: {
                //         marginRight: "5px",
                //         display: platform
                //       },
                //       on: {
                //         click: () => {
                //           this.$router.push({
                //             name: "UpdateLotteryTime",
                //             query: {
                //               lotteryId: params.row.id,
                //               name: params.row.name
                //             }
                //           });
                //         }
                //       }
                //     },
                //     "时间设置"
                //   ),
                //   h(
                //     "Button", {
                //       props: {
                //         type: "info",
                //         size: "small"
                //       },
                //       style: {
                //         marginRight: "5px",
                //         display: platform
                //       },
                //       on: {
                //         click: () => {
                //           this.$router.push({
                //             name: "UpdateLotteryOdds",
                //             query: {
                //               id: params.row.id,
                //               name: params.row.name
                //             }
                //           });
                //         }
                //       }
                //     },
                //     "赔率设置"
                //   ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "GamesDetail",
                          query: {
                            id: params.row.id
                          }
                        });
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          name: "CreateGame",
                          query: {
                            id: params.row.id,
                            isVerify: true
                          }
                        });
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          content: "确认删除？",
                          onOk: () => {
                            this.$root.loading();
                            this.$root
                              .HTTP_ALLLINKPOST(
                                this.$root.HTTP_L.HTTP_ShanChuYouXi,
                                {
                                  gameId: params.row.id
                                }
                              )
                              .then(res => {
                                this.$Spin.hide();
                                this.$root.modal(
                                  "success",
                                  "",
                                  "删除游戏成功！"
                                );
                                this.table.TableData.data.splice(
                                  params.index,
                                  1
                                );
                                this.table.TableData.total--;
                              })
                              .catch(res => {
                                this.$Spin.hide();
                                this.$root.modal(
                                  "success",
                                  "",
                                  "删除游戏失败！"
                                );
                              });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          },
          {
            type: "expand",
            title: "...",
            width: 80,
            render: (h, params) => {
              return h(TableMore, {
                props: {
                  row: params.row
                }
              });
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_YouXiLieBiao,
        Refresh: 0,
        dataform: {
          isRules: "select"
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.GameClassSelect.InitData();
    });
  },
  methods: {
    listenOnChange(v, selectedData) {
      this.gameClassValue = v;
    },
    Search() {
      let arry = [];
      for (let key in this.tag) {
        if (this.tag[key] != "") {
          arry.push(this.tag[key]);
        }
      }
      this.DataSearch.tag = arry.join();
      this.DataSearch.classId = this.gameClassValue[1];
      for (var key in this.DataSearch) {
        if (this.DataSearch[key] == null || this.DataSearch[key] == "") {
          delete this.DataSearch[key];
        }
      }
      this.table.dataform = JSON.parse(JSON.stringify(this.DataSearch));
    },
    SearchRest() {
      this.DataSearch = {
        code: "",
        name: "",
        classId: "",
        platform: "",
        devices: "",
        status: "",
        isSelect: "",
        tag: ""
      };
      this.tag = {
        type: "",
        compensation: "",
        game: ""
      };
      this.$refs.GameClassSelect.gameClassValue = [];
      this.gameClassValue = [];
      this.table.dataform = {};
    },
    CanShuSheZhi() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_CaiPiaoCanShuSheZhi, {
          isRules: "show"
        })
        .then(res => {
          var resdata = res.data.data;
          for (let key in this.CanShuSheZhiData) {
            this.CanShuSheZhiData[key] = resdata[key];
          }
          this.CSSZ = true;
        });
    },
    ChangeOk() {
      if (this.isChange >= 1) {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_CaiPiaoCanShuGengXin, {
            info: JSON.stringify(this.CanShuSheZhiData)
          })
          .then(res => {
            this.$root.modal("success", "", res.data.data);
            this.CSSZ = false;
          })
          .catch(res => {});
      } else {
        this.$root.modal("error", "", "您没有修改任何内容！");
      }
    }
  },
  watch: {
    CanShuSheZhiData: {
      handler: function(n, o) {
        this.isChange++;
      },
      deep: true
    }
  }
};
</script>

<style>
</style>