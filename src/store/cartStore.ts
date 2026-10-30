
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../schemas/productSchema'

interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  increaseQuantity: (productId: number) => void
  decreaseQuantity: (productId: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          )

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(item.quantity + 1, 5),
                    }
                  : item
              ),
            }
          }

          return {
            cart: [...state.cart, { product, quantity: 1 }],
          }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.product.id !== productId
          ),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, 5),
                }
              : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.max(item.quantity - 1, 1),
                }
              : item
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart-storage',
    }
  )
)
