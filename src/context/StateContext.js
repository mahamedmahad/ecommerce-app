import React, { createContext, useContext, useState } from 'react'

import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  let foundProduct
  let index

  const onAddCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    )

    /* A function that takes the previous total price and adds the product price multiplied by the
quantity. */
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    /* This is checking if the product is already in the cart. If it is, it will update the quantity of
    the product. */
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })
      setCartItems(updatedCartItems)
    } else {
      /* If the product is not in the cart, it will add the product to the cart. */
      product.quantity = quantity

      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product.name} added to cart`)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)

    if (value === 'inc') {
      let newCartItems = [
        ...cartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]
      // foundProduct.quantity += 1;
      // cartItems[index] = foundProduct;
      setCartItems(newCartItems)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        let newCartItems = [
          ...cartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]

        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAddCart,
        setShowCart,
        loading,
        setLoading,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
