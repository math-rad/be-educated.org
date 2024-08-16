/**
 * Created: 8/16/2024
 * File: [NODE] src/content.js
 * Description: content service for be-political.org, organizes content and media for the website into a subdomain
 */

const express = require("express")
const fs = require("fs")
const cors = require("cors")
const mime = require("mime")
const path = require("path")

const config = require("../config.json")
const { dir } = require("console")

const contentFileServer = express()

const port = config.ports.content
const indexPath = config.paths.content.index
const urlFormat = config.content.urlFormat
const corsConfig = config.CORS

let contentIndex;

contentFileServer.use(cors(corsConfig))
contentFileServer.get(urlFormat, (request, response) => {
    const {directory: directoryName, index} = request.params
    const directory = contentIndex[directoryName]
    if (directory) {
        const partialPath = directory.aliases[index]

        if (partialPath) {
            const type = mime.getType(path.extname(partialPath))
            response.sendFile(directory.root + partialPath, {
                "headers": {
                    "Content-Type": type,
                    "Content-Disposition": `attachment; filename=${index}.${mime.getExtension(type)}`
                },
                "root": config.paths.root
            })
        } else {
            response.status(404).send('404 file not found')
        }
    } else {
        response.status(404).send("404 directory not found")
    }
})

function updateContentIndex() {
    fs.readFile(indexPath, 'utf8', (err, content) => {
        if (err) {
            // Implement later
        } else {
            contentIndex = JSON.parse(content)
        }
    })
}

fs.watch(indexPath, updateContentIndex)
updateContentIndex()

contentFileServer.listen(port, () => {
    console.log(`[content.be-political.org]: Content service is now active on port ${port}`)
})



