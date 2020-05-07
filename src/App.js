import React, { useState } from 'react';
import './App.css';
import BuildPizza from './ui/screens/build-pizza/build-pizza-screen';
import SelectPizza from './ui/screens/select-pizza';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './ui/checkout-form';
import { CheckoutButton } from './ui/screens/cart/checkout-button';

const stripePromise = loadStripe("pk_test_rKarX4mhDwJwrWlfc6yUnoQh00qraD4ezM");



function App() {

  const [orderItems, setOrderItems] = useState([]);

  const addToOrder = (item) => {
    console.log(item)
    setOrderItems([
      ...orderItems,
      item,
    ])
  }

  
  return (
    <Elements stripe={stripePromise}>
      <CheckoutButton className="absolute right-0 top-0 mr-8 mt-8" count={orderItems.length} />
      <div className="flex flex-col">
        <div className="self-center max-w-xl">
          <BuildPizza className="mt-64" onAddToOrder={addToOrder} />
        </div>
      </div>
      {/* <CheckoutForm /> */}
    </Elements>
  );
}

export default App;
