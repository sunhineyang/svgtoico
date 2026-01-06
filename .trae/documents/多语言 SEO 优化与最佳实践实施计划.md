# 多语言 SEO 优化与最佳实践实施计划

您提出的要求非常专业。在做全球化网站时，**SEO 优先** 确实是核心原则，而 "默认语言（英语）不带 URL 前缀" (如 `example.com/` 而非 `example.com/en/`) 是行业内最顶级的做法（参考 Apple, Stripe 等国际化标杆）。

经过对代码的深度分析，我发现当前项目虽然配置了 `localePrefix: 'as-needed'`，但在组件实现和 SEO 元数据上存在**硬编码**和**逻辑缺失**，这导致了您遇到的 404 问题以及潜在的 SEO 灾难（如缺少 hreflang 标签）。

我将按照以下步骤，引入行业标准做法进行重构：

## 1. 建立标准化的导航基础设施 (Infrastructure)
目前代码中存在手动拼接 URL 的情况（如 `locale === 'en' ? '/' : '/' + locale`），这是极其脆弱的。
- **创建 `src/i18n/navigation.ts`**: 封装 `next-intl` 的导航功能。这将提供智能的 `<Link>` 和 `useRouter`，它们会自动识别 `as-needed` 规则，确保英文路径自动去除了 `/en`，而其他语言保留前缀。

## 2. 重构组件以符合 SEO 标准 (Refactoring)
- **修复 `LanguageToggle.tsx` (语言切换器)**: 
  - **现状**: 切换语言会强制跳回首页 (Bad UX)，且使用手动 URL 拼接。
  - **改进**: 使用新的 `navigation.ts`。实现**路径保持 (Path Preservation)**，即在 `/svg-ico-guide` 页面切换德语，会自动跳转到 `/de/svg-ico-guide`，而不是德语首页。
- **修复 `Header.tsx`**: 
  - **现状**: 使用 `onClick` 和 `router.push` 进行页面跳转。这对爬虫不友好。
  - **改进**: 替换为语义化的 `<Link>` 标签。这能让爬虫顺着链接爬取所有语言页面，极大提升 SEO 权重。

## 3. 实施行业顶级的 SEO 元数据策略 (Metadata Strategy)
- **重写 `src/app/[locale]/layout.tsx`**:
  - **动态生成 Canonical 标签**: 确保每个页面指向其自身的规范 URL（英文版无后缀）。
  - **完善 Hreflang 标签**: 自动为所有支持的语言（en, de, es, ja, ko, ru）生成 `alternate` 链接，告诉 Google "这是这个页面的德语版本"。
  - **设置 x-default**: 指定默认版本（英文），防止搜索引擎混淆。

## 4. 验证与修复路由问题
- 这一系列改动将从根本上解决 `/svg-ico-guide` 404 的问题，因为所有的链接生成和路由匹配都将统一交由框架处理，消除人为拼接错误。

这个方案完全遵循 Next.js 官方推荐的国际化最佳实践，确保您的网站在 Google 全球搜索中具有最佳表现。
