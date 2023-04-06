import React from 'react'
import  ReactDOM  from 'react-dom'
import styles from "./Loader.module.scss"
import loader from "../../assets/Spinner-5.gif"

const Loader = () => {
  return ReactDOM.createPortal (
    <div className={styles.wrapper}>
        <div className={styles.loader}>
            <img src={loader} alt="Loader..." />
        </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader