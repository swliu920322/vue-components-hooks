import { computed, ComputedRef, ref, unref } from "vue";
import { IBasicTableProps, ITableRowSelection } from "../basic-table.types";
import { EmitType } from "../../../../types";

export default function useRowSelection(
  propsRef: ComputedRef<Partial<IBasicTableProps>>,
  getDataSourceRef: ComputedRef<any[]>,
  emit: EmitType
) {
  const selectedRowsRef = ref<any[]>([]);
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
    getSelectedRows: () => unref(selectedRowsRef),
    getSelectedRowKeys: () => unref(selectedRowKeysRef),
    setSelectedRowKeys,
    getRowSelectionRef,
    clearSelectedRowKeys,
  };
}
