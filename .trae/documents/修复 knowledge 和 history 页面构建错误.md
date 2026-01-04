修复 knowledge 和 history 页面的构建错误：

1. **修复 knowledge/page.tsx**：
   - 移除第1行的 `'use client'` 指令
   - 保留 `generateMetadata` 函数（用于 SEO）
   - `KnowledgePage` 组件已经是客户端组件，页面可以正常渲染

2. **清理 history/page.tsx**：
   - 移除第3行未使用的 `Metadata` 导入

修复后，页面将能够正常编译和加载。