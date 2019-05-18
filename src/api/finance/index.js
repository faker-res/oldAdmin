export default {
    //存取款汇总
    HTTP_List_FinanceSummary: '/finance/index', //存取款汇总
    HTTP_Statistics_FinanceSummary: '/finance/statistics', //存取款汇总总计
    HTTP_Export_FinanceSummary: '/finance/export', //存取款汇总导出

    // 存款提款
    HTTP_CunKuanLieBiao: '/deposit/index', // 存款列表页（所有）
    HTTP_GongSiRuKuanLieBiao: '/deposit/offline', // 公司入款列表
    HTTP_Total_Offline: '/deposit/offline_statistics', // 公司入款总计
    HTTP_ZaiXianZhiFuRuKuanLieBiao: '/deposit/online', // 在线支付列表
    HTTP_Total_Online: '/deposit/online_statistics', // 在线支付总计
    HTTP_CunKuanShenHe: '/deposit/audit', // 存款审核
    HTTP_CunKuanXiangQing: '/deposit/show', // 存款详情
    HTTP_CunKuanZaiXianZhiFuLieBiao: '/deposit/payment', // 会员存款时的在线支付列表
    HTTP_XiTongRuKuanKaLieBiao: '/deposit/bank', // 会员存款时的系统入款卡列表
    HTTP_QuKuanLieBiao: '/withdrawals/index', // 提款列表页（所有）
    HTTP_Total_Withdrawals: '/withdrawals/statistics', // 提款列表总计
    HTTP_TiKuanShenHe: '/withdrawals/audit', // 提款审核
    HTTP_TiKuanXiangQing: '/withdrawals/show', // 提款详情
    HTTP_XiTongChuKuanKaLieBiao: '/withdrawals/bank', // 会员提款时的系统出款卡列表
    HTTP_BetAmountCheck: '/games/betAmountCheck', // 用户当前打码量详情

    HTTP_XiaZhuPingTai: '/bet/total', // 下注平台
    HTTP_ZhuanZhangPingTai: '/bet/transfer', // 转账平台走向类型
    HTTP_ZiJinZouXiang: '/bet/finance', // 资金走向类型
    HTTP_ZiJinZouXiangJiLu: '/finance/trend', // 资金走向记录

    HTTP_List_QR_code: '/payment/qr_code', //二维码列表
    HTTP_Create_QR_code: '/payment/qr_code_create', //新增二维码
    HTTP_Delete_QR_code: '/payment/qr_code_delete', //删除二维码
    HTTP_Update_QR_code: '/payment/qr_code_update', //修改二维码
    HTTP_Show_QR_code: '/payment/qr_code_show', //二维码详情
    HTTP_Status_QR_code: '/payment/qr_change_status', //二维码状态
}