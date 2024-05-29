import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

if (!global.myModule) {
  // global.myModule = require('myModule'); // 检查模块是否已经在global对象中，没有则引入并添加到global对象中
}

import auth from "../app/Http/Middleware/auth.js"
import { homeRouter, adminRouter } from "../routes/index.js"
const app = express()
const port = 5001

app.use(express.static("public"))
app.use(cors()).use(bodyParser.json())

app.use("/api", homeRouter)
app.use("/admin", auth, adminRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
