<template>
  <div class="content-main member-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div class="c_search_top" span="24">
          <Card dis-hover>
            <Form :model="searchParams" inline>
              <FormItem label="站点">
                <SiteNameSelect ref="SiteNameSelect" @listenOnChange="siteChange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
              </FormItem>
              <FormItem label="账号">
                <i-input v-model="searchParams.userName" type="text" style="width:150px" placeholder="多个请以,逗号隔开"></i-input>
              </FormItem>
              <FormItem :label-width="20">
                <Button type="primary" @click="SearchSubmit">查询</Button>
                <Button type="warning" @click="SearchRest">重置</Button>
              </FormItem>
            </Form>
          </Card>
        </div>
        <div class="c_search_result" span="24">
          <div class="serach">
            <div class="clearfix">
              <div class="fl">
                <Button @click="memberLevel=true;memberLock=false" :disabled="batchUserData.length==0">批量修改等级</Button>
                <Button @click="memberLock=true;memberLevel=false;" :disabled="batchUserData.length==0">批量锁定等级</Button>
              </div>
              <div v-show="memberLevel" class="fl middle">
                <LevelSelect ref="LevelSelect" :LevelSelectConf="LevelSelectOfMember" v-on:listenLevelChange="levelChange"></LevelSelect>
              </div>
              <div v-show="memberLevel" class="fl">
                <Button @click="batchModifyLevel" type="success">确定</Button>
                <Button @click="cancelBatch" type="error">取消</Button>
              </div>
              <div v-show="memberLock" class="fl middle">
                <RadioGroup v-model="batchLockForm.lock">
                  <Radio label="yes">锁定</Radio>
                  <Radio label="no">解锁</Radio>
                </RadioGroup>
              </div>
              <div v-show="memberLock" class="fl">
                <Button @click="batchModifyLock" type="success">确定</Button>
                <Button @click="cancelBatch" type="error">取消</Button>
              </div>
            </div>
            <Row style="margin: 10px 0;">
              <MyTable v-on:listenOnSortTable="$root.TableDataSort($event,table.dataform)" :table="Membertable" v-on:listenOnSelect="listenOnTableSelect"></MyTable>
            </Row>
            <Row style="margin-top:10px">
              <i-col span="24">
                <b>已选用户:</b>
                <span v-if="batchUserData.length<6">
                  <a style="margin:0 5px" href="javascript:" v-for="(m,i) in batchUserData" :key="i">{{m.userName}}</a>
                  共计 {{batchUserData.length}} 人
                </span>
                <span v-else>
                  <a href="javascript:">共计 {{batchUserData.length}} 人</a>
                </span>
              </i-col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from "@/mixins";

const SelectLevel = {
  props: ["levelArray", "row"],
  template: `
            <Select v-model="row.levelId" @on-change="ModifyLevel">
                <Option v-for="(level,i) in levelArray" :key="i" :value="level.levelLabel" :label="level.levelAlias"></Option>
            </Select>
            `,
  methods: {
    ModifyLevel(levelId) {
      console.log(this.levelArray);
      let target = this.levelArray.filter(
        item => item.levelLabel === levelId
      )[0];
      /**
       * 修改会员等级
       * @param siteId<number>
       * @param uid<Array> 会员uid
       * @param levelId<number>
       * @param levelName<number> 等级名称
       */
      let params = {
        siteId: this.row.siteId,
        ids: [this.row.uid],
        levelId: levelId,
        levelName: target.levelName
      };
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_PiLiangXiuGaiHuiYuanDengJi,
          params
        )
        .then(res => {
          this.$Modal.success({ title: "提示", content: "修改成功！" });
        })
        .catch(res => {});
    }
  }
};
export default {
  mixins: [mixins],
  data() {
    return {
      memberLevel: false,
      memberLock: false,
      showBatchModal: false,
      searchParams: {
        siteId: null,
        userName: null,
        flag: 1
      },
      batchUserData: [],
      batchLevelForm: {},
      batchLockForm: { lock: "yes" },
      Membertable: {
        //数据部分开始
        TableColumn: [
          {
            type: "selection",
            width: 40
          },
          {
            title: "所属代理",
            key: "agencyName",
            render: (h, params) => {
              return h('span',params.row.agencyName || "无");
            }
          },
          {
            title: "账号",
            key: "userName",
          },
          {
            title: "公司入款次数",
            key: "offlineDepositNumber",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "offline_deposit_count"
              );
              return h('span',text);
            }
          },
          {
            title: "公司入款总额",
            key: "offlineDepositAmount",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "offline_deposit_amount"
              );
              return h('span',text);
            }
          },
          {
            title: "线上入款次数",
            key: "onlineDepositNumber",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "online_deposit_count"
              );
              return h('span',text);
            }
          },
          {
            title: "线上入款总额",
            key: "onlineDepositAmount",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "online_deposit_amount"
              );
              return h('span',text);
            }
          },
          {
            title: "提款次数",
            key: "withdrawalsNumber",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "withdrawals_count"
              );
              return h('span',text);
            }
          },
          {
            title: "提款总额",
            key: "withdrawalsAmount",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "withdrawals_amount"
              );
              return h('span',text);
            }
          },
          {
            title: "总输赢",
            key: "netAmount",
            render: (h, params) => {
              let text = this.filterMemberTableDataVal(
                params.row.total_report,
                "net_amount"
              );
              return h('span',text);
            }
          },
          {
            title: "锁定",
            key: "lock",
            render: (h, params) => {
              let that = this;
              let type = params.row.lock === "yes" ? "locked" : "unlocked";
              let color = params.row.lock === "yes" ? "#aaa" : "#484f60";
              return h(
                "div",
                {
                  on: {
                    click() {
                      that.ModifyLock(params);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type,
                      color
                    },
                    style: {
                      fontSize: "22px",
                      cursor: "pointer"
                    }
                  })
                ]
              );
            }
          },
          {
            title: "层级",
            key: "levelName",
            render: (h, params) => {
              return h(SelectLevel, {
                props: {
                  levelArray: this.$refs.LevelSelect.levelList,
                  row: params.row
                }
              });
            }
          },
          {
            title: "日期",
            key: "statistics_time",
            width: 200,
            render: (h, params) => {
              if (params.row.total_report) {
                let text = this.$moment
                  .unix(
                    params.row.total_report.addTime
                  )
                  .format("YYYY-MM-DD hh:mm:ss");
                return h('span',text);
              } else {
                return h('span',"-");
              }
            }
          }
        ],
        TableData: {},
        loading: true,
        align: "center",
        Refresh: 0,
        dataform: {},
        selectAllcencle: true
      }
    };
  },
  methods: {
    filterMemberTableDataVal(obj, key) {
      if (obj === null || obj === undefined) {
        return "-";
      } else {
        return obj[key];
      }
    },
    siteChange(re) {
      if (re.SiteId) {
        this.searchParams.siteId = re.SiteId;
        this.batchLevelForm.siteId = re.SiteId;
        this.$refs.LevelSelect.getLevelById(re.SiteId,"MemberLevelModel");
      }
    },
    listenOnTableSelect(result) {
      this.batchUserData = result;
    },
    SearchSubmit() {
      this.batchUserData = [];
      let params = {};
      Object.assign(params, params, this.searchParams);
      if (params.userName.includes(",")) {
        params.userName = params.userName.split(",");
      } else {
        params.userName = [params.userName];
      }
      this.Membertable.posturl = this.$root.HTTP_L.HTTP_HuiYuanLieBiaoXinXi;
      this.Membertable.dataform = params;
    },
    SearchRest() {
      this.showBatchModal = true;
      this.searchParams.userName = "";
      this.memberLevel = false;
      this.memberLock = false;
      this.batchUserData = [];
      this.$refs.SiteNameSelect.InitData();
      this.SearchSubmit();
    },
    cancelBatch() {
      this.memberLevel = false;
      this.memberLock = false;
      this.batchUserData = [];
      this.Membertable.selectAllcencle = !this.Membertable.selectAllcencle;
    },
    levelChange(re) {
      this.batchLevelForm.levelId = re.levelLabel;
      this.batchLevelForm.levelName = re.levelName;
    },
    batchModifyLock() {
      /**
       * 批量锁定会员
       * @param uid 会员uid
       * @param lock yes/no
       */
      this.batchLockForm.uid = [];
      for (let Key in this.batchUserData) {
        this.batchLockForm.uid.push(this.batchUserData[Key].uid);
      }
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_Update_MemberLock,
          this.batchLockForm
        )
        .then(res => {
          this.$Modal.success({ title: "提示", content: "修改成功！" });
          this.Membertable.TableData.data.forEach(item => {
            this.$set(item, "lock", this.batchLockForm.lock);
          });
          // this.cancelBatch();
        })
    },
    batchModifyLevel() {
      /**
       * 批量修改会员等级
       * @param siteId<number>
       * @param uid<Array> 会员uid
       * @param levelId<number>
       * @param levelName<number> 等级名称
       */
      this.batchLevelForm.ids = [];
      for (let Key in this.batchUserData) {
        this.batchLevelForm.ids.push(this.batchUserData[Key].uid);
      }
      this.$root
        .HTTP_ALLLINKPOST(
          this.$root.HTTP_L.HTTP_PiLiangXiuGaiHuiYuanDengJi,
          this.batchLevelForm
        )
        .then(res => {
          this.$Modal.success({ title: "提示", content: "批量等级修改成功！" });
          this.Membertable.TableData.data.forEach((e, ind) => {
            this.batchUserData.forEach((mm, inde) => {
              if (mm.uid == e.uid) {
                this.$set(
                  this.Membertable.TableData.data[ind],
                  "levelId",
                  this.batchLevelForm.levelId
                );
              }
            });
          });
          // this.cancelBatch();
        })
    },
    ModifyLock(params) {
      /**
       * 锁定会员
       * @param uid 会员uid
       * @param lock yes/no
       */
      let lock = params.row.lock == "yes" ? "no" : "yes";
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Update_MemberLock, {
          uid: [params.row.uid],
          siteId: params.row.siteId,
          lock: lock
        })
        .then(res => {
          this.$Modal.success({ title: "提示", content: "修改成功！" });
          this.$set(
            this.Membertable.TableData.data[params.index],
            "lock",
            lock
          );
        })
        .catch(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
.fl{
  float: left;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
}
.middle{
  margin: 0 31px;
}
</style>


