import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
      </Routes>
      </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
