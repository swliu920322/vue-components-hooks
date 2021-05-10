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
    modalMethods: {
      openModal: () => getFormModalInstance().modalMethods.openModal(),
      closeModal: () => getFormModalInstance().modalMethods.closeModal(),
      setOk: (param: Fn) => getFormModalInstance().modalMethods.setOk(param),
      setCancel: (param?: Fn) => getFormModalInstance().modalMethods.setCancel(param),
      openLoading: () => getFormModalInstance().modalMethods.openLoading(),
      closeLoading: () => getFormModalInstance().modalMethods.closeLoading(),
    },
    formMethods: {
      validate: () => getFormModalInstance().formMethods.validate(),
      resetFields: () => getFormModalInstance().formMethods.resetFields(),
      clearValidate: () => getFormModalInstance().formMethods.clearValidate(),
      scrollToField: (name, options) => getFormModalInstance().formMethods.scrollToField(name, options),
    },
  };
  return [register, methods];
}
