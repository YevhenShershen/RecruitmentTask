<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import type { Product } from '@/types'
import ModalWindow from './admin-page/ModalWindow.vue'
import { useRoute } from 'vue-router'

//VAR
const productStore = useProductStore()
const headers = [...Object.keys(productStore.products[0]), 'Actions'].filter(
  (el) => el !== 'conversion'
)
const showModal = ref(false)
const product = ref('')
// const currency = productStore.currencies.map((item) => {
//   return item.value
// })

//METHODS
const changeCurrentProduct = (element: Product): void => {
  showModal.value = true
  product.value = element
}
const deleteProduct = (element: Product): void => {
  productStore.deleteProduct(element)
}
const newProduct = (): void => {
  showModal.value = true
}
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

//COMPUTED
const productList = computed(() =>
  productStore.getProductList.map(({ conversion, ...items }) => ({
    ...items
  }))
)
</script>

<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="10" sm="8" md="6">
      <div class="admin-table">
        <h1>ADMIN PANEL</h1>
        <div class="admin-table__header">
          <h2>Tabelia produktów</h2>
          <v-btn @click="newProduct()">Nowy produkt</v-btn>
        </div>
        <table style="width: 100%" class="mt-2">
          <tr>
            <th v-for="head in headers" :key="`key-${head}`" class="font-weight-bold">
              {{ head }}
            </th>
          </tr>
          <tr v-for="item in productList" :key="`key-${item.id}`">
            <td v-for="el in Object.values(item)" :key="el">{{ el }}</td>
            <td class="d-flex justify-space-around">
              <v-btn color="blue" @click="changeCurrentProduct(item)">ZMIEŃ</v-btn>
              <v-btn color="red" @click="deleteProduct(item)">USUŃ</v-btn>
            </td>
          </tr>
        </table>
      </div>
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
