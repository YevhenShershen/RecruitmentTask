import { defineStore } from 'pinia'

type CategoriesList = {
  categories: string[]
}
export const useCategoryStore = defineStore('CategoryStore', {
  state: (): CategoriesList => ({
    categories: ['Domki na drzewach', 'Domki na ziemi']
  }),
  getters: {
    getCategoryList: (state: CategoriesList): string[] => state.categories
  },
  actions: {
    addCategory(category: string): void {
      this.categories.push(category)
    },
    deleteCategory(category: string): void {
      this.categories = this.categories.filter((item: string) => {
        return item !== category
      })
    }
  }
})
