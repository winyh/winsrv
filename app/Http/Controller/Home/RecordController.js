import prisma from "../../../../prisma/client.js"
import { QueryContains } from "../../../../prisma/tool.js"

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

export { CreateRecordController }
