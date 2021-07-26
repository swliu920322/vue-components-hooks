import { computed, ComputedRef, onUnmounted, Ref, ref, unref, watch } from "vue";
import { IPagination } from "../../pagination/usePagination";
import { IBasicColumn, IBasicTableProps, ITableRowSelection } from "../basic-table.types";
import { throttle } from "../../../../utils";
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

  const watchStopX = watch(
    () => propsRef.value.scrollX,
    (val) => {
      if (val !== undefined) {
        scrollXRef.value = val;
      }
    }
  );
  const watchStopY = watch(
    () => propsRef.value.scrollY,
    (val) => {
      if (val !== undefined) {
        scrollYRef.value = val;
      }
    }
  );
  onUnmounted(() => {
    watchStopX && watchStopX();
    watchStopY && watchStopY();
  });
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
