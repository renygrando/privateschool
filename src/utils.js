module.exports = {
    
    age: function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age -1
        }
        return age
    },
    graduation: function graduation(educationalLevel){
        const graduation = [
            " ",
            "Ensino Médio Completo",
            "Ensino Superior Completo",
            "Mestrado",
            "Doutorado",
        ]

        for(i = 0; i <= graduation.length ; i++ ) {
            
            if (educationalLevel == i ){
                return graduation[i]
            }
            
        }

    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    graduationStudent: function graduationStudent(educationalLevel){
        const graduation = [
            "",
            "5º ano - Ensino Fundamental",
            "6º ano - Ensino Fundamental",
            "7º ano - Ensino Fundamental",
            "8º ano - Ensino Fundamental",
            "1º ano - Ensino Médio",
            "2º ano - Ensino Médio",
            "3º ano - Ensino Médio",
        ]

        for(i = 0; i <= graduation.length ; i++ ) {
            
            if (educationalLevel == i ){
                return graduation[i]
            }
            
        }

    }
}