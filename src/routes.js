const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect('/teachers')
})

routes.get('/teachers', (req, res) => {
    return res.render('teachers')
})
routes.get('/teachers/create', (req, res) => {
    return res.render('create')
})

routes.post('/teachers', teachers.post)

module.exports = routes