const str2Arr = (ids) => {
  if (ids && ids.indexOf(",") > -1) {
    return ids.split(",").map((o) => Number(o))
  } else {
    return [Number(ids)]
  }
}

export { str2Arr }
