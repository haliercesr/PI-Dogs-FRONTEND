import { GET_DOGS, SEARCH_DOGS, QUERY_DOGS, ORDER, FILTER, TEMPERAMENTS, FILTERbdd } from './types';
import axios from 'axios';
const {filtrarDogsCreados}=require('../../utils/filtrarDogsCreados')

//const URL = 'http://localhost:3001'
const URL = 'https://dogs-server-c51j.onrender.com'

export const getDogs = () => {
    return async function (dispatch) {

        try {
            console.log(`${URL}/dogs`)
            const { data } = await axios.get(`${URL}/dogs`)

            const data1=filtrarDogsCreados(data) //filtro los datos del server para los perros creados en la BBD, TENGO QUE HACERLO EN EL SERVER Y NO EN EL FONTEND
            
            return dispatch(
                {
                    type: GET_DOGS,
                    payload: data1
                }
            )
        } catch (error) { throw Error(error.message) }
    }
}

export const searchDogs = (raza) => {
    return async function (dispatch) {

        if (raza==="reset"){          //con esto, el estado SEARCHDOGS queda vacio y aparece el loading
            return dispatch(
                {
                    type: SEARCH_DOGS,
                    payload: []
                }
            ) 
        }
        
        try {
          
            const { data } = await axios.get(`${URL}/dogs/name?name=${raza}`)
            console.log(data)
            const data1=data==="Sin resutados"?[]:filtrarDogsCreados(data) //filtro los datos del server para los perros creados en la BBD, TENGO QUE HACERLO EN EL SERVER Y NO EN EL FONTEND
            return dispatch(
                {
                    type: SEARCH_DOGS,
                    payload: data1
                }
            )
        } catch (error) { throw Error(error.message) }
    }
}

export const queryDogs = (data) => {
    return function (dispatch) {
        return dispatch(
            {
                type: QUERY_DOGS,
                payload: data
            }
        )
    }


}

export const filterDogs = (temperamento) => {
    return {
        type: FILTER,
        payload: temperamento       //gender es la propiedad para filtrar como por ejemplo status, origin, etc.
    }
}

export const orderDogs = (orden) => {        // orden sera a para ascendente y d para decendente
    return {
        type: ORDER,
        payload: orden
    }
}



export const getTemperaments = () => {
    return async function (dispatch) {

        try {
            const { data } = await axios.get(`${URL}/temperaments`)
            return dispatch(
                {
                    type: TEMPERAMENTS,
                    payload: data
                }
            )
        } catch (error) { throw Error("Error al obtener la lista de temperamentos") }
    }}

    export const filterApi = (evento) => {
            return {
                type: FILTERbdd,
                payload: evento   
            }
        }

    


