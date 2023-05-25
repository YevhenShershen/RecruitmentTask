<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import type { Product } from '@/types'
import { useRoute } from 'vue-router'
import FilterComponent from './admin-page/FilterComponent.vue'
import ProductTable from './product-page/ProductTable.vue'
import AddCategory from './admin-page/AddCategory.vue'
import ModalWindow from './admin-page/ModalWindow.vue'
//VAR
const productStore = useProductStore()
const showModal = ref(false)
const product = ref('')
const currency = ref('zł')
const productList = ref(productStore.products)
//METHODS
const closeModalWindow = (): void => {
  product.value = {
    name: '',
    category: '',
    price: '',
    animal: ''
  }
  showModal.value = false
}
const sortProductPrice = (sort: boolean): Product[] => {
  if (sort) {
    return productStore.getPricetUp
  } else {
    return productStore.getPriceDown
  }
}
const getSelectCurrency = (item: string): void => {
  currency.value = item
}
const getFilterProducts = (item: Product[]): void => {
  productList.value = item
}
//COMPUTED
const path = computed(() => useRoute().path)
</script>

<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="10" sm="8" md="6">
      <FilterComponent
        @return-select-currency="getSelectCurrency"
        @return-filter-products="getFilterProducts"
      />
      <AddCategory />
      <v-divider class="my-10"></v-divider>
      <ProductTable
        @sort-product-price="sortProductPrice"
        :currency="currency"
        :products="productList"
      />
      <ModalWindow v-if="showModal" :closeModal="closeModalWindow" :product="product" />
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.admin-table {
  &__sort {
    border: 1px solid black;
    border-radius: 5%;
  }
}
table,
th,
td {
  border: 1px solid black;
}
</style>
