import { computed, ComputedRef, ref, unref } from "vue";
import { IBasicTableProps } from "@/components/common/table/basic-table.types";

export default function useDataSource(propsRef: ComputedRef<Partial<IBasicTableProps>>) {
  const dataSourceRef = ref<any[]>(unref(propsRef).dataSource || []);

  return {
    setDataSource(val: any[]) {
      dataSourceRef.value = val;
    },
    getDataSourceRef: computed(() => dataSourceRef.value),
  };
}
