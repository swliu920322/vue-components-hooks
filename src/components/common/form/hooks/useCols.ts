import { IFormProps } from "@/components";
import { computed, ref, Ref, unref, watch } from "vue";

export default function useCols(propsRef: Ref<Partial<IFormProps>>) {
  const colRef = ref<[number, number]>(propsRef.value.col || [6, 18]);
  function setCol(val: [number, number]) {
    colRef.value = val;
  }
  watch(
    () => unref(propsRef).col,
    (val) => {
      val && setCol(val);
    }
  );
  const getColRef = computed(() => {
    if (propsRef.value.layout === "inline") {
      return {
        labelCol: undefined,
        wrapperCol: undefined,
      };
    }

    const [label, wrapper] = unref(colRef);
    const labelCol = { span: unref(colRef)[0] };
    const wrapperCol = { span: unref(colRef)[1] };
    const all = label + wrapper;
    if (24 % all === 0) {
      const ratio = 24 / all;
      labelCol.span = ratio * label;
      wrapperCol.span = ratio * wrapper;
    }
    return {
      labelCol,
      wrapperCol,
    };
  });
  return {
    setCol,
    getColRef,
  };
}
