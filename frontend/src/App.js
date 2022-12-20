import logo from './logo.svg';
import './App.css';
import CardItems from './Components/CardItems';
import CreateMemory from './Components/CreateMemory';
import Signup from './Components/Signup';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Cookies from 'js-cookie';
import { useEffect } from 'react';


function MemoriesNavbar() {
  return (
    <div className='memories'>
      <span>Memories</span>
    </div>

  )
}

function Memory() {
  
  const navigate = useNavigate();

  useEffect(() => {

    if(!Cookies.get('token')){
      navigate('/');
    }

  }, []);

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
          <Route path='/' element={<Login />}></Route>
          <Route path='/memory' element={<Memory/>}></Route>

        </Routes>
      </BrowserRouter>


    </>


  );
}

export default App;
