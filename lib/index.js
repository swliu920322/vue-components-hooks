'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var antDesignVue = require('ant-design-vue');
var iconsVue = require('@ant-design/icons-vue');
var XLSX = require('xlsx');
var Iconify = require('@purge-icons/generated');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var XLSX__default = /*#__PURE__*/_interopDefaultLegacy(XLSX);
var Iconify__default = /*#__PURE__*/_interopDefaultLegacy(Iconify);

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var basicTableProps = {
    columns: {
        type: Array,
        default: function () { return []; },
    },
    dataSource: {
        type: Array,
        default: function () { return []; },
    },
    indexColumn: {
        type: [Boolean, String],
        default: "序号",
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
        default: function () { return ({}); },
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
    var columnsRef = vue.ref(propsRef.value.columns || []);
    vue.watch(function () { return vue.unref(propsRef).columns; }, function (val) {
        if (val) {
            if (vue.unref(propsRef).columnsAlign) {
                // @ts-ignore
                columnsRef.value = val.map(function (i) { return (__assign(__assign({}, i), { align: i.align || vue.unref(propsRef).columnsAlign })); });
            }
            else {
                columnsRef.value = val;
            }
        }
    });
    var getColumnRef = vue.computed(function () {
        var getPagination = vue.unref(getPaginationRef);
        var columns = columnsRef.value;
        var _a = vue.unref(propsRef), indexColumn = _a.indexColumn, indexColumnFixed = _a.indexColumnFixed;
        var existIndex = columns.findIndex(function (i) { return i.flag === "INDEX"; });
        if (existIndex > -1) {
            columns.splice(existIndex, 1);
        }
        var isFixedLeft = columns.some(function (item) { return item.fixed === "left"; });
        if (indexColumn) {
            columns.unshift(__assign(__assign({ flag: "INDEX", title: "序号", width: 50, align: "center", customRender: function (_a) {
                    var index = _a.index;
                    if (typeof getPagination === "boolean") {
                        return "" + (index + 1);
                    }
                    var _b = getPagination.current, current = _b === void 0 ? 1 : _b, _c = getPagination.pageSize, pageSize = _c === void 0 ? 10 : _c;
                    return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
                } }, (isFixedLeft ? { fixed: "left" } : {})), (indexColumnFixed ? { fixed: "left" } : {})));
        }
        return columnsRef.value;
    });
    return {
        getColumnRef: getColumnRef,
    };
}

function useDataSource(propsRef) {
    var dataSourceRef = vue.ref(vue.unref(propsRef).dataSource || []);
    return {
        setDataSource: function (val) {
            dataSourceRef.value = val;
        },
        getDataSourceRef: vue.computed(function () { return dataSourceRef.value; }),
    };
}

function useRowSelection(propsRef, getDataSourceRef, emit) {
    var selectedRowsRef = vue.ref([]);
    var selectedRowsAllRef = vue.reactive({});
    var selectedRowKeysRef = vue.ref([]);
    var getRowSelectionRef = vue.computed(function () {
        var rowSelection = vue.unref(propsRef).rowSelection;
        if (!rowSelection) {
            return null;
        }
        return __assign({ selectedRowKeys: vue.unref(selectedRowKeysRef), hideDefaultSelections: false, columnWidth: 40, onChange: function (selectedRowKeys, selectedRows) {
                var rowKey = propsRef.value.rowKey || "id";
                selectedRows.forEach(function (i) {
                    selectedRowsAllRef[i[rowKey]] = i;
                });
                Object.keys(selectedRowsAllRef).forEach(function (key) {
                    if (selectedRowKeys.findIndex(function (ii) { return ii === key; }) === -1) {
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
        var rowKey = vue.unref(propsRef).rowKey;
        if (rowKey) {
            selectedRowsRef.value = vue.unref(getDataSourceRef).filter(function (item) { return rowKeys.includes(item[rowKey]); });
        }
    }
    function clearSelectedRowKeys() {
        selectedRowsRef.value = [];
        selectedRowKeysRef.value = [];
    }
    return {
        getAllSelectedRows: function () { return vue.unref(Object.values(selectedRowsAllRef)); },
        getAllSelectedRowKeys: function () { return vue.unref(selectedRowKeysRef); },
        getSelectedRows: function () { return vue.unref(selectedRowsRef); },
        getSelectedRowKeys: function () { return vue.unref(selectedRowsRef.value.map(function (i) { return i[propsRef.value.rowKey || "id"]; })); },
        setSelectedRowKeys: setSelectedRowKeys,
        getRowSelectionRef: getRowSelectionRef,
        clearSelectedRowKeys: clearSelectedRowKeys,
    };
}

function once(cb, delay) {
    if (delay === void 0) { delay = 2000; }
    var deal = true;
    return function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
        if (deal) {
            cb.call(null, arg);
            deal = false;
            setTimeout(function () {
                deal = true;
            }, delay);
        }
    };
}
function throttle(callback, delay) {
    if (delay === void 0) { delay = 20; }
    var timer = 0;
    return function tt() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            return;
        }
        timer = setTimeout(function () {
            callback.apply(null, __spreadArrays(args));
            clearTimeout(timer);
            timer = 0;
        }, delay);
    };
}

function useTableScroll(propsRef, _a) {
    var containerRef = _a.containerRef, getColumnRef = _a.getColumnRef, tableRef = _a.tableRef, getPaginationRef = _a.getPaginationRef, getRowSelectionRef = _a.getRowSelectionRef;
    // 是否开启
    var scrollXRef = vue.ref(propsRef.value.scrollX || false);
    var scrollYRef = vue.ref(propsRef.value.scrollY || true);
    // 滚动高度
    var scrollYHeight = vue.ref(0);
    vue.watch(function () { return propsRef.value.scrollX; }, function (val) {
        if (val !== undefined) {
            scrollXRef.value = val;
        }
    });
    vue.watch(function () { return propsRef.value.scrollY; }, function (val) {
        if (val !== undefined) {
            scrollYRef.value = val;
        }
    });
    var getScrollX = vue.computed(function () {
        var _a, _b, _c;
        var width = 0;
        if (vue.unref(getRowSelectionRef)) {
            width += 40;
        }
        getColumnRef.value.forEach(function (i) {
            if (i.width) {
                width += parseInt(i.width, 10) || 0;
            }
            else {
                width += 150;
            }
        });
        var tableWidth = (_c = (_b = (_a = tableRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth) !== null && _c !== void 0 ? _c : 0;
        return tableWidth > width ? "100%" : width;
    });
    function getScrollHeight() {
        var _a, _b;
        if (scrollYRef.value) {
            var containerHeight = (_a = vue.unref(containerRef)) === null || _a === void 0 ? void 0 : _a.clientHeight;
            var tableCurHeight = ((_b = vue.unref(tableRef)) === null || _b === void 0 ? void 0 : _b.$el) ? vue.unref(tableRef).$el.clientHeight : 0;
            var hasPagination = vue.unref(getPaginationRef) !== false;
            if (tableCurHeight && containerHeight) {
                var headEl = vue.unref(tableRef).$el.querySelector(".ant-table-thead ");
                var paginationEl = vue.unref(tableRef).$el.querySelector(".ant-pagination");
                scrollYHeight.value =
                    containerHeight -
                        (hasPagination && paginationEl ? paginationEl.clientHeight + 17 : 0) -
                        headEl.clientHeight;
            }
        }
    }
    function checkScroll() {
        var fn = throttle(getScrollHeight);
        window.removeEventListener("resize", fn);
        window.addEventListener("resize", fn);
        vue.onUnmounted(function () {
            window.removeEventListener("resize", fn);
        });
    }
    checkScroll();
    var getScrollRef = vue.computed(function () {
        var _a;
        return {
            x: scrollXRef.value ? vue.unref(getScrollX) : null,
            y: (_a = scrollYHeight.value) !== null && _a !== void 0 ? _a : null,
        };
    });
    return {
        getScrollRef: getScrollRef,
        checkScroll: checkScroll,
        getScrollHeight: getScrollHeight,
    };
}

function useTableStyle(propsRef) {
    function getRowClassName(record, index) {
        var striped = vue.unref(propsRef).striped;
        if (striped && (index || 0) % 2 === 1) {
            return "ao-row__striped";
        }
        return "";
    }
    var stripedColor = vue.ref(propsRef.value.striped || "#fafafa");
    vue.watch(function () { return propsRef.value.striped; }, function (val) {
        if (val) {
            stripedColor.value = val;
        }
    });
    return {
        getStripedColorRef: stripedColor,
        setStripedColor: function (val) { return (stripedColor.value = val); },
        getRowClassName: getRowClassName,
    };
}

var getTableMethods = function (getInstance) { return ({
    setPagination: function (pagination) { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setPagination(pagination); },
    getPagination: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getPagination(); },
    getDataSource: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getDataSource(); },
    setDataSource: function (val) { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setDataSource(val); },
    setLoading: function (val) { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setLoading(val); },
    setSelectedRowKeys: function (rowKeys) { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setSelectedRowKeys(rowKeys); },
    getSelectedRows: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getSelectedRows(); },
    getSelectedRowKeys: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getSelectedRowKeys(); },
    getAllSelectedRows: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getAllSelectedRows(); },
    getAllSelectedRowKeys: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.getAllSelectedRowKeys(); },
    clearSelectedRowKeys: function () { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.clearSelectedRowKeys(); },
}); };
function useTable(props) {
    var tableRef = vue.ref();
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
    var tableMethods = __assign({ setProps: function (params) { var _a; return (_a = getInstance()) === null || _a === void 0 ? void 0 : _a.setProps(params); } }, getTableMethods(getInstance));
    return [register, tableMethods];
}

var script$9 = vue.defineComponent({
    name: "basic-table",
    components: {},
    props: basicTableProps,
    emits: ["register", "pageChange", "registerEnd"],
    setup: function (props, _a) {
        var attrs = _a.attrs, emit = _a.emit;
        var tableRef = vue.ref();
        var containerRef = vue.ref();
        var innerRef = vue.ref();
        var getPropsRef = vue.computed(function () {
            return __assign(__assign({}, props), vue.unref(innerRef));
        });
        var _b = usePagination(emit), setPagination = _b.setPagination, getPaginationRef = _b.getPaginationRef;
        function setProps(props) {
            if (props.pagination !== undefined) {
                setPagination(props.pagination);
            }
            innerRef.value = __assign(__assign({}, innerRef.value), props);
        }
        var getColumnRef = useColumns(getPropsRef, getPaginationRef).getColumnRef;
        var getRowClassName = useTableStyle(getPropsRef).getRowClassName;
        var _c = useDataSource(getPropsRef), getDataSourceRef = _c.getDataSourceRef, setDataSource = _c.setDataSource;
        vue.watch(function () { return vue.unref(getPropsRef).dataSource; }, function (val) {
            if (val) {
                setDataSource(val);
                vue.nextTick(function () {
                    getScrollHeight();
                });
            }
        });
        var _d = useRowSelection(getPropsRef, getDataSourceRef, emit), getRowSelectionRef = _d.getRowSelectionRef, setSelectedRowKeys = _d.setSelectedRowKeys, getSelectedRowKeys = _d.getSelectedRowKeys, getSelectedRows = _d.getSelectedRows, getAllSelectedRows = _d.getAllSelectedRows, getAllSelectedRowKeys = _d.getAllSelectedRowKeys, clearSelectedRowKeys = _d.clearSelectedRowKeys;
        // @ts-ignore
        var _e = useTableScroll(getPropsRef, {
            containerRef: containerRef,
            getColumnRef: getColumnRef,
            getPaginationRef: getPaginationRef,
            tableRef: tableRef,
            getRowSelectionRef: getRowSelectionRef,
        }), getScrollRef = _e.getScrollRef, getScrollHeight = _e.getScrollHeight;
        var _f = useLoading(), setLoading = _f.setLoading, getLoadingRef = _f.getLoadingRef;
        var getBindRef = vue.computed(function () {
            var _a, _b;
            return __assign(__assign(__assign({}, attrs), vue.unref(getPropsRef)), { columns: vue.unref(getColumnRef), pagination: vue.unref(getPaginationRef), rowClassName: getRowClassName, scroll: __assign(__assign({}, vue.unref(getScrollRef)), ((_a = attrs.scroll) !== null && _a !== void 0 ? _a : {})), dataSource: vue.unref(getDataSourceRef), rowSelection: vue.unref(getRowSelectionRef), loading: ((_b = attrs.loading) !== null && _b !== void 0 ? _b : false) || vue.unref(getLoadingRef) });
        });
        vue.onMounted(function () {
            vue.nextTick(function () {
                vue.watch(function () { return getBindRef.value.dataSource; }, function () {
                    getScrollHeight();
                }, {
                    immediate: true,
                });
            });
        });
        var actions = {
            setProps: setProps,
            getDataSource: function () { return vue.unref(getDataSourceRef); },
            setDataSource: setDataSource,
            setPagination: setPagination,
            setLoading: setLoading,
            getPagination: function () { return vue.unref(getPaginationRef); },
            getSelectedRowKeys: getSelectedRowKeys,
            getSelectedRows: getSelectedRows,
            getAllSelectedRows: getAllSelectedRows,
            getAllSelectedRowKeys: getAllSelectedRowKeys,
            setSelectedRowKeys: setSelectedRowKeys,
            clearSelectedRowKeys: clearSelectedRowKeys,
        };
        emit("register", actions);
        emit("registerEnd");
        return {
            getBindRef: getBindRef,
            tableRef: tableRef,
            containerRef: containerRef,
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
    vue.createVNode(_component_ATable, vue.mergeProps({ ref: "tableRef" }, _ctx.getBindRef, {
      rowClassName: (record, index) => (index % 2 === 1 ? null : 'table-striped')
    }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
      vue.renderList(Object.keys(_ctx.$slots), (item) => {
        return {
          name: item,
          fn: _withId$3((data) => [
            vue.renderSlot(_ctx.$slots, item, data)
          ])
        }
      })
    ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["rowClassName"])
  ], 512 /* NEED_PATCH */))
});

script$9.render = render$9;
script$9.__scopeId = "data-v-33b94c9a";
script$9.__file = "src/components/common/table/basic-table.vue";

function useCols(propsRef) {
    var colRef = vue.ref(propsRef.value.col || [6, 18]);
    function setCol(val) {
        colRef.value = val;
    }
    vue.watch(function () { return vue.unref(propsRef).col; }, function (val) {
        val && setCol(val);
    });
    var getColRef = vue.computed(function () {
        if (propsRef.value.layout === "inline") {
            return {
                labelCol: undefined,
                wrapperCol: undefined,
            };
        }
        var _a = vue.unref(colRef), label = _a[0], wrapper = _a[1];
        var labelCol = { span: vue.unref(colRef)[0] };
        var wrapperCol = { span: vue.unref(colRef)[1] };
        var all = label + wrapper;
        if (24 % all === 0) {
            var ratio = 24 / all;
            labelCol.span = ratio * label;
            wrapperCol.span = ratio * wrapper;
        }
        return {
            labelCol: labelCol,
            wrapperCol: wrapperCol,
        };
    });
    return {
        setCol: setCol,
        getColRef: getColRef,
    };
}

var script$8 = vue.defineComponent({
    name: "basic-form",
    inheritAttrs: false,
    emits: ["register"],
    setup: function (props, _a) {
        var attrs = _a.attrs, emit = _a.emit;
        var formRef = vue.ref();
        var innerRef = vue.ref();
        var getProps = vue.computed(function () {
            return __assign(__assign({}, props), vue.unref(innerRef));
        });
        var setProps = function (value) {
            innerRef.value = __assign(__assign({}, innerRef.value), value);
        };
        var getColRef = useCols(getProps).getColRef;
        var getBindRef = vue.computed(function () {
            return __assign(__assign(__assign(__assign({}, props), attrs), vue.unref(getProps)), { labelCol: vue.unref(getColRef).labelCol, wrapperCol: vue.unref(getColRef).wrapperCol });
        });
        var getSizeRef = vue.computed(function () {
            return {
                size: vue.unref(getProps).size || "default",
            };
        });
        var formAction = {
            setProps: setProps,
            validate: function () { return formRef.value.validate(); },
            resetFields: function () { return formRef.value.resetFields(); },
            clearValidate: function () { return formRef.value.clearValidate(); },
            scrollToField: function (name, options) { return formRef.value.scrollToField(name, options); },
        };
        emit("register", formAction);
        return {
            getBindRef: getBindRef,
            formRef: formRef,
            getSizeRef: getSizeRef,
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

var getFormMethods = function (getInstance) {
    return {
        validate: function () { return getInstance().validate(); },
        resetFields: function () { return getInstance().resetFields(); },
        clearValidate: function () { return getInstance().clearValidate(); },
        scrollToField: function (name, options) { return getInstance().scrollToField(name, options); },
    };
};
function useForm(props) {
    var formRef = vue.ref();
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
    var methods = __assign({ setProps: function (props) { var _a; return (_a = getFormInstance()) === null || _a === void 0 ? void 0 : _a.setProps(props); } }, getFormMethods(getFormInstance));
    return [register, methods];
}

var basicModalProps = {
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
        default: function () { },
    },
    ok: {
        type: Function,
        default: function () { },
    },
};

function useVisible() {
    var visible = vue.ref(false);
    var okFunc = vue.ref(function () {
        closeModal();
    });
    var cancelFunc = vue.ref(function () {
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
        openModal: openModal,
        closeModal: closeModal,
        getVisibleRef: vue.computed(function () { return visible.value; }),
        setOkFunc: setOkFunc,
        okFuncRef: vue.computed(function () {
            return vue.unref(okFunc);
        }),
        cancelFuncRef: vue.computed(function () { return vue.unref(cancelFunc); }),
        setCancelFunc: setCancelFunc,
    };
}

var script$7 = vue.defineComponent({
    name: "basic-modal",
    props: basicModalProps,
    setup: function (props, _a) {
        var _this = this;
        var attrs = _a.attrs, emit = _a.emit;
        var okLoading = vue.ref(false);
        var _b = useVisible(), openModal = _b.openModal, closeModal = _b.closeModal, getVisibleRef = _b.getVisibleRef, okFuncRef = _b.okFuncRef, setCancelFunc = _b.setCancelFunc, setOkFunc = _b.setOkFunc, cancelFuncRef = _b.cancelFuncRef;
        var innerRef = vue.ref({});
        function openLoading() {
            okLoading.value = true;
        }
        function closeLoading() {
            okLoading.value = false;
        }
        var onOk = once(function () { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        openLoading();
                        return [4 /*yield*/, vue.unref(okFuncRef)()];
                    case 1:
                        _a.sent();
                        closeLoading();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        closeLoading();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        var getProps = vue.computed(function () {
            return __assign(__assign(__assign(__assign({}, props), attrs), { onCancel: vue.unref(cancelFuncRef), onOk: onOk, okButtonProps: attrs.okButtonProps, cancelButtonProps: attrs.cancelButtonProps, confirmLoading: vue.unref(okLoading) }), vue.unref(innerRef));
        });
        function setProps(props) {
            Object.entries(props).forEach(function (_a) {
                var _b;
                var key = _a[0], value = _a[1];
                switch (key) {
                    case "onCancel":
                        return setCancelFunc(value);
                    case "onOk":
                        return setOkFunc(value);
                    default:
                        innerRef.value = __assign(__assign({}, innerRef.value), (_b = {}, _b[key] = value, _b));
                }
            });
        }
        var getBind = vue.computed(function () {
            return __assign(__assign({}, vue.unref(getProps)), { visible: vue.unref(getVisibleRef) });
        });
        var actions = {
            setProps: setProps,
            openModal: openModal,
            closeModal: closeModal,
            openLoading: openLoading,
            closeLoading: closeLoading,
            setOk: setOkFunc,
            setCancel: setCancelFunc,
        };
        emit("register", actions);
        return {
            getBind: getBind,
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

var getModalMethods = function (getInstance) {
    return {
        openModal: function () { return getInstance().openModal(); },
        closeModal: function () { return getInstance().closeModal(); },
        setOk: function (param) { return getInstance().setOk(param); },
        setCancel: function (param) { return getInstance().setCancel(param); },
        openLoading: function () { return getInstance().openLoading(); },
        closeLoading: function () { return getInstance().closeLoading(); },
    };
};
function useModal(props) {
    var modalRef = vue.ref();
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
    var modalMethods = __assign({ setProps: function (props) { return getModalInstance().setProps(props); } }, getModalMethods(getModalInstance));
    return [register, modalMethods];
}

function usePagination(emit, initial) {
    var basePagination = {
        total: 0,
        current: 1,
        pageSize: 10,
        defaultPageSize: 10,
        size: "default",
        pageSizeOptions: ["10", "20", "30", "40"],
        onChange: undefined,
        onShowSizeChange: undefined,
        showTotal: function (total, range) { return "\u7B2C" + range[0] + "~" + range[1] + "\u6761\uFF0C\u5171" + total + "\u6761"; },
        showSizeChanger: true,
        showQuickJumper: true,
        simple: false,
        showLessItems: false,
        hideOnSinglePage: false,
        disabled: false,
    };
    var paginationRef = vue.ref(__assign(__assign({}, basePagination), (initial === undefined ? {} : initial)));
    function setPagination(val) {
        if (typeof val === "boolean") {
            paginationRef.value = val;
        }
        else {
            paginationRef.value = __assign(__assign({}, (typeof paginationRef.value === "boolean" ? basePagination : paginationRef.value)), val);
        }
    }
    return {
        getPaginationRef: vue.computed(function () {
            var val = vue.unref(paginationRef);
            if (typeof val === "boolean") {
                return false;
            }
            if (val.onChange === undefined) {
                val.onChange = function (current, pageSize) {
                    setPagination({ current: current, pageSize: pageSize });
                    emit("pageChange", { current: current, pageSize: pageSize });
                };
            }
            if (val.onShowSizeChange === undefined) {
                val.onShowSizeChange = function (current, pageSize) {
                    setPagination({ current: current, pageSize: pageSize });
                    emit("pageChange", { current: current, pageSize: pageSize });
                };
            }
            return val;
        }),
        setPagination: setPagination,
    };
}

function useLoading(initial) {
    var loadingRef = vue.ref(initial || false);
    return {
        getLoadingRef: vue.computed(function () { return vue.unref(loadingRef); }),
        setLoading: function (val) {
            loadingRef.value = val;
        },
    };
}

function useBizData(getPropsRef, tableMethods) {
    var _this = this;
    var dataSource = vue.ref([]);
    function pageChange(obj) {
        return __awaiter(this, void 0, void 0, function () {
            var page, _a, queryFunc, queryFuncMap, querySideEffect, resultConfigMap, res, _b, total, data, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tableMethods.setLoading(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        page = tableMethods.getPagination();
                        if (obj === null || obj === void 0 ? void 0 : obj.current) {
                            page.current = obj.current;
                        }
                        if (obj === null || obj === void 0 ? void 0 : obj.pageSize) {
                            page.pageSize = obj.pageSize;
                        }
                        _a = vue.unref(getPropsRef), queryFunc = _a.queryFunc, queryFuncMap = _a.queryFuncMap, querySideEffect = _a.querySideEffect, resultConfigMap = _a.resultConfigMap;
                        if (!queryFunc) return [3 /*break*/, 3];
                        return [4 /*yield*/, queryFunc({
                                pageRequest: {
                                    page: page.current,
                                    pageSize: page.pageSize,
                                },
                                orderRequest: {
                                    orderBy: "",
                                    descending: false,
                                },
                            })];
                    case 2:
                        res = _c.sent();
                        // resultConfigMap undefined,直接返回值，不分页
                        if (resultConfigMap === undefined) {
                            dataSource.value = res;
                            return [2 /*return*/];
                        }
                        _b = resultConfigMap(res), total = _b.total, data = _b.data;
                        dataSource.value = queryFuncMap ? data.map(queryFuncMap) : data;
                        if (querySideEffect && typeof querySideEffect === "function") {
                            querySideEffect(vue.computed(function () { return dataSource.value; }).value);
                        }
                        tableMethods.setPagination(__assign(__assign({}, page), { total: total }));
                        tableMethods.setLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        tableMethods.setLoading(false);
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        console.log(e_1);
                        tableMethods.setLoading(false);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function rePageChange() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, pageChange({ current: 1 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    vue.onMounted(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!getPropsRef.value.mounted) return [3 /*break*/, 2];
                    return [4 /*yield*/, rePageChange()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    return {
        pageChange: pageChange,
        rePageChange: rePageChange,
        getDataSourceRef: vue.computed(function () { return dataSource.value; }),
    };
}

function getIcon(iconType) {
    var iconMap = {
        warning: { icon: "info-circle-filled", class: "modal-icon-warning" },
        success: { icon: "check-circle-filled", class: "modal-icon-success" },
        info: { icon: "info-circle-filled", class: "modal-icon-info" },
        error: { icon: "close-circle-filled", class: "modal-icon-error" },
    }[iconType];
    return vue.h(script, __assign(__assign({}, iconMap), { icon: "ant-design:" + ((iconMap === null || iconMap === void 0 ? void 0 : iconMap.icon) || "close-circle-filled") }));
}
function createConfirm(options) {
    var iconType = options.iconType || "warning";
    Reflect.deleteProperty(options, "iconType");
    var opt = __assign({ centered: true, icon: getIcon(iconType) }, options);
    return antDesignVue.Modal.confirm(opt);
}
var baseOptions = {
    okText: "确定",
    centered: true,
};
function renderContent(_a) {
    var content = _a.content;
    return vue.h("div", {}, content);
}
function createModalOptions(options, icon) {
    return __assign(__assign(__assign({}, baseOptions), options), { content: renderContent(options), icon: getIcon(icon) });
}
var createModal = {
    success: function (options) { return antDesignVue.Modal.success(createModalOptions(options, "close")); },
    info: function (options) { return antDesignVue.Modal.info(createModalOptions(options, "close")); },
    warning: function (options) { return antDesignVue.Modal.warning(createModalOptions(options, "close")); },
    error: function (options) { return antDesignVue.Modal.error(createModalOptions(options, "close")); },
};
function useMessage() {
    return {
        notification: antDesignVue.notification,
        createModal: createModal,
        createConfirm: createConfirm,
        createConfirmDel: function (content, title) {
            return new Promise(function (resolve) {
                createConfirm({
                    iconType: "warning",
                    title: title || "确认删除",
                    content: content,
                    okType: "danger",
                    onOk: function () {
                        resolve();
                    },
                });
            });
        },
        createConfirmTitle: function (_a) {
            var name = _a.name, _b = _a.title, title = _b === void 0 ? "确认操作" : _b, _c = _a.okType, okType = _c === void 0 ? "danger" : _c;
            return new Promise(function (resolve) {
                createConfirm({
                    iconType: "warning",
                    title: title,
                    content: vue.h("div", [
                        "是否" + title + " ",
                        vue.h("span", {
                            style: { color: "red" },
                        }, name),
                        " 么",
                    ]),
                    okType: okType,
                    onOk: function () {
                        resolve();
                    },
                });
            });
        },
        createMessage: antDesignVue.message,
    };
}

function useBizRemove(getPropsRef, tableMethods, rePageChange) {
    var _a = useMessage(), createConfirmDel = _a.createConfirmDel, createMessage = _a.createMessage;
    var removedTitle = vue.computed(function () {
        var removeTitle = getPropsRef.value.removeTitle;
        if (removeTitle) {
            if (typeof removeTitle === "string") {
                return "\u662F\u5426\u5220\u9664" + getPropsRef.value.removeTitle;
            }
            return removeTitle();
        }
        return "是否删除选项";
    });
    function beforeRemoveRef() {
        return __awaiter(this, void 0, void 0, function () {
            var removeBefore, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        removeBefore = getPropsRef.value.removeBefore;
                        _a = removeBefore;
                        if (!_a) return [3 /*break*/, 2];
                        _c = (_b = [true, undefined]).includes;
                        return [4 /*yield*/, removeBefore()];
                    case 1:
                        _a = _c.apply(_b, [_d.sent()]);
                        _d.label = 2;
                    case 2: return [2 /*return*/, _a];
                }
            });
        });
    }
    function removeFunc(message, idsList) {
        return __awaiter(this, void 0, void 0, function () {
            var res, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!getPropsRef.value.removeFunc) return [3 /*break*/, 6];
                        if (!(typeof message === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, createConfirmDel(vue.h("div", [
                                removedTitle.value,
                                vue.h("span", {
                                    style: { color: "red" },
                                }, " " + message),
                                " 么",
                            ]))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, createConfirmDel(message)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, getPropsRef.value.removeFunc(idsList)];
                    case 5:
                        res = _a.sent();
                        if (res !== false) {
                            msg = getPropsRef.value.removeTitle !== "选项" ? getPropsRef.value.removeTitle : "";
                            createMessage.success("\u5220\u9664" + msg + "\u6210\u529F!");
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    function removeItem(record) {
        return __awaiter(this, void 0, void 0, function () {
            var message, _a, removeLabelFunc, rowKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, beforeRemoveRef()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 3];
                        message = void 0;
                        _a = getPropsRef.value, removeLabelFunc = _a.removeLabelFunc, rowKey = _a.rowKey;
                        if (removeLabelFunc) {
                            message = removeLabelFunc(record, false);
                        }
                        else {
                            message = record.name;
                        }
                        return [4 /*yield*/, removeFunc(message, [record[rowKey || "id"]])];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    }
    function removeItemAuto(record) {
        return __awaiter(this, void 0, void 0, function () {
            var requested, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, removeItem(record)];
                    case 1:
                        requested = _b.sent();
                        _a = requested;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, rePageChange()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }
    function removeItems() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, removeLabelFunc_1, removeCurrent, idsList, rows, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, beforeRemoveRef()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 3];
                        _a = getPropsRef.value, removeLabelFunc_1 = _a.removeLabelFunc, removeCurrent = _a.removeCurrent;
                        idsList = removeCurrent
                            ? tableMethods.getSelectedRowKeys()
                            : tableMethods.getAllSelectedRowKeys();
                        rows = removeCurrent ? tableMethods.getSelectedRows() : tableMethods.getAllSelectedRows();
                        if (idsList.length === 0) {
                            createMessage.error("\u8BF7\u5148\u52FE\u9009\u9700\u8981\u5220\u9664\u9009\u9879\u7684\u590D\u9009\u6846");
                            return [2 /*return*/, false];
                        }
                        message = void 0;
                        if (removeLabelFunc_1) {
                            message = rows.map(function (i) { return removeLabelFunc_1(i, true); });
                        }
                        else {
                            message = rows.map(function (i) { return i.name; });
                        }
                        return [4 /*yield*/, removeFunc(message.join(" , "), idsList)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    }
    function removeItemsAuto() {
        return __awaiter(this, void 0, void 0, function () {
            var requested, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, removeItems()];
                    case 1:
                        requested = _b.sent();
                        _a = requested;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, rePageChange()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        return [2 /*return*/];
                }
            });
        });
    }
    return {
        removeItem: removeItem,
        removeItemAuto: removeItemAuto,
        removeItems: removeItems,
        removeItemsAuto: removeItemsAuto,
    };
}

var BizTableProps = {
    queryFuncMap: {
        type: Function,
        default: null,
    },
    removeTitle: {
        type: String,
        default: "选项",
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
        default: function (i) { return ({
            total: i.pageResult.rowCount,
            data: i.itemsList,
        }); },
    },
    removeBefore: {
        type: Function,
        default: function () { return undefined; },
    },
};

var script$6 = vue.defineComponent({
    name: "bizTable",
    components: { BasicTable: script$9 },
    props: BizTableProps,
    emits: ["register"],
    setup: function (props, _a) {
        var emit = _a.emit;
        var innerRef = vue.ref({});
        var getPropsRef = vue.computed(function () {
            return __assign(__assign({}, props), innerRef.value);
        });
        var _b = useTable(getPropsRef.value), register = _b[0], tableMethods = _b[1];
        function registerEnd() {
            vue.watch(function () { return vue.unref(getPropsRef); }, function (val) {
                tableMethods.setProps(val);
            }, {
                immediate: true,
            });
        }
        function setProps(val) {
            // @ts-ignore
            innerRef.value = __assign(__assign({}, innerRef.value), val);
        }
        var _c = useBizData(getPropsRef, tableMethods), pageChange = _c.pageChange, rePageChange = _c.rePageChange, getDataSourceRef = _c.getDataSourceRef;
        var _d = useBizRemove(getPropsRef, tableMethods, rePageChange), removeItem = _d.removeItem, removeItemAuto = _d.removeItemAuto, removeItems = _d.removeItems, removeItemsAuto = _d.removeItemsAuto;
        var IBizTableAction = {
            setProps: setProps,
            pageChange: pageChange,
            rePageChange: rePageChange,
            removeItem: removeItem,
            removeItemAuto: removeItemAuto,
            removeItems: removeItems,
            removeItemsAuto: removeItemsAuto,
            getDataSourceRef: function () { return vue.computed(function () { return getDataSourceRef.value; }); },
            basic: tableMethods,
        };
        emit("register", IBizTableAction);
        return {
            pageChange: pageChange,
            getDataSourceRef: getDataSourceRef,
            register: register,
            registerEnd: registerEnd,
        };
    },
});

function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BasicTable = vue.resolveComponent("BasicTable");

  return (vue.openBlock(), vue.createBlock(_component_BasicTable, {
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
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["onRegister", "onRegisterEnd", "onPageChange", "dataSource"]))
}

script$6.render = render$6;
script$6.__file = "src/components/biz/bizTable/bizTable.vue";

function useBizTable(props) {
    var actionRef = vue.ref();
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
    var actions = {
        setProps: function (props) { return getInstance().setProps(props); },
        pageChange: function (arg) { return getInstance().pageChange(arg); },
        rePageChange: function () { return getInstance().rePageChange(); },
        removeItem: function (item) { return getInstance().removeItem(item); },
        removeItemAuto: function (item) { return getInstance().removeItemAuto(item); },
        removeItems: function () { return getInstance().removeItems(); },
        removeItemsAuto: function () { return getInstance().removeItemsAuto(); },
        getDataSourceRef: function () { return getInstance().getDataSourceRef(); },
        basic: getTableMethods(function () { return getInstance().basic; }),
    };
    return [register, actions];
}

function useModalFunc(getPropsRef, methods, modalMethods, model, setModel, isAddRef) {
    function sucMsg(type) {
        var title = getPropsRef.value.title;
        if (typeof title === "function") {
            antDesignVue.message.success(title(isAddRef.value, model) + "成功！");
        }
        else {
            antDesignVue.message.success(title + (type + "\u6210\u529F\uFF01"));
        }
    }
    function okFunc() {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onOk, onAdd, onEdit, commonMap, addMap, editMap, afterAdd, afterEdit, pageChange, rePageChange, _b, _c, _d, _e, res, _f, _g, _h, res, _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _a = vue.unref(getPropsRef), onOk = _a.onOk, onAdd = _a.onAdd, onEdit = _a.onEdit, commonMap = _a.commonMap, addMap = _a.addMap, editMap = _a.editMap, afterAdd = _a.afterAdd, afterEdit = _a.afterEdit, pageChange = _a.pageChange, rePageChange = _a.rePageChange;
                        _k.label = 1;
                    case 1:
                        _k.trys.push([1, 24, , 25]);
                        return [4 /*yield*/, methods.validate()];
                    case 2:
                        _k.sent();
                        Reflect.deleteProperty(model, "isTrusted");
                        _b = commonMap;
                        if (!_b) return [3 /*break*/, 4];
                        _c = setModel;
                        return [4 /*yield*/, commonMap(model)];
                    case 3:
                        _b = _c.apply(void 0, [_k.sent()]);
                        _k.label = 4;
                    case 4:
                        if (!onOk) return [3 /*break*/, 6];
                        return [4 /*yield*/, onOk(model)];
                    case 5:
                        _k.sent();
                        return [3 /*break*/, 22];
                    case 6:
                        if (!(onAdd && model.id === undefined)) return [3 /*break*/, 14];
                        _d = addMap;
                        if (!_d) return [3 /*break*/, 8];
                        _e = setModel;
                        return [4 /*yield*/, addMap(model)];
                    case 7:
                        _d = _e.apply(void 0, [_k.sent()]);
                        _k.label = 8;
                    case 8:
                        return [4 /*yield*/, onAdd(model)];
                    case 9:
                        res = _k.sent();
                        if (!afterAdd) return [3 /*break*/, 11];
                        return [4 /*yield*/, afterAdd(model, res)];
                    case 10:
                        _k.sent();
                        return [3 /*break*/, 14];
                    case 11:
                        if (!(commonMap || addMap)) return [3 /*break*/, 14];
                        sucMsg("新增");
                        _f = rePageChange;
                        if (!_f) return [3 /*break*/, 13];
                        return [4 /*yield*/, rePageChange()];
                    case 12:
                        _f = (_k.sent());
                        _k.label = 13;
                    case 13:
                        _k.label = 14;
                    case 14:
                        if (!(onEdit && model.id !== undefined)) return [3 /*break*/, 22];
                        _g = editMap;
                        if (!_g) return [3 /*break*/, 16];
                        _h = setModel;
                        return [4 /*yield*/, editMap(model)];
                    case 15:
                        _g = _h.apply(void 0, [_k.sent()]);
                        _k.label = 16;
                    case 16:
                        return [4 /*yield*/, onEdit(model)];
                    case 17:
                        res = _k.sent();
                        if (!afterEdit) return [3 /*break*/, 19];
                        return [4 /*yield*/, afterEdit(model, res)];
                    case 18:
                        _k.sent();
                        return [3 /*break*/, 22];
                    case 19:
                        if (!(commonMap || editMap)) return [3 /*break*/, 22];
                        sucMsg("修改");
                        _j = pageChange;
                        if (!_j) return [3 /*break*/, 21];
                        return [4 /*yield*/, pageChange()];
                    case 20:
                        _j = (_k.sent());
                        _k.label = 21;
                    case 21:
                        _k.label = 22;
                    case 22: return [4 /*yield*/, modalMethods.closeModal()];
                    case 23:
                        _k.sent();
                        return [3 /*break*/, 25];
                    case 24:
                        _k.sent();
                        modalMethods.closeLoading();
                        return [3 /*break*/, 25];
                    case 25: return [2 /*return*/];
                }
            });
        });
    }
    function cancelFunc() {
        return __awaiter(this, void 0, void 0, function () {
            var onCancel, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        onCancel = vue.unref(getPropsRef).onCancel;
                        _a = onCancel;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, onCancel()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        return [4 /*yield*/, modalMethods.closeModal()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    return {
        cancelFunc: cancelFunc,
        okFunc: okFunc,
    };
}

function useModalOpen(getPropsRef, methods, modalMethods, model) {
    var isAddRef = vue.ref(false);
    function setModel(val) {
        Object.entries(val).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (model[key] !== value) {
                model[key] = value;
            }
        });
    }
    function openFunc() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modalMethods.openModal()];
                    case 1:
                        _a.sent();
                        methods.resetFields();
                        methods.setProps(getPropsRef.value);
                        return [2 /*return*/];
                }
            });
        });
    }
    function openNew(initial) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openFunc()];
                    case 1:
                        _a.sent();
                        isAddRef.value = true;
                        model.id = undefined;
                        if (initial) {
                            setModel(initial);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function openEdit(initial) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openFunc()];
                    case 1:
                        _a.sent();
                        isAddRef.value = false;
                        setModel(initial);
                        return [2 /*return*/];
                }
            });
        });
    }
    vue.watch(function () { return getPropsRef.value.initModel; }, function (val) {
        if (val) {
            var res = typeof val === "object" ? val : val();
            setModel(res);
        }
    });
    var titleRef = vue.computed(function () {
        var title = vue.unref(getPropsRef).title;
        if (title) {
            if (typeof title === "string") {
                return (isAddRef.value ? "新增" : "修改") + title;
            }
            return title(isAddRef.value, model);
        }
        return undefined;
    });
    return {
        isAddRef: vue.computed(function () { return vue.unref(isAddRef); }),
        titleRef: titleRef,
        openEdit: openEdit,
        openNew: openNew,
        setModel: setModel,
    };
}

var script$5 = vue.defineComponent({
    name: "FormModal",
    components: { BasicForm: script$8, BasicModal: script$7 },
    emits: ["register"],
    setup: function (props, _a) {
        var emit = _a.emit;
        var model = vue.reactive({});
        var innerRef = vue.ref();
        var getPropsRef = vue.computed(function () {
            return __assign(__assign({}, props), innerRef.value);
        });
        var _b = useModal({}), register = _b[0], modalMethods = _b[1];
        var _c = useForm({}), registerForm = _c[0], formMethods = _c[1];
        var _d = useModalOpen(getPropsRef, formMethods, modalMethods, model), isAddRef = _d.isAddRef, openNew = _d.openNew, openEdit = _d.openEdit, setModel = _d.setModel, titleRef = _d.titleRef;
        var _e = useModalFunc(getPropsRef, formMethods, modalMethods, model, setModel, isAddRef), cancelFunc = _e.cancelFunc, okFunc = _e.okFunc;
        function setProps(props) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, vue.nextTick()];
                        case 1:
                            _a.sent();
                            innerRef.value = props;
                            modalMethods.setOk(okFunc);
                            if (getPropsRef.value.onCancel) {
                                modalMethods.setCancel(cancelFunc);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        function openAddModal(param) {
            var openAdd = getPropsRef.value.openAddModal;
            openAdd && openAdd(param);
        }
        function openEditModal(param) {
            var openE = getPropsRef.value.openEditModal;
            openE && openE(param);
        }
        var regFormModal = {
            modal: modalMethods,
            form: formMethods,
            getModelRef: function () { return vue.computed(function () { return model; }); },
            setModel: setModel,
            setProps: setProps,
            openNew: openNew,
            openEdit: openEdit,
            openAddModal: openAddModal,
            openEditModal: openEditModal,
        };
        emit("register", regFormModal);
        return {
            register: register,
            registerForm: registerForm,
            isAddRef: isAddRef,
            model: model,
            titleRef: titleRef,
        };
    },
});

function render$5(_ctx, _cache, $props, $setup, $data, $options) {
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

script$5.render = render$5;
script$5.__file = "src/components/biz/FormModal/FormModal.vue";

function useFormModal(props) {
    var formModalRef = vue.ref();
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
    var methods = {
        openNew: function (i) { return getFormModalInstance().openNew(i); },
        openEdit: function (i) { return getFormModalInstance().openEdit(i); },
        setProps: function (props) { return getFormModalInstance().setProps(props); },
        setModel: function (val) { return getFormModalInstance().setModel(val); },
        getModelRef: function () { return getFormModalInstance().getModelRef(); },
        openAddModal: function (param) { return getFormModalInstance().openAddModal(param); },
        openEditModal: function (param) { return getFormModalInstance().openEditModal(param); },
        modal: getModalMethods(function () { return getFormModalInstance().modal; }),
        form: getFormMethods(function () { return getFormModalInstance().form; }),
    };
    return [register, methods];
}

function getArrayBuffer(img, callback) {
    var reader = new FileReader();
    reader.addEventListener("load", function () { return callback(reader.result); });
    reader.readAsArrayBuffer(img);
}
var script$4 = vue.defineComponent({
    name: "img-upload",
    components: { PlusOutlined: iconsVue.PlusOutlined },
    setup: function () {
        // 正要上传
        var hasUpload = vue.ref(false);
        var fileList = vue.ref([]);
        var imageUrl = vue.ref("");
        var imageBuffer = vue.ref();
        function get_image(arr_buffer) {
            var uInt8Array = new Uint8Array(arr_buffer);
            var i = uInt8Array.length;
            var binaryString = new Array(i);
            while (i--) {
                binaryString[i] = String.fromCharCode(uInt8Array[i]);
            }
            var data = binaryString.join("");
            return "data:image/png;base64," + window.btoa(data);
        }
        var handleChange = function (info) {
            getArrayBuffer(info.file.originFileObj, function (arrayBuffer) {
                imageBuffer.value = arrayBuffer;
                imageUrl.value = get_image(arrayBuffer);
            });
            fileList.value = info.fileList.slice(-1);
            hasUpload.value = true;
        };
        var beforeUpload = function (file) {
            var isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPng) {
                antDesignVue.message.error("You can only upload JPG file!");
            }
            var isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                antDesignVue.message.error("图片必须小于 2MB!");
            }
            return isJpgOrPng && isLt2M;
        };
        function setImgPath(path) {
            imageUrl.value = path ? "data:image/png;base64," + path : "";
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
        return {
            fileList: fileList,
            imageUrl: imageUrl,
            beforeUpload: beforeUpload,
            handleChange: handleChange,
            setImgPath: setImgPath,
            upload: upload,
        };
    },
});

const _withId$2 = /*#__PURE__*/vue.withScopeId("data-v-689c368f");

vue.pushScopeId("data-v-689c368f");
const _hoisted_1$1 = { key: 1 };
const _hoisted_2 = /*#__PURE__*/vue.createVNode("div", { class: "ant-upload-text" }, "点击上传", -1 /* HOISTED */);
vue.popScopeId();

const render$4 = /*#__PURE__*/_withId$2((_ctx, _cache, $props, $setup, $data, $options) => {
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
    default: _withId$2(() => [
      (_ctx.imageUrl)
        ? (vue.openBlock(), vue.createBlock("img", {
            key: 0,
            class: "img-view",
            src: _ctx.imageUrl,
            alt: "avatar"
          }, null, 8 /* PROPS */, ["src"]))
        : (vue.openBlock(), vue.createBlock("div", _hoisted_1$1, [
            vue.createVNode(_component_PlusOutlined),
            _hoisted_2
          ]))
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["file-list", "before-upload", "customRequest", "onChange"]))
});

script$4.render = render$4;
script$4.__scopeId = "data-v-689c368f";
script$4.__file = "src/components/common/img-upload.vue";

var importFile = function (file) {
    return new Promise(function (resolve) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var bstr = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.result;
            var wb = XLSX__default['default'].read(bstr, { type: "binary" });
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            var data = XLSX__default['default'].utils.sheet_to_json(ws, { header: 1 });
            var make_cols = function (refstr) {
                return Array(XLSX__default['default'].utils.decode_range(refstr).e.c + 1)
                    .fill(0)
                    .map(function (x, i) { return ({ name: XLSX__default['default'].utils.encode_col(i), key: i }); });
            };
            var res = {
                data: data,
                cols: make_cols(ws["!ref"]),
            };
            resolve(res);
        };
        reader.readAsBinaryString(file);
    });
};

var script$3 = vue.defineComponent({
    name: "file-upload",
    setup: function () {
        var fileList = vue.ref([]);
        var createMessage = useMessage().createMessage;
        var handleChange = function (info) {
            if (info.fileList.length > 1) {
                createMessage.error("暂时只能读一个excel文件");
            }
            fileList.value = info.fileList.slice(-1);
        };
        function parseExcel() {
            return __awaiter(this, void 0, void 0, function () {
                var file;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!fileList.value.length) return [3 /*break*/, 3];
                            file = fileList.value[0];
                            if (!(file && file.originFileObj)) return [3 /*break*/, 2];
                            return [4 /*yield*/, importFile(file.originFileObj)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2: return [3 /*break*/, 4];
                        case 3:
                            createMessage.error("您还没有上传文件，请检查!");
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        function clearFile() {
            fileList.value = [];
        }
        return {
            fileList: fileList,
            handleChange: handleChange,
            parseExcel: parseExcel,
            clearFile: clearFile,
        };
    },
});

const _hoisted_1 = /*#__PURE__*/vue.createVNode("span", { class: "ant-upload-text" }, "上传", -1 /* HOISTED */);

function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_upload_outlined = vue.resolveComponent("upload-outlined");
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
          vue.createVNode(_component_upload_outlined),
          _hoisted_1
        ]),
        _: 1 /* STABLE */
      })
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["file-list", "before-upload", "customRequest", "onChange"]))
}

script$3.render = render$3;
script$3.__file = "src/components/common/file-upload.vue";

var script$2 = vue.defineComponent({
    name: "TelePort",
    setup: function () {
        var mounted = vue.ref(false);
        vue.onMounted(function () { return (mounted.value = true); });
        return {
            mounted: mounted,
        };
    },
});

function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.mounted)
    ? (vue.openBlock(), vue.createBlock(vue.Teleport, vue.mergeProps({ key: 0 }, _ctx.$attrs), [
        vue.renderSlot(_ctx.$slots, "default")
      ], 16 /* FULL_PROPS */))
    : vue.createCommentVNode("v-if", true)
}

script$2.render = render$2;
script$2.__file = "src/components/common/tele-port.vue";

var script$1 = vue.defineComponent({
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
    setup: function (props) {
        var type = "";
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
        var getRef = vue.computed(function () {
            return {
                type: type === "" ? undefined : type,
            };
        });
        return {
            getRef: getRef,
        };
    },
});

const _withId$1 = /*#__PURE__*/vue.withScopeId("data-v-452c1df2");

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
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
    default: _withId$1(() => [
      vue.renderSlot(_ctx.$slots, "customIcon"),
      vue.renderSlot(_ctx.$slots, "default")
    ]),
    _: 2 /* DYNAMIC */
  }, [
    (_ctx.icon)
      ? {
          name: "icon",
          fn: _withId$1(() => [
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

script$1.render = render$1;
script$1.__scopeId = "data-v-452c1df2";
script$1.__file = "src/components/common/icon-button.vue";

var script = vue.defineComponent({
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
    setup: function (props) {
        var _this = this;
        var elRef = vue.ref(null);
        var wrapStyleRef = vue.computed(function () {
            var size = props.size, color = props.color;
            var fs = size;
            if (typeof size === "string") {
                fs = parseInt(size, 10);
            }
            return {
                fontSize: fs + "px",
                color: color,
                display: "inline-flex",
            };
        });
        var update = function () { return __awaiter(_this, void 0, void 0, function () {
            var el, icon, svg, span;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = vue.unref(elRef);
                        if (!el) return [3 /*break*/, 2];
                        return [4 /*yield*/, vue.nextTick()];
                    case 1:
                        _a.sent();
                        icon = props.icon;
                        svg = void 0;
                        if (Iconify__default['default'].renderSVG)
                            svg = Iconify__default['default'].renderSVG(icon, {});
                        if (svg) {
                            el.textContent = "";
                            el.appendChild(svg);
                        }
                        else {
                            span = document.createElement("span");
                            span.className = "iconify";
                            span.dataset.icon = icon;
                            el.textContent = "";
                            el.appendChild(span);
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        vue.watch(function () { return props.icon; }, update, { flush: "post" });
        vue.onMounted(update);
        return {
            elRef: elRef,
            wrapStyleRef: wrapStyleRef,
        };
    },
});

const _withId = /*#__PURE__*/vue.withScopeId("data-v-484571dd");

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return (vue.openBlock(), vue.createBlock("div", {
    ref: "elRef",
    class: "app-iconify anticon",
    style: _ctx.wrapStyleRef
  }, null, 4 /* STYLE */))
});

script.render = render;
script.__scopeId = "data-v-484571dd";
script.__file = "src/components/common/Icon.vue";

exports.AoIcon = script;
exports.BasicForm = script$8;
exports.BasicModal = script$7;
exports.BasicTable = script$9;
exports.BizTable = script$6;
exports.FileUpload = script$3;
exports.FormModal = script$5;
exports.IconButton = script$1;
exports.ImgUpload = script$4;
exports.TelePort = script$2;
exports.useBizTable = useBizTable;
exports.useForm = useForm;
exports.useFormModal = useFormModal;
exports.useLoading = useLoading;
exports.useMessage = useMessage;
exports.useModal = useModal;
exports.usePagination = usePagination;
exports.useTable = useTable;
