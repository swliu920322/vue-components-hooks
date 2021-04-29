<template>
  <teleport v-bind="$attrs" v-if="mounted">
    <slot />
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from "vue";

  export default defineComponent({
    name: "TelePort",
    setup() {
      const mounted = ref<boolean>(false);
      onMounted(() => (mounted.value = true));
      return {
        mounted,
      };
    },
  });
</script>

<style scoped lang="less"></style>
