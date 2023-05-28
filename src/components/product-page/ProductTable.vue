<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/ProductStore'
import ModalWindow from '../admin-page/ModalWindow.vue'

type PropTypes = {
  products: Product[]
  currency: String
}
const props = defineProps<PropTypes>()
const emit = defineEmits<{
  (e: 'sort-product-price', sort: boolean): void
}>()
//VAR
const productStore = useProductStore()
const sortProduct = ref(true)
const price = ref('')
const product = ref('')
const path = computed(() => useRoute().path)
const showModal = ref(false)
//METHODS
const newProduct = (): void => {
  showModal.value = true
}
const changeCurrentProduct = (element: Product): void => {
  showModal.value = true
  product.value = element
}
const deleteProduct = (element: Product): void => {
  productStore.deleteProduct(element)
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
//COMPUTED
const observationPage = computed(() => ref(path.value === '/' ? false : true))
const headers = ref(
  observationPage
    ? [...Object.keys(productStore.products[0])].filter((el) => el !== 'conversion')
    : [...Object.keys(productStore.products[0])]
)
//
const sortProductPrice = () => {
  sortProduct.value = !sortProduct.value
  price.value = sortProduct.value ? 'DOWN' : 'UP'
  emit('sort-product-price', sortProduct.value)
}
</script>

<template>
  <div class="product-table">
    <div class="product-table__header d-flex justify-space-between">
      <h2>Tabelia produktów</h2>
      <div class="d-flex">
        <v-btn class="product-table__sort px-2" @click="sortProductPrice">
          Sortowanie Ceny {{ price }}
        </v-btn>
        <v-btn v-if="observationPage.value" @click="newProduct()">Nowy produkt</v-btn>
      </div>
    </div>

    <table style="width: 100%" class="mt-2">
      <tr>
        <th v-for="head in headers" :key="`key-${head}`" class="font-weight-bold">
          {{ head }}
        </th>
        <th v-if="observationPage.value" class="font-weight-bold">Actions</th>
      </tr>
      <tr v-for="item in props.products" :key="`key-${item.id}`">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.conversion || item.price }} {{ currency }}</td>
        <td>{{ item.animal }}</td>
        <td v-if="observationPage.value" class="d-flex justify-space-around">
          <v-btn color="blue" @click="changeCurrentProduct(item)">ZMIEŃ</v-btn>
          <v-btn color="red" @click="deleteProduct(item)">USUŃ</v-btn>
        </td>
      </tr>
    </table>
    <ModalWindow v-if="showModal" :closeModal="closeModalWindow" :product="product" />
  </div>
</template>

<style scoped lang="scss">
.product-table {
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
