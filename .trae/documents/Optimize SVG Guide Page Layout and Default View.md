I will optimize the `/svg-ico-guide` page to default to a "Single Page View" (All Content Expanded) and fix the content truncation issue in pagination mode.

### 1. **Default to "All View" Mode**
- **File**: `src/components/pages/guide-page.tsx`
- **Action**: 
    - Change the default state of `isAllViewMode` from `false` to `true`.
    - Refactor the control bar rendering logic so it remains visible even in "All View" mode (currently it is hidden). This allows users to switch back to pagination mode if desired.
    - Update the "Slide X / Y" text indicator to show "Full Guide" or be hidden when in "All View" mode.

### 2. **Optimize Control Buttons**
- **File**: `src/components/guide/control-buttons.tsx`
- **Action**: 
    - Modify the component to conditionally render navigation buttons.
    - When `isAllViewMode` is **active**: Hide "Previous", "Next", and "AutoPlay" buttons. Only show "Switch View", "Fullscreen", and "Share" buttons.
    - When `isAllViewMode` is **inactive** (Pagination Mode): Show all buttons as before.
    - Swap the `Maximize`/`Minimize` icons to better represent the action (e.g., clicking "View All" should likely show a "List" or "Expand" icon, while switching to "Single Slide" might show a "Focus" icon).

### 3. **Fix Content Truncation in Pagination Mode**
- **File**: `src/components/guide/slide-container.tsx`
- **Action**: 
    - Add `overflow-y-auto` to the slide container.
    - This ensures that if a user switches back to Pagination Mode, long content that exceeds the screen height will be scrollable instead of being cut off.

### 4. **Review & Verify**
- Verify that the page loads with all content expanded by default.
- Verify that the bottom control bar is visible and functional.
- Switch to Pagination Mode and confirm that long content is scrollable and fully visible.
