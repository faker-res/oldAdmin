<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">
                    {{$route.meta.title}}
                    <span v-if="$route.query.isVerify">修改</span>
                    <span v-else>添加</span>
                </h1>
            </div>
            <div class="page-con1">
                <div>
                    <Form ref="CreatLevelForm" :model="CreatLevelForm" :rules="CreatLevelFormRules" :label-width="180">
                        <FormItem label="等级名称" prop="levelName">
                            <i-input placeholder="请输入等级名称" v-model="CreatLevelForm.levelName" style="width:260px"></i-input>
                        </FormItem>
                    </Form>
                    <Form :label-width="180">
                        <FormItem>
                            <Button @click="CreatingLevel" :loading='$root.btnLoading' type="primary">确定
                                <span v-if="$route.query.isVerify">修改</span>
                                <span v-else>创建</span>
                            </Button>
                            <Button @click="$router.push({name:'SystemConfigList'})">等级列表</Button>
                            <Button @click="$root.go_back">返回</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                btnLoading: false,
                CreatLevelForm: {
                    levelName: ""
                },
                CreatLevelFormRules: {
                    levelName: [{
                            required: true,
                            message: "等级名称不能为空"
                        }

                    ]
                }
            };
        },
        computed: {},
        created() {
            if (this.$route.query.isVerify) {
                this.isVerify()
            }
        },
        methods: {
            isVerify() {
                this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_GongGongDengJiXiangQing, {
                        id: this.$route.query.id,
                        levelName: this.$route.query.levelName
                    })
                    .then(res => {
                        for (var key in this.CreatLevelForm) {
                            this.CreatLevelForm[key] = res.data.data[key];
                        }
                            this.CreatLevelForm.id = res.data.data.id;

                    });
            },
            CreatingLevel() {
                this.$refs.CreatLevelForm.validate(valid => {
                    if (valid) {
                        if (!this.$route.query.isVerify) { //创建
                            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_ChuangJianGongGongDengJi, this.CreatLevelForm)
                                .then(res => {
                                    this.$root.modal("success" , "" , "创建成功！")
                                    this.$refs.CreatLevelForm.resetFields()
                                })
                                .catch(() => {});
                        } else { //修改
                            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_BianJiGongGongDengJi, this.CreatLevelForm)
                                .then(res => {
                                    this.$root.modal("success" , "" , "修改成功！")
                                })
                                .catch(() => {});
                        }
                    } else {
                        this.$root.modal("error" , "" , "请填写完整信息！")

                    }
                });
            }
        },
        watch: {}
    };
</script>

<style>
</style>