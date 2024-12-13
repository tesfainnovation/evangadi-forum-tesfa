
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { Navigate, Route,Routes, useNavigate } from 'react-router-dom';
import Signin from './Components/SignIn/Signin';
import Home from './Components/Home/Home';
import { ToastContainer} from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import Questions from './Components/Pages/Questions/Questions'
import Answer from './Components/Pages/Answers/Answer';
import { useContext } from 'react';
import { contextApi } from './Components/Context/Context';




function App() {
const {token}=useContext(contextApi)
console.log(token)
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to={"/home"} /> : <Signin/>}
        />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path="/home" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/answers/:question_id" element={<Answer />} />
      </Routes>
      <ToastContainer />
      <Toaster position="top-right" />

      <Footer />
    </>
  );
}

export default App
