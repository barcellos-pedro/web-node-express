const express = require("express")
const handlebars = require("express-handlebars")

const app = express()
const PORT = process.env.PORT || 3000
const viewEngine = handlebars.create({})

const FORTUNES = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
]

app.engine("handlebars", viewEngine.engine)
app.set("view engine", "handlebars")

app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => res.send("home"))

app.get("/about", (req, res) => {
  const randomIndex = Math.floor(Math.random() * FORTUNES.length)
  const fortune = FORTUNES[randomIndex]
  res.render("about", { fortune })
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
