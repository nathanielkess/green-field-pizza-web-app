import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { ButtonPrimary } from './components/button-primary';
import { ButtonSecondary } from './components/button-secondary';


// const CreatePaymentEndPoint = 'http://ec2-34-227-31-122.compute-1.amazonaws.com:3000/create-payment-intent';
const CreatePaymentEndPoint = 'http://localhost:3001/create-payment-intent';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = 'John Green';

    try {
      const response = await fetch(CreatePaymentEndPoint, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'PostmanRuntime/7.24.1'
        },
        body: JSON.stringify({
          name: name,
          hour: '5:00pm',
          addressDelivery: '121 Happy Street',
        })
      });
      console.log('name is 1', name);
      const {clientSecret} = await response.json();
      console.log('client secret is', {response, clientSecret});



      console.log('name is 2', name);
      const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
        },
      })
      .then(function(result) {
        console.log('did I do a pending payment??', result)
      });

      // const result = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: name,
      //     },
      //   }
      // });

      console.log('successful payment!!', {result});

    } catch (error) {
      console.log('Create payment error', error);
    }



 

    // if (result.error) {
    //   // Show error to your customer (e.g., insufficient funds)
    //   console.log(result.error.message);
    // } else {
    //   // The payment has been processed!
    //   if (result.paymentIntent.status === 'succeeded') {
    //     // Show a success message to your customer
    //     // There's a risk of the customer closing the window before callback
    //     // execution. Set up a webhook or plugin to listen for the
    //     // payment_intent.succeeded event that handles any business critical
    //     // post-payment actions.
    //   }
    // }
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