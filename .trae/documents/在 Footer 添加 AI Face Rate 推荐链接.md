## 修改计划

在首页 Footer 中添加 AI Face Rate 产品推荐链接。

**修改文件**: [footer.tsx](file:///Users/y_sunshine/Documents/svgtoico/src/components/layout/footer.tsx)

**具体改动**:
在 `socialLinks` 数组中添加新的产品链接:

```typescript
{
  name: 'AI Face Rate',
  href: 'https://aifacerate.com',
  icon: ExternalLink,
  external: true
}
```

这会将链接添加到联系方式区域，与现有的 svgtopng.app 链接保持一致的样式和布局。