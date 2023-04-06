import React, { useState } from 'react'
import styles from "./Auth.module.scss";
import imgRegister from "../../assets/login.svg";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth"
import auth from "../../fireBase/Config"
import { toast } from 'react-toastify';


const Reset = () => {
  const [email ,setEmail] = useState("")

  const userResetSubmit = (e) =>{
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
       toast.success("check your email for a reset link")
      })
      .catch((error) => {
       toast.error(error.message)
      });
  }
  return (
     <section className={styles.auth}>
      <div className={styles.img}>
        <img src={imgRegister} alt="register" width="500" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>

          <form className={styles.inputform} onSubmit={userResetSubmit}>
            <input type="text" placeholder="Email" required
            value={email}
            onChange={(e)=>setEmail(e.target.value)} />
            <button type="submit">Reset Password</button>
              <div className={styles.links} style={{marginBottom:"30px"}}>
              <p>
              <Link to="/login">Login</Link>
              </p>
              <p>
              <Link to="/register">SignUp</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
  )
}

export default Reset