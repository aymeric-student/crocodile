import { computed, ref } from "vue";
import Coktail from "@/models/coktail.model.ts";

export function usePaginationService(initialItems: Coktail[], itemsPerPage: number) {
  // Ensure that items is correctly typed as a Ref<T[]>
  const items = ref<Coktail[]>(initialItems);
  const page = ref(1);
  const totalItems = computed(() => items.value.length);
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

  const currentItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.value.slice(start, end);
  });

  const nextPage = () => {
    if (page.value < totalPages.value) {
      page.value += 1;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value -= 1;
    }
  };

  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
      page.value = newPage;
    }
  };

  const updateItems = (newItems: Coktail[]) => {
    items.value = newItems as Coktail[];
    page.value = 1;
  };

  return {
    page,
    totalItems,
    currentItems,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    updateItems
  };
}
