<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import { useProductStore } from '../../stores/ProductStore'
import { useAnimalStore } from '../../stores/AnimalStore'
import SelectComponent from '../SelectComponent.vue'
type PropsType = {
  product: Product
  openModal: boolean
  closeModal: () => void
}
const productStore = useProductStore()
const newProduct = ref({
  id: 0,
  name: '',
  category: '',
  price: '',
  animal: ''
})
const animalStore = useAnimalStore()
const props = defineProps<PropsType>()
const modalTitle = ref('')
const showModalWindow = computed(() => (props.openModal ? 'block' : 'none'))
const isProduct = computed(() => (props.product.name ? true : false))
const onSubmit = (e) => {
  const { name, category, animal, price } = e.target.elements
  productStore.addProduct({
    id: window.crypto.randomUUID(),
    name: name.value,
    category: category.value,
    animal: animal.value,
    price: price.value
  })
}
//UPDATE DATA
const getSelectCategory = (item) => {
  return (newProduct.category = item)
}
const getSelectAnimal = (item) => {
  return (newProduct.animal = item)
}
const showModalTitle = computed(
  () => (modalTitle.value = props.product.name ? 'Modyfikuj dane produktu' : 'Dodaj Nowy produkt')
)
</script>

<template>
  <div id="myModal" :class="'modal d-' + showModalWindow">
    <div class="modal-content">
      <div class="d-flex justify-space-between">
        <h2>{{ showModalTitle }}</h2>
        <button class="close" @click="closeModal()">&times;</button>
      </div>
      <form class="d-flex flex-column" @submit.prevent="onSubmit">
        <v-text-field
          name="name"
          label="Nazwa produktu:"
          type="text"
          hide-details="auto"
          v-model="newProduct.name"
          required
        ></v-text-field>
        <v-text-field
          name="price"
          label="Cena:"
          type="number"
          hide-details="auto"
          v-model="newProduct.price"
          required
        ></v-text-field>
        <SelectComponent
          name="category"
          :label="'kategorije'"
          :items="productStore.categories"
          @return-current-item="getSelectCategory"
          required
        />
        <SelectComponent
          name="animal"
          :label="'Nazwa zwierzęcia'"
          :items="animalStore.animals"
          @return-current-item="getSelectAnimal"
          required
        />
        <v-btn type="submit">{{ isProduct ? 'zmienić' : 'dodaj' }}</v-btn>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
