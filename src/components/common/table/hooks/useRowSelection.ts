import { computed, ComputedRef, reactive, ref, unref } from "vue";
import { IBasicTableProps, ITableRowSelection } from "../basic-table.types";
import { EmitType } from "../../../../types";

export default function useRowSelection(
  propsRef: ComputedRef<Partial<IBasicTableProps>>,
  getDataSourceRef: ComputedRef<any[]>,
  emit: EmitType
) {
  const selectedRowsRef = ref<any[]>([]);
  const selectedRowsAllRef = reactive<any>({});
  const selectedRowKeysRef = ref<any[]>([]);

  const getRowSelectionRef = computed(() => {
    const { rowSelection } = unref(propsRef);
    if (!rowSelection) {
      return null;
    }
    return {
      selectedRowKeys: unref(selectedRowKeysRef),
      hideDefaultSelections: false,
      columnWidth: 40,
      onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
        const rowKey = propsRef.value.rowKey || "id";
        selectedRows.forEach((i) => {
          selectedRowsAllRef[i[rowKey]] = i;
        });
        Object.keys(selectedRowsAllRef).forEach((key) => {
          if (selectedRowKeys.findIndex((ii) => ii === key) === -1) {
            Reflect.deleteProperty(selectedRowsAllRef, key);
          }
        });

        selectedRowKeysRef.value = selectedRowKeys;
        selectedRowsRef.value = selectedRows;
        emit("selection-change", {
          keys: selectedRowKeys,
          rows: selectedRows,
        });
      },
      ...rowSelection,
    } as ITableRowSelection;
  });
  function setSelectedRowKeys(rowKeys: string[]) {
    selectedRowKeysRef.value = rowKeys;
    const rowKey = unref(propsRef).rowKey;
    if (rowKey) {
      selectedRowsRef.value = unref(getDataSourceRef).filter((item) => rowKeys.includes(item[rowKey]));
    }
  }

  function clearSelectedRowKeys() {
    selectedRowsRef.value = [];
    selectedRowKeysRef.value = [];
  }
  return {
    getAllSelectedRows: () => unref(Object.values(selectedRowsAllRef)),
    getAllSelectedRowKeys: () => unref(selectedRowKeysRef),
    getSelectedRows: () => unref(selectedRowsRef),
    getSelectedRowKeys: () => unref(selectedRowsRef.value.map((i) => i[propsRef.value.rowKey || "id"])),
    setSelectedRowKeys,
    getRowSelectionRef,
    clearSelectedRowKeys,
  };
}
