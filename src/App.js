import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import LoginSignup from './comp/LoginSignup';
import Homeproduct from './comp/home_product';
import Shop from './comp/shop';
import Cart from './comp/cart';
import Contact from './comp/contact';

const App = () => {
  // State variables
  const [cart, setCart] = useState([]);
  const [shop, setShop] = useState(Homeproduct);
  const [search, setSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const Filter = (x) => {
    const catefilter = Homeproduct.filter((product) => {
      return product.cat === x;
    });
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(Homeproduct);
  };

  // Shop Search Filter
  const searchlength = (search || []).length === 0;
  const searchproduct = () => {
    if (searchlength) {
      alert("Please Search Something !");
      setShop(Homeproduct);
    } else {
      const searchfilter = Homeproduct.filter((x) => {
        return x.cat === search;
      });
      setShop(searchfilter);
    }
  };

  // Add To cart
  const addtocart = (product) => {
    const exist = cart.find((x) => {
      return x.id === product.id;
    });
    if (exist) {
      alert("This product is already added in cart");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert("Added To cart");
    }
  };

  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} user={{ username }}setIsAuthenticated={setIsAuthenticated} 
  setUsername={setUsername}  />}

        <Routes>
          {/* Protect Routes */}
          <Route 
            path="/" 
            element={isAuthenticated 
              ? <Rout setCart={setCart} cart={cart} shop={shop} Filter={Filter} allcatefilter={allcatefilter} addtocart={addtocart} /> 
              : <Navigate to="/login" />} 
          />
            <Route path="/shop" element={<Shop shop={shop} addtocart={addtocart} Filter={Filter} allcatefilter={allcatefilter} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart}  />} />
            <Route path="/contact" element={<Contact />} />



          {/* Login Route */}
          <Route path="/login" element={<LoginSignup setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
        </Routes>

        {/* Footer is always visible */}
        {isAuthenticated&&<Footer />}
      </BrowserRouter>
    </>
  );
};

export default App;
