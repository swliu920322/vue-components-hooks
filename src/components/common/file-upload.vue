<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    accept=".xlsx"
    :multiple="true"
    :action="null"
    :before-upload="() => false"
    :customRequest="() => {}"
    @change="handleChange"
  >
    <a-button>
      <UploadOutlined />
      <span class="ant-upload-text">上传</span>
    </a-button>
  </a-upload>
</template>

<script lang="ts">
  import { importFile } from "../../utils/xlsx";
  import { useMessage } from "../../hooks/useMessage";
  import { UploadOutlined } from "@ant-design/icons-vue";
  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    [key: string]: any;
  }

  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  import { defineComponent, ref } from "vue";

  export default defineComponent({
    name: "file-upload",
    components: { UploadOutlined },
    setup() {
      const fileList = ref<FileItem[]>([]);
      const { createMessage } = useMessage();
      const handleChange = (info: FileInfo) => {
        if (info.fileList.length > 1) {
          createMessage.error("暂时只能读一个excel文件");
        }
        fileList.value = info.fileList.slice(-1);
      };

      async function parseExcel() {
        if (fileList.value.length) {
          const file = fileList.value[0];
          if (file && file.originFileObj) {
            return await importFile(file.originFileObj);
          }
        } else {
          createMessage.error("您还没有上传文件，请检查!");
        }
      }
      function clearFile() {
        fileList.value = [];
      }
      return {
        fileList,
        handleChange,
        parseExcel,
        clearFile,
      };
    },
  });
</script>

<style scoped lang="less"></style>
