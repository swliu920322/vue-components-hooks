import { computed, ComputedRef, onUnmounted, Ref, ref, unref, watch } from "vue";
// import { throttle } from "lodash-es";
import { IPagination } from "../../pagination/usePagination";
import { IBasicColumn, IBasicTableProps, ITableRowSelection } from "../basic-table.types";
interface IRefs {
  containerRef: Ref<HTMLDivElement | undefined>;
  getColumnRef: ComputedRef<IBasicColumn[]>;
  tableRef: Ref;
  getPaginationRef: ComputedRef<IPagination | boolean>;
  getRowSelectionRef: ComputedRef<ITableRowSelection | null>;
}
export default function useTableScroll(
  propsRef: ComputedRef<Partial<IBasicTableProps>>,
  { containerRef, getColumnRef, tableRef, getPaginationRef, getRowSelectionRef }: IRefs
) {
  // 是否开启
  const scrollXRef = ref<boolean>(propsRef.value.scrollX || false);
  const scrollYRef = ref<boolean>(propsRef.value.scrollY || true);
  // 滚动高度
  const scrollYHeight = ref<number>(0);

  watch(
    () => propsRef.value.scrollX,
    (val) => {
      if (val !== undefined) {
        scrollXRef.value = val;
      }
    }
  );
  watch(
    () => propsRef.value.scrollY,
    (val) => {
      if (val !== undefined) {
        scrollYRef.value = val;
      }
    }
  );
  const getScrollX = computed(() => {
    let width = 0;
    if (unref(getRowSelectionRef)) {
      width += 40;
    }
    getColumnRef.value.forEach((i) => {
      if (i.width) {
        width += parseInt(i.width as string, 10) || 0;
      } else {
        width += 150;
      }
    });
    const tableWidth = tableRef.value?.$el?.offsetWidth ?? 0;
    return tableWidth > width ? "100%" : width;
  });
  function getScrollHeight() {
    if (scrollYRef.value) {
      const containerHeight = unref(containerRef)?.clientHeight;
      const tableCurHeight = unref(tableRef)?.$el ? unref(tableRef).$el.clientHeight : 0;
      const hasPagination = unref(getPaginationRef) !== false;
      if (tableCurHeight && containerHeight) {
        const headEl = unref(tableRef).$el.querySelector(".ant-table-thead ");
        const paginationEl = unref(tableRef).$el.querySelector(".ant-pagination");
        scrollYHeight.value =
          containerHeight -
          (hasPagination && paginationEl ? paginationEl.clientHeight + 17 : 0) -
          headEl.clientHeight;
      }
    }
  }
  function throttle(callback: (...params: any[]) => any, delay = 20) {
    let timer = 0;
    return function tt(...args: any[]) {
      if (timer) {
        return;
      }
      timer = setTimeout(() => {
        callback.apply(null, [...args]);
        clearTimeout(timer);
        timer = 0;
      }, delay);
    };
  }
  function checkScroll() {
    const fn = throttle(getScrollHeight);
    window.removeEventListener("resize", fn);
    window.addEventListener("resize", fn);
    onUnmounted(() => {
      window.removeEventListener("resize", fn);
    });
  }
  checkScroll();
  const getScrollRef = computed(() => {
    return {
      x: scrollXRef.value ? unref(getScrollX) : null,
      y: scrollYHeight.value ?? null,
    };
  });
  return {
    getScrollRef,
    checkScroll,
    getScrollHeight,
  };
}
