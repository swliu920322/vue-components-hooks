<template>
  <BasicModal @register="register" v-bind="$attrs.modal" :title="titleRef">
    <BasicForm @register="registerForm" v-bind="$attrs.form" :model="model">
      <slot name="form" :model="model" :isAdd="isAddRef" />
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, reactive, ref, unref, watch } from "vue";
  import {
    BasicModal,
    useModal,
    BasicForm,
    useForm,
    IFormModalActions,
    IFormModalProp,
  } from "../../../components";
  import { message } from "ant-design-vue";

  export default defineComponent({
    name: "FormModal",
    components: { BasicForm, BasicModal },
    emits: ["register"],
    setup(props, { emit }) {
      const model = reactive<Record<string, any>>({});
      const innerRef = ref<Partial<IFormModalProp>>();
      const isAddRef = ref<boolean>(false);

      const getPropsRef = computed(() => {
        return { ...props, ...innerRef.value } as Partial<IFormModalProp>;
      });

      const [register, modalMethods] = useModal({});
      const [registerForm, methods] = useForm({});

      function assignReactive(val: Record<string, any>) {
        Object.entries(val).forEach(([key, value]) => {
          model[key] = value;
        });
      }

      watch(
        () => getPropsRef.value.initModel,
        (val) => {
          if (val) {
            let res: IObj = typeof val === "object" ? val : val();
            assignReactive(res);
          }
        }
      );
      async function setProps(props: Partial<IFormModalProp>) {
        await nextTick();
        innerRef.value = props;
        modalMethods.setOk(async () => {
          try {
            await methods.validate();
            Reflect.deleteProperty(model, "isTrusted");
            if (props.onOk) {
              await props.onOk(model);
            } else {
              if (props.onAdd && model.id === undefined) {
                await props.onAdd(model);
              }
              if (props.onEdit && model.id !== undefined) {
                await props.onEdit(model);
              }
            }
            await modalMethods.closeModal();
          } catch (e) {
            modalMethods.closeLoading();
            message.error(e.message);
          }
        });
        if (props.onCancel) {
          modalMethods.setCancel(async () => {
            if (props.onCancel) {
              await props.onCancel();
            }
            await modalMethods.closeModal();
          });
        }
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
          assignReactive(initial);
        }
      }
      async function openEdit(initial: IObj) {
        await openFunc();
        isAddRef.value = false;
        assignReactive(initial);
      }

      function openAddModal() {
        const { openAddModal: openAdd } = getPropsRef.value;
        if (openAdd) {
          openAdd();
        }
      }
      function openEditModal(param: any) {
        const { openEditModal: openE } = getPropsRef.value;
        if (openE) {
          openE(param);
        }
      }
      const regFormModal: IFormModalActions = {
        getModelRef: () => computed(() => model),
        setModel: assignReactive,
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
        titleRef: computed(() => {
          const { title } = unref(getPropsRef);
          if (title) {
            if (typeof title === "string") {
              return (isAddRef.value ? "新增" : "修改") + title;
            }
            return title(isAddRef.value, model);
          }
          return undefined;
        }),
      };
    },
  });
</script>

<style scoped lang="less"></style>
