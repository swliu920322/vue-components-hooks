import {
  IBasicTableAction,
  IBasicTableProps,
  ICommonAction,
} from "@/components/common/table/basic-table.types";
import { ComputedRef, VNodeTypes } from "vue";
interface PageRequest {
  page: number;
  pageSize: number;
}
interface OrderRequest {
  orderBy: string;
  descending: boolean;
}
export interface IBizTableProps extends IBasicTableProps {
  queryFunc: (i: { pageRequest: PageRequest; orderRequest: OrderRequest }) => Promise<any>;
  queryFuncMap: (i: any) => any;
  removeFunc: (args: any[]) => Promise<void> | void;
  // 删除弹框提示的title, type === string ? '删除' + removeTitle : removeTitle()
  removeTitle: string | (() => string);
  /*
    删除时，内部每一个标红的label,默认i => i.name,可以return h函数，就用h函数渲染,
    多删时，不能使用h函数, 最好不适用h函数，如果使用到的话，需要重新做一个多删的removeLabelFunc
   */
  removeLabelFunc: (i: any) => VNodeTypes;
  // 只有返回true|undefined，删除才可以继续
  removeBefore: () => boolean | undefined;
  // 查询结果的副作用，适用于调试数据
  querySideEffect: (i: any[]) => void;
  // 是否在mounted自动查询
  mounted: boolean;
  resultConfig: {
    pageConfig: string;
    resConfig: string;
  };
}

export interface IBizTableActions extends IBasicTableAction, ICommonAction<IBizTableProps> {
  // 根据目前分页条件查询
  pageChange: (obj?: { current?: number; pageSize?: number }) => Promise<void>;
  // 根据目前分页条件，current=1查询
  rePageChange: () => Promise<void>;
  // 删除单条，删除完成不会自动刷新
  removeItem: (record: { id: number; [name: string]: any }) => void;
  // 删除单条，删除完成自动刷新
  removeItemAuto: (record: { id: number; [name: string]: any }) => void;
  // 删除多条，删除不会完成自动刷新
  removeItems: () => void;
  // 删除多条，删除完成自动刷新
  removeItemsAuto: () => void;
  // 获取数据源的引用，计算类型
  getDataSourceRef: () => ComputedRef<any[]>;
}