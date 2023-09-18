const puppeteer = require("puppeteer")
const portfinder = require("portfinder")

const app = require("../app")

describe("basic navigation", () => {
  let port, server, BASE_URL

  beforeEach(async () => {
    port = await portfinder.getPortPromise()
    server = app.listen(port)
    BASE_URL = `http://localhost:${port}`
  })

  afterEach(() => {
    server.close()
  })

  test("home page links to about page", async () => {
    const browser = await puppeteer.launch({ headless: 'new' })
    const page = await browser.newPage()

    await page.goto(BASE_URL)

    await Promise.all([
      page.waitForNavigation(),
      page.click('[data-test-id="about"'),
    ])

    expect(page.url()).toBe(`${BASE_URL}/about`)

    await browser.close()
  })
})
