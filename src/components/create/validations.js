export default function validations(user) {
    let errors = {}
    let regexNombreSinNumero = /^[^\d]*$/; //regex para que la strin no tenga numeros

    //VALIDACIONES NOMBRE
    if (!user.name) {
        errors.name = "⚠️Por favor ingresar un nombre";
    } else if (!regexNombreSinNumero.test(user.name)) {
        errors.name = "⚠️No debe contener numeros"
    } else { errors.name = "" }



    //VALIDACIONES ALTURA
    if (!user.heightMin || !user.heightMax) {
        errors.height = "⚠️Por favor ingresar altura Min. y Max."
    } else if (user.heightMin <= 0 || user.heightMax > 200) {
        errors.height = "⚠️Debe ser mayor a 0 y menor a 200"
    }  else if (user.heightMin >= user.heightMax){
        errors.height = "⚠️Primer valor mayor que el segundo"
    } else { errors.height = "" }


    //VALIDACIONES PESO

    if (!user.weightMin || !user.weightMax) {
        errors.weight = "⚠️Por favor ingresar altura Min. y Max."
    } else if (user.weightMin <= 0 || user.weightMax > 200) {
        errors.weight = "⚠️Debe ser mayor a 0 y menos que 200"
    } else if (user.weightMin >= user.weightMax){
        errors.weight = "⚠️Primer valor mayor que el segundo"
    }else { errors.weight = "" }

    //VALIDACIONES AÑOS DE VIDA
    if (!user.life_span) {
        errors.life_span = "⚠️Por favor los años de vida"
    } else if (user.life_span < 0 || user.life_span > 50) {
        errors.life_span = "⚠️Debe ser positivo y menor a 100"
    } else { errors.life_span = "" }



    //VALIDACIONES TEMPERAMENTOS
    if (!user.selectedTemperaments || user.selectedTemperaments.length === 0) {
        errors.selectedTemperaments = "⚠️Debe tener al menos 1 temperamento";
    } else if (user.selectedTemperaments.length > 5) {
        errors.selectedTemperaments = "⚠️No puede tener más de 5 temperamentos";
    } else {
        errors.selectedTemperaments = "";
    }

     //VALIDACION IMAGEN
     if(!user.image){
        errors.image= "⚠️No dejar en blanco";
    } else {errors.image=''}
     
    return errors

   
}
