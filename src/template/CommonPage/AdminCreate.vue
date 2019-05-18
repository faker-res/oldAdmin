<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div>
          <Form
            ref="CreatAdminForm"
            :model="CreatAdminForm"
            :rules="CreatAdminFormRules"
            :label-width="210"
          >
            <FormItem label="创建人" prop="createUserName">
              <i-input
                placeholder="请输入管理员用户名"
                :disabled="true"
                v-model="$root.adminuserinfo.adminUserName"
                style="width:260px"
              ></i-input>
            </FormItem>

            <FormItem label="管理员用户名" prop="userName">
              <i-input
                placeholder="请输入管理员用户名"
                v-model="CreatAdminForm.userName"
                style="width:260px"
                :disabled="$route.query.isVerify ? true : false"
              ></i-input>
            </FormItem>

            <FormItem :label="$route.query.isVerify ? '修改管理员密码' : '管理员密码'" prop="password">
              <i-input
                type="password"
                placeholder="请输入管理员密码"
                v-model="CreatAdminForm.password"
                style="width:260px"
              ></i-input>
            </FormItem>

            <FormItem label="管理员角色" prop="roleName">
              <CheckboxGroup v-model="roleName">
                <Checkbox v-for="(item,i) in roleNameList" :key="i" :label="item.id">{{item.title}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            
            <FormItem label="站点" prop="siteId">
              <SiteNameSelect
                v-show="!AllSiteSelect"
                ref="SiteNameSelect"
                @listenOnChange="siteChange"
                :SiteNameSelectData="SiteNameSelectData"
              ></SiteNameSelect>
              <Checkbox v-if="$root.adminuserinfo.siteId == '0'" v-model="AllSiteSelect">全部站点</Checkbox>
            </FormItem>

            <FormItem
              v-if="CreatAdminForm.siteId.length || AllSiteSelect"
              label="出入款允许操作的会员等级"
              prop="levelId"
            >
              <div v-for="(level,i) in levelData" :key="i">
                <span style="display:inline-block;width:90px;font-size: 14px;">{{level.siteName}}：</span>
                <Checkbox
                  v-model="level.checkAll"
                  :indeterminate="level.indeterminate"
                  @on-change="checkAllFun(i)"
                >全选</Checkbox>
                <Checkbox
                  v-model="li.checked"
                  v-for="(li,j) in level.list"
                  :key="j"
                  @on-change="checkOneFun(i)"
                >{{li.levelName}}</Checkbox>
              </div>
              <Checkbox
                v-model="checkAllLevelFlag"
                v-if="Object.keys(levelData).length>=2"
                @on-change="checkAllLevel"
              >勾选全部站点等级</Checkbox>
            </FormItem>

            <FormItem label="状态">
              <Select v-model="CreatAdminForm.status" style="width:260px">
                <Option
                  v-for="item in Status"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </FormItem>
            
            <FormItem label="最大加款金额" prop="maxAddMoney">
              <i-input
                placeholder="请输入最大加款金额"
                v-model="CreatAdminForm.maxAddMoney"
                style="width:260px"
              ></i-input>
            </FormItem>

            <FormItem>
              <Button @click="CreatingAdmin" :loading="$root.btnLoading" type="primary">
                确定
                <span v-if="$route.query.isVerify">修改</span>
                <span v-else>创建</span>
              </Button>
              <Button @click="$router.push({name:'AdminList'})">管理员列表</Button>
              <Button @click="$root.go_back">返回</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SiteNameSelect from "@/template/my-components/SiteNameSelect.vue";

export default {
  components: {
    SiteNameSelect
  },
  data() {
    return {
      levelTotal: 0,
      checkAllLevelFlag: false,
      AllSiteSelect: false,
      SiteNameSelectData: {
        type: "多选",
        placeholder: "请输入站点名称",
        style: {
          width: "260px"
        }
      },
      levelData: {}, //根据站点获取的等级data
      levelIds: [], //选中的等级
      roleNameList: [],
      roleName: [],
      CreatAdminForm: {
        userName: "",
        password: "",
        status: "yes",
        siteId: [],
        createUserName: this.$root.adminuserinfo.adminUserName,
        levelId: "",
        updateUserName: this.$root.adminuserinfo.adminUserName,
        maxAddMoney: 0
      },
      WebSiteList: [],
      Status: [
        {
          value: "yes",
          label: "开启"
        },
        {
          value: "no",
          label: "关闭"
        }
      ],
      CreatAdminFormRules: {
        userName: [
          {
            required: true,
            pattern: /^[A-Za-z0-9]{6,20}$/,
            message: "管理员用户名不能为空且必须6-20位字母数字组合！",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            required: true,
            message: "站点名称不能为空！",
            trigger: "blur",
            type: "array"
          }
        ],
        maxAddMoney: [
          {
            required: true,
            message: "最大加款金额不能为空",
            trigger: "blur"
          }
        ],
      }
    };
  },
  watch: {
    AllSiteSelect(val, old) {
      this.allSiteSelectChange(val);
    },
    levelData: {
      handler(val, oldVal) {
        this.CreatAdminForm.levelId = this.createLevelIdParams();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.isVerifyFn(this.$route.query.id);
      }
      this.getRoleList();
    });
  },
  methods: {
    allSiteSelectChange(val) {
      let siteId = [];
      if (val) {
        this.CreatAdminForm.siteId = ["0"];
        siteId = JSON.parse(localStorage.AllSiteNameList).map(item => item.id);
      } else {
        siteId = [];
        this.CreatAdminForm.siteId = [];
      }
      this.getLevelData(siteId);
      this.$refs.SiteNameSelect.setDefaultSite(siteId);
    },
    checkAllLevel(val) {
      this.checkAllLevelFlag = val;
      this.levelData.forEach(le => {
        le.checkAll = val;
        le.indeterminate = false;
        le.list.forEach(li => {
          li.checked = val;
        });
      });
    },
    createLevelIdParams() {
      // 合成levelId参数的函数
      // let levelIds = [];
      this.levelIds = [];
      this.levelData.forEach(le => {
        le.list.forEach(li => {
          if (li.checked) {
            // levelIds.push(li.id);
            this.levelIds.push(li.id);
          }
        });
      });
      if (this.levelIds.length === this.levelTotal) {
        this.checkAllLevelFlag = true;
      } else {
        this.checkAllLevelFlag = false;
      }
      return this.levelIds.toString();
    },
    checkAllFun(index) {
      /**
       *全选checkAll为ture，indeterminate为false，checked为ture
       *不全选checkAll为false，indeterminate为false，checked为false
       */
      let flag = this.levelData[index].checkAll;
      this.levelData[index].indeterminate = false;
      this.levelData[index].list.forEach(li => {
        li.checked = flag;
      });
    },
    checkOneFun(index) {
      /**
       * 当0<checked的数量<list.length，indeterminate为ture，checkAll为false
       * 当checked的数量==list.length，indeterminate为false，checkAll为ture
       * 当checked的数量==0，indeterminate为false，checkAll为false
       */
      let count = 0;
      let length = this.levelData[index].list.length;
      this.levelData[index].list.forEach(li => {
        if (li.checked) count++;
      });
      if (count > 0 && count < length) {
        this.levelData[index].indeterminate = true;
        this.levelData[index].checkAll = false;
      }
      if (count > 0 && count === length) {
        this.levelData[index].indeterminate = false;
        this.levelData[index].checkAll = true;
      }
      if (count === 0) {
        this.levelData[index].indeterminate = false;
        this.levelData[index].checkAll = false;
      }
    },
    getRoleList() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetRoleList)
        .then(res => {
          this.roleNameList = res.data.data;
        });
    },
    isVerifyFn(eid) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GuanLiYuanZhangHaoXiangQing, {
          adminId: this.$route.query.id
        })
        .then(res => {
          for (var key in this.CreatAdminForm) {
            if (key !== "siteId") {
              this.CreatAdminForm[key] = res.data.data[key];
            }
          }
          const { rolesIds, siteId, levelId } = res.data.data;
          this.roleName = rolesIds.roles_id.length ? rolesIds.roles_id : [];
          this.$refs.SiteNameSelect.setDefaultSite(
            siteId.split(",").map(e => +e)
          );
          this.CreatAdminForm.adminId = res.data.data["id"];
          this.CreatAdminForm.updateUserName = this.$root.adminuserinfo.adminUserName;

          this.levelIds = levelId.split(",");
          if (res.data.data["siteId"] == "0") {
            this.AllSiteSelect = true;
          }
        });
    },
    siteChange(re) {
      if (re.SiteId.length === 0) {
        this.CreatAdminForm.siteId = ["0"];
      } else {
        this.CreatAdminForm.siteId = re.SiteId;
        this.getLevelData(re.SiteId);
      }
    },
    getLevelData(siteId) {
      // 创建页面，站点改变，数据改变，每次需要用checkAllLevel(false)方法对数据进行一次初始化
      if (siteId.length) {
        this.$root
          .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_SiteIdHuoQuGongGongDengJi, {
            type: "MemberLevelModel",
            siteId: siteId
          })
          .then(res => {
            this.levelData = this.buildData(res.data.data);
            if (!this.$route.query.isVerify) this.checkAllLevel(false);
          });
      } else {
        this.levelData = [];
      }
    },
    buildData(original) {
      /**
       * 组装数据渲染出入款允许操作的会员等级
       * 二维数组[{checkAll:true,indeterminate:true,indeterminate:true,list:[]}]
       * 新建页面进行初始化，checkAll= false;indeterminate = false;checked = false;
       * 编辑页面统计选中等级数量
       * 当0<checked的数量<list.length，indeterminate为ture，checkAll为false
       * 当checked的数量==list.length，indeterminate为false，checkAll为ture
       * 当checked的数量==0，indeterminate为false，checkAll为false
       * levelTotal用于统计所有等级的数量，如果长度等于isVerifyFn()函数返回的levelId的长度，此时需要将checkAllLevelFlag变为ture;
       */
      let target = [];
      this.levelTotal = 0;
      for (let key in original) {
        let obj = {};
        obj.siteName = original[key][0].siteName;
        if (!this.$route.query.isVerify) {
          obj.checkAll = false;
          obj.indeterminate = false;
        }
        let count = 0;
        original[key].forEach(or => {
          this.levelTotal++;
          if (!this.$route.query.isVerify) {
            or.checked = false;
          } else {
            this.levelIds.forEach(li => {
              if (+or.id === +li) {
                count++;
                or.checked = true;
              }
            });
          }
        });
        if (count === original[key].length) {
          obj.checkAll = true;
          obj.indeterminate = false;
        }
        if (count > 0 && count < original[key].length) {
          obj.checkAll = false;
          obj.indeterminate = true;
        }
        if (count === 0) {
          obj.checkAll = false;
          obj.indeterminate = false;
        }
        obj.list = original[key];
        target.push(obj);
      }
      return target;
    },
    CreatingAdmin() {
      this.$refs.CreatAdminForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          let url;
          let params = { ...this.CreatAdminForm };
          params.siteId = params.siteId.toString();
          params.maxAddMoney = +params.maxAddMoney;
          params.roleName = [];
          this.roleName.forEach(item => {
            this.roleNameList.forEach(i => {
              if (item == i.id) {
                let obj = {};
                obj[item] = i.name;
                params.roleName.push(obj);
              }
            });
          });
          if (!this.$route.query.isVerify) {
            delete params.updateUserName;
            url = this.$root.HTTP_L.HTTP_XinJianGuanLiYuan;
            this.$root
              .HTTP_ALLLINKPOST(url, params)
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "管理员添加成功！"
                });
                this.CreatAdminForm.userName = "";
                this.$router.push({ name: "AdminList" });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            delete params.createUserName;
            if (!params.password) delete params.password;
            url = this.$root.HTTP_L.HTTP_XiuGaiGuanLiYuan;
            this.$root
              .HTTP_ALLLINKPOST(url, params)
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "管理员修改成功！"
                });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
