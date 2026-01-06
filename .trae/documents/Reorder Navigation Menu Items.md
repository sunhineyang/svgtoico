I will adjust the navigation order in the Header component as requested:

1. **Add "SVG to ICO" as the first item**: This will be a new navigation link that scrolls to the converter section (`#converter`).
2. **Move "FAQ" to the second position**: Currently it's third.
3. **Move "Guide" to the third position**: Currently it's first.
4. **Remove "Features"**: This navigation link will be removed from the nav bar.

**Changes to file:**

* **File**: `src/components/layout/header.tsx`

* **Action**: Reorder the navigation links in the `<nav>` section to match the new sequence: SVG to ICO → FAQ → Guide.

