const express= require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()


server.set('view engine', 'njk')

server.use(express.urlencoded({extended: true}))
server.use(routes)
server.use(express.static('public'))

nunjucks.configure('src/views', {
    express: server,
    autoscape: false,
    noCache: true
})

server.listen(3000, function()  {
    console.log('Server is running on port 3000')
})