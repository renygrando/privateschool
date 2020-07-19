const fs = require('fs')
const data = require('../data.json')
const Intl = require('intl')
const { graduationStudent, date } = require('../utils')

exports.index = (req, res) => {
    
    const students = []

    for (let student of data.students) {
        
        students.push({
        ...student,
        educational_level: graduationStudent(student.educational_level)
        })
    }
    return res.render('students/students', { students })
}

exports.create = (req, res) => {
    return res.render('students/create')
}

exports.post = (req, res) => {

    const keys = Object.keys(req.body) 
    
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    birth = Date.parse(req.body.birth)

    let id = 1

    const lastStudent = data.students[data.students.length -1]

    if (lastStudent){
        id = lastStudent.id +1
    }
    
    data.students.push ({
        id,
        ...req.body,
        birth
    })

    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), (err)=> {
        if (err) return res.send('Erro!')
        return res.redirect('/students')
    })
}

exports.show = (req, res) => {
    
    const { id } = req.params
    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })
    if (!foundStudent) return res.send("Esse aluno não foi encontrado!")
    
    const student ={
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        educational_level: graduationStudent(foundStudent.educational_level),
    }

    return res.render('students/show', { student })
}

exports.edit = (req, res) => {

    const { id } = req.params
    const foundStudent = data.students.find(function(student) {
        return student.id == id
    })
    if (!foundStudent) return res.send("Esse professor não foi encontrado!")
    
    const student ={
        ...foundStudent,
        birth: date(foundStudent.birth).iso,

    }

    return res.render('students/edit', { student })

}

exports.put = (req, res) => {
    const {id} = req.body
    let index = 0
    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id){
            index = foundIndex
            return true
        }
    })
    if (!foundStudent) return res.send('Professor não encontrado')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student
    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write error!")
        return res.redirect(`/students/${id}`)
    })
}

exports.delete = (req, res) => {
    const {id} = req.body

    const filteredStudents =  data.students.filter((student) => {
        return student.id != id
    })
    data.students = filteredStudents

    fs.writeFile("./src/data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("write error!")
        return res.redirect('/students')
    })
}