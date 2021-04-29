import { IBizTableActions, IBizTableProps } from "../../../../components";
import { ref } from "vue";
import { tableMethods } from "../../../common/table/hooks";

export default function useBizTable(
  props: Partial<IBizTableProps>
): [(actions: IBizTableActions) => void, IBizTableActions] {
  const actionRef = ref<IBizTableActions>();
  function register(actions: IBizTableActions) {
    actionRef.value = actions;
    actions.setProps(props);
  }
  function getInstance() {
    if (!actionRef.value) {
      throw new Error("biz table has no instance");
    }
    return actionRef.value;
  }
  const actions: IBizTableActions = {
    ...tableMethods(getInstance),
    pageChange: (arg) => getInstance()?.pageChange(arg),
    rePageChange: () => getInstance()?.pageChange(),
    removeItem: (item: any) => getInstance()?.removeItem(item),
    removeItemAuto: (item: any) => getInstance()?.removeItemAuto(item),
    removeItems: () => getInstance()?.removeItems(),
    removeItemsAuto: () => getInstance()?.removeItemsAuto(),
    getDataSourceRef: () => getInstance()?.getDataSourceRef(),
  };
  return [register, actions];
}
