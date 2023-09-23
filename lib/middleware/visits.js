module.exports = (req, res, next) => {
  let visits = +req?.cookies?.visits || 0
  visits++

  res.cookie("visits", `${visits}`)
  res.locals.pageViews = visits
  next()
}
