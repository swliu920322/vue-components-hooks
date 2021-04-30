<template>
  <div class="home" style="height: 100%; overflow: hidden">
    <BizTable @register="register">
      <template v-slot:actions>
        <IconButton icon edit link>编辑</IconButton>
        <IconButton icon remove link>删除</IconButton>
      </template>
    </BizTable>
    <FormModal @regitser="registerForm">
      <a-form-item></a-form-item>
      <a-form-item></a-form-item>
    </FormModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { BizTable, IconButton, useBizTable, useFormModal } from "@/components";
  import FormModal from "@/components/biz/FormModal/FormModal.vue";

  export default defineComponent({
    name: "Home",
    components: { FormModal, IconButton, BizTable },
    setup() {
      const [register, tMethod] = useBizTable({
        columns: [
          { title: "名称", dataIndex: "name" },
          { title: "年龄", dataIndex: "age", width: 100 },
          { title: "操作", width: 160, slots: { customRender: "actions" } },
        ],
        queryFunc: (i) =>
          Promise.resolve({
            itemsList: Array.from({ length: 20 }, (i, index) => ({
              name: "name" + index,
              age: "age" + index,
              id: index + 1,
            })),
            pageResult: {
              rowCount: 20,
            },
          }),
      });
      const [registerForm, m] = useFormModal({
        pageChange: tMethod.pageChange,
      });
      return {
        register,
      };
    },
  });
</script>
