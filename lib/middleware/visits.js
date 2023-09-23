module.exports = (req, res, next) => {
  const visits = +req?.cookies?.visits || 0
  res.cookie("visits", `${visits + 1}`)
  next()
}
