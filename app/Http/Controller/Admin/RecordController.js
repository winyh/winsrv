import prisma from "../../../../prisma/client.js"
import { QueryContains } from "../../../../prisma/tool.js"

const RecordListController = async (req, res) => {
  const { pageSize = 10, current = 1, start_at, end_at } = req.query

  const fields = [
    "username",
    "mobile",
    "company",
    "industry",
    "domain",
    "scale",
    "start",
    "area",
    "person",
    "focus",
    "status",
    "mark"
  ]

  const queryFields = QueryContains(fields, req)

  const [records, meta] = await prisma.record
    .paginate({
      where: {
        ...queryFields,
        created_at: {
          gte: start_at,
          lt: end_at
        }
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
      list: records,
      ...meta
    }
  })
}

const RecordInfoController = async (req, res) => {
  const { id } = req.params

  const record = await prisma.record.findUnique({
    where: { id: Number(id) }
  })

  res.json({
    status: true,
    code: 200,
    msg: "成功",
    data: record
  })
}

const RecordExportController = async (req, res) => {
  res.json({
    status: true,
    code: 200,
    msg: "成功",
    data: {
      title: "222"
    }
  })
}

const CreateRecordController = async (req, res) => {
  const {
    username,
    mobile,
    company,
    industry,
    domain,
    domain_key,
    scale,
    start,
    start_key,
    area,
    person,
    person_key,
    focus,
    focus_key
  } = req.body

  try {
    const result = await prisma.record.create({
      data: {
        username,
        mobile,
        company,
        industry,
        domain,
        domain_key,
        scale,
        start,
        start_key,
        area,
        person,
        person_key,
        focus,
        focus_key: JSON.stringify(focus_key)
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

const UpdateRecordController = async (req, res) => {
  const { id } = req.params
  const { status, mark } = req.body
  try {
    const record = await prisma.record.update({
      where: { id: Number(id) },
      data: { status, mark }
    })

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: record
    })
  } catch (error) {
    res.json({
      error: `Post with ID ${id} does not exist in the database`
    })
  }
}

export {
  RecordListController,
  RecordInfoController,
  RecordExportController,
  CreateRecordController,
  UpdateRecordController
}
