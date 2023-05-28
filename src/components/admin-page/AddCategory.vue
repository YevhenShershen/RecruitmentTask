<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '../../stores/Сategories'
const category = ref('')
const categoryStore = useCategoryStore()
const addCategory = (item: string): void => {
  categoryStore.addCategory(item)
  category.value = ''
}
</script>

<template>
  <div class="product-table d-flex align-center">
    <v-text-field
      v-model="category"
      label="dodaj kategorije"
      type="text"
      hide-details="auto"
    ></v-text-field>
    <v-btn class="ml-5" @click="addCategory(category)">Dodaj kategorije</v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
