import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Alert from './component/Alert';
import Home from './component/Home';
import Navbar from './component/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Navbar />
      <Alert message={"This is amazing"}/>
      <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
      </Routes>
      </div>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
