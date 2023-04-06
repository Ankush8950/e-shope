import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home.js"
import Contact from "./pages/contact/Contact.js"
import Footer from "./components/footer/Footer.js"
import Header from "./components/header/Header.js"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/contact' element={<Contact /> }/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/reset' element={ <Reset /> }/>
    </Routes>
    <Footer />
    <ToastContainer />
    </div>
  );
}

export default App;
