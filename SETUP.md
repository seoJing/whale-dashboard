# Whale Dashboard Setup Guide

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Installing the Extension in Whale Browser

1. Build the project:

    ```bash
    pnpm build
    ```

2. Open Whale browser and navigate to `whale://extensions`

3. Enable **Developer Mode** (toggle in top right)

4. Click **Load unpacked extension**

5. Select the `dist` folder from this project

6. The dashboard will appear in the sidebar!

## Project Structure (FSD Architecture)

```
src/
├── app/          # Application initialization
├── pages/        # Page layouts (SidebarPage)
├── widgets/      # Independent UI blocks (Clock, Todo, Timer, etc.)
├── features/     # User action handlers
├── entities/     # Business entities (Todo, Bookmark types)
└── shared/       # Shared utilities, UI components, configs
```

## Features

-   **Clock Widget**: Analog/Digital toggle
-   **Slider Panel**: Swipeable widgets with dot navigation
-   **Todo Widget**: Task management with localStorage
-   **Timer Widget**: Pomodoro timer (25min work / 5min break)
-   **Calendar Widget**: Current month view
-   **Bookmarks Widget**: Quick link management

## Tech Stack

-   React 19
-   TypeScript
-   Vite
-   Tailwind CSS 4
-   Feature-Sliced Design (FSD)

## Note on Icon

The extension currently uses a placeholder icon. To add a proper icon:

1. Create a 16x16 PNG image
2. Place it at `public/icons/icon16.png`
3. Rebuild the project

## Development Tips

-   Hot reload works with `pnpm dev`
-   After building, reload the extension in `whale://extensions`
-   localStorage is used for data persistence
-   The sidebar width is optimized for vertical displays
