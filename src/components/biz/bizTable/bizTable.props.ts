import { PropType } from "vue";

export const BizTableProps = {
  queryFuncMap: {
    type: Function,
    default: null,
  },
  removeTitle: {
    type: String,
    default: "选项",
  },
  removeCurrent: {
    type: Boolean,
    default: false,
  },
  mounted: {
    type: Boolean,
    default: true,
  },
  resultConfigMap: {
    type: Function as PropType<(i?: any) => any>,
    default: (i: any) => ({
      total: i.pageResult.rowCount,
      data: i.itemsList,
    }),
  },
  removeBefore: {
    type: Function,
    default: () => undefined,
  },
};
