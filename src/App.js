import './App.css';
import Main from './pages/Main/Main';
import Login from './pages/User/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
