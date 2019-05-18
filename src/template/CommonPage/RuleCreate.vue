<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Form
          ref="CreatRuleForm"
          :model="CreatRuleForm"
          :rules="CreatRuleFormRules"
          :label-width="210"
        >
          <FormItem
            label="父类"
            prop="parent_id"
          >
            <Cascader
              :data="parentData"
              :render-format="parentFormat"
              change-on-select
              style="width:260px"
            ></Cascader>
          </FormItem>
          <FormItem
            label="名称"
            prop="name"
          >
            <i-input
              v-model="CreatRuleForm.name"
              placeholder="请输入菜单名称"
              style="width:260px"
            ></i-input>
          </FormItem>
          <FormItem
            label="URI路径"
            prop="permission_id"
          >
            <AutoComplete
              :disabled="!this.parentName"
              v-model="autoVal"
              @on-select="autoSelect"
              @on-search="autoSearch"
              placeholder="以'api'开头,最小长度为3字符"
              style="width:260px"
            >
              <Option
                v-for="(item,key,index) in autoData"
                :label="item"
                :value="item"
                :key="index"
              ></Option>
              <small
                style="display:block;text-align:center"
                v-if="tip===1"
              >搜索中...</small>
              <small
                style="display:block;text-align:center;color:#ed3f14"
                v-else-if="tip===2"
              >至少输入api三个字符</small>
              <small
                style="display:block;text-align:center;"
                v-else-if="tip===3"
              >搜索完成</small>
              <small
                style="display:block;text-align:center;color:#ed3f14"
                v-else-if="tip===4"
              >该权限不存在，请重新搜索</small>
              <small
                style="display:block;text-align:center;color:#ed3f14"
                v-else
              >请输入您要查询的内容</small>
            </AutoComplete>
          </FormItem>
          <FormItem
            label="类型"
            prop="type"
          >
            <Select
              v-model="CreatRuleForm.type"
              style="width:260px"
            >
              <Option value="nav">导航</Option>
              <Option value="menu">子菜单</Option>
              <Option value="link">链接</Option>
              <Option value="button">按钮</Option>
            </Select>
          </FormItem>
          <FormItem
            label="状态"
            prop="status"
          >
            <Select
              v-model="CreatRuleForm.status"
              style="width:260px"
            >
              <Option value="open">开启</Option>
              <Option value="close">关闭</Option>
            </Select>
          </FormItem>
          <FormItem>
            <!-- :loading='$root.btnLoading' -->
            <Button
              @click="CreatRule"
              type="primary"
            >
              <span v-if="$route.query.isVerify">确定修改</span>
              <span v-else>确定创建</span>
            </Button>
            <Button @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: 0,
      parentData: [],
      parentName: "",
      autoVal: "",
      autoData: [],
      CreatRuleForm: {
        parent_id: "",
        name: "",
        permission_id: "",
        type: "",
        status: ""
      },
      CreatRuleFormRules: {
        name: [
          {
            required: true,
            pattern: /^.*$/,
            message: "请输入！",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            pattern: /^.*$/,
            message: "请选择类型！",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            pattern: /^.*$/,
            message: "请选择状态！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    autoVal(newVal, oldVal) {
      if (!newVal) {
        this.tip = 4;
        this.$Message.error("该权限不存在，请重新搜索！");
        this.autoData = [];
        this.CreatRuleForm.permission_id = "";
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getParentList().then(res => {
        if (this.$route.query.isVerify) {
          this.getMenusDetails();
        }
      });
    });
  },
  methods: {
    async getParentList() {
      await this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetMenus)
        .then(res => {
          res.data.data.parents.forEach(pa => {
            let data = {
              value: "",
              label: "",
              children: []
            };
            data.value = pa.id;
            data.label = pa.name;
            pa.children.forEach(ch => {
              let obj = {};
              obj.value = ch.id;
              obj.label = ch.name;
              obj.children = [];
              data.children.push(obj);
            });
            this.parentData.push(data);
          });
          this.parentData = [
            {
              value: "",
              label: "顶级菜单"
            },
            ...this.parentData
          ];
        });
    },
    getMenusDetails() {
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetMenusDetails, {
          id: this.$route.query.id
        })
        .then(res => {
          const { id, permission_id, uri, name, type, status } = res.data.data;
          this.autoVal = uri;
          this.CreatRuleForm.id = id; // 编辑权限需要传，新增权限不需要，数据库对应 id
          this.CreatRuleForm.name = name;
          this.CreatRuleForm.type = type;
          this.CreatRuleForm.status = status;
          this.CreatRuleForm.permission_id = permission_id;
          if (res.data.data.parent) {
            // 顶级菜单没有上级
            this.parentName = res.data.data.parent.name;
            this.CreatRuleForm.parent_id = res.data.data.parent.id;
          }
        });
    },
    parentFormat(labels, selectedData) {
      // 自定义渲染选择后的内容
      if (labels.length !== 0) {
        const index = labels.length - 1;
        this.CreatRuleForm.parent_id = selectedData[index].value;
        // 如果选择顶级菜单，就禁用uri输入框,否者不禁用
        this.parentName = labels[index] === "顶级菜单" ? false : true;
        return labels[index];
      } else {
        if (this.$route.query.isVerify) {
          return this.parentName ? this.parentName : "顶级菜单";
        }
      }
    },
    autoSearch(query) {
      console.log(query)
      // 顶级菜单不需要填写URI路径！
      this.tip = 1;
      let url = this.$root.HTTP_L.HTTP_SearchUri;
      let params = {
        uri: this.autoVal
      };
      if (!this.autoVal) {
        this.tip = 0;
        return false;
      }
      if (this.autoVal.length <= 2) {
        this.tip = 2;
        return false;
      }
      this.$root.HTTP_ALLLINKGET(url, params).then(res => {
        if (Object.keys(res.data.data).length) {
          this.tip = 3;
          if (Object.keys(res.data.data).length === 1) {
            // 解决当粘贴整条url,选中不传递权限id的bug
            this.CreatRuleForm.permission_id = Object.keys(res.data.data)[0];
          }
        } else {
          this.tip = 4;
          this.$Message.error("该权限不存在，请重新搜索！");
        }
        this.autoData = res.data.data;
      });
    },
    autoSelect(url) {
      for (const key in this.autoData) {
        if (this.autoData[key] === url) {
          this.CreatRuleForm.permission_id = key;
          break;
        }
      }
    },
    CreatRule() {
      this.$refs.CreatRuleForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          let url;
          let params = { ...this.CreatRuleForm };
          if (!this.$route.query.isVerify) {
            url = this.$root.HTTP_L.HTTP_CreateMenus;
            this.$root
              .HTTP_ALLLINKPOST(url, params)
              .then(res => {
                this.$Spin.hide();
                this.CreatRuleForm.name = "";
                this.CreatRuleForm.type = "";
                this.CreatRuleForm.status = "";
                this.autoVal = "";
                this.$root.modal("success", "", "添加成功！");
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            url = this.$root.HTTP_L.HTTP_UpdateMenus;
            this.$root
              .HTTP_ALLLINKPOST(url, params)
              .then(res => {
                this.$Spin.hide();
                this.$root.modal("success", "", "编辑成功！");
              })
              .catch(res => {
                this.$Spin.hide();
              });
          }
          let time = new Date().getTime();
          this.$store.commit("menuSortChange", time);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>