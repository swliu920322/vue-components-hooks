<template>
  <a-upload
    :file-list="fileList"
    name="avatar"
    list-type="picture-card"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :action="null"
    :customRequest="() => {}"
    @change="handleChange"
  >
    <img v-if="imageUrl" class="img-view" :src="imageUrl" alt="avatar" />
    <div v-else>
      <PlusOutlined />
      <div class="ant-upload-text">点击上传</div>
    </div>
  </a-upload>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { message } from "ant-design-vue";
  import { FileService } from "../../apis/file";
  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: string;
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
  }

  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }

  export default defineComponent({
    name: "img-upload",
    setup() {
      const hasId = ref<boolean>(false);

      const fileList = ref<any[]>([]);
      const imageUrl = ref<string>("");
      const handleChange = (info: FileInfo) => {
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url;
        });
        fileList.value = info.fileList.slice(-1);
        hasId.value = false;
      };

      const beforeUpload = (file: FileItem) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("You can only upload JPG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("图片必须小于 2MB!");
        }
        return isJpgOrPng && isLt2M;
      };

      function setImgPath(path?: string) {
        imageUrl.value = path || "";
        fileList.value = [];
        hasId.value = true;
      }

      async function upload() {
        if (hasId.value || fileList.value.length === 0) {
          return "0";
        }
        const formDate = new FormData();
        formDate.append("files", fileList.value[0].originFileObj);
        const res = await FileService.uploadFile(formDate);
        return res[0];
      }
      return {
        fileList,
        imageUrl,
        beforeUpload,
        handleChange,
        setImgPath,
        upload,
      };
    },
  });
</script>

<style scoped>
  .img-view {
    max-width: 100%;
    max-height: 86px;
  }
</style>
