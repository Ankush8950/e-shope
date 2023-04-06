import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillCloseCircle } from "react-icons/ai";
import { CgProfile } from 'react-icons/cg';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../fireBase/Config";
import { useDispatch } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slice/AuthSlice";
import HiddenLink, { ShowLOgOUt } from "../HidenLink/HiddenLink";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);
const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart <FaCartArrowDown size={20} className={styles.cartIcon} />
      <p>0</p>
    </Link>
  </span>
);

const Header = () => {
  const [showmenu, setShowMenu] = useState(false);
  const [displayname,setDisplayName] = useState("")
  const navigate =  useNavigate()
  const dispatch =  useDispatch()
  const toggleMenu = () => {
    setShowMenu(!showmenu);
  };

  const hidemenu = () => {
    setShowMenu(false);
  };


  const userSignOut =() =>{
    signOut(auth).then(() => {
      toast.success("Logout successfull...")
      navigate("/")
     
    }).catch((error) => {
      toast.error(error.message)
    });
  }


  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.displayName);

      if(user.displayName == null){
        const u1 = user.email.substring(0,user.email.indexOf("@"))
        console.log(u1);
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
        setDisplayName(uName)
      }else{
      setDisplayName(user.displayName)
      }

      dispatch(SET_ACTIVE_USER({
        email:user.email,
        userName:user.displayName ? user.displayName : displayname,
        userID: user.uid,
      }))
    } else {
      setDisplayName("")
      dispatch(REMOVE_ACTIVE_USER())
    }
  });
  }, [dispatch,displayname])
  

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showmenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={showmenu ? `${styles["nav-wrapper"]}` : ""}
            onClick={hidemenu}
          ></div>
          <ul onClick={hidemenu}>
            <li className={styles.navlogo}>
              {logo}
              <AiFillCloseCircle
                size={30}
                color="#fff"
                className={styles.closeMenu}
                onClick={hidemenu}
              />
            </li>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? `${styles.active}` : "" }>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact"  className={({isActive}) => isActive ? `${styles.active}` : "" }>Contact Us</NavLink>
            </li>
          </ul>

          <div className={styles.header_right} onClick={hidemenu}>
            <span className={styles.links}>
            <ShowLOgOUt>
              <NavLink to="/login"  className={({isActive}) => isActive ? `${styles.active}` : "" }>Login</NavLink>
               <NavLink to="/register"  className={({isActive}) => isActive ? `${styles.active}` : "" }>Register</NavLink>
              </ShowLOgOUt>
              <HiddenLink>
              
              <Link className={styles.profile}>
               <CgProfile /> Hi {displayname}
              </Link>
             
              <NavLink to="/order-history"  className={({isActive}) => isActive ? `${styles.active}` : "" }>My Orders</NavLink>

               <NavLink to="/"  onClick={userSignOut}>Log Out</NavLink>
               </HiddenLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles.hambermenu}>
          {cart}
          <RxHamburgerMenu
            size={25}
            className={styles.menu}
            onClick={toggleMenu}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
