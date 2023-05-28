<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/types'
import { useProductStore } from '../../stores/ProductStore'
import { useCurrencyStore } from '../../stores/Currencies'
import SelectComponent from '../SelectComponent.vue'

type PropsType = {
  product: Product
  closeModal: () => void
}
const productStore = useProductStore()
const currencyStore = useCurrencyStore()
const props = defineProps<PropsType>()
const modalTitle = ref('')

const isProduct = computed(() => (props.product?.name ? true : false))
const propsProduct = ref({
  name: isProduct ? props.product.name : '',
  category: isProduct ? props.product.category : '',
  price: isProduct ? props.product.price : '',
  animal: isProduct ? props.product.animal : ''
})
//UPDATE DATA
const getSelectCategory = (item: string): void => {
  propsProduct.value.category = item
}
const getSelectAnimal = (item: string): void => {
  propsProduct.value.animal = item
}
const showModalTitle = computed(
  () => (modalTitle.value = props.product?.name ? 'Modyfikuj dane produktu' : 'Dodaj Nowy produkt')
)
const resetPropsProduct = (): void => {
  propsProduct.value = {
    name: '',
    category: '',
    animal: '',
    price: ''
  }
}
const addProduct = (): void => {
  if (
    Object.values(propsProduct.value)
      .map((el: string) => !!el)
      .some((e: boolean) => e === false)
  )
    return
  currencyStore.changeCurrentCurrency('zł')
  productStore.changeCurrencyProduct('zł')
  productStore.addProduct({
    id: window.crypto.randomUUID(),
    name: propsProduct.value.name,
    category: propsProduct.value.category,
    price: +propsProduct.value.price,
    animal: propsProduct.value.animal
  })
  resetPropsProduct()
  props.closeModal()
}
const onUpdate = (): void => {
  productStore.changeProduct({
    id: props.product.id,
    name: propsProduct.value.name,
    category: propsProduct.value.category,
    price: +propsProduct.value.price,
    animal: propsProduct.value.animal
  })
  resetPropsProduct()
  props.closeModal()
}
</script>

<template>
  <div id="myModal" class="modal d-block">
    <div class="modal-content">
      <div class="d-flex justify-space-between">
        <h2>{{ showModalTitle }}</h2>
        <button class="close" @click="closeModal()">&times;</button>
      </div>
      <div class="d-flex flex-column">
        <v-text-field
          name="name"
          label="Nazwa produktu:"
          type="text"
          hide-details="auto"
          v-model.trim="propsProduct.name"
          required
        ></v-text-field>
        <v-text-field
          name="price"
          label="Cena:"
          type="number"
          hide-details="auto"
          v-model.number="propsProduct.price"
          required
        ></v-text-field>
        <SelectComponent
          name="category"
          :label="'kategorije'"
          :items="productStore.categories"
          @return-current-item="getSelectCategory"
        />
        <SelectComponent
          name="animal"
          :label="'Nazwa zwierzęcia'"
          :items="productStore.animals"
          @return-current-item="getSelectAnimal"
        />
        <v-btn type="submit" @click="isProduct ? onUpdate() : addProduct()">{{
          isProduct ? 'zmienić' : 'dodaj'
        }}</v-btn>
      </div>
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
