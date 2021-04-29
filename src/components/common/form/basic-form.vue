<template>
  <a-form ref="formRef" v-bind="getBindRef">
    <slot />
  </a-form>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from "vue";
  import { IFormActions, IFormProps } from "@/components";
  import { useCols } from "./hooks";

  export default defineComponent({
    name: "basic-form",
    inheritAttrs: false,
    emits: ["register"],
    setup(props, { attrs, emit }) {
      const formRef = ref<any>();
      const innerRef = ref<any>();
      const getProps = computed(() => {
        return {
          ...props,
          ...unref(innerRef),
        } as Partial<IFormProps>;
      });
      const setProps = (value: Partial<IFormProps>) => {
        innerRef.value = {
          ...innerRef.value,
          ...value,
        };
      };
      const { getColRef } = useCols(getProps);
      const getBindRef = computed(() => {
        return {
          ...props,
          ...attrs,
          ...unref(getProps),
          labelCol: unref(getColRef).labelCol,
          wrapperCol: unref(getColRef).wrapperCol,
        };
      });
      const getSizeRef = computed(() => {
        return {
          size: unref(getProps).size || "default",
        };
      });
      const formAction: IFormActions = {
        setProps,
        validate: () => formRef.value.validate(),
        resetFields: () => formRef.value.resetFields(),
        clearValidate: () => formRef.value.clearValidate(),
        scrollToField: (name, options) => formRef.value.scrollToField(name, options),
      };
      emit("register", formAction);
      return {
        getBindRef,
        formRef,
        getSizeRef,
      };
    },
  });
</script>
