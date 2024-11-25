
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { Route,Routes, useNavigate } from 'react-router-dom';
import Signin from './Components/SignIn/Signin';
import Home from './Components/Home/Home';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Questions from './Components/Pages/Questions/Questions'
import Answer from './Components/Pages/Answers/Answer';




function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
        <Route path='/home' element={<Home/>}/>
        <Route path='/questions' element={<Questions/>}/>
        <Route path='/answers' element={<Answer/>}/>
      </Routes>
      <ToastContainer/>
    
      <Footer />
    </>
  );
}

export default App
