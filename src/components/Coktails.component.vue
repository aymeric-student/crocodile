<template>
  <li class="border border-gray-300 rounded-lg w-full text-center p-2 box-border flex flex-col justify-between h-70">
    <img :alt="cocktail.name" :src="cocktail.image || CoktailsConstantes.COKTAILS_IMAGE_PER_DEFAULT"
         class="w-full h-40 object-cover rounded-md mb-2" />
    <div class="flex flex-col justify-center flex-grow">
      <p class="font-bold">{{ cocktail.name }}</p>
      <p>{{ cocktail.ingredients }}</p>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { CoktailsConstantes } from "@/constantes";

interface Cocktail {
  name: string;
  image?: string;
  ingredients: string;
}

defineProps<{
  cocktail: Cocktail
}>();
</script>

<style scoped>
</style>
