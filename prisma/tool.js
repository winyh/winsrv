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

export { LikeQuery, QueryContains }
