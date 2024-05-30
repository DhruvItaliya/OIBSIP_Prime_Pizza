import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from './pages/Register'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PizzaDisplay from "./components/PizzaDisplay";
import PizzaItem from "./pages/PizzaItem";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} >
            <Route path=':token' element={<ResetPassword />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
          <Route path='/pizza' element={<PizzaItem />} >
            <Route path=':pizzaId' element={<PizzaItem />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
