import React, { useState } from "react";
import styles from "./Auth.module.scss";
import Card from "../../components/card/Card";
import imgRegister from "../../assets/login.svg";
import { Link,useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../fireBase/Config";
import Loader from "../../components/loader/Loader";


const Login = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setLoading] = useState(false);
  const navigate = useNavigate()

  const toggle = () => {
    setShowPassword(!showpassword);
  };

  const userSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      //  const user = userCredential.user;
      //  console.log(user);
       setLoading(false)
       toast.success("Login successfull...")
       navigate("/")
      })
     .catch((error) => {
       toast.error(error.message)
       setLoading(false)
     });

  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle =  () =>{
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login successfull...")
        navigate("/")
      }).catch((error) => {
       toast.error(error.message)
      });
  }

  return (
    <>
    {isloading && <Loader />}
    <section className={styles.auth}>
      <div className={styles.img}>
        <img src={imgRegister} alt="register" width="500" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Sign In</h2>

          <form className={styles.inputform} onSubmit={userSubmit}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.inputpassword}>
              <input
                type={!showpassword ? "password" : "text"}
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={styles.icons} onClick={toggle}>
                {showpassword ? <BiShowAlt size={20} /> : <BiHide size={20} />}
              </span>
            </div>
            <button type="submit">Login</button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>--or--</p>
          </form>
          <button className={styles.goLogin} onClick={signInWithGoogle}>
            <AiOutlineGoogle size={20} /> Login With Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account? </p>
            <Link to="/register">Sign Up</Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Login;
