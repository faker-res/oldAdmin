export default {
    // 在线支付
    HTTP_ZaiXianZhiFuLieBiao: '/payment/index', // 在线支付列表
    HTTP_ZaiXianZhiFuXiangQing: '/payment/show', // 在线支付账号详情
    HTTP_ZaiXianZhiFuShanChu: '/payment/delete', // 在线支付账号删除
    HTTP_ZaiXianZhiFuXiuGai: '/payment/update', // 在线支付账号修改
    HTTP_ZaiXianZhiFuChuangJian: '/payment/create', // 在线支付账号创建

    // 在线支付(新)
    HTTP_List_Payment: '/payment_new/index', // 在线支付列表
    HTTP_Detail_Payment: '/payment_new/show', // 在线支付账号详情
    HTTP_Delete_Payment: '/payment_new/delete', // 在线支付账号删除
    HTTP_Update_Payment: '/payment_new/update', // 在线支付账号修改
    HTTP_Create_Payment: '/payment_new/create', // 在线支付账号创建
    HTTP_Payment_Name: '/payment/name', // 系统支付账号名称
    HTTP_Payment_Status: '/payment/sequence', // 支付账号的排序与状态
    HTTP_Payment_LevelManage: '/payment/level', // 支付账号的排序与状态

    // 在线支付分组
    HTTP_ZaiXianZhiFuFenZuLieBiao: '/payment/class', // 在线支付分组列表
    HTTP_ZaiXianZhiFuFenZuXiaLaLieBiao: '/payment/category', // 在线支付分组下拉列表
    HTTP_ZaiXianZhiFuFenZuChuangJian: '/payment/class_create', // 在线支付分组创建
    HTTP_ZaiXianZhiFuFenZuXiangQIng: '/payment/class_show', // 在线支付分组详情
    HTTP_ZaiXianZhiFuFenZuXiuGai: '/payment/class_update', // 在线支付分组修改
    HTTP_ZaiXianZhiFuFenZuShanChu: '/payment/class_delete', // 在线支付分组删除
    HTTP_PaymentClass_Status: '/payment/class_sequence', // 在线支付分组的排序与状态

    //系统出入款卡
    HTTP_XiTongChuKuanKaJiLu: '/bank/out', // 系统出款卡记录
    HTTP_XiTongRuKuanKaJiLu: '/bank/in', // 系统入款卡记录 
    HTTP_ShanChuXiTongChuRuKuanKa: '/bank/delete', // 删除系统出入款卡
    HTTP_XinZengXiTongChuRuKuanKa: '/bank/create', // 新增系统出入款卡
    HTTP_ChuRuKuanKaXiangQing: '/bank/show', // 出入款卡详情
    HTTP_XiuGaiXiTongChuRuKuanKa: '/bank/update', // 修改系统出入款卡
}