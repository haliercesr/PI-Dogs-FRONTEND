const filtrarDogsCreados = (data) => {
    const data1 = data.map(dog => {
        if (typeof dog.image === "string") {
            dog.image = { url: dog.image }
        }
        if (Array.isArray(dog.temperaments)) {
            let temp = ""
            // Construir la propiedad 'temperament' como un arreglo de temperamentos
            dog.temperaments.forEach(dog => {
                let name1 = dog.name
                let name2 = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase()  //trasformo la primera letra a mayusculas y las demas a minusculas

                temp = temp + name2 + ", "
            });
            temp = temp.slice(0, -2);  //elimino ultimo caracter de la cadena

            dog.temperament = temp

        }

        if (Array.isArray(dog.weight)) {

            dog.weight = { metric: `${dog.weight[0]} - ${dog.weight[1]}` }

        }

        if (Array.isArray(dog.height)) {

            dog.height = { metric: `${dog.height[0]} - ${dog.height[1]}` }

        }

        if (typeof dog.life_span === "number") {

            dog.life_span = `${dog.life_span} years`

        }

        return dog
    })
    return data1
}

module.exports = { filtrarDogsCreados }