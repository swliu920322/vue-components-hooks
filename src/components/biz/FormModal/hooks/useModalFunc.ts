import { message } from "ant-design-vue";
import { ComputedRef, UnwrapRef, unref } from "vue";
import { IFormActions, IFormModalProp, IModalActions } from "../../../../components";

export default function useModalFunc(
  getPropsRef: ComputedRef<Partial<IFormModalProp>>,
  methods: IFormActions,
  modalMethods: IModalActions,
  model: UnwrapRef<Record<string, any>>,
  setModel: (val: Record<string, any>) => void
) {
  async function okFunc() {
    const {
      onOk,
      onAdd,
      onEdit,
      commonMap,
      addMap,
      editMap,
      title,
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
          } else if (commonMap || addMap) {
            message.success(title + "新增成功！");
            rePageChange && (await rePageChange());
          }
        }
        if (onEdit && model.id !== undefined) {
          editMap && setModel(await editMap(model));
          const res = await onEdit(model);
          if (afterEdit) {
            await afterEdit(model, res);
          } else if (commonMap || editMap) {
            message.success(title + "修改成功！");
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
