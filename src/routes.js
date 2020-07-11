const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect('/teachers')
})

routes.get('/teachers', teachers.index)

routes.get('/teachers/create', (req, res) => {
    return res.render('create')
})

routes.get('/teachers/:id', teachers.show), (req, res) => {
    
}

routes.get('/teachers/:id/edit', teachers.edit)

routes.post('/teachers', teachers.post)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)

module.exports = routes