export default {
    // 管理员首页
    // HTTP_GuanLiYuanRiZhi: '/log/admin', // 管理员日志列表
    HTTP_Admin_OperationLog: '/operation-logs', // 管理员操作日志
    HTTP_Admin_OperationLogDetail: '/operation-logs/show', // 管理员操作日志详情
    HTTP_Admin_OperationLogForm: '/operation-logs/form', // 管理员操作日志优先级和类型下拉信息
    HTTP_GuanLiYuanLieBiao: '/admin/index', // 管理员列表
    HTTP_XinJianGuanLiYuan: '/admin/create', // 新建管理员
    HTTP_ShanChuGuanLiYuan: '/admin/delete', // 删除管理员
    HTTP_XiuGaiGuanLiYuan: '/admin/update', // 修改管理员
    HTTP_GuanLiYuanZhangHaoXiangQing: '/admin/get_admin', // 管理员账号详情
    HTTP_GuanLiYuanTuiChu: '/admin/logout', // 管理员退出

    HTTP_GuanLiYuanQuanXianLieBiao: '/admin/rules', // 管理员权限列表
    HTTP_XinZengQuanXian: '/admin/rules/add', // 新增权限
    HTTP_XiuGaiQuanXian: '/admin/rules/update', // 修改权限
    HTTP_ShanChuQuanXian: '/admin/rules/delete', // 删除权限
    HTTP_QuanXianXiangQing: '/admin/rules/show', // 权限详情

    HTTP_GuanLiYuanFenZuLieBiao: '/admin/groups', // 管理员分组列表
    HTTP_GuanLiYuanZuShanChu: '/admin/group_delete', // 管理员组删除
    HTTP_GuanLiYuanZuXinZeng: '/admin/group_create', // 管理员组新增
    HTTP_GuanLiYuanZuXiangQing: '/admin/group_show', // 管理员组详情
    HTTP_GuanLiYuanZuXiuGai: '/admin/group_update', // 管理员组修改

    // 黑名单
    HTTP_HeiMingDanShanChu: '/iplimit/delete', // 黑名单删除
    HTTP_HeiMingDanGengXin: '/iplimit/update', // 黑名单更新
    HTTP_HeiMingDanTianJia: '/iplimit/create', // 黑名单添加

    HTTP_XiuGaiMiMa: '/admin/password', // 修改密码

    // 权限（新）
    HTTP_GetRolePermissionsList: '/permission', // 获取角色权限列表
    HTTP_GetRoleList: '/role', // 获取角色列表
    HTTP_CreateRole: '/role/create', // 创建角色
    HTTP_UpdateRole: '/role/update', // 更新角色
    HTTP_GetRoleDetails: '/role/show', // 角色详情
    HTTP_DeleteRole: '/role/delete', // 删除角色

    HTTP_GetMenus: '/menus/form', // 获取权限菜单
    HTTP_GetMenusDetails: '/menus/show', // 菜单详情
    HTTP_CreateMenus: '/menus/create', // 创建菜单并关联权限
    HTTP_UpdateMenus: '/menus/update', // 更新菜单及权限关联
    HTTP_DeleteMenus: '/menus/delete', // 删除菜单及权限关联
    HTTP_SortMenus: '/menus/sort', // 菜单排序
    HTTP_SearchUri: '/permission/searchUri', // 权限搜索URI
    HTTP_GetMenusList: '/menus/list' // 获取导航和一级菜单
};
