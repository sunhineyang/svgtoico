## 修复 middleware 重定向逻辑问题

### 问题分析
当前 middleware 会将 `/svg-ico-guide` 重定向到 `/en/svg-ico-guide`，但这是错误的。在 `localePrefix: 'as-needed'` 模式下：
- 默认语言（英文）的路径应该是 `/svg-ico-guide`（无前缀）
- 其他语言的路径应该是 `/de/svg-ico-guide`, `/es/svg-ico-guide` 等

### 根本原因
`createMiddleware(routing)` 已经会自动处理默认语言的路由，而我的自定义重定向逻辑与它冲突了。

### 解决方案
**移除自定义的重定向逻辑**，让 `createMiddleware(routing)` 自己处理所有路由：
- 删除 middleware 中的自定义重定向代码
- 简化为只使用 `createMiddleware(routing)` 和基本的 matcher 配置

### 修改文件
修改 `/Users/y_sunshine/Documents/svgtoico/middleware.ts`：
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)'
  ]
};
```

### 预期结果
- `/svg-ico-guide` 直接访问，返回 200
- `/privacy` 直接访问，返回 200
- `/terms` 直接访问，返回 200
- 其他语言路径正常工作
- 首页正常工作