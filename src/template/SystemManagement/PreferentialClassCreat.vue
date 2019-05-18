<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <div>
          <Form ref="CreatPreferentialCreatForm" :model="CreatPreferentialCreatForm" :rules="CreatPreferentialCreatFormRules" :label-width="180">
            <FormItem label="创建人">
              <i-input placeholder="请输入创建人" :disabled="true" v-model="CreatPreferentialCreatForm.createUser" style="width:260px"></i-input>
            </FormItem>
            <FormItem label="站点" prop="siteId">
              <SiteNameSelect ref="SiteNameSelect" @listenOnChange="ZhanDianmechange" :SiteNameSelectData="SiteNameSelectData"></SiteNameSelect>
            </FormItem>
            <FormItem label="优惠组名" prop="className">
              <i-input placeholder="请输入优惠组名" v-model="CreatPreferentialCreatForm.className" style="width:260px"></i-input>
            </FormItem>
            <FormItem label="存款页面是否显示" prop="showDeposit">
              <Select style="width:260px" v-model="CreatPreferentialCreatForm.showDeposit" placeholder="选择">
                <Option label="显示" value="yes"></Option>
                <Option label="不显示" value="no"></Option>
              </Select>
            </FormItem>
            <FormItem label="状态" prop="classStatus">
              <Select v-model="CreatPreferentialCreatForm.classStatus" style="width:260px">
                <Option v-for="item in Status" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="排序" prop="sequence">
              <i-input style="width:260px" v-model="CreatPreferentialCreatForm.sequence"></i-input>
            </FormItem>
            <FormItem label="备注" prop="classRemarks">
              <i-input type="textarea" :row="3" style="width:260px" v-model="CreatPreferentialCreatForm.classRemarks"></i-input>
            </FormItem>
            <FormItem>
              <Button @click="CreatingPreferen" :loading='$root.btnLoading' type="primary">确定<span v-if="$route.query.isVerify">修改</span><span v-else>创建</span></Button>
              <Button @click="$router.push({name:'PreferentialClass'})">优惠分组列表</Button>
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
      btnLoading: false,
      CreatPreferentialCreatForm: {
        siteId: null,
        siteName: "",
        className: "",
        classRemarks: "",
        classStatus: "yes",
        createUser: "",
        sequence: "",
        showDeposit: "yes"
      },
      SiteNameSelectData: {
        default: true,
        type: "单选",
        placeholder: "请输入站点名称",
        style: {
          width: "260px"
        }
      },
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
      CreatPreferentialCreatFormRules: {
        classStatus: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        showDeposit: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        sequence: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          }
        ],
        className: [
          {
            required: true,
            message: "优惠组名不能为空",
            trigger: "blur"
          }
        ],
        siteId: [
          {
            pattern: /^.*$/,
            required: true,
            message: "站点名称不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query && to.query.id && to.query.isVerify) {
      this.isVerifyFn(to.query.id);
    } else {
      this.CreatPreferentialCreatForm.className = "";
    }
    next();
  },
  mounted() {
    this.$nextTick(() => {
      if (
        this.$route.query &&
        this.$route.query.id &&
        this.$route.query.isVerify
      ) {
        this.isVerifyFn(this.$route.query.id);
      } else {
        this.CreatPreferentialCreatForm.createUser = this.$root.adminuserinfo.adminUserName;
      }
    });
  },
  methods: {
    isVerifyFn(eid) {
      this.$root
        .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouHuiFenZuXiangQing, {
          preferentialClassId: this.$route.query.id
        })
        .then(res => {
          for (let key in this.CreatPreferentialCreatForm) {
            this.CreatPreferentialCreatForm[key] = res.data.data[key];
          }
          this.CreatPreferentialCreatForm.updateUser = this.$root.adminuserinfo.adminUserName;
          this.CreatPreferentialCreatForm.preferentialClassId = this.$route.query.id;
          this.$refs.SiteNameSelect.setDefaultSite(res.data.data["siteId"]);
        });
    },
    ZhanDianmechange(re) {
      this.CreatPreferentialCreatForm.siteId = re.SiteId;
      this.CreatPreferentialCreatForm.siteName = re.SiteName;
    },
    CreatingPreferen() {
      this.$refs.CreatPreferentialCreatForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          if (!this.$route.query.isVerify) {
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_XinZengYouHuiFenZuLeiXing,
                this.CreatPreferentialCreatForm
              )
              .then(res => {
                this.$Spin.hide();
                this.$refs.CreatPreferentialCreatForm.resetFields();
                this.$root.modal("success", "", res.data.data);
                this.CreatPreferentialCreatForm.className = "";
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            delete this.CreatPreferentialCreatForm.createUser;
            this.$root
              .HTTP_ALLLINKPOST(
                this.$root.HTTP_L.HTTP_YouHuiFenZuXiuGai,
                this.CreatPreferentialCreatForm
              )
              .then(res => {
                this.$Spin.hide();
                this.$root.modal("success", "", res.data.data);
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
