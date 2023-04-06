import React,{useState} from "react";
import styles from "./Auth.module.scss";
import Card from "../../components/card/Card";
import imgRegister from "../../assets/login.svg";
import { Link,useNavigate } from "react-router-dom";
import { BiShowAlt } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBase/Config";
import Loader from "../../components/loader/Loader"


const Register = () => {
    const [showpassword, setShowPassword] = useState(false);
    const [showconfirm,setShowConfirmPass] = useState(false)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const [isloading,setLoading ] = useState(false)
    const navigate = useNavigate()

    const toggle = () => {
      setShowPassword(!showpassword);
      setShowConfirmPass(!showconfirm)
    };

    const userSubmit = (e) =>{
      e.preventDefault()
     if(password !== confirmPass){
      toast.error("Password do not match.")
     }

     setLoading(true)

     createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
         const user = userCredential.user;
         console.log(user);
         setLoading(false)
         toast.success("user registration successfull")
         navigate("/")
       })
       .catch((error) => {
         toast.error(error.message)
         setLoading(false)
       });
    }
  return (
    <>
    {isloading && <Loader /> }
    <section className={styles.auth}>
      <div className={styles.img}>
        <img src={imgRegister} alt="register" width="500" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Sign up</h2>

          <form className={styles.inputform} onClick={userSubmit}>
            <input type="text" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
              <div className={styles.inputpassword}>
            <input
              type={!showpassword ? "password" : "text"}
              placeholder="password"
              required
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              
            />
            <span className={styles.icons} onClick={toggle}>
              {showpassword ? <BiShowAlt size={20} /> : <BiHide size={20} />}
            </span>
            </div>
             <div className={styles.inputpassword}>
            <input
              type={!showconfirm ? "password" : "text"}
              placeholder="confirm password"
              required
              value={confirmPass}
              onChange={(e)=>setConfirmPass(e.target.value)}
            />
            <span className={styles.icons} onClick={toggle}>
              {showconfirm ? <BiShowAlt size={20} /> : <BiHide size={20} />}
            </span>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <span className={styles.register}>
            <p>Already an account? </p>
            <Link to="/login">
              Login
            </Link>
          </span>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Register;
