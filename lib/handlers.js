const getFortune = require("./fortune")

// Routes
exports.home = (req, res) => res.render("home")

exports.about = (req, res) => {
  res.render("about", { fortune: getFortune() })
}

// Not Found Middleware
exports.notFound = (req, res) => {
  res.status(404)
  res.render("404")
}

// Error Middleware
exports.error = (err, req, res, next) => {
  // console.error(err.message, err.stack)
  res.status(500)
  res.render("500")
}
