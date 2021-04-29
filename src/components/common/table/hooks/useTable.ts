import { IBasicTableActions, IBasicTableProps } from "../basic-table.types";
import { ref } from "vue";

export const tableMethods = (getInstance: () => any): IBasicTableActions => ({
  setProps: (params) => getInstance()?.setProps(params),
  setPagination: (pagination) => getInstance()?.setPagination(pagination),
  getPagination: () => getInstance()?.getPagination(),
  getDataSource: () => getInstance()?.getDataSource(),
  setDataSource: (val) => getInstance()?.setDataSource(val),
  setLoading: (val) => getInstance()?.setLoading(val),
  setSelectedRowKeys: (rowKeys: string[]) => getInstance()?.setSelectedRowKeys(rowKeys),
  getSelectedRows: () => getInstance()?.getSelectedRows(),
  getSelectedRowKeys: () => getInstance()?.getSelectedRowKeys(),
  clearSelectedRowKeys: () => getInstance()?.clearSelectedRowKeys(),
});
export default function useTable(
  props: Partial<IBasicTableProps>
): [(actions: IBasicTableActions) => void, IBasicTableActions] {
  const tableRef = ref<IBasicTableActions>();
  function register(actions: IBasicTableActions) {
    tableRef.value = actions;
    actions.setProps(props);
  }
  function getInstance() {
    if (!tableRef.value) {
      throw new Error("table has not instance,");
    }
    return tableRef.value;
  }

  return [register, tableMethods(getInstance)];
}