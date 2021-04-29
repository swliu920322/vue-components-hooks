import { ICommonAction } from "@/components";

export interface IModalProps {
  centered?: boolean;
  maskClosable?: boolean;
  onCancel: Fn;
  onOk: Fn;
}
export interface IModalActions extends ICommonAction<IModalProps> {
  openModal: () => Promise<any>;
  closeModal: () => Promise<any>;
  openLoading: () => void;
  closeLoading: () => void;
  setOk: Fn;
  setCancel: Fn;
}
