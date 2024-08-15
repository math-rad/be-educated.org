const express = require("express")
const port = require("./ports.json").root

const root = express()

root.get("/", (request, response) => {
    response.redirect("/home")
})

root.get("/home", (request, response) => {
    response.sendFile("content/pages/home.html", {
        root: __dirname
    })
})

root.listen(port, function() {
    console.log(`root domain is active on port ${port}`)
})