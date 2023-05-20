import { defineStore } from 'pinia'
import type { Product } from '@/types'
type ProductList = {
  products: Product[]
}
export const useProductStore = defineStore('DishStore', {
  state: (): ProductList => ({
    products: [
      {
        id: '1',
        name: 'product1',
        category: false,
        price: 55,
        animal: 'Cat'
      },
      {
        id: '2',
        name: 'product2',
        category: false,
        price: 77,
        animal: 'Dog'
      },
      {
        id: '3',
        name: 'product1',
        category: true,
        price: 55.03,
        animal: 'Cat'
      },
      {
        id: '4',
        name: 'product2',
        category: true,
        price: 77,
        animal: 'Dog'
      },
      {
        id: '5',
        name: 'product1',
        category: false,
        price: 55.6,
        animal: 'Cat'
      },
      {
        id: '6',
        name: 'product2',
        category: true,
        price: 7,
        animal: 'Dog'
      }
    ]
  }),
  getters: {
    getProductList: (state) => {
      return state.products
    },
    getPricetUp: (state) => {
      return state.products.sort((a, b) => (a.price > b.price ? 1 : -1))
    },

    getPriceDown: (state) => {
      return state.products.sort((a, b) => (b.price > a.price ? 1 : -1))
    }
  },
  actions: {}
})
