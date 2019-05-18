export default {
    // 缓存
    HTTP_GenJuZuMingShanChuHuanCun: '/v1/site/delRedisGroup', // 根据组名删除缓存
    HTTP_GeShiDaYinHuanCunLieBiao: '/v1/site/cache', // 格式化打印redis缓存列表
    HTTP_GenJuHuanCunMingChengJingZhunShanChu: '/v1/site/delRedisName', // 根据缓存名称精确删除缓存信息
    HTTP_QingkongSuoYouHuanCun: '/v1/site/delAll', // 清空所有redis缓存

    // 系统预设
    HTTP_HuoQuChuShiDengJiLieBiao: '/v1/level/index', // 获取初始等级列表
    HTTP_HuoQuDengJiXiangQing: '/v1/commonLevel/show', // 获取等级详情
    HTTP_ChuangJianChuShiDengJi: '/v1/level/create', // 创建初始等级
    HTTP_XiuGaiChuShiDengJi: '/v1/level/store', // 修改初始等级
    HTTP_HuoQuDengJiChuShiZiDuan: '/v1/level/column', // 获取等级初始字段

    HTTP_HuoQuGongGongDengJi: '/v1/commonLevel/index', // 获取公共等级
    HTTP_ChuangJianGongGongDengJi: '/v1/commonLevel/create', // 创建公共等级
    HTTP_BianJiGongGongDengJi: '/v1/commonLevel/store', // 编辑公共等级
    HTTP_GongGongDengJiXiangQing: '/v1/commonLevel/show', // 公共等级详情

    HTTP_HuoQuYinHangLieBiao: '/bank/in', // 获取银行列表
    HTTP_TianJiaYinHang: '/v1/bank/create', // 添加银行
    HTTP_XiuGaiYinHang: '/v1/bank/store', // 修改银行
    HTTP_HuoQuYinHangXiangQing: '/v1/bank/show', // 银行详情

    HTTP_CuiZhangJiLu: '/emergency/index', // 催帐记录
    HTTP_CuiZhangHuiFuChuLi: '/emergency/audit', // 催帐回复处理

    HTTP_FuWuDuanRiZhiLieBiao: '/logs/index', // 服务端日志列表
    HTTP_FuWuDuanRiZhiXiangQing: '/logs/show', // 服务端日志详情
    HTTP_FuWuDuanRiZhiShanChu: '/logs/destroy', // 服务端日志删除

    HTTP_GongGongLeiXingZu: '/v1/config/type', // 类型组

    HTTP_Get_SystemGame: '/system/game', // 获取站点下游戏分类
    HTTP_Update_SystemGame: '/system/game/update', // 配置站点下游戏的简介，排序，状态
    HTTP_UpDown_SystemGame: '/system/game/sequence', // 配置站点下游戏的升降序

    HTTP_List_Files: '/files/list', // 图片库列表
    HTTP_Upload_Files: '/files/upload', // 上传图片

    // 轮播管理
    HTTP_CarouselList: '/promotion/index', // 轮播列表
    HTTP_ModifyCarouselInfo: '/promotion/updateBanner', // 修改轮播信息
    HTTP_DeleteCarousel: '/promotion/deleteBanner', // 删除轮播

    HTTP_RemindMessage: '/admin/remind', // 消息提醒

    // 站点管理
    HTTP_ZhanDianGuanLiLieBiao: '/system/index', // 站点列表
    HTTP_ZhanDianXiangQing: '/system/show', // 站点详情
    HTTP_ZhanDianXinZeng: '/system/create', // 站点新增
    HTTP_ZhanDianXiuGai: '/system/update', // 站点修改
    HTTP_GetServer: '/system/db-id', // 获取服务器

    // 站内信
    HTTP_ZhanNeiXinLieBiao: '/message/index', // 站内信列表 包括搜索的列表
    HTTP_FaSongZhanNeiXin: '/message/send', // 发送站内信
    HTTP_ShouJianXiang: '/message/inbox', // 收件箱
    HTTP_SiteMail_Reply: '/message/reply' // 收件箱回信
}
;
