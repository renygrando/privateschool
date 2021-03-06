const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const {
    age,
    graduation,
    date
} = require('../utils')

exports.index = (req, res) => {
    return res.render('teachers/teachers', {
        teachers: data.teachers
    })
}

exports.create = (req, res) => {
    return res.render('teachers/create')
}

exports.post = (req, res) => {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Preencha todos os campos")
        }
    }

    let {
        avatar_url,
        name,
        birth,
        educational_level,
        class_type,
        matter
    } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        educational_level,
        class_type,
        matter,
        created_at,
    })

    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send('Erro!')
        return res.redirect('/teachers')
    })
}

exports.show = (req, res) => {

    const {
        id
    } = req.params
    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("Esse professor não foi encontrado!")

    const teacher = {
        ...foundTeacher,
        matter: foundTeacher.matter.split(","),
        age: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
        educational_level: graduation(foundTeacher.educational_level),
        class_type: foundTeacher.class_type.split(","),
    }

    return res.render('teachers/show', {
        teacher
    })
}

exports.edit = (req, res) => {

    const {
        id
    } = req.params
    const foundTeacher = data.teachers.find(function (teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("Esse professor não foi encontrado!")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso,

    }

    return res.render('teachers/edit', {
        teacher
    })

}

exports.put = (req, res) => {
    const {
        id
    } = req.body
    let index = 0
    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })
    if (!foundTeacher) return res.send('Professor não encontrado')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher
    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!")
        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = (req, res) => {
    const {
        id
    } = req.body

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id
    })
    data.teachers = filteredTeachers

    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write error!")
        return res.redirect('/teachers')
    })
}