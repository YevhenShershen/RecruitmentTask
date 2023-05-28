<script setup lang="ts">
import { ref } from 'vue'
import { useCategoryStore } from '../../stores/Сategories'
const category = ref('')
const categoryStore = useCategoryStore()
const errorMessage = ref('')
const addCategory = (item: string): void => {
  if (!!item) {
    categoryStore.addCategory(item)
    category.value = ''
    errorMessage.value = ''
  } else {
    errorMessage.value = 'Nie można dodać puste pole'
  }
}
</script>

<template>
  <div class="product-table d-flex align-center">
    <v-text-field
      v-model="category"
      label="dodaj kategorije"
      type="text"
      hide-details="auto"
      :error-messages="errorMessage"
    ></v-text-field>
    <v-btn class="ml-5" @click="addCategory(category)">Dodaj kategorije</v-btn>
  </div>
</template>

<style scoped lang="scss"></style>
