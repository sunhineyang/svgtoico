## 修复 middleware 导致的 500 错误问题

### 问题诊断
从日志中可以看到：
- ✅ `GET /en/svg-ico-guide 200 in 5.2s` - 正常工作
- ❌ `GET /svg-ico-guide 500 in 7.8s` - 返回 500 错误

**根本原因**：middleware 中的重定向逻辑有问题，导致 `/svg-ico-guide` 被错误处理，返回 500 错误而不是正常的 200。

### 解决方案

**移除 middleware 中的自定义重定向逻辑**，让 `createMiddleware(routing)` 自己处理所有路由：

1. 修改 [middleware.ts](file:///Users/y_sunshine/Documents/svgtoico/middleware.ts)
   - 删除所有自定义的重定向代码
   - 只使用 `createMiddleware(routing)` 和基本的 matcher 配置
   - 让 next-intl 自己处理 `localePrefix: 'as-needed'` 模式的所有路由

### 预期结果
- `/svg-ico-guide` 返回 200（不需要 `/en` 前缀）
- `/privacy` 返回 200
- `/terms` 返回 200
- 其他语言路径正常工作
- 所有页面不再返回 500 错误