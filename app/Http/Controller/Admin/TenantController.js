import prisma from "../../../../prisma/client.js"
import { QueryContains } from "../../../../prisma/tool.js"

const CreateTenantController = async (req, res) => {
  const {
    name,
    description,
    icon,
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
  const { ids } = req.body
  try {
    const result = await prisma.tenant.deleteMany({
      where: {
        id: {
          contains: [...ids]
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
  const {
    pageSize = 10,
    current = 1,
    start_at,
    end_at,
    expire_start_at,
    expire_end_at
  } = req.query

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

  try {
    const [Tenants, meta] = await prisma.Tenant.paginate({
      where: {
        ...queryFields,
        created_at: {
          gte: start_at,
          lt: end_at
        },
        expired_at: {
          gte: expire_start_at,
          lt: expire_end_at
        }
      },
      orderBy: {
        created_at: "desc"
      }
    }).withPages({
      limit: Number(pageSize),
      page: Number(current),
      includePageCount: true
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: {
        list: Tenants,
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

export {
  CreateTenantController,
  DestoryTenantController,
  UpdateTenantController,
  FindTenantController,
  FindAllTenantController,
  FindListTenantController,
  TenantExportController
}
