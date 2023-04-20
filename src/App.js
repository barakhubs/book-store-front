import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Register from './Views/Register';
import Home from './Views/Home';
import Logout from './Views/Logout';
import CartList from './Views/Cart';
import Footer from './Components/Footer';
import OrderList from './Views/Order';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/confirm" element={<AccountConfirm />} />*/ }
        <Route path="/orders" element={<OrderList />} />
        <Route path="/cart" element={<CartList />} /> 
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
