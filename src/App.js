import React, { useState } from 'react';
import { motion } from 'framer-motion'
import './App.css';
import BuildPizza from './ui/screens/build-pizza/build-pizza-screen';
import SelectPizza from './ui/screens/select-pizza';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './ui/checkout-form';
import { CheckoutButton } from './ui/screens/cart/checkout-button';
import { IconX } from './ui/components/icon-x';
import { colors } from './ui/styles';

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

  const [orderItems, setOrderItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const addToOrder = (item) => {
    setOrderItems([
      ...orderItems,
      item,
    ])
  }
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div className="z-10 relative flex flex-col">
          <div className="self-center max-w-xl">
            <BuildPizza className="mt-64" onAddToOrder={addToOrder} />
          </div>
        </div>
        <motion.div onClick={toggleMenu} variants={grayedOut} initial="hidden" animate={isMenuOpen ? 'visible': 'hidden'} className="absolute right-0 top-0 bottom-0 left-0 bg-black z-0"></motion.div>
        <CheckoutButton onClick={toggleMenu} className="absolute z-10 right-0 top-0 mr-8 mt-8" count={orderItems.length} />
        <motion.div variants={menu} initial="hidden" animate={isMenuOpen ? 'visible': 'hidden'} className="z-10 p-4 absolute right-0 top-0 bottom-0 bg-white" style={{ width: 500 }}>
          <button onClick={toggleMenu} ><IconX color={colors.black} /></button>
          <CheckoutForm />
        </motion.div>
      </Elements>
    </div>
  );
}

export default App;
