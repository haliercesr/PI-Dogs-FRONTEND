import './App.css';
//components
import Form from '../src/components/form/form';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../src/components/home/home';
import Detail from './components/detail/detail';
import Create from './components/create/create';
import Searchbar from './components/searchbar/searchbar';
import { useState } from 'react';
import { URLfrontend,URLSERVER } from './configURL';

function App() {

const [num, setNum] = useState(0)

  return (                                         //Coloco "exact" para ue la ruta sea exacta, caso contrario si tengo:  <Route path="/" component={Form} />, esto significa que cuando la URL sea / o cualquier otra ruta que comience con /, el componente Form se renderizará porque la coincidencia es parcial.
     
    <Router>
      <div className="App">
        <Searchbar num={num} setNum={setNum}></Searchbar>
        <Switch>                           
        <Route exact path="/" component={Form} />  
        <Route exact path="/home" render={(props) => <Home {...props} num={num} setNum={setNum} URLfrontend={URLfrontend} />}/>
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/create" render={(props) => <Create {...props}  URLSERVER={URLSERVER} />}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
