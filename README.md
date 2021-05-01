# vue-components-hooks

- 配合 antd 用于封装项目的一些基本操做
- 配合 grpc-web 的接口，不过 restful 也可以使
- 个人能力较差，只能做一个凑合能用的版本

## hooks 配合 组件

### 通用

1. `useModal` 配合`<BasicModal/>`,  
   通用弹窗，继承打开、关闭、取消、完成的异步操作
2. `useForm` 配合`<BasicForm />`,  
   通用表单，继承校验，重置，滚动到错误列，wrapper简写
3. `useTable` 配合`<BasicTable />`  
   通用table，继承antd常用功能，自动计算滚动高度，斑马线

### 业务

1. `useBizTable` 配合 `<BizTable />`,  
   业务table，多了绑定获取数据源接口，map管道，
   删除接口，删除自动提示，成功后自动刷新
2. `useFormModal` 配合`<FormModal/>`  
   业务弹出表单，多了绑定新增，修改接口，提交的转化管道，
   打开新增，修改弹窗的数据管道。
