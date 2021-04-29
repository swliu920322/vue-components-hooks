<template>
  <section ref="containerRef" style="height: 100%">
    <ATable
      ref="tableRef"
      v-bind="getBindRef"
      :rowClassName="(record, index) => (index % 2 === 1 ? null : 'table-striped')"
    >
      <template v-for="item in Object.keys($slots)" v-slot:[item]="data">
        <slot :name="item" v-bind="data" />
      </template>
    </ATable>
  </section>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from "vue";
  import { usePagination, IBasicTableActions, IBasicTableProps, useLoading } from "@/components";
  import { basicTableProps } from "./basic-table.props";
  import { useTableScroll, useColumns, useDataSource, useRowSelection, useTableStyle } from "./hooks";

  export default defineComponent({
    name: "basic-table",
    components: {},
    props: basicTableProps,
    emits: ["register", "pageChange", "registerEnd"],
    setup(props, { attrs, emit }) {
      const tableRef = ref();
      const containerRef = ref<HTMLDivElement>();

      const innerRef = ref<Partial<IBasicTableProps>>();
      const getPropsRef = computed(() => {
        return { ...props, ...unref(innerRef) } as Partial<IBasicTableProps>;
      });
      const { setPagination, getPaginationRef } = usePagination(emit);
      function setProps(props: Partial<IBasicTableProps>) {
        if (props.pagination !== undefined) {
          setPagination(props.pagination);
        }
        innerRef.value = { ...innerRef.value, ...props };
      }
      const { getColumnRef } = useColumns(getPropsRef, getPaginationRef);

      const { getRowClassName } = useTableStyle(getPropsRef);

      const { getDataSourceRef, setDataSource } = useDataSource(getPropsRef);
      watch(
        () => unref(getPropsRef).dataSource,
        (val) => {
          if (val) {
            setDataSource(val);
            nextTick(() => {
              getScrollHeight();
            });
          }
        }
      );
      const {
        getRowSelectionRef,
        setSelectedRowKeys,
        getSelectedRowKeys,
        getSelectedRows,
        clearSelectedRowKeys,
      } = useRowSelection(getPropsRef, getDataSourceRef, emit);
      // @ts-ignore
      const { getScrollRef, getScrollHeight } = useTableScroll(getPropsRef, {
        containerRef,
        getColumnRef,
        getPaginationRef,
        tableRef,
        getRowSelectionRef,
      });
      const { setLoading, getLoadingRef } = useLoading();
      const getBindRef = computed(() => {
        return {
          ...attrs,
          ...unref(getPropsRef),
          columns: unref(getColumnRef),
          pagination: unref(getPaginationRef),
          rowClassName: getRowClassName,
          scroll: {
            ...unref(getScrollRef),
            ...((attrs.scroll as { x: number; y: number }) ?? {}),
          },
          dataSource: unref(getDataSourceRef),
          rowSelection: unref(getRowSelectionRef),
          loading: (attrs.loading ?? false) || unref(getLoadingRef),
        };
      });
      onMounted(() => {
        nextTick(() => {
          watch(
            () => getBindRef.value.dataSource,
            () => {
              getScrollHeight();
            },
            {
              immediate: true,
            }
          );
        });
      });

      const actions: IBasicTableActions = {
        setProps,
        getDataSource: () => unref(getDataSourceRef),
        setDataSource,
        setPagination,
        setLoading,
        getPagination: () => unref(getPaginationRef),
        getSelectedRowKeys,
        getSelectedRows,
        setSelectedRowKeys,
        clearSelectedRowKeys,
      };
      emit("register", actions);
      emit("registerEnd");
      return {
        getBindRef,
        tableRef,
        containerRef,
      };
    },
  });
</script>

<style scoped>
  ::v-deep .ant-table .ant-table-thead > tr > th {
    font-weight: 600;
    background: #ededed;
  }
  ::v-deep .table-striped {
    background-color: #fafafa;
  }
  ::v-deep .ant-table .ant-btn.ant-btn-link.icon-button {
    padding: 0 0 0 8px;
    background: transparent;
    margin-right: 8px;
    height: 28px;
  }
  ::v-deep .ant-btn.ant-btn-link + .ant-btn.ant-btn-link.icon-button::before {
    height: 50%;
    content: "";
    background: transparent;
    border-radius: 0;
    display: inline-block;
    margin: auto;
    border-left: 1px solid #606266;
  }
</style>
