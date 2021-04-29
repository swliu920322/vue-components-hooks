import axios from "axios";
const fileUrl = "http://27.115.33.30:5006";
localStorage.setItem("NYJ_FILE_URL", fileUrl);
const filePath = localStorage.getItem("NYJ_FILE_URL") || "";

axios.defaults.baseURL = filePath;

export class FileService {
  static uploadFile(data: any): Promise<string[]> {
    return axios.post("/Files/Upload", data).then((r) => r.data);
  }
  static getFile(id?: any): string {
    if (id && id !== "0") {
      return filePath + `/Files/${id}`;
    }
    return "";
  }
  static downloadFile(id?: number) {
    if (id) {
      return axios.get(`/Files/${id}/Download`);
    }
  }
}
