import logo from './logo.svg';
import './App.css';
import CardItems from './Components/CardItems';
import CreateMemory from './Components/CreateMemory';
import Signup from './Components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';


function MemoriesNavbar() {
  return (
    <div className='memories'>
      <span>Memories</span>
    </div>

  )
}

function Memory() {
  return (
    <>
      <div className='navbar'>
        <MemoriesNavbar />
      </div>

      <div style={{ display: 'flex' }}>
        <CardItems />
        <CreateMemory />
      </div>
    </>
  );
}

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>

          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/memory' element={<Memory/>}></Route>

        </Routes>
      </BrowserRouter>


    </>


  );
}

export default App;
