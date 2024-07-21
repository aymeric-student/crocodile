import { ref, watch } from "vue";
import Cocktail from "@/models/cocktail.model.ts";

/**
 * Service pour gérer les cocktails, y compris le filtrage et la sélection aléatoire.
 * @param {Cocktail[]} cocktails - La liste initiale des cocktails.
 * @returns {object} Les références et les fonctions pour gérer les cocktails.
 */
export function useCocktailService(cocktails: Cocktail[]) {
  const selectedIngredients = ref<string[]>([]);
  const searchQuery = ref<string>("");
  const items = ref<string[]>([]);

  // Récupère les ingrédients uniques des cocktails
  for (const cocktail of cocktails) {
    for (const ingredient of cocktail.ingredients.split(", ")) {
      if (!items.value.includes(ingredient)) {
        items.value.push(ingredient);
      }
    }
  }

  const filteredCocktails = ref<Cocktail[]>(cocktails);

  /**
   * Filtre les cocktails en fonction des ingrédients sélectionnés et de la requête de recherche.
   */
  const filterCocktails = () => {
    const query = searchQuery.value.toLowerCase();
    filteredCocktails.value = cocktails.filter(cocktail => {
      const matchIngredients = selectedIngredients.value.every(ingredient => cocktail.ingredients.includes(ingredient));
      const matchQuery = cocktail.name.toLowerCase().includes(query);
      return matchIngredients && matchQuery;
    });
  };

  watch([selectedIngredients, searchQuery], filterCocktails);

  const randomCocktail = ref<Cocktail | null>(null);
  const isDialogActive = ref(false);

  /**
   * Sélectionne un cocktail aléatoire parmi les cocktails filtrés.
   */
  const chooseRandomCocktail = () => {
    if (filteredCocktails.value.length === 0) {
      console.error("Aucun cocktail disponible pour la sélection aléatoire");
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredCocktails.value.length);
    randomCocktail.value = filteredCocktails.value[randomIndex];
    isDialogActive.value = true;
  };

  return {
    selectedIngredients,
    searchQuery,
    items,
    filteredCocktails,
    randomCocktail,
    isDialogActive,
    chooseRandomCocktail
  };
}
