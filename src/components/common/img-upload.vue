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
      <div class="ant-upload-text">{{ text }}</div>
    </div>
  </a-upload>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import { message } from "ant-design-vue";
  import { PlusOutlined } from "@ant-design/icons-vue";
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

  function getArrayBuffer(img: Blob, callback: (base64Url: ArrayBuffer) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as ArrayBuffer));
    reader.readAsArrayBuffer(img);
  }

  export default defineComponent({
    name: "img-upload",
    components: { PlusOutlined },
    props: {
      text: {
        type: String,
        default: "点击上传",
      },
      url: {
        type: String,
        default: "",
      },
    },
    setup(props) {
      // 正要上传
      const hasUpload = ref<boolean>(false);

      const fileList = ref<any[]>([]);
      const imageUrl = ref<string>(props.url ?? "");
      const imageBuffer = ref<ArrayBuffer>();

      function get_image(arr_buffer: ArrayBuffer) {
        const uInt8Array = new Uint8Array(arr_buffer);
        let i = uInt8Array.length;
        const binaryString = new Array(i);
        while (i--) {
          binaryString[i] = String.fromCharCode(uInt8Array[i]);
        }
        const data = binaryString.join("");
        return "data:image/png;base64," + window.btoa(data);
      }

      const handleChange = (info: FileInfo) => {
        getArrayBuffer(info.file.originFileObj, (arrayBuffer) => {
          imageBuffer.value = arrayBuffer;
          imageUrl.value = get_image(arrayBuffer);
        });
        fileList.value = info.fileList.slice(-1);
        hasUpload.value = true;
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
        imageUrl.value = path ? "data:image/png;base64," + path : "";
        fileList.value = [];
        hasUpload.value = false;
      }

      function setImgPathSite(path?: string) {
        imageUrl.value = path ?? "";
        fileList.value = [];
        hasUpload.value = false;
      }

      function upload() {
        if (!hasUpload.value || fileList.value.length === 0) {
          return "";
        }
        return new Uint8Array(imageBuffer.value as ArrayBuffer);
        // const formDate = new FormData();
        // formDate.append("files", fileList.value[0].originFileObj);
        // const res = await FileService.uploadFile(formDate);
        // return res[0];
      }
      function uploadContent() {
        if (!hasUpload.value || fileList.value.length === 0) {
          return;
        }

        return {
          fileInfo: {
            url: "",
            fid: "",
            name: fileList.value[0].name,
            size: fileList.value[0].size,
          },
          content: new Uint8Array(imageBuffer.value as ArrayBuffer),
        };
      }

      return {
        fileList,
        imageUrl,
        beforeUpload,
        handleChange,
        setImgPath,
        setImgPathSite,
        upload,
        uploadContent,
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
