<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import { useAnimalStore } from '../stores/AnimalStore'
import type { Product } from '@/types'
import SelectComponent from './SelectComponent.vue'
import ProductTable from './product-page/ProductTable.vue'

//VAR
const productStore = useProductStore()
const animalStore = useAnimalStore()
const selectCategory = ref('')
const filterProductText = ref('')
const test = ref('')
const currency = productStore.currencies.map((item) => {
  return item.value
})
const selectCurrency = ref('zł')
const selectAnimal = ref('')
//METHODS
const getSelectCategory = (item) => {
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

const unwrappinElement = (text: String, items) => [
  { title: text, value: '' },
  ...items.map((item) => ({
    title: item,
    value: item
  }))
]
const changeCurrencies = () => productStore.changeCurrencies(selectCurrency.value)
const selectAnimalsItems = unwrappinElement('All', animalStore.animals)
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
  <div class="product-page mx-5">
    <v-row>
      <v-col cols="3">
        <input
          class="product-page__filter w-100"
          type="text"
          placeholder="wyszukaj produkt"
          v-model="filterProductText"
        />
        <h2>Wybież kategorije domków{{ test }}</h2>
      </v-col>
      <v-col cols="3">
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
      </v-col>
    </v-row>
    <ProductTable
      :currency="selectCurrency"
      :convertMoney="selectCurrency"
      :products="filteredProductList"
      @sort-product-price="sortProductPrice"
    />
  </div>
</template>

<style scoped lang="scss">
.product-page {
  &__filter {
    border: 1px solid black;
  }
}
</style>
