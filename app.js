const express = require("express")
const handlebars = require("express-handlebars")

const app = express()
const viewEngine = handlebars.create({})
const PORT = process.env.PORT || 3000
const getFortune = require("./lib/fortune")

app.engine("handlebars", viewEngine.engine)
app.set("view engine", "handlebars")

app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => res.send("home"))

app.get("/about", (req, res) => {
  res.render("about", { fortune: getFortune() })
})

// Not Found Middleware
app.use((req, res) => {
  res.status(404)
  res.render("404")
})

// Error Middleware
app.use((err, req, res, next) => {
  console.error("[Error middleware]\n", err.message, err.stack)
  res.status(500)
  res.render("500")
})

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT}`)
  console.log("Press Ctrl + C to terminate")
})
