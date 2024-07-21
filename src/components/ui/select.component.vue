<template>
  <v-combobox
    v-model="localValue"
    :items="items"
    :label="label"
    chips
    multiple
    @update:modelValue="updateModelValue"
  >
    <template v-slot:selection="{ item, index }">
      <v-chip v-if="index < 2">
        <span>{{ item }}</span>
      </v-chip>
      <span v-if="index === 2" class="text-grey text-caption align-self-center">
        (+{{ localValue.length - 2 }} autres)
      </span>
    </template>
  </v-combobox>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  items: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const emits = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal;
});

const updateModelValue = (newValue: any) => {
  localValue.value = newValue;
  emits("update:modelValue", newValue);
};
</script>

<style scoped>
.v-select {
  max-width: 400px;
}
</style>
