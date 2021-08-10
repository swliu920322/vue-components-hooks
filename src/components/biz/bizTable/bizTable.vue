<template>
  <BasicTable
    @register="register"
    @registerEnd="registerEnd"
    @pageChange="pageChange"
    :dataSource="getDataSourceRef"
    v-show="getDataSourceRef.length || loadingRef"
  >
    <template v-for="item in Object.keys($slots)" v-slot:[item]="data">
      <slot :name="item" v-bind="data" />
    </template>
  </BasicTable>
  <AEmpty v-show="!getDataSourceRef.length && !loadingRef" />
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watch, toRef, onUnmounted } from "vue";
  import { Empty } from "ant-design-vue";
  import { useBizData, useBizRemove } from "./hooks";
  import { BizTableProps } from "./bizTable.props";
  import { IBizTableActions, IBizTableProps } from "./bizTable.type";
  import { useTable, BasicTable } from "@/components/common/table";
  import { IPagination } from "../../../components";

  export default defineComponent({
    name: "bizTable",
    components: { BasicTable, AEmpty: Empty },
    props: BizTableProps,
    emits: ["register"],
    setup(props, { emit }) {
      const innerRef = ref<Partial<IBizTableProps>>({});
      const getPropsRef = computed(() => {
        const temp = {
          ...props,
          ...innerRef.value,
        };
        if (innerRef.value.dataSourceRef) {
          temp.dataSourceRef = toRef(innerRef.value, "dataSourceRef");
        }
        if (innerRef.value.paginationRef) {
          temp.paginationRef = toRef(innerRef.value, "paginationRef");
        }
        return temp as Partial<IBizTableProps>;
      });

      const [register, tableMethods] = useTable(getPropsRef.value);

      function registerEnd() {
        const watchStop = watch(
          () => unref(getPropsRef),
          (val) => {
            tableMethods.setProps({ pagination: tableMethods.getPagination() as IPagination, ...val });
          },
          {
            immediate: true,
          }
        );
        onUnmounted(() => {
          watchStop && watchStop();
        });
      }

      function setProps(val: Partial<IBizTableProps>) {
        // @ts-ignore
        innerRef.value = { ...innerRef.value, ...val };
      }

      const { pageChange, rePageChange, getDataSourceRef } = useBizData(getPropsRef, tableMethods);

      const { removeItem, removeItemAuto, removeItems, removeItemsAuto } = useBizRemove(
        getPropsRef,
        tableMethods,
        pageChange
      );
      const IBizTableAction: IBizTableActions = {
        setProps,
        pageChange,
        rePageChange,
        removeItem,
        removeItemAuto,
        removeItems,
        removeItemsAuto,
        getDataSourceRef: () => computed(() => getDataSourceRef.value),

        basic: tableMethods,
      };
      emit("register", IBizTableAction);

      return {
        pageChange,
        getDataSourceRef,
        register,
        registerEnd,
        loadingRef: tableMethods.getLoading(),
      };
    },
  });
</script>

<style scoped></style>
