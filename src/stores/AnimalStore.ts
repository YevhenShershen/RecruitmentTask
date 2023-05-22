import { defineStore } from 'pinia'
import { ANIMALS } from '../constants/constants'
import type { Animals } from '@/types'
type ProductList = {
  animals: Animals
}
export const useAnimalStore = defineStore('animalsStore', {
  state: (): ProductList => ({
    animals: ANIMALS
  })
})
