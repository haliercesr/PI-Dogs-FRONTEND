import styles from '../card/card.module.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


function Card(props) {
   const{name,image,temperament,weight,id}=props
   


   return (
      
      <div className={styles.DivCard}>
         
         <Link to={`/detail/${id}`}>
          <div className={styles.Divimg}>
            <img src={image.url} alt='dog'/> 
          </div>       
         <div className={styles.Divtext} > 
           <h1 >{name}</h1>
           <h2>Temperamentos</h2>
           <h3 >{temperament}</h3> 
           <h2>Peso(KG)</h2>
           <h3 >{weight.metric}</h3> 
         </div>
         </Link>
         
      </div>
      
   );
}

function mapDispatchToProps(dispatch) {
   return {
   }
}

function mapStateToProps(state) {
   return {
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Card)

