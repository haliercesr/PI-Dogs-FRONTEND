import style from "../create/create.module.css"
import { useState, useEffect } from "react"
import Loading from '../loading/loading'
import { withRouter,useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { getDogs } from '../redux/actions/actions';
import validations from './validations';
import axios from 'axios';
import Alert from '../alert/alert';


function Create(props) {
   //const URL = 'http://localhost:3001'
   const URL='https://dogs-server-c51j.onrender.com'
   const history = useHistory();
   const dispatch = useDispatch()
   const allDogsFilter = useSelector(state => state.allDogsFilter)
   const [allTemperaments, SetAllTemperaments] = useState([])
   const [user, setData] = useState(
      {
         name: '',
         heightMin: 0,
         heightMax: 0,
         weightMin: 0,
         weightMax: 0,
         life_span: 0,
         image: '',
         selectedTemperaments: [],
         image: '',

      })
   const [errors, setErrors] = useState({})

   const [Message, setMessage] = useState({
      ShowCustomAlert1: false,
      ShowCustomAlert2: false,
      ShowCustomAlert3: false,
      message1: "El perro se creo exitosamente!",
      message2: "El perro ya se encuentra creado, por favor elije otro nombre",
      message3: "El formulario contiene errores",

  });

  const openCustomAlert = (numMessage) => {
   if(numMessage === 1)setMessage({ ...Message, ShowCustomAlert1: true })
   if(numMessage === 2)setMessage({ ...Message, ShowCustomAlert2: true })
   if(numMessage === 3)setMessage({ ...Message, ShowCustomAlert3: true })

};

const closeCustomAlert = () => {
   setMessage({ ...Message, ShowCustomAlert1: false })
  
};

const closeCustomAlert1 = () => {
   setMessage({ ...Message, ShowCustomAlert2: false })
};

const closeCustomAlert2 = () => {
   setMessage({ ...Message, ShowCustomAlert3: false })
};

   useEffect(() => {



      SetAllTemperaments(allDogsFilter)


   }, []);

   const handleSubmit = async (e) => {
      e.preventDefault()   //evitar que se recarge la pagina 
   

      try {
         if(user.name==='')window.alert('Por favor completar el formulario')

         const { name, heightMin, heightMax, weightMin, weightMax, life_span, selectedTemperaments, image } = user
         const valuesArray = Object.values(errors).join() //tomo los valores de errors
         if (valuesArray.length === 5 ) {
            
            let userSubmit = {
               name,
               height: [Number(heightMin), Number(heightMax)],
               weight: [Number(weightMin), Number(weightMax)],
               life_span: Number(life_span),
               image,
               selectedTemperaments,
            }

            const {data} = await axios.post(`${URL}/dogs/`, userSubmit)
            
            console.log(data)
            if (data) {
               openCustomAlert(1)
               dispatch(getDogs())

            } else {
               openCustomAlert(2)

            }


         } else if(user.name!==''){ 
            openCustomAlert(3)
         }




      } catch (error) { window.alert(error.message) }
   }



   const handleChange = (e) => {
      const property = e.target.value
      const name = e.target.name
      setData({ ...user, [name]: property })
      setErrors(validations({ ...user, [name]: property }))
     

      if (e.target.type === "checkbox") {
         if (user.selectedTemperaments.includes(property)) {
            // Si ya está seleccionado, quítalo
            const updatedTemperaments = user.selectedTemperaments.filter(
               (temp) => temp !== property
            );
            setData({ ...user, selectedTemperaments: updatedTemperaments });
            setErrors(validations({ ...user, selectedTemperaments: updatedTemperaments }))

         } else {
            // Si no está seleccionado, agrégalo
            setData({ ...user, selectedTemperaments: [...user.selectedTemperaments, property] });
            setErrors(validations({ ...user, selectedTemperaments: [...user.selectedTemperaments, property] }))
         }
      }
   }

   const volverHome = () => {
     
      history.push('/home');
      
    };




   // Lista de temperamentos disponibles (debes obtenerla de tus datos)
   // const allTemperaments = ['Calm', 'Active', 'Friendly', 'Energetic', 'Loyal'];

   // Manejador de cambio cuando se selecciona o deselecciona un temperamento
   /* const handleTemperamentChange = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue)
  
        if (user.selectedTemperaments.includes(selectedValue)) {
           // Si ya está seleccionado, quítalo
           const updatedTemperaments = user.selectedTemperaments.filter(
              (temp) => temp !== selectedValue
           );
           setData({ ...user, selectedTemperaments: updatedTemperaments });
        } else {
           // Si no está seleccionado, agrégalo
           setData({ ...user, selectedTemperaments: [...user.selectedTemperaments, selectedValue] });
        }
     };*/

   return (<div className={style.containerCreate}>
       {Message.ShowCustomAlert1 ? <Alert
            message="El perro se creo exitosamente!"
            onClose={closeCustomAlert}
        /> : null}
        {Message.ShowCustomAlert2 ? <Alert
            message="El perro ya se encuentra creado, por favor elije otro nombre"
            onClose={closeCustomAlert1}
        /> : null}
        {Message.ShowCustomAlert3 ? <Alert
            message="El formulario contiene errores"
            onClose={closeCustomAlert2}
        /> : null}
      <form className={style.RegForms} onSubmit={handleSubmit}>

         <div className={style.FormConteiner}>
            <div className={style.inputsConteiner}>
               <h4>Caracteristicas:</h4>
               <div className={errors.name ? style.labelform1 : style.labelform11}>
                  <div className={style.labelReg}>
                     <label >Nombre:</label>
                     <input placeholder=" Nombre" className={style.inputNombre} name="name" onChange={handleChange} />
                  </div>
                  <p className={style.p1}>{errors.name}</p>
               </div>
               <div className={errors.height ? style.labelform1 : style.labelform11}>
                  <div className={style.labelReg}>
                     <label >Altura (cm):</label>
                     <input placeholder="min" type='number' className={style.input1} name="heightMin" onChange={handleChange} />
                     <input placeholder="max" type='number' className={style.input1} name="heightMax" onChange={handleChange} />
                  </div>
                  <p className={style.p1}>{errors.height}</p>
               </div>
               <div className={errors.weight ? style.labelform1 : style.labelform11}>
                  <div className={style.labelReg}>
                     <label >Peso (Kg):</label>
                     <input placeholder="min" type='number' className={style.input1} name="weightMin" onChange={handleChange} />
                     <input placeholder="max" type='number' className={style.input1} name="weightMax" onChange={handleChange} />
                  </div>
                  <p className={style.p1}>{errors.weight}</p>
               </div>
               <div className={errors.life_span ? style.labelform1 : style.labelform11}>
                  <div className={style.labelReg}>
                     <label >Años de vida:</label>
                     <input placeholder=" max" type='number' className={style.añosDeVida} name="life_span" onChange={handleChange} />
                  </div>
                  <p className={style.p1}>{errors.life_span}</p>
               </div>
               <div className={errors.image ? style.labelform1 : style.labelform11}>
                  <div className={style.labelReg}>
                     <label >Imagen:</label>
                     <input placeholder=" http://example.com/img" type='string' className={style.linkImagen} name="image" onChange={handleChange} />
                  </div>
                  <p className={style.p1}>{errors.image}</p>
               </div>
            </div>
            <div className={style.listTemperaments}>
               <h4>Selecciona temperamentos:</h4>
               <ul className={style.listaUl}>
                  {allTemperaments.map((temperament) => (
                     <li className={style.listaTemps1} key={temperament}>
                        <label>
                           <input
                              type="checkbox"
                              value={temperament}
                              checked={user.selectedTemperaments.includes(temperament)}
                              onChange={handleChange}
                           />
                           {temperament}
                        </label>
                     </li>
                  ))}
               </ul>
            </div>
            <div className={style.temSelect}>
               <h4>Temperamentos seleccionados:</h4>
               <ul  >
                  {user.selectedTemperaments.map((temperament) => (
                     <li className={style.listaTemps2} key={temperament}>✅{temperament}</li>
                  ))}
               </ul>
            </div>
         </div>
         <p className={style.p1}>{errors.selectedTemperaments}</p>
         <div className={style.buttonSubmit}>
            <button type="submit">Crear</button>
         </div>
         <span ><button onClick={volverHome} className={style.spanButton}><u>Volver al inicio</u></button></span>
      </form >
     

   </div >)
}

export default withRouter(Create);