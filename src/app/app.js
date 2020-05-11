import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { IconX } from './../design-system/components/icon-x';
import { colors } from './../design-system/styles';

import { CheckoutButton, CheckoutForm } from './../modules/cart'
import { BuildPizza, pizzas } from './../modules/products';

const stripePromise = loadStripe("pk_test_rKarX4mhDwJwrWlfc6yUnoQh00qraD4ezM");



const menu = {
  visible: { marginRight: 0 },
  hidden: { marginRight: -500 },
}
const grayedOut = {
  visible: { opacity: .8, zIndex: 10,  },
  hidden: { opacity: 0, zIndex: 0 }
}




function App() {

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);

  const [orderItems, setOrderItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToOrder = (item) => {

    setOrderItems([
      ...orderItems,
      item,
    ])
  }
  
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const selectedPizza = pizzas[0];
  

  
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div className="z-10 relative flex flex-col">
          <div className="self-center max-w-xl">
            <img className="fixed bottom-0 z-0" style={{ right: '50%', marginBottom: -400, marginRight: 240 }} src={require('./assets/big-pizza.png')} alt="Pizza" />
            <BuildPizza pizza={selectedPizza} className="mt-64 relative z-10" onAddToOrder={addToOrder} />
          </div>
        </div>
        <motion.div onClick={toggleMenu} variants={grayedOut} initial="hidden" animate={isMenuOpen ? 'visible': 'hidden'} className="absolute right-0 top-0 bottom-0 left-0 bg-black z-0"></motion.div>
        <CheckoutButton onClick={toggleMenu} className="absolute z-10 right-0 top-0 mr-8 mt-8" count={orderItems.length} />
        <motion.div variants={menu} initial="hidden" animate={isMenuOpen ? 'visible': 'hidden'} className="z-10 p-4 absolute right-0 top-0 bottom-0 bg-white" style={{ width: 500 }}>
          <button onClick={toggleMenu} ><IconX color={colors.black} /></button>
          <div className="p-12">
            <CheckoutForm items={orderItems} />
          </div>
        </motion.div>
      </Elements>
    </div>
  );
}

export default App;
