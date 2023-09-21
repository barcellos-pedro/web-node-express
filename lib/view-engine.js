const handlebars = require("express-handlebars")

module.exports = handlebars.create({
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
})
