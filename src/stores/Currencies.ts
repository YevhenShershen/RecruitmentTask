import { defineStore } from 'pinia'
import type { Currency } from '../types'
type CurrencyList = {
  currencies: Currency[]
  currentCurrency: string
}
export const useCurrencyStore = defineStore('CurrencyList', {
  state: (): CurrencyList => ({
    currencies: [
      {
        course: 0,
        value: 'zł'
      },
      {
        course: 0.24,
        value: '$'
      },
      {
        course: 0.22,
        value: '€'
      }
    ],
    currentCurrency: 'zł'
  }),
  getters: {
    getCurrenciesList: (state: CurrencyList): Currency[] => state.currencies
  },
  actions: {}
})
