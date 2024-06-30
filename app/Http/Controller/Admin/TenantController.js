import prisma from "../../../../prisma/client.js"
import { QueryContains, QueryTimeRange } from "../../../../prisma/tool.js"
import { str2Arr } from "../../../../utils/index.js"

const CreateTenantController = async (req, res) => {
  const {
    name,
    description,
    icon,
    subject,
    contacts,
    mobile,
    sort,
    status,
    expired_at
  } = req.body

  try {
    const result = await prisma.tenant.create({
      data: {
        name,
        description,
        icon,
        subject,
        contacts,
        mobile,
        sort,
        status,
        expired_at
      }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: result
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

const DestoryTenantController = async (req, res) => {
  let { ids } = req.query
  ids = str2Arr(ids)
  try {
    const result = await prisma.tenant.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: result
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

const UpdateTenantController = async (req, res) => {
  const {
    id,
    name,
    description,
    icon,
    subject,
    contacts,
    mobile,
    sort,
    status,
    expired_at
  } = req.body
  try {
    const tenant = await prisma.tenant.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        icon,
        subject,
        contacts,
        mobile,
        sort,
        status,
        expired_at
      }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: tenant
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

const FindTenantController = async (req, res) => {
  const { id } = req.params

  try {
    const result = await prisma.Tenant.findUnique({
      where: { id: Number(id) }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: result
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

const FindAllTenantController = async (req, res) => {
  const { id } = req.params

  try {
    const Tenant = await prisma.Tenant.findUnique({
      where: { id: Number(id) }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: Tenant
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

const FindListTenantController = async (req, res) => {
  const { pageSize = 10, current = 1 } = req.query

  const fields = [
    "name",
    "description",
    "subject",
    "contacts",
    "mobile",
    "sort",
    "status"
  ]

  const queryFields = QueryContains(fields, req)
  const queryTimeFields = QueryTimeRange(["created_at", "expired_at"], req)
  try {
    const [tenants, meta] = await prisma.tenant
      .paginate({
        where: {
          ...queryFields,
          ...queryTimeFields
        },
        orderBy: {
          created_at: "desc"
        }
      })
      .withPages({
        limit: Number(pageSize),
        page: Number(current),
        includePageCount: true
      })
    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: {
        list: tenants,
        ...meta
      }
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

const TenantExportController = async (req, res) => {
  res.json({
    status: true,
    code: 200,
    msg: "成功",
    data: {
      title: "222"
    }
  })
}

const DataTenantController = async (req, res) => {
  try {
    // 总条数
    const total = await prisma.tenant.count()

    // 今日新增
    let start_at = dayjs().startOf("day").toISOString()
    let end_at = dayjs().endOf("day").toISOString()
    const todayNum = await prisma.tenant.count({
      where: {
        created_at: {
          gte: start_at,
          lt: end_at
        }
      }
    })

    // 已跟踪
    const completeNum = await prisma.tenant.count({
      where: {
        NOT: { status: "0" }
      }
    })

    // 待跟踪
    const waitNum = await prisma.tenant.count({
      where: {
        status: "0"
      }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: {
        total,
        waitNum,
        todayNum,
        completeNum
      }
    })
  } catch (error) {
    console.log({ error })
    res.json({
      status: false,
      code: 200,
      msg: "失败",
      data: error
    })
  }
}

export {
  CreateTenantController,
  DestoryTenantController,
  UpdateTenantController,
  FindTenantController,
  FindAllTenantController,
  FindListTenantController,
  TenantExportController,
  DataTenantController
}
