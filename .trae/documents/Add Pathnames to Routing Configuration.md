## 修复 routing.ts 中的 pathnames 定义

### 问题分析
在 `localePrefix: 'as-needed'` 模式下，`createMiddleware(routing)` 需要知道所有可能的路径才能正确处理路由。当前 routing.ts 只定义了 `/`，缺少其他路径定义。

### 解决方案
在 [routing.ts](file:///Users/y_sunshine/Documents/svgtoico/src/i18n/routing.ts) 的 pathnames 对象中添加所有需要的路径：

```typescript
pathnames: {
  '/': '/',
  '/svg-ico-guide': '/svg-ico-guide',
  '/privacy': '/privacy',
  '/terms': '/terms'
}
```

### 预期结果
- `/svg-ico-guide` 直接访问，返回 200（不需要 `/en` 前缀）
- `/privacy` 直接访问，返回 200
- `/terms` 直接访问，返回 200
- 其他语言路径正常工作
- 所有页面不再返回 500 错误