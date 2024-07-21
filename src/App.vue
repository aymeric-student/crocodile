<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue";
import cocktails from "@/datas/coktails.json";
import { CoktailsConstantes } from "@/constantes";
import { usePaginationService } from "@/services/pagination.service.ts";
import Coktail from "@/models/coktail.model.ts";

const selectedIngredients = ref<string[]>([]);
const searchQuery = ref<string>("");
const items = ref<string[]>([]);

const ingredientSet = new Set<string>();
cocktails.forEach((cocktail: Coktail) => {
  cocktail.ingredients.split(", ").forEach((ingredient) => {
    ingredientSet.add(ingredient);
  });
});
items.value = Array.from(ingredientSet);

const filteredCocktails = ref<Coktail[]>(cocktails);

const filterCocktails = () => {
  if (selectedIngredients.value.length === 0 && searchQuery.value === "") {
    filteredCocktails.value = cocktails;
  } else {
    filteredCocktails.value = cocktails.filter((cocktail: Coktail) => {
      return selectedIngredients.value.every((ingredient) =>
        cocktail.ingredients.includes(ingredient)
      ) && cocktail.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }
};

watchEffect(filterCocktails);

const {
  page,
  currentItems,
  totalPages,
  setPage,
  updateItems
} = usePaginationService(filteredCocktails.value, CoktailsConstantes.COCKTAILS_PER_PAGE);

watch(filteredCocktails, (newVal) => {
  setPage(1);
  updateItems(newVal);
});

const randomCocktail = ref<Coktail | null>(null);
const isDialogActive = ref(false);

const chooseRandomCocktail = () => {
  const randomIndex = Math.floor(Math.random() * filteredCocktails.value.length);
  randomCocktail.value = filteredCocktails.value[randomIndex];
  isDialogActive.value = true;
};
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mt-5">La Liste des Cocktails du Crocodile</h1>
    <p class="mt-2 text-center">Voici la liste des cocktails du Crocodile. Vous pouvez filtrer les cocktails par
      ingrédients en utilisant le sélecteur ci-dessous.</p>
    <p class="mt-2">Nombre total de cocktails : {{ filteredCocktails.length }}</p>

    <div class="flex items-center w-full max-w-6xl mt-5 space-x-3">
      <v-select
        v-model="selectedIngredients"
        :items="items"
        class="flex-1"
        label="Sélectionner des ingrédients"
        multiple
      >
        <template v-slot:selection="{ item, index }">
          <v-chip v-if="index < 2">
            <span>{{ item.title }}</span>
          </v-chip>
          <span
            v-if="index === 2"
            class="text-grey text-caption align-self-center"
          >
            (+{{ selectedIngredients.length - 2 }} autres)
          </span>
        </template>
      </v-select>

      <v-text-field
        v-model="searchQuery"
        class="flex-1"
        clearable
        label="Chercher par nom"
      ></v-text-field>

      <v-btn color="primary" @click="chooseRandomCocktail">Aléatoire</v-btn>
    </div>

    <!-- Liste des cocktails -->
    <div class="w-full min-h-[700px] mt-5">
      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full list-none p-0 m-0">
        <li v-for="cocktail in currentItems" :key="cocktail.name"
            class="border border-gray-300 rounded-lg w-full text-center p-6 box-border flex flex-col justify-between h-80">
          <img :alt="cocktail.name" :src="cocktail.image || CoktailsConstantes.COKTAILS_IMAGE_PER_DEFAULT"
               class="w-full h-40 object-cover rounded-md mb-4" />
          <div class="flex flex-col justify-center flex-grow">
            <p class="font-bold">{{ cocktail.name }}</p>
            <p>{{ cocktail.ingredients }}</p>
          </div>
        </li>
      </ul>
    </div>

    <v-pagination
      v-model="page"
      :length="totalPages"
      :total-visible="7"
      class="mt-5"
      next-icon="mdi-chevron-right"
      prev-icon="mdi-chevron-left"
    ></v-pagination>

    <v-dialog v-model="isDialogActive" max-width="500">
      <v-card>
        <v-card-title class="headline">Cocktail Gagnant</v-card-title>
        <v-card-text v-if="randomCocktail">
          <p>{{ randomCocktail.name }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="isDialogActive = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
/* Adjust the inputs and button to be larger */
.v-text-field,
.v-select {
  max-width: 400px;
}

.v-btn {
  height: 56px;
}
</style>
