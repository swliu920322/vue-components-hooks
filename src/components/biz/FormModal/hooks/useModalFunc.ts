import { message } from "ant-design-vue";
import { ComputedRef, UnwrapRef, unref, Ref } from "vue";
import { IFormActions, IFormModalProp, IModalActions } from "../../../../components";

export default function useModalFunc(
  getPropsRef: ComputedRef<Partial<IFormModalProp>>,
  methods: IFormActions,
  modalMethods: IModalActions,
  model: UnwrapRef<Record<string, any>>,
  setModel: (val: Record<string, any>) => void,
  isAddRef: Ref<boolean>
) {
  function sucMsg(type: string) {
    const { title } = getPropsRef.value;
    if (typeof title === "function") {
      message.success(title(isAddRef.value, model) + "成功！");
    } else {
      message.success(title + `${type}成功！`);
    }
  }
  async function okFunc() {
    const {
      onOk,
      onAdd,
      onEdit,
      commonMap,
      addMap,
      editMap,
      afterAdd,
      afterEdit,
      pageChange,
      rePageChange,
    } = unref(getPropsRef);
    try {
      await methods.validate();
      Reflect.deleteProperty(model, "isTrusted");
      commonMap && setModel(await commonMap(model));
      if (onOk) {
        await onOk(model);
      } else {
        if (onAdd && model.id === undefined) {
          addMap && setModel(await addMap(model));
          const res = await onAdd(model);
          if (afterAdd) {
            await afterAdd(model, res);
          } else {
            sucMsg("新增");
            if (rePageChange) {
              await rePageChange();
            } else if (pageChange) {
              await pageChange({ pageSize: 1 });
            }
          }
        }
        if (onEdit && model.id !== undefined) {
          editMap && setModel(await editMap(model));
          const res = await onEdit(model);
          if (afterEdit) {
            await afterEdit(model, res);
          } else {
            sucMsg("修改");
            pageChange && (await pageChange());
          }
        }
      }
      await modalMethods.closeModal();
    } catch (e) {
      modalMethods.closeLoading();
    }
  }
  async function cancelFunc() {
    const { onCancel } = unref(getPropsRef);
    onCancel && (await onCancel());
    await modalMethods.closeModal();
  }

  return {
    cancelFunc,
    okFunc,
  };
}
