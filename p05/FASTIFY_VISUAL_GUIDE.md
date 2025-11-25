# Fastify 装饰器问题 - 可视化演示

## 🔴 问题情况：fastify.auth 是 undefined

```
┌────────────────────────────────────────────────────────────┐
│ 主 server 实例                                             │
├────────────────────────────────────────────────────────────┤
│ 对象属性：                                                 │
│  - listen: [Function]                                     │
│  - register: [Function]                                   │
│  - get: [Function]                                        │
│  - auth: authHandler    ✅ 装饰器在这里                    │
│  - ... 其他属性                                            │
└────────────────────────────────────────────────────────────┘
           ↓
     server.register(User, { prefix: "/api/user" })
           ↓
┌────────────────────────────────────────────────────────────┐
│ User 插件 - 新的作用域实例                                 │
├────────────────────────────────────────────────────────────┤
│ 对象属性：                                                 │
│  - listen: [Function]                                     │
│  - register: [Function]                                   │
│  - get: [Function]                                        │
│  - auth: ???          ❌ 装饰器可能没有被复制过来          │
│  - ... 其他属性                                            │
└────────────────────────────────────────────────────────────┘
           ↓
     在 User 中使用 fastify.auth
           ↓
        undefined ❌
```

---

## ✅ 解决方案：本地定义

```
┌────────────────────────────────────────────────────────────┐
│ User 插件 - 创建自己的函数                                 │
├────────────────────────────────────────────────────────────┤
│                                                             │
│ export const User = async (fastify) => {                   │
│     // 在这个作用域内定义变量                              │
│     const authHandler = async (req, res) => { ... };       │
│                                                             │
│     fastify.get("/me", {                                   │
│         preHandle: [authHandler]                           │
│              ↑                                              │
│        直接引用本地变量 ✅                                  │
│     })                                                     │
│ }                                                          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 📊 JavaScript 变量查找对比

### ❌ 访问 `fastify.auth`（依赖属性继承）

```
当代码执行 fastify.auth 时：

┌─ 在 fastify 对象上查找
│  ├─ 是否有 auth 属性？→ 没有
│  └─ 查看原型链...
├─ 查看原型链上是否有 auth
│  └─ 可能继承了？→ 不确定
└─ 最终结果：undefined ❌

这是"不确定"的查找，因为装饰器继承规则复杂
```

### ✅ 访问 `authHandler`（直接引用变量）

```
当代码执行 authHandler 时：

┌─ 在当前作用域查找
│  └─ 是否有 authHandler 变量？→ 有！
└─ 立即返回 ✅

这是"确定"的查找，因为变量在定义时就在这个作用域里
```

---

## 🔄 为什么会不确定？

### Fastify 的装饰器规则（官方文档）

```
当你写：server.decorate('auth', authHandler)

装饰器会被添加到：
✅ 主 server 实例
❓ 子插件实例（取决于注册方式和 Fastify 版本）

特别是当使用 prefix 时：
server.register(User, { prefix: "/api/user" })

新的 prefix 创建了一个新的"作用域"
装饰器可能被：
  - 继承（大多数情况）
  - 不继承（某些情况下）
  - 部分继承（某些版本/配置下）
```

---

## 🎯 关键理解

### 问题的根本原因

```typescript
// 当 Fastify 注册插件时
await server.register(User, { prefix: "/api/user" })

// Fastify 内部大致会这样做：
const childInstance = createChildFastifyInstance(server, { prefix: "/api/user" })
await User(childInstance)

// childInstance 可能不完全继承 server 的所有装饰器
// 导致 childInstance.auth 可能是 undefined
```

### 为什么本地定义能解决

```typescript
export const User = async (fastify: any) => {
    // 这个 authHandler 是函数作用域的变量
    const authHandler = async (req, res) => { /* ... */ };
    
    // JavaScript 的变量查找只需要查找作用域链
    // authHandler 就在当前函数作用域里，100% 能找到
    
    fastify.get("/me", {
        preHandle: [authHandler]  // ✅ 绝对不会是 undefined
    })
}
```

---

## 💡 类比

假设你在一个办公室工作：

```
【主办公室】有一个打印机 → auth = 打印机

【分支办公室】是独立的（prefix: "/api/user"）

【问题】：分支办公室的员工能用主办公室的打印机吗？
  ❓ 不一定，可能没有权限或者没有连接

【解决】：分支办公室自己买一台打印机
  ✅ 员工肯定能用自己办公室的打印机
```

这就是为什么在 User 插件中自己定义 `authHandler` 是最安全的做法！

