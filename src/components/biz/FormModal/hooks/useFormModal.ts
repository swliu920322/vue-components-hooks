import { IFormModalActions, IFormModalProp } from "../../../../components";
import { ref, unref } from "vue";

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
    openAddModal: () => getFormModalInstance().openAddModal(),
    openEditModal: (param) => getFormModalInstance().openEditModal(param),
  };
  return [register, methods];
}
