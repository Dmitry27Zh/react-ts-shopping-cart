import { ReactNode, createContext, useContext } from 'react'

const ShoppingCartContext = createContext({})

export function useShoppingCartContext() {
  return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  return <ShoppingCartContext.Provider value={{}}>{children}</ShoppingCartContext.Provider>
}

export default ShoppingCartProvider
