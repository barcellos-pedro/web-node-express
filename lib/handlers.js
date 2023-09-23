const getFortune = require("./fortune")

// API Handlers
exports.api = {}

exports.api.newsletterSignup = (req, res) => {
  console.log(req.body)
  console.log(req.query)
  res.send({ result: "success" })
}

exports.api.vacationPhotoContest = (req, res, fields, files) => {
  console.log(fields)
  console.log(files)
  res.send({ resul: "success" })
}

/** Routes */
exports.home = (req, res) => {
  res.render("home")
}

exports.about = (req, res) => {
  res.render("about", { fortune: getFortune() })
}

/** Newsletter */
exports.newsletter = (req, res) => {
  res.render("newsletter", { csrf: crypto.randomUUID() })
}

exports.newsletterSignup = (req, res) => {
  res.render("newsletter-signup", { csrf: crypto.randomUUID() })
}

exports.newsletterSignupProcess = (req, res) => {
  console.log(req.query, req.body)
  res.redirect(303, "/newsletter-signup/thank-you")
}

exports.newsletterSignupThanks = (req, res) => {
  res.render("newsletter-signup-thank-you")
}

/** Photos */
exports.vacationPhotoContest = (req, res) => {
  const now = new Date()

  res.render("contest/vacation-photo", {
    year: now.getFullYear(),
    month: now.getMonth(),
    csrf: crypto.randomUUID(),
  })
}

exports.vacationPhotoContestProcess = (req, res) => {
  // console.log(req.form) // from multpart custom middleware
  res.redirect(303, "/contest/vacation-photo-thank-you")
}

/** Error Middlewares */
exports.notFound = (req, res) => {
  res.status(404)
  res.render("404")
}

exports.vacationPhotoThanks = (req, res) => {
  res.render("contest/vacation-photo-thank-you")
}

exports.vacationPhotoError = (req, res) => {
  res.render("contest/vacation-photo-error")
}

/** Flash messages example */
// app.get("/flash-error", (req, res) => {
//   req.session.flash = {
//     type: "danger",
//     title: "Database error (test)",
//     message: "There has been an error. Try again.",
//   }

//   res.redirect(303, "/")
// })

// app.get("/flash-success", (req, res) => {
//   req.session.flash = {
//     type: "success",
//     title: "Thank you! 😀",
//     message: "You have now been signed up for the newsletter!",
//   }

//   res.redirect(303, "/")
// })

// eslint-disable-next-line no-unused-vars
exports.error = (err, req, res, next) => {
  console.error(err.message, err.stack)
  res.status(500)
  res.render("500")
}
