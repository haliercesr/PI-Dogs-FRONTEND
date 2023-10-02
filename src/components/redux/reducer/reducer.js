import { searchDogs } from "../actions/actions"
import { GET_DOGS, SEARCH_DOGS, QUERY_DOGS, ORDER, FILTER, TEMPERAMENTS, FILTERbdd } from "../actions/types"
const { comparar } = require('../../utils/comparar')


const initialState = {
    allDogs: [],
    searchDogs: [],
    queryState: false,
    allDogsFilter: []
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_DOGS:
            return {
                ...state,
                allDogs: payload,
                allDogsCopia: payload
            }
        case SEARCH_DOGS:
            return {
                ...state,
                searchDogs: payload,
                searchDogsCopia: payload
            }
        case QUERY_DOGS:
            return {
                ...state,
                queryState: payload
            }
        case FILTER:
            if (state.queryState === false) {
                return {
                    ...state,
                    allDogs: payload === "Todos"
                        ? state.allDogsCopia
                        : state.allDogs.filter((dog) => { return dog.temperament && dog.temperament.includes(payload) })
                }
            }
            if (state.queryState === true) {
                return {
                    ...state,
                    searchDogs: payload === "Todos"
                        ? state.searchDogsCopia
                        : state.searchDogs.filter((dog) => { return dog.temperament && dog.temperament.includes(payload) })
                }
            }

        case ORDER:
            return {
                ...state,
                [payload[2]]: payload[0] === "A" || payload[0] === "AA"
                    ? state[payload[2]].sort((a, b) => { return comparar(a, b, payload[1]) })
                    : state[payload[2]].sort((a, b) => { return comparar(b, a, payload[1]) }),
            }
        case TEMPERAMENTS:
            return {
                ...state,
                allDogsFilter: payload
            }
        case FILTERbdd:
            let filteredDogs = [];
            const dogs = state.queryState ? state.searchDogsCopia : state.allDogsCopia;

            if (payload === "Todos") {
                filteredDogs = dogs;
            } else if (payload === "API") {
                filteredDogs = dogs.filter((dog) => typeof dog.id === "number");
                console.log(filteredDogs)
            } else if (payload === "BDD") {
                filteredDogs = dogs.filter((dog) => dog.created === true);
            }

            if (state.queryState === false) {
                return {
                    ...state,
                    allDogs: filteredDogs
                }
            };
            if (state.queryState === true) {
                return {
                    ...state,
                    searchDogs: filteredDogs
                }
            }
        default:
            return { ...state }
    }
}

export default rootReducer;