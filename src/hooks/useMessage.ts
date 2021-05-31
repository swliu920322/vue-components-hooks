import { message, Modal, notification } from "ant-design-vue";
import { h, VNodeTypes } from "vue";
import { ArgsProps, ConfigProps } from "ant-design-vue/lib/notification";
import { ModalFunc, ModalFuncProps } from "ant-design-vue/lib/modal/Modal";
import AoIcon from "../components/common/Icon.vue";
import { ButtonType } from "ant-design-vue/es/button/buttonTypes";

interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

export interface NotifyApi {
  info(config: ArgsProps): void;

  success(config: ArgsProps): void;

  error(config: ArgsProps): void;

  warn(config: ArgsProps): void;

  warning(config: ArgsProps): void;

  open(args: ArgsProps): void;

  close(key: string): void;

  config(options: ConfigProps): void;

  destroy(): void;
}

interface ModalRes {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
}

interface ModalMethod {
  info(options: ModalOptionsPartial): ModalRes;

  success(options: ModalOptionsPartial): ModalRes;

  warning(options: ModalOptionsPartial): ModalRes;

  error(options: ModalOptionsPartial): ModalRes;
}

interface ModalOptionsEx extends Omit<ModalFuncProps, "iconType"> {
  iconType: "warning" | "success" | "error" | "info";
}

type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, "content">;

type IconType = "warning" | "success" | "info" | "error";

function getIcon(iconType: string) {
  const iconMap: { icon: string; class: string } = {
    warning: { icon: "info-circle-filled", class: "modal-icon-warning" },
    success: { icon: "check-circle-filled", class: "modal-icon-success" },
    info: { icon: "info-circle-filled", class: "modal-icon-info" },
    error: { icon: "close-circle-filled", class: "modal-icon-error" },
  }[iconType as IconType];
  return h(AoIcon, {
    ...iconMap,
    icon: "ant-design:" + (iconMap?.icon || "close-circle-filled"),
  });
}

function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || "warning";
  Reflect.deleteProperty(options, "iconType");
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
  };
  return Modal.confirm(opt) as any;
}

const baseOptions = {
  okText: "确定",
  centered: true,
};

function renderContent({ content }: Pick<ModalOptionsEx, "content">) {
  return h("div", {}, content as string);
}

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...baseOptions,
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

const createModal: ModalMethod = {
  success: (options: ModalOptionsPartial) => Modal.success(createModalOptions(options, "close")),
  info: (options: ModalOptionsPartial) => Modal.info(createModalOptions(options, "close")),
  warning: (options: ModalOptionsPartial) => Modal.warning(createModalOptions(options, "close")),
  error: (options: ModalOptionsPartial) => Modal.error(createModalOptions(options, "close")),
};

export function useMessage() {
  return {
    notification: notification as NotifyApi,
    createModal,
    createConfirm,
    createConfirmDel: (content: VNodeTypes, title?: string) =>
      new Promise<void>((resolve) => {
        createConfirm({
          iconType: "warning",
          title: title || "确认删除",
          content,
          okType: "danger",
          onOk() {
            resolve();
          },
          okText: "确认",
          cancelText: "取消",
        });
      }),
    createConfirmTitle: ({
      name,
      title = "确认操作",
      okType = "danger",
      content,
    }: {
      name?: string; // 名称
      title?: string; // 标题
      content?: string; // 内容, 没内容 = 是否 + 标题 + name
      okType?: ButtonType; // 按钮类型
    }) =>
      new Promise<void>((resolve, reject) => {
        createConfirm({
          iconType: "warning",
          title: title,
          content:
            content ??
            h("div", [
              "是否" + title + " ",
              h(
                "span",
                {
                  style: { color: "red" },
                },
                name
              ),
              " 么",
            ]),
          okType,
          onOk() {
            resolve();
          },
          onCancel() {
            reject();
          },
          okText: "确认",
          cancelText: "取消",
        });
      }),
    createMessage: message,
  };
}
