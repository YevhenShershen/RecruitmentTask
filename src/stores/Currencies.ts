import { defineStore } from 'pinia'
import type { Currency } from '../types'
type CurrencyList = {
  currencies: Currency[]
  currentCurrency: string
  mainCurrencyProject: string
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
    currentCurrency: 'zł',
    mainCurrencyProject: 'zł'
  }),
  getters: {
    getCurrenciesList: (state: CurrencyList): Currency[] => state.currencies,
    getMainCurrencyProject: (state: CurrencyList): string => state.mainCurrencyProject
  },

  actions: {
    changeCurrentCurrency(item: string): void {
      this.currentCurrency = item
    }
  }
})
