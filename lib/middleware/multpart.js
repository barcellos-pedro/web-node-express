const multiparty = require("multiparty")

const form = new multiparty.Form()

module.exports = (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(new Error("Error when parsing the form"))
    }

    req.form = {
      fields,
      files,
    }

    next()
  })
}
