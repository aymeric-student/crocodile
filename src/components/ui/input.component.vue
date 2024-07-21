<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    class="flex-1"
    @input="onInput"
  ></v-text-field>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  label: String
});

const emits = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal;
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localValue.value = target.value;
  emits("update:modelValue", target.value);
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
</style>
