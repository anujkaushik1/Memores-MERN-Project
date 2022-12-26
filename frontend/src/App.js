import logo from './logo.svg';
import './App.css';
import CardItems from './Components/CardItems';
import CreateMemory from './Components/CreateMemory';
import Signup from './Components/Signup';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Components/Login';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';


function MemoriesNavbar() {
  return (
    <div className='navbar'>
      <div className='memories'>
        <span>Memories</span>
      </div>
    </div>


  )
}

function Memory() {

  const navigate = useNavigate();
  const [parentBool, setParentBool] = useState(false);
  const [dataFromCard, setDataFromCard] = useState(undefined);

  const changeState = (val) => {
    setParentBool(val);
  }

  useEffect(() => {

    if (!Cookies.get('token')) {
      navigate('/');
    }


  }, []);

  return (
    <>
    
      <MemoriesNavbar />

      <div style={{ display: 'flex' }}>
        <CardItems parentBool={parentBool} setDataFromCard={setDataFromCard}/>
        <CreateMemory parentBool={parentBool} changeState={changeState} setDataFromCard={setDataFromCard} dataFromCard = {dataFromCard}/>
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
          <Route path='/' element={<Navigate to='/login' />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/memory' element={<Memory />}></Route>

        </Routes>
      </BrowserRouter>


    </>


  );
}

export default App;
