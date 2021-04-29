import { PropType } from "vue";
import { ITableRowSelection, SizeType } from "./basic-table.types";
import { IPagination } from "@/components";

export const basicTableProps = {
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  indexColumn: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: "序号",
  },
  bordered: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  indexColumnFixed: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  rowKey: {
    type: String as PropType<string>,
    default: "id",
  },
  rowSelection: {
    type: Object as PropType<ITableRowSelection | null>,
    default: null,
  },
  pagination: {
    type: Object as PropType<Partial<IPagination>>,
    default: () => ({}),
  },
  scrollX: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  scrollY: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  size: {
    type: String as PropType<SizeType>,
    default: "small",
  },
  striped: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: "#fafafa",
  },
} as const;
