<template>
    <div class="content-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1 form-t">
                <Form ref="CreatGameClassForm" style="max-width:60%" :model="CreatGameClassForm" :rules="CreatGameClassFormRules" :label-width="120">
                    <FormItem label="创建人">
                      <i-input placeholder="请输入创建人" :disabled="true" v-model="CreatGameClassForm.created_user" style="width:260px"></i-input>
                    </FormItem>
                    <FormItem label="游戏分类名称" prop="name">
                        <i-input style="width:260px" v-model="CreatGameClassForm.name" placeholder="游戏名称"></i-input>
                    </FormItem>
                    <FormItem label="游戏分类编号" prop="code">
                        <i-input style="width:260px" v-model="CreatGameClassForm.code" placeholder="游戏编号"></i-input>
                    </FormItem>
                    <FormItem label="平台" prop="platform">
                      <RadioGroup v-model="CreatGameClassForm.platform">
                        <Radio label="sport">体育</Radio>
                        <Radio label="slot">电子</Radio>
                        <Radio label="chess">棋牌</Radio>
                        <Radio label="lottery">彩票</Radio>
                        <Radio label="vr_lottery">VR彩票</Radio>
                        <Radio label="live_casino">真人</Radio>
                        <Radio label="other">其他</Radio>
                      </RadioGroup>
                      <!-- <i-input style="width:360px" v-model="CreatGameClassForm.platform" placeholder='平台'></i-input> -->
                    </FormItem>
                    <FormItem label="排序" prop='sequence'>
                        <i-input style="width:260px" v-model="CreatGameClassForm.sequence" placeholder="排序"></i-input>
                    </FormItem>
                    <FormItem label="状态" prop='status'>
                        <Select v-model="CreatGameClassForm.status" style="width:260px">
                            <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="CreatMemberBankSubmit()">提交</Button>
                        <Button @click="$root.go_back">取消</Button>
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
      CreatGameClassForm: {
        name:'',
        code: "",
        platform: "",
        sequence: 1,
        status: "yes",
        created_user:""
      },
      StatusList: [
        {
          value: "yes",
          label: "开启"
        },
        {
          value: "no",
          label: "关闭"
        }
      ],
      CreatGameClassFormRules: {
        name: [
          { required: true, message: "游戏名称不能为空！", trigger: "blur" }
        ],
        code: [
          { required: true, message: "游戏编号不能为空！", trigger: "blur" }
        ],
        platform: [
          { required: true, message: "设备不能为空！", trigger: "blur" }
        ],
        sequence: [
          { required: true, message: "排序不能为空！", trigger: "blur", pattern: /^.*$/}
        ],
        status: [{ required: true, message: "状态不正确！", trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.$route.query && this.$route.query.id && this.$route.query.isVerify) {
      this.isVerifyFn(this.$route.query.id);
    }else{
      this.CreatGameClassForm.created_user = this.$root.adminuserinfo.adminUserName;
    }
  },
  methods: {
    isVerifyFn(id){
      this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_YouXiFenLeiXiangQing,{gameClassId:id}).then(res => {
        for(var key in this.CreatGameClassForm){
          this.CreatGameClassForm[key] = res.data.data[key]
        }
        this.CreatGameClassForm.gameClassId = this.$route.query.id;
        this.CreatGameClassForm.updated_user = this.$root.adminuserinfo.adminUserName;
      });
    },
    CreatMemberBankSubmit() {
      this.$refs.CreatGameClassForm.validate(valid => {
        if (valid) {
          this.$root.loading()
          if(this.$route.query.isVerify){
            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiYouXiFenLei,this.CreatGameClassForm).then(res => {
              this.$Spin.hide()
              this.$root.modal("success" , "" , res.data.data)
              // this.$Message.success(res.data.data);
            }),
            res => {
              this.$Spin.hide()
            };
          }else{
            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ChuangJianYouXiFenLei,this.CreatGameClassForm).then(res => {
              this.$Spin.hide()
              this.$root.modal("success" , "" , res.data.data)
              // this.$Message.success(res.data.data);
            },
            res => {
              this.$Spin.hide()
            });

          }
        } else {
          this.$root.modal("error" , "" , "请填写完整的表单内容！")
          // this.$Message.error("请填写完整的表单内容！");
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.ShangChuanT {
  height: 150px;
  width: 300px;
  background: #eee;
  border-radius: 3px;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  img {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
}
</style>
