import { ColumnProps, tableRowSelection } from "ant-design-vue/lib/table/interface";
import { IPagination } from "../../../components";
import { ExtractPropTypes } from "vue";
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
  columnsAlign: "left" | "center" | "right";
  bordered: boolean;
  columns: IBasicColumn[];
  dataSource?: any[];
  indexColumn: boolean | string;
  indexColumnFixed: boolean;
  rowKey?: string;
  rowSelection?: ITableRowSelection;
  pagination?: Partial<IPagination> | false;
  // 默认false
  scrollX?: boolean;
  // 默认true
  scrollY?: boolean;
  // 尺寸,默认 small
  size?: SizeType;
  striped?: false | string;
}
export interface ICommonAction<T extends any = any> {
  setProps: (args: Partial<T>) => void;
}
export interface IBasicTableAction {
  setPagination: (pagination: Partial<IPagination> | boolean) => void;
  getPagination: () => IPagination | boolean;
  getDataSource: () => any[];
  setDataSource: (val: any[]) => void;
  setLoading: (val: boolean) => void;
  setSelectedRowKeys: (rowKeys: any[]) => void;
  getSelectedRows: () => any[];
  getSelectedRowKeys: () => number[];
  clearSelectedRowKeys: () => void;
}
export interface IBasicTableActions extends IBasicTableAction {
  setProps: (args: Partial<IBasicTableProps>) => void;
}
