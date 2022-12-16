import logo from './logo.svg';
import './App.css';
import CardItems from './Components/CardItems';
import CreateMemory from './Components/CreateMemory';

function MemoriesNavbar() {
  return (
    <div className='memories'>
      <span>Memories</span>
    </div>

  )
}

function App() {
  return (
    <>
      <div className='navbar'>
        <MemoriesNavbar />
      </div>

      <div style={{display : 'flex'}}>
        <CardItems />
        <CreateMemory />
      </div>
    </>


  );
}

export default App;
