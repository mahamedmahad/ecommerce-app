import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'

import { useStateContext } from '../../context/StateContext'

import Cart from './../cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Ecommerce Store</Link>
      </p>

      <button type='button' className='cart-icon'>
        <AiOutlineShopping />
        <span className='cart-item-qty' onClick={() => setShowCart(true)}>
          {totalQuantities}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
