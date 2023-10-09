import { GET_DOGS, SEARCH_DOGS, QUERY_DOGS, ORDER, FILTER, TEMPERAMENTS, FILTERbdd } from './types';
import axios from 'axios';
import { URLSERVER } from '../../../configURL';
const {filtrarDogsCreados}=require('../../utils/filtrarDogsCreados')

export const getDogs = () => {
    return async function (dispatch) {

        try {
            const { data } = await axios.get(`${URLSERVER}/dogs`)

            const data1=filtrarDogsCreados(data) //filtro los datos del server para los perros creados en la BBD, TENGO QUE HACERLO EN EL SERVER Y NO EN EL FONTEND
            
            return dispatch(
                {
                    type: GET_DOGS,
                    payload: data1
                }
            )
        } catch (error) { 
            window.alert(error.message)
         }}
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
          
            const { data } = await axios.get(`${URLSERVER}/dogs/name?name=${raza}`)
            
            const data1=data==="Sin resutados"?["Sin resutados"]:filtrarDogsCreados(data) //filtro los datos del server para los perros creados en la BBD, TENGO QUE HACERLO EN EL SERVER Y NO EN EL FONTEND
            console.log(data1)
            return dispatch(
                {
                    type: SEARCH_DOGS,
                    payload: data1
                }
            )
        } catch (error) {   window.alert(error.message) }
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
            const { data } = await axios.get(`${URLSERVER}/temperaments`)
            return dispatch(
                {
                    type: TEMPERAMENTS,
                    payload: data
                }
            )
        } catch (error) { 
            window.alert("Error al obtener la lista de temperamentos") 
        }
    }}

    export const filterApi = (evento) => {
            return {
                type: FILTERbdd,
                payload: evento   
            }
        }

    


