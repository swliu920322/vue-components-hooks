<template>
  <div ref="elRef" class="app-iconify anticon" :style="wrapStyleRef" />
</template>

<script lang="ts">
  import Iconify from "@purge-icons/generated";
  import {
    computed,
    defineComponent,
    CSSProperties,
    watch,
    ref,
    unref,
    nextTick,
    onMounted,
    onUnmounted,
  } from "vue";

  export default defineComponent({
    name: "AoIcon",
    props: {
      icon: {
        type: String,
        default: "",
      },
      prefix: {
        type: String,
        default: "",
      },
      color: {
        type: String,
        default: "",
      },
      size: {
        type: [String, Number],
        default: 22,
      },
    },
    setup(props) {
      const elRef = ref<HTMLElement | null>(null);
      const wrapStyleRef = computed(
        (): CSSProperties => {
          const { size, color } = props;
          let fs = size;
          if (typeof size === "string") {
            fs = parseInt(size, 10);
          }
          return {
            fontSize: `${fs}px`,
            color,
            display: "inline-flex",
          };
        }
      );
      const update = async () => {
        const el = unref(elRef);
        if (el) {
          await nextTick();
          const icon = props.icon;
          let svg;
          if (Iconify.renderSVG) svg = Iconify.renderSVG(icon, {});
          if (svg) {
            el.textContent = "";
            el.appendChild(svg);
          } else {
            const span = document.createElement("span");
            span.className = "iconify";
            span.dataset.icon = icon;
            el.textContent = "";
            el.appendChild(span);
          }
        }
      };
      const watchStop = watch(() => props.icon, update, { flush: "post" });
      onUnmounted(() => {
        watchStop && watchStop();
      });
      onMounted(update);
      return {
        elRef,
        wrapStyleRef,
      };
    },
  });
</script>

<style scoped>
  .app-iconify {
    display: inline-block;
    vertical-align: middle;
  }
  .cur-pointer {
    cursor: pointer;
  }

  /* span.iconify { */

  /*  display: block; */

  /*  min-width: 1em; */

  /*  min-height: 1em; */

  /*  background: #5551; */

  /*  border-radius: 100%; */

  /* } */
</style>
