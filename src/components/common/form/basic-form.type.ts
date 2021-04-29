import { NamePath } from "ant-design-vue/lib/form/interface";
import { ICommonAction } from "@/components";

export interface IFormProps {
  size: "default" | "small" | "large";
  rules: {
    [props: string]: any[];
  };
  layout?: "vertical" | "inline" | "horizontal";
  col?: [number, number];
}

export interface IFormActions extends ICommonAction<IFormProps> {
  validate: () => Promise<boolean>;
  resetFields: () => void;
  clearValidate: () => void;
  scrollToField: (name: NamePath, options: any) => void;
}
