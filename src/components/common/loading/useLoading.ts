import { computed, ref, unref } from "vue";

export function useLoading(initial?: boolean) {
  const loadingRef = ref<boolean>(initial || false);
  return {
    getLoadingRef: computed(() => unref(loadingRef)),
    setLoading(val: boolean) {
      loadingRef.value = val;
    },
  };
}
