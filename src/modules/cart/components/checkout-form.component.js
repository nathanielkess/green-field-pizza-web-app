import React from 'react';
import {useStripe, useElements, CardElement,  } from '@stripe/react-stripe-js';
import { centsToCurrency } from '../../utils/cents-to-currency';


// const createPaymentEndPoint = 'http://ec2-34-227-31-122.compute-1.amazonaws.com:3000/payment/create';
const createChargeEndPoint = 'http://localhost:3000/payment/create';

const TwoUp = ({
  left,
  right,
  className = '',
}) =>
  <div className={`flex justify-between ${className}`}>
    <div>{left}</div>
    <div>{right}</div>
  </div>

const calculateTotal = (items) => {
  return items.reduce((a,c) => {
    const subItems = (!!c.subItems) ? calculateTotal(c.subItems) : 0;
    return a + c.price + subItems
  }, 0);
}

const CartItem = ({item, className }) =>
  <div className={`${className}`}>
    <TwoUp
      left={<p className="copy-bold">{item.name}</p>}
      right={<p className="copy-bold">{ centsToCurrency(item.total)}</p>}
    />
    <p className="copy">{item.toppingsCount} toppings</p>
  </div>





export const CheckoutForm = ({ items = [] }) => {
  const stripe = useStripe();
  const elements = useElements();

  const deliveryFee = 500;
  const subTotal = calculateTotal(items);
  const summary = {
    subTotal: subTotal,
    total: subTotal + deliveryFee,
    delivery: deliveryFee,
    items: items.map((item) => ({
      ...item,
      total: calculateTotal([item]) ,
      toppingsCount: item.subItems.length,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = 'John Green';

    // const r = await fetch(createChargeEndPoint, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     }
    // });


    try {

      const { token } = await stripe.createToken(elements.getElement(CardElement));

      await fetch(createChargeEndPoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
          token: token,
          hour: '5:00pm',
          addressDelivery: '121 Happy Street',
          total: summary.total,
        })
      });
      console.log('created!');

    } catch (error) {
      console.log('error!', {error});
    }





  //   try {
  //     await fetch(CreatePaymentEndPoint, {
  //       method: "POST",
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: name,
  //         hour: '5:00pm',
  //         addressDelivery: '121 Happy Street',
  //         total: summary.total,
  //       })
  //     });


  //     await stripe.createPaymentMethod({
  //       type: 'card',
  //       card: elements.getElement(CardElement),
  //       billing_details: {
  //         name: name,
  //       },
  //     }).then(() => {
  //       console.log('success!');
  //     })

  //   } catch (error) {
  //     console.log('Create payment error', error);
  //   }
  };






  return (
    <div>
      <p className="heading-2">Items</p>
      {
        (items.length === 0)
          ? <p>Your cart is empty</p>
          : <>
            <div className="border-t border-gray-m pt-6 mt-6">
              {summary.items.map((item, index) => (
                <CartItem className="mb-6" key={index} item={item} />
              ))}
            </div>
            <div className="border-t border-gray-m py-6">
              <TwoUp left={<p className="copy-bold">Subtotal</p>} right={<p className="copy-bold">{ centsToCurrency(summary.subTotal) }</p>} />
              <TwoUp left={<p>Delivery</p>} right={<p>{centsToCurrency(summary.delivery)}</p>} />
            </div>
            <div className="border-t border-gray-m pt-6">
              <TwoUp left={<p className="heading-3">Total</p>} right={<p className="heading-3">{ centsToCurrency(summary.total) }</p>} />
            </div>
          </>
      }


      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        {/* <ButtonSecondary disabled={!stripe}>Pay now</ButtonSecondary> */}
        <button disabled={!stripe}>Pay Now</button>
      </form>
    </div>
  );
}
