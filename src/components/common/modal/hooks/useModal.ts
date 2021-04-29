import { IModalActions, IModalProps } from "../../modal/basic-modal.type";
import { ref, unref } from "vue";
import { Fn } from "../../../../types";

export default function useModal(
  props: Partial<IModalProps>
): [(props: IModalActions) => void, IModalActions] {
  const modalRef = ref<IModalActions>();

  function register(actions: IModalActions) {
    modalRef.value = actions;
    actions.setProps(props);
  }
  function getModalInstance() {
    if (!modalRef.value) {
      throw new Error("modal instance has not ready");
    }
    return unref(modalRef) as IModalActions;
  }
  const methods: IModalActions = {
    setProps: (props: Partial<IModalProps>) => {
      getModalInstance().setProps(props);
    },
    openModal: () => {
      return getModalInstance().openModal();
    },
    closeModal: () => {
      return getModalInstance().closeModal();
    },
    setOk: (param: Fn) => {
      getModalInstance().setOk(param);
    },
    setCancel: (param?: Fn) => {
      getModalInstance().setCancel(param);
    },
    openLoading: () => getModalInstance().openLoading(),
    closeLoading: () => getModalInstance().closeLoading(),
  };
  return [register, methods];
}
