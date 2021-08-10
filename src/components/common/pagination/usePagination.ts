import { computed, ref, unref, watch } from "vue";
import { EmitType } from "../../../types";
export interface IPagination {
  total: number;
  current: number;
  pageSize: number;
  size: string;
  pageSizeOptions: string[];
  onChange?: (current: number, size: number) => void;
  onShowSizeChange?: (current: number, size: number) => void;
  showTotal: (total: number, range: [number, number]) => string;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  simple: boolean;
  showLessItems: boolean;
  hideOnSinglePage: boolean;
  disabled: boolean;
  defaultPageSize: number;
}
export function usePagination(emit: EmitType, initial?: Partial<IPagination>) {
  const basePagination = {
    total: 0,
    current: 1,
    pageSize: 20,
    defaultPageSize: 20,
    size: "default",
    pageSizeOptions: ["10", "20", "30", "40"],
    onChange: undefined,
    onShowSizeChange: undefined,
    showTotal: (total: number, range: number[]) => `第${range[0]}~${range[1]}条，共${total}条`,
    showSizeChanger: true,
    showQuickJumper: true,
    simple: false,
    showLessItems: false,
    hideOnSinglePage: false,
    disabled: false,
  };
  const paginationRef = ref<IPagination | boolean>({
    ...basePagination,
    ...(initial === undefined ? {} : initial),
  });
  function setPagination(val: Partial<IPagination> | boolean) {
    if (typeof val === "boolean") {
      paginationRef.value = val;
    } else {
      paginationRef.value = {
        ...(typeof paginationRef.value === "boolean" ? basePagination : paginationRef.value),
        ...val,
      };
    }
  }
  return {
    getPaginationRef: computed<boolean | IPagination>(() => {
      const val = unref(paginationRef);
      if (typeof val === "boolean") {
        return false;
      }
      if (val.onChange === undefined) {
        val.onChange = (current: number, pageSize: number) => {
          setPagination({ current, pageSize });
          emit("pageChange", { current, pageSize });
        };
      }
      if (val.onShowSizeChange === undefined) {
        val.onShowSizeChange = (current: number, pageSize: number) => {
          setPagination({ current, pageSize });
          emit("pageChange", { current, pageSize });
        };
      }
      return val;
    }),
    setPagination,
  };
}
