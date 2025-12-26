## 计划：在 Footer 部分添加 svgtopng.app 链接

### 1. 分析当前 Footer 结构
- 当前 Footer 使用响应式布局，包含品牌信息、联系方式和底部版权信息
- 使用多语言支持，通过 `useTranslations('footer')` 获取翻译文本
- 已有 ExternalLink 图标组件可用于外部链接

### 2. 修改 Footer 组件
- 在联系方式部分添加新的链接项，指向 https://svgtopng.app
- 使用 ExternalLink 图标表示外部链接
- 链接文本统一使用 "SVG to PNG"

### 3. 更新多语言翻译文件
需要在所有语言文件中添加相关翻译：
- **en.json**: 添加 "svgToPngApp": "SVG to PNG"
- **ja.json**: 添加日文翻译 "SVGからPNGへ"
- **ko.json**: 添加韩文翻译 "SVG를 PNG로"
- **ru.json**: 添加俄文翻译 "SVG в PNG"

### 4. 具体实现步骤
1. 修改 `footer.tsx` 中的 `socialLinks` 数组，添加 svgtopng.app 链接
2. 在各语言文件的 `footer` 部分添加链接文本翻译
3. 确保链接正确设置为外部链接（target="_blank" rel="noopener noreferrer"）

### 5. 设计考虑
- 链接将显示在联系方式区域，与邮件链接并排
- 使用一致的悬停效果和过渡动画
- 保持响应式设计，在移动设备上正确显示