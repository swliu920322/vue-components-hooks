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
