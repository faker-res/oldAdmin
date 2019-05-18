<template>
  <div class="content-main agent-main">
    <div class="layout">
      <div class="page-header">
        <h1 class="binding">{{$route.meta.title}}</h1>
      </div>
      <div class="page-con1">
        <Alert show-icon>
          新增注意事项
          <template slot="desc">登入密码预设为123456。 </template>
        </Alert>
      </div>
      <div class="page-header">
        <h1 class="binding">
          <Icon type="star" color="red"></Icon> 必填栏位
        </h1>
      </div>
      <div class="page-con1 form-t">
        <Form ref="PayMentClassCreateForm" :model="PayMentClassCreateForm" :rules="ruleValidate" :label-width="180">
          <FormItem label="分组名称" prop="className">
            <i-input style="width:260px" v-model="PayMentClassCreateForm.className"></i-input>
          </FormItem>

          <!-- <FormItem label="创建用户" prop="createUser">
            <i-input style="width:260px" v-model="PayMentClassCreateForm.createUser" placeholder="会员账户名称"></i-input>
          </FormItem> -->

          <FormItem label="支付分类" prop='classType'>
            <Select v-model="PayMentClassCreateForm.classType" style="width:260px">
              <Option value="payment" label="在线支付"></Option>
              <Option value="qr_code" label="二维码扫描"></Option>
            </Select>
          </FormItem>
          <FormItem label="客户端" prop="devices">
            <CheckboxGroup v-model="devices">
              <Checkbox label="pc">
                <span>PC</span>
              </Checkbox>
              <Checkbox label="h5">
                <span>H5</span>
              </Checkbox>
              <!-- <Checkbox label="ios">
                <span>IOS</span>
              </Checkbox>
              <Checkbox label="android">
                <span>Android</span>
              </Checkbox> -->
            </CheckboxGroup>
          </FormItem>
          <FormItem label="状态" prop='classStatus'>
            <Select v-model="PayMentClassCreateForm.classStatus" style="width:260px">
              <Option value="yes" label="开启">
                <span>开启</span>
              </Option>
              <Option value="no" label="关闭">
                <span>关闭</span>
              </Option>
            </Select>
          </FormItem>
          <FormItem label="备注信息" prop="classRemarks">
            <i-input type="textarea" style="width:260px" :row="4" v-model="PayMentClassCreateForm.classRemarks"
              placeholder="备注信息"></i-input>
          </FormItem>
          <FormItem>
            <Button type="primary" v-if="!$route.query.isVerify" :loading='$root.btnLoading' @click="FormSubmit()">确定创建</Button>
            <Button type="primary" v-else :loading='$root.btnLoading' @click="FormSubmit()">修改</Button>
            <Button @click="$root.go_back">返回</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "PayMentClassCreate",
    methods: {
      renderFormat(label) {
        return label.join(" => ");
      }
    },
    watch: {
      res1(val) {
        this.showRes = val;
      },
      resDefault(val) {
        this.showRes = val;
      }
    },
    data() {
      return {
        res1: [],
        resDefault: ["河北省", "张家口市", "怀来县", "沙城镇"],
        showRes: [],
        btnLoading: false,
        devices:["pc","h5"],
        PayMentClassCreateForm: {
          className: "",
          classStatus: "yes",
          classRemarks: "",
          createUser: "",
          // sequence: "0",
          classType: "payment",
          devices:"",
        },
        ruleValidate: {
          className: [{
            required: true,
            // type: "number",
            message: "请输入您的分组名称",
            trigger: "blur"
          }],
          classStatus: [{
            required: true,
            message: "请输入您的分组状态",
            trigger: "blur"
          }],
          createUser: [{
            required: true,
            message: "请输入您的创建人",
            trigger: "blur"
          }, ],
        }
      };
    },
    created() {
      // this.chuanjianyonghu();

    },
    mounted() {
      this.$nextTick(() => {
        if (this.$route.query && this.$route.query.paymentClassId && this.$route.query.isVerify) {
          this.isVerifyFn(this.$route.query.paymentClassId);
        } else {
          this.PayMentClassCreateForm.createUser = this.$root.adminuserinfo.adminUserName;
        }
      });
    },
    methods: {
      isVerifyFn(id) {
        this.$root
          .HTTP_ALLLINKPOST(
            this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiangQIng, {
              paymentClassId: id
            }
          )
          .then(res => {
            for (let key in this.PayMentClassCreateForm) {
              this.PayMentClassCreateForm[key] = res.data.data[key]
            }
            this.PayMentClassCreateForm.paymentClassId = res.data.data.id;
            this.PayMentClassCreateForm.updateUser = this.$root.adminuserinfo.adminUserName
            this.devices = this.PayMentClassCreateForm.devices.split(",")
          });
      },
      FormSubmit() {
        this.PayMentClassCreateForm.devices = this.devices.toString()
        this.$refs.PayMentClassCreateForm.validate(valid => {
          if (valid) {
            this.$root.loading()
            if (!this.$route.query.isVerify) {
              this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuChuangJian, this.PayMentClassCreateForm)
                .then(res => {
                    this.$Spin.hide();
                    // this.$refs.PayMentClassCreateForm.resetFields();
                    // this.chuanjianyonghu();
                    this.$root.modal("success", "", "创建成功！")
                  },
                  res => {
                    this.$Spin.hide()
                  });
            } else {
              this.$root
                .HTTP_ALLLINKPOST(
                  this.$root.HTTP_L.HTTP_ZaiXianZhiFuFenZuXiuGai,
                  this.PayMentClassCreateForm
                )
                .then(res => {
                    this.$Spin.hide();
                    this.$root.modal("success", "", "编辑成功！")
                  },
                  res => {
                    this.$Spin.hide()
                  })
            }

          }
          // else {
          //   this.$Message.success("请填写正确的用户信息!");
          // }
        });
      },
      chuanjianyonghu() {
        let nuwPassword = "";
        for (var i = 0; i < 8; i++) {
          nuwPassword += Math.floor(Math.random() * 10);
        }
        this.PayMentClassCreateForm.userName = nuwPassword;
        this.PayMentClassCreateForm.phone = "158" + nuwPassword - 0;
      }
    }
  };
</script>