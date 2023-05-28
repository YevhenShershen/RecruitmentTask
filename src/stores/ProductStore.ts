import { defineStore } from 'pinia'
import type { Product, Currency } from '@/types'
import { Categories, Animals } from '../enums/enums'
import { useCurrencyStore } from './Currencies'
type ProductList = {
  products: Product[]
  currencies: Currency[]
  categories: string[]
  animals: string[]
}
const currencyStore = useCurrencyStore()
export const useProductStore = defineStore('ProductStore', {
  state: (): ProductList => ({
    products: [
      {
        id: window.crypto.randomUUID(),
        name: 'Podwójny dom dla kotów',
        category: Categories.EARTH_HOUSES,
        price: 55,
        animal: Animals.CAT
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Wielki dom dla psów',
        category: Categories.TREE_HOUSES,
        price: 77,
        animal: Animals.DOG
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla ptaka',
        category: Categories.TREE_HOUSES,
        price: 55.03,
        animal: Animals.BIRD
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla małego pieska',
        category: Categories.EARTH_HOUSES,
        price: 77,
        animal: Animals.DOG
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Plastikowy dom',
        category: Categories.TREE_HOUSES,
        price: 55.6,
        animal: Animals.CAT
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Dom dla małych ptaków',
        category: Categories.EARTH_HOUSES,
        price: 7,
        animal: Animals.BIRD
      },
      {
        id: window.crypto.randomUUID(),
        name: 'Domek w górach dla ptaka VIP',
        category: Categories.EARTH_HOUSES,
        price: 27,
        animal: Animals.BIRD
      }
    ],
    currencies: currencyStore.getCurrenciesList,
    categories: Object.values(Categories),
    animals: Object.values(Animals)
  }),
  getters: {
    getProductList: (state: ProductList): Product[] => state.products,
    getPricetUp: (state: ProductList): Product[] =>
      state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
    getPriceDown: (state: ProductList): Product[] =>
      state.products.sort((a, b) => (b.price > a.price ? 1 : -1))
  },
  actions: {
    changeCurrencyProduct(currency: string): void {
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
      this.products.splice(idItem, 1, product)
    }
  }
})
