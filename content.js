const express = require("express")
const cors = require("cors")
const path = require('path')
const mime = require("mime")
const contentServer = express()
const index = require("./index.json")

const port = require("./ports.json").content

contentServer.use(cors({
    "origin": "https://be-political.org"
}))

contentServer.get("/:directory/:index", function(request, response) {
    const {directory: fileDirectory, index: fileIndex} = request.params

    const directory = index[fileDirectory]
    
    if (directory) {
        const partialPath = directory.aliases[fileIndex]
        if (partialPath) {
            const type = mime.getType(path.extname(partialPath))
            response.sendFile(__dirname + directory.root + partialPath, {
                "headers": {
                    "Content-Type": type,
                    "Content-Disposition": `attachment; filename="${fileIndex}.${mime.getExtension(type)}"`
                }
            })
        }
    }
})
contentServer.listen(port, function() {
    console.log(`content service is running on port ${port}`)
})