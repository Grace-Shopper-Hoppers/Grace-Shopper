import React from 'react'

const Buttons = (props) => {
  const product = props.product;
  let quantity = product.quantity;

  return (
    <div>
       <span>
        <button
          type='submit'
          name='decrement'
          value={product.id}
          onClick={props.handleChange}
          disabled={
            quantity > 1 ? false : true
          }>-</button>
        <p>{
          quantity
          }</p>
        <button
          type='submit'
          name='increment'
          value={product.id}
          onClick={props.handleChange}
          disabled={
            quantity < product.inventory ? false : true
          } >+</button>
        </span>
    </div>
  )

}

export default Buttons;
