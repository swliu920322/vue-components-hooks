import { computed, ComputedRef, onUnmounted, ref, unref, watch } from "vue";
import { IBasicColumn, IBasicTableProps } from "../basic-table.types";
import { IPagination } from "../../pagination/usePagination";

export default function useColumns(
  propsRef: ComputedRef<Partial<IBasicTableProps>>,
  getPaginationRef: ComputedRef<IPagination | boolean>
) {
  const columnsRef = ref<IBasicColumn[]>(propsRef.value.columns || []);

  function columnsChange(columns?: IBasicColumn[]) {
    if (columns && Array.isArray(columns)) {
      if (unref(propsRef).columnsAlign) {
        // @ts-ignore
        columnsRef.value = columns.map((i) => ({
          ...i,
          align: i.align || unref(propsRef).columnsAlign,
        }));
      } else {
        // @ts-ignore
        columnsRef.value = columns;
      }
    }
  }
  const watchStop = watch(() => unref(propsRef).columns, columnsChange);

  onUnmounted(() => {
    watchStop && watchStop();
  });

  const getColumnRef = computed(() => {
    const getPagination = unref(getPaginationRef);
    const columns = columnsRef.value;
    const { indexColumn, indexColumnFixed } = unref(propsRef);
    const existIndex = columns.findIndex((i) => i.flag === "INDEX");
    if (existIndex > -1) {
      columns.splice(existIndex, 1);
    }
    const isFixedLeft = columns.some((item) => item.fixed === "left");
    if (indexColumn) {
      columns.unshift({
        flag: "INDEX",
        title: "序号",
        width: 50,
        align: "center",
        customRender: ({ index }) => {
          if (typeof getPagination === "boolean") {
            return `${index + 1}`;
          }
          const { current = 1, pageSize = 10 } = getPagination;
          return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
        },
        ...(isFixedLeft ? { fixed: "left" } : {}),
        ...(indexColumnFixed ? { fixed: "left" } : {}),
      });
    }
    return columnsRef.value;
  });
  return {
    getColumnRef,
    getColumns: () => getColumnRef.value,
    setColumns: columnsChange,
  };
}
