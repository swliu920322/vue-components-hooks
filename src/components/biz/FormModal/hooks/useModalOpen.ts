import { computed, ComputedRef, ref, unref, UnwrapRef, watch } from "vue";
import { IObj } from "../../../../types";
import { IFormActions, IFormModalProp, IModalActions } from "../../../../components";

export default function useModalOpen(
  getPropsRef: ComputedRef<Partial<IFormModalProp>>,
  methods: IFormActions,
  modalMethods: IModalActions,
  model: UnwrapRef<Record<string, any>>
) {
  const isAddRef = ref<boolean>(false);
  function setModel(val: Record<string, any>) {
    Object.entries(val).forEach(([key, value]) => {
      model[key] = value;
    });
  }

  async function openFunc() {
    await modalMethods.openModal();
    methods.resetFields();
    methods.setProps(getPropsRef.value);
  }

  async function openNew(initial?: IObj) {
    await openFunc();
    isAddRef.value = true;
    model.id = undefined;
    if (initial) {
      setModel(initial);
    }
  }
  async function openEdit(initial: IObj) {
    await openFunc();
    isAddRef.value = false;
    setModel(initial);
  }

  watch(
    () => getPropsRef.value.initModel,
    (val) => {
      if (val) {
        const res: IObj = typeof val === "object" ? val : val();
        setModel(res);
      }
    }
  );

  const titleRef = computed(() => {
    const { title } = unref(getPropsRef);
    if (title) {
      if (typeof title === "string") {
        return (isAddRef.value ? "新增" : "修改") + title;
      }
      return title(isAddRef.value, model);
    }
    return undefined;
  });

  return {
    isAddRef: computed(() => unref(isAddRef)),
    titleRef,
    openEdit,
    openNew,
    setModel,
  };
}
