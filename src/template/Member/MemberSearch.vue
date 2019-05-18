
<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <i-col class="c_search_top" span="24" class-name="member">
          <Card dis-hover>
            <Form ref="search" :model="search" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="等级">
                <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" v-on:listenLevelChange="levelChange"></LevelSelect>
              </FormItem>
              <FormItem label="账号">
                <Input type="text" style="width:140px" v-model="search.userName" placeholder="多个请以,逗号隔开"></Input>
              </FormItem>
              <FormItem label="姓名">
                <Input v-model="search.realName" style="width:100px" placeholder="真实姓名"></Input>
              </FormItem>
              <FormItem label="所属代理">
                <Input type="text" style="width:100px" v-model="search.agencyName" placeholder="最小长度5位"></Input>
              </FormItem>
              <FormItem label="日期">
                <DatePicker type="daterange" confirm v-model="Time" format="yyyy-MM-dd" placeholder="请选择日期" style="width:215px"></DatePicker>
              </FormItem>
              <FormItem label="状态">
                <Select placeholder="选择" clearable v-model="search.status" style="width: 80px">
                  <Option value="yes">启用</Option>
                  <Option value="no">停用</Option>
                  <Option value="online">在线</Option>
                  <Option value="catch">异常</Option>
                </Select>
              </FormItem>
              <FormItem>
                <Button :type="iSJinJieSouSuo?'info':'default'" @click="openJinJieSouSuo">进阶搜寻</Button>
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button @click="SearchRest" type="warning">重置</Button>
              </FormItem>
            </Form>

            <Collapse>
              <Panel name="more">
                <span>进阶搜寻</span>
                <Form slot="content" :model="JinJieSouSuoForm" label-position="left" inline>
                  <FormItem label="账户余额" class="form-group w125">
                    <Input v-model="JinJieSouSuoForm.startBalance.value" style="width:80px" placeholder="元"></Input>
                    <span class="xian">-</span>
                    <Input v-model="JinJieSouSuoForm.endBalance.value" style="width:80px" placeholder="元"></Input>
                  </FormItem>
                  <FormItem label="注册IP" class="form-group w60">
                    <Input v-model="JinJieSouSuoForm.createIp.value" style="width: 176px"></Input>
                  </FormItem>
                  <FormItem label="上次登入IP" class="form-group w92">
                    <Input v-model="JinJieSouSuoForm.lastIp.value" placeholder="上次登录IP" style="width: 176px"></Input>
                  </FormItem>
                  <FormItem label="历史IP" class="form-group w60">
                    <Input v-model="JinJieSouSuoForm.ip.value" placeholder="历史IP" style="width: 176px"></Input>
                  </FormItem>
                  <FormItem label="最后登录平台" class="form-group w125">
                    <Input v-model="JinJieSouSuoForm.lastGamePlatform.value" placeholder="最后登录的平台" style="width: 180px"></Input>
                  </FormItem>
                  <FormItem label="手机" class="form-group w60">
                    <Input v-model="JinJieSouSuoForm.phone.value" style="width: 140px"></Input>
                    <RadioGroup v-model="JinJieSouSuoForm.phone.bh">
                      <Radio label="完全"></Radio>
                      <Radio label="包含"></Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="Email" class="form-group w92">
                    <Input v-model="JinJieSouSuoForm.email.value" style="width: 140px"></Input>
                    <RadioGroup v-model="JinJieSouSuoForm.email.bh">
                      <Radio label="完全"></Radio>
                      <Radio label="包含"></Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="微信号" class="form-group w60">
                    <Input v-model="JinJieSouSuoForm.wechat.value" style="width: 140px"></Input>
                    <RadioGroup v-model="JinJieSouSuoForm.wechat.bh">
                      <Radio label="完全"></Radio>
                      <Radio label="包含"></Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem label="最后登录客户端" class="form-group w125">
                    <Select placeholder="选择" clearable v-model="JinJieSouSuoForm.lastDevice.value" style="width: 180px">
                      <Option value="pc">pc</Option>
                      <Option value="mac">mac</Option>
                      <Option value="android">安卓</Option>
                      <Option value="iphone">苹果</Option>
                      <Option value="ipad">ipad</Option>
                      <Option value="android_tablet">安卓平板</Option>
                      <Option value="other">其他</Option>
                    </Select>
                  </FormItem>
                </Form>
              </Panel>
            </Collapse>
          </Card>
        </i-col>
        <i-col class="c_search_result" span="24">
          <div class="serach">
            <div class="have_con">
              <div class="data_sj">
                <div class="caozuo_btn">
                  <Button type="primary" @click="$router.push({name:'MemberCreate'})">添加会员</Button>
                  <FundsOperate ref="FundsOperate" @FundsOperate="FundsOperateSuccess"></FundsOperate>
                </div>
                <div style="margin: 10px 0;">
                  <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" :table="table" @listenOnExpand="expand($event)"></MyTable>
                </div>
              </div>
            </div>
          </div>
        </i-col>
      </div>
    </div>

    <Modal class-name="vertical-center-modal" v-model="JinJieSouSuo" width="580px" title="进阶搜索" @on-ok="JinJieSouSuo=false;SearchSubmit()">
      <Form :model="JinJieSouSuoForm" :label-width="140" label-position="right">
        <FormItem label="账户余额" class="form-group">
          <Input v-model="JinJieSouSuoForm.startBalance.value" style="width:116px" placeholder="元"></Input>
          <span class="xian">-</span>
          <Input v-model="JinJieSouSuoForm.endBalance.value" style="width:116px" placeholder="元"></Input>
        </FormItem>
        <FormItem label="注册IP" class="form-group">
          <Input v-model="JinJieSouSuoForm.createIp.value" style="width: 260px"></Input>
        </FormItem>
        <FormItem label="上次登入IP" class="form-group">
          <Input v-model="JinJieSouSuoForm.lastIp.value" placeholder="上次登录IP" style="width: 260px"></Input>
        </FormItem>
        <FormItem label="历史IP" class="form-group">
          <Input v-model="JinJieSouSuoForm.ip.value" placeholder="历史IP" style="width: 260px"></Input>
        </FormItem>
        <FormItem label="最后登录的平台" class="form-group">
          <Input v-model="JinJieSouSuoForm.lastGamePlatform.value" placeholder="最后登录的平台" style="width: 260px"></Input>
        </FormItem>
        <FormItem label="最后登录客户端" class="form-group">
          <Select placeholder="选择" clearable v-model="JinJieSouSuoForm.lastDevice.value" style="width: 260px">
            <Option value="pc">pc</Option>
            <Option value="mac">mac</Option>
            <Option value="android">安卓</Option>
            <Option value="iphone">苹果</Option>
            <Option value="ipad">ipad</Option>
            <Option value="android_tablet">安卓平板</Option>
            <Option value="other">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="手机" class="form-group">
          <Input v-model="JinJieSouSuoForm.phone.value" style="width: 260px"></Input>
          <RadioGroup v-model="JinJieSouSuoForm.phone.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Email" class="form-group">
          <Input v-model="JinJieSouSuoForm.email.value" style="width: 260px"></Input>
          <RadioGroup v-model="JinJieSouSuoForm.email.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="微信号" class="form-group">
          <Input v-model="JinJieSouSuoForm.wechat.value" style="width: 260px"></Input>
          <RadioGroup v-model="JinJieSouSuoForm.wechat.bh">
            <Radio label="完全"></Radio>
            <Radio label="包含"></Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
    <Modal :scrollable="true" title="会员打码详情" v-model="BetAmountCheckModal" width="750">
      <div class="scroll-bar-y" :style="{height:betAmountObj.list.length>12?'400px':'',position:'relative'}">
        <Spin size="small" fix v-if="betSpin"></Spin>
        <table class="table">
          <thead>
            <tr>
              <th>账号</th>
              <th>类型</th>
              <th>金额</th>
              <th>需要的打码倍数</th>
              <th>打码量</th>
              <th>累积所需打码量</th>
              <th class="w165">时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in betAmountObj.list" :key="i">
              <td>{{betAmountObj.userName}}</td>
              <td>{{item.type}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.multiple}}</td>
              <td>{{item.betAmount}}</td>
              <td>{{item.needBetAmount}}</td>
              <td class="w165">{{$moment.unix(item.time).format("LLL")}}</td>
            </tr>
            <tr v-if="betAmountObj.list.length">
              <td>统计</td>
              <td colspan="6">
                <span>
                  <b>最后需要的打码量：</b>{{betAmountObj.needTotal.toFixed(2)}}</span>
                <span style="margin: 0 15px;">
                  <b>现有打码量：</b>{{betAmountObj.currentTotal.toFixed(2)}}</span>
                <span>
                  <b>是否满足提款要求：</b>
                  <span :style="{color:betAmountObj.needTotal>betAmountObj.currentTotal?'red':'green'}">{{betAmountObj.needTotal>betAmountObj.currentTotal?"否":"是"}}</span>
                </span>
              </td>
            </tr>
            <tr v-else>
              <td colspan="7">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import mixins from "@/mixins";
import deviceIcons from "@/local/deviceIcons";
import load_png from '../../assets/imgs/loading.gif';
import FundsOperate from "./components/FundsOperate";
import MemberLoginHistory from "@/template/my-components/MemberLoginHistory";

const TableMore = {
  components: { MemberLoginHistory },
  template: `
  <div class='table_more_data'>
  <div class="agency-path"><b>代理路径：</b>{{row.agencyPath}}</div> 
    <ul class="clearfix">
        <li><b>上次登陆域名：</b>{{row.lastDomain?row.lastDomain:'暂无信息'}}</li>
        <li><b>公司入款总额：</b>{{memberDetail?memberDetail.offline_deposit_amount:"暂无信息"}}</li>
        <li><b>提款总额：</b>{{memberDetail?memberDetail.withdrawals_amount:"暂无信息"}}</li>
        <li><b>线上入款总额：</b>{{memberDetail?memberDetail.online_deposit_amount:"暂无信息"}}</li>
        <li><b>红利返水总额：</b>{{memberDetail?memberDetail.bonus_amount:"暂无信息"}}</li>

        <li><b>上次登陆设备：</b>{{row.lastDevice}}</li>
        <li><b>公司入款次数：</b>{{memberDetail?memberDetail.offline_deposit_count:"暂无信息"}}</li>
        <li><b>提款次数：</b>{{memberDetail?memberDetail.withdrawals_count:"暂无信息"}}</li>
        <li><b>线上入款次数：</b>{{memberDetail?memberDetail.online_deposit_count:"暂无信息"}}</li>
        <li><b>红利返水次数：</b>{{memberDetail?memberDetail.bonus_count:"暂无信息"}}</li>

        <li><b>上次登陆时间：</b>{{$moment.unix(row.lastTime-0).format("YYYY-MM-DD HH:mm:ss")}}</li>
        <li><b>有效投注金额：</b>{{memberDetail?memberDetail.valid_bet_amount:"暂无信息"}}</li>
        <li><b>赢利：</b>{{memberDetail?memberDetail.profit:"暂无信息"}}</li>
        <li><b>下注输赢：</b>{{memberDetail?memberDetail.net_amount:"暂无信息"}}</li>
        <li><b>历史登陆：</b><a href="javascript:;" @click="getMemberHistory()">历史记录</a></li>

        <li><b>上次登录地址：</b>{{row.ips.join('-')}}</li>
        <li><b>投注单量：</b>{{memberDetail?memberDetail.bet_count:"暂无信息"}}</li>
        <li><b>赢率：</b>{{memberDetail?memberDetail.proportion:"暂无信息"}}</li>
        <li><b>返点比例：</b>{{row.rebate}}</li>
        <li><b>最后统计时间：</b>{{memberDetail?$moment.unix(memberDetail.addTime).format("YYYY-MM-DD HH:mm:ss"):"暂无信息"}}</li>
    </ul>
    <div class="remark"><b>备注：</b>{{row.remark?row.remark:"暂无信息"}}</div>
    <MemberLoginHistory ref="MemberLoginHistory" :data="memberHistoryData"></MemberLoginHistory>
    </div>
    `,
  props: {
    row: Object,
    memberDetail: Object
  },
  computed: {
    memberHistoryData() {
      return {
        url: this.$root.HTTP_L.HTTP_Get_MemberHistory,
        params: {
          siteId: this.row.siteId,
          uid: this.row.uid
        }
      };
    },
    statistics() {
      return this.row.along_finance_statistics_member;
    }
  },
  methods: {
    getMemberHistory() {
      this.$refs.MemberLoginHistory.fetchData();
    }
  }
};
export default {
  name: "Member",
  mixins: [mixins],
  components: {
    FundsOperate
  },
  data() {
    return {
      ExcelPostParams: null, //导出excel需要传输的数据
      iSJinJieSouSuo: false,
      BetAmountCheckModal: false,
      betSpin: false,
      betAmountObj: { list: [] },
      search: {
        userName: "",
        levelId: "",
        startTime: "",
        endTime: "",
        status: "",
        refundLevelId: "",
        agencyName: "",
        siteId: "",
        realName: ""
      },
      JinJieSouSuo: false,
      JinJieSouSuoForm: {
        phone: { value: "", bh: "完全" },
        email: { value: "", bh: "完全" },
        wechat: { value: "", bh: "完全" },
        createIp: { value: "" },
        lastIp: { value: "" },
        ip: { value: "" },
        startBalance: { value: "" },
        endBalance: { value: "" },
        lastGamePlatform: { value: "" },
        lastDevice: { value: "" },
      },
      popShow: false,
      moneyLoading: false,
      memberDetailList:[],
      table: {
        // 数据部分开始
        TableColumn: [
          {
            title: "站点",
            key: "siteName",
            width: 80,
          },
          {
            title: "所属代理",
            key: "agencyName",
            render: (h, params) => {
              return h('span',params.row.agencyName ? params.row.agencyName : "无");
            }
          },
          {
            title: "等级",
            key: "levelId",
            width: 100,
            sortable: "custom",
            render: (h, params) => {
              return h('span',this.levelFilter(params.row.levelId, params.row.levelName));
            }
          },
          {
            title: "账号",
            key: "userName",
            width: 150,
            align: "center",
            sortable: "custom",
            render: (h, params) => {
              let that = this;
              let iconColor =
                params.row.online !== "no" ? "#19be6b" : "#ed3f14";
              let type = deviceIcons[params.row.online];
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "right-start"
                    },
                    style: {
                      height: "27px",
                      lineHeight: "27px"
                    }
                  },
                  [
                    h("Icon", {
                      props: {
                        type: "social-vimeo",
                        color: "#ffeb3b"
                      },
                      style: {
                        fontSize: "12px",
                        verticalAlign: "middle",
                        display:
                          params.row.agencyId === 0 ? "inline-block" : "none"
                      }
                    }),
                    h(
                      "a",
                      {
                        style: {
                          display: "inline-block",
                          width: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          verticalAlign: "middle",
                          color: params.row.balance * 1 < 0 ? "red" : ""
                        },
                        on: {
                          click() {
                            that.BetAmountCheck(params);
                          }
                        }
                      },
                      params.row.userName
                    ),
                    h("Icon", {
                      props: {
                        type: type,
                        color: iconColor
                      },
                      style: {
                        width: "20px",
                        fontSize: params.row.online !== "no" ? "20px" : "5px",
                        verticalAlign: "middle"
                      }
                    }),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      [
                        h("p", params.row.userName),
                        h(
                          "p",
                          params.row.online == "no"
                            ? "离线"
                            : `${
                                params.row.online === "other"
                                  ? "其他设备"
                                  : params.row.online
                              }在线`
                        ),
                        h("p", params.row.balance * 1 < 0 ? "异常用户" : "")
                      ]
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "姓名",
            key: "realName",
            render: (h, params) => {
              return h('span',params.row.realName ? params.row.realName : "无");
            }
          },
          {
            title: "余额",
            key: "balance",
            sortable: "custom",
            render: (h, params) => {
              return h(
                "span",
                {
                  style: {
                    color: params.row.balance * 1 < 0 ? "red" : ""
                  }
                },
                (params.row.balance - 0).toFixed(2)
              );
            }
          },
          {
            title: "第三方余额",
            key: "wallet",
            render: (h, params) => {
              let that = this;
              params.row["wallet"].last.name =
                params.row["wallet"].last.name === "WALLET"
                  ? "钱包"
                  : params.row["wallet"].last.name;
              return h("div", {}, [
                h(
                  "Tooltip",
                  {
                    props: {
                      placement: "top"
                    }
                  },
                  [
                    h(
                      "span",
                      {
                        style: { color: "#2d8cf0", cursor: "pointer" }
                      },
                      params.row["wallet"].last.name +
                        ":" +
                        (params.row["wallet"].last.balance * 1).toFixed(2)
                    ),
                    h(
                      "div",
                      {
                        slot: "content",
                        style: {
                          zIndex: 999,
                          whiteSpace: "normal"
                        }
                      },
                      [
                        h(
                          "p",
                          {
                            style: {
                              cursor: "pointer",
                              height: "30px",
                              lineHeight: "30px",
                              borderBottom: "1px solid #fff",
                              marginBottom: "5px",
                              display: params.row["wallet"].platfromBalance
                                .length
                                ? "block"
                                : "none"
                            }
                          },
                          [
                            h(
                              "span",
                              {
                                on: {
                                  click() {
                                    that.transformMoney(params, "recycle");
                                  }
                                }
                              },
                              [
                                h("Icon", {
                                  props: {
                                    type: "shuffle"
                                  },
                                  style: {
                                    margin: "0 3px",
                                    fontSize: "15px"
                                  }
                                }),
                                h("span", {}, "转回")
                              ]
                            ),
                            h("span", {
                              style: {
                                display: "inline-block",
                                margin: "0 5px",
                                width: "2px",
                                height: "15px",
                                background: "rgb(255, 255, 255,.5)"
                              }
                            }),
                            h(
                              "span",
                              {
                                on: {
                                  click() {
                                    that.transformMoney(params, "refresh");
                                  }
                                }
                              },
                              [
                                h("Icon", {
                                  props: {
                                    type: "refresh"
                                  },
                                  style: {
                                    margin: "0 3px",
                                    fontSize: "15px"
                                  }
                                }),
                                h("span", {}, "刷新")
                              ]
                            )
                          ]
                        ),
                        h(
                          "p",
                          params.row["wallet"].platfromBalance.length <= 0
                            ? "无信息"
                            : params.row["wallet"].platfromBalance.map(
                                (item, index) => {
                                  return h(
                                    "div",
                                    {
                                      style: {
                                        cursor: "pointer",
                                        paddingTop: "3px",
                                        paddingBottom: "3px",
                                        borderBottom: "1px dotted #e9eaec23",
                                        textAlign: "right"
                                      }
                                    },
                                    [
                                      h(
                                        "span",
                                        {
                                          style: {
                                            marginRight: !that.moneyLoading
                                              ? "15px"
                                              : "0"
                                          }
                                        },
                                        item.platformName +
                                          ":" +
                                          item.playerBalance
                                      ),
                                      h("i", {
                                        style: {
                                          marginLeft: "5px",
                                          width: "10px",
                                          height: "10px",
                                          background: `url(${load_png})`,
                                          backgroundSize: "cover",
                                          display: that.moneyLoading
                                            ? "inline-block"
                                            : "none"
                                        }
                                      })
                                    ]
                                  );
                                }
                              )
                        )
                      ]
                    )
                  ]
                )
              ]);
            }
          },
          {
            title: "注册IP",
            key: "createIp",
            width: 150,
          },
          {
            title: "注册时间",
            key: "created_at",
            width: 180,
            sortable: "custom",
            render: (h, params) => {
              return h('span',this.$moment.unix(params.row.created_at).format("LLL"));
            }
          },
          {
            title: "锁定",
            key: "lock",
            width: 85,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ['params'],
                data(){
                  return {
                    popShow: false
                  }
                },
                template:`
                  <Poptip v-model="popShow">
                      <Button
                      type="text" 
                      size="small" 
                      @click="popShow=true"
                      >
                        <Icon v-if="params.row.lock === 'yes'" type="locked" color="#bbbec4" size="22"></Icon>
                        <Icon v-else type="unlocked" color="#484f60" size="22"></Icon>
                      </Button>
                      <div slot="content" style="font-size:14px;">
                        <p style="margin-bottom:10px;width:164px;">
                          <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                          <span v-if="params.row.lock === 'no'">锁定的会员不能享受平台的自动优惠和自动晋级，只能人工调节等级</span>
                          <span v-else>你确定要解锁该会员吗?</span>
                        </p>
                        <Button type="text" @click="popShow=false">取消</Button>
                        <Button type="primary" size="small" @click="runModify(params)">确定</Button>
                      </div>
                  </Poptip>`,
                methods: {
                  runModify(table){
                    this.popShow = false;
                    that.ModifyLock(table);
                  }
                }
              }
              return h(Template,{
                props: {
                  params: params
                }
              })
            }
          },
          {
            title: "状态",
            key: "status",
            width: 90,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ['params'],
                data(){
                  return {
                    popShow: false
                  }
                },
                template:`
                  <Poptip v-model="popShow">
                      <Button
                      :type="params.row.status == 'yes' ? 'success' : 'error'" 
                      size="small" 
                      @click="popShow=true"
                      >{{params.row.status == "yes" ? "启用" : "停用"}}</Button>
                      <div slot="content" style="font-size:14px;">
                        <div style="margin-bottom:10px;">
                          <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                          <span>你确定要{{params.row.status == "yes" ? "停用" : "启用"}}该会员吗?</span>
                        </div>
                        <Button type="text" @click="popShow=false">取消</Button>
                        <Button type="primary" size="small" @click="runModify(params)">确定</Button>
                      </div>
                  </Poptip>`,
                methods: {
                  runModify(table){
                    this.popShow = false;
                    that.ModifyMemberStatus(table);
                  }
                }
              }
              return h(Template,{
                props: {
                  params: params
                }
              })
            }
          },
          {
            title: "返水",
            key: "refundBonus",
            width: 90,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ['params'],
                data(){
                  return {
                    popShow: false
                  }
                },
                template:`
                  <Poptip v-model="popShow">
                      <Button
                      :type="params.row.refundBonus == 'yes' ? 'primary' : 'error'" 
                      size="small" 
                      @click="popShow=true"
                      >{{params.row.refundBonus == "yes" ? "开启" : "关闭"}}</Button>
                      <div slot="content" style="font-size:14px;">
                        <div style="margin-bottom:10px;">
                          <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                          <span>你确定要{{params.row.refundBonus == "yes" ? "关闭" : "开启"}}该会员的返水吗?</span>
                        </div>
                        <Button type="text" @click="popShow=false">取消</Button>
                        <Button type="primary" size="small" @click="runModify(params)">确定</Button>
                      </div>
                  </Poptip>`,
                methods: {
                  runModify(table){
                    this.popShow = false;
                    that.ModifyRefundBonus(table);
                  }
                }
              }
              return h(Template,{
                props: {
                  params: params
                }
              })
            }
          },
          {
            title: "操作",
            key: "",
            width: 160,
            render: (h, params) => {
              let that = this;
              const Template = {
                props: ["row"],
                data(){
                  return{
                    popShow: false
                  }
                },
                template: `
                  <div>
                    <Poptip v-model="popShow">
                        <Button v-show="row.is_agency===0" size="small" @click="popShow=true">晋升</Button>
                        <div slot="content" style="font-size:14px;">
                          <div style="margin-bottom:10px;">
                            <Icon type="ios-help" size="16" color="#ff9900"></Icon>
                            <span>你确定要晋升该会员吗?</span>
                          </div>
                          <Button type="text" @click="popShow=false">取消</Button>
                          <Button type="primary" size="small" @click="runPromotedAgency(row.uid,row.siteId)">确定</Button>
                        </div>
                    </Poptip>
                    <Button size="small" @click="runGoDetails(row.uid,row.levelId,row.siteId)">详情</Button>
                    <Button size="small" @click="runGoMemberCreate(row.uid,row.siteId)">编辑</Button>
                  </div>`,
                methods: {
                  runPromotedAgency(uid,siteId){
                    this.popShow = false;
                    that.promotedAgency(uid,siteId);
                  },
                  runGoDetails(uid,levelId,siteId){
                    that.goDetails(uid,levelId,siteId);
                  },
                  runGoMemberCreate(uid,siteId){
                    that.goMemberCreate(uid,siteId);
                  }
                }
              }
              return h(Template,{
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            type: "expand",
            title: "...",
            align: "center",
            width: 40,
            render: (h, params) => {
              return h(TableMore, {
                props: {
                  row: params.row,
                  memberDetail: this.memberDetailList[params.index]
                }
              });
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        posturl: this.$root.HTTP_L.HTTP_HuiYuanLieBiaoXinXi,
        Refresh: 0,
        dataform: {
          isRules: "select",
          siteId: JSON.parse(localStorage.AllSiteNameList)[0].id
        },
        selectAllcencle: true
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.resetParams();
      vm.checkMemberCount();
      vm.memberCountSearch();
    });
  },
  methods: {
    promotedAgency(uid,siteId){
      let params = { id: uid, siteId:siteId};
      let url = this.$root.HTTP_L.HTTP_MemberPromotedAgency;
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal('success','','晋升成功！');
        this.table.Refresh++;
      })
    },
    goDetails(uid,levelId,siteId){
      this.$router.push({
        name: "MemberUser",
        query: {
          id: uid,
          levelId: levelId || 1,
          siteId: siteId
        }
      });
    },
    goMemberCreate(uid,siteId){
      this.$router.push({
        name: "MemberCreate",
        query: {
          id: uid,
          siteId: siteId,
          isVerify: true
        }
      });
    },
    checkMemberCount() {
      if (Object.keys(this.$route.params).length > 0) {
        Object.assign(this.search, this.search, this.$route.params);
        const { levelId, siteId } = this.$route.params;
        this.$refs.SiteNameSelect.setDefaultSite(siteId);
        this.$refs.LevelSelect.setDefaultLevel(levelId);
        this.SearchSubmit();
      }
    },
    resetParams() {
      for (let key in this.search) {
        if (key !== "siteId") {
          this.search[key] = "";
        }
      }
    },
    FundsOperateSuccess() {
      this.table.Refresh++;
    },
    openJinJieSouSuo() {
      this.JinJieSouSuo = true;
      this.JinJieSouSuoForm = {
        phone: { value: "", bh: "完全" },
        email: { value: "", bh: "完全" },
        wechat: { value: "", bh: "完全" },
        createIp: { value: "" },
        lastIp: { value: "" },
        ip: { value: "" },
        startBalance: { value: "" },
        endBalance: { value: "" },
        lastGamePlatform: { value: "" },
        lastDevice: { value: "" }
      };
    },
    siteChange(re) {
      this.search.siteId = "";
      if (re.SiteId) {
        this.siteName = re.SiteName;
        this.search.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId, "MemberLevelModel");
      }
    },
    SearchRest() {
      this.Time = ["", ""];
      this.search = {
        userName: "",
        levelId: "",
        startTime: "",
        endTime: "",
        status: "",
        refundLevelId: "",
        agencyName: "",
        siteId: this.defaultSiteId,
        realName: ""
      };
      this.JinJieSouSuoForm = {
        phone: { value: "", bh: "完全" },
        email: { value: "", bh: "完全" },
        wechat: { value: "", bh: "完全" },
        createIp: { value: "" },
        lastIp: { value: "" },
        ip: { value: "" },
        startBalance: { value: "" },
        endBalance: { value: "" },
        lastGamePlatform: { value: "" },
        lastDevice: { value: "" },
      };
      this.$refs.LevelSelect.setDefaultLevel("");
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    SearchSubmit() {
      let params = {
        /**
         * 最后需要传输的数据
         * like模糊查询
         */
        "like[phone]": "",
        "like[email]": "",
        "like[wechat]": "",
        "like[userName]": [],
        "like[realName]": ""
      };
      if (this.Time[0] && this.Time[1]) {
        this.search.startTime = this.$moment(this.Time[0]).format("L");
        this.search.endTime = this.$moment(this.Time[1]).format("L");
      }

      for (let key in this.search) {
        if (this.search[key] !== "") {
          switch (key) {
            case "startTime":
              params["startTime"] = this.search["startTime"];
              break;
            case "endTime":
              params["endTime"] = this.search["endTime"];
              break;
            case "userName":
              if (this.search["userName"].indexOf(",") > -1) {
                //多个传userName，只能输入精确账号进行查询
                let arr = this.search["userName"].split(",");
                params["userName"] = arr;
              } else {
                //单个传like[userName],可进行模糊查询
                params["like[userName]"] = this.search.userName;
              }
              break;
            case "realName":
              params["like[realName]"] = this.search.realName;
              break;
            default:
              params[key] = this.search[key];
              break;
          }
        }
      }

      for (let key in this.JinJieSouSuoForm) {
        if (
          this.JinJieSouSuoForm[key].value !== "" &&
          this.JinJieSouSuoForm[key].value.length > 0 &&
          typeof this.JinJieSouSuoForm[key] === "object"
        ) {
          if (this.JinJieSouSuoForm[key].bh === "包含") {
            switch (key) {
              case "phone":
                params["like[phone]"] = this.JinJieSouSuoForm.phone.value;
                break;
              case "email":
                params["like[email]"] = this.JinJieSouSuoForm.email.value;
                break;
              case "wechat":
                params["like[wechat]"] = this.JinJieSouSuoForm.wechat.value;
                break;
            }
          } else {
            params[key] = this.JinJieSouSuoForm[key].value;
          }
        }
      }
      for (let key in params) {
        if (params[key].length == 0) {
          delete params[key];
        }
      }

      if (params.agencyName && params.agencyName.length < 5) {
        this.$Modal.error({
          title: "提示",
          content: "所属代理长度最小5位"
        });
        return false;
      }
      if (Object.keys(params).length > 0) {
        this.table.dataform = JSON.parse(JSON.stringify(params));
        this.ExcelPostParams = params;
        this.ExcelPostParams.excel = 1;
      }
    },
    BetAmountCheck(params) {
      this.betSpin = true;
      this.betAmountObj.list = [];
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_BetAmountCheck, {
          uid: params.row.uid,
          siteId: params.row.siteId
        })
        .then(res => {
          this.betAmountObj.list = res.data.data;
          this.betAmountObj.userName = params.row.userName;
          this.betAmountObj.needTotal = 0;
          this.betAmountObj.currentTotal = 0;
          this.betAmountObj.list.forEach((item, index) => {
            if (index === this.betAmountObj.list.length - 1) {
              this.betAmountObj.needTotal = item.needBetAmount * 1;
              this.betAmountObj.currentTotal = item.betAmount * 1;
            }
          });
          this.BetAmountCheckModal = true;
          this.betSpin = false;
        });
    },
    ModifyRefundBonus(table) {
      let refundBonus = table.row.refundBonus == "yes" ? "no" : "yes";
      let url = this.$root.HTTP_L.HTTP_Update_MemberRefundStatus;
      let params = {
        id: table.row.uid,
        siteId: table.row.siteId,
        refundBonus: refundBonus
      }
      this.$root.HTTP_ALLLINKPOST( url, params)
      .then(res => {
        this.$root.modal("success","","修改返水状态成功！");
        this.$set(
          this.table.TableData.data[table.index],
          "refundBonus",
          refundBonus
        );
        table.row.refundBonus = refundBonus;
      })
    },
    ModifyLock(table) {
      let lock = table.row.lock == "yes" ? "no" : "yes";
      let url = this.$root.HTTP_L.HTTP_Update_MemberLock;
      let params = {
        uid: [table.row.uid],
        siteId: table.row.siteId,
        lock: lock
      }
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal("success","","修改成功！");
        this.$set(this.table.TableData.data[table.index], "lock", lock);
        table.row.lock = lock;
      })
    },
    ModifyMemberStatus(table) {
      let status = table.row.status == "yes" ? "no" : "yes";
      let url = this.$root.HTTP_L.HTTP_XiuGaiHuiYuanZhuangTai;
      let params = {
        siteId: table.row.siteId,
        id: table.row.uid,
        status: status
      }
      this.$root.HTTP_ALLLINKPOST(url, params)
      .then(res => {
        this.$root.modal("success","","修改状态成功！！");
        this.$set(
          this.table.TableData.data[table.index],
          "status",
          status
        );
        table.row.status = status;
      })
    },
    transformMoney(params, type) {
      let that = this;
      this.moneyLoading = true;
      let sendParams = {
        siteId: params.row.siteId,
        uid: params.row.uid
      };
      let httpUrl;
      if (type == "recycle") {
        httpUrl = this.$root.HTTP_L.HTTP_balanceRecycle; //回收余额
        this.$Modal.confirm({
          title: "提示",
          loading: true,
          content: "您确定回收该用户的第三方余额吗？",
          onOk: () => {
            http();
          }
        });
      } else {
        httpUrl = this.$root.HTTP_L.HTTP_refreshBalance; //刷新余额
        http();
      }
      function http() {
        that.$root.HTTP_ALLLINKPOST(httpUrl, sendParams).then(res => {
          that.moneyLoading = false;
          if (type == "recycle") that.$Modal.remove();
          const { platfromBalance, balance } = res.data.data;
          that.$set(
            that.table.TableData.data[params.index],
            "balance",
            balance
          );
          params.row.balance = balance;
          that.$set(
            that.table.TableData.data[params.index].wallet,
            "platfromBalance",
            platfromBalance
          );
          params.row.wallet.platfromBalance = platfromBalance;
        });
      }
    },
    expand(v){
      // console.log(v)
      if(v.status){
        this.$root.HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_SingleMember,{siteId:v.row.siteId,uid:v.row.uid}).then(res => {
          this.$set(this.memberDetailList,v.row.index,res.data.data)
        })
      }
    }
  }
};
</script>
<style lang='less' scoped>
.member-main {
  .form-group {
    /deep/.ivu-form-item-label {
      display: inline-block;
    }
    &.w60 {
      width: 24%;
      /deep/.ivu-form-item-label {
        width: 60px;
      }
    }
    &.w92 {
      width: 26%;
      /deep/.ivu-form-item-label {
        width: 92px;
      }
    }
    &.w125 {
      width: 22%;
      /deep/.ivu-form-item-label {
        width: 125px;
      }
    }
  }
  .member {
    /deep/.ivu-collapse {
      background-color: transparent;
      border: none;
    }
    /deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
      height: 20px;
      line-height: 20px;
      padding-left: 0;
    }
    /deep/.ivu-collapse-content {
      padding: 0;
      background-color: transparent;
    }
    /deep/.ivu-collapse-content > .ivu-collapse-content-box {
      padding-top: 10px;
      padding-bottom: 0;
    }
  }
}
.table {
  width: 100%;
  th,
  td {
    text-align: center;
    // padding: 0;
  }
  // .w74{
  //   width: 74px;
  // }
  // .w100{
  //   width: 100px;
  // }
  // .w165{
  //   width: 165px;
  // }
}
.member {
  .ivu-form-inline .ivu-form-item {
    margin-right: 5px;
  }
}
</style>
