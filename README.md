# Rimfrost Micro Frontend Template

A template project for creating micro frontends in the Rimfrost task management system using Vue 3, TypeScript, and Module Federation.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Module Federation Setup](#module-federation-setup)
- [Development](#development)
- [Building & Deployment](#building--deployment)
- [Best Practices](#best-practices)
- [Integration with Host](#integration-with-host)

## Overview

This template is designed to help you quickly create micro frontends for Rimfrost's task management system. A micro frontend (or remote app) is a specialized Vue application that:

- Handles a specific type of operational task
- Is loaded dynamically by the host frontend based on task configuration
- Communicates with a dedicated Backend-for-Frontend (BFF) service
- Manages its own state and components using Pinia and Vue Router

### Key Features

- ✅ **Module Federation** - Dynamically loadable as a remote component
- ✅ **TypeScript** - Full type safety for development
- ✅ **Pinia State Management** - Reactive state management for component data
- ✅ **FKUI Components** - Försäkringskassan's design system integration
- ✅ **Hot Module Replacement** - Fast development feedback
- ✅ **BFF Integration** - Ready to communicate with a dedicated backend service

## Architecture

### How Micro Frontends Fit In

The Rimfrost system uses a **micro-frontend architecture** where the host application dynamically loads remote applications based on user selections.

```
┌─────────────────────────────────────────────────────┐
│  Host Frontend (Portal)                             │
│  - Displays task list                               │
│  - Loads micro frontends dynamically                │
│  - Routes between different micro frontend types    │
└────────┬────────────────────────────────────────────┘
         │
         └─ Loads via Module Federation when user
            selects a task of your type
         │
    ┌────▼──────────────────────────────────────────┐
    │  Your Micro Frontend (This Template)           │
    │  - Displays task-specific UI                   │
    │  - Manages task state                          │
    │  - Communicates with dedicated BFF             │
    └────┬───────────────────────────────────────────┘
         │
         └─ HTTP requests to...
         │
    ┌────▼──────────────────────────────────────────┐
    │  Your Micro Frontend BFF                       │
    │  - Data transformation                         │
    │  - Backend communication                       │
    │  - Mock data fallback (development)            │
    └────┬───────────────────────────────────────────┘
         │
         └─ HTTP requests to...
         │
    ┌────▼──────────────────────────────────────────┐
    │  Backend API Services                          │
    │  - Business logic                              │
    │  - Data persistence                            │
    └──────────────────────────────────────────────┘
```

### Data Flow

1. **Host loads your component**: User selects a task, host dynamically imports your component via Module Federation
2. **Component receives props**: Your component receives `handlaggningId` (customer flow ID) and other task context
3. **Component fetches data**: Calls your BFF endpoint with the task ID
4. **BFF communicates**: Your BFF handles backend communication, error handling, and mock data fallback
5. **Component displays UI**: Renders the task-specific interface using received data

## Getting Started

### Prerequisites

- Node.js 18+ (recommended version 24)
- npm or yarn for package management
- A running instance of your micro frontend BFF on port 9002 (default, configurable)

### Installation

1. Clone this template (or create a new repository from it)
   ```bash
   git clone <your-template-repo-url>
   cd your-micro-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file (optional, for custom BFF URL)
   ```env
   VITE_BFF_URL=http://localhost:9002
   VITE_PORT=3033
   ```

### Development

Start the development server:
```bash
npm run dev
```

The micro frontend will be available at `http://localhost:3033`.

In development, you can:
- **Test standalone**: Access the app directly in your browser
- **Test with host**: The host frontend will load this micro frontend when configured

### Building

Build for production:
```bash
npm run build
```

This creates optimized, bundled files ready for deployment.

### Preview

Preview the built application locally:
```bash
npm run preview
```

## Project Structure

```
src/
├── App.vue                      # Root component (received from host props)
├── main.ts                      # Application entry point
├── main.scss                    # Global styles
├── style.css                    # Additional global styles
├── components/
│   └── ExampleComponent.vue     # Your task-specific components go here
├── stores/
│   └── ExampleStore.ts          # Pinia stores for state management
└── types.ts                     # TypeScript type definitions
```

### Key Files Explained

**App.vue** - Root component that receives props from the host:
```vue
<script setup lang="ts">
const props = defineProps<{
  handlaggningId: string;  // Customer flow ID from task
  regeltyp?: string;           // Rule type (optional)
}>();
</script>
```

**ExampleComponent.vue** - Your main component for the task UI. This demonstrates:
- Using Pinia stores for state management
- Fetching data from your BFF
- Displaying data and handling user interactions
- Handling errors gracefully

**ExampleStore.ts** - Pinia store pattern:
```typescript
import { defineStore } from "pinia";

export const useExampleStore = defineStore("example", {
  state: () => ({
    // Your reactive data here
    taskData: null,
    loading: false,
    error: '',
  }),
  actions: {
    // Your async actions here
    async fetchTaskData(id: string) {
      // Call your BFF
    }
  }
});
```

## Module Federation Setup

### How It Works

Your micro frontend exports components and stores via **Module Federation**, making them accessible to the host frontend.

The configuration in `vite.config.ts`:

```typescript
federation({
  name: "remoteApp",              // Unique name for your micro frontend
  filename: "remoteEntry.js",     // Entry point file
  exposes: {
    "./ExampleComponent": "./src/components/ExampleComponent.vue",
  },
  shared: ["vue", "@fkui/vue", "pinia"],  // Libraries shared with host
}),
```

### Exposing Your Components

To expose a component for the host to use:

1. **Create or update a component** - e.g., `src/components/MyTaskComponent.vue`

2. **Add to `exposes` in vite.config.ts**:
   ```typescript
   federation({
     exposes: {
       "./MyTaskComponent": "./src/components/MyTaskComponent.vue",
       "./AnotherComponent": "./src/components/AnotherComponent.vue",
     },
     // ...
   }),
   ```

3. **Host can then import** - The host frontend loads your component:
   ```javascript
   const MyComponent = React.lazy(() => 
     import("remoteApp/MyTaskComponent")
   );
   ```

### Shared Dependencies

Libraries listed under `shared` are shared between the host and your micro frontend. This reduces bundle size and prevents duplicate code:

```typescript
shared: [
  "vue",           // Core Vue library
  "@fkui/vue",     // FKUI components (avoid duplication)
  "pinia",         // State management
]
```

**Important**: Always add any major dependencies used in exposed components to the `shared` array.

## Development

### Developing Components

1. **Create components in `src/components/`**:
   ```bash
   # Create MyTaskComponent.vue
   ```

2. **Create Pinia stores in `src/stores/`**:
   ```typescript
   import { defineStore } from "pinia";
   
   export const useMyStore = defineStore("myStore", {
     state: () => ({ /* ... */ }),
     actions: { /* ... */ }
   });
   ```

3. **Use components in App.vue or other components**:
   ```vue
   <MyTaskComponent :handlaggningId="props.handlaggningId" />
   ```

### Fetching Data from BFF

The BFF URL is controlled by the `VITE_BFF_URL` environment variable:

```typescript
const bffUrl = import.meta.env.VITE_BFF_URL || 'http://localhost:9002';
const response = await fetch(`${bffUrl}/api/regel/your-endpoint`);
```

### Best Practices for Components

1. **Use scoped styles** - Prevent styles from affecting the host or other components:
   ```vue
   <style scoped>
   .local-class { /* Only applies within this component */ }
   </style>
   ```

2. **Keep components focused** - Each component should handle one task type or concern

3. **Use TypeScript interfaces** - Define data structures clearly:
   ```typescript
   interface TaskData {
     id: string;
     title: string;
     status: 'pending' | 'completed';
   }
   ```

4. **Handle errors gracefully** - Always catch and display errors to users

5. **Use FKUI components** - Maintain consistency with Försäkringskassan's design system

## Building & Deployment

### Build Process

```bash
npm run build
```

This:
- Compiles TypeScript
- Bundles the application with Module Federation
- Creates optimized CSS files
- Outputs to `dist/` directory

### Deployment

Your micro frontend can be deployed to:
- **Static file servers** (Nginx, Apache, etc.)
- **CDN** (CloudFront, Akamai, etc.)
- **Container services** (Docker, Kubernetes, etc.)

The key requirement is that the `remoteEntry.js` file is accessible at the URL configured in the host's route manifest.

### Environment Variables at Runtime

For runtime environment configuration:

1. **Build-time variables** - Embedded during build using `VITE_*` prefix:
   ```bash
   VITE_BFF_URL=https://prod-bff.example.com npm run build
   ```

2. **Runtime environment file** - Create a `runtime-config.js` in your deployment describing values needed at runtime

## Best Practices

### 1. Component State Management

- ✅ Use Pinia for shared component state
- ✅ Keep stores focused on a single responsibility
- ❌ Don't pass too much data as props (use stores instead)

### 2. Error Handling

- ✅ Always wrap async operations in try-catch
- ✅ Display user-friendly error messages
- ✅ Log errors for debugging (but not sensitive data)
- ✅ Fallback gracefully when BFF is unavailable

### 3. Performance

- ✅ Use dynamic imports for heavy components
- ✅ Minimize bundle size by removing unused dependencies
- ✅ Lazy load components only when needed

### 4. Security

- ✅ Validate all data from BFF before using
- ✅ Use environment variables for sensitive URLs (not hardcoded)
- ✅ Follow CORS best practices with your BFF

### 5. Code Organization

- ✅ Group related components in subdirectories
- ✅ Keep store logic separate from UI logic
- ✅ Share common utilities in a `composables/` or `utils/` folder

## Integration with Host

### Steps for Host to Load Your Micro Frontend

1. **Host adds entry to `route-manifest.json`**:
   ```json
   {
     "routes": {
       "your-route-key": {
         "scope": "@your-scope/remote-app",
         "devEntry": "http://localhost:3033/remoteEntry.js",
         "prodEntry": "https://yourdomain.com/remoteEntry.js",
         "module": "./YourMainComponent"
       }
     }
   }
   ```

2. **Task data includes your route key**:
   ```json
   {
     "id": "task-123",
     "title": "Task Title",
     "url": "your-route-key",
     "handlaggningId": "flow-456",
     "regeltyp": "your-rule-type"
   }
   ```

3. **Host loads your component dynamically**:
   ```typescript
   const remoteComponent = await loadRemoteModule(task.url);
   // Host renders: <remoteComponent :handlaggningId="task.handlaggningId" />
   ```

### Communication between Host and Micro Frontend

**Props (from host to micro frontend)**:
- `handlaggningId` - The customer flow ID for the task
- `regeltyp` - The rule type (from task data)
- Any other custom props the host decides to pass

**Shared State via Pinia**:
If needed, your micro frontend can access the host's Pinia stores (since Pinia is shared in Module Federation).

## Troubleshooting

### BFF Connection Issues

**Problem**: Getting 404 or connection refused errors
- Check that your BFF is running on the configured port
- Verify `VITE_BFF_URL` environment variable is correct
- Check CORS headers in your BFF

### Module Federation Not Loading

**Problem**: `remoteEntry.js` not found
- Ensure `npm run build` completed successfully
- Verify the URL in route-manifest.json is correct
- Check that the production deployment is accessible

### Styles Not Applying

**Problem**: Component styles not visible
- Use `scoped` styles in components
- Check for CSS specificity issues
- Verify FKUI styles are properly imported

### Store Not Persisting State

**Problem**: Pinia store loses data
- Ensure store is used with `<script setup>` - `const store = useMyStore()`
- Avoid recreating stores in effects

## Resources

- [Module Federation Documentation](https://module-federation.io/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [FKUI Vue Component Library](https://fkui.nu/)
- [Vite Documentation](https://vitejs.dev/)

## Example: Creating Your First Task Component

Here's a minimal example to get you started:

1. **Create `src/components/MyTaskComponent.vue`**:
   ```vue
   <script setup lang="ts">
   import { ref, onMounted } from 'vue';
   import { FButton, FInput } from '@fkui/vue';
   
   const props = defineProps<{
     handlaggningId: string;
   }>();
   
   const taskData = ref(null);
   const loading = ref(false);
   const error = ref('');
   
   async function fetchData() {
     loading.value = true;
     try {
       const bffUrl = import.meta.env.VITE_BFF_URL || 'http://localhost:9002';
       const response = await fetch(
         `${bffUrl}/api/regel/my-task/${props.handlaggningId}`
       );
       taskData.value = await response.json();
     } catch (err) {
       error.value = 'Failed to load task data';
     } finally {
       loading.value = false;
     }
   }
   
   onMounted(() => fetchData());
   </script>
   
   <template>
     <div v-if="loading">Loading...</div>
     <div v-else-if="error" class="error">{{ error }}</div>
     <div v-else>
       <h2>{{ taskData?.title }}</h2>
       <p>{{ taskData?.description }}</p>
       <FButton>Complete Task</FButton>
     </div>
   </template>
   
   <style scoped>
   .error {
     color: red;
     padding: 1rem;
   }
   </style>
   ```

2. **Expose it in `vite.config.ts`**:
   ```typescript
   federation({
     exposes: {
       "./MyTaskComponent": "./src/components/MyTaskComponent.vue",
     },
     // ...
   }),
   ```

3. **Start dev server**:
   ```bash
   npm run dev
   ```

4. **Configure in host's route-manifest.json** to load this component

## Contributing

When contributing to this template, please ensure:
- All TypeScript types are properly defined
- Components use scoped styles
- New components are documented
- Dependencies are listed in Module Federation `shared` array

## License

[Add your license information here]