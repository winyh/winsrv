import express from "express"
const homeRouter = express.Router()

import { CreateRecordController } from "../app/Http/Controller/Home/RecordController.js"

//* == 前台路由 == *//
homeRouter.post("/record", CreateRecordController) /* 问卷提交 */

export { homeRouter }
