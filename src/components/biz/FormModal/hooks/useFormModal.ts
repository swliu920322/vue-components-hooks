import { IFormModalActions, IFormModalProp } from "../../../../components";
import { ref, unref } from "vue";
import { getFormMethods } from "../../../common/form/hooks/useForm";
import { getModalMethods } from "../../../common/modal/hooks/useModal";

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
    modal: getModalMethods(() => getFormModalInstance().modal),
    form: getFormMethods(() => getFormModalInstance().form),
  };
  return [register, methods];
}
