<template>
  <v-pagination
    :length="length"
    :model-value="modelValue"
    :total-visible="7"
    class="mt-2"
    next-icon="mdi-chevron-right"
    prev-icon="mdi-chevron-left"
    @update:model-value="updateModelValue"
  ></v-pagination>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: Number,
  length: Number,
  totalVisible: Number
});

const emits = defineEmits(["update:modelValue"]);

const updateModelValue = (value: number) => {
  emits("update:modelValue", value);
};
</script>

<style scoped>
.v-pagination {
  margin-top: 1.25rem;
}
</style>
