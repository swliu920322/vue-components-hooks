'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var antDesignVue = require('ant-design-vue');
var Iconify = require('@purge-icons/generated');
var lodashEs = require('lodash-es');
var iconsVue = require('@ant-design/icons-vue');
var XLSX = require('xlsx');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Iconify__default = /*#__PURE__*/_interopDefaultLegacy(Iconify);
var XLSX__default = /*#__PURE__*/_interopDefaultLegacy(XLSX);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function useLoading(initial) {
    const loadingRef = vue.ref(initial || false);
    return {
        getLoadingRef: vue.computed(() => vue.unref(loadingRef)),
        setLoading(val) {
            loadingRef.value = val;
        },
    };
}

function usePagination(emit, initial) {
    const basePagination = {
        total: 0,
        current: 1,
        pageSize: 20,
        defaultPageSize: 20,
        size: "default",
        pageSizeOptions: ["10", "20", "30", "40"],
        onChange: undefined,
        onShowSizeChange: undefined,
        showTotal: (total, range) => `???${range[0]}~${range[1]}?????????${total}???`,
        showSizeChanger: true,
        showQuickJumper: true,
        simple: false,
        showLessItems: false,
        hideOnSinglePage: false,
        disabled: false,
    };
    const paginationRef = vue.ref(Object.assign(Object.assign({}, basePagination), (initial === undefined ? {} : initial)));
    function setPagination(val) {
        if (typeof val === "boolean") {
            paginationRef.value = val;
        }
        else {
            paginationRef.value = Object.assign(Object.assign({}, (typeof paginationRef.value === "boolean" ? basePagination : paginationRef.value)), val);
        }
    }
    return {
        getPaginationRef: vue.computed(() => {
            const val = vue.unref(paginationRef);
            if (typeof val === "boolean") {
                return false;
            }
            if (val.onChange === undefined) {
                val.onChange = (current, pageSize) => {
                    setPagination({ current, pageSize });
                    emit("pageChange", { current, pageSize });
                };
            }
            if (val.onShowSizeChange === undefined) {
                val.onShowSizeChange = (current, pageSize) => {
                    setPagination({ current, pageSize });
                    emit("pageChange", { current, pageSize });
                };
            }
            return val;
        }),
        setPagination,
    };
}

const basicTableProps = {
    columns: {
        type: Array,
        default: () => [],
    },
    dataSource: {
        type: Array,
        default: () => [],
    },
    indexColumn: {
        type: [Boolean, String],
        default: "??????",
    },
    bordered: {
        type: Boolean,
        default: false,
    },
    indexColumnFixed: {
        type: Boolean,
        default: false,
    },
    rowKey: {
        type: String,
        default: "id",
    },
    rowSelection: {
        type: Object,
        default: null,
    },
    pagination: {
        type: Object,
        default: () => ({}),
    },
    scrollX: {
        type: Boolean,
        default: false,
    },
    scrollY: {
        type: Boolean,
        default: true,
    },
    size: {
        type: String,
        default: "small",
    },
    striped: {
        type: [Boolean, String],
        default: "#fafafa",
    },
};

function useColumns(propsRef, getPaginationRef) {
    const columnsRef = vue.ref(propsRef.value.columns || []);
    function columnsChange(columns) {
        if (columns && Array.isArray(columns)) {
            if (vue.unref(propsRef).columnsAlign) {
                // @ts-ignore
                columnsRef.value = columns.map((i) => (Object.assign(Object.assign({}, i), { align: i.align || vue.unref(propsRef).columnsAlign })));
            }
            else {
                // @ts-ignore
                columnsRef.value = columns;
            }
        }
    }
    const watchStop = vue.watch(() => vue.unref(propsRef).columns, columnsChange);
    vue.onUnmounted(() => {
        watchStop && watchStop();
    });
    const getColumnRef = vue.computed(() => {
        const getPagination = vue.unref(getPaginationRef);
        const columns = columnsRef.value;
        const { indexColumn, indexColumnFixed } = vue.unref(propsRef);
        const existIndex = columns.findIndex((i) => i.flag === "INDEX");
        if (existIndex > -1) {
            columns.splice(existIndex, 1);
        }
        const isFixedLeft = columns.some((item) => item.fixed === "left");
        if (indexColumn) {
            columns.unshift(Object.assign(Object.assign({ flag: "INDEX", title: "??????", width: 65, align: "center", customRender: ({ index }) => {
                    if (typeof getPagination === "boolean") {
                        return `${index + 1}`;
                    }
                    const { current = 1, pageSize = 10 } = getPagination;
                    return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
                } }, (isFixedLeft ? { fixed: "left" } : {})), (indexColumnFixed ? { fixed: "left" } : {})));
        }
        return columnsRef.value;
    });
    return {
        getColumnRef,
        getColumns: () => getColumnRef.value,
        setColumns: columnsChange,
    };
}

function useDataSource(propsRef) {
    const dataSourceRef = vue.ref(vue.unref(propsRef).dataSource || []);
    return {
        setDataSource(val) {
            dataSourceRef.value = val;
        },
        getDataSourceRef: vue.computed(() => dataSourceRef.value),
    };
}

function useRowSelection(propsRef, getDataSourceRef, emit) {
    const selectedRowsRef = vue.ref([]);
    const selectedRowsAllRef = vue.reactive({});
    const selectedRowKeysRef = vue.ref([]);
    const getRowSelectionRef = vue.computed(() => {
        const { rowSelection } = vue.unref(propsRef);
        if (!rowSelection) {
            return null;
        }
        return Object.assign({ selectedRowKeys: vue.unref(selectedRowKeysRef), hideDefaultSelections: false, columnWidth: 40, onChange: (selectedRowKeys, selectedRows) => {
                const rowKey = propsRef.value.rowKey || "id";
                selectedRows.forEach((i) => {
                    selectedRowsAllRef[i[rowKey]] = i;
                });
                Object.keys(selectedRowsAllRef).forEach((key) => {
                    if (selectedRowKeys.findIndex((ii) => ii === key) === -1) {
                        Reflect.deleteProperty(selectedRowsAllRef, key);
                    }
                });
                selectedRowKeysRef.value = selectedRowKeys;
                selectedRowsRef.value = selectedRows;
                emit("selection-change", {
                    keys: selectedRowKeys,
                    rows: selectedRows,
                });
            } }, rowSelection);
    });
    function setSelectedRowKeys(rowKeys) {
        selectedRowKeysRef.value = rowKeys;
        const rowKey = vue.unref(propsRef).rowKey;
        if (rowKey) {
            selectedRowsRef.value = vue.unref(getDataSourceRef).filter((item) => rowKeys.includes(item[rowKey]));
        }
    }
    function clearSelectedRowKeys() {
        selectedRowsRef.value = [];
        selectedRowKeysRef.value = [];
        selectedRowsAllRef.value = [];
    }
    return {
        getAllSelectedRows: () => vue.unref(Object.values(selectedRowsAllRef)),
        getAllSelectedRowKeys: () => vue.unref(selectedRowKeysRef),
        getSelectedRows: () => vue.unref(selectedRowsRef),
        getSelectedRowKeys: () => vue.unref(selectedRowsRef.value.map((i) => i[propsRef.value.rowKey || "id"])),
        setSelectedRowKeys,
        getRowSelectionRef,
        clearSelectedRowKeys,
    };
}

function once(cb, delay = 2000) {
    let deal = true;
    return function (...arg) {
        if (deal) {
            cb.call(null, arg);
            deal = false;
            setTimeout(() => {
                deal = true;
            }, delay);
        }
    };
}
function throttle(callback, delay = 20) {
    let timer = 0;
    return function tt(...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            callback.apply(null, [...args]);
            clearTimeout(timer);
            timer = 0;
        }, delay);
    };
}

function useTableScroll(propsRef, { containerRef, getColumnRef, tableRef, getPaginationRef, getRowSelectionRef }) {
    // ????????????
    const scrollXRef = vue.ref(propsRef.value.scrollX || false);
    const scrollYRef = vue.ref(propsRef.value.scrollY || true);
    // ????????????
    const scrollYHeight = vue.ref(0);
    const watchStopX = vue.watch(() => propsRef.value.scrollX, (val) => {
        if (val !== undefined) {
            scrollXRef.value = val;
        }
    });
    const watchStopY = vue.watch(() => propsRef.value.scrollY, (val) => {
        if (val !== undefined) {
            scrollYRef.value = val;
        }
    });
    vue.onUnmounted(() => {
        watchStopX && watchStopX();
        watchStopY && watchStopY();
    });
    const getScrollX = vue.computed(() => {
        var _a, _b, _c;
        let width = 0;
        if (vue.unref(getRowSelectionRef)) {
            width += 40;
        }
        getColumnRef.value.forEach((i) => {
            if (i.width) {
                width += parseInt(i.width, 10) || 0;
            }
            else {
                width += 150;
            }
        });
        const tableWidth = (_c = (_b = (_a = tableRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth) !== null && _c !== void 0 ? _c : 0;
        return tableWidth > width ? "100%" : width;
    });
    function getScrollHeight() {
        var _a, _b;
        if (scrollYRef.value) {
            const containerHeight = (_a = vue.unref(containerRef)) === null || _a === void 0 ? void 0 : _a.clientHeight;
            const tableCurHeight = ((_b = vue.unref(tableRef)) === null || _b === void 0 ? void 0 : _b.$el) ? vue.unref(tableRef).$el.clientHeight : 0;
            const hasPagination = vue.unref(getPaginationRef) !== false;
            if (tableCurHeight && containerHeight) {
                const headEl = vue.unref(tableRef).$el.querySelector(".ant-table-thead ");
                const paginationEl = vue.unref(tableRef).$el.querySelector(".ant-pagination");
                scrollYHeight.value =
                    containerHeight -
                        (hasPagination && paginationEl ? paginationEl.clientHeight + 17 : 0) -
                        headEl.clientHeight;
            }
        }
    }
    function checkScroll() {
        const fn = throttle(getScrollHeight);
        window.removeEventListener("resize", fn);
        window.addEventListener("resize", fn);
        vue.onUnmounted(() => {
            window.removeEventListener("resize", fn);
        });
    }
    checkScroll();
    const getScrollRef = vue.computed(() => {
        var _a;
        return {
            x: scrollXRef.value ? vue.unref(getScrollX) : null,
            y: (_a = scrollYHeight.value) !== null && _a !== void 0 ? _a : null,
        };
    });
    return {
        getScrollRef,
        checkScroll,
        getScrollHeight,
    };
}

function useTableStyle(propsRef) {
    function getRowClassName(record, index) {
        const { striped } = vue.unref(propsRef);
        if (striped && (index || 0) % 2 === 1) {
            return "ao-row__striped";
        }
        return "";
    }
    const stripedColor = vue.ref(propsRef.value.striped || "#fafafa");
    const watchStop = vue.watch(() => propsRef.value.striped, (val) => {
        if (val) {
            stripedColor.value = val;
        }
    });
    vue.onUnmounted(() => {
        watchStop && watchStop();
    });
    return {
        getStripedColorRef: stripedColor,
        setStripedColor: (val) => (stripedColor.value = val),
        getRowClassName,
    };
}

const getTableMethods = (getInstance) => ({
    setPagination: (pagination) => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setPagination(pagination); },
    getPagination: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getPagination(); },
    getPaginationRef: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getPaginationRef(); },
    getDataSource: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getDataSource(); },
    setDataSource: (val) => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setDataSource(val); },
    setLoading: (val) => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setLoading(val); },
    getLoading: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getLoading(); },
    setSelectedRowKeys: (rowKeys) => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setSelectedRowKeys(rowKeys); },
    getSelectedRows: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getSelectedRows(); },
    getSelectedRowKeys: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getSelectedRowKeys(); },
    getAllSelectedRows: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getAllSelectedRows(); },
    getAllSelectedRowKeys: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getAllSelectedRowKeys(); },
    clearSelectedRowKeys: () => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.clearSelectedRowKeys(); },
    getScrollHeight: () => getInstance().getScrollHeight(),
    getColumns: () => getInstance().getColumns(),
    setColumns: (columns) => getInstance().setColumns(columns),
});
function useTable(props) {
    const tableRef = vue.ref();
    function register(actions) {
        tableRef.value = actions;
        actions.setProps(props);
    }
    function getInstance() {
        if (!tableRef.value) {
            throw new Error("table has not instance,");
        }
        return tableRef.value;
    }
    const tableMethods = Object.assign({ setProps: (params) => { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setProps(params); } }, getTableMethods(getInstance));
    return [register, tableMethods];
}

var script$9 = vue.defineComponent({
    name: "basic-table",
    components: {},
    props: basicTableProps,
    emits: ["register", "pageChange", "registerEnd"],
    setup(props, { attrs, emit }) {
        const tableRef = vue.ref();
        const containerRef = vue.ref();
        const innerRef = vue.ref();
        const getPropsRef = vue.computed(() => {
            return Object.assign(Object.assign({}, props), vue.unref(innerRef));
        });
        const { setPagination, getPaginationRef } = usePagination(emit);
        function setProps(props) {
            if (props.pagination !== undefined) {
                setPagination(props.pagination);
            }
            innerRef.value = Object.assign(Object.assign({}, innerRef.value), props);
        }
        const { getColumnRef, setColumns, getColumns } = useColumns(getPropsRef, getPaginationRef);
        const { getRowClassName } = useTableStyle(getPropsRef);
        const { getDataSourceRef, setDataSource } = useDataSource(getPropsRef);
        const watchStopDataSource = vue.watch(() => vue.unref(getPropsRef).dataSource, (val) => {
            if (val) {
                setDataSource(val);
                vue.nextTick(() => {
                    getScrollHeight();
                });
            }
        });
        vue.onUnmounted(() => {
            watchStopDataSource && watchStopDataSource();
        });
        const { getRowSelectionRef, setSelectedRowKeys, getSelectedRowKeys, getSelectedRows, getAllSelectedRows, getAllSelectedRowKeys, clearSelectedRowKeys, } = useRowSelection(getPropsRef, getDataSourceRef, emit);
        // @ts-ignore
        const { getScrollRef, getScrollHeight } = useTableScroll(getPropsRef, {
            containerRef,
            getColumnRef,
            getPaginationRef,
            tableRef,
            getRowSelectionRef,
        });
        const { setLoading, getLoadingRef } = useLoading();
        const getBindRef = vue.computed(() => {
            var _a, _b;
            return Object.assign(Object.assign(Object.assign({}, attrs), vue.unref(getPropsRef)), { columns: vue.unref(getColumnRef), pagination: vue.unref(getPaginationRef), rowClassName: getRowClassName, scroll: Object.assign(Object.assign({}, vue.unref(getScrollRef)), ((_a = attrs.scroll) !== null && _a !== void 0 ? _a : {})), dataSource: vue.unref(getDataSourceRef), rowSelection: vue.unref(getRowSelectionRef), loading: ((_b = attrs.loading) !== null && _b !== void 0 ? _b : false) || vue.unref(getLoadingRef) });
        });
        let watchStop;
        // ???????????????
        vue.onMounted(() => __awaiter(this, void 0, void 0, function* () {
            yield vue.nextTick();
            watchStop = vue.watch(() => getBindRef.value.dataSource, () => {
                getScrollHeight();
            }, {
                immediate: true,
            });
        }));
        vue.onUnmounted(() => {
            watchStop && watchStop();
        });
        const actions = {
            setProps,
            getDataSource: () => vue.unref(getDataSourceRef),
            setDataSource,
            setPagination,
            setLoading,
            getLoading: () => getLoadingRef,
            setColumns,
            getColumns,
            getPagination: () => vue.unref(getPaginationRef),
            getPaginationRef: () => vue.computed(() => getPaginationRef.value),
            getSelectedRowKeys,
            getSelectedRows,
            getAllSelectedRows,
            getAllSelectedRowKeys,
            setSelectedRowKeys,
            clearSelectedRowKeys,
            getScrollHeight,
        };
        emit("register", actions);
        emit("registerEnd");
        return {
            getBindRef,
            tableRef,
            containerRef,
        };
    },
});

const _withId$3 = /*#__PURE__*/vue.withScopeId("data-v-33b94c9a");

vue.pushScopeId("data-v-33b94c9a");
const _hoisted_1$2 = {
  ref: "containerRef",
  style: {"height":"100%"}
};
vue.popScopeId();

const render$9 = /*#__PURE__*/_withId$3((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_ATable = vue.resolveComponent("ATable");

  return (vue.openBlock(), vue.createBlock("section", _hoisted_1$2, [
    vue.createVNode(_component_ATable, vue.mergeProps({ ref: "tableRef" }, _ctx.getBindRef), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
      vue.renderList(Object.keys(_ctx.$slots), (item) => {
        return {
          name: item,
          fn: _withId$3((data) => [
            vue.renderSlot(_ctx.$slots, item, data)
          ])
        }
      })
    ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */)
  ], 512 /* NEED_PATCH */))
});

script$9.render = render$9;
script$9.__scopeId = "data-v-33b94c9a";
script$9.__file = "src/components/common/table/basic-table.vue";

function useCols(propsRef) {
    const colRef = vue.ref(propsRef.value.col || [6, 18]);
    function setCol(val) {
        colRef.value = val;
    }
    const watchStop = vue.watch(() => vue.unref(propsRef).col, (val) => {
        val && setCol(val);
    });
    vue.onUnmounted(() => {
        watchStop && watchStop();
    });
    const getColRef = vue.computed(() => {
        if (propsRef.value.layout === "inline") {
            return {
                labelCol: undefined,
                wrapperCol: undefined,
            };
        }
        const [label, wrapper] = vue.unref(colRef);
        const labelCol = { span: vue.unref(colRef)[0] };
        const wrapperCol = { span: vue.unref(colRef)[1] };
        const all = label + wrapper;
        if (24 % all === 0) {
            const ratio = 24 / all;
            labelCol.span = ratio * label;
            wrapperCol.span = ratio * wrapper;
        }
        return {
            labelCol,
            wrapperCol,
        };
    });
    return {
        setCol,
        getColRef,
    };
}

var script$8 = vue.defineComponent({
    name: "basic-form",
    inheritAttrs: false,
    emits: ["register"],
    setup(props, { attrs, emit }) {
        const formRef = vue.ref();
        const innerRef = vue.ref();
        const getProps = vue.computed(() => {
            return Object.assign(Object.assign({}, props), vue.unref(innerRef));
        });
        const setProps = (value) => {
            innerRef.value = Object.assign(Object.assign({}, innerRef.value), value);
        };
        const { getColRef } = useCols(getProps);
        const getBindRef = vue.computed(() => {
            return Object.assign(Object.assign(Object.assign(Object.assign({}, props), attrs), vue.unref(getProps)), { labelCol: vue.unref(getColRef).labelCol, wrapperCol: vue.unref(getColRef).wrapperCol });
        });
        const getSizeRef = vue.computed(() => {
            return {
                size: vue.unref(getProps).size || "default",
            };
        });
        const formAction = {
            setProps,
            validate: () => formRef.value.validate(),
            resetFields: () => formRef.value.resetFields(),
            clearValidate: () => formRef.value.clearValidate(),
            scrollToField: (name, options) => formRef.value.scrollToField(name, options),
        };
        emit("register", formAction);
        return {
            getBindRef,
            formRef,
            getSizeRef,
        };
    },
});

function render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_a_form = vue.resolveComponent("a-form");

  return (vue.openBlock(), vue.createBlock(_component_a_form, vue.mergeProps({ ref: "formRef" }, _ctx.getBindRef), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */))
}

script$8.render = render$8;
script$8.__file = "src/components/common/form/basic-form.vue";

const getFormMethods = (getInstance) => {
    return {
        validate: () => getInstance().validate(),
        resetFields: () => getInstance().resetFields(),
        clearValidate: () => getInstance().clearValidate(),
        scrollToField: (name, options) => getInstance().scrollToField(name, options),
    };
};
function useForm(props) {
    const formRef = vue.ref();
    function register(actions) {
        formRef.value = actions;
        actions.setProps(props);
    }
    function getFormInstance() {
        if (!formRef.value) {
            throw new Error("formInstance has not ready");
        }
        return vue.unref(formRef);
    }
    const methods = Object.assign({ setProps: (props) => { var _a; return (_a = getFormInstance()) === null || _a === void 0 ? void 0 : _a.setProps(props); } }, getFormMethods(getFormInstance));
    return [register, methods];
}

const basicModalProps = {
    centered: {
        type: Boolean,
        default: true,
    },
    maskClosable: {
        type: Boolean,
        default: false,
    },
    cancel: {
        type: Function,
        default: () => { },
    },
    ok: {
        type: Function,
        default: () => { },
    },
};

function useVisible() {
    const visible = vue.ref(false);
    const okFunc = vue.ref(() => {
        closeModal();
    });
    const cancelFunc = vue.ref(() => {
        closeModal();
    });
    function setOkFunc(ok) {
        okFunc.value = ok;
    }
    function setCancelFunc(cancel) {
        cancelFunc.value = cancel;
    }
    function openModal() {
        visible.value = true;
        return vue.nextTick();
    }
    function closeModal() {
        visible.value = false;
        return vue.nextTick();
    }
    return {
        openModal,
        closeModal,
        getVisibleRef: vue.computed(() => visible.value),
        setOkFunc,
        okFuncRef: vue.computed(() => {
            return vue.unref(okFunc);
        }),
        cancelFuncRef: vue.computed(() => vue.unref(cancelFunc)),
        setCancelFunc,
    };
}

var script$7 = vue.defineComponent({
    name: "basic-modal",
    props: basicModalProps,
    setup(props, { attrs, emit }) {
        const okLoading = vue.ref(false);
        const { openModal, closeModal, getVisibleRef, okFuncRef, setCancelFunc, setOkFunc, cancelFuncRef, } = useVisible();
        const innerRef = vue.ref({});
        function openLoading() {
            okLoading.value = true;
        }
        function closeLoading() {
            okLoading.value = false;
        }
        const onOk = once(() => __awaiter(this, void 0, void 0, function* () {
            try {
                openLoading();
                yield vue.unref(okFuncRef)();
                closeLoading();
            }
            catch (e) {
                console.log(e);
                closeLoading();
            }
        }));
        const getProps = vue.computed(() => {
            return Object.assign(Object.assign(Object.assign(Object.assign({}, props), attrs), { onCancel: vue.unref(cancelFuncRef), onOk, okButtonProps: attrs.okButtonProps, cancelButtonProps: attrs.cancelButtonProps, confirmLoading: vue.unref(okLoading) }), vue.unref(innerRef));
        });
        function setProps(props) {
            Object.entries(props).forEach(([key, value]) => {
                switch (key) {
                    case "onCancel":
                        return setCancelFunc(value);
                    case "onOk":
                        return setOkFunc(value);
                    default:
                        innerRef.value = Object.assign(Object.assign({}, innerRef.value), { [key]: value });
                }
            });
        }
        const getBind = vue.computed(() => {
            return Object.assign(Object.assign({}, vue.unref(getProps)), { visible: vue.unref(getVisibleRef) });
        });
        const actions = {
            setProps,
            openModal,
            closeModal,
            openLoading,
            closeLoading,
            setOk: setOkFunc,
            setCancel: setCancelFunc,
        };
        emit("register", actions);
        return {
            getBind,
        };
    },
});

function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_AModal = vue.resolveComponent("AModal");

  return (vue.openBlock(), vue.createBlock(_component_AModal, _ctx.getBind, {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */))
}

script$7.render = render$7;
script$7.__file = "src/components/common/modal/basic-modal.vue";

const getModalMethods = (getInstance) => {
    return {
        openModal: () => getInstance().openModal(),
        closeModal: () => getInstance().closeModal(),
        setOk: (param) => getInstance().setOk(param),
        setCancel: (param) => getInstance().setCancel(param),
        openLoading: () => getInstance().openLoading(),
        closeLoading: () => getInstance().closeLoading(),
    };
};
function useModal(props) {
    const modalRef = vue.ref();
    function register(actions) {
        modalRef.value = actions;
        actions.setProps(props);
    }
    function getModalInstance() {
        if (!modalRef.value) {
            throw new Error("modal instance has not ready");
        }
        return vue.unref(modalRef);
    }
    const modalMethods = Object.assign({ setProps: (props) => getModalInstance().setProps(props) }, getModalMethods(getModalInstance));
    return [register, modalMethods];
}

function useBizData(getPropsRef, tableMethods) {
    const dataSource = vue.ref([]);
    function pageChange(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            tableMethods.setLoading(true);
            try {
                const page = tableMethods.getPagination();
                if (typeof page === "boolean") {
                    console.error("?????????????????????????????????????????????????????????!");
                    return [];
                }
                page.current = (obj === null || obj === void 0 ? void 0 : obj.current) || page.current;
                page.pageSize = (obj === null || obj === void 0 ? void 0 : obj.pageSize) || page.pageSize;
                const { queryFunc, queryFuncMap, querySideEffect, resultConfigMap, dataSourceRef, paginationRef, } = vue.unref(getPropsRef);
                if (queryFunc) {
                    const res = yield queryFunc({
                        pageRequest: { page: page.current, pageSize: page.pageSize },
                        orderRequest: { orderBy: "", descending: false },
                    });
                    // resultConfigMap undefined,???????????????????????????
                    if (resultConfigMap === undefined) {
                        return (dataSource.value = res);
                    }
                    const { total, data } = resultConfigMap(res);
                    dataSource.value = queryFuncMap ? data.map(queryFuncMap) : data;
                    if (dataSourceRef) {
                        dataSourceRef.value = dataSource.value;
                    }
                    if (querySideEffect && typeof querySideEffect === "function") {
                        querySideEffect(vue.computed(() => dataSource.value).value);
                    }
                    tableMethods.setPagination(Object.assign(Object.assign({}, page), { total }));
                    if (paginationRef) {
                        paginationRef.value = Object.assign(Object.assign({}, page), { total });
                    }
                    tableMethods.setLoading(false);
                }
                else {
                    tableMethods.setLoading(false);
                }
            }
            catch (e) {
                console.log(e);
                tableMethods.setLoading(false);
            }
        });
    }
    function rePageChange() {
        return __awaiter(this, void 0, void 0, function* () {
            yield pageChange({ current: 1 });
        });
    }
    vue.onMounted(() => __awaiter(this, void 0, void 0, function* () {
        if (getPropsRef.value.mounted) {
            yield rePageChange();
        }
    }));
    return {
        pageChange,
        rePageChange,
        getDataSourceRef: vue.computed(() => dataSource.value),
    };
}

var script$6 = vue.defineComponent({
    name: "AoIcon",
    props: {
        icon: {
            type: String,
            default: "",
        },
        prefix: {
            type: String,
            default: "",
        },
        color: {
            type: String,
            default: "",
        },
        size: {
            type: [String, Number],
            default: 22,
        },
    },
    setup(props) {
        const elRef = vue.ref(null);
        const wrapStyleRef = vue.computed(() => {
            const { size, color } = props;
            let fs = size;
            if (typeof size === "string") {
                fs = parseInt(size, 10);
            }
            return {
                fontSize: `${fs}px`,
                color,
                display: "inline-flex",
            };
        });
        const update = () => __awaiter(this, void 0, void 0, function* () {
            const el = vue.unref(elRef);
            if (el) {
                yield vue.nextTick();
                const icon = props.icon;
                let svg;
                if (Iconify__default['default'].renderSVG)
                    svg = Iconify__default['default'].renderSVG(icon, {});
                if (svg) {
                    el.textContent = "";
                    el.appendChild(svg);
                }
                else {
                    const span = document.createElement("span");
                    span.className = "iconify";
                    span.dataset.icon = icon;
                    el.textContent = "";
                    el.appendChild(span);
                }
            }
        });
        const watchStop = vue.watch(() => props.icon, update, { flush: "post" });
        vue.onUnmounted(() => {
            watchStop && watchStop();
        });
        vue.onMounted(update);
        return {
            elRef,
            wrapStyleRef,
        };
    },
});

const _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-484571dd");

const render$6 = /*#__PURE__*/_withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
  return (vue.openBlock(), vue.createBlock("div", {
    ref: "elRef",
    class: "app-iconify anticon",
    style: _ctx.wrapStyleRef
  }, null, 4 /* STYLE */))
});

script$6.render = render$6;
script$6.__scopeId = "data-v-484571dd";
script$6.__file = "src/components/common/Icon.vue";

function getIcon(iconType) {
    const iconMap = {
        warning: { icon: "info-circle-filled", class: "modal-icon-warning" },
        success: { icon: "check-circle-filled", class: "modal-icon-success" },
        info: { icon: "info-circle-filled", class: "modal-icon-info" },
        error: { icon: "close-circle-filled", class: "modal-icon-error" },
    }[iconType];
    return vue.h(script$6, Object.assign(Object.assign({}, iconMap), { icon: "ant-design:" + ((iconMap === null || iconMap === void 0 ? void 0 : iconMap.icon) || "close-circle-filled") }));
}
function createConfirm(options) {
    const iconType = options.iconType || "warning";
    Reflect.deleteProperty(options, "iconType");
    const opt = Object.assign({ centered: true, icon: getIcon(iconType) }, options);
    return antDesignVue.Modal.confirm(opt);
}
const baseOptions = {
    okText: "??????",
    centered: true,
};
function renderContent({ content }) {
    return vue.h("div", {}, content);
}
function createModalOptions(options, icon) {
    return Object.assign(Object.assign(Object.assign({}, baseOptions), options), { content: renderContent(options), icon: getIcon(icon) });
}
const createModal = {
    success: (options) => antDesignVue.Modal.success(createModalOptions(options, "close")),
    info: (options) => antDesignVue.Modal.info(createModalOptions(options, "close")),
    warning: (options) => antDesignVue.Modal.warning(createModalOptions(options, "close")),
    error: (options) => antDesignVue.Modal.error(createModalOptions(options, "close")),
};
function useMessage() {
    return {
        notification: antDesignVue.notification,
        createModal,
        createConfirm,
        createConfirmDel: (content, title) => new Promise((resolve) => {
            createConfirm({
                iconType: "warning",
                title: title || "????????????",
                content,
                okType: "danger",
                onOk() {
                    resolve();
                },
                okText: "??????",
                cancelText: "??????",
            });
        }),
        createConfirmTitle: ({ name, title = "????????????", okType = "danger", content, }) => new Promise((resolve, reject) => {
            createConfirm({
                iconType: "warning",
                title: title,
                content: content !== null && content !== void 0 ? content : vue.h("div", [
                    "??????" + title + " ",
                    vue.h("span", {
                        style: { color: "red" },
                    }, name),
                    " ???",
                ]),
                okType,
                onOk() {
                    resolve();
                },
                onCancel() {
                    reject();
                },
                okText: "??????",
                cancelText: "??????",
            });
        }),
        createMessage: antDesignVue.message,
    };
}

function useBizRemove(getPropsRef, tableMethods, pageChange) {
    const { createConfirmDel, createMessage } = useMessage();
    const removedTitle = vue.computed(() => {
        const { removeTitle } = getPropsRef.value;
        if (removeTitle) {
            if (typeof removeTitle === "string") {
                return `????????????` + getPropsRef.value.removeTitle;
            }
            return removeTitle();
        }
        return "??????????????????";
    });
    function beforeRemoveRef() {
        return __awaiter(this, void 0, void 0, function* () {
            const { removeBefore } = getPropsRef.value;
            return removeBefore && [true, undefined].includes(yield removeBefore());
        });
    }
    function removeFunc(message, idsList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (getPropsRef.value.removeFunc) {
                if (typeof message === "string") {
                    yield createConfirmDel(vue.h("div", [
                        removedTitle.value,
                        vue.h("span", {
                            style: { color: "red" },
                        }, " " + message),
                        " ???",
                    ]));
                }
                else {
                    yield createConfirmDel(message);
                }
                const res = yield getPropsRef.value.removeFunc(idsList);
                if (res !== false) {
                    const msg = getPropsRef.value.removeTitle !== "??????" ? getPropsRef.value.removeTitle : "";
                    createMessage.success(`??????${msg}??????!`);
                }
            }
        });
    }
    function removeItem(record) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield beforeRemoveRef()) {
                let message;
                const { removeLabelFunc, rowKey } = getPropsRef.value;
                if (removeLabelFunc) {
                    message = removeLabelFunc(record, false);
                }
                else {
                    message = record.name;
                }
                yield removeFunc(message, [record[rowKey || "id"]]);
                return true;
            }
            return false;
        });
    }
    function removeItemAuto(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const requested = yield removeItem(record);
            requested && (yield pageChange());
        });
    }
    function removeItems() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield beforeRemoveRef()) {
                const { removeLabelFunc, removeCurrent } = getPropsRef.value;
                const idsList = removeCurrent
                    ? tableMethods.getSelectedRowKeys()
                    : tableMethods.getAllSelectedRowKeys();
                const rows = removeCurrent ? tableMethods.getSelectedRows() : tableMethods.getAllSelectedRows();
                if (idsList.length === 0) {
                    createMessage.error(`??????????????????????????????????????????`);
                    return false;
                }
                let message;
                if (removeLabelFunc) {
                    message = rows.map((i) => removeLabelFunc(i, true));
                }
                else {
                    message = rows.map((i) => i.name);
                }
                yield removeFunc(message.join(" , "), idsList);
                tableMethods.clearSelectedRowKeys();
                return true;
            }
            return false;
        });
    }
    function removeItemsAuto() {
        return __awaiter(this, void 0, void 0, function* () {
            const requested = yield removeItems();
            requested && (yield pageChange());
        });
    }
    return {
        removeItem,
        removeItemAuto,
        removeItems,
        removeItemsAuto,
    };
}

const BizTableProps = {
    queryFuncMap: {
        type: Function,
        default: null,
    },
    removeTitle: {
        type: String,
        default: "??????",
    },
    removeCurrent: {
        type: Boolean,
        default: false,
    },
    mounted: {
        type: Boolean,
        default: true,
    },
    resultConfigMap: {
        type: Function,
        default: (i) => ({
            total: i.pageResult.rowCount,
            data: i.itemsList,
        }),
    },
    removeBefore: {
        type: Function,
        default: () => undefined,
    },
};

var script$5 = vue.defineComponent({
    name: "bizTable",
    components: { BasicTable: script$9, AEmpty: antDesignVue.Empty },
    props: BizTableProps,
    emits: ["register"],
    setup(props, { emit }) {
        const innerRef = vue.ref({});
        const getPropsRef = vue.computed(() => {
            const temp = Object.assign(Object.assign({}, props), innerRef.value);
            if (innerRef.value.dataSourceRef) {
                temp.dataSourceRef = vue.toRef(innerRef.value, "dataSourceRef");
            }
            if (innerRef.value.paginationRef) {
                temp.paginationRef = vue.toRef(innerRef.value, "paginationRef");
            }
            return temp;
        });
        const [register, tableMethods] = useTable(getPropsRef.value);
        function registerEnd() {
            const watchStop = vue.watch(() => vue.unref(getPropsRef), (val) => {
                tableMethods.setProps(Object.assign({ pagination: tableMethods.getPagination() }, val));
            }, {
                immediate: true,
            });
            vue.onUnmounted(() => {
                watchStop && watchStop();
            });
        }
        function setProps(val) {
            // @ts-ignore
            innerRef.value = Object.assign(Object.assign({}, innerRef.value), val);
        }
        const { pageChange, rePageChange, getDataSourceRef } = useBizData(getPropsRef, tableMethods);
        const { removeItem, removeItemAuto, removeItems, removeItemsAuto } = useBizRemove(getPropsRef, tableMethods, pageChange);
        const IBizTableAction = {
            setProps,
            pageChange,
            rePageChange,
            removeItem,
            removeItemAuto,
            removeItems,
            removeItemsAuto,
            getDataSourceRef: () => vue.computed(() => getDataSourceRef.value),
            basic: tableMethods,
        };
        emit("register", IBizTableAction);
        return {
            pageChange,
            getDataSourceRef,
            register,
            registerEnd,
            loadingRef: tableMethods.getLoading(),
        };
    },
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BasicTable = vue.resolveComponent("BasicTable");
  const _component_AEmpty = vue.resolveComponent("AEmpty");

  return (vue.openBlock(), vue.createBlock(vue.Fragment, null, [
    vue.withDirectives(vue.createVNode(_component_BasicTable, {
      onRegister: _ctx.register,
      onRegisterEnd: _ctx.registerEnd,
      onPageChange: _ctx.pageChange,
      dataSource: _ctx.getDataSourceRef
    }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
      vue.renderList(Object.keys(_ctx.$slots), (item) => {
        return {
          name: item,
          fn: vue.withCtx((data) => [
            vue.renderSlot(_ctx.$slots, item, data)
          ])
        }
      })
    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["onRegister", "onRegisterEnd", "onPageChange", "dataSource"]), [
      [vue.vShow, _ctx.getDataSourceRef.length || _ctx.loadingRef]
    ]),
    vue.withDirectives(vue.createVNode(_component_AEmpty, null, null, 512 /* NEED_PATCH */), [
      [vue.vShow, !_ctx.getDataSourceRef.length && !_ctx.loadingRef]
    ])
  ], 64 /* STABLE_FRAGMENT */))
}

script$5.render = render$5;
script$5.__file = "src/components/biz/bizTable/bizTable.vue";

function useBizTable(props) {
    const actionRef = vue.ref();
    function register(actions) {
        actionRef.value = actions;
        actions.setProps(props);
    }
    function getInstance() {
        if (!actionRef.value) {
            throw new Error("biz table has no instance");
        }
        return actionRef.value;
    }
    const actions = {
        setProps: (props) => getInstance().setProps(props),
        pageChange: (arg) => getInstance().pageChange(arg),
        rePageChange: () => getInstance().rePageChange(),
        removeItem: (item) => getInstance().removeItem(item),
        removeItemAuto: (item) => getInstance().removeItemAuto(item),
        removeItems: () => getInstance().removeItems(),
        removeItemsAuto: () => getInstance().removeItemsAuto(),
        getDataSourceRef: () => getInstance().getDataSourceRef(),
        basic: getTableMethods(() => getInstance().basic),
    };
    return [register, actions];
}

function useModalFunc(getPropsRef, methods, modalMethods, model, setModel, isAddRef) {
    function sucMsg(type) {
        const { title } = getPropsRef.value;
        if (typeof title === "function") {
            antDesignVue.message.success(title(isAddRef.value, model) + "?????????");
        }
        else {
            antDesignVue.message.success(title + `${type}?????????`);
        }
    }
    function okFunc() {
        return __awaiter(this, void 0, void 0, function* () {
            const { onOk, onAdd, onEdit, commonMap, addMap, editMap, afterAdd, afterEdit, pageChange, rePageChange, } = vue.unref(getPropsRef);
            try {
                yield methods.validate();
                Reflect.deleteProperty(model, "isTrusted");
                commonMap && setModel(yield commonMap(model));
                if (onOk) {
                    yield onOk(model);
                }
                else {
                    if (onAdd && model.id === undefined) {
                        addMap && setModel(yield addMap(model));
                        const res = yield onAdd(model);
                        if (afterAdd) {
                            yield afterAdd(model, res);
                        }
                        else {
                            sucMsg("??????");
                            if (rePageChange) {
                                yield rePageChange();
                            }
                            else if (pageChange) {
                                yield pageChange({ pageSize: 1 });
                            }
                        }
                    }
                    if (onEdit && model.id !== undefined) {
                        editMap && setModel(yield editMap(model));
                        const res = yield onEdit(model);
                        if (afterEdit) {
                            yield afterEdit(model, res);
                        }
                        else {
                            sucMsg("??????");
                            pageChange && (yield pageChange());
                        }
                    }
                }
                yield modalMethods.closeModal();
            }
            catch (e) {
                modalMethods.closeLoading();
            }
        });
    }
    function cancelFunc() {
        return __awaiter(this, void 0, void 0, function* () {
            const { onCancel } = vue.unref(getPropsRef);
            onCancel && (yield onCancel());
            yield modalMethods.closeModal();
        });
    }
    return {
        cancelFunc,
        okFunc,
    };
}

function useModalOpen(getPropsRef, methods, modalMethods, model) {
    const isAddRef = vue.ref(false);
    function setModel(val) {
        Object.assign(model, val);
    }
    function openFunc() {
        return __awaiter(this, void 0, void 0, function* () {
            yield modalMethods.openModal();
            methods.resetFields();
            methods.setProps(getPropsRef.value);
        });
    }
    function openNew(initial) {
        return __awaiter(this, void 0, void 0, function* () {
            yield openFunc();
            isAddRef.value = true;
            model.id = undefined;
            if (initial) {
                setModel(lodashEs.cloneDeep(initial));
            }
        });
    }
    function openEdit(initial) {
        return __awaiter(this, void 0, void 0, function* () {
            yield openFunc();
            isAddRef.value = false;
            setModel(lodashEs.cloneDeep(initial));
        });
    }
    const watchStop = vue.watch(() => getPropsRef.value.initModel, (val) => {
        if (val) {
            const res = typeof val === "object" ? val : val();
            setModel(lodashEs.cloneDeep(res));
        }
    });
    vue.onUnmounted(() => {
        watchStop && watchStop();
    });
    const titleRef = vue.computed(() => {
        const { title } = vue.unref(getPropsRef);
        if (title) {
            if (typeof title === "string") {
                return (isAddRef.value ? "??????" : "??????") + title;
            }
            return title(isAddRef.value, model);
        }
        return undefined;
    });
    return {
        isAddRef: vue.computed(() => vue.unref(isAddRef)),
        titleRef,
        openEdit,
        openNew,
        setModel,
    };
}

var script$4 = vue.defineComponent({
    name: "FormModal",
    components: { BasicForm: script$8, BasicModal: script$7 },
    emits: ["register"],
    setup(props, { emit }) {
        const model = vue.reactive({});
        const innerRef = vue.ref({});
        const getPropsRef = vue.computed(() => {
            const temp = Object.assign(Object.assign({}, props), innerRef.value);
            if (innerRef.value.modelRef) {
                temp.modelRef = vue.toRef(innerRef.value, "modelRef");
            }
            return temp;
        });
        const watchStop = vue.watch(() => model, () => {
            const { modelRef } = getPropsRef.value;
            if (modelRef) {
                modelRef.value = model;
            }
        }, {
            deep: true,
        });
        vue.onUnmounted(() => {
            watchStop && watchStop();
        });
        const [register, modalMethods] = useModal({});
        const [registerForm, formMethods] = useForm({});
        const { isAddRef, openNew, openEdit, setModel, titleRef } = useModalOpen(getPropsRef, formMethods, modalMethods, model);
        const { cancelFunc, okFunc } = useModalFunc(getPropsRef, formMethods, modalMethods, model, setModel, isAddRef);
        function setProps(props) {
            return __awaiter(this, void 0, void 0, function* () {
                yield vue.nextTick();
                innerRef.value = props;
                modalMethods.setOk(okFunc);
                if (getPropsRef.value.onCancel) {
                    modalMethods.setCancel(cancelFunc);
                }
            });
        }
        function openAddModal(...param) {
            const { openAddModal: openAdd } = getPropsRef.value;
            openAdd && openAdd(...param);
        }
        function openEditModal(...param) {
            const { openEditModal: openE } = getPropsRef.value;
            openE && openE(...param);
        }
        const regFormModal = {
            modal: modalMethods,
            form: formMethods,
            getModelRef: () => vue.computed(() => model),
            setModel,
            setProps,
            openNew,
            openEdit,
            openAddModal,
            openEditModal,
        };
        emit("register", regFormModal);
        return {
            register,
            registerForm,
            isAddRef,
            model,
            titleRef,
        };
    },
});

function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BasicForm = vue.resolveComponent("BasicForm");
  const _component_BasicModal = vue.resolveComponent("BasicModal");

  return (vue.openBlock(), vue.createBlock(_component_BasicModal, vue.mergeProps({ onRegister: _ctx.register }, _ctx.$attrs.modal, { title: _ctx.titleRef }), {
    default: vue.withCtx(() => [
      vue.renderSlot(_ctx.$slots, "header", {
        model: _ctx.model,
        isAdd: _ctx.isAddRef
      }),
      vue.createVNode(_component_BasicForm, vue.mergeProps({ onRegister: _ctx.registerForm }, _ctx.$attrs.form, { model: _ctx.model }), {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "form", {
            model: _ctx.model,
            isAdd: _ctx.isAddRef
          })
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["onRegister", "model"]),
      vue.renderSlot(_ctx.$slots, "footer", {
        model: _ctx.model,
        isAdd: _ctx.isAddRef
      })
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["onRegister", "title"]))
}

script$4.render = render$4;
script$4.__file = "src/components/biz/FormModal/FormModal.vue";

function useFormModal(props) {
    const formModalRef = vue.ref();
    function register(actions) {
        formModalRef.value = actions;
        actions.setProps(props);
    }
    function getFormModalInstance() {
        if (!formModalRef.value) {
            throw new Error("modal instance has not ready");
        }
        return vue.unref(formModalRef);
    }
    const methods = {
        openNew: (i) => getFormModalInstance().openNew(i),
        openEdit: (i) => getFormModalInstance().openEdit(i),
        setProps: (props) => getFormModalInstance().setProps(props),
        setModel: (val) => getFormModalInstance().setModel(val),
        getModelRef: () => getFormModalInstance().getModelRef(),
        openAddModal: (...param) => getFormModalInstance().openAddModal(...param),
        openEditModal: (...param) => getFormModalInstance().openEditModal(...param),
        modal: getModalMethods(() => getFormModalInstance().modal),
        form: getFormMethods(() => getFormModalInstance().form),
    };
    return [register, methods];
}

function getArrayBuffer(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsArrayBuffer(img);
}
var script$3 = vue.defineComponent({
    name: "img-upload",
    components: { PlusOutlined: iconsVue.PlusOutlined },
    props: {
        text: {
            type: String,
            default: "????????????",
        },
        url: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        var _a;
        // ????????????
        const hasUpload = vue.ref(false);
        const fileList = vue.ref([]);
        const imageUrl = vue.ref((_a = props.url) !== null && _a !== void 0 ? _a : "");
        const imageBuffer = vue.ref();
        function get_image(arr_buffer) {
            const uInt8Array = new Uint8Array(arr_buffer);
            let i = uInt8Array.length;
            const binaryString = new Array(i);
            while (i--) {
                binaryString[i] = String.fromCharCode(uInt8Array[i]);
            }
            const data = binaryString.join("");
            return "data:image/png;base64," + window.btoa(data);
        }
        const handleChange = (info) => {
            getArrayBuffer(info.file.originFileObj, (arrayBuffer) => {
                imageBuffer.value = arrayBuffer;
                imageUrl.value = get_image(arrayBuffer);
            });
            fileList.value = info.fileList.slice(-1);
            hasUpload.value = true;
        };
        const beforeUpload = (file) => {
            const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
                antDesignVue.message.error("You can only upload JPG file!");
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                antDesignVue.message.error("?????????????????? 2MB!");
            }
            return isJpgOrPng && isLt2M;
        };
        function setImgPath(path) {
            imageUrl.value = path ? "data:image/png;base64," + path : "";
            fileList.value = [];
            hasUpload.value = false;
        }
        function setImgPathSite(path) {
            imageUrl.value = path !== null && path !== void 0 ? path : "";
            fileList.value = [];
            hasUpload.value = false;
        }
        function upload() {
            if (!hasUpload.value || fileList.value.length === 0) {
                return "";
            }
            return new Uint8Array(imageBuffer.value);
            // const formDate = new FormData();
            // formDate.append("files", fileList.value[0].originFileObj);
            // const res = await FileService.uploadFile(formDate);
            // return res[0];
        }
        function uploadContent() {
            if (!hasUpload.value || fileList.value.length === 0) {
                return;
            }
            return {
                fileInfo: {
                    url: "",
                    fid: "",
                    name: fileList.value[0].name,
                    size: fileList.value[0].size,
                },
            };
        }
        return {
            fileList,
            imageUrl,
            beforeUpload,
            handleChange,
            setImgPath,
            setImgPathSite,
            upload,
            uploadContent,
        };
    },
});

const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-689c368f");

vue.pushScopeId("data-v-689c368f");
const _hoisted_1$1 = { key: 1 };
const _hoisted_2 = { class: "ant-upload-text" };
vue.popScopeId();

const render$3 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_PlusOutlined = vue.resolveComponent("PlusOutlined");
  const _component_a_upload = vue.resolveComponent("a-upload");

  return (vue.openBlock(), vue.createBlock(_component_a_upload, {
    "file-list": _ctx.fileList,
    name: "avatar",
    "list-type": "picture-card",
    "show-upload-list": false,
    "before-upload": _ctx.beforeUpload,
    action: null,
    customRequest: () => {},
    onChange: _ctx.handleChange
  }, {
    default: _withId$1(() => [
      (_ctx.imageUrl)
        ? (vue.openBlock(), vue.createBlock("img", {
            key: 0,
            class: "img-view",
            src: _ctx.imageUrl,
            alt: "avatar"
          }, null, 8 /* PROPS */, ["src"]))
        : (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
            vue.createVNode(_component_PlusOutlined),
            vue.createVNode("div", _hoisted_2, vue.toDisplayString(_ctx.text), 1 /* TEXT */)
          ]))
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["file-list", "before-upload", "customRequest", "onChange"]))
});

script$3.render = render$3;
script$3.__scopeId = "data-v-689c368f";
script$3.__file = "src/components/common/img-upload.vue";

const importFile = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            const bstr = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result;
            const wb = XLSX__default['default'].read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX__default['default'].utils.sheet_to_json(ws, { header: 1 });
            const make_cols = (refstr) => Array(XLSX__default['default'].utils.decode_range(refstr).e.c + 1)
                .fill(0)
                .map((x, i) => ({ name: XLSX__default['default'].utils.encode_col(i), key: i }));
            const res = {
                data,
                cols: make_cols(ws["!ref"]),
            };
            resolve(res);
        };
        reader.readAsBinaryString(file);
    });
};

var script$2 = vue.defineComponent({
    name: "file-upload",
    components: { UploadOutlined: iconsVue.UploadOutlined },
    setup() {
        const fileList = vue.ref([]);
        const { createMessage } = useMessage();
        const handleChange = (info) => {
            if (info.fileList.length > 1) {
                createMessage.error("?????????????????????excel??????");
            }
            fileList.value = info.fileList.slice(-1);
        };
        function parseExcel() {
            return __awaiter(this, void 0, void 0, function* () {
                if (fileList.value.length) {
                    const file = fileList.value[0];
                    if (file && file.originFileObj) {
                        return yield importFile(file.originFileObj);
                    }
                }
                else {
                    createMessage.error("????????????????????????????????????!");
                }
            });
        }
        function clearFile() {
            fileList.value = [];
        }
        return {
            fileList,
            handleChange,
            parseExcel,
            clearFile,
        };
    },
});

const _hoisted_1 = /*#__PURE__*/vue.createVNode("span", { class: "ant-upload-text" }, "??????", -1 /* HOISTED */);

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_UploadOutlined = vue.resolveComponent("UploadOutlined");
  const _component_a_button = vue.resolveComponent("a-button");
  const _component_a_upload = vue.resolveComponent("a-upload");

  return (vue.openBlock(), vue.createBlock(_component_a_upload, {
    "file-list": _ctx.fileList,
    "onUpdate:file-list": _cache[1] || (_cache[1] = $event => (_ctx.fileList = $event)),
    name: "file",
    accept: ".xlsx",
    multiple: true,
    action: null,
    "before-upload": () => false,
    customRequest: () => {},
    onChange: _ctx.handleChange
  }, {
    default: vue.withCtx(() => [
      vue.createVNode(_component_a_button, null, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_UploadOutlined),
          _hoisted_1
        ]),
        _: 1 /* STABLE */
      })
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["file-list", "before-upload", "customRequest", "onChange"]))
}

script$2.render = render$2;
script$2.__file = "src/components/common/file-upload.vue";

var script$1 = vue.defineComponent({
    name: "TelePort",
    setup() {
        const mounted = vue.ref(false);
        vue.onMounted(() => (mounted.value = true));
        return {
            mounted,
        };
    },
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.mounted)
    ? (vue.openBlock(), vue.createBlock(vue.Teleport, vue.mergeProps({ key: 0 }, _ctx.$attrs), [
        vue.renderSlot(_ctx.$slots, "default")
      ], 16 /* FULL_PROPS */))
    : vue.createCommentVNode("v-if", true)
}

script$1.render = render$1;
script$1.__file = "src/components/common/tele-port.vue";

var script = vue.defineComponent({
    name: "IconButton",
    components: {
        FileSearchOutlined: iconsVue.FileSearchOutlined,
        ExportOutlined: iconsVue.ExportOutlined,
        IdcardOutlined: iconsVue.IdcardOutlined,
        PrinterOutlined: iconsVue.PrinterOutlined,
        SearchOutlined: iconsVue.SearchOutlined,
        DeleteOutlined: iconsVue.DeleteOutlined,
        PlusOutlined: iconsVue.PlusOutlined,
        UndoOutlined: iconsVue.UndoOutlined,
        FormOutlined: iconsVue.FormOutlined,
        DownloadOutlined: iconsVue.DownloadOutlined,
        UploadOutlined: iconsVue.UploadOutlined,
    },
    props: {
        add: Boolean,
        edit: Boolean,
        remove: Boolean,
        search: Boolean,
        upload: Boolean,
        reset: Boolean,
        download: Boolean,
        idCard: Boolean,
        print: Boolean,
        publish: Boolean,
        detail: Boolean,
        icon: Boolean,
        primary: Boolean,
        link: Boolean,
        danger: Boolean,
    },
    setup(props) {
        let type = "";
        switch (true) {
            case props.primary:
                type = "primary";
                break;
            case props.danger:
                type = "danger";
                break;
            case props.link:
                type = "link";
                break;
        }
        const getRef = vue.computed(() => {
            return {
                type: type === "" ? undefined : type,
            };
        });
        return {
            getRef,
        };
    },
});

const _withId = /*#__PURE__*/vue.withScopeId("data-v-452c1df2");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_PlusOutlined = vue.resolveComponent("PlusOutlined");
  const _component_SearchOutlined = vue.resolveComponent("SearchOutlined");
  const _component_DeleteOutlined = vue.resolveComponent("DeleteOutlined");
  const _component_FormOutlined = vue.resolveComponent("FormOutlined");
  const _component_DownloadOutlined = vue.resolveComponent("DownloadOutlined");
  const _component_UploadOutlined = vue.resolveComponent("UploadOutlined");
  const _component_UndoOutlined = vue.resolveComponent("UndoOutlined");
  const _component_PrinterOutlined = vue.resolveComponent("PrinterOutlined");
  const _component_IdcardOutlined = vue.resolveComponent("IdcardOutlined");
  const _component_ExportOutlined = vue.resolveComponent("ExportOutlined");
  const _component_FileSearchOutlined = vue.resolveComponent("FileSearchOutlined");
  const _component_a_button = vue.resolveComponent("a-button");

  return (vue.openBlock(), vue.createBlock(_component_a_button, vue.mergeProps(_ctx.getRef, { class: "icon-button" }), vue.createSlots({
    default: _withId(() => [
      vue.renderSlot(_ctx.$slots, "customIcon"),
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 2 /* DYNAMIC */
  }, [
    (_ctx.icon)
      ? {
          name: "icon",
          fn: _withId(() => [
            (_ctx.add)
              ? (vue.openBlock(), vue.createBlock(_component_PlusOutlined, { key: 0 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.search)
              ? (vue.openBlock(), vue.createBlock(_component_SearchOutlined, { key: 1 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.remove)
              ? (vue.openBlock(), vue.createBlock(_component_DeleteOutlined, { key: 2 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.edit)
              ? (vue.openBlock(), vue.createBlock(_component_FormOutlined, { key: 3 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.download)
              ? (vue.openBlock(), vue.createBlock(_component_DownloadOutlined, { key: 4 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.upload)
              ? (vue.openBlock(), vue.createBlock(_component_UploadOutlined, { key: 5 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.reset)
              ? (vue.openBlock(), vue.createBlock(_component_UndoOutlined, { key: 6 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.print)
              ? (vue.openBlock(), vue.createBlock(_component_PrinterOutlined, { key: 7 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.idCard)
              ? (vue.openBlock(), vue.createBlock(_component_IdcardOutlined, { key: 8 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.publish)
              ? (vue.openBlock(), vue.createBlock(_component_ExportOutlined, { key: 9 }))
              : vue.createCommentVNode("v-if", true),
            (_ctx.detail)
              ? (vue.openBlock(), vue.createBlock(_component_FileSearchOutlined, { key: 10 }))
              : vue.createCommentVNode("v-if", true)
          ])
        }
      : undefined
  ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */))
});

script.render = render;
script.__scopeId = "data-v-452c1df2";
script.__file = "src/components/common/icon-button.vue";

exports.AoIcon = script$6;
exports.BasicForm = script$8;
exports.BasicModal = script$7;
exports.BasicTable = script$9;
exports.BizTable = script$5;
exports.FileUpload = script$2;
exports.FormModal = script$4;
exports.IconButton = script;
exports.ImgUpload = script$3;
exports.TelePort = script$1;
exports.useBizTable = useBizTable;
exports.useForm = useForm;
exports.useFormModal = useFormModal;
exports.useLoading = useLoading;
exports.useMessage = useMessage;
exports.useModal = useModal;
exports.usePagination = usePagination;
exports.useTable = useTable;
