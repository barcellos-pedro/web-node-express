const express = require("express")
const handlers = require("./lib/handlers")
const handlebars = require('./lib/view-engine')
const weatherData = require("./lib/middleware/weather")

const app = express()
const PORT = process.env.PORT || 3000
const isMainModule = require.main === module

/** Config */
app.disable('x-powered-by')

app.use(express.static(`${__dirname}/public`))
app.use(weatherData)

app.engine("handlebars", handlebars.engine)
app.set("view engine", "handlebars")

/** Routes */
app.get("/", handlers.home)
app.get("/about", handlers.about)

/** Middlewares */

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
