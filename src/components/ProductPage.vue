<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import type { Product } from '@/types'
import ProductTable from './product-page/ProductTable.vue'
import Categories from '../enums/categories'
const productList = ref()
const productStore = useProductStore()
const category = ref(Object.values(Categories))
const currentCategory = ref(null)
const filterProductText = ref('')
const sortProductPrice = (sort: boolean) => {
  if (sort) {
    return productStore.getPricetUp
  } else {
    return productStore.getPriceDown
  }
}
//COMPUTED
const filteredProductList = computed((): Product[] => {
  return productStore.products.filter((product) => {
    if (product.name) {
      return product.name.toLowerCase().includes(filterProductText.value.toLowerCase())
    } else {
      return productList
    }
  })
})
onMounted(() => {
  productList.value = productStore.getProductList
})
</script>

<template>
  <div class="product-page">
    <v-row>
      <v-col cols="3">
        <input
          class="product-page__filter"
          type="text"
          placeholder="Product name"
          v-model="filterProductText"
        />
        <h2>Wybież kategorije domków{{ currentCategory }}</h2>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="currentCategory"
          :items="category"
          label="kategorije"
          required
        ></v-select>
      </v-col>
    </v-row>
    <ProductTable :products="filteredProductList" @sort-product-price="sortProductPrice" />
  </div>
</template>

<style scoped></style>
