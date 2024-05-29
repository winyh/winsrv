import jwt from "jsonwebtoken"
import { jwtSecretKey, expiresIn } from "../../../config/config.js"

const auth = (req, res, next) => {
  const { authorization } = req.headers
  const { originalUrl } = req
  const noAuthApi = ["/admin/login", "/admim/register"]
  if (noAuthApi.includes(originalUrl)) {
    next()
  } else {
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      const token = authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({
          status: false,
          code: 401,
          msg: "无效token",
          data: {}
        })
      }

      try {
        const decoded = jwt.verify(token, jwtSecretKey)
        req.sessions = decoded
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          // 处理token过期错误
          return res
            .status(401)
            .json({ error: "Token expired, please login again" })
        } else {
          // 处理其他jwt错误
          return res.status(401).json({ error: "Invalid or expired token" })
        }
      }
    } else {
      return res.status(401).json({ error: "Invalid token" })
    }
    next()
  }
}

export default auth
