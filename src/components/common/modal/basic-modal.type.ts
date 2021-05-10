import { ICommonAction } from "../table/basic-table.types";
import { Fn } from "../../../types";

export interface IModalProps {
  centered?: boolean;
  maskClosable?: boolean;
  onCancel: Fn;
  onOk: Fn;
}
export interface IModalActionBase {
  openModal: () => Promise<any>;
  closeModal: () => Promise<any>;
  openLoading: () => void;
  closeLoading: () => void;
  setOk: Fn;
  setCancel: Fn;
}
export interface IModalActions extends IModalActionBase, ICommonAction<IModalProps> {}
