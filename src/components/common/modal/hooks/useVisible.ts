import { computed, nextTick, ref, unref } from "vue";

export default function useVisible() {
  const visible = ref<boolean>(false);
  const okFunc = ref<Fn>(() => {
    closeModal();
  });
  const cancelFunc = ref<Fn>(() => {
    closeModal();
  });
  function setOkFunc(ok: Fn) {
    okFunc.value = ok;
  }
  function setCancelFunc(cancel: Fn) {
    cancelFunc.value = cancel;
  }
  function openModal() {
    visible.value = true;
    return nextTick();
  }
  function closeModal() {
    visible.value = false;
    return nextTick();
  }
  return {
    openModal,
    closeModal,
    getVisibleRef: computed(() => visible.value),
    setOkFunc,
    okFuncRef: computed(() => {
      return unref(okFunc);
    }),
    cancelFuncRef: computed(() => unref(cancelFunc)),
    setCancelFunc,
  };
}
