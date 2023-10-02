import style from "../form/form.module.css"
import { useState, useEffect } from "react"
import Loading from '../loading/loading'
import { useHistory } from 'react-router-dom';

function Form(props) {
  const [loading, setLoading] = useState(false)
  const history = useHistory();


  useEffect(() => {
    // Esta función se ejecutará cuando la ruta cambie (después de la navegación)
    setLoading(false);
  }, [history.location.pathname]);

  return (<div className={style.containerForm}>
    {loading ? <Loading></Loading> : null}

    <div className={style.Title}>     
      <h1>Proyecto Individual</h1>
      <h1>DOGS</h1>
      <h2>Single page application - responsive - SoyHenry</h2>
      <button className={style.buttonForm} onClick={() => {
      setLoading(true)
      history.push('/home');
    }}>COMENZAR</button>
    </div>
    
   

  </div>)
}

export default Form;