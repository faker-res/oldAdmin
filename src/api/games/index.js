export default {
    // 第三方游戏
    HTTP_ChaXunXiaZhuJiLu: '/games/records', // 查询下注记录
    HTTP_YouXiLeiXingXiaLaLieBiao: '/games/list', // 游戏类型下拉列表
    HTTP_QiYongYouXiPingTai: '/games/platform/enabled/',
    HTTP_JinYongYouXiPingTai: '/games/platform/disabled/',
    
    HTTP_DianZiYouXiLieBiao: '/games/gameList', // 电子游戏列表
    HTTP_DiSanFangYouXiLieBiao: '/games/platformList', // 第三方游戏列表
    HTTP_BianJiDianZiYouXi: '/games/gameList/edit/{id}', // 编辑电子游戏   /games/gameList/edit/{id}
    HTTP_ChaXunDiSanFangYuE: '/games/platform/getBalance', // 查询第三方余额
    HTTP_DiSanFangYouXiZhuanZhangJiLu: '/games/transfer', // 第三方游戏转账记录
    HTTP_DiSanFangPingTai: '/games/platformCode', // 第三方平台

    //游戏
    HTTP_YouXiLieBiao: '/game/index', // 游戏列表
    HTTP_YouXiXiangQing: '/game/show', // 游戏详情
    HTTP_ChuangJianYouXi: '/game/create', // 创建游戏
    HTTP_XiuGaiYouXi: '/game/update', // 修改游戏
    HTTP_ShanChuYouXi: '/game/delete', // 删除游戏
    HTTP_YouXiLeiXing: '/game/category', // 游戏类型

    HTTP_YouXiFenLeiLieBiao: '/game/class', // 游戏分类列表
    HTTP_YouXiFenLeiXiangQing: '/game/class_show', // 游戏分类详情
    HTTP_ChuangJianYouXiFenLei: '/game/class_create', // 创建游戏分类
    HTTP_XiuGaiYouXiFenLei: '/game/class_update', // 修改游戏分类
    HTTP_ShanChuYouXiFenLei: '/game/class_delete', // 删除游戏分类

    HTTP_ZiDuanPingBiLieBiao: '/shield_fields/index', // 字段屏蔽列表
    HTTP_ZiDuanPingBiXiangQing: '/shield_fields/index', // 字段屏蔽详情
    HTTP_ZiDuanPingBiChuangJian: '/shield_fields/create', // 创建字段屏蔽
    HTTP_ZiDuanPingBiXiuGai: '/shield_fields/update', // 修改屏蔽字段
    HTTP_ZiDuanPingBiShanChu: '/shield_fields/delete', // 删除屏蔽字段
    HTTP_ShuJuKuBiaoJiLu: '/shield_fields/tables', // 数据库表记录
    HTTP_ShuJuKuBiaoZiDuan: '/shield_fields/table_fields', // 数据库表字段

    HTTP_List_GameStatus: '/game/status',// 游戏状态维护列表
    HTTP_Update_GameStatus: '/game/status_update',// 修改游戏状态维护

    // 第三方余额
    HTTP_refreshBalance: '/games/getBalance',// 刷新第三方余额
    HTTP_balanceRecycle: '/games/balanceRecycle',// 一键回收第三方余额 
}