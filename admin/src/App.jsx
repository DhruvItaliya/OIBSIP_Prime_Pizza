import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from './pages/Register'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import SideMenu from "./components/SideMenu";
import Order from "./pages/Order";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Pizza from "./pages/Pizza";
import BaseToppings from "./pages/BaseToppings";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {isLoggedIn && <SideMenu />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} >
            <Route path=':token' element={<ResetPassword />} />
          </Route>
          <Route path='/' element={<Dashboard />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/pizza' element={<Pizza />} />
          <Route path='/base-toppings' element={<BaseToppings />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
