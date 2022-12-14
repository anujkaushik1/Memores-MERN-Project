import logo from './logo.svg';
import './App.css';
import CardItems from './Components/CardItems';

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
        <MemoriesNavbar/>
      </div>

      <CardItems/>
    </>
      
      
  );
}

export default App;
