import { defineStore } from 'pinia'

type CategoryList = {
  categories: string[]
}
export const useCategoryStore = defineStore('CategoryStore', {
  state: (): CategoryList => ({
    categories: ['Domki na drzewach', 'Domki na ziemi']
  }),
  getters: {
    getCategoryList: (state: CategoryList): string[] => state.categories
  },
  actions: {
    addCategory(category: string): void {
      if (!!category) this.categories.push(category)
    },
    deleteCategory(category: string): void {
      this.categories = this.categories.filter((item: string) => {
        return item !== category
      })
    }
  }
})
