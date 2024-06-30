import express from "express"

import {
  LoginController,
  LogoutController,
  RegisterController,
  AdminController,
  AdminTokenController
} from "../app/Http/Controller/Admin/UserController.js"
import { DashboardController } from "../app/Http/Controller/Admin/DashboardController.js"
import {
  FindListRecordController,
  FindRecordController,
  RecordExportController,
  UpdateRecordController
} from "../app/Http/Controller/Admin/RecordController.js"

import {
  CreateTenantController,
  DestoryTenantController,
  UpdateTenantController,
  FindTenantController,
  FindAllTenantController,
  FindListTenantController
} from "../app/Http/Controller/Admin/TenantController.js"

const adminRouter = express.Router()

/* 用户相关 */
adminRouter.post("/login", LoginController) /* 用户登录 */
adminRouter.post("/register", RegisterController) /* 用户注册 */
adminRouter.get("/logout", LogoutController) /* 退出登录 */

adminRouter.get("/user/:id", AdminController) /* 管理员账号 */
adminRouter.get("/token", AdminTokenController) /* 管理员信息 */

/* 控制台 */
adminRouter.get("/dashboard", DashboardController) /* 看板数据 */

/* 客户意向 */
adminRouter.get("/records", FindListRecordController) /* 客户意向列表 */
adminRouter.get("/records/export", RecordExportController) /* 信息导出 */
adminRouter.get("/records/:id", FindRecordController) /* 客户意向详情 */
adminRouter.put("/records/:id", UpdateRecordController) /* 问卷修改 */

/* 租户相关 */
adminRouter.post("/tenant", CreateTenantController) /* 新增租户 */
adminRouter.delete("/tenant", DestoryTenantController) /* 删除租户 */
adminRouter.put("/tenant", UpdateTenantController) /* 修改租户 */
adminRouter.get("/tenant/:id", FindTenantController) /* 查询租户:id */
adminRouter.get("/tenants", FindAllTenantController) /* 查询租户-所有 */
adminRouter.get("/tenant/list", FindListTenantController) /* 查询租户-分页 */

export { adminRouter }
