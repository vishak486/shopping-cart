import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Shopping Cart
            </Link>

            <div className="navbar-nav">
              <Link className="nav-link" to="/">
                Products
              </Link>

              <Link className="nav-link" to="/cart">
                Cart
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
