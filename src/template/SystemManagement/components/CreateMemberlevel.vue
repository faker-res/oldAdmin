<template>
  <div class="content-main CreateMemberLevel-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}  <span>新增</span></h1>
            </div>
            <div class="page-con1">
                <Form ref="CreatMemberBerForm"  :model="CreatMemberBerForm" :rules="rules" :label-width="120">
                    <FormItem prop="siteId" label='站点ID'>
                        <i-input  number style="width:30%" v-model="CreatMemberBerForm.siteId" placeholder="例：等级一" ></i-input>
                    </FormItem>
                    <FormItem prop="siteName" label='站点名称'>
                        <i-input type="text" style="width:30%" v-model="CreatMemberBerForm.siteName" placeholder="例：等级一" ></i-input>
                    </FormItem>
                    <FormItem prop="levelName" label='等级名称'>
                        <i-input number style="width:30%" v-model="CreatMemberBerForm.levelName" placeholder="例：等级一" ></i-input>
                    </FormItem>
                    
                    <FormItem label="充值限额" prop="maxPay">
                        <input-number :min="0" type="text" style="width:14%" v-model="CreatMemberBerForm.minPay" placeholder="请填入下限或留空(元)"></input-number>
                        <span style="width:2%;text-align:center;display:inline-block">-</span>
                        <input-number :min="0" type="text" style="width:14%" v-model="CreatMemberBerForm.maxPay" placeholder="请填入上限或留空(元)"></input-number>
                    </FormItem>
                     <FormItem label="状态" prop='status'>
                        <Select v-model="CreatMemberBerForm.status" style="width:260px">
                            <Option value="yes" label="开启">
                                <span>开启</span>
                            </Option>
                            <Option value="no" label="关闭">
                                <span>关闭</span>
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label='设为默认'>
                        <RadioGroup v-model="CreatMemberBerForm.default">
                            <Radio label="yes">开启</Radio>
                            <Radio label="no">关闭</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="排序号">
                        <i-input style="width:360px" number type="text" v-model="CreatMemberBerForm.sequence" placeholder=""></i-input>
                    </FormItem>
                    <FormItem label="备注">
                        <i-input style="width:360px" type="textarea" :row="4" v-model="CreatMemberBerForm.remark" placeholder=""></i-input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :loading="btload" @click="handleSubmit('CreatMemberBerForm')">送出</Button>
                        <Button type="ghost" @click="$root.go_back">返回上一页</Button>
                    </FormItem>
                </Form>
            </div>
            <div class="page-con1">
            </div>
        </div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            btload:false,
            CreatMemberBerForm: {
                siteId:11111,
                siteName:'站点名称',
                levelName:1000,
                minPay:0,
                maxPay:10000,
                status:'yes',
                default:'yes',
                remark:'备注',
                sequence:1
            },
            rules: {
                siteId:[
                {
                    required: true,
                    message: "请输入站点id",
                    trigger: "blur",
                    type:'number'
                  }
                ],
                siteName: [
                    {
                        required: true,
                        message: '请输入站点名称',
                        trigger: 'blur'
                    }
                ],
                // rukuanshangxian: [
                //   {
                //     required: true,
                //     message: "请输入公司入款限额",
                //     trigger: "blur"
                //   }
                // ],
                levelName: [
                    {
                        required: true,
                        message: '请输入正确的等级名称',
                        trigger: 'blur',
                        type:'number'
                    }
                ],
                // minPay: [
                //     {
                //         type: 'number',
                //         required: true,
                //         message: ' ',
                //         trigger: 'blur'
                //     }
                // ],
                maxPay:[
                     {
                        type: 'number',
                        required: true,
                        message: '请输入正确的充值限额',
                        trigger: 'blur'
                    }
                ],
                sequence:[
                     {
                        type: 'number',
                        required: true,
                        message: '请输入正确的排序号',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        removerr (er, index) {
            er.splice(index, 1);
        },
        addnewrr (er) {
            er.push({
                cunkuanjine: null,
                youhuibili: null,
                jihebeishu: null,
                youhuishangxian: null,
                rukuanyouhuizengjai: true
            });
        },
        handleSubmit (name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.btload = true;
                    this.$root.HTTP_ALLLINKPOST(this.$root.HTTP_L.HTTP_TianJiaHuiYuanDengJiXinXi , this.CreatMemberBerForm)
                    .then(res=>{
                        this.$Message.success('添加成功!');
                        this.CreatMemberBerForm.levelName++;
                         this.btload = false;
                    }).catch(res=>{
                        this.btload = false;
                    })
                    // this.$Message.success('Success!');
                } else {
                    this.$Message.error('请填写完善相关信息！');
                }
            });
        }
    },
    watch: {
        CreatMemberBerForm: {
            handler (newValue, oldValue) {
                if (newValue) {
                    if (newValue.diankazhifuxuanze == '否') this.CreatMemberBerForm.diankazhifuchengdan = this.CreatMemberBerForm.diankazhifushangxian = null;

                    if (newValue.qukuanshouxufeishouqu != '自定义') this.CreatMemberBerForm.zidingyishijian = this.CreatMemberBerForm.zidingyicishu = null;

                    if (newValue.zhucesongcaijin == '否') {
                        this.CreatMemberBerForm.guanduanxinzeng = this.CreatMemberBerForm.guanduanxinzeng = '';
                        this.CreatMemberBerForm.zengsongjine = this.CreatMemberBerForm.jihejine = null;
                    }
                    if (newValue.kuaisuchongzhi == false) {
                        this.CreatMemberBerForm.kuaisuchongzhibiaoti = this.CreatMemberBerForm.kuaisuchongzhineirong = this.CreatMemberBerForm.kuaisuchongzhiwangzhi = '';
                    }
                //   newValue.cunkuanjine != null &&  newValue.youhuibili != null && newValue.jihebeishu != null ?this.CreatMemberBerForm.rukuanyouhuizengjai = false:this.CreatMemberBerForm.rukuanyouhuizengjai = true;
                }
            },
            deep: true
        }
    }
};
</script>
<style lang="less">
.table{
    th{
    }
    th.info{
        background: #d5e8fc;
    }
    th,td{
       border:1px solid #eee;
       line-height:35px;
       text-align: center;
    }
}
</style>

