import XLSX from "xlsx";
import { Recordable } from "../types";

export const exportFile = (json: Recordable[], keyMap: Recordable = {}, title = "文档") => {
  const changeKey = (obj: Recordable) => {
    const res: Recordable = {};
    Object.keys(obj).forEach((key) => {
      if (keyMap[key]) {
        const { label, mapFunc } = keyMap[key];
        res[label] = mapFunc ? mapFunc(obj[key]) : obj[key];
      }
    });
    return res;
  };
  const ws = XLSX.utils.json_to_sheet(json.map(changeKey));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, title);
  XLSX.writeFile(wb, `${title}.xlsx`);
};

export const exportFileTemplate = (header = {}, title = "模板") => {
  const removeValue = (obj: Recordable) => {
    Object.keys(obj).forEach((key) => {
      obj[key] = "";
    });
  };
  removeValue(header);
  const ws = XLSX.utils.json_to_sheet([header]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, title);
  XLSX.writeFile(wb, `${title}.xlsx`);
};
export interface IExcelImport {
  data: any[];
  cols: { name: string; key: number }[];
}
export const importFile = (file: any): Promise<IExcelImport> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e?.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json<any>(ws, { header: 1 });
      const make_cols = (refstr: any) =>
        Array(XLSX.utils.decode_range(refstr).e.c + 1)
          .fill(0)
          .map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));
      const res: IExcelImport = {
        data,
        cols: make_cols(ws["!ref"]),
      };
      resolve(res);
    };
    reader.readAsBinaryString(file);
  });
};
