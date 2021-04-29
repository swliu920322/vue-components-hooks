import { ComputedRef, ref, unref, watch } from "vue";
import { IBasicTableProps } from "../basic-table.types";
import { IObj } from "../../../../types";

export default function useTableStyle(propsRef: ComputedRef<Partial<IBasicTableProps>>) {
  function getRowClassName(record: IObj, index: number) {
    const { striped } = unref(propsRef);
    if (striped && (index || 0) % 2 === 1) {
      return "ao-row__striped";
    }
    return "";
  }
  const stripedColor = ref<string>(propsRef.value.striped || "#fafafa");
  watch(
    () => propsRef.value.striped,
    (val) => {
      if (val) {
        stripedColor.value = val;
      }
    }
  );
  return {
    getStripedColorRef: stripedColor,
    setStripedColor: (val: string) => (stripedColor.value = val),
    getRowClassName,
  };
}
