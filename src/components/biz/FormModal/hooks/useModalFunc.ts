import { message } from "ant-design-vue";
import { ComputedRef, UnwrapRef, unref } from "vue";
import { IFormActions, IFormModalProp, IModalActions } from "../../../../components";

export default function useModalFunc(
  getPropsRef: ComputedRef<Partial<IFormModalProp>>,
  methods: IFormActions,
  modalMethods: IModalActions,
  model: UnwrapRef<Record<string, any>>
) {
  async function okFunc() {
    const { onOk, onAdd, onEdit } = unref(getPropsRef);
    try {
      await methods.validate();
      Reflect.deleteProperty(model, "isTrusted");
      if (onOk) {
        await onOk(model);
      } else {
        if (onAdd && model.id === undefined) {
          await onAdd(model);
        }
        if (onEdit && model.id !== undefined) {
          await onEdit(model);
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
