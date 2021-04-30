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
    const { onOk, onAdd, onEdit, commonMap, addMap, editMap, title, pageChange } = unref(getPropsRef);
    try {
      await methods.validate();
      Reflect.deleteProperty(model, "isTrusted");
      commonMap && setModel(await commonMap(model));
      if (onOk) {
        await onOk(model);
      } else {
        if (onAdd && model.id === undefined) {
          addMap && setModel(await addMap(model));
          await onAdd(model);
          message.success(title + "新增成功！");
          pageChange && (await pageChange());
        }
        if (onEdit && model.id !== undefined) {
          editMap && setModel(await editMap(model));
          await onEdit(model);
          message.success(title + "修改成功！");
          pageChange && (await pageChange());
        }
      }
      await modalMethods.closeModal();
    } catch (e) {
      modalMethods.closeLoading();
      message.error(e.message);
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
