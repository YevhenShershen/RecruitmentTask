<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import type { Product } from '@/types'
import SelectComponent from './SelectComponent.vue'
import ProductTable from './product-page/ProductTable.vue'

//VAR
const productStore = useProductStore()
const selectCategory = ref('')
const filterProductText = ref('')
const currency = productStore.currencies.map((item) => {
  return item.value
})
const selectCurrency = ref('zł')
const selectAnimal = ref('')
//METHODS
const getSelectCategory = (item: string): string => {
  resetSelectAnimal()
  return (selectCategory.value = item)
}
const sortProductPrice = (sort: boolean): Product[] => {
  if (sort) {
    return productStore.getPricetUp
  } else {
    return productStore.getPriceDown
  }
}
const resetSelectAnimal = () => (selectAnimal.value = '')

const unwrappinElement = (text: string, items: any): string[] => [
  { title: text, value: '' },
  ...items.map((item: string) => ({
    title: item,
    value: item
  }))
]
const changeCurrencies = (): void => productStore.changeCurrencies(selectCurrency.value)
const selectAnimalsItems = unwrappinElement('All', productStore.animals)
const selectCategoryItems = unwrappinElement('Wszystkie produkty', productStore.categories)
//COMPUTED
const productList = computed(() => productStore.getProductList)
const filteredProductList = computed(() =>
  productList.value
    ?.filter(({ category }) => category.includes(selectCategory.value))
    .filter(({ name }) => name.toLowerCase().includes(filterProductText.value.toLowerCase()))
    .filter(({ animal }) => animal.includes(selectAnimal.value))
)

//HOOKS
</script>

<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="10" sm="8" md="6">
      <div class="product-page mx-5">
        <v-text-field
          label="wyszukaj produkt"
          type="text"
          hide-details="auto"
          v-model="filterProductText"
        ></v-text-field>
        <h2>Wybież kategorije domków</h2>

        <v-select
          v-model="selectCurrency"
          :items="currency"
          label="waluta"
          class="product-page__currency"
          @update:modelValue="changeCurrencies()"
          required
        ></v-select>
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
        <ProductTable
          :currency="selectCurrency"
          :convertMoney="selectCurrency"
          :products="filteredProductList"
          @sort-product-price="sortProductPrice"
        />
      </div>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.product-page {
  &__filter {
    border: 1px solid black;
  }
}
</style>
