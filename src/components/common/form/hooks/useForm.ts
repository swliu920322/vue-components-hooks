import { ref, unref } from "vue";
import { IFormActions, IFormProps } from "../../../../components";

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
    setProps: (props) => {
      getFormInstance()?.setProps(props);
    },
    validate: () => {
      return getFormInstance().validate();
    },
    resetFields: () => {
      getFormInstance().resetFields();
    },
    clearValidate: () => {
      getFormInstance().clearValidate();
    },
    scrollToField: (name, options) => {
      getFormInstance().scrollToField(name, options);
    },
  };
  return [register, methods];
}
