<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Product } from '@/types'
const headers = ref(['Id', 'Nazwa produktu', 'Cena'])
type PropTypes = {
  products: Product[]
  currency: String
}
const props = defineProps<PropTypes>()
const sortProduct = ref(true)
const price = ref('')
const emit = defineEmits<{
  (e: 'sort-product-price', sort: boolean): void
}>()
const sortProductPrice = () => {
  sortProduct.value = !sortProduct.value
  price.value = sortProduct.value ? 'DOWN' : 'UP'
  emit('sort-product-price', sortProduct.value)
}

onMounted(() => {})
</script>

<template>
  <div class="product-table">
    <div class="product-table__header d-flex justify-space-between">
      <h2>Tabelia produktów</h2>
      <button class="product-table__sort px-2" @click="sortProductPrice">
        Sortowanie Ceny {{ price }}
      </button>
    </div>

    <table style="width: 100%" class="mt-2">
      <tr>
        <th v-for="head in headers" :key="`key-${head}`" class="font-weight-bold">
          {{ head }}
        </th>
      </tr>
      <tr v-for="item in props.products" :key="`key-${item.id}`">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.conversion || item.price }} {{ currency }}</td>
      </tr>
    </table>
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
