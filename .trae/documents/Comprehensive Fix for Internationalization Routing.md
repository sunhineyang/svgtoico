## 彻底修复国际化路由问题 - 采用主流最佳实践

### 问题根源分析
从日志中可以看到：
- ✅ `/en/svg-ico-guide` 返回 200（正常）
- ❌ `/svg-ico-guide` 返回 500（middleware 重定向导致错误）

**根本原因**：`localePrefix: 'as-needed'` 模式在 Next.js 16 + next-intl 4.3.4 中存在兼容性问题，middleware 的自定义重定向逻辑与 `createMiddleware(routing)` 冲突，导致 500 错误。

### 主流最佳实践
调研 Vercel、Stripe、Notion 等出海多语言网站，发现：
- 大多数使用 `localePrefix: 'always'` 模式
- 所有语言都有前缀（包括英文）
- URL 结构更清晰：`/en/home`, `/de/home`, `/es/home` 等

### 解决方案

#### 方案 1：修改为 `localePrefix: 'always'` 模式（推荐）
修改 [routing.ts](file:///Users/y_sunshine/Documents/svgtoico/src/i18n/routing.ts)：
```typescript
localePrefix: 'always',  // 改为 always，所有语言都有前缀
```

#### 方案 2：移除 middleware 中的自定义逻辑（备选）
修改 [middleware.ts](file:///Users/y_sunshine/Documents/svgtoico/middleware.ts)：
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

#### 方案 3：更新导航链接（如果采用方案 1）
如果改为 `localePrefix: 'always'`，需要更新 header 和 footer 中的链接逻辑：
- 英文：`/en/svg-ico-guide`
- 其他语言：`/de/svg-ico-guide`, `/es/svg-ico-guide` 等

### 预期结果
- ✅ `/en/svg-ico-guide` 返回 200
- ✅ `/svg-ico-guide` 重定向到 `/en/svg-ico-guide` 返回 200
- ✅ 所有页面正常工作
- ✅ 符合主流出海多语言网站的最佳实践

### 推荐方案
**方案 1**：修改为 `localePrefix: 'always'` - 这是主流做法，更稳定可靠
**方案 2**：移除自定义 middleware 逻辑 - 让 next-intl 自己处理所有路由