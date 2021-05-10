import { IModalActions, IModalProps } from "../../modal/basic-modal.type";
import { ref, unref } from "vue";
import { Fn } from "../../../../types";

export const getModalMethods = (getInstance: () => any): Omit<IModalActions, "setProps"> => {
  return {
    openModal: () => getInstance().openModal(),
    closeModal: () => getInstance().closeModal(),
    setOk: (param: Fn) => getInstance().setOk(param),
    setCancel: (param?: Fn) => getInstance().setCancel(param),
    openLoading: () => getInstance().openLoading(),
    closeLoading: () => getInstance().closeLoading(),
  };
};
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

  const modalMethods: IModalActions = {
    setProps: (props: Partial<IModalProps>) => getModalInstance().setProps(props),
    ...getModalMethods(getModalInstance),
  };
  return [register, modalMethods];
}
