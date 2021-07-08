import { IBizTableProps, IBasicTableActions } from "../../../../components";
import { computed, ComputedRef, h, VNodeTypes } from "vue";
import { useMessage } from "../../../../hooks/useMessage";

export default function useBizRemove(
  getPropsRef: ComputedRef<Partial<IBizTableProps>>,
  tableMethods: IBasicTableActions,
  pageChange: () => Promise<void>
) {
  const { createConfirmDel, createMessage } = useMessage();

  const removedTitle = computed(() => {
    const { removeTitle } = getPropsRef.value;
    if (removeTitle) {
      if (typeof removeTitle === "string") {
        return `是否删除` + getPropsRef.value.removeTitle;
      }
      return removeTitle();
    }
    return "是否删除选项";
  });

  async function beforeRemoveRef() {
    const { removeBefore } = getPropsRef.value;
    return removeBefore && [true, undefined].includes(await removeBefore());
  }

  async function removeFunc(message: VNodeTypes, idsList: any[]) {
    if (getPropsRef.value.removeFunc) {
      if (typeof message === "string") {
        await createConfirmDel(
          h("div", [
            removedTitle.value,
            h(
              "span",
              {
                style: { color: "red" },
              },
              " " + message
            ),
            " 么",
          ])
        );
      } else {
        await createConfirmDel(message);
      }
      const res = await getPropsRef.value.removeFunc(idsList);
      if (res !== false) {
        const msg = getPropsRef.value.removeTitle !== "选项" ? getPropsRef.value.removeTitle : "";
        createMessage.success(`删除${msg}成功!`);
      }
    }
  }

  async function removeItem(record: any): Promise<boolean> {
    if (await beforeRemoveRef()) {
      let message;
      const { removeLabelFunc, rowKey } = getPropsRef.value;
      if (removeLabelFunc) {
        message = removeLabelFunc(record, false);
      } else {
        message = record.name;
      }
      await removeFunc(message, [record[rowKey || "id"]]);
      return true;
    }
    return false;
  }
  async function removeItemAuto(record: any) {
    const requested = await removeItem(record);
    requested && (await pageChange());
  }

  async function removeItems(): Promise<boolean> {
    if (await beforeRemoveRef()) {
      const { removeLabelFunc, removeCurrent } = getPropsRef.value;
      const idsList = removeCurrent
        ? tableMethods.getSelectedRowKeys()
        : tableMethods.getAllSelectedRowKeys();
      const rows = removeCurrent ? tableMethods.getSelectedRows() : tableMethods.getAllSelectedRows();
      if (idsList.length === 0) {
        createMessage.error(`请先勾选需要删除选项的复选框`);
        return false;
      }
      let message;
      if (removeLabelFunc) {
        message = rows.map((i) => removeLabelFunc(i, true));
      } else {
        message = rows.map((i) => i.name);
      }
      await removeFunc(message.join(" , "), idsList);
      tableMethods.clearSelectedRowKeys();
      return true;
    }
    return false;
  }
  async function removeItemsAuto() {
    const requested = await removeItems();
    requested && (await pageChange());
  }
  return {
    removeItem,
    removeItemAuto,
    removeItems,
    removeItemsAuto,
  };
}
