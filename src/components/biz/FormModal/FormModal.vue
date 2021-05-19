<template>
  <BasicModal @register="register" v-bind="$attrs.modal" :title="titleRef">
    <slot name="header" :model="model" :isAdd="isAddRef" />
    <BasicForm @register="registerForm" v-bind="$attrs.form" :model="model">
      <slot name="form" :model="model" :isAdd="isAddRef" />
    </BasicForm>
    <slot name="footer" :model="model" :isAdd="isAddRef" />
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, reactive, ref } from "vue";
  import {
    BasicModal,
    useModal,
    BasicForm,
    useForm,
    IFormModalActions,
    IFormModalProp,
  } from "../../../components";
  import { useModalFunc, useModalOpen } from "./hooks";

  export default defineComponent({
    name: "FormModal",
    components: { BasicForm, BasicModal },
    emits: ["register"],
    setup(props, { emit }) {
      const model = reactive<Record<string, any>>({});
      const innerRef = ref<Partial<IFormModalProp>>();

      const getPropsRef = computed(() => {
        return { ...props, ...innerRef.value } as Partial<IFormModalProp>;
      });

      const [register, modalMethods] = useModal({});
      const [registerForm, formMethods] = useForm({});

      const { isAddRef, openNew, openEdit, setModel, titleRef } = useModalOpen(
        getPropsRef,
        formMethods,
        modalMethods,
        model
      );
      const { cancelFunc, okFunc } = useModalFunc(
        getPropsRef,
        formMethods,
        modalMethods,
        model,
        setModel,
        isAddRef
      );
      async function setProps(props: Partial<IFormModalProp>) {
        await nextTick();
        innerRef.value = props;
        modalMethods.setOk(okFunc);
        if (getPropsRef.value.onCancel) {
          modalMethods.setCancel(cancelFunc);
        }
      }

      function openAddModal(param?: any) {
        const { openAddModal: openAdd } = getPropsRef.value;
        openAdd && openAdd(param);
      }
      function openEditModal(param: any) {
        const { openEditModal: openE } = getPropsRef.value;
        openE && openE(param);
      }

      const regFormModal: IFormModalActions = {
        modal: modalMethods,
        form: formMethods,
        getModelRef: () => computed(() => model),
        setModel,
        setProps,
        openNew,
        openEdit,
        openAddModal,
        openEditModal,
      };

      emit("register", regFormModal);

      return {
        register,
        registerForm,
        isAddRef,
        model,
        titleRef,
      };
    },
  });
</script>

<style scoped></style>
