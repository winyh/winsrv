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
  RecordListController,
  RecordInfoController,
  RecordExportController,
  CreateRecordController,
  UpdateRecordController
} from "../app/Http/Controller/Admin/RecordController.js"
const adminRouter = express.Router()
const homeRouter = express.Router()

adminRouter.post("/login", LoginController) /* 用户登录 */
adminRouter.post("/register", RegisterController) /* 用户注册 */
adminRouter.get("/logout", LogoutController) /* 退出登录 */
adminRouter.get("/dashboard", DashboardController) /* 看板数据 */

adminRouter.get("/records", RecordListController) /* 客户意向列表 */
adminRouter.get("/records/export", RecordExportController) /* 信息导出 */
adminRouter.get("/records/:id", RecordInfoController) /* 客户意向详情 */
adminRouter.put("/records/:id", UpdateRecordController) /* 问卷修改 */

adminRouter.get("/user/:id", AdminController) /* 管理员账号 */
adminRouter.get("/token", AdminTokenController) /* 管理员信息 */

homeRouter.post("/record", CreateRecordController) /* 问卷提交 */

export { homeRouter, adminRouter }
