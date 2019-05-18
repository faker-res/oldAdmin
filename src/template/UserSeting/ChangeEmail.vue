<template>
    <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <Alert type="info" show-icon>
                    提示：
                    <span slot="desc"> 请注意，电子邮箱变更完成後，新电子邮箱将接收到变更通知邮件. </span>
                </Alert>
            </div>
            <div>
                <Form ref="Email" :model="Email" :rules="Emailrules" :label-width="180">
                    <FormItem label="原电子邮箱">
                        <span>未填写</span>
                    </FormItem>
                    <FormItem label="新电子邮箱" prop="newEmail">
                        <i-input style="width:280px" v-model="Email.newEmail" placeholder="请输入您欲变更的电子邮箱，例: abc@gmail.com"></i-input>
                        <!-- <Tooltip content="例: +8618880146453 需要加 +86 国家代号" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip> -->
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
    name: 'ChangeEmail',
    data () {
        return {
            Email: {
                oldEmail: '',
                newEmail: ''
            },
            Emailrules: {
                newEmail: [
                    { required: true, message: '新邮箱不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        QueRenXiuGai () {
            this.$refs.Email.validate(valid => {
                if (valid) {
                    this.$root.modal("success" , "" , "修改成功！")
                    // this.$Message.success('修改成功！');
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
