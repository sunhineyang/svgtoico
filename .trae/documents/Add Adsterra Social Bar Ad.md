# 添加 Adsterra Social Bar 广告集成

## 技术背景
Adsterra 的 Social Bar 是一种高转化率的悬浮广告形式。在 Next.js 15+ (App Router) 架构中，使用 `next/script` 组件是集成第三方脚本的工业标准，它能自动处理脚本的异步加载和组件卸载逻辑。

## 修改步骤

### 1. 修改全局布局文件
在 [layout.tsx](file:///Users/y_sunshine/Documents/svgtoico/src/app/layout.tsx) 中：
- 在 `<body>` 标签内部的最下方（`ThemeProvider` 之后）添加 `Script` 组件。
- 配置如下：
  - `id`: "adsterra-social-bar"
  - `src`: "https://pl28593988.effectivegatecpm.com/73/e5/4b/73e54b6f942016df981c9be2ee045aef.js"
  - `strategy`: "afterInteractive"

## 预期效果
1. 页面加载后，浏览器会在空闲时间请求 Social Bar 脚本。
2. 广告将以悬浮栏形式出现在页面底部，不影响页面核心功能。
3. 现有的 Popunder 广告（位于 head 中）保持不变，继续正常工作。

请问是否可以开始执行？