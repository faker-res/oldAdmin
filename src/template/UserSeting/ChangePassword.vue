<template>
    <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <Alert type="info" show-icon>
                    提示：
                    <span slot="desc">密码变更完成後，您将需要立即以新密码重新登入. </span>
                </Alert>
            </div>
            <div>
                <Form ref="ChangePassword" :model="ChangePassword" :rules="ChangePasswordrules" :label-width="180">
                    <FormItem label="用户名" prop="adminUsername">
                        <i-input type="text" :disabled="true" style="width:260px" v-model="$root.adminuserinfo.adminUserName" placeholder="请输入您的原始密码"></i-input>
                    </FormItem>
                    <FormItem label="原密码" prop="oldPassword">
                        <i-input type="password" style="width:260px" v-model="ChangePassword.oldPassword" placeholder="请输入您的原始密码"></i-input>
                    </FormItem>
                    <FormItem label="新密码" prop="password">
                        <i-input type="password" style="width:260px" v-model="ChangePassword.password" placeholder="请输入您欲变更的密码"></i-input>
                    </FormItem>
                    <FormItem label="确认新密码" prop="password_confirmation">
                        <i-input type="password" style="width:260px" v-model="ChangePassword.password_confirmation" placeholder="请再次输入您的新密码"></i-input>
                    </FormItem>
                    <FormItem style="margin-top:20px">
                        <Button @click="QueRenXiuGai()" type="primary">确认修改</Button>
                        <Button @click="$root.go_back()">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    data () {
        return {
            ChangePassword: {
                adminUsername: '',
                oldPassword: '',
                password: '',
                password_confirmation: ''
            },
            ChangePasswordrules: {
                adminUsername: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                oldPassword: [
                    { required: true, message: '原密码不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' }
                ],
                password_confirmation: [
                    { required: true, message: '请确认您的新密码', trigger: 'blur' }
                ]
            }
        };
    },
    created () {
        this.ChangePassword.adminUsername = this.$root.adminuserinfo.adminUserName;
    },
    methods: {
        QueRenXiuGai () {
            this.$refs.ChangePassword.validate(valid => {
                if (valid) {
                    this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_XiuGaiMiMa, this.ChangePassword).then(() => {
                        this.$root.modal("success" , "" , "修改成功！")
                        // this.$Message.success('修改成功！');
                        this.$root.Logout();
                    }).cacth(() => {

                    });
                } else {
                    this.$root.modal("error" , "" , "相关信息填写有误请确认！")
                    // this.$Message.error('相关信息填写有误请确认！');
                }
            });
        }
    }
};
</script>

<style>

</style>
