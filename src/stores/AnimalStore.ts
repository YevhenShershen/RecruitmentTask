import { defineStore } from 'pinia'

type AnimalList = {
  animals: String[]
}
export const useAnimalStore = defineStore('DishStore', {
  state: (): AnimalList => ({
    animals: ['Ptaszki', 'Kot', 'Pies']
  })
})
