<script setup lang="ts">
import { ref } from 'vue'
type PropTypes = {
  items: String[]
  label: String
}
const props = defineProps<PropTypes>()
const emit = defineEmits<{
  (e: 'return-current-item', item: String): void
}>()
const returnItem = () => {
  emit('return-current-item', currentItem.value)
}
const currentItem = ref('')
</script>
<template>
  <v-select
    v-model="currentItem"
    :items="props.items"
    :label="props.label"
    required
    @update:modelValue="returnItem()"
  ></v-select>
</template>
