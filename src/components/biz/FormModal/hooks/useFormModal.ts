import { IFormModalActions, IFormModalProp } from "../../../../components";
import { ref, unref } from "vue";
import { Fn } from "@/types";

export default function useFormModal(
  props: Partial<IFormModalProp>
): [(actions: IFormModalActions) => void, IFormModalActions] {
  const formModalRef = ref<IFormModalActions>();

  function register(actions: IFormModalActions) {
    formModalRef.value = actions;
    actions.setProps(props);
  }

  function getFormModalInstance() {
    if (!formModalRef.value) {
      throw new Error("modal instance has not ready");
    }
    return unref(formModalRef) as IFormModalActions;
  }

  const methods: IFormModalActions = {
    openNew: (i) => getFormModalInstance().openNew(i),
    openEdit: (i) => getFormModalInstance().openEdit(i),
    setProps: (props) => getFormModalInstance().setProps(props),
    setModel: (val) => getFormModalInstance().setModel(val),
    getModelRef: () => getFormModalInstance().getModelRef(),
    openAddModal: (param) => getFormModalInstance().openAddModal(param),
    openEditModal: (param) => getFormModalInstance().openEditModal(param),

    openModal: () => getFormModalInstance().openModal(),
    closeModal: () => getFormModalInstance().closeModal(),
    setOk: (param: Fn) => getFormModalInstance().setOk(param),
    setCancel: (param?: Fn) => getFormModalInstance().setCancel(param),
    openLoading: () => getFormModalInstance().openLoading(),
    closeLoading: () => getFormModalInstance().closeLoading(),

    validate: () => getFormModalInstance().validate(),
    resetFields: () => getFormModalInstance().resetFields(),
    clearValidate: () => getFormModalInstance().clearValidate(),
    scrollToField: (name, options) => getFormModalInstance().scrollToField(name, options),
  };
  return [register, methods];
}
