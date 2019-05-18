
<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}
          <span>{{$route.query.name}}</span>
        </h1>
      </div>
      <div class="page-con1">
        <div class="c_left">
          <i-col class="c_search_top" span="24">
            <Card dis-hover v-if="$route.query.lotteryId != 1">
              <Form lable-width="120" inline>
                <FormItem label="时间类型">
                  <Select v-model="batchTimeForm.tt" style="width:100px;">
                    <Option :value="1" label="开盘时间"></Option>
                    <Option :value="2" label="封盘时间"></Option>
                    <Option :value="3" label="开奖时间"></Option>
                  </Select>
                </FormItem>
                <FormItem label="时间设置为">
                  <Button type="error" icon="minus-round" @click="batchTimeForm.time--" size="small"></Button>
                  <Input v-model="batchTimeForm.time" style="width:50px;" />
                  <Button type="info" icon="plus-round" @click="batchTimeForm.time++" size="small"></Button>
                  <span>秒</span>
                </FormItem>
                <FormItem>
                  <Button type="success" @click="batchUpdateLotteryTime">批量修改时间</Button>
                </FormItem>
              </Form>
            </Card>
          </i-col>
          <i-col class="c_search_result" span="24">
            <div class="serach">
              <div class="have_con">
                <div class="data_sj">
                  <div class="caozuo_btn">
                    <Button type="primary" v-if="$route.query.lotteryId == 1" @click="LiuHeCaiXiuGaiShiJianTC = true;liuHeCaiVerify = false">新增六合彩开奖时间</Button>
                  </div>
                  <div style="margin:10px 0;overflow: hidden">
                    <UpdateLotterTimeData :table="table"></UpdateLotterTimeData>
                  </div>
                </div>
              </div>
            </div>
          </i-col>
        </div>
      </div>
      <div class="page-boot">
        <div class="b_link">
          <a href="javascript:" @click="$root.go_back">返回上一页</a>
        </div>
      </div>
    </div>
    <Modal class-name="vertical-center-modal" width="550" :title="liuHeCaiVerify ? '修改六合彩开奖时间' : '添加六合彩开奖时间'" v-model="LiuHeCaiXiuGaiShiJianTC">
      <i-form ref="LiuHeCaiXiuGaiShiJian" :label-width="100" :model="LiuHeCaiDataMemory">
        <FormItem label="期数" prop="issue">
          <i-input v-model="LiuHeCaiDataMemory.issue" style="width:250px" placeholder=""></i-input>
        </FormItem>
        <FormItem label="开盘时间" prop="open">
          <DatePicker type="datetime" placeholder="开盘时间" v-model="LiuHeCaiDataMemory.openTime" format="yyyy-MM-dd HH:mm" style="width: 250px"></DatePicker>
        </FormItem>
        <FormItem label="封盘时间" prop="close">
          <DatePicker type="datetime" placeholder="封盘时间" v-model="LiuHeCaiDataMemory.closeTime" format="yyyy-MM-dd HH:mm" style="width: 250px"></DatePicker>
        </FormItem>
      </i-form>
      <div slot="footer">
        <Button @click="LiuHeCaiXiuGaiShiJianTC = false">取消</Button>
        <Button type="primary" :loading="$root.btnLoading" @click="UpdateLotteryTimeB">{{liuHeCaiVerify ? '确定修改' : '确定添加'}}</Button>
      </div>
    </Modal>
    <Modal class-name="vertical-center-modal" width="550" title="修改时间" v-model="XiuGaiShiJianTC">
      <i-form ref="XiuGaiShiJian" :label-width="100" :model="DataMemory" :rules="ruleValidate">
        <FormItem label="彩种">
          <i-input :disabled='true' v-model="DataMemory.lotteryName" style="width:250px" placeholder="获取返回的主键"></i-input>
        </FormItem>
        <FormItem label="期数">
          <i-input :disabled='true' v-model="DataMemory.issue" style="width:250px" placeholder=""></i-input>
        </FormItem>
        <FormItem label="开盘时间" prop="openTime">
          <TimePicker format="HH:mm:ss" v-model="DataMemory.openTime" type="time" confirm placeholder="开盘时间" style="width: 250px"></TimePicker>
        </FormItem>
        <FormItem label="封盘时间" prop="openingTime">
          <TimePicker format="HH:mm:ss" v-model="DataMemory.closeTime" type="time" confirm placeholder="封盘时间" style="width: 250px"></TimePicker>
        </FormItem>
        <FormItem label="开奖时间" prop="closeTime">
          <TimePicker format="HH:mm:ss" v-model="DataMemory.openingTime" type="time" confirm placeholder="封盘时间" style="width: 250px"></TimePicker>
        </FormItem>
        <FormItem label="日期选择" v-if="openDay.length" prop="openDay">
          <Select v-model="openDay" multiple style="width:250px">
            <Option v-for="item in WeekList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="偏移矫正" prop="offset">
          <input-number v-model="DataMemory.offset" style="width:250px" placeholder="获取返回的主键"></input-number>
        </FormItem>
      </i-form>
      <div slot="footer">
        <Button @click="XiuGaiShiJianTC = false">取消</Button>
        <Button type="primary" :loading="$root.btnLoading" @click="UpdateLotteryTimeB">确定修改</Button>
      </div>
    </Modal>
    <Modal v-model="kaijiang" title="设置开奖号码" @on-ok="sheZhiKaiJiang">
      <Form ref="sheZhiKaiJiangHaoMa" inline :model="kaiJiangHaoMa" :rules="kaiJiangHaoMaRule" class="kaijiang">
        <FormItem prop="one">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.one"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="two">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.two"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="three">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.three"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="four">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.four"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="five">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.five"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="six">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.six"></i-input>
        </FormItem>
        <span>—</span>
        <FormItem prop="seven">
          <i-input style="width:32px;" v-model="kaiJiangHaoMa.seven"></i-input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import UpdateLotterTimeData from "@/template/my-components/iview-table/table";
export default {
  components: { UpdateLotterTimeData },
  name: "UpdateLotteryTime",
  data() {
    return {
      batchTimeForm: { tt: 1, time: 0 },
      kaijiang: false,
      value: "",
      issue: null, //六合彩期数(某一期)
      specialNum: "", //六合彩开奖号码(某一期)
      kaiJiangHaoMa: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
        six: "",
        seven: ""
      },
      kaiJiangHaoMaRule: {
        one: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        two: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        three: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        four: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        five: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        six: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ],
        seven: [
          {
            message: "号码不正确",
            trigger: "blur",
            pattern: /^([1-9]|[1-4]\d)$/
          }
        ]
      },
      WeekList: [
        {
          value: "1",
          label: "星期一"
        },
        {
          value: "2",
          label: "星期二"
        },
        {
          value: "3",
          label: "星期三"
        },
        {
          value: "4",
          label: "星期四"
        },
        {
          value: "5",
          label: "星期五"
        },
        {
          value: "6",
          label: "星期六"
        },
        {
          value: "7",
          label: "星期日"
        }
      ],
      XiuGaiShiJianTC: false,
      LiuHeCaiXiuGaiShiJianTC: false,
      LiuHeCaiDataMemory: {
        issue: "",
        openTime: "",
        closeTime: ""
      },
      openDay:[],
      XiuGaiShiJian: {
        id: null,
        openTime: "",
        closeTime: "",
        openingTime: "",
        openDay: [],
        offset: null
      },
      liuHeCaiVerify: false,
      LiuHeCaiRuleValidate: {
        open: [
          {
            required: true,
            message: "开盘时间不正确",
            trigger: "change"
          }
        ],
        close: [
          {
            required: true,
            message: "封盘时间不正确",
            trigger: "change"
          }
        ],
        issue: [
          {
            required: true,
            message: "期数不正确",
            trigger: "blur"
          }
        ]
      },
      ruleValidate: {
        openTime: [
          {
            required: true,
            message: "开盘时间不正确",
            trigger: "blur"
          }
        ],
        closeTime: [
          {
            required: true,
            message: "封盘时间不正确",
            trigger: "blur"
          }
        ],
        openingTime: [
          {
            required: true,
            message: "开奖时间不正确",
            trigger: "blur"
          }
        ],
        openDay: [
          {
            required: true,
            // type: "array",
            message: "开奖日期不正确",
            trigger: "blur"
          }
        ],
        offset: [
          {
            required: true,
            type: "number",
            message: "开奖时间矫正不正确",
            trigger: "blur"
          }
        ]
      },
      DataMemory: {},

      btnLoading: false,
      pageSize: 10,
      sixColumn: [
        {
          title: "期数",
          key: "issue",
        },
        {
          title: "开奖号码",
          key: "resultInfo",
          render: (h, params) => {
            return h('span',params.row.resultInfo||"无");
          }
        },
        {
          title: "开盘时间",
          key: "openTime",
          minWidth: 150,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.openTime).format("LLL"));
          }
        },
        {
          title: "封盘时间",
          key: "closeTime",
          minWidth: 150,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.closeTime).format("LLL"));
          }
        },
        {
          title: "是否当期",
          key: "is_current",
          render: (h, params) => {
            var that = this;
            var color = params.row.is_current == "yes" ? "#19be6b" : "#ed3f14";
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                params.row.is_current == "yes" ? "是" : "否"
              )
            ]);
          }
        },
        {
          title: "添加时间",
          key: "created_at",
          minWidth: 150,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.created_at).format("LLL"));
          }
        },
        {
          title: "日期",
          key: "updated_at",
          minWidth: 150,
          render: (h, params) => {
            return h('span',this.$moment.unix(params.row.updated_at).format("LLL"));
          }
        },
        {
          title: "操作",
          key: "status",
          minWidth: 400,
          render: (h, params) => {
            var that = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.kaijiang = true;
                      this.issue = params.row.issue;
                      let list = params.row.resultInfo.split(",");
                      list.forEach(item => {
                        for (let key in this.kaiJiangHaoMa) {
                          if (this.kaiJiangHaoMa[key] === "") {
                            this.kaiJiangHaoMa[key] = item;
                            break;
                          }
                        }
                      });
                      this.specialNum = params.row.resultInfo;
                    }
                  }
                },
                "设置开奖号码"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        content:'确定设置为当前开将期吗？',
                        onOk:() => {
                          this.$root
                        .HTTP_ALLLINKPOST(
                          this.$root.HTTP_L.HTTP_SheZhiLiuHeCaiKaiJiangQi,
                          { id: params.row.id }
                        )
                        .then(res => {
                          this.$Message.success(res.data.data);
                          this.table.Refresh++;
                        })
                        .catch(res => {
                          this.$Message.error("设置失败！");
                        });
                        }
                      })
                    }
                  }
                },
                "设置为当前开奖期"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.liuHeCaiVerify = true;
                      this.LiuHeCaiDataMemory.issue = params.row.issue;
                      this.LiuHeCaiDataMemory.openTime = this.$moment
                        .unix(params.row.openTime)
                        .format("LLL");
                      this.LiuHeCaiDataMemory.closeTime = this.$moment
                        .unix(params.row.closeTime)
                        .format("LLL");
                      this.LiuHeCaiDataMemory.id = params.row.id;
                      this.LiuHeCaiXiuGaiShiJianTC = true;
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
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.$root
                        .HTTP_ALLLINKPOST(
                          this.$root.HTTP_L.HTTP_LiuHeCaiKaiJiangShiJianShanChu,
                          { id: params.row.id }
                        )
                        .then(res => {
                          this.$Message.success(res.data.data);
                          this.table.TableData.data.splice(params.index, 1);
                          this.table.TableData.total--;
                        })
                        .catch(res => {
                          this.$Message.error("删除失败！");
                        });
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.LotteryClearing({
                        issue: params.row.issue,
                        lid: this.$route.query.lotteryId
                      });
                    }
                  }
                },
                "结算"
              )
            ]);
          }
        }
      ],
      lotteryColumn: [
        {
          title: "彩种ID",
          key: "id",
        },
        {
          title: "彩种名称",
          key: "lotteryName",
        },
        {
          title: "期数",
          key: "issue",
        },
        {
          title: "开盘时间",
          key: "openTime",
        },
        {
          title: "封盘时间",
          key: "closeTime",
        },
        {
          title: "开奖时间",
          key: "openingTime",
        },
        {
          title: "偏移校正",
          key: "offset",
        },
        {
          title: "开奖日期(周)",
          key: "openDay",
          render: (h, params) => {
            return h('span',params.row.openDay||"未设置");
          }
        },
        {
          title: "操作",
          key: "status",
          render: (h, params) => {
            var color = params.row.status == "yes" ? "error" : "success";
            var that = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: { marginLeft: "5px" },
                  on: {
                    click: () => {
                      this.XiuGaiShiJianTC = true;

                      this.DataMemory = JSON.parse(JSON.stringify(params.row));
                      delete this.DataMemory["_index"];
                      delete this.DataMemory["_rowKey"];
                      delete this.DataMemory["openDay"];
                      if (params.row.openDay) {
                        // this.openDay = [];
                        this.openDay = params.row.openDay.split(",");
                      }
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      table: {
        //数据部分开始
        TableColumn: [],
        TableData: [],
        loading: true,
        align: "center",
        posturl: "",
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
    this.openDay = []
    if (this.$route.query.name === "香港六合彩") {
      this.table.posturl = this.$root.HTTP_L.HTTP_LiuHeCaiKaiJiangShiJian;
      this.table.TableColumn = [...this.sixColumn];
    } else {
      this.table.posturl =
        this.$root.HTTP_L.HTTP_HuoQuCaiPiaoShiJianSheZhi +
        "/" +
        this.$route.query.lotteryId;
      this.table.TableColumn = [...this.lotteryColumn];
    }
  },
  activated() {},
  computed: {},
  watch: {
    kaijiang(val) {
      if (!val) {
        this.$refs.sheZhiKaiJiangHaoMa.resetFields();
      }
    }
  },
  methods: {
    LotteryClearing(param) {
      /**
       * 彩票结算
       * @param issue 期数
       * @param lid 彩票id
       */
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_LotteryClearing, param)
        .then(res => {
          this.$Modal.success({
            title: "提示",
            content: `${res.data.data}`
          });
        });
    },
    UpdateLotteryTimeB() {
      if (this.$route.query.name === "香港六合彩") {
        this.LiuHeCaiDataMemory.openTime = this.$moment(
          this.LiuHeCaiDataMemory.openTime
        ).format("LLL");
        this.LiuHeCaiDataMemory.closeTime = this.$moment(
          this.LiuHeCaiDataMemory.closeTime
        ).format("LLL");
        // this.$refs.LiuHeCaiXiuGaiShiJian.validate(valid => {
        // if(valid){
        if (this.liuHeCaiVerify) {
          // console.log(this.LiuHeCaiDataMemory)
          // return
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_LiuHeCaiKaiJiangShiJianXiuGai,
              this.LiuHeCaiDataMemory
            )
            .then(res => {
              this.$Message.success("修改六合彩开奖时间成功!");
              this.table.Refresh++;
              this.LiuHeCaiXiuGaiShiJianTC = false;
            });
        } else {
          delete this.LiuHeCaiDataMemory["id"];
          // console.log(this.LiuHeCaiDataMemory)
          // return
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_LiuHeCaiKaiJiangShiJianTianJia,
              this.LiuHeCaiDataMemory
            )
            .then(res => {
              this.$Message.success("添加六合彩开奖时间成功!");
              this.table.Refresh++;
              this.LiuHeCaiXiuGaiShiJianTC = false;
            });
        }
        // }
        // })
      } else {
        if(this.$route.query.name === "福彩3D" || this.$route.query.name === "排列3"){
          this.DataMemory.openDay = this.openDay.toString()
        }
        this.$refs.XiuGaiShiJian.validate(valid => {
          if (valid) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_GengXinShiJianJiLu,
                this.DataMemory
              )
              .then(res => {
                this.$Message.success("编辑时间成功!");
                this.table.Refresh++;
                this.XiuGaiShiJianTC = false;
              })
              .catch(() => {});
          } else {
            this.$Message.error("请填写正确的用户信息!");
          }
        });
      }
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
    },
    sheZhiKaiJiang() {
      let data = [];
      Object.values(this.kaiJiangHaoMa).forEach((item, index) => {
        if (item !== "") {
          data.push(item);
        }
      });
      this.$refs.sheZhiKaiJiangHaoMa.validate(valid => {
        if (valid) {
          this.$root
            .HTTP_ALLLINKPOST(
              this.$root.HTTP_L.HTTP_SheZhiLiuHeCaiKaiJiangHaoMa,
              {
                issue: this.issue,
                number: data.toString()
              }
            )
            .then(res => {
              this.$Message.success(res.data.data);
              this.table.Refresh++;
            })
            .catch(() => {});
        } else {
          this.$Message.error("请填写正确的信息!");
        }
      });
    },
    batchUpdateLotteryTime() {
      /**
       * 批量修改除六合彩以外的时间
       * @param type<number> 1加时间 2 减时间
       * @param time<number>
       * @param lid<number>  彩种ID
       * @param tt 1开盘时间 	2封盘时间 	3开奖时间
       */
      this.batchTimeForm.type = this.batchTimeForm.time > 0 ? 1 : 2;
      this.batchTimeForm.lid = this.$route.query.lotteryId;
      this.batchTimeForm.time = Math.abs(this.batchTimeForm.time);

      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_BatchLotteryTime,
          this.batchTimeForm
        )
        .then(res => {
          this.batchTimeForm.time = 0;
          this.batchTimeForm.tt = 1;
          this.$root.modal('success', '', '修改成功！');
          this.table.Refresh++;
        })
    }
  }
};
</script>
<style scoped lang='less'>
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
.kaijiang.ivu-form-inline .ivu-form-item {
  vertical-align: middle !important;
  margin-bottom: 0;
  margin-left: 10px;
}
</style>