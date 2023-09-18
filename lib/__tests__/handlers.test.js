const handlers = require("../handlers")

describe("handlers", () => {
  test("home page renders", () => {
    const req = {}
    const res = { render: jest.fn() }

    handlers.home(req, res)

    expect(res.render).toHaveBeenCalledWith("home")
  })

  test("about page renders with fortune", () => {
    const req = {}
    const res = { render: jest.fn() }

    handlers.about(req, res)

    expect(res.render).toHaveBeenCalledWith("about", {
      fortune: expect.stringMatching(/\W/),
    })
  })

  test("404 not found page renders", () => {
    const req = {}
    const res = { status: jest.fn(), render: jest.fn() }
    const statusCode = 404

    handlers.notFound(req, res)

    expect(res.status).toHaveBeenCalledWith(statusCode)
    expect(res.render).toHaveBeenCalledWith(statusCode.toString())
  })

  test("500 error page renders", () => {
    const err = new Error("500 - Internal server error")
    const req = {}
    const res = { status: jest.fn(), render: jest.fn() }
    const next = jest.fn()
    const statusCode = 500

    handlers.error(err, req, res, next)

    expect(res.status).toHaveBeenCalledWith(statusCode)
    expect(res.render).toHaveBeenCalledWith(`${statusCode}`)
  })
})
