const express = require("express")
const handlers = require("./lib/handlers")
const handlebars = require("./lib/view-engine")
const weatherData = require("./lib/middleware/weather")
const multiparty = require("multiparty")
const multpart = require("./lib/middleware/multpart")
const credentials = require('./config')

const app = express()
const PORT = process.env.PORT || 3000
const isMainModule = require.main === module

/** Config */
app.disable("x-powered-by")

app.use(express.static(`${__dirname}/public`))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(weatherData)

app.engine("handlebars", handlebars.engine)
app.set("view engine", "handlebars")

/** Routes */
app.get("/", handlers.home)
app.get("/about", handlers.about)

app.get("newsletter", handlers.newsletter)

app.get("newsletter-signup", handlers.newsletterSignup)
app.post("newsletter-signup/process", handlers.newsletterSignupProcess)
app.get("newsletter-signup/thank-you", handlers.newsletterSignupThanks)

app.get("/contest/vacation-photo/:year/:month", handlers.vacationPhotoContest)

app.post(
  "/contest/vacation-photo/:year/:month",
  multpart,
  handlers.vacationPhotoContestProcess
)

app.get("/contest/vacation-photo-thank-you", handlers.vacationPhotoThanks)
app.get("/contest/vacation-photo-error", handlers.vacationPhotoError)

/** API Endpoints */
app.post("/api/newsletter-signup", handlers.api.newsletterSignup)

app.post("/api/contest/vacation-photo/:year/:month", (req, res) => {
  const form = new multiparty.Form()

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).send({ error: err.message })
    }

    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})

// Not Found
app.use(handlers.notFound)

// Error
app.use(handlers.error)

if (!isMainModule) {
  module.exports = app
} else {
  app.listen(PORT, () => {
    console.log(`Express started on http://localhost:${PORT}`)
    console.log("Press Ctrl + C to terminate")
  })
}
