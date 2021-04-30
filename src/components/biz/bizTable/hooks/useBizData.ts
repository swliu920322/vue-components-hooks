import { computed, ComputedRef, onMounted, ref, unref } from "vue";
import { IPagination, IBizTableProps, IBasicTableActions } from "../../../../components";

export default function useBizData(
  getPropsRef: ComputedRef<Partial<IBizTableProps>>,
  tableMethods: IBasicTableActions
) {
  const dataSource = ref<any[]>([]);

  async function pageChange(obj?: { current?: number; pageSize?: number }) {
    tableMethods.setLoading(true);
    try {
      const page = tableMethods.getPagination() as IPagination;
      if (obj?.current) {
        page.current = obj.current;
      }
      if (obj?.pageSize) {
        page.pageSize = obj.pageSize;
      }
      const { queryFunc, queryFuncMap, querySideEffect, resultConfigMap } = unref(getPropsRef);
      if (queryFunc) {
        const res: any = await queryFunc({
          pageRequest: {
            page: page.current,
            pageSize: page.pageSize,
          },
          orderRequest: {
            orderBy: "",
            descending: false,
          },
        });
        // resultConfigMap undefined,直接返回值，不分页
        if (resultConfigMap === undefined) {
          dataSource.value = res;
          return;
        }
        const { total, data } = resultConfigMap(res);
        dataSource.value = queryFuncMap ? data.map(queryFuncMap) : data;
        if (querySideEffect && typeof querySideEffect === "function") {
          querySideEffect(computed(() => dataSource.value).value);
        }

        tableMethods.setPagination({ ...page, total });
        tableMethods.setLoading(false);
      } else {
        tableMethods.setLoading(false);
      }
    } catch (e) {
      console.log(e);
      tableMethods.setLoading(false);
    }
  }

  async function rePageChange() {
    await pageChange({ current: 1 });
  }

  onMounted(async () => {
    if (getPropsRef.value.mounted) {
      await rePageChange();
    }
  });
  return {
    pageChange,
    rePageChange,
    getDataSourceRef: computed(() => dataSource.value),
  };
}
