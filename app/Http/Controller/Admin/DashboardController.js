import prisma from "../../../../prisma/client.js"
import dayjs from "dayjs"

const DashboardController = async (req, res) => {
  try {
    // 总条数
    const total = await prisma.record.count()

    // 今日新增
    let start_at = dayjs().startOf("day").toISOString()
    let end_at = dayjs().endOf("day").toISOString()
    const todayNum = await prisma.record.count({
      where: {
        created_at: {
          gte: start_at,
          lt: end_at
        }
      }
    })

    // 已跟踪
    const completeNum = await prisma.record.count({
      where: {
        NOT: { status: "0" }
      }
    })

    // 待跟踪
    const waitNum = await prisma.record.count({
      where: {
        status: "0"
      }
    })

    // 12个月客资量
    let month = 0
    let perMonth = []
    while (month < 12) {
      let value = await prisma.record.count({
        where: {
          created_at: {
            gte: dayjs().month(month).startOf("month"),
            lte: dayjs().month(month).endOf("month")
          }
        }
      })
      month++
      perMonth.push({ month: `${month}月`, value })
    }

    // 格式化输出
    // const perMonth = records.map(({ created_at, _count, _sum }) => ({
    //   month: dayjs().format("M"),
    //   value: _count.id
    //   // orderIdSum: _sum.id
    // }))

    res.json({
      status: true,
      code: 200,
      msg: "成功",
      data: {
        total,
        waitNum,
        todayNum,
        completeNum,
        perMonth
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

export { DashboardController }
