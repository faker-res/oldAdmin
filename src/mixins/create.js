import AutoComplete from '@/template/my-components/AutoComplete.vue';
import LevelSelect from '@/template/my-components/LevelSelect.vue';
import SiteNameSelect from '@/template/my-components/SiteNameSelect.vue';
import SiteRefundSelect from '@/template/my-components/SiteRefundSelect.vue';
import RebateSelect from '@/template/my-components/RebateSelect';
import PayClassSelect from '@/template/my-components/PayClassSelect.vue';
// import MemberRefundSelect from '@/template/my-components/MemberRefundSelect.vue';
import UploadImg from '@/template/my-components/uploadImg.vue';

// 创建/修改页面公用
const mixins = {
    components: {
        AutoComplete,
        LevelSelect,
        SiteNameSelect,
        SiteRefundSelect,
        RebateSelect,
        PayClassSelect,
        UploadImg
        // MemberRefundSelect
    },
    data () {
        return {
            statusList: [
                {
                    value: 'no',
                    label: '停用'
                },
                {
                    value: 'yes',
                    label: '启用'
                }
            ],
            rebateConOfMember: {
                type: 'member', // 会员和代理一样
                data: {},
                id: null,
                siteId: null,
                limit: true//是否显示上限
            },
            rebateConOfSite: {
                type: 'site',
                data: {},
                id: null,
                siteId: null,
            },
            SiteNameSelectData: {
                type: '单选',
                placeholder: '请选择站点名称',
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfMember: {
                model: 'MemberLevelModel',
                type: '单选',
                isLevelById: true,
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfRefund: {
                model: 'MemberRefundLevelModel',
                type: '单选',
                isLevelById: true,
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfAgency: {
                model: 'AgencyLevelModel',
                type: '单选',
                isLevelById: true,
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfCommon: {
                model: 'CommonLevelCreate',
                type: '单选',
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfAgencyMultiple: {// 站内信
                model: 'AgencyLevelModel',
                type: '多选',
                isLevelById: true,
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfMemberMultiple: {// 站内信
                model: 'MemberLevelModel',
                type: '多选',
                isLevelById: true,
                style: {
                    width: '260px'
                }
            },
            LevelSelectOfMultiple: { // 二维码支付,系统出款卡
                model: 'MemberLevelModel',
                type: '多选',
                isLevelById: true,
                placeholder: '请选择等级',
                style: {
                    width: '260px'
                }
            },
            AutoCompleteData: {
                siteId: '',
                type: '指定代理',
                xuanzhong: false, // 是否多选
                style: {
                    width: '260px'
                },
                tip: '输入代理名称,可查询,5-20个字符'
            },
            AutoCompleteDataOfMember: {// 站内信
                type: '指定会员',
                siteId: '',
                xuanzhong: false, // 多选
                style: {
                    width: '260px'
                },
                tip: '输入会员名称,带搜索功能,5-20个字符'
            },
            AutoCompleteDataOfAgency: {// 站内信
                type: '指定代理',
                siteId: '',
                xuanzhong: false, // 多选
                style: {
                    width: '260px'
                },
                tip: '输入代理名称,带搜索功能,5-20个字符'
            },
            refundLevelNameSelectData: {
                type: '单选',
                placeholder: '请输入返水等级',
                data: {
                    id: '',
                    refundLevelName: ''
                }
            },
            SiteRefundSelectData: {
                siteId: '',
                maxNum: true,
                id: ''// 上级的id
            },
            SiteRefundSelectOfBouns: { // 新增反水等级配置
                siteId: '',
                maxNum: false,
                id: ''
            },
            PayClassSelectOfPay: {
                status: 'yes',
                default: false, // 默认不选中
                classType: 'payment',
                type: '多选',
                placeholder: '请选择支付分组',
                style: {
                    width: '260px'
                }
            },
            PayClassSelectOfQR: {
                type: '单选',
                placeholder: '选择支付类型',
                style: {
                    width: '260px'
                },
                classType: 'qr_code'
            }
        };
    },
    computed: {
        defaultSiteId () {
            return JSON.parse(localStorage.AllSiteNameList)[0].id;
        }
    },
    methods: {

    }
};
export default mixins;
