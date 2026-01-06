## 删除 History 入口链接

### 修改内容

在 [header.tsx](file:///Users/y_sunshine/Documents/svgtoico/src/components/layout/header.tsx) 中删除第 67-72 行的 History 导航链接：

```tsx
<Link
  href="/history"
  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
>
  {t('history')}
</Link>
```

### 影响

- ✅ 导航栏中将不再显示 History 链接
- ✅ 用户无法通过导航访问 /history 页面
- ✅ /history 页面仍然存在，但需要直接输入 URL 才能访问
- ✅ 不影响其他功能

### 后续

如果需要完全移除 history 功能，还需要：
- 删除 `src/app/[locale]/history/page.tsx`
- 删除 `src/components/history/` 目录下的组件
- 删除 `src/components/pages/history-content.tsx`
- 从翻译文件中删除 history 相关的翻译