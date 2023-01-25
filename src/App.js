import {useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Alert from './component/Alert';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/Signup';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Navbar />
      <Alert alert={alert}/>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home showAlert={showAlert}/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
        <Route exact path='/signup' element={<Signup showAlert={showAlert}/>} />
      </Routes>
      </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
