<script setup lang="ts">
import { ref } from 'vue'
type PropTypes = {
  items: String[]
  label: String
}
const props = defineProps<PropTypes>()
const emit = defineEmits<{
  (e: 'return-current-item', item: string): void
}>()
const currentItem = ref('')
const selectItem = (): void => {
  emit('return-current-item', currentItem.value)
}
</script>
<template>
  <v-select
    v-model="currentItem"
    :items="props.items"
    :label="props.label"
    required
    @update:modelValue="selectItem()"
  ></v-select>
</template>
