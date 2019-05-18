import SiteNameSelect from '@/template/my-components/SiteNameSelect.vue';
import MyTable from '@/template/my-components/iview-table/table';
import LevelSelect from '@/template/my-components/LevelSelect.vue';
import FinanceSelect from '@/template/my-components/FinanceSelect.vue';
import PayClassSelect from '@/template/my-components/PayClassSelect.vue';
// import TableNameSelect from "@/template/my-components/TableNameSelect.vue";
// 列表页面公用
const mixins = {
    components: {
        MyTable,
        SiteNameSelect,
        LevelSelect,
        FinanceSelect,
        PayClassSelect
        // TableNameSelect
    },
    data () {
        return {
            Time: [],
            autoFresh: '0',
            autoFreshTimer: null,
            disabled: false, // 日期选择禁用
            levelList: [], // 等级
            statusList: [
                { value: 'no', label: '停用' },
                { value: 'yes', label: '启用' }
            ],
            SiteNameSelectData: {
                type: '单选',
                placeholder: '请输入站点名称',
                style: {
                    width: '120px'
                }
            },
            LevelSelectOfMember: {
                model: 'MemberLevelModel',
                type: '单选',
                isLevelById: true,
                style: {
                    width: '120px'
                }
            },
            LevelSelectOfAgency: {
                model: 'AgencyLevelModel',
                type: '单选',
                isLevelById: true,
                style: {
                    width: '120px'
                }
            },
            LevelSelectOfCommon: {
                model: 'CommonLevelCreate',
                type: '单选',
                style: {
                    width: '120px'
                }
            },
            FinanceSelectData: {
                flag: true, // 标识，该页面的类型下拉框不需要显示所有
                placeholder: '请选择',
                style: {
                    width: '200px'
                }
            },
            PayClassSelectData: {
                type: '单选',
                flag: true, // 下拉加一个全部选项
                default: true, // 默认选中
                placeholder: '选择支付类型',
                style: {
                    width: '160px'
                },
                classType: 'qr_code'
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
            }
            // TableNameSelectOfMemberLog: {
            //     placeholder: "请选择",
            //     type: "member_log",
            //     style: {
            //         width: "150px"
            //     }
            // },
            // TableNameSelectOfMemberFund: {
            //     placeholder: "请选择",
            //     type: "member_balance_log",
            //     style: {
            //         width: "150px"
            //     }
            // },
            // TableNameSelectOfAgencyLog: {
            //     placeholder: "请选择",
            //     type: "agency_log",
            //     style: {
            //         width: "150px"
            //     }
            // },
            // TableNameSelectOfAgencyFund: {
            //     placeholder: "请选择",
            //     type: "agency_balance_log",
            //     style: {
            //         width: "150px"
            //     }
            // },
        };
    },
    computed: {
        defaultSiteId () {
            return JSON.parse(localStorage.AllSiteNameList)[0].id;
        }
    },
    watch: {
        // 自动刷新
        autoFresh (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.autoFreshFun(newVal);
            }
        }
    },
    methods: {
        memberCountSearch () {
            // 从会员详情页跳过来查询会员等级人数时调用该方法，进行查询
            if (Object.keys(this.$route.params).length > 0) {
                Object.assign(this.search, this.search, this.$route.params);
                const { levelId } = this.$route.params;
                this.$refs.LevelSelect.setDefaultLevel(levelId);
                this.SearchSubmit();
            }
        },
        levelFilter (id, levelName) {
            let obj = this.$refs.LevelSelect.levelList.filter(item => id === item.levelLabel);
            if (obj && obj[0]) {
                return obj[0].levelAlias;
            } else {
                return levelName;
            }
        },
        levelChange (re) {
            this.search.levelId = re.levelLabel;
        },
        autoFreshFun (val) {
            if (val === '0') {
                clearInterval(this.autoFreshTimer);
                this.disabled = false;
            } else {
                // 选择刷新，即刷新最新数据，时间不能选择，立即刷新一次
                this.disabled = true;
                this.updateTime();
                this.Search();
                val = val * 1000;
                clearInterval(this.autoFreshTimer);
                this.autoFreshTimer = setInterval(() => {
                    this.updateTime();
                    this.Search();
                }, val);
            }
        },
        catchError (resCode) {
            // 如果请求异常就中断自动请求
            clearInterval(this.autoFreshTimer);
            this.autoFresh = '0';
        }
    },
    activated () {
        this.autoFreshFun(this.autoFresh);
    },
    deactivated () {
        clearInterval(this.autoFreshTimer);
    }
};
export default mixins;
