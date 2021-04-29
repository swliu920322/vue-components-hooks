export const BizTableProps = {
  queryFuncMap: {
    type: Function,
    default: null,
  },
  removeTitle: {
    type: String,
    default: "选项",
  },
  mounted: {
    type: Boolean,
    default: true,
  },
  resultConfig: {
    type: Object,
    default: () => ({
      pageConfig: "pageResult",
      resConfig: "itemsList",
    }),
  },
  removeBefore: {
    type: Function,
    default: () => undefined,
  },
};
