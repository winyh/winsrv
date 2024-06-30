import dayjs from "dayjs"
const LikeQuery = (field, query) => {
  return {
    [field]: {
      contains: query
    }
  }
}

const QueryContains = (fields = [], req) => {
  let queryObj = {}
  fields.map((field) => {
    if (field) {
      const query = req.query[field]
      queryObj = {
        ...queryObj,
        ...LikeQuery(field, query)
      }
    }
  })
  return queryObj
}

const QueryTimeRange = (fields = [], req) => {
  let queryObj = {}
  fields.map((field) => {
    if (field) {
      const result = req.query[field]
      if (result) {
        queryObj = {
          ...queryObj,
          [field]: {
            gte: dayjs(result[0]).toISOString(),
            lt: dayjs(result[1]).toISOString()
          }
        }
      }
    }
  })
  return queryObj
}

export { LikeQuery, QueryContains, QueryTimeRange }
