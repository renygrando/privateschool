const fs = require('fs')
const data = require('./data.json')
const Intl = require('intl')
const { age, graduation, date } = require('./utils')

exports.post = (req, res) => {

    const keys = Object.keys(req.body) 
    
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    let { avatar_url, name, birth, educational_level, class_type, matter } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push ({
        id,
        avatar_url,
        name,
        birth,educational_level,
        class_type,
        matter,
        created_at,
    })

    fs.writeFile("src/data.json", JSON.stringify(data, null, 2), (err)=> {
        if (err) return res.send('Erro!')
        return res.redirect('/teachers')
    })
}

exports.show = (req, res) => {
    
    const { id } = req.params
    const foundTeacher = data.teachers.find((instructor) =>{
        return instructor.id == id
    })
    if (!foundTeacher) return res.send("Esse professor não foi encontrado!")
    
    const teacher ={
        ...foundTeacher,

        matter: foundTeacher.matter.split(","), 
        age: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at),
        educational_level: graduation(foundTeacher.educational_level),
        class_type: foundTeacher.class_type.split(","),

    }

    return res.render('show', { teacher })

}

exports.edit = (req, res) => {
    
    const { id } = req.params
    const foundTeacher = data.teachers.find((instructor) =>{
        return instructor.id == id
    })
    if (!foundTeacher) return res.send("Esse professor não foi encontrado!")
    
    const teacher ={
        ...foundTeacher,
        birth: date(foundTeacher.birth),

    }

    return res.render('edit', { teacher })

}