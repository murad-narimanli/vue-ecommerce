const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

//this serves files from the dist directory which holds the index.html file
app.use('/',serveStatic(path.join(__dirname,'/dist')))

const port = process.env.PORT || 8080
app.listen(port)