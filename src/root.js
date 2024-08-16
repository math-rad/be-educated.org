/**
    Created: 8/16/2024
    File: [NODE] src/root.js
    Description: Server for root domain website: be-political.org which routes the webpages
**/

const express = require("express")
const config = require("../config.json")

const port = config.ports.root

const root = express()

root.get("/", (_, response) => response.redirect("/home"))
root.get("/home", (_, response) => response.sendFile(config.paths.pages.home, {"root": config.paths.root}))

root.listen(port, () => {
    console.log(`[be-political.org]: The website is now active on port: ${port}`)
})