# 转换历史模块实施计划（重新设计）

## 核心设计
- **存储方案**：localStorage 存储元数据（最多 20 条）
- **不存储 Blob**：用户转换后立即下载，历史记录用于查看转换记录
- **UI 位置**：在 conversion-result 底部集成

## 实施步骤

### 1. 删除现有历史功能
删除以下文件：
- `src/app/[locale]/history/page.tsx`
- `src/components/history/history-card.tsx`
- `src/components/history/history-empty.tsx`
- `src/components/history/history-stats.tsx`
- `src/components/pages/history-content.tsx`

### 2. 创建自定义 Hook
**文件：** `src/hooks/use-conversion-history.ts`
- 使用 localStorage（key: 'conversion-history'）
- 最多保存 20 条记录（FIFO）
- 提供函数：`addToHistory()`, `deleteFromHistory()`, `clearHistory()`
- 返回：`history` 数组

### 3. 创建历史记录组件
**文件：** `src/components/converter/conversion-history.tsx`
- 卡片式布局，响应式网格
- 显示：文件名、转换时间、文件大小、转换设置（尺寸标签）
- 悬停显示删除按钮
- 空状态友好提示
- 清空所有按钮

### 4. 修改转换结果组件
**文件：** `src/components/converter/conversion-result.tsx`
- 导入 `useConversionHistory` hook
- 在转换成功时调用 `addToHistory()` 保存记录
- 在组件底部集成 `ConversionHistory` 组件

### 5. 修改 Store
**文件：** `src/store/converter-store.ts`
- 在 `convertFile` 成功后，触发历史记录保存
- 或在 conversion-result 中直接调用 hook

### 6. 更新多语言文件
**文件：** 所有 `messages/*.json`
- 添加历史记录相关文案：
  - history.title, history.description
  - history.delete, history.confirmDelete
  - history.clearAll, history.confirmClearAll
  - history.empty.title, history.empty.description
  - history.convertedAt, history.sizes

---

## 数据结构
```typescript
interface ConversionHistoryItem {
  id: string;
  filename: string;
  originalFilename: string;
  size: number;
  createdAt: string;
  settings: ConversionSettings;
}
```

---

## 文件清单

### 删除文件（5 个）
1. `src/app/[locale]/history/page.tsx`
2. `src/components/history/history-card.tsx`
3. `src/components/history/history-empty.tsx`
4. `src/components/history/history-stats.tsx`
5. `src/components/pages/history-content.tsx`

### 新建文件（2 个）
1. `src/hooks/use-conversion-history.ts`
2. `src/components/converter/conversion-history.tsx`

### 修改文件（8 个）
1. `src/components/converter/conversion-result.tsx`
2. `src/store/converter-store.ts`
3. `messages/en.json`
4. `messages/ko.json`
5. `messages/ja.json`
6. `messages/ru.json`
7. `messages/es.json`
8. `messages/de.json`