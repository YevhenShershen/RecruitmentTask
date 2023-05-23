import { defineStore } from 'pinia'
import type { Product, Currencies } from '@/types'
import { CATEGORIES, ANIMALS } from '../constants/constants'
import CURRENCIES from '../constants/currencies'

type ProductList = {
  products: Product[]
  currencies: Currencies[]
  categories: Object
}
export const useProductStore = defineStore('ProductStore', {
  state: (): ProductList => ({
    products: [
      {
        id: window.crypto.randomUUID(),
        name: 'Podwójny dom dla kotów',
        category: CATEGORIES.EARTH_HOUSES,
        price: 55,
        animal: ANIMALS.CAT
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Wielki dom dla psów',
        category: CATEGORIES.TREE_HOUSES,
        price: 77,
        animal: ANIMALS.DOG
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla ptaka',
        category: CATEGORIES.TREE_HOUSES,
        price: 55.03,
        animal: ANIMALS.BIRD
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla małego pieska',
        category: CATEGORIES.EARTH_HOUSES,
        price: 77,
        animal: ANIMALS.DOG
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Plastikowy dom',
        category: CATEGORIES.TREE_HOUSES,
        price: 55.6,
        animal: ANIMALS.CAT
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla małych ptaków',
        category: CATEGORIES.EARTH_HOUSES,
        price: 7,
        animal: ANIMALS.BIRD
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Domek w górach dla ptaka VIP',
        category: CATEGORIES.EARTH_HOUSES,
        price: 27,
        animal: ANIMALS.BIRD
      }
    ],
    currencies: CURRENCIES,
    categories: Object.values(CATEGORIES)
  }),
  getters: {
    getProductList: (state: ProductList): Product[] => state.products,
    getPricetUp: (state: ProductList): Product[] =>
      state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
    getPriceDown: (state: ProductList): Product[] =>
      state.products.sort((a, b) => (b.price > a.price ? 1 : -1))
  },
  actions: {
    changeCurrencies(currency: String): void {
      const changeCurrency = this.currencies.find((el) => el.value === currency)
      this.products = this.products.map(({ price, ...items }) => ({
        ...items,
        price,
        conversion:
          changeCurrency?.course === 0 ? price : (price * changeCurrency?.course).toFixed(2)
      }))
    },
    addProduct(product: Product): void {
      this.products.push(product)
    },
    deleteProduct(product: Product): void {
      this.products = this.products.filter((item: Product) => {
        return item.id !== product.id
      })
    },
    changeProduct(product: Product): void {
      let idItem = this.products.findIndex((item) => item.id === product.id)
      console.log(idItem)
      this.products.splice(idItem, 1, product)
      console.log(product)
    }
  }
})
