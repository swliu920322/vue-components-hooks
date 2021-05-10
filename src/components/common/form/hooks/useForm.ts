import { ref, unref } from "vue";
import { IFormActions, IFormProps } from "../../../../components";

export const getFormMethods = (getInstance: () => any): Omit<IFormActions, "setProps"> => {
  return {
    validate: () => getInstance().validate(),
    resetFields: () => getInstance().resetFields(),
    clearValidate: () => getInstance().clearValidate(),
    scrollToField: (name, options) => getInstance().scrollToField(name, options),
  };
};
export default function useForm(props: Partial<IFormProps>): [(actions: IFormActions) => void, IFormActions] {
  const formRef = ref<IFormActions>();
  function register(actions: IFormActions) {
    formRef.value = actions;
    actions.setProps(props);
  }
  function getFormInstance() {
    if (!formRef.value) {
      throw new Error("formInstance has not ready");
    }
    return unref(formRef) as IFormActions;
  }
  const methods: IFormActions = {
    setProps: (props) => getFormInstance()?.setProps(props),
    ...getFormMethods(getFormInstance),
  };
  return [register, methods];
}
