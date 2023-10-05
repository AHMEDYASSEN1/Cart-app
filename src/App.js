import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { FaShoppingCart } from 'react-icons/fa';
import CartProvider from "./store/CartProvider";


function App() {
  const [cartIsShow, setCartIsShow] = useState(false);


const showCartHandler = () => {
  setCartIsShow(true);
}

const hideCartHandler = () => {
  setCartIsShow(false);
}
  return (
    <CartProvider>
      {cartIsShow && <Cart hideCart={hideCartHandler}/>}
      <Header showCart={showCartHandler}><FaShoppingCart /></Header>
      <Meals />
    </CartProvider>
  );
}

export default App;
