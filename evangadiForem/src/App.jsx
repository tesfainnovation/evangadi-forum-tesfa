
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import { Route,Routes } from 'react-router-dom';
import Signin from './Components/SignIn/Signin';

function App() {
 

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signin />} />
        {/* <Route path='/signup' element={<SignUp/>}/> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App
