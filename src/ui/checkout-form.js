import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { ButtonPrimary } from './components/button-primary';
import { ButtonSecondary } from './components/button-secondary';


const CreatePaymentEndPoint = 'http://ec2-34-227-31-122.compute-1.amazonaws.com:3000/create-payment-intent';
// const CreatePaymentEndPoint = 'http://localhost:3001/create-payment-intent';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = 'John Green';

    try {
      await fetch(CreatePaymentEndPoint, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          hour: '5:00pm',
          addressDelivery: '121 Happy Street',
        })
      });


      await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
        },
      }).then(() => {
        console.log('success!');
      })

    } catch (error) {
      console.log('Create payment error', error);
    }

  };






  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement />
      </label>
      {/* <ButtonSecondary disabled={!stripe}>Pay now</ButtonSecondary> */}
      <button disabled={!stripe}>Pay Now</button>
    </form>
  );
}