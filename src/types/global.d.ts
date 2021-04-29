declare interface Fn<T = any> {
  (...arg: T[]): T;
}

declare type Nullable<T> = T | null;

declare type EmitType = (event: any, ...args: any[]) => void;

declare interface IOption<T = string> {
  label: string;
  value: T;
}
declare type Recordable<T extends any = any> = Record<string, T>;

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare interface IRule {
  [key: string]: {
    message: string;
    required?: boolean;
    [attr: string]: any;
  }[];
}

declare interface IFormRef<T = IObj> {
  validate: () => Promise<T>;
  resetFields: () => void;
}

declare interface IObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}
