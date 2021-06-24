import { ColumnProps, tableRowSelection } from "ant-design-vue/lib/table/interface";
import { IPagination } from "../../../components";
import { ComputedRef, ExtractPropTypes } from "vue";
import { IObj } from "../../../types";
export type SizeType = "default" | "middle" | "small" | "large";
export interface IBasicColumn extends ColumnProps {
  flag?: "INDEX" | "DEFAULT" | "CHECKBOX" | "RADIO" | "ACTION";
}
export type TableRowSelection = Partial<ExtractPropTypes<typeof tableRowSelection>>;
export interface ITableRowSelection<T = any> extends TableRowSelection {
  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any;

  /**
   * Callback executed when select/deselect one row
   * @type FunctionT
   */
  onSelect?: (record: T, selected: boolean, selectedRows: IObj[], nativeEvent: Event) => any;

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: string[] | number[]) => any;
}
export interface IBasicTableProps {
  // 所有栏目默认对齐方式
  columnsAlign: "left" | "center" | "right";
  // 是否使用边框，默认false
  bordered: boolean;
  // table 列配置项
  columns: IBasicColumn[];
  // 数据源，用不到，主要用来接收props
  dataSource?: any[];
  // 是否需要索引，默认true，string则把序号改名为string
  indexColumn: boolean | string;
  // 是否需要固定indexColumn
  indexColumnFixed: boolean;
  // rowKey,用在唯一key上，默认为id
  rowKey?: string;
  // 列操作，参考antd
  rowSelection?: ITableRowSelection;
  // 分页
  pagination?: Partial<IPagination> | false;
  // 是否需要横向滚动， 默认false
  scrollX?: boolean;
  // 是否需要自动适应高度，纵向滚动，默认true
  scrollY?: boolean;
  // 默认table的尺寸,默认 small
  size?: SizeType;
  // 斑马线，默认为'#fafafa'，false不要，string则改颜色
  striped?: false | string;
}
export interface ICommonAction<T extends any = any> {
  setProps: (args: Partial<T>) => void;
}
export interface IBasicTableActionBase {
  // 手动设置分页
  setPagination: (pagination: Partial<IPagination> | boolean) => void;
  // 获取分页
  getPagination: () => IPagination | boolean;
  getPaginationRef: () => ComputedRef<IPagination | boolean>;
  // 获取数据源
  getDataSource: () => any[];
  // 设置数据源
  setDataSource: (val: any[]) => void;
  // 设置loading
  setLoading: (val: boolean) => void;
  // 设置选中的keys
  setSelectedRowKeys: (rowKeys: any[]) => void;
  // 获取当前页选择的行
  getSelectedRows: () => any[];
  // 获取当前页选中的keys
  getSelectedRowKeys: () => any[];
  // 获取所有页选择的行
  getAllSelectedRows: () => any[];
  // 获取所有页选中的keys
  getAllSelectedRowKeys: () => any[];
  // 清除选择的keys
  clearSelectedRowKeys: () => void;
}
export interface IBasicTableActions extends IBasicTableActionBase {
  setProps: (args: Partial<IBasicTableProps>) => void;
}
