import React, { useState } from 'react'
import { ButtonPill } from '../../../design-system/components/button-pill';
import { ButtonPrimary } from '../../../design-system/components/button-primary';

import { centsToCurrency } from '../../utils/cents-to-currency';

import { toppings as toppingsData } from './../data/toppings';




export const BuildPizza = ({
  className = "",
  pizza = { name: "Plain Cheese", price: 1000, description: 'Delicious!' },
  onAddToOrder = () => {},
}) => {

  const [toppings, setToppings] = useState(toppingsData.map(topping => ({ ...topping, selected: false })));


  const toggleTopping = (index) => () => {
    const topping = toppings[index];
    setToppings([
      ...toppings.slice(0, index),
      { ...topping, selected: !topping.selected },
      ...toppings.slice(index + 1),
    ]);
  }

  const getTotal = () => toppings
    .filter(topping => topping.selected)
    .reduce((a, c) => {
      return a + c.price
    }, pizza.price);


  const addToOrder = () => {
    const item = {
      name: pizza.name,
      price: pizza.price,
      subItems: toppings.filter(topping => topping.selected)
    }
    onAddToOrder(item);
  }

  return (
    <div className={className}>
      <p className="heading-1">{pizza.name}</p>
      <div className="flex flex-wrap mt-4">
        { toppings.map((topping, i) =>
          <ButtonPill testId={topping.id} key={i} onClick={toggleTopping(i)} isOn={topping.selected} className="mr-4 mt-4">{topping.name}</ButtonPill>
        )}
      </div>
      <p className="mt-6">{pizza.description}</p>
      <div className="mt-6">
        <ButtonPrimary testId="button_addPizza" className="mr-4" onClick={addToOrder}>Add To Order</ButtonPrimary>
        <span data-cy-id="text_total" className="heading-3">{centsToCurrency(getTotal())}</span>
      </div>
    </div>
  );
}

