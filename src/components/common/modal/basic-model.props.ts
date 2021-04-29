import { PropType } from "vue";
import { Fn } from "../../../types";

export const basicModalProps = {
  centered: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  maskClosable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  cancel: {
    type: Function as PropType<Fn>,
    default: () => {},
  },
  ok: {
    type: Function as PropType<Fn>,
    default: () => {},
  },
};
