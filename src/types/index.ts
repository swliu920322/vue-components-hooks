export type Recordable<T extends any = any> = Record<string, T>;

export interface Fn<T = any> {
  (...arg: T[]): T;
}
export type EmitType = (event: any, ...args: any[]) => void;

export interface IObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}
