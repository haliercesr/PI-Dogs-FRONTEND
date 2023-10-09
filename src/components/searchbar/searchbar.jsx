import React, { useEffect, useState } from 'react';
import './searchbar.css'; 
import { withRouter,useHistory } from 'react-router-dom';
import { searchDogs,queryDogs } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';
import Alert from '../alert/alert';

function SearchBar(props) {
  const { location, num, setNum } = props;
  const pathname = location.pathname;
  const [query, setQuery] = useState('');
  const history = useHistory();
  const dispatch = useDispatch()

  const [Message, setMessage] = useState({
    ShowCustomAlert: false,
    message: "",
 });

 function openCustomAlert() {
    console.log(Message.message)
  return <Alert
  message={Message.message}
  onClose={closeCustomAlert}
/>    
 }

 const closeCustomAlert = () => {
    setMessage({ ...Message, ShowCustomAlert: false })
 };

  useEffect(() => { 

}, [location]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Si se presiona "Enter" mientras el botón está enfocado, llama a la función handleClick
      handleSearch();
    }
  };

  const handleSearch = () => {
    
    dispatch(queryDogs(true))
    dispatch(searchDogs("reset"))
    
    try{
    dispatch(searchDogs(query));
    setQuery('')
    }catch(error){setMessage({ ShowCustomAlert: true, message: error.message })}
  };

  const backHome = () => {
    history.push('/home');
  };

  const exitForm = () => {
    history.push('/');
  };

  const create = () => {
    history.push('/create');
  };

  return (<>
      {Message.ShowCustomAlert===true && openCustomAlert()}
    {pathname==='/home'?<div className="search-bar-container">
    <button onClick={create} className="search-button">
        Create
      </button>
      <input
        type="text"
        placeholder="Buscar Toy, Doberman, ..."
        value={query}
        onChange={handleInputChange}
        className="search-input" 
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
      <button 
      onClick={handleSearch} 
      className="search-button"
      
      >
        Buscar
      </button>
      <button onClick={exitForm} className="search-button">
        Salir
      </button>
    </div>:null}
    {pathname!=='/home'&& pathname!=='/' && pathname!=='/create' ?<div className="search-bar-container">
    <button onClick={backHome} className="search-button">
        Volver al inicio
      </button>
    </div>:null}
    

  </>);
}

export default withRouter(SearchBar);
