<template>
    <div class="user_info">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <div>
                    <Form ref="CreatPreferentialSettingForm" :model="CreatPreferentialSettingForm" :rules="CreatPreferentialCreatFormRules" :label-width="180">
                        <FormItem label="创建人">
                            <i-input :disabled="true" v-model="CreatPreferentialSettingForm.username" style="width:260px"></i-input>
                        </FormItem>
                        <FormItem label="键值" prop="key">
                            <Cascader :data="keyList" v-model="key" trigger="hover" style="width:260px;display:inline-block;" @on-change="keyChange"></Cascader>
                            <!-- <a v-if="userDefined" class="user_defined" href="javascript:void(0);" @click="userDefined = false;CreatPreferentialSettingForm.key = ''">自定义</a> -->
                            <!-- <i-input v-if="!userDefined" placeholder="请输入键值" v-model="CreatPreferentialSettingForm.key" style="width:260px"></i-input> -->
                            <!-- <a v-if="!userDefined" class="user_defined" href="javascript:void(0);" @click="userDefined = true;CreatPreferentialSettingForm.key = ''">获取字段</a> -->
                        </FormItem>
                        <FormItem label="参数" prop="value">
                            <i-input style="width:260px" placeholder="请输入参数" v-model="CreatPreferentialSettingForm.value"></i-input>
                        </FormItem>
                        <FormItem label="状态">
                            <Select v-model="CreatPreferentialSettingForm.status" style="width:260px">
                                <Option v-for="item in Status" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button @click="CreatingPreferentialSetting" :loading='$root.btnLoading' type="primary">
                                <span v-if="$route.query.isVerify">修改</span>
                                <span v-else>创建</span>
                            </Button>
                            <Button @click="$router.push({name:'PreferentialSetting'})">优惠模板参数列表</Button>
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
                keyList: [],
                key: [],
                // userDefined: true,
                CreatPreferentialSettingForm: {
                    key: "",
                    value: "",
                    status: "",
                    username: "",
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
                    key: [{
                        required: true,
                        message: "键值不能为空",
                    }],
                    value: [{
                        required: true,
                        message: "参数不能为空",
                        trigger: "blur"
                    }],
                    status: [{
                        required: true,
                        message: "状态不能为空",
                    }],
                },
                TemplateList: []
            };
        },
        mounted() {
            // this.$nextTick(() => {
                // Promise.all([this.$refs.SiteNameSelect.InitData()]).then(() => {
                if (this.$route.query && this.$route.query.Id && this.$route.query.isVerify) {
                    this.isVerifyFn(this.$route.query.Id);
                    // this.CreatPreferentialSettingForm.update_username = this.$root.adminuserinfo.adminUserName;
                } else {
                    this.CreatPreferentialSettingForm.username = this.$root.adminuserinfo.adminUserName;
                }
                // });
            // });
        },
        created() {
            this.$root
                .HTTP_ALLLINKGET(this.$root.HTTP_L.HTTP_Template_PreferentialSetting)
                .then(res => {
                    for (let key in res.data.data) {
                        let obj = {}
                        obj.value = key
                        switch (key) {
                            case "bet":
                                obj.label = "下注";
                                break;
                            case "bonus":
                                obj.label = "优惠";
                                break;
                            case "deposit":
                                obj.label = "存款";
                                break;
                            case "transfer":
                                obj.label = "转换";
                                break;
                            case "withdrawals":
                                obj.label = "取款";
                        }
                        obj.children = []
                        for(let i in res.data.data[key]){
                            let children = {}
                            children.value = i
                            children.label = res.data.data[key][i]
                            obj.children.push(children)
                        }
                        this.keyList.push(obj)
                    }
                });


        },
        methods: {
            isVerifyFn(eid) {
                this.$root
                    .HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Detail_PreferentialSetting, {
                        Id: eid
                    })
                    .then(res => {
                        for (let key in this.CreatPreferentialSettingForm) {
                            this.CreatPreferentialSettingForm[key] = res.data.data[key];
                        }
                        this.CreatPreferentialSettingForm.Id = res.data.data.id
                        this.CreatPreferentialSettingForm.update_username = this.$root.adminuserinfo.adminUserName;
                        // this.CreatPreferentialSettingForm.update_username = res.data.data.username
                        this.keyList.forEach(item => {
                            item.children.forEach(i => {
                                if(i.value === res.data.data.key){
                                    this.key = [item.value , i.value]
                                }
                            })
                        })
                    });
            },
            CreatingPreferentialSetting() {
                this.$refs.CreatPreferentialSettingForm.validate(valid => {
                    if (valid) {
                        this.$root.loading()
                        if (!this.$route.query.isVerify) {
                            this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_Add_PreferentialSetting, this.CreatPreferentialSettingForm)
                                .then(res => {
                                    this.$Spin.hide()
                                    this.$root.modal("success", "", res.data.data)
                                    this.CreatPreferentialSettingForm.value = ""
                                })
                                .catch(res => {
                                    this.$Spin.hide()
                                });
                        } else {
                            delete this.CreatPreferentialSettingForm.username
                            this.$root
                                .HTTP_ALLLINKPOST(
                                    this.$root.HTTP_L.HTTP_Update_PreferentialSetting,
                                    this.CreatPreferentialSettingForm
                                )
                                .then(res => {
                                    this.$Spin.hide()
                                    this.$root.modal("success", "", res.data.data)
                                })
                                .catch(res => {
                                    this.$Spin.hide()
                                });
                        }
                    }
                });
            },
            keyChange(v){
                this.CreatPreferentialSettingForm.key = v[1]
            }
        },
        // watch:{
        //   'CreatPreferentialSettingForm.siteId':function(newvalue,old){
        //      this.WebSiteList.forEach((m,i)=>{
        //        if(m.id === newvalue){
        //          this.CreatPreferentialSettingForm.siteName = this.WebSiteList[i].siteName
        //        }
        //      })
        //   }
        // }
    };
</script>

<style lang="less" scoped>
.user_defined{
    margin-left: 5px;
    vertical-align: text-top;
    font-size: 13px;
}
</style>
