export default {
    // 彩票模块
    HTTP_CaiPiaoCanShuSheZhi: '/lottery/getSets', // 彩票参数设置（获取）
    HTTP_CaiPiaoCanShuGengXin: '/lottery/updateSets', // 彩票参数设置（更新）

    HTTP_TingYongCaiZhong: '/lottery/disabled', // 停用彩种
    HTTP_QiYongCaiZhong: '/lottery/enabled', // 启用彩种
    HTTP_SuoYouCaiZhongLieBiao: '/lottery/getlist', // 获取所有彩种列表
    HTTP_GengXinShiJianJiLu: '/lottery/time/updateOne', // 更新一条时间记录
    HTTP_HuoQuCaiPiaoShiJianSheZhi: '/lottery/time/getList', // 获取彩票时间设置
    HTTP_GengXinCaiPiaoPeiLv: '/lottery/odds/updateOne', // 更新彩票赔率
    HTTP_HuoQuCaiPiaoPeiLv: '/lottery/odds/getOne', // 获取彩票的赔率
    HTTP_LiuHeCaiKaiJiangShiJian: '/lottery/time/sixGetList', // 六合彩开奖时间列表
    HTTP_LiuHeCaiKaiJiangShiJianTianJia: '/lottery/time/sixAdd', // 六合彩开奖时间添加
    HTTP_LiuHeCaiKaiJiangShiJianShanChu: '/lottery/time/sixDel', // 六合彩开奖时间删除
    HTTP_LiuHeCaiKaiJiangShiJianXiuGai: '/lottery/time/sixUpdate', // 六合彩开奖时间修改
    HTTP_SheZhiLiuHeCaiKaiJiangQi: '/lottery/time/sixSetCurrent', // 设置六合彩开奖期数
    HTTP_SheZhiLiuHeCaiKaiJiangHaoMa: '/lottery/addXglhc', // 设置六合彩开奖号码

    HTTP_CaiPiaoFenLeiGengXinLei: '/lottery/class/updateOne',
    HTTP_CaipiaoFenLeiXiangQing: '/lottery/class/updateLotteryOne',
    HTTP_CaiPiaoFenLeiZongLan: '/lottery/class/getLotteryList',
    HTTP_CaiPiaoFenLeiList: '/lottery/class/getList',

    HTTP_CaiPiaoTianJia: '/lottery/class/add',
    HTTP_CaiPiaoFenLeiTianJia: '/lottery/class/addLottery',
    HTTP_CaiPiaoFenLeiShanChu: '/lottery/class/del',
    HTTP_CaiPiaoFenLeiShanChuCaiPiao: '/lottery/class/delLottery',
    HTTP_CaiPiaoFenLeiGengXinCaiPiao: '/lottery/class/updateLotteryBatch',
    HTTP_CaiPiaoFenLeiCaiPiaoPaiXu: '/lottery/class/updateBatch',

    //彩票管理 
    HTTP_KuaiSuChuShiHuaPeiZhi: '/fastLottery/initData', // 初始化配置
    HTTP_KuaiSuKaiJiangJieGuo: '/fastLottery/openData', // 开奖结果
    HTTP_KuaiSuShuJuZongLan: '/fastLottery/index', // 数据总览
    HTTP_KuaiSuGengXinPeiZhi: '/fastLottery/update',// 更新配置
    HTTP_CaiPiaoYouXiXiaLa: '/games/list',// 彩票游戏下拉
    HTTP_CaiPiaoYouXiLieBiao: '/lottery/LotteryAll',// 彩票游戏列表
    HTTP_LotteryClearing: '/lottery/time/lotteryPayMoney',//彩票结算
    HTTP_BatchLotteryTime: '/lottery/time/updateAll',//批量修改彩票时间
    HTTP_QuicklyLotteryBackList: '/fastLottery/blackList',//黑名单列表
    HTTP_QuicklyLotteryBackList_Add: '/fastLottery/blackListAdd',//添加黑名单
    HTTP_QuicklyLotteryBackList_Delete: '/fastLottery/blackListDel',//删除黑名单
    HTTP_Clean_LotteryRedis: '/lottery/cleanLotteryRedis',//清除彩票玩法赔率缓存
    HTTP_Update_OpenData: '/fastLottery/updateOpenData',//修改彩票开奖结果

    //开奖管理
    HTTP_Get_OpenLotteryRecord: '/lottery/openLottery',//获取彩票开奖记录
    HTTP_Insert_OpenLotteryNumber: '/lottery/addNumLottery',// 添加彩票开奖号码
    HTTP_Get_LotteryRecordOfYes: '/lottery/getLottery',// 获取当前所有状态为开启的彩票 
    HTTP_Update_OpenLotteryResult: '/lottery/upNumLottery',// 修改彩票开奖结果 
    HTTP_Update_AgainPrize: '/lottery/againPrize',// 回滚重新派奖 

    //撤单管理
    HTTP_Get_CancellationList: '/lottery/noNumLottery',// 获取撤单列表
    HTTP_Update_CancellationList: '/lottery/revocationLottery',// 进行撤单

    // 彩票返点
    HTTP_Get_Lottclass: '/lottery/getrebatedata'//获取彩票返点
}