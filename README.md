# WOGD JUCE Template - Svelte GUI

Modern Svelte + TypeScript + Vite GUI template for JUCE plugins using WebView2.

## Features

- **Svelte 5** - Latest Svelte with runes and improved reactivity
- **TypeScript** - Full type safety
- **WebView2 Integration** - Direct communication with JUCE plugin
- **Hot Module Replacement** - Fast development with Vite
- **Svelte Stores** - Reactive state management for plugin communication
- **Small Bundle Size** - Svelte compiles to vanilla JS (smaller than React/Vue)

## Project Structure

```
wogd-juce-template-gui-svelte/
├── src/
│   ├── main.ts              # Svelte entry point
│   ├── App.svelte           # Root component
│   ├── app.css              # Global styles
│   ├── stores/
│   │   └── pluginStore.ts   # Plugin communication store
│   └── services/
│       └── plugin.service.ts # WebView2 communication
├── public/                  # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── svelte.config.js        # Svelte configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

The dev server will start on http://localhost:5173

### 3. Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Plugin Communication

### Using the Store

```svelte
<script lang="ts">
  import { pluginStore } from './stores/pluginStore'

  function handleClick() {
    pluginStore.sendMessage({
      type: 'test',
      data: { message: 'Hello from Svelte!' }
    })
  }
</script>

<main>
  <p>Status: {$pluginStore.isConnected ? 'Connected' : 'Dev Mode'}</p>
  <button on:click={handleClick}>Send Message</button>
</main>
```

### Sending Messages to Plugin

```typescript
import { pluginStore } from './stores/pluginStore'

// Send a test message
pluginStore.sendMessage({
  type: 'test',
  data: { message: 'Hello from Svelte!' }
})

// Set a parameter
pluginStore.setParameter('volume', 0.75)

// Request all parameters
pluginStore.requestParameters()
```

### Receiving Messages from Plugin

The `pluginStore` automatically handles incoming messages and logs them to the console. You can extend the store to provide custom message handling in `src/stores/pluginStore.ts`.

## Development

### Environment Detection

The plugin service automatically detects if running in WebView2:

```svelte
<script lang="ts">
  import { pluginStore } from './stores/pluginStore'
</script>

{#if $pluginStore.isConnected}
  <p>Running in plugin</p>
{:else}
  <p>Running in dev mode</p>
{/if}
```

### Console Debugging

- **Dev Mode**: Open browser DevTools (F12)
- **Plugin Mode**: Open plugin window and press F12

## Why Svelte?

- **Smaller Bundle** - Compiles to vanilla JS, typically 30-50% smaller than React/Vue
- **Faster Performance** - No virtual DOM, direct DOM manipulation
- **Simpler Syntax** - Less boilerplate, more intuitive reactivity
- **Better for Plugins** - Lower memory footprint and faster load times

## Integration with JUCE Plugin

This GUI template is designed to work with the WOGD JUCE Template:

1. Clone this repository as a git submodule in your JUCE project
2. Start the dev server: `npm run dev`
3. Build your plugin
4. The plugin will load the GUI from http://localhost:5173

See the main template repository for full integration instructions.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type-check Svelte files

## License

MIT
