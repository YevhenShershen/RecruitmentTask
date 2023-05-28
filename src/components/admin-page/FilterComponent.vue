<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import SelectComponent from '../SelectComponent.vue'
import { useProductStore } from '../../stores/ProductStore'
import { useCategoryStore } from '@/stores/Сategories'
import { useCurrencyStore } from '../../stores/Currencies'
import { watch } from 'vue'

const emit = defineEmits<{
  (e: 'return-select-currency', item: string): void
  (e: 'return-filter-products', items: Product[]): void
}>()
const returnSelectCurrency = (): void => {
  emit('return-select-currency', selectCurrency.value)
}
const returnFilterProducts = (): void => {
  emit('return-filter-products', filteredProductList.value)
}
//VAR
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const currencyStore = useCurrencyStore()
const productList = computed(() => productStore.getProductList)
//FILTER VARS
const selectCurrency = ref('zł')
const selectCategory = ref('')
const filterProductText = ref('')
const selectAnimal = ref('')
const currencies = currencyStore.currencies.map((item) => {
  return item.value
})

//METHODS
const getSelectCategory = (item: string): string => {
  resetSelectAnimal()
  return (selectCategory.value = item)
}
const resetSelectAnimal = (): string => (selectAnimal.value = '')
const unwrappinElement = (text: string, items: any): string[] => [
  { title: text, value: '' },
  ...items.map((item: string) => ({
    title: item,
    value: item
  }))
]
const changeCurrencies = (selectItem: string) => {
  selectCurrency.value = selectItem
  returnSelectCurrency()
  currencyStore.changeCurrentCurrency(selectItem)
  productStore.changeCurrencyProduct(selectCurrency.value)
}
const selectAnimalsItems = computed(() => unwrappinElement('All', productStore.animals))
const selectCategoryItems = computed(() =>
  unwrappinElement('Wszystkie produkty', categoryStore.categories)
)
//COMPUTED

const filteredProductList = computed(() =>
  productList.value
    ?.filter(({ category }) => category.includes(selectCategory.value))
    .filter(({ name }) => name.toLowerCase().includes(filterProductText.value.toLowerCase()))
    .filter(({ animal }) => animal.includes(selectAnimal.value))
)
//WATCH
watch(filteredProductList, () => {
  returnFilterProducts()
})
</script>

<template>
  <div class="product-page">
    <v-text-field
      label="wyszukaj produkt"
      type="text"
      hide-details="auto"
      v-model="filterProductText"
    ></v-text-field>
    <SelectComponent :label="'waluta'" :items="currencies" @update:modelValue="changeCurrencies" />
    <SelectComponent
      :label="'kategorije'"
      :items="selectCategoryItems"
      @return-current-item="getSelectCategory"
    />
    <v-select
      v-if="selectCategory"
      v-model="selectAnimal"
      :items="selectAnimalsItems"
      label="animals"
      required
    ></v-select>
  </div>
</template>

<style scoped lang="scss">
.product-page {
  &__filter {
    border: 1px solid black;
  }
}
</style>
