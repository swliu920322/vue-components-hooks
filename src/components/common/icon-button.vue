<template>
  <a-button v-bind="getRef" class="icon-button">
    <template #icon v-if="icon">
      <PlusOutlined v-if="add" />
      <SearchOutlined v-if="search" />
      <DeleteOutlined v-if="remove" />
      <FormOutlined v-if="edit" />
      <DownloadOutlined v-if="download" />
      <UploadOutlined v-if="upload" />
      <UndoOutlined v-if="reset" />
      <PrinterOutlined v-if="print" />
      <IdcardOutlined v-if="idCard" />
      <ExportOutlined v-if="publish" />
      <FileSearchOutlined v-if="detail" />
    </template>
    <slot name="customIcon" />
    <slot />
  </a-button>
</template>
<script lang="ts">
  import { computed, defineComponent } from "vue";
  import {
    SearchOutlined,
    DeleteOutlined,
    PlusOutlined,
    UndoOutlined,
    FormOutlined,
    DownloadOutlined,
    UploadOutlined,
    PrinterOutlined,
    IdcardOutlined,
    ExportOutlined,
    FileSearchOutlined,
  } from "@ant-design/icons-vue";
  export default defineComponent({
    name: "IconButton",
    components: {
      FileSearchOutlined,
      ExportOutlined,
      IdcardOutlined,
      PrinterOutlined,
      SearchOutlined,
      DeleteOutlined,
      PlusOutlined,
      UndoOutlined,
      FormOutlined,
      DownloadOutlined,
      UploadOutlined,
    },
    props: {
      add: Boolean,
      edit: Boolean,
      remove: Boolean,
      search: Boolean,
      upload: Boolean,
      reset: Boolean,
      download: Boolean,
      idCard: Boolean,
      print: Boolean,
      publish: Boolean,
      detail: Boolean,

      icon: Boolean,

      primary: Boolean,
      link: Boolean,
      danger: Boolean,
    },
    setup(props) {
      let type = "";
      switch (true) {
        case props.primary:
          type = "primary";
          break;
        case props.danger:
          type = "danger";
          break;
        case props.link:
          type = "link";
          break;
        default:
          break;
      }
      const getRef = computed(() => {
        return {
          type: type === "" ? undefined : type,
        };
      });
      return {
        getRef,
      };
    },
  });
</script>

<style scoped>
  .ant-btn.ant-btn-link + .ant-btn.ant-btn-link.icon-button::before {
    height: 50%;
    content: "";
    background: transparent;
    border-radius: 0;
    display: inline-block;
    margin: auto;
    border-left: 1px solid #606266;
  }
</style>
