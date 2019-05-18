<template>
    <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <Alert type="info" show-icon>
                    提示：
                    <span slot="desc">请注意，手机号变更完成後，新手机号将接收到变更通知简讯. </span>
                </Alert>
            </div>
            <div>
                <Form ref="ChangeMobile" :model="ChangeMobile" :rules="ChangeMobilerules" :label-width="180">
                    <FormItem label="原手机号">
                        <i-input :disabled="true" style="width:260px" :value="18811759841" placeholder="请输入您的原始密码"></i-input>
                        <span>未填写</span>
                    </FormItem>
                    <FormItem label="新手机号" prop="newMobile">
                        <i-input style="width:280px" v-model="ChangeMobile.newMobile" placeholder="请输入您欲变更的手机号，例: +8618880146453"></i-input>
                        <Tooltip content="例: +8618880146453 需要加 +86 国家代号" placement="top">
                            <Icon type="help-circled"></Icon>
                        </Tooltip>
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
    name: 'ChangeMobile',

    data () {
        return {
            ChangeMobile: {
                oldMobile: '',
                newMobile: ''
            },
            ChangeMobilerules: {
                newMobile: [
                    { required: true, message: '新手机号不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        QueRenXiuGai () {
            this.$refs.ChangeMobile.validate(valid => {
                if (valid) {
                    this.$Message.success('修改成功！');
                } else {
                    this.$Message.error('相关信息填写有误请确认！');
                }
            });
        }
    }
};
</script>

<style>

</style>
