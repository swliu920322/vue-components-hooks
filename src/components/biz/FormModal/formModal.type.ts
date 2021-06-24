import {
  IModalProps,
  IFormProps,
  ICommonAction,
  IModalActionBase,
  IFormActionsBase,
} from "../../../components";
import { ComputedRef, UnwrapRef } from "vue";
import { IObj } from "../../../types";

export interface IFormModalProp extends IModalProps, IFormProps {
  modelRef: UnwrapRef<Record<string, any>>;
  // 初始值
  initModel: IObj | ((...args: any[]) => IObj);
  // 保存前的转化，以下转化都是差量修改,只要返回变化的内容即可,全部返回也没什么事
  commonMap: (item?: any) => any;
  // 新增单独转化
  addMap: (item?: any) => any;
  // 修改单独转化
  editMap: (item?: any) => any;
  // 新增APi的操作, 数据流是model => commonMap => addMap, 那个不填就不走
  onAdd: (model: any) => any | Promise<any>;
  // 修改Api的操作, 数据流是model => commonMap => editMap, 那个不填就不走
  onEdit: (model: any) => any | Promise<any>;
  // 标题，string则 新增 + string, 修改 + string, 方法则返回你定义的
  title: string | ((isAdd: boolean, model: Record<string, any>) => string);
  // 打开新增model
  openAddModal: (...record: any[]) => void;
  // 打开修改model
  openEditModal: (...record: any[]) => void;
  afterAdd: (model: Record<string, any>, res: any) => Promise<any> | any;
  afterEdit: (model: Record<string, any>, res: any) => Promise<any> | any;
  // 重新查询的方法，如果传入，自动新增和修改结束后会调用
  pageChange: (obj?: { current?: number; pageSize?: number }) => Promise<void>;
  rePageChange: (obj?: { current?: number; pageSize?: number }) => Promise<void>;
}

export interface IFormModalActions extends ICommonAction<IFormModalProp> {
  // 手动打开新增弹框
  openNew: (i?: Record<string, any>) => Promise<void>;
  // 手动打开修改弹框
  openEdit: (i: Record<string, any>) => Promise<void>;
  // 手动修改model，差量修改
  setModel: (val: Record<string, any>) => void;
  // 获取modelRef，实时更新
  getModelRef: () => ComputedRef<Record<string, any>>;
  // 手动触发传入的openAddModal
  openAddModal: (...record: any[]) => void;
  // 打开修改model
  openEditModal: (...record: any[]) => void;

  modal: IModalActionBase;
  form: IFormActionsBase;
}

export interface IFormPageParam {
  pageChange: (obj?: { current?: number; pageSize?: number }) => Promise<void>;
  rePageChange: () => Promise<void>;
}
