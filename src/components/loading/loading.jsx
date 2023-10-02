import giftLoading from '../../images/cargando.gif'
import styles from '../loading/loading.module.css'

export default function LoadingComponent() {
  
    return (
      <div  className={styles.containerLoading}>
        <div className={styles.center}>
        <img src={giftLoading} alt="loading"></img>
        </div>
      </div>
    );
  }

