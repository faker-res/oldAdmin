
<template>
    <div class="content-main member-main">
        <div class="layout">
            <div class="page-header">
                <h1 class="binding">{{$route.meta.title}}</h1>
            </div>
            <div class="page-con1">
                <div class="c_left">
                    <i-col span="6">
                        <Card dis-hover class="model_jianju">
                            <!-- <div slot="title"><div slot="title">查询条件</div></div> -->
                            <i-form :model="SearchItem">
                                <FormItem>
                                    <p>
                                        <b>日期</b>
                                    </p>
                                    <Date-picker format="yyyy年MM月dd日" type="daterange" v-model="daterange" placeholder="请选择交易日期" style="width: 100%"></Date-picker>
                                    <div>
                                        <Button :class="{'active':KuaiJie==0}" size="small" type="warning" @click="KuaiJie=0">今日</Button>
                                        <Button :class="{'active':KuaiJie==1}" size="small" type="warning" @click="KuaiJie=1">昨日</Button>
                                        <Button :class="{'active':KuaiJie==2}" size="small" type="warning" @click="KuaiJie=2">本周</Button>
                                        <Button :class="{'active':KuaiJie==3}" size="small" type="warning" @click="KuaiJie=3">上周</Button>
                                        <Button :class="{'active':KuaiJie==4}" size="small" type="warning" @click="KuaiJie=4">本月</Button>
                                        <Button :class="{'active':KuaiJie==5}" size="small" type="warning" @click="KuaiJie=5">上月</Button>
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <p>
                                        <b>代理商</b>
                                    </p>
                                    <i-input v-model="DaiLiShang" placeholder="不填入表示查询总报表" style="width: 100%"></i-input>
                                </FormItem>
                                <!-- <FormItem>
                                    <p>
                                        <b>类型</b>
                                    </p>
                                    <p>
                                        <Checkbox :checked="indeterminate" v-model="indeterminate" @click.prevent.native="handleCheckAll">全选</Checkbox>
                                    </p>
                                    <CheckboxGroup v-model="leixing">
                                        <Checkbox v-for="check in xuanzeList" :key="check.labe" :label="check.label">
                                            <span>{{check.label}}</span>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </FormItem> -->
                                <FormItem>
                                    <Button type="primary" size="large" long>查询</Button>
                                </FormItem>
                            </i-form>
                        </Card>
                        <Card style="margin-top:15px" dis-hover class="model_jianju">
                            <div slot="title">快速选取</div>
                            <div>
                                <ButtonGroup style="margin-bottom:10px">
                                    <Button type="ghost" @click="ChuanName=['全站']" >全站</Button>
                                    <Button type="ghost">清空</Button>
                                </ButtonGroup>
                                <ButtonGroup size="small">
                                    <Button style="margin-bottom:5px" v-for="(item,index) in BetRecordGetSupplierCategories" :key="index" @click="ChuanName=[item.Text]">{{item.Text}}</Button>
                                </ButtonGroup>
                                <ButtonGroup size="small">
                                    <Button  type="primary" style="margin-bottom:5px" v-for="(item,index) in BetRecordGetKindCategories" :key="index" @click="PropertyName(item,index)">{{item.Text}}</Button>
                                </ButtonGroup>
                            </div>
                        </Card>
                    </i-col>
                </div>
                <div class="c_right">
                    <i-col span="17" offset="1">
                        <Card dis-hover>
                            <!-- <div slot="title">查询结果</div> -->
                            <div class="serach">
                                <div class="have_con">
                                    <SearchData1 :listdata='listdata' :allData="{daterange,DaiLiShang,ChuanName}"></SearchData1>
                                </div>
                            </div>
                        </Card>
                    </i-col>
                </div>
            </div>
        </div>
        <Modal class-name="vertical-center-modal"  v-model="XuanQu" title="选取会员等级">
            <div class="xuanze">
                <a href="javascript:" @click="quanxuan">全选</a>
                <a href="javascript:" @click="qingkong">清空</a>
            </div>
            <CheckboxGroup v-model="HuiYuanDengJi">
                <Checkbox label="未分层（新会员）">
                    <span>未分层（新会员）</span>
                </Checkbox>
                <Checkbox label="第一层（普通会员）">
                    <span>第一层（普通会员）</span>
                </Checkbox>
                <Checkbox label="第二层（普通会员）">
                    <span>第二层（普通会员）</span>
                </Checkbox>
                <Checkbox label="第十级（高级会员）">
                    <span>第十级（高级会员）</span>
                </Checkbox>
            </CheckboxGroup>
        </Modal>
        <Modal class-name="vertical-center-modal"  v-model="JinJieSouSuo" :styles="{top: '10px'}" title="进阶搜索">
            <i-form :model="formValidate" label-position="left">
                <FormItem class="form-group">
                    <label class="label">真实姓名</label>
                    <i-input v-model="formValidate.XingMing.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.XingMing.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">手机</label>
                    <i-input v-model="formValidate.ShouJi.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.ShouJi.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">性别</label>
                    <Select v-model="formValidate.XingBie.value" style="width:260px">
                        <Option value="男" label="男">
                            <span>男</span>
                        </Option>
                        <Option value="女" label="女">
                            <span>女</span>
                        </Option>
                    </Select>
                    <RadioGroup v-model="formValidate.XingBie.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">Email</label>
                    <i-input v-model="formValidate.YouXiang.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.YouXiang.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">生日</label>
                    <DatePicker v-model="formValidate.ShengRi.value" type="daterange" placement="bottom-end" placeholder="选择生日" style="width: 260px"></DatePicker>
                    <RadioGroup v-model="formValidate.ShengRi.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">微信号</label>
                    <i-input v-model="formValidate.WeiXinHao.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.WeiXinHao.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">QQ</label>
                    <i-input v-model="formValidate.QQ.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.QQ.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">银行帐号</label>
                    <i-input v-model="formValidate.YinHangKaHao.value" style="width: 260px"></i-input>
                    <RadioGroup v-model="formValidate.YinHangKaHao.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <!-- <FormItem class="form-group">
                <label class="label">生日</label>
                <DatePicker v-model="formValidate.ShengRi.value" type="daterange" placement="bottom-end" placeholder="选择生日" style="width: 260px"></DatePicker>
                <RadioGroup v-model="formValidate.ShengRi.bh">
                    <Radio label="完全"></Radio>
                    <Radio label="包含"></Radio>
                </RadioGroup>
            </FormItem> -->
                <FormItem class="form-group">
                    <label class="label">最后投注</label>
                    <DatePicker v-model="formValidate.ZuiHouTouZhu.value" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="最后投注时间" style="width: 260px"></DatePicker>
                    <RadioGroup v-model="formValidate.ZuiHouTouZhu.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem class="form-group">
                    <label class="label">上次登入</label>
                    <DatePicker v-model="formValidate.ShangCiDengLu.value" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="上次登录时间" style="width: 260px"></DatePicker>
                    <RadioGroup v-model="formValidate.ShangCiDengLu.bh">
                        <Radio label="完全"></Radio>
                        <Radio label="包含"></Radio>
                    </RadioGroup>
                </FormItem>
            </i-form>
        </Modal>
    </div>
</template>

<script>
// import sunyi from "./components/sunyi.vue";
// import youxiao from "./components/youxiao.vue";
// import baobiaochengxian from "./components/baobiaochengxian.vue";
import SearchData1 from './components/SearchData.vue';

export default {
    name: 'Statistics',
    components: { SearchData1 },

    data () {
        var start = this.$moment().format('l');
        var end = start;
        var that = this;
        return {
            listdata: null,
            DaiLiShang: '',
            ChuanName: [],
            KuaiJie: 0,
            ZongXuanZe: '全站',
            BetRecordGetSupplierCategories: [],
            BetRecordGetKindCategories: [],
            dateOption: {
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            // debugger
                            return [that.$moment().format('l'), end];
                        }
                    },
                    {
                        text: '昨日',
                        value () {
                            return [
                                that
                                    .$moment()
                                    .subtract(1, 'days')
                                    .format('l'),
                                that
                                    .$moment()
                                    .subtract(1, 'days')
                                    .format('l')
                            ];
                        }
                    },
                    {
                        text: '本周',
                        value () {
                            return [
                                that
                                    .$moment()
                                    .subtract(7, 'days')
                                    .format('l'),
                                end
                            ];
                        }
                    },
                    {
                        text: '上周',
                        value () {
                            return [
                                that
                                    .$moment()
                                    .subtract(14, 'days')
                                    .format('l'),
                                that
                                    .$moment()
                                    .subtract(7, 'days')
                                    .format('l')
                            ];
                        }
                    },
                    {
                        text: '本月',
                        value () {
                            return [
                                that
                                    .$moment()
                                    .subtract(1, 'months')
                                    .format('l'),
                                end
                            ];
                        }
                    },
                    {
                        text: '上月',
                        value () {
                            return [
                                that
                                    .$moment()
                                    .subtract(2, 'months')
                                    .format('l'),
                                that
                                    .$moment()
                                    .subtract(1, 'months')
                                    .format('l')
                            ];
                        }
                    }
                ]
            },
            xuanzeList: [
                { value: '公司入款', label: '公司入款' },
                { value: '线上支付', label: '线上支付' },
                { value: '线上取款', label: '线上取款' },
                { value: '人工存款', label: '人工存款' },
                { value: '优惠活动', label: '优惠活动' },
                { value: '返水', label: '返水' },
                { value: '派彩', label: '派彩' },
                { value: '其他', label: '其他' }
            ],
            //   leixing: [],
            //   checked: false,
            //   indeterminate: false,
            //   checkAll: false,

            SearchItem: {
                danhao: ''
            },
            date_start: '',
            date_end: '',
            daterange: [],
            cityList: [
                {
                    value: '停用',
                    label: '停用'
                },
                {
                    value: '启用',
                    label: '启用'
                },
                {
                    value: '钱包冻结',
                    label: '钱包冻结'
                }
            ],
            fanshuiList: [
                {
                    value: '是',
                    label: '是'
                },
                {
                    value: '否',
                    label: '否'
                }
            ],
            model1: '',
            model2: '',
            XuanQu: false,
            JinJieSouSuo: false,
            HuiYuanDengJi: [],
            formValidate: {
                XingMing: { value: '', bh: '' },
                ShouJi: { value: '', bh: '' },
                XingBie: { value: '', bh: '' },
                YouXiang: { value: '', bh: '' },
                ShengRi: { value: '', bh: '' },
                WeiXinHao: { value: '', bh: '' },
                QQ: { value: '', bh: '' },
                YinHangKaHao: { value: '', bh: '' },
                ZuiHouTouZhu: { value: '', bh: '' },
                ShangCiDengLu: { value: '', bh: '' }
            }
        };
    },
    computed: {},
    mounted () {
        var that = this;
        this._KuaiJie();
        this.$http
            .get('./src/data/BetRecordGetSupplierCategories.json')
            .then(function (res) {
                that.BetRecordGetSupplierCategories = res.data;
            });
        this.$http
            .get('./src/data/BetRecordGetKindCategories.json')
            .then(function (res) {
                that.BetRecordGetKindCategories = res.data;
            });
        this.getdata();
    },
    methods: {
    // handleCheckAll() {
    //   if (this.indeterminate) {
    //     this.checkAll = false;
    //   } else {
    //     this.checkAll = !this.checkAll;
    //   }
    //   this.indeterminate = false;
    //   if (this.checkAll) {
    //     this.leixing = this.xuanzeList.map(x => x.label);
    //   } else {
    //     this.leixing = [];
    //   }
    // },
        PropertyName (b, i) {
            var that = this;
            that.ChuanName = [];
            b.Categories.map(function (l, x, c) {
                that.ChuanName.push(l.FullName);
            });
        // that.ChuanName.join('、')
        },
        getdata () {
            let vm = this;
            this.$http
                .get('https://randomuser.me/api/?results=2', {})
                .then(function (response) {
                    vm.listdata = response.data.results;
                })
                .catch(function (error) {
                });
        },
        quanxuan () {
            this.HuiYuanDengJi = [
                '未分层（新会员）',
                '第一层（普通会员）',
                '第二层（普通会员）',
                '第十级（高级会员）'
            ];
        },
        qingkong () {
            this.HuiYuanDengJi = [];
        },
        _KuaiJie () {
            this.daterange = this.dateOption.shortcuts[this.KuaiJie].value();
            //   this.daterange =[this.$moment().format("L"), this.$moment().format("L")];
            this.date_start = this.$moment(this.daterange[0]).format('l');
            this.date_end = this.$moment(this.daterange[1]).format('l');
        }
    },
    watch: {
        KuaiJie: {
            handler () {
                this._KuaiJie();
            },
            immediate: true
        },
        daterange: {
            handler (newValue, oldValue) {
                this.date_start = this.$moment(newValue[0]).format('l');
                this.date_end = this.$moment(newValue[1]).format('l');
            },
            deep: true
        },
        leixing: {
            handler (newValue, oldValue) {
                newValue.length == this.xuanzeList.length
                    ? (this.indeterminate = true)
                    : (this.indeterminate = false);
            },
            deep: true
        }
    }
};
</script>
<style scoped lang='less'>
.member-main {
}
.xuanze {
  margin-bottom: 10px;
}
.form-group {
  .label {
    display: inline-block;
    text-align: right;
  }
  .ivu-date-picker,
  .ivu-select,
  .ivu-input-wrapper {
    margin: 0 5px;
  }
  margin-bottom: 5px;
}
.c_ser {
  margin-bottom: 10px;
  span.xian {
    width: 10%;
    display: inline-block;
    text-align: center;
  }
}
</style>
