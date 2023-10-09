import style from '../home/home.module.css';
import { withRouter } from 'react-router-dom';
import { getDogs, orderDogs, filterDogs, getTemperaments, filterApi, queryDogs } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Card from '../card/card'
import LoadingComponent from '../loading/loading';
import Alert from '../alert/alert';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Home(props) {
    const { location, URLfrontend, num, setNum } = props;
    const pathname = location.pathname;
    const allDogs = useSelector(state => state.allDogs)
    const searchDogs = useSelector(state => state.searchDogs)
    const queryState = useSelector(state => state.queryState)
    const allDogsFilter = useSelector(state => state.allDogsFilter)
    const dispatch = useDispatch()
    const [numberpage, setNumberpage] = useState(1)
    const [temper, setTemper] = useState([])
    const [Message, setMessage] = useState({
        ShowCustomAlert: false,
        message: "",
        resetSeletOrder:"A",
        resetSelectFilter:"Todos",
        resetSelectFuente:"Todos",
    });

    function openCustomAlert() {
        return <Alert
            message={Message.message}
            onClose={closeCustomAlert}
        />
    }



    const closeCustomAlert = () => {
        setMessage({ ...Message, ShowCustomAlert: false })
    };

    const nextpage = () => {
        setNumberpage(numberpage + 1)
        window.scrollTo({ top: 0, behavior: 'auto' })                   //la funcion scrollTo de windows me lllea a la parte superior y con de forma instantanea con behavior:auto
    }

    const prevpage = () => {
        setNumberpage(numberpage - 1)
        window.scrollTo({ top: 0, behavior: 'auto' })
    }

    function arraygroup(array1) {
        let group = []
        let k = 0
        for (let i = 0; array1.length > i; i) {
            i = i + 8
            group.push(array1.slice(k, i))
            k = k + 8
        }
        return group

    }


    useEffect(() => {
     
            allDogs.length === 0 && dispatch(getDogs())
            // Obtener la lista de temperamentos
            temper.length === 0 && dispatch(getTemperaments())

        setTemper(allDogsFilter)


    }, [allDogsFilter, location, queryState, searchDogs]);




    const pagination = () => {
        const data = queryState ? searchDogs : allDogs;
        return <div className={style.paginationContenedor}>
            <ul className={style.paginationPage}>
                {numberpage > 1 && <li ><button onClick={prevpage}>Anterior</button></li>}
                <li ><button>{numberpage}</button></li>
                <li className={style.paginationPage}>de</li>
                <li ><button>{arraygroup(data).length}</button></li>
                {numberpage < arraygroup(data).length && <li ><button button onClick={nextpage}>Siguiente</button></li>}
            </ul>
        </div>

    }

    function handleOrder(e) {
         
        const types = queryState ? "searchDogs" : "allDogs"
        const evento = e.target.value
        setMessage({ resetSelectOrder: evento})
        if (evento === 'A' || evento === 'D') dispatch(orderDogs([evento, "name", types]))
        if (evento === 'AA' || evento === 'DD') dispatch(orderDogs([evento, "weight", types]))
        setNum(num + 1)// CON ESTO PUEDO HACER QUE SE ACTUALIZE EL USEEFFECT Y ME RENDERICE EL NUEVO ALLDOGS EN ORDEN ALFABETICO


    }

    const handleFilter = (e) => {

        const evento = e.target.value
        setMessage({ resetSelectFilter: evento})
        dispatch(filterDogs(String(evento)))
        setNum(num + 1)

    }

    const handleFilterFuente = (e) => {

        const evento = e.target.value
        setMessage({ resetSelectFuente: evento})
        dispatch(filterApi(evento))
        setNum(num + 1)

    }


    const cards = (searchDogs) => {

        return arraygroup(searchDogs)[numberpage - 1].map((element) => {
            return <Card
                key={element.id}
                id={element.id}
                name={element.name}
                image={element.image}
                temperament={element.temperament}
                weight={element.weight}

            />
        })
    }

    const inicio = () => {
        setNum(0)
        dispatch(queryDogs(false))
        setMessage({ resetSelectFilter: "A", resetSeletOrder: "Todos",resetSelectFuente: "Todos" })
        try {
            allDogs.length === 0 && dispatch(getDogs())
        } catch (error) { (setMessage({ ShowCustomAlert: true, message: error.message })) }

    }




    return (<div className={style.contenedorHome}>
        {searchDogs[0]==="Sin resutados" && (<>
            <h2>No hay resultados</h2>
            <Link to='/home' onClick={inicio}>Volver al inicio</Link>
        </>)}

        {Message.ShowCustomAlert === true && openCustomAlert()}
        {searchDogs.length === 0 && num === 0 && queryState === true ? <LoadingComponent /> : null}
        {allDogs.length === 0 && num === 0 && queryState === false ? <LoadingComponent /> : null}
        
        {searchDogs[0]!=="Sin resutados" && <div>
            <h3>Filtrar por:</h3>
            <div >
                <select value={Message.resetSeletOrder} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="D">Z-A</option>
                    <option value="AA">Mayor peso</option>
                    <option value="DD">Menor peso</option>
                </select>
                <select value={Message.resetSelectFilter} onChange={handleFilter}>
                    <option value="Todos">Todos</option>
                    {temper.length > 0 && (temper.map(tem => { return <option value={tem}>{tem}</option> }))}
                </select>
                <select value={Message.resetSelectFuente} onChange={handleFilterFuente}>
                    <option value="Todos">Todos</option>
                    <option value="API">API</option>
                    <option value="BDD">BASE DE DATOS</option>
                </select>
            </div>
        </div>}
        {num !== 0 && allDogs.length === 0 && queryState === false && (<>
            <h2>No hay resultados</h2>
            <Link to='/home' onClick={inicio}>Volver al inicio</Link>
        </>)}
        {num !== 0 && searchDogs.length === 0 && queryState === true && (<>
            <h2>No hay resultados</h2>
            <Link to='/home' onClick={inicio}>Volver al inicio</Link>
        </>)}

        <div className={style.Home}>
        
            {searchDogs.length > 0 && queryState === true && searchDogs[0]!=="Sin resutados" && cards(searchDogs)}
            {allDogs.length > 0 && queryState === false && cards(allDogs)}

            {allDogs.length > 0 && queryState === false && pagination()}
            {searchDogs.length > 0 && queryState === true && searchDogs[0]!=="Sin resutados" && pagination()}
        </div>
    </div>)
}

export default withRouter(Home);