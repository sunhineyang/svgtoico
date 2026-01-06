## 修复 Header 导航链接的国际化路由问题

### 问题
Header 中的 "Guide" 导航链接使用了 `next/link`，不支持 next-intl 的国际化路由，导致路径不正确。

### 解决方案
将 header.tsx 中的 Link 组件从 `next/link` 改为 `next-intl/link`，使其能够正确处理多语言路径。

### 具体修改
在 `/Users/y_sunshine/Documents/svgtoico/src/components/layout/header.tsx` 中：
1. 修改导入语句：将 `import Link from 'next/link'` 改为 `import { Link } from 'next-intl/link'`
2. 保持其他代码不变，`next-intl/link` 会自动处理 locale 前缀

### 预期效果
修改后，导航链接将根据当前语言环境生成正确的路径：
- 英文页面：点击 Guide 跳转到 `/en/svg-ico-guide`
- 德文页面：点击 Guide 跳转到 `/de/svg-ico-guide`
- 其他语言同理