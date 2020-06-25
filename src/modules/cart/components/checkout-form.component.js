import React, { useState, useReducer, useImperativeHandle } from 'react';
import { useStripe, useElements, CardElement, } from '@stripe/react-stripe-js';
import { centsToCurrency } from './../../utils/cents-to-currency';
import { ButtonSecondary } from './../../../design-system/components/button-secondary';
import { colors } from './../../../design-system/styles';


const createChargeEndPoint = 'http://ec2-34-227-31-122.compute-1.amazonaws.com:3000/payment/create';
// const createChargeEndPoint = 'http://localhost:3000/payment/create';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: colors.black,
      color: colors.black,
      fontWeight: 500,
      fontFamily: 'Merriweather Sans", sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: colors.black },
      '::placeholder': { color: colors.black },
    },
    // invalid: {
    //   iconColor: colors.orange.m,
    //   color: colors.orange.m,
    // },
  },
};

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
  return items.reduce((a, c) => {
    const subItems = (!!c.subItems) ? calculateTotal(c.subItems) : 0;
    return a + c.price + subItems
  }, 0);
}

const CartItem = ({ item, className }) =>
  <div className={`${className}`}>
    <TwoUp
      left={<p className="copy-bold">{item.name}</p>}
      right={<p className="copy-bold">{centsToCurrency(item.total)}</p>}
    />
    <p className="copy">{item.toppingsCount} toppings</p>
  </div>



const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'STEP_CHANGED':
      return {
        ...state,
        checkoutStep: payload.step
      };
    case 'NAME_CHANGED':
      return {
        ...state,
        name: payload.value,
      }
    case 'ADDRESS_CHANGED':
      return {
        ...state,
        address: payload.value,
      }
    default:
      return state;
  }
}

const getTime = () => {
  const today = new Date();
  return today.toLocaleDateString("en-CA", {
    hour: '2-digit',
    minute: '2-digit',
  })
}


export const CheckoutForm = React.forwardRef(({
  items = [],
  onCheckoutComplete = () => { },
}, ref) => {
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
      total: calculateTotal([item]),
      toppingsCount: item.subItems.length,
    }))
  }


  const [state, dispatch] = useReducer(reducer, {
    checkoutStep: 0,
    name: '',
    address: '',
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { token } = await stripe.createToken(elements.getElement(CardElement));
    stripe
      .createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })
      .then(function ({ error, paymentMethod }) {
        if (!!error) throw new Error(error);
        fetch(createChargeEndPoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: token,
            addressDelivery: state.address,
            name: state.name,
            total: summary.total,
            paymentMethodId: paymentMethod.id,
            hour: getTime(),
          })
        })
        console.log('complete');
        onCheckoutComplete();
        changeStepTo(2)();
      })
      .catch((error) => {
        console.log('error from create payment intent', { error });
      })
  };

  const handleChangeFor = (property) => (event) => {
    dispatch({ type: `${property}_CHANGED`, payload: { value: event.target.value } })
  }

  const changeStepTo = (step) => () => {
    dispatch({ type: 'STEP_CHANGED', payload: { step } })
  }

  useImperativeHandle(ref, () => ({ goToStep: changeStepTo }));

  return (
    <div>
      {
        state.checkoutStep === 0 &&
        <>
          <p className="heading-2">Items</p>
          <div className="border-t border-gray-m pt-6 mt-6">
            {summary.items.map((item, index) => (
              <CartItem className="mb-6" key={index} item={item} />
            ))}
          </div>
          <div className="border-t border-gray-m py-6">
            <TwoUp left={<p className="copy-bold">Subtotal</p>} right={<p data-cy-id="text_subTotal" className="copy-bold">{centsToCurrency(summary.subTotal)}</p>} />
            <TwoUp left={<p>Delivery</p>} right={<p data-cy-id="text_deliveryFee">{centsToCurrency(summary.delivery)}</p>} />
          </div>
          <div className="border-t border-gray-m pt-6">
            <TwoUp left={<p className="heading-3">Total</p>} right={<p data-cy-id="text_paymentTotal" className="heading-3">{centsToCurrency(summary.total)}</p>} />
          </div>
          <ButtonSecondary testId="button_continuePayment" className="m-auto mt-20" onClick={changeStepTo(1)}>Payment Details</ButtonSecondary>
        </>
      }
      {
        state.checkoutStep === 1 &&
        <>
          <p className="heading-2">Deliver</p>
          <div className="border-t border-gray-m pt-6 mt-6">
            <form onSubmit={handleSubmit}>
              <label className="block mt-3">
                <p>Name</p>
                <input data-cy-id="input_name" onChange={handleChangeFor('NAME')} value={state.name} className="px-3 py-1 bg-gray-l rounded-md block border-box w-full" type="text" />
              </label>
              <label className="block mt-6">
                <p>Address</p>
                <input data-cy-id="input_address" onChange={handleChangeFor('ADDRESS')} value={state.address} className="px-3 py-1 bg-gray-l rounded-md block border-box w-full" type="text" />
              </label>
              <label className="block mt-6">
                <p>Card details</p>
                <div data-cy-id="input_cardDetails" className="px-3 py-2 bg-gray-l rounded-md block border-box w-full">
                  <CardElement id="stripeElement_card" options={CARD_OPTIONS} />
                </div>
              </label>
              <div className="border-t border-gray-m pt-6 mt-12">
                <TwoUp left={<p className="heading-3">Total</p>} right={<p data-cy-id="text_paymentTotal" className="heading-3">{centsToCurrency(summary.total)}</p>} />
              </div>
              <div className="mt-20 flex flex-row justify-center items-center">
                <span data-cy-id="button_back" onClick={changeStepTo(0)}>Back</span>
                <ButtonSecondary testId="button_confirmOrder" className="ml-4" disabled={!stripe}>Order</ButtonSecondary>
              </div>
            </form>
          </div>
        </>
      }
      {
        state.checkoutStep === 2 &&
        <>
          <p data-cy-id="text_orderConfirmed" className="heading-2">Order Complete</p>
          <p className="copy-bold">Thank you</p>
        </>
      }
    </div>
  );
});
