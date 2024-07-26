import './style/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login from './components/Login'
import ErrorMsg from './components/ErrorMsg'
import Footer from './components/Footer'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faUser, faEye, faEyeSlash, faLock)

function App() {
  return (
    <div className="container-fluid" > 
    <div className='row loginContainer' >
      <div className='col-12 '>
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='*' element={<ErrorMsg/>} />
            </Routes>
          </BrowserRouter>
      </div>
    </div>  
    <div className='row timeContainer'>
      <div className='col-12 d-flex justify-content-end align-items-center'>
        <Footer/>
     </div>
    </div>

         </div>
  );
}

export default App;
