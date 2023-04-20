import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Home from './Views/Home';
import Logout from './Views/Logout';
import CartList from './Views/Cart';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/confirm" element={<AccountConfirm />} />
        <Route path="/reset" element={<ResetPassword />} />*/}
        <Route path="/cart" element={<CartList />} /> 
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
