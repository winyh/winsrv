import { newEnforcer } from "casbin"
import { PrismaAdapter } from "casbin-prisma-adapter"

const policy = await PrismaAdapter.newAdapter()
const enforcer = await newEnforcer("../../../config/basic_model.conf", policy)

// Modify the policy.
// await e.addPolicy(...);
// await e.removePolicy(...);

// Save the policy back to DB.
// await e.savePolicy();

const casbin = async (req, res, next) => {
  const { sessions, originalUrl, method } = req

  /* 权限校验开始 */
  const sub = sessions.role // 想要访问资源的用户/角色 the user that wants to access a resource.
  const obj = originalUrl // 将被访问的资源  the resource that is going to be accessed.
  const act = method // 用户对资源执行的操作 the operation that the user performs on the resource.

  // Async: 异步
  const res = await enforcer.enforce(sub, obj, act) // enforceSync 同步方法

  if (res) {
    next() // permit alice to read data1
  } else {
    return res.status(403).json({ error: "抱歉您无访问权限！" }) // deny the request, show an error
  }
  /* 权限校验结束 */
}

export default casbin
