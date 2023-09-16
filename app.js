const express = require("express")
const handlebars = require("express-handlebars")
const handlers = require("./lib/handlers")

const app = express()
const viewEngine = handlebars.create({})
const PORT = process.env.PORT || 3000

/** Config */
app.use(express.static(`${__dirname}/public`))

app.engine("handlebars", viewEngine.engine)
app.set("view engine", "handlebars")

/** Routes */
app.get("/", handlers.home)
app.get("/about", handlers.about)

/** Middlewares */

// Not Found
app.use(handlers.notFound)

// Error
app.use(handlers.error)

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT}`)
  console.log("Press Ctrl + C to terminate")
})
