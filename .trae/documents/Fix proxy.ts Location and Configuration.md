## 修复 proxy.ts 文件位置和配置

### 问题分析
1. `proxy.ts` 文件当前位于 `/src/proxy.ts`，但应该在项目根目录
2. Next.js 16 要求 `proxy.ts` 与 `next.config.ts` 在同一级目录
3. 导入路径 `@/i18n/routing` 在根目录下可能无法正确解析

### 修复步骤

1. **删除错误的 proxy.ts 文件**
   - 删除 `/Users/y_sunshine/Documents/svgtoico/src/proxy.ts`

2. **在项目根目录创建正确的 proxy.ts**
   - 位置：`/Users/y_sunshine/Documents/svgtoico/proxy.ts`
   - 使用相对路径导入：`import { routing } from './src/i18n/routing'`

3. **重启开发服务器**
   - 停止当前运行的开发服务器
   - 重新启动以应用新配置

### 预期结果
- `/svg-ico-guide` 返回 200（英文默认语言，无前缀）
- `/privacy` 返回 200
- `/terms` 返回 200
- 其他语言路径正常工作（如 `/de/svg-ico-guide`, `/es/privacy` 等）