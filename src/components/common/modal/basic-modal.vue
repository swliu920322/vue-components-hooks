<template>
  <AModal v-bind="getBind"> <slot /></AModal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from "vue";
  import { IModalActions, IModalProps } from "../../../components";
  import { basicModalProps } from "./basic-model.props";
  import { useVisible } from "./hooks";
  import { IObj } from "../../../types";
  import { once } from "../../../utils";
  export default defineComponent({
    name: "basic-modal",
    props: basicModalProps,
    setup(props, { attrs, emit }) {
      const okLoading = ref<boolean>(false);
      const {
        openModal,
        closeModal,
        getVisibleRef,
        okFuncRef,
        setCancelFunc,
        setOkFunc,
        cancelFuncRef,
      } = useVisible();
      const innerRef = ref<Partial<IModalProps>>({});
      function openLoading() {
        okLoading.value = true;
      }
      function closeLoading() {
        okLoading.value = false;
      }
      const onOk = once(async () => {
        try {
          openLoading();
          await unref(okFuncRef)();
          closeLoading();
        } catch (e) {
          console.log(e);
          closeLoading();
        }
      });
      const getProps = computed(() => {
        return {
          ...props,
          ...attrs,
          onCancel: unref(cancelFuncRef),
          onOk,
          okButtonProps: attrs.okButtonProps,
          cancelButtonProps: attrs.cancelButtonProps,
          confirmLoading: unref(okLoading),
          ...unref(innerRef),
        };
      });
      function setProps(props: Partial<IModalProps>) {
        Object.entries(props).forEach(([key, value]: any) => {
          switch (key) {
            case "onCancel":
              return setCancelFunc(value);
            case "onOk":
              return setOkFunc(value);
            default:
              innerRef.value = { ...innerRef.value, [key]: value };
          }
        });
      }

      const getBind = computed(() => {
        return {
          ...unref(getProps),
          visible: unref(getVisibleRef),
        };
      });
      const actions: IModalActions = {
        setProps,
        openModal,
        closeModal,
        openLoading,
        closeLoading,
        setOk: setOkFunc,
        setCancel: setCancelFunc,
      };
      emit("register", actions);
      return {
        getBind,
      };
    },
  });
</script>

<style scoped lang="less"></style>
