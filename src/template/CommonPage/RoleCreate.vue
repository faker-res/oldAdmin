<template>
  <div class="user_info">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Form ref="CreatRoleForm" :model="CreatRoleForm" :rules="CreatRoleFormRules" :label-width="210">
          <FormItem label="角色标识" prop="name">
            <i-input :disabled="!!$route.query.isVerify" placeholder="支持数字、字母、中划线、下划线" v-model="CreatRoleForm.name" style="width:260px"></i-input>
          </FormItem>
          <FormItem label="角色名称" prop="title">
            <i-input placeholder="请输入角色名称" v-model="CreatRoleForm.title" style="width:260px"></i-input>
          </FormItem>
          <FormItem label="角色描述" prop="description">
            <i-input type="textarea" :rows="4" :maxlength="50" placeholder="请输入角色描述" v-model="CreatRoleForm.description" style="width:260px"></i-input>
          </FormItem>
          <FormItem label="权限设置" prop="permissionId">
            <div class="checkbox-wrapper">
              <div v-for="(grandPa,g_index) in PermissionsList" :key='g_index' class="grandPa-Panel">
                <Collapse :value="grandPa.checkAll?grandPa.name:grandPa.indeterminate?grandPa.name:''">
                  <Panel :name="grandPa.name">
                    <Checkbox class="title" v-model="grandPa.checkAll" :indeterminate="grandPa.indeterminate" @on-change="checkGrandPaFun(g_index)">{{grandPa.name}}</Checkbox>
                    <div class="tool">
                      <span>展开/关闭</span>
                      <Icon type="ios-arrow-down" :size="14"></Icon>
                    </div>
                    <div slot="content">
                      <div :class="{index:grandPa.name=='首页'}" class="parent-Panel">
                        <div class="content" v-for="(parent,p_index) in grandPa.children" :key='p_index' v-if="grandPa.children.length">
                          <Checkbox v-if="grandPa.name=='首页'" v-model="parent.checked" :indeterminate="parent.indeterminate" @on-change="checkParentFun(grandPa.name,g_index,p_index)">
                            <span 
                              :data-url="parent.permission?parent.permission.name:'#'"
                              :data-type="parent.type||'#'"
                            >{{parent.name}}</span>
                          </Checkbox>
                          <Collapse v-if="grandPa.name!='首页'" :value="parent.checked?parent.name:parent.indeterminate?parent.name:''">
                            <Panel :name="parent.name">
                              <Checkbox class="title" v-model="parent.checked" :indeterminate="parent.indeterminate" @on-change="checkParentFun(grandPa.name,g_index,p_index)">
                                <span 
                                  :data-url="parent.permission?parent.permission.name:'#'"
                                  :data-type="parent.type||'#'"
                                >{{parent.name}}</span>
                              </Checkbox>
                              <div class="tool">
                                <span>展开/关闭</span>
                                <Icon type="ios-arrow-down" :size="14"></Icon>
                              </div>
                              <div v-if="parent.children.length" class="sub" slot="content">
                                <Checkbox v-model="child.checked" v-for="(child,c_index) in parent.children" :key='c_index' @on-change="checkChildFun(grandPa.name,g_index,p_index,c_index)">
                                  <span 
                                  :data-url="child.permission?child.permission.name:'#'"
                                  :data-type="child.type||'#'"
                                  >{{child.name}}</span>
                                </Checkbox>
                              </div>
                              <div v-else slot="content" class="tip">没有下级权限</div>
                            </Panel>
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <div class="check-all-checkbox">
              <Checkbox @on-change="checkAllPermission">勾选所有权限</Checkbox>
            </div>
          </FormItem>
          <FormItem>
            <Button @click="CreatRole" :loading='$root.btnLoading' type="primary">
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
/**注意
 * 一级的权限id全部为0，不需要传递权限id，只做全选功能
 * 二级权限id是否传递根据sendParentId的状态来变化，
 * 二级的checked只做视图变化，
 * 三级全选中/任意选中要传递二级的权限id，全不选中不传
 */
export default {
  data() {
    return {
      CreatRoleForm: {
        name: "",
        title: "",
        description: "",
        permissionId: []
      },
      PermissionsList: [], //渲染checkBox
      permissionCount: {},
      CreatRoleFormRules: {
        name: [
          {
            required: true,
            pattern: /^.*$/,
            message: "请输入角色标识！",
            trigger: "blur"
          }
        ],
        title: [
          {
            required: true,
            pattern: /^.*$/,
            message: "请输入角色名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    PermissionsList: {
      handler(val, oldVal) {
        if (val) {
          this.CreatRoleForm.permissionId = this.createPermissionId();
        }
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
        this.getRolePermissionsList(true).then(() => {
          this.isVerifyFn();
        });
      } else {
        this.getRolePermissionsList(false);
      }
    });
  },
  methods: {
    watchChildChangeFun(grandPa, name){
      /**封装监听三级变化影响一级的的函数
       *对二级和三级权限进行计数,动态变化一级状态
       * @augments grandPa当前对应的一级
       * @augments name => 子级的对应的一级的name
       * this.permissionCount[name] 当前三级对应的一级的所有权限数量
       * 当count== this.permissionCount[name]时
       * 当count < this.permissionCount[name]时
       * 当count== 0时
       */
      let p_count = 0; // 
      grandPa.children.forEach(parent => {
        if (parent.checked) p_count++;
        parent.children.forEach(child => {// 三级权限
          if (child.checked) p_count++;
        });
      });
      if (p_count > 0 && p_count == this.permissionCount[name]) {
        this.$set(grandPa, "checkAll", true);
        this.$set(grandPa, "indeterminate", false);
      } else if (p_count > 0 && p_count < this.permissionCount[name]) {
        this.$set(grandPa, "checkAll", false);
        this.$set(grandPa, "indeterminate", true);
      } else {
        this.$set(grandPa, "checkAll", false);
        this.$set(grandPa, "indeterminate", false);
      }
    },
    checkChildFun(name, g_index, p_index, c_index) {
      /**点击child三级时统计权限选中的数量，动态变化二级parent和一级grandPa状态
       * @augments name => 子级的对应的一级的name
       * @augments g_index => 子级的对应的一级的index
       * @augments p_index => 子级的对应的二级的index
       * @augments c_index => 子级的对应的index
       */
      let grandPa = this.PermissionsList[g_index];
      let parent = grandPa.children[p_index];
      let child = parent.children[c_index];
      
      /**对三级权限进行计数,动态变化二级状态
       * child全选中时，parent.indeterminate为false，parent.checked为true，parent.sendParentId为true，
       * child任意选中一个，parent.indeterminate为true，parent.checked为false，parent.sendParentId为true，
       * child全不选中时，parent.indeterminate为false，parent.checked为false，parent.sendParentId为false，
      */
      let c_count = 0;
      parent.children.forEach(child => {
        if (child.checked) c_count++;
      })
      if (c_count > 0 && c_count == parent.children.length) {
        this.$set(parent, "indeterminate", false);
        this.$set(parent, "checked", true);
        this.$set(parent, "sendParentId", true);
      } else if (c_count > 0 && c_count < parent.children.length) {
        this.$set(parent, "indeterminate", true);
        this.$set(parent, "checked", false);
        this.$set(parent, "sendParentId", true);// 划重点
      } else {
        this.$set(parent, "indeterminate", false);
        this.$set(parent, "checked", false);
        this.$set(parent, "sendParentId", false);
      }
      this.watchChildChangeFun(grandPa ,name);
    },
    checkParentFun(name, g_index, p_index){
      /**Parent二级单个全选，动态变化一级grandPa和三级的状态
       * @augments name => 子级的对应的一级的name
       * @augments g_index => 子级的对应的一级的index
       * @augments p_index => 子级的对应的二级的index
       */
      let grandPa = this.PermissionsList[g_index];
      let parent = grandPa.children[p_index];
      /**二级的全选变化，改变三级状态
       * parent.checked为true，child.checked为true ，grandPa.indeterminate为true , parent.indeterminate为false
       * parent.checked为false，child.checked为false ，grandPa.indeterminate为false , parent.indeterminate为false
      */
      let flag = parent.checked ? true : false;
      this.$set(grandPa, "indeterminate", flag);
      this.$set(parent, "indeterminate", false);
      this.$set(parent, "sendParentId", flag);
      if (parent.children.length) {
        parent.children.forEach(child => {// 三级权限
          this.$set(child, "checked", flag);
        });
      }
      this.watchChildChangeFun(grandPa ,name);
    },
    checkGrandPaFun(g_index) {
      /**grandPa一级单个全选
       * * @augments g_index => 一级的对应index
       * checkAll为true , checked为true , grandPa.indeterminate为false, parent.indeterminate为false
       * checkAll为false , checked为false , indeterminate为false, parent.indeterminate为false
       */
      let grandPa = this.PermissionsList[g_index];
      let flag = grandPa.checkAll ? true : false;
      this.$set(grandPa, "indeterminate", false);
      grandPa.children.forEach(parent => {
        this.$set(parent, "checked", flag);
        this.$set(parent, "sendParentId", flag);
        this.$set(parent, "indeterminate", false);
        if (parent.children.length) {
          parent.children.forEach(child => {// 三级权限
            this.$set(child, "checked", flag);
          });
        }
      });
    },
    checkAllPermission(val) {
      /**勾选所有权限
       * 点击勾选时checkAll为false , checked为false , grandPa.indeterminate为false ,parent.indeterminate为false
       * 取消勾选时checkAll为false , checked为false , grandPa.indeterminate为false ,parent.indeterminate为false
       */
      this.PermissionsList.forEach(grandPa => {
        this.$set(grandPa, "checkAll", val);
        this.$set(grandPa, "indeterminate", false);
        grandPa.children.forEach(parent => {
          this.$set(parent, "checked", val);
          this.$set(parent, "sendParentId", val);
          this.$set(parent, "indeterminate", false);
          if (parent.children.length) {
            parent.children.forEach(child => {
              this.$set(child, "checked", val);
            });
          }
        });
      });
    },
    createPermissionId() {
      /**监听权限变化的函数
       * 二级权限id是否传递根据sendParentId的状态来变化
       *@returns 选中的权限id集合
       */
      let ids = [];
      this.PermissionsList.forEach(grandPa => {
        grandPa.children.forEach(parent => {
          if (parent.sendParentId) {
            ids.push(parent.permission_id);
          }
          if (parent.children.length) {
            parent.children.forEach(child => {
              if (child.checked) {
                ids.push(child.permission_id);
              }
            });
          }
        });
      });
      return ids;
    },
    async getRolePermissionsList(isVerify) {
      /**获取数据渲染，进行初始化,统计各类权限数量count
       *创建页面默认child.checked为false , 
       *创建页面默认grandPa.checkAll为false , grandPa.indeterminate为false ,
       *创建页面默认parent.checked为false , parent.indeterminate为false, parent.sendParentId为false
       */
      await this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetRolePermissionsList)
        .then(res => {
          this.PermissionsList = res.data.data;
          this.PermissionsList.forEach(grandPa => {
            if (!isVerify) this.$set(grandPa, "checkAll", false);
            if (!isVerify) this.$set(grandPa, "indeterminate", false);
            let count = 0;
            grandPa.children.forEach(parent => {
              if (!isVerify) this.$set(parent, "checked", false);
              if (!isVerify) this.$set(parent, "indeterminate", false);
              if (!isVerify) this.$set(parent, "sendParentId", false);
              count++;
              if (parent.children.length) {
                parent.children.forEach(child => {
                  if (!isVerify) this.$set(child, "checked", false);
                  count++;
                });
              }
            });
            this.permissionCount[grandPa.name] = count;
          });
        });
    },
    isVerifyFn() {
      /**编辑页面，进行同步checkbox的状态
       * p_count => 所有二级和三级选中的数量,动态变化一级的indeterminate
       * c_count => 三级选中的数量,动态变化二级的indeterminate和sendParentId
       */
      this.$root
        .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_GetRoleDetails, {
          id: this.$route.query.id
        })
        .then(res => {
          this.CreatRoleForm.id = res.data.data.id;
          this.CreatRoleForm.name = res.data.data.name;
          this.CreatRoleForm.title = res.data.data.title;
          this.CreatRoleForm.description = res.data.data.description;

          this.PermissionsList.forEach(grandPa => {
            let p_count = 0;
            grandPa.children.forEach(parent => {
              let c_count = 0;
              res.data.data["permissions"].forEach(re => {
                if (parent.permission_id == re.id) {
                  p_count++;
                  this.$set(parent, "checked", true);
                  this.$set(parent, "sendParentId", true);
                }
                if (parent.children.length) {
                  /**c_count
                   * 当有三级的情况下，需要统计三级选中的数量，来动态变化二级是否选中，是否传递权限id
                   * 当所有三级全选中的情况下，要让二级选中parent.checked为true，并且传递权限id，parent.sendParentId为true，parent.indeterminate为false
                   * 当三级任意选中的情况下，要让二级选中parent.checked为false，并且传递权限id，parent.sendParentId为true，parent.indeterminate为true
                   * 当三级没有选中的情况下，要让二级选中parent.checked为false，并且传递权限id，parent.sendParentId为false，parent.indeterminate为false
                   */
                  parent.children.forEach(child => {
                    if (child.permission_id == re.id) {
                      p_count++;
                      c_count++;
                      this.$set(child, "checked", true);
                    }
                  });
                }
              });
              if (parent.children.length) {
                if (c_count > 0 && c_count == parent.children.length) {
                  this.$set(parent, "checked", true);
                  this.$set(parent, "sendParentId", true);
                  this.$set(parent, "indeterminate", false);
                } else if (
                  c_count > 0 &&
                  c_count < parent.children.length
                ) {
                  this.$set(parent, "checked", false);
                  this.$set(parent, "sendParentId", true);
                  this.$set(parent, "indeterminate", true);
                } else {
                  this.$set(parent, "checked", false);
                  this.$set(parent, "sendParentId", false);
                  this.$set(parent, "indeterminate", false);
                }
              }
            });
            /**
             * 1.全选中p_count == this.permissionCount[grandPa.name] , checkAll为true , grandPa.indeterminate为false,
             * 2.某几个选中p_count < this.permissionCount[grandPa.name], checkAll为false , grandPa.indeterminate为true
             * 3.全不选中p_count = 0 ,checkAll为false , grandPa.indeterminate为false
             */
            if (p_count > 0 && p_count == this.permissionCount[grandPa.name]) {
              this.$set(grandPa, "checkAll", true);
              this.$set(grandPa, "indeterminate", false);
            } else if (
              p_count > 0 &&
              p_count < this.permissionCount[grandPa.name]
            ) {
              this.$set(grandPa, "checkAll", false);
              this.$set(grandPa, "indeterminate", true);
            } else {
              this.$set(grandPa, "checkAll", false);
              this.$set(grandPa, "indeterminate", false);
            }
          });
        });
    },
    CreatRole() {
      this.$refs.CreatRoleForm.validate(valid => {
        if (valid) {
          this.$root.loading();
          let params = { ...this.CreatRoleForm };
          if (!this.$route.query.isVerify) {
            delete params["id"];
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_CreateRole, params)
              .then(res => {
                this.$refs.CreatRoleForm.resetFields();
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "角色添加成功！"
                });
                this.$router.push({ name: "RolePermissionsList" });
              })
              .catch(res => {
                this.$Spin.hide();
              });
          } else {
            delete params["name"];
            this.$root
              .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_UpdateRole, params)
              .then(res => {
                this.$Spin.hide();
                this.$Modal.success({
                  title: "提示",
                  content: "角色修改成功！"
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

<style lang="less" scoped>
.check-all-checkbox{
  margin-top: 10px;
}
.checkbox-wrapper {
  width: 95%;
  .title {
    padding: 0 15px;
    font-weight: bold;
  }
  .content {
    padding: 10px 15px 0;
    .sub {
      padding: 0 30px 10px;
      /deep/.ivu-checkbox-wrapper {
        width: 19%;
      }
    }
  }
  .index{ // 首页权限样式特殊处理
    .content {
      display: inline-block;
      width: 19%;
    }
  }
  .parent-Panel{
    /deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
      height: 30px;
      line-height: 30px;
    }
    /deep/.ivu-collapse-content > .ivu-collapse-content-box {
      padding-top: 10px;
      padding-bottom: 0;
    }
  }
  .tip{
    padding-left: 30px;
    font-size: 12px;
  }
  .tool{
    float: right;
    font-size: 12px;
    padding-right: 20px;
  }
}
</style>
