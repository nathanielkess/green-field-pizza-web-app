import React, { useEffect, useState } from 'react'
import { ButtonPill } from '../../components/button-pill';
import { ButtonPrimary } from '../../components/button-primary';
import { orderPizza } from './../../../api/order';
import { centsToCurrency } from '../../../utils/cents-to-currency';




export default ({
  className = "",
  basePrice = 1300,
  onAddToOrder = () => {},
}) => {
  
  const [toppings, setToppings] = useState([
    { name: "Pepperoni", price: 50, selected: false },
    { name: "Mushrooms", price: 50, selected: true },
    { name: "Onions", price: 50, selected: false },
    { name: "Sausage", price: 50, selected: true },
    { name: "Bacon", price: 50, selected: true },
    { name: "Black Olives", price: 50, selected: false },
    { name: "Green Peppers", price: 50, selected: false },
  ]);


  const toggleTopping = (index) => () => {
    const topping = toppings[index];
    setToppings([
      ...toppings.slice(0, index),
      { ...topping, selected: !topping.selected },
      ...toppings.slice(index + 1),
    ]);
  }

  const getTotal = () => toppings
    .filter(({selected}) => selected)
    .reduce((a, c) => {
      return a + c.price
    }, basePrice);


  const addToOrder = () => onAddToOrder({ price: getTotal() });

  return (
    <div className={className}>
      <p className="heading-1">The Greek</p>
      <div className="flex flex-wrap mt-4">
        { toppings.map((topping, i) => 
          <ButtonPill key={i} onClick={toggleTopping(i)} isOn={topping.selected} className="mr-4 mt-4">{topping.name}</ButtonPill>
        )}
      </div>
      <p className="mt-6">The pizza was as big as the wheels on my truck. It was thin crust with feta cheese, olives and fresh tomatoes- a “Greek” I think they call it. The dough was wholewheat but you couldn't really tell, certainly the kids couldn't. They ate it just the same and asked for more.</p>
      <div className="mt-6">
        <ButtonPrimary className="mr-4" onClick={addToOrder}>Add To Order</ButtonPrimary>
        <span className="heading-3">{centsToCurrency(getTotal())}</span>
      </div>
    </div>
  );
}
