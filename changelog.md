## 修改变更

### 1.1.4

- 修改 removeFunc 返回类型，false 则不会弹出删除成功
- 修改图片上传为返回 Unit8Array 格式

### 1.1.8

- 对 formModal 的 openAddModal 允许携带参数,进行传递

### 1.1.10

- basicModal 点击事件 2 秒内只能触发一次

### 1.1.11

- 对 formModal 新增了 basicModal 的基本操作，来源于继承

### 1.1.12

- 对 formModal 新增了 basicForm 的基本操作，来源于继承

### 1.1.13

- 对 bizTable 和 formModal 的继承进行修改，actions 上不在暴露那么多，只暴露对象

### 1.1.15

- 简化继承写法,完全继承对业务组件使用过度冗余，继承属性挂在对象上

### 1.1.16

- 为 icon-button 增加自带样式

### 1.1.17

- 移除 formModal 保存时的错误提示，交给系统

### 1.1.18

- 为 formModal 增加了 header 和 footer 的插槽

### 1.1.19

- 为 formModal 增加了 rePageChange 策略，新增会走 rePageChange，修改会走 pageChange，确保修改时刷新当前页。
- 增加 afterAdd 和 afterEdit，使用后新增成功自己控制消息和刷新策略, 参数为 model 和接口的返回值

### 1.1.20

- 为 formModal 增加了类型，用来统一 formModal 参数

### 1.2.1

- 修复 bizTable 的 rePageChang 暴露错误的问题

### 1.2.2 2021-5-19

- 为 bizTable 新增 getAllSelectedRowKeys 和 getAllSelectedRows 方法，用来获得所有页的选中 keys 和 rows

### 1.2.3 2021-5-19

- 修复 formModal title 为函数的时候，新增保存的提示错误

### 1.2.3 2021-5-19

- 为删除确认统一格式

### 1.2.7 2021-5-20

- 修改 loading 为 confirmLoading，统一 confirm 函数

### 1.2.8 2021-5-20

- 修复之前 bizTable 多选未删除会自动刷新的异常

### 1.3.0 2021-5-28

- 为 formModal 的 addModal 和 editModal 批量传递参数增加了处理

### 1.3.1 2021-6-4

- 修复多选删除之后，selectRows 仍然存在的问题

### 1.3.1 2021-6-23

- 为图片上传增加默认的 url 的 props 参数

### 1.3.1 2021-6-24 v0.2.5

- 为基础 table 增加 paginationRef
- 增加 bizTable 的 dataSourceRef 和 paginationRef,可以单向追踪数据源变化和分页变化增加 formModal 的 modelRef 可以单向追踪内部 model 变化

### 1.3.1 2021-6-25 v0.2.6

- 修改 dataSourceRef, paginationRef, modelRef, 处理内部处理的响应式

### 1.3.1 2021-7-8 v0.2.7

- 修改 model 的 setModal，属性替换改为深拷贝，移除 commonMap 和 addMap，editMap 不存在时不自动 pageChange 的问题, 简化了 pageChange 的传入，rePageChange 可以不传

### 1.3.1 2021-7-8 v0.2.8

- 由于 moment()的值会被拷贝出问题，setModal 深拷贝换成 lodash-es 的深拷贝，

### 1.3.6 2021-7-26

- 为 basic-table 增加 setColumns 和 getColumns,为所有的 watch 释放内存
