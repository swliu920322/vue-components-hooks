import { IModalProps, IFormProps, ICommonAction } from "../../../components";
import { ComputedRef, VNodeTypes } from "vue";
import { IObj } from "../../../types";

export interface IFormModalProp extends IModalProps, IFormProps {
  // 初始值
  initModel: IObj | ((...args: any[]) => IObj);
  onAdd: (model: any) => void | Promise<void>;
  onEdit: (model: any) => void | Promise<void>;
  title: string | ((isAdd: boolean, model: IObj) => VNodeTypes);
  openAddModal: () => void;
  openEditModal: (record: any) => void;
  commonMap: (item: any) => any;
  addMap: (item: any) => any;
  editMap: (item: any) => any;
}

export interface IFormModalActions extends ICommonAction<IFormModalProp> {
  openNew: (i?: IObj) => Promise<void>;
  openEdit: (i: IObj) => Promise<void>;
  setModel: (val: Record<string, any>) => void;
  getModelRef: () => ComputedRef<Record<string, any>>;
  openAddModal: () => void;
  openEditModal: (param: any) => void;
}
