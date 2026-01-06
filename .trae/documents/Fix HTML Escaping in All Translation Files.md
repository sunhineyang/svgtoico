## Fix HTML Escaping Issue in Translation Files

The build is failing because 5 translation files contain raw HTML that needs to be converted to HTML entities for proper JSON parsing.

### Changes Required:

Fix the `guidePage.slides.slide6.favicon.implementation.code` field in 5 files by converting:

**From:**
```json
"code": '<link rel="icon" type="image/x-icon" href="/favicon.ico">'
```

**To:**
```json
"code": "&lt;link rel=&quot;icon&quot; type=&quot;image/x-icon&quot; href=&quot;/favicon.ico&quot;&gt;"
```

### Files to Fix:
1. [messages/de.json](file:///Users/y_sunshine/Documents/svgtoico/messages/de.json#L979) - German (line 979)
2. [messages/es.json](file:///Users/y_sunshine/Documents/svgtoico/messages/es.json#L981) - Spanish (line 981)
3. [messages/ja.json](file:///Users/y_sunshine/Documents/svgtoico/messages/ja.json#L942) - Japanese (line 942)
4. [messages/ko.json](file:///Users/y_sunshine/Documents/svgtoico/messages/ko.json#L875) - Korean (line 875)
5. [messages/ru.json](file:///Users/y_sunshine/Documents/svgtoico/messages/ru.json#L1025) - Russian (line 1025)

### Verification:
After fixing all files, verify the build completes successfully and the application runs without errors.