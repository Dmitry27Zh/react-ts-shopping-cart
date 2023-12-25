import { ReactNode, createContext, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0
  }
  const increaseCartQuantity = (id: number) => {
    setCartItems((prevState) => {
      const isExist = prevState.some((item) => item.id === id)

      if (isExist) {
        return prevState.map((item) => {
          return item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        })
      } else {
        return [...prevState, { id, quantity: 1 }]
      }
    })
  }
  const decreaseCartQuantity = (id: number) => {
    setCartItems((prevState) => {
      const isLast = prevState.find((item) => item.id === id)?.quantity === 1

      if (isLast) {
        return prevState.filter((item) => item.id !== id)
      } else {
        return prevState.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  const removeFromCart = (id: number) => {
    setCartItems((prevState) => {
      return cartItems.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        closeCart,
        openCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartProvider
