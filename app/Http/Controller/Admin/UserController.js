import prisma from "../../../../prisma/client.js"
import { jwtSecretKey, expiresIn } from "../../../../config/config.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const LoginController = async (req, res) => {
  const { username, password } = req.body
  // 1.校验必填
  if (username === "" || password === "") {
    res.json({
      status: false,
      code: 200,
      msg: "用户名和密码不能为空",
      data: {}
    })
  }

  // 2.查询用户是否存在
  let admin = {}
  try {
    admin = await prisma.admin.findUnique({
      where: { username }
    })
    if (!admin) {
      res.json({
        status: false,
        code: 200,
        msg: "用户不存在!",
        data: {}
      })
    }
  } catch (error) {
    res.json({
      status: false,
      code: 200,
      msg: "用户不存在!",
      data: {}
    })
  }

  // 3.校验密码
  const hash = admin.password
  if (!bcrypt.compareSync(password, hash)) {
    res.json({
      status: false,
      code: 200,
      msg: "用户名或密码错误!",
      data: {}
    })
  }

  // 4.是否禁用
  if (!admin.status === "0") {
    res.json({
      status: false,
      code: 200,
      msg: "当前用户已禁用，请联系管理员!",
      data: {}
    })
  }

  // 4.用户信息加密生成 token
  const user = {
    id: admin.id,
    username: admin.username,
    mobile: admin.mobile,
    email: admin.email,
    avator: admin.avator,
    status: admin.status
  }
  const token = jwt.sign(user, jwtSecretKey, {
    expiresIn
  })

  try {
    const result = await prisma.admin.update({
      where: { id: Number(admin.id) },
      data: { token }
    })
    if (result) {
      res.json({
        status: true,
        code: 200,
        msg: "成功",
        data: {
          token
        }
      })
    }
  } catch (error) {
    res.json({
      status: false,
      code: 200,
      msg: "失败",
      data: error
    })
  }
}

const RegisterController = async (req, res) => {
  const { username, mobile, email, password, confirm_password } = req.body
  // 1.校验表单是否合法
  if (
    username === "" ||
    password === "" ||
    email === "" ||
    confirm_password === ""
  ) {
    res.json({
      status: false,
      code: 200,
      msg: "用户名，手机号，邮箱，密码，确认密码不能为空",
      data: {}
    })
  }

  // 2.查询用户是否存在
  let admin = {}
  try {
    admin = await prisma.admin.findUnique({
      where: { username }
    })
    if (admin) {
      res.json({
        status: false,
        code: 200,
        msg: "用户名或手机号已存在",
        data: {}
      })
    }
  } catch (error) {}

  // 3.密码确认密码一致校验
  if (password !== confirm_password) {
    res.json({
      status: false,
      code: 200,
      msg: "密码和确认密码不一致!",
      data: {}
    })
  }

  // 4.注册用户
  const hashPassword = bcrypt.hashSync(password, 10)
  try {
    const result = await prisma.admin.create({
      data: {
        username,
        mobile,
        email,
        password: hashPassword,
        status: "0"
      }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: {}
    })
  } catch (error) {
    res.json({
      status: false,
      code: 200,
      msg: "失败",
      data: error
    })
  }
}

const LogoutController = async (req, res) => {
  const { id } = req.sessions
  try {
    const admin = await prisma.admin.update({
      where: { id: Number(id) },
      data: { token: "" }
    })
    if (admin) {
      res.json({
        status: true,
        code: 200,
        msg: "成功",
        data: ""
      })
    }
  } catch (error) {
    res.json({
      status: false,
      code: 200,
      msg: "失败",
      data: error
    })
  }
}

const AdminController = async (req, res) => {
  const { id } = req.params

  const admin = await prisma.admin.findUnique({
    where: { id: Number(id) },
    select: {
      email: true,
      name: true,
      mobile: true,
      avator: true
    }
  })

  res.json({
    status: true,
    code: 200,
    msg: "成功",
    data: admin
  })
}

const AdminTokenController = async (req, res) => {
  const { id } = req.sessions
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: Number(id) },
      select: {
        email: true,
        username: true,
        mobile: true,
        avator: true,
        status: true
      }
    })
    if (admin) {
      res.json({
        status: true,
        code: 200,
        msg: "成功",
        data: admin
      })
    }
  } catch (error) {
    console.log({ error })
    res.json({
      status: false,
      code: 200,
      msg: "失败",
      data: {}
    })
  }
}

export {
  LoginController,
  RegisterController,
  LogoutController,
  AdminController,
  AdminTokenController
}
