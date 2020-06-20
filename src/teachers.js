const fs = require('fs')
const data = require('./data.json')

exports.post = (req, res) => {

    const keys = Object.keys(req.body) 
    
    for(key of keys) {
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }

    let { avatar_url, name, birth, educational_level, class_type, matter } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)

    data.teachers.push ({
        id,
        avatar_url,
        name,
        birth,educational_level,
        class_type,
        matter
    })

    fs.writeFile("src/data.json", JSON.stringify(data, null, 2), (err)=> {
        if (err) return res.send('Erro!')
        return res.redirect('/teachers')
    })
}