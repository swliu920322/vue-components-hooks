import { NamePath } from "ant-design-vue/lib/form/interface";
import { ICommonAction } from "../../../components";

export interface IFormProps {
  // form尺寸, 默认default
  size: "default" | "small" | "large";
  // 校验条件，参考async-validator
  rules: {
    [props: string]: any[];
  };
  // 布局模式
  layout?: "vertical" | "inline" | "horizontal";
  // 标题和内容的比例，如果和不被24整除，则为自身值
  // 比如[1,3]能被24证书,实际为[8,16]
  // [8,13]不能被24证书，实际为[8,13]
  col?: [number, number];
}

export interface IFormActionsBase {
  // 手动校验的方法
  validate: () => Promise<boolean>;
  // 重置整个表单的方法
  resetFields: () => void;
  // 清空所有校验的方法
  clearValidate: () => void;
  // 滚动到对应的列的方法
  scrollToField: (name: NamePath, options: any) => void;
}
export interface IFormActions extends IFormActionsBase, ICommonAction<IFormProps> {}
