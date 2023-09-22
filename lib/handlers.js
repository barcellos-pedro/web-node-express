const getFortune = require("./fortune")

// API Handlers
exports.api = {
  newsletterSignup: (req, res) => {
    console.log(req.body)
    res.send({ result: "success" })
  },
}

/** Routes */
exports.home = (req, res) => res.render("home")

exports.about = (req, res) => {
  res.render("about", { fortune: getFortune() })
}

/** Newsletter */
exports.newsletter = (req, res) => {
  res.render("newsletter", { csrf: "secret token" })
}

exports.newsletterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: "secret token" })
}

exports.newsletterSignupProcess = (req, res) => {
  console.log(req.query, req.body)
  res.redirect(303, "/newsletter-signup/thankyou")
}

exports.newsletterSignupThanks = (req, res) => {
  res.render("newsletter-signup-thank-you")
}

/** Error Middlewares */
exports.notFound = (req, res) => {
  res.status(404)
  res.render("404")
}

// eslint-disable-next-line no-unused-vars
exports.error = (err, req, res, next) => {
  console.error(err.message, err.stack)
  res.status(500)
  res.render("500")
}
