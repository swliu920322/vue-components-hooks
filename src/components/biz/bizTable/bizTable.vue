<template>
  <BasicTable
    @register="register"
    @registerEnd="registerEnd"
    @pageChange="pageChange"
    :dataSource="getDataSourceRef"
  >
    <template v-for="item in Object.keys($slots)" v-slot:[item]="data">
      <slot :name="item" v-bind="data" />
    </template>
  </BasicTable>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from "vue";
  import { BasicTable, useTable, IBizTableActions, IBizTableProps } from "../../../components";
  import { useBizData, useBizRemove } from "./hooks";
  import { BizTableProps } from "./bizTable.props";

  export default defineComponent({
    name: "bizTable",
    components: { BasicTable },
    props: BizTableProps,
    emits: ["register"],
    setup(props, { emit }) {
      const innerRef = ref<Partial<IBizTableProps>>({});
      const getPropsRef = computed(() => {
        return {
          ...props,
          ...innerRef.value,
        } as Partial<IBizTableProps>;
      });

      const [register, tableMethods] = useTable(getPropsRef.value);

      function registerEnd() {
        watch(
          () => unref(getPropsRef),
          (val) => {
            tableMethods.setProps(val);
          },
          {
            immediate: true,
          }
        );
      }

      function setProps(val: Partial<IBizTableProps>) {
        // @ts-ignore
        innerRef.value = { ...innerRef.value, ...val };
      }

      const { pageChange, rePageChange, getDataSourceRef } = useBizData(getPropsRef, tableMethods);

      const { removeItem, removeItemAuto, removeItems, removeItemsAuto } = useBizRemove(
        getPropsRef,
        tableMethods,
        rePageChange
      );
      const IBizTableAction: IBizTableActions = {
        ...tableMethods,
        setProps,
        pageChange,
        rePageChange,
        removeItem,
        removeItemAuto,
        removeItems,
        removeItemsAuto,
        getDataSourceRef: () => computed(() => getDataSourceRef.value),
      };
      emit("register", IBizTableAction);

      return {
        pageChange,
        getDataSourceRef,
        register,
        registerEnd,
      };
    },
  });
</script>

<style scoped></style>
