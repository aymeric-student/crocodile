<script lang="ts" setup>
import { watch } from "vue";
import cocktails from "@/datas/cocktail.json";
import { CoktailsConstantes } from "@/constantes";
import { usePaginationService } from "@/services/pagination.service";
import { useCocktailService } from "@/services/coktails.service.ts";
import VSelect from "@/components/ui/select.component.vue";
import VTextField from "@/components/ui/input.component.vue";
import VPagination from "@/components/ui/pagination.component.vue";
import CocktailList from "@/components/Coktails.component.vue";
import DialogComponent from "@/components/ui/dialog.component.vue";

const {
  selectedIngredients,
  searchQuery,
  items,
  filteredCocktails,
  randomCocktail,
  isDialogActive,
  chooseRandomCocktail
} = useCocktailService(cocktails);

const {
  page,
  currentItems,
  totalPages,
  setPage,
  updateItems
} = usePaginationService(filteredCocktails.value, CoktailsConstantes.COCKTAILS_PER_PAGE);

watch(filteredCocktails, newVal => {
  setPage(1);
  updateItems(newVal);
});
</script>


<template>
  <div class="flex flex-col items-center w-full max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mt-5">La Liste des Cocktails du Crocodile</h1>
    <div class="flex items-center w-full max-w-6xl mt-5 space-x-3">
      <VSelect
        v-model="selectedIngredients"
        :items="items"
        label="Sélectionner des ingrédients"
      ></VSelect>

      <VTextField
        v-model="searchQuery"
        label="Chercher par nom"
      ></VTextField>

      <v-btn color="primary" @click="chooseRandomCocktail">Aléatoire</v-btn>
    </div>

    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full list-none min-h-[700px]">
      <CocktailList
        v-for="(cocktail, index) in currentItems"
        :key="index"
        :cocktail="cocktail"
      />
    </ul>

    <VPagination
      v-model="page"
      :length="totalPages"
      :total-visible="7"
    ></VPagination>

    <DialogComponent
      :content="randomCocktail ? randomCocktail.name : ''"
      :dialogVisible="isDialogActive"
      title="Cocktail Gagnant"
      @update:dialogVisible="isDialogActive = $event"
    />
  </div>
</template>
